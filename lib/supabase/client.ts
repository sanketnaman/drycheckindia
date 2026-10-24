import { createBrowserClient as createSSRBrowserClient } from '@supabase/ssr';
import {
  getSupabaseConfigStatus,
  SUPABASE_UNAVAILABLE_MESSAGE,
  type SupabaseConfigError,
} from './config';

/**
 * Error thrown on the client when Supabase is not configured. The message is
 * safe to display: it never contains the configured values.
 */
export class SupabaseClientNotConfiguredError extends Error {
  readonly reason: SupabaseConfigError['reason'];

  constructor(error: SupabaseConfigError) {
    super(SUPABASE_UNAVAILABLE_MESSAGE);
    this.name = 'SupabaseClientNotConfiguredError';
    this.reason = error.reason;
  }
}

/**
 * Browser-side Supabase client (client components only). Uses the publishable
 * key only — the service-role key must never appear in browser code.
 *
 * Throws a typed SupabaseClientNotConfiguredError when the environment is
 * missing or still holds the .env.example placeholders.
 */
export function createBrowserClient() {
  const config = getSupabaseConfigStatus();
  if (!config.ok) {
    throw new SupabaseClientNotConfiguredError(config);
  }
  return createSSRBrowserClient(config.url, config.key);
}

/** Type guard so callers can detect the controlled "not configured" failure. */
export function isSupabaseClientNotConfigured(
  error: unknown
): error is SupabaseClientNotConfiguredError {
  return error instanceof SupabaseClientNotConfiguredError;
}
