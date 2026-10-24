import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Schema authority: supabase/migrations (0002_dry_days, 0003_public_notices).
 *
 * Field mapping from the Phase 3 prompt to the ACTUAL schema (no invented columns):
 *   occasion/reason           -> dry_days.reason
 *   state (scope)             -> dry_days.state          (state/UT slug or 'all')
 *   dry date                  -> dry_days.dry_date       (date)
 *   affected area/locality    -> dry_days.locality       (required when type='local')
 *   start/end time            -> dry_days.time_start / time_end (time without time zone)
 *   source URL                -> dry_days.source_url
 *   source type               -> dry_days.source_type
 *   verification status       -> dry_days.verification_status  (NOT 'status' — renamed in F2)
 *   notes                     -> dry_days.source_note
 *   publication status        -> dry_days.is_published
 *   notice start/end          -> public_notices.starts_at / ends_at (timestamptz, stored UTC)
 *   notice severity/scope     -> public_notices.severity / state
 */

/** Supabase client type used across the admin data layer (mockable in tests). */
export type AdminSupabase = SupabaseClient;

export type DryDayType = 'national' | 'festival' | 'election' | 'state' | 'local';
export type VerificationStatus = 'confirmed' | 'pending' | 'reported';
export type SourceType = 'official' | 'gazette' | 'news' | 'other';
export type NoticeSeverity = 'info' | 'warning' | 'critical';

export const DRY_DAY_TYPES: readonly DryDayType[] = [
  'national',
  'festival',
  'election',
  'state',
  'local',
];
export const VERIFICATION_STATUSES: readonly VerificationStatus[] = [
  'confirmed',
  'pending',
  'reported',
];
export const SOURCE_TYPES: readonly SourceType[] = ['official', 'gazette', 'news', 'other'];
export const NOTICE_SEVERITIES: readonly NoticeSeverity[] = ['info', 'warning', 'critical'];

export interface VerificationMeta {
  label: string;
  badge: string;
  help: string;
}

/** How each verification level must be presented (never inflate reported/pending). */
export const VERIFICATION_META: Record<VerificationStatus, VerificationMeta> = {
  confirmed: {
    label: 'Officially confirmed',
    badge: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/70',
    help: 'Backed by an official source (gazette, government order). Shown as verified dry.',
  },
  reported: {
    label: 'Reported (news only)',
    badge: 'bg-sky-950/70 text-sky-300 border-sky-800/70',
    help: 'News reports without official confirmation. Shown as "maybe", never as verified dry.',
  },
  pending: {
    label: 'Pending verification',
    badge: 'bg-amber-950/70 text-amber-300 border-amber-800/70',
    help: 'Unverified. Never presented as a confirmed dry day.',
  },
};

export const SOURCE_TYPE_META: Record<SourceType, string> = {
  official: 'Official',
  gazette: 'Gazette',
  news: 'News',
  other: 'Other',
};

export const DRY_DAY_TYPE_LABELS: Record<DryDayType, string> = {
  national: 'National',
  festival: 'Festival',
  election: 'Election',
  state: 'State-wide',
  local: 'Local (area only)',
};

export const NOTICE_SEVERITY_META: Record<NoticeSeverity, { label: string; badge: string }> = {
  info: { label: 'Info', badge: 'bg-sky-950/70 text-sky-300 border-sky-800/70' },
  warning: { label: 'Warning', badge: 'bg-amber-950/70 text-amber-300 border-amber-800/70' },
  critical: { label: 'Critical', badge: 'bg-rose-950/70 text-rose-300 border-rose-800/70' },
};

export interface DryDayRow {
  id: string;
  state: string;
  dry_date: string;
  type: DryDayType;
  reason: string;
  verification_status: VerificationStatus;
  source_url: string | null;
  source_note: string | null;
  source_type: SourceType | null;
  locality: string | null;
  time_start: string | null;
  time_end: string | null;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface NoticeRow {
  id: string;
  title: string;
  body: string;
  severity: NoticeSeverity;
  state: string | null;
  starts_at: string | null;
  ends_at: string | null;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

/** Raw form payload (loose types — validation narrows to *Values). */
export interface DryDayInput {
  reason?: string;
  state?: string;
  dry_date?: string;
  type?: string;
  verification_status?: string;
  source_url?: string;
  source_note?: string;
  source_type?: string;
  locality?: string;
  time_start?: string;
  time_end?: string;
  is_published?: boolean;
}

/** Validated dry-day payload ready for insert/update. */
export interface DryDayValues {
  reason: string;
  state: string;
  dry_date: string;
  type: DryDayType;
  verification_status: VerificationStatus;
  source_url: string | null;
  source_note: string | null;
  source_type: SourceType | null;
  locality: string | null;
  time_start: string | null;
  time_end: string | null;
  is_published: boolean;
}

/** Raw notice payload. starts_at/ends_at are IST wall times from the form. */
export interface NoticeInput {
  title?: string;
  body?: string;
  severity?: string;
  state?: string;
  starts_at?: string;
  ends_at?: string;
  is_published?: boolean;
}

/** Validated notice payload (window fields still IST wall times). */
export interface NoticeValues {
  title: string;
  body: string;
  severity: NoticeSeverity;
  state: string | null;
  starts_at: string | null;
  ends_at: string | null;
  is_published: boolean;
}

export type ValidationResult<T> =
  | { ok: true; values: T }
  | { ok: false; errors: Record<string, string> };

export type AuthzCode = 'unauthenticated' | 'forbidden';

export interface ActionResult {
  ok: boolean;
  error?: string;
  errors?: Record<string, string>;
  code?: AuthzCode | 'validation' | 'database' | 'unavailable';
}

export interface SaveResult extends ActionResult {
  id?: string;
}
