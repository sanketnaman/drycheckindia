/**
 * Public (anon) read layer for published dry days and public notices.
 *
 * Supabase is the SINGLE SOURCE OF TRUTH for manually managed dry-day entries.
 * There is no JSON fallback: when Supabase is unconfigured or a fetch fails we
 * return an error result (and log server-side) so pages can render the
 * explicit data-unavailable state. A silent JSON fallback previously masked an
 * empty/erroring database with stale bundled records — that behaviour is
 * deliberately gone.
 *
 * Guarantees:
 *  - Reads only rows with is_published = true AND verification_status in
 *    ('confirmed', 'reported'). Pending/unpublished rows never reach the
 *    public site (reported rows surface as clearly-labelled unconfirmed).
 *  - Whole-source: the returned rows are the entire public dataset. Nothing
 *    is merged in from anywhere else.
 *  - A SUCCESSFUL fetch of zero rows (ok: true, entries: []) is meaningfully
 *    different from a FAILED fetch (ok: false): pages must never treat a
 *    failed query as proof that no entry exists, nor an empty success as a
 *    technical failure.
 *  - Any fetch/config error returns ok: false — never throws into a page
 *    render, never surfaces raw errors to visitors, never invents entries.
 *  - Never called from the browser: this module is imported by server
 *    components only; a window guard reports a browser error before any
 *    client code could run a network request.
 *  - Error logs contain messages only — no URLs, no keys.
 */
import { createClient } from '@supabase/supabase-js';

import type { DryDayEntry } from '@/lib/dryday';
import { getSupabaseConfigStatus } from '@/lib/supabase/config';
import type { DryDayRow, NoticeRow, NoticeSeverity } from '@/lib/admin/types';

const DRY_DAY_COLUMNS =
  'state,dry_date,type,reason,verification_status,source_url,source_note,locality';
const NOTICE_COLUMNS = 'id,title,body,severity,state,starts_at,ends_at';

/** PostgREST returns at most `max-rows` rows per request (default 1000). */
const PAGE_SIZE = 1000;
/** Safety cap: refuse to render a partial dataset silently. */
const MAX_DRY_DAY_ROWS = 10000;
const NOTICE_LIMIT = 100;

/** Verification statuses the public site is allowed to surface. */
const PUBLIC_VERIFICATION_STATUSES = ['confirmed', 'reported'] as const;

/** Why a public dataset fetch could not produce rows. */
export type PublicDatasetErrorReason = 'browser' | 'unconfigured' | 'fetch_failed';

/**
 * Result of a public dry-day fetch. `ok: true` means the database answered
 * (entries may still be [] — nothing published yet). `ok: false` means the
 * status could not be retrieved at all and pages must show the
 * data-unavailable state instead of the default open answer.
 */
export type PublicDataset =
  | { ok: true; entries: DryDayEntry[] }
  | { ok: false; entries: DryDayEntry[]; reason: PublicDatasetErrorReason };

type PublicDryDayRow = Pick<
  DryDayRow,
  'state' | 'dry_date' | 'type' | 'reason' | 'verification_status' | 'source_url' | 'source_note' | 'locality'
>;

type PublicNoticeRow = Pick<
  NoticeRow,
  'id' | 'title' | 'body' | 'severity' | 'state' | 'starts_at' | 'ends_at'
>;

export interface PublicNotice {
  id: string;
  title: string;
  body: string;
  severity: NoticeSeverity;
  state: string | null;
  startsAt: string | null;
  endsAt: string | null;
}

function mapDryDayRow(row: PublicDryDayRow): DryDayEntry {
  return {
    state: row.state,
    date: row.dry_date,
    type: row.type,
    reason: row.reason,
    status: row.verification_status,
    sourceUrl: row.source_url ?? '',
    sourceNote: row.source_note ?? undefined,
    locality: row.locality ?? undefined,
  };
}

function mapNoticeRow(row: PublicNoticeRow): PublicNotice {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    severity: row.severity,
    state: row.state,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
  };
}

/**
 * Active notice window at `nowMs`. A present-but-unparseable timestamp hides
 * the notice (conservative: never show an expired/future notice by accident).
 * Null (absent) bound = open-ended.
 */
