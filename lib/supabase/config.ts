/**
 * Supabase environment configuration.
 *
 * The admin backend must fail *closed* but must never fail *loudly*: a missing
 * or still-placeholder configuration previously threw inside the request path,
 * which produced a 500 page (or a redirect loop between /admin/login and
 * /admin/login?error=forbidden).
 *
 * This module is the single place that decides whether Supabase is usable.
 * It NEVER returns the configured values in an error message, and it never
 * touches SUPABASE_SERVICE_ROLE_KEY.
 *
 * Only the two NEXT_PUBLIC_* variables are read here. They are safe to inline
 * into a browser bundle; the service-role key is deliberately not referenced.
 */

export const SUPABASE_UNAVAILABLE_MESSAGE =
  'Supabase is not configured for this deployment.';

export type SupabaseConfigReason = 'missing' | 'placeholder' | 'invalid';

export interface SupabaseConfigOk {
  ok: true;
  url: string;
  key: string;
}

export interface SupabaseConfigError {
  ok: false;
  reason: SupabaseConfigReason;
  /** Operator-facing hint. Contains no configuration values. */
  message: string;
}

export type SupabaseConfigStatus = SupabaseConfigOk | SupabaseConfigError;

const ENV_URL = 'NEXT_PUBLIC_SUPABASE_URL';
const ENV_KEY = 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY';

/** Exported for tests and operator tooling that need the variable names. */
export const SUPABASE_ENV_VARS = { url: ENV_URL, key: ENV_KEY } as const;

/**
 * Flattened marker strings that identify the placeholder values shipped in
 * .env.example (e.g. "https://YOUR_PROJECT_REF.supabase.co") and the other
 * hand-edited dummy values that are commonly left in a local .env.local
 * (e.g. "https://your-project.supabase.co" / "your-publishable-key").
 *
 * The comparison runs against a separator-free copy of the value so that
 * "YOUR_PROJECT_REF", "your-project-ref" and "yourprojectref" all collapse to
 * the same marker.
 *
 * A real Supabase project URL is "https://<random-ref>.supabase.co" and a
 * real publishable key is "sb_publishable_<base64>", so none of these markers
 * can occur in genuine values.
 */
const PLACEHOLDER_MARKERS = [
  'yourproject',
  'yourprojecturl',
  'yoursupabase',
  'yourpublishable',
  'yourpublishableoranonkey',
  'youranonkey',
  'yoursupabasekey',
  'yourservicerolekey',
  'changeme',
  'placeholder',
  'replaceme',
  'todo',
  'xxxx',
];

/** True when the value looks like an unfilled template rather than a real one. */
export function looksLikePlaceholder(value: string): boolean {
  const flat = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
  if (!flat) return true;
  return PLACEHOLDER_MARKERS.some((marker) => flat.includes(marker));
}

/** A Supabase project URL must be absolute http(s). */
function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    return parsed.hostname.length > 0;
  } catch {
    return false;
  }
}

function missingMessage(names: string[]): string {
  return `Set ${names.join(' and ')} in the deployment environment, then reload.`;
}

function placeholderMessage(): string {
  return 'The configured Supabase values are still placeholders from .env.example. Replace them with the real project URL and publishable key.';
}

function invalidMessage(): string {
  return 'The configured Supabase project URL is not a valid http(s) URL.';
}

/**
 * Reads and validates the Supabase environment configuration.
 *
 * Returns the ready-to-use values only when they are present, non-template
 * and well formed. Otherwise it returns a reason plus a safe hint — never the
 * offending value.
 *
 * IMPORTANT: the two variables are read with STATIC member access on purpose.
 * Next.js inlines `process.env.NEXT_PUBLIC_*` into the browser bundle only for
 * literal member expressions; a dynamic `process.env[name]` lookup resolves to
 * `undefined` in the browser because the client `process` shim exposes an
 * empty `env` object. Keep these as `process.env.NEXT_PUBLIC_*` literals.
 */
export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ?? '';

  const missing: string[] = [];
  if (!url) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!key) missing.push('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
  if (missing.length > 0) {
    return { ok: false, reason: 'missing', message: missingMessage(missing) };
  }

  if (looksLikePlaceholder(url) || looksLikePlaceholder(key)) {
    return { ok: false, reason: 'placeholder', message: placeholderMessage() };
  }

  if (!isValidUrl(url)) {
    return { ok: false, reason: 'invalid', message: invalidMessage() };
  }

  return { ok: true, url, key };
}

/** Convenience predicate: is Supabase usable right now? */
export function isSupabaseConfigured(): boolean {
  return getSupabaseConfigStatus().ok;
}
