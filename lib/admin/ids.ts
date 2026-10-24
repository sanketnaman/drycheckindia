/**
 * Record identifier validation.
 *
 * Both admin tables use `uuid` primary keys (supabase/migrations/0002 and
 * /0003). Identifiers reach the data layer from two untrusted directions:
 * the `/admin/dry-days/[id]/edit` route params and the server-action
 * arguments bound in the list views. Both are validated here so a malformed
 * identifier never reaches PostgREST.
 *
 * The pattern accepts the canonical 8-4-4-4-12 hex form, which covers every
 * UUID version Postgres/Supabase can generate (v4 `gen_random_uuid()`, v7, ...).
 */

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** User-facing message for a malformed record identifier. */
export const INVALID_ID_MESSAGE = 'Invalid record id.';

/** True when the value is a syntactically valid UUID string. */
export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && UUID_RE.test(value);
}
