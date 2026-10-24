import { getAllStates } from '@/lib/dryday';
import { mapDbError } from './errors';
import { INVALID_ID_MESSAGE, isUuid } from './ids';
import { istInputToUtcIso, isIstInput } from './time';
import {
  NOTICE_SEVERITIES,
  type AdminSupabase,
  type NoticeInput,
  type NoticeRow,
  type NoticeSeverity,
  type NoticeValues,
  type SaveResult,
  type ValidationResult,
} from './types';

export const NOTICES_PER_PAGE = 20;

export interface NoticeFilters {
  q?: string;
  severity?: string;
  state?: string;
  published?: string;
  page?: number;
  perPage?: number;
}

export interface NoticeListResult {
  rows: NoticeRow[];
  count: number;
  page: number;
  perPage: number;
  error?: string;
}

function isKnownState(slug: string): boolean {
  if (slug === 'all') return true;
  return getAllStates().some((s) => s.slug === slug);
}

/**
 * Validates a public-notice payload. Window fields are IST wall times from the
 * form ('YYYY-MM-DDTHH:MM'); both bounds share the same fixed +05:30 offset, so
 * lexicographic comparison is chronological. Null bounds are allowed (open
 * window, schema/F12 semantics). Conversion to UTC happens in the query layer.
 */
export function validateNoticeInput(raw: NoticeInput): ValidationResult<NoticeValues> {
  const errors: Record<string, string> = {};

  const title = (raw.title ?? '').trim();
  const body = (raw.body ?? '').trim();
  const severity = (raw.severity ?? '').trim();
  const state = (raw.state ?? '').trim();
  const starts_at = (raw.starts_at ?? '').trim();
  const ends_at = (raw.ends_at ?? '').trim();

  if (!title) errors.title = 'Title is required.';
  else if (title.length > 200) errors.title = 'Keep the title under 200 characters.';

  if (!body) errors.body = 'Notice body is required.';

  if (!NOTICE_SEVERITIES.includes(severity as NoticeSeverity)) {
    errors.severity = 'Choose a valid severity.';
  }

  if (state && !isKnownState(state)) {
    errors.state = 'Unknown state slug. Choose a state from the list (or "All India").';
  }

  if (starts_at && !isIstInput(starts_at)) {
    errors.starts_at = 'Start must be a valid date and time.';
  }
  if (ends_at && !isIstInput(ends_at)) {
    errors.ends_at = 'End must be a valid date and time.';
  }
  if (!errors.starts_at && !errors.ends_at && starts_at && ends_at && starts_at > ends_at) {
    errors.ends_at = 'End must not be earlier than start.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  // Defence in depth: the window fields are now known to be real calendar
  // instants, so the UTC conversion cannot silently collapse them to null.
  // If it ever did, fail loudly instead of persisting a silently open window.
  if (
    (starts_at && istInputToUtcIso(starts_at) === null) ||
    (ends_at && istInputToUtcIso(ends_at) === null)
  ) {
    errors.starts_at = 'Start must be a valid date and time.';
    errors.ends_at = 'End must be a valid date and time.';
    return { ok: false, errors };
  }

  return {
    ok: true,
    values: {
      title,
      body,
      severity: severity as NoticeValues['severity'],
      state: state || null,
      starts_at: starts_at || null,
      ends_at: ends_at || null,
      is_published: raw.is_published === true,
    },
  };
}

function firstParam(value: string | string[] | undefined): string {
  const v = Array.isArray(value) ? value[0] : value;
  return typeof v === 'string' ? v : '';
}

export function parseNoticeFilters(
  sp: Record<string, string | string[] | undefined>
): NoticeFilters {
  const filters: NoticeFilters = {};

  const q = firstParam(sp.q).trim().slice(0, 100);
  if (q) filters.q = q;

  const severity = firstParam(sp.severity).trim();
  if (NOTICE_SEVERITIES.includes(severity as NoticeSeverity)) filters.severity = severity;

  const state = firstParam(sp.state).trim();
  if (state) filters.state = state;

  const published = firstParam(sp.published).trim();
  if (published === 'true' || published === 'false') filters.published = published;

  const page = Number.parseInt(firstParam(sp.page), 10);
  if (Number.isFinite(page) && page >= 1) filters.page = page;

  return filters;
}

export function buildNoticeQuery(
  filters: NoticeFilters,
  overrides: Partial<NoticeFilters> = {}
): string {
  const merged = { ...filters, ...overrides };
  const params = new URLSearchParams();

  if (merged.q) params.set('q', merged.q);
  if (merged.severity) params.set('severity', merged.severity);
  if (merged.state) params.set('state', merged.state);
  if (merged.published) params.set('published', merged.published);
  if (merged.page && merged.page > 1) params.set('page', String(merged.page));

  const qs = params.toString();
  return qs ? `/admin/notices?${qs}` : '/admin/notices';
}

function sanitizeSearch(q: string): string {
  return q.replace(/[%_,()\\]/g, ' ').trim();
}

export async function listNotices(
  supabase: AdminSupabase,
  filters: NoticeFilters
): Promise<NoticeListResult> {
  const page = Math.max(1, filters.page ?? 1);
  const perPage = Math.min(100, Math.max(1, filters.perPage ?? NOTICES_PER_PAGE));
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase.from('public_notices').select('*', { count: 'exact' });

  const safeQ = filters.q ? sanitizeSearch(filters.q) : '';
  if (safeQ) {
    query = query.or(`title.ilike.%${safeQ}%,body.ilike.%${safeQ}%,state.ilike.%${safeQ}%`);
  }
  if (filters.severity) query = query.eq('severity', filters.severity);
  if (filters.state) query = query.eq('state', filters.state);
  if (filters.published === 'true') query = query.eq('is_published', true);
  if (filters.published === 'false') query = query.eq('is_published', false);

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    return { rows: [], count: 0, page, perPage, error: mapDbError(error) };
  }

  return { rows: (data as NoticeRow[]) ?? [], count: count ?? 0, page, perPage };
}

