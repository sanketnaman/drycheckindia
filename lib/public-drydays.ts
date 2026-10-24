/**
 * Public (anon) read layer for published dry days and public notices.
 *
 * Supabase is the SINGLE SOURCE OF TRUTH for manually managed dry-day entries.
 * There is no JSON fallback: when Supabase is unconfigured or a fetch fails we
 * return an empty dataset (and log server-side) so pages can render the
 * explicit "no verified entries published yet" empty state. A silent JSON
 * fallback previously masked an empty/erroring database with stale bundled
 * records — that behaviour is deliberately gone.
 *
 * Guarantees:
 *  - Reads only rows with is_published = true AND verification_status in
 *    ('confirmed', 'reported'). Pending/unpublished rows never reach the
 *    public site (reported rows surface as clearly-labelled "Maybe").
 *  - Whole-source: the returned rows are the entire public dataset. Nothing
 *    is merged in from anywhere else.
 *  - Any fetch/config error returns [] — never throws into a page render,
 *    never surfaces raw errors to visitors, never invents entries.
 *  - Never called from the browser: this module is imported by server
 *    components only; a window guard returns [] before any client code could
 *    run a network request.
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
 * Returns [] when unconfigured, in a browser-like environment, or on any
 * fetch error — the empty state is honest; a silent fallback is not.
 */
export async function getPublicEntries(): Promise<DryDayEntry[]> {
  if (typeof window !== 'undefined') return [];

  const config = getSupabaseConfigStatus();
  if (!config.ok) {
    console.error(
      '[public-drydays] Supabase unconfigured; serving an empty public dataset:',
      config.reason
    );
    return [];
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

    return rows;
  } catch (err) {
    console.error(
      '[public-drydays] dry-day fetch failed; serving an empty public dataset:',
      err instanceof Error ? err.message : 'unknown error'
    );
    return [];
  }
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
