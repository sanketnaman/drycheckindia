import { getAllStates } from '@/lib/dryday';
import { mapDbError } from './errors';
import { INVALID_ID_MESSAGE, isUuid } from './ids';
import {
  DRY_DAY_TYPES,
  SOURCE_TYPES,
  VERIFICATION_STATUSES,
  type AdminSupabase,
  type DryDayInput,
  type DryDayRow,
  type DryDayValues,
  type SaveResult,
  type SourceType,
  type ValidationResult,
  type VerificationStatus,
} from './types';

export const DRY_DAYS_PER_PAGE = 20;

export interface DryDayFilters {
  q?: string;
  state?: string;
  dry_date?: string;
  verification_status?: string;
  published?: string;
  page?: number;
  perPage?: number;
}

export interface DryDayListResult {
  rows: DryDayRow[];
  count: number;
  page: number;
  perPage: number;
  error?: string;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

function isKnownState(slug: string): boolean {
  if (slug === 'all') return true;
  return getAllStates().some((s) => s.slug === slug);
}

function isValidCalendarDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  if (m < 1 || m > 12) return false;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

/**
 * Validates a dry-day form payload against the real schema rules:
 * required fields, enum values, locality required for type='local',
 * optional HTTP(S) source URL, optional HH:MM times with no overnight wrap
 * (matches the dry_days_time_range_check constraint — F5 limitation).
 */
export function validateDryDayInput(raw: DryDayInput): ValidationResult<DryDayValues> {
  const errors: Record<string, string> = {};

  const reason = (raw.reason ?? '').trim();
  const state = (raw.state ?? '').trim();
  const dry_date = (raw.dry_date ?? '').trim();
  const type = (raw.type ?? '').trim();
  const verification_status = (raw.verification_status ?? '').trim();
  const source_url = (raw.source_url ?? '').trim();
  const source_note = (raw.source_note ?? '').trim();
  const source_type = (raw.source_type ?? '').trim();
  const locality = (raw.locality ?? '').trim();
  const time_start = (raw.time_start ?? '').trim();
  const time_end = (raw.time_end ?? '').trim();

  if (!reason) {
    errors.reason = 'Occasion / reason is required.';
  }

  if (!state) {
    errors.state = 'State scope is required.';
  } else if (!isKnownState(state)) {
    errors.state = 'Unknown state slug. Choose a state from the list (or "All India").';
  }

  if (!dry_date) {
    errors.dry_date = 'Dry date is required.';
  } else if (!isValidCalendarDate(dry_date)) {
    errors.dry_date = 'Enter a valid calendar date (YYYY-MM-DD).';
  }

  if (!DRY_DAY_TYPES.includes(type as DryDayValues['type'])) {
    errors.type = 'Choose a valid restriction type.';
  }

  if (!VERIFICATION_STATUSES.includes(verification_status as VerificationStatus)) {
    errors.verification_status = 'Choose a verification status.';
  }

  if (type === 'local' && !locality) {
    errors.locality =
      'Local restrictions must name the affected locality/area — they are never shown as statewide.';
  }

  if (source_url) {
    let parsed: URL | null = null;
    try {
      parsed = new URL(source_url);
    } catch {
      parsed = null;
    }
    if (!parsed || (parsed.protocol !== 'http:' && parsed.protocol !== 'https:')) {
      errors.source_url = 'Source URL must be a valid http(s) link. Leave empty if none exists.';
    }
  }

  if (source_type && !SOURCE_TYPES.includes(source_type as SourceType)) {
    errors.source_type = 'Choose a valid source type or leave it empty.';
  }

  if (time_start && !TIME_RE.test(time_start)) {
    errors.time_start = 'Start time must be in HH:MM format.';
  }
  if (time_end && !TIME_RE.test(time_end)) {
    errors.time_end = 'End time must be in HH:MM format.';
  }
  if (
    !errors.time_start &&
    !errors.time_end &&
    time_start &&
    time_end &&
    time_start > time_end
  ) {
    errors.time_end =
      'End time must not be earlier than start time. Overnight ranges (past midnight) are not supported — split them into two records.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    values: {
      reason,
      state,
      dry_date,
      type: type as DryDayValues['type'],
      verification_status: verification_status as DryDayValues['verification_status'],
      source_url: source_url || null,
      source_note: source_note || null,
      source_type: (source_type || null) as DryDayValues['source_type'],
      locality: locality || null,
      time_start: time_start || null,
      time_end: time_end || null,
      is_published: raw.is_published === true,
    },
  };
}

