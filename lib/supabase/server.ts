import { createServerClient as createSSRServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import {
  getSupabaseConfigStatus,
  SUPABASE_UNAVAILABLE_MESSAGE,
  type SupabaseConfigError,
} from './config';

/**
 * Error thrown when Supabase is not configured. It is a *controlled* failure:
 * callers must translate it into a friendly state instead of letting it
 * bubble up as a 500. The message never contains configuration values.
 */
export class SupabaseNotConfiguredError extends Error {
  readonly reason: SupabaseConfigError['reason'];

  constructor(error: SupabaseConfigError) {
    super(SUPABASE_UNAVAILABLE_MESSAGE);
    this.name = 'SupabaseNotConfiguredError';
    this.reason = error.reason;
  }
}

/**
 * Server-side Supabase client (App Router: Server Components, Server Actions,
 * Route Handlers). Cookie access goes through the Next.js cookie adapter so
 * session refreshes persist.
 *
 * Fails closed when the environment is missing or still holds the placeholder
 * values from .env.example. It throws a typed SupabaseNotConfiguredError (never
 * a raw configuration dump) so request paths can render a friendly
 * "not configured" state.
 */
export async function createServerClient() {
  const config = getSupabaseConfigStatus();
  if (!config.ok) {
    throw new SupabaseNotConfiguredError(config);
  }

  const cookieStore = await cookies();

  return createSSRServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a read-only Server Component context. Middleware
          // refreshes the session on navigation instead; safe to ignore.
        }
      },
    },
  });
}

/** Type guard so callers can detect the controlled "not configured" failure. */
export function isSupabaseNotConfigured(error: unknown): error is SupabaseNotConfiguredError {
  return error instanceof SupabaseNotConfiguredError;
}