export function isNoticeWindowActive(
  notice: Pick<PublicNotice, 'startsAt' | 'endsAt'>,
  nowMs: number
): boolean {
  if (notice.startsAt) {
    const start = Date.parse(notice.startsAt);
    if (Number.isNaN(start) || nowMs < start) return false;
  }
  if (notice.endsAt) {
    const end = Date.parse(notice.endsAt);
    if (Number.isNaN(end) || nowMs > end) return false;
  }
  return true;
}

/**
 * Published, publicly-verified dry-day entries from Supabase.
 * Distinguishes a successful empty fetch (ok: true, entries: []) from a
 * failed one (ok: false) — a failed query must never read as "no entry".
 */
export async function getPublicDataset(): Promise<PublicDataset> {
  if (typeof window !== 'undefined') return { ok: false, entries: [], reason: 'browser' };

  const config = getSupabaseConfigStatus();
  if (!config.ok) {
    console.error(
      '[public-drydays] Supabase unconfigured; public dataset unavailable:',
      config.reason
    );
    return { ok: false, entries: [], reason: 'unconfigured' };
  }

  try {
    const supabase = createClient(config.url, config.key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const rows: DryDayEntry[] = [];
    let offset = 0;

    for (;;) {
      const { data, error } = await supabase
        .from('dry_days')
        .select(DRY_DAY_COLUMNS)
        .eq('is_published', true)
        .in('verification_status', [...PUBLIC_VERIFICATION_STATUSES])
        .order('dry_date', { ascending: true })
        .range(offset, offset + PAGE_SIZE - 1);

      if (error) throw new Error(error.message);

      const batch = (data ?? []) as unknown as PublicDryDayRow[];
      for (const row of batch) {
        // Defence in depth: never surface an unexpected status.
        if (
          !PUBLIC_VERIFICATION_STATUSES.includes(
            row.verification_status as (typeof PUBLIC_VERIFICATION_STATUSES)[number]
          )
        ) {
          continue;
        }
        rows.push(mapDryDayRow(row));
      }

      if (batch.length < PAGE_SIZE) break;
      offset += PAGE_SIZE;
      if (offset >= MAX_DRY_DAY_ROWS) {
        throw new Error(`published dry-day rows exceeded ${MAX_DRY_DAY_ROWS}`);
      }
    }

    return { ok: true, entries: rows };
  } catch (err) {
    console.error(
      '[public-drydays] dry-day fetch failed; public dataset unavailable:',
      err instanceof Error ? err.message : 'unknown error'
    );
    return { ok: false, entries: [], reason: 'fetch_failed' };
  }
}

/**
 * Convenience wrapper for callers that only need the rows (sitemap, static
 * params): errors degrade to [] there because those callers cannot show a
 * status anyway. Pages that answer "is the theka band?" MUST use
 * getPublicDataset() so a failed fetch is never rendered as "no entry".
 */
export async function getPublicEntries(): Promise<DryDayEntry[]> {
  return (await getPublicDataset()).entries;
}

/**
 * Published public notices inside their active window (window filtering is
 * done here in JS so null-bounded windows behave exactly like the admin UI).
 * Returns [] whenever the fetch fails or Supabase is unconfigured —
 * notices are optional banners; they must never break a page render.
 */
export async function getPublishedNotices(): Promise<PublicNotice[]> {
  if (typeof window !== 'undefined') return [];

  const config = getSupabaseConfigStatus();
  if (!config.ok) return [];

  try {
    const supabase = createClient(config.url, config.key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from('public_notices')
      .select(NOTICE_COLUMNS)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(NOTICE_LIMIT);

    if (error) throw new Error(error.message);

    const now = Date.now();
    return ((data ?? []) as unknown as PublicNoticeRow[])
      .map(mapNoticeRow)
      .filter((notice) => isNoticeWindowActive(notice, now));
  } catch (err) {
    console.error(
      '[public-drydays] notice fetch failed; showing no notices:',
      err instanceof Error ? err.message : 'unknown error'
    );
    return [];
  }
}