function firstParam(value: string | string[] | undefined): string {
  const v = Array.isArray(value) ? value[0] : value;
  return typeof v === 'string' ? v : '';
}

/** Parses list filters from searchParams, dropping invalid values. */
export function parseDryDayFilters(
  sp: Record<string, string | string[] | undefined>
): DryDayFilters {
  const filters: DryDayFilters = {};

  const q = firstParam(sp.q).trim().slice(0, 100);
  if (q) filters.q = q;

  const state = firstParam(sp.state).trim();
  if (state) filters.state = state;

  const dry_date = firstParam(sp.dry_date).trim();
  if (dry_date && isValidCalendarDate(dry_date)) filters.dry_date = dry_date;

  const verification = firstParam(sp.verification_status).trim();
  if (VERIFICATION_STATUSES.includes(verification as VerificationStatus)) {
    filters.verification_status = verification;
  }

  const published = firstParam(sp.published).trim();
  if (published === 'true' || published === 'false') filters.published = published;

  const page = Number.parseInt(firstParam(sp.page), 10);
  if (Number.isFinite(page) && page >= 1) filters.page = page;

  return filters;
}

/** Builds a shareable /admin/dry-days URL for the given filter state. */
export function buildDryDayQuery(
  filters: DryDayFilters,
  overrides: Partial<DryDayFilters> = {}
): string {
  const merged = { ...filters, ...overrides };
  const params = new URLSearchParams();

  if (merged.q) params.set('q', merged.q);
  if (merged.state) params.set('state', merged.state);
  if (merged.dry_date) params.set('dry_date', merged.dry_date);
  if (merged.verification_status) params.set('verification_status', merged.verification_status);
  if (merged.published) params.set('published', merged.published);
  if (merged.page && merged.page > 1) params.set('page', String(merged.page));

  const qs = params.toString();
  return qs ? `/admin/dry-days?${qs}` : '/admin/dry-days';
}

function sanitizeSearch(q: string): string {
  return q.replace(/[%_,()\\]/g, ' ').trim();
}

/** Lists dry days with search/filters/count/pagination (RLS applies server-side). */
export async function listDryDays(
  supabase: AdminSupabase,
  filters: DryDayFilters
): Promise<DryDayListResult> {
  const page = Math.max(1, filters.page ?? 1);
  const perPage = Math.min(100, Math.max(1, filters.perPage ?? DRY_DAYS_PER_PAGE));
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase.from('dry_days').select('*', { count: 'exact' });

  const safeQ = filters.q ? sanitizeSearch(filters.q) : '';
  if (safeQ) {
    query = query.or(
      `reason.ilike.%${safeQ}%,state.ilike.%${safeQ}%,locality.ilike.%${safeQ}%`
    );
  }
  if (filters.state) query = query.eq('state', filters.state);
  if (filters.dry_date) query = query.eq('dry_date', filters.dry_date);
  if (filters.verification_status) query = query.eq('verification_status', filters.verification_status);
  if (filters.published === 'true') query = query.eq('is_published', true);
  if (filters.published === 'false') query = query.eq('is_published', false);

  const { data, error, count } = await query
    .order('dry_date', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    return { rows: [], count: 0, page, perPage, error: mapDbError(error) };
  }

  return {
    rows: (data as DryDayRow[]) ?? [],
    count: count ?? 0,
    page,
    perPage,
  };
}

export async function getDryDay(
  supabase: AdminSupabase,
  id: string
): Promise<{ row: DryDayRow | null; error?: string }> {
  if (!isUuid(id)) return { row: null, error: INVALID_ID_MESSAGE };

  const { data, error } = await supabase
    .from('dry_days')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) return { row: null, error: mapDbError(error) };
  return { row: (data as DryDayRow) ?? null };
}

