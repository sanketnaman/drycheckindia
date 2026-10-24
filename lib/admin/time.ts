/**
 * Time handling for admin forms.
 *
 * Convention (documented, matches Phase 2 schema):
 * - The site operates in IST (Asia/Kolkata, UTC+05:30) — the public site's date
 *   helpers (lib/dryday.ts) also use a fixed +05:30 offset.
 * - dry_days.time_start/time_end are `time without time zone`: plain local
 *   (IST) wall times, stored exactly as entered. No conversion (F5: no
 *   overnight wrap — see migrations README).
 * - public_notices.starts_at/ends_at are `timestamptz`: the form collects IST
 *   wall times (datetime-local) and THIS module converts them to UTC ISO
 *   strings for storage; on edit, stored UTC values are converted back to IST
 *   wall times for display. The DB compares them against now() (UTC) with
 *   inclusive bounds (F12).
 *
 * All conversions use the fixed +05:30 offset (never the server timezone), so
 * results are deterministic on server and client.
 */

export const IST_UTC_OFFSET_MINUTES = 5 * 60 + 30;

const IST_INPUT_RE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

function daysInMonth(year: number, month1to12: number): number {
  if (month1to12 === 2) {
    const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return leap ? 29 : 28;
  }
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month1to12 - 1];
}

/**
 * Converts an IST datetime-local string ('YYYY-MM-DDTHH:MM') to a UTC ISO
 * string for timestamptz storage. Returns null for invalid input.
 */
export function istInputToUtcIso(local: string | null | undefined): string | null {
  if (!local) return null;
  const match = IST_INPUT_RE.exec(local);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);

  if (month < 1 || month > 12) return null;
  if (day < 1 || day > daysInMonth(year, month)) return null;
  if (hour > 23 || minute > 59) return null;

  const utcMs = Date.UTC(year, month - 1, day, hour, minute) - IST_UTC_OFFSET_MINUTES * 60_000;
  return new Date(utcMs).toISOString();
}

/**
 * Converts a stored timestamptz value (any format Date.parse understands) to
 * an IST datetime-local string for form display. Returns '' when null/invalid.
 */
export function utcTimestamptzToIstInput(value: string | null | undefined): string {
  if (!value) return '';
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return '';

  const ist = new Date(parsed + IST_UTC_OFFSET_MINUTES * 60_000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${ist.getUTCFullYear()}-${pad(ist.getUTCMonth() + 1)}-${pad(ist.getUTCDate())}` +
    `T${pad(ist.getUTCHours())}:${pad(ist.getUTCMinutes())}`
  );
}

/** True when value matches 'YYYY-MM-DDTHH:MM' AND is a real calendar instant. */
export function isIstInput(value: string | null | undefined): boolean {
  if (!value) return false;

  const match = IST_INPUT_RE.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > daysInMonth(year, month)) return false;
  if (hour > 23 || minute > 59) return false;

  return true;
}