export async function getNotice(
  supabase: AdminSupabase,
  id: string
): Promise<{ row: NoticeRow | null; error?: string }> {
  if (!isUuid(id)) return { row: null, error: INVALID_ID_MESSAGE };

  const { data, error } = await supabase
    .from('public_notices')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) return { row: null, error: mapDbError(error) };
  return { row: (data as NoticeRow) ?? null };
}

/** Builds the DB payload, converting IST wall times -> UTC timestamptz strings. */
function toNoticePayload(values: NoticeValues): Record<string, unknown> {
  return {
    title: values.title,
    body: values.body,
    severity: values.severity,
    state: values.state,
    starts_at: istInputToUtcIso(values.starts_at),
    ends_at: istInputToUtcIso(values.ends_at),
    is_published: values.is_published,
  };
}

export async function insertNotice(
  supabase: AdminSupabase,
  values: NoticeValues,
  createdBy: string
): Promise<SaveResult> {
  const { data, error } = await supabase
    .from('public_notices')
    .insert({ ...toNoticePayload(values), created_by: createdBy })
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, error: mapDbError(error), code: 'database' };
  return { ok: true, id: data?.id as string | undefined };
}

export async function updateNotice(
  supabase: AdminSupabase,
  id: string,
  values: NoticeValues
): Promise<SaveResult> {
  if (!isUuid(id)) return { ok: false, error: INVALID_ID_MESSAGE, code: 'validation' };

  const { data, error } = await supabase
    .from('public_notices')
    .update(toNoticePayload(values))
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, error: mapDbError(error), code: 'database' };
  if (!data) return { ok: false, error: 'Notice not found.', code: 'database' };
  return { ok: true, id: data.id as string };
}

export async function deleteNotice(supabase: AdminSupabase, id: string): Promise<SaveResult> {
  if (!isUuid(id)) return { ok: false, error: INVALID_ID_MESSAGE, code: 'validation' };

  const { data, error } = await supabase
    .from('public_notices')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, error: mapDbError(error), code: 'database' };
  if (!data) return { ok: false, error: 'Notice not found.', code: 'database' };
  return { ok: true };
}

export async function setNoticePublished(
  supabase: AdminSupabase,
  id: string,
  published: boolean
): Promise<SaveResult> {
  if (!isUuid(id)) return { ok: false, error: INVALID_ID_MESSAGE, code: 'validation' };
  if (typeof published !== 'boolean') {
    return { ok: false, error: 'Publication flag must be a boolean.', code: 'validation' };
  }

  const { data, error } = await supabase
    .from('public_notices')
    .update({ is_published: published })
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, error: mapDbError(error), code: 'database' };
  if (!data) return { ok: false, error: 'Notice not found.', code: 'database' };
  return { ok: true };
}

export async function countNotices(
  supabase: AdminSupabase,
  filter?: { published?: boolean }
): Promise<number | null> {
  let query = supabase.from('public_notices').select('id', { count: 'exact', head: true });
  if (filter?.published !== undefined) query = query.eq('is_published', filter.published);

  const { count, error } = await query;
  if (error) return null;
  return count ?? 0;
}