function toDryDayPayload(values: DryDayValues): Record<string, unknown> {
  return {
    reason: values.reason,
    state: values.state,
    dry_date: values.dry_date,
    type: values.type,
    verification_status: values.verification_status,
    source_url: values.source_url,
    source_note: values.source_note,
    source_type: values.source_type,
    locality: values.locality,
    time_start: values.time_start,
    time_end: values.time_end,
    is_published: values.is_published,
  };
}

export async function insertDryDay(
  supabase: AdminSupabase,
  values: DryDayValues,
  createdBy: string
): Promise<SaveResult> {
  const { data, error } = await supabase
    .from('dry_days')
    .insert({ ...toDryDayPayload(values), created_by: createdBy })
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, error: mapDbError(error), code: 'database' };
  return { ok: true, id: data?.id as string | undefined };
}

export async function updateDryDay(
  supabase: AdminSupabase,
  id: string,
  values: DryDayValues
): Promise<SaveResult> {
  if (!isUuid(id)) return { ok: false, error: INVALID_ID_MESSAGE, code: 'validation' };

  const { data, error } = await supabase
    .from('dry_days')
    .update(toDryDayPayload(values))
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, error: mapDbError(error), code: 'database' };
  if (!data) return { ok: false, error: 'Dry-day record not found.', code: 'database' };
  return { ok: true, id: data.id as string };
}

export async function deleteDryDay(supabase: AdminSupabase, id: string): Promise<SaveResult> {
  if (!isUuid(id)) return { ok: false, error: INVALID_ID_MESSAGE, code: 'validation' };

  const { data, error } = await supabase
    .from('dry_days')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, error: mapDbError(error), code: 'database' };
  if (!data) return { ok: false, error: 'Dry-day record not found.', code: 'database' };
  return { ok: true };
}

export async function setDryDayPublished(
  supabase: AdminSupabase,
  id: string,
  published: boolean
): Promise<SaveResult> {
  if (!isUuid(id)) return { ok: false, error: INVALID_ID_MESSAGE, code: 'validation' };
  if (typeof published !== 'boolean') {
    return { ok: false, error: 'Publication flag must be a boolean.', code: 'validation' };
  }

  const { data, error } = await supabase
    .from('dry_days')
    .update({ is_published: published })
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, error: mapDbError(error), code: 'database' };
  if (!data) return { ok: false, error: 'Dry-day record not found.', code: 'database' };
  return { ok: true };
}

/**
 * Quick confirm/unconfirm from the list view: patches ONLY
 * verification_status, leaving publication untouched so the two stay
 * logically distinct (a confirmed draft is still invisible until published;
 * an unconfirmed published record stops being shown as confirmed).
 */
export async function setDryDayVerification(
  supabase: AdminSupabase,
  id: string,
  status: VerificationStatus
): Promise<SaveResult> {
  if (!isUuid(id)) return { ok: false, error: INVALID_ID_MESSAGE, code: 'validation' };
  if (!VERIFICATION_STATUSES.includes(status)) {
    return { ok: false, error: 'Choose a verification status.', code: 'validation' };
  }

  const { data, error } = await supabase
    .from('dry_days')
    .update({ verification_status: status })
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, error: mapDbError(error), code: 'database' };
  if (!data) return { ok: false, error: 'Dry-day record not found.', code: 'database' };
  return { ok: true };
}

/** Exact row count for dashboard stats (head query). null on error. */
export async function countDryDays(
  supabase: AdminSupabase,
  filter?: { published?: boolean; verification_status?: VerificationStatus }
): Promise<number | null> {
  let query = supabase.from('dry_days').select('id', { count: 'exact', head: true });
  if (filter?.published !== undefined) query = query.eq('is_published', filter.published);
  if (filter?.verification_status) query = query.eq('verification_status', filter.verification_status);

  const { count, error } = await query;
  if (error) return null;
  return count ?? 0;
}
