/**
 * Google Analytics 4 configuration.
 *
 * The Measurement ID is read from NEXT_PUBLIC_GA_MEASUREMENT_ID. It is safe to
 * inline into a browser bundle (it is not a secret), but it is only used when
 * it is present AND not a placeholder/example value — tracking is disabled
 * otherwise so a local dev tree or a half-configured deployment never fires
 * events to a dummy property.
 */

export const GA_MEASUREMENT_ID_ENV = 'NEXT_PUBLIC_GA_MEASUREMENT_ID';

/**
 * A real GA4 Measurement ID looks like "G-XXXXXXXXXX" (G- followed by 6–10
 * alphanumerics). The example value shipped in .env.example is
 * "G-XXXXXXXXXX" — that is a placeholder and must NOT be tracked.
 */
const GA_ID_RE = /^G-[A-Z0-9]{6,10}$/;

/** Placeholder/example values that must never be tracked. */
const PLACEHOLDER_IDS = new Set(['G-XXXXXXXXXX', 'G-EXAMPLE', 'G-TEST', 'G-PLACEHOLDER']);

/**
 * Returns the Measurement ID to use, or null when tracking must stay disabled.
 *
 * Disabled when:
 *   - the variable is missing/empty, or
 *   - it is a known placeholder/example value, or
 *   - it does not match the GA4 id format.
 *
 * The value is read with a STATIC member expression so Next.js inlines it at
 * build time (a dynamic `process.env[name]` lookup resolves to undefined in
 * browser bundles).
 */
export function getGaMeasurementId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '';

  if (!raw) return null;
  if (PLACEHOLDER_IDS.has(raw)) return null;
  if (!GA_ID_RE.test(raw)) return null;

  return raw;
}

/** True when GA4 tracking is enabled for this deployment. */
export function isGaEnabled(): boolean {
  return getGaMeasurementId() !== null;
}
