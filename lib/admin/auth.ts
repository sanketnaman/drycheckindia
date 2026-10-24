import type { AdminSupabase } from './types';

export type AdminAuthz =
  | { kind: 'ok'; user: { id: string; email: string | null } }
  | { kind: 'unauthenticated' }
  | { kind: 'forbidden' };

/**
 * Authoritative server-side authorization check.
 *
 * 1. Validates the session with auth.getUser() (never trusts a client flag).
 * 2. Verifies membership by SELECTing the caller's own admin_users row using
 *    the caller's own session (RLS: select policy allows self or admin; rows
 *    can only be created by existing admins or the table owner, so an existing
 *    row for the user means membership).
 * 3. Fails closed: any error -> forbidden.
 */
export async function authorizeAdmin(supabase: AdminSupabase): Promise<AdminAuthz> {
  let userId: string;
  let email: string | null;

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      return { kind: 'unauthenticated' };
    }
    userId = data.user.id;
    email = data.user.email ?? null;
  } catch {
    return { kind: 'unauthenticated' };
  }

  try {
    const { data: member, error } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) return { kind: 'forbidden' };
    if (!member) return { kind: 'forbidden' };
    return { kind: 'ok', user: { id: userId, email } };
  } catch {
    return { kind: 'forbidden' };
  }
}

export interface SignInResult {
  ok: boolean;
  error?: string;
}

/**
 * Signs in with email/password. Error messages are deliberately generic so the
 * form never reveals whether an account exists. Safe to unit test with a mock
 * client.
 */
export async function signInWithEmail(
  supabase: AdminSupabase,
  email: string,
  password: string
): Promise<SignInResult> {
  if (!email.trim() || !password) {
    return { ok: false, error: 'Enter your email and password.' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      const msg = error.message ?? '';
      if (/invalid login credentials/i.test(msg)) {
        return { ok: false, error: 'Invalid email or password.' };
      }
      if (/rate limit|too many request/i.test(msg)) {
        return { ok: false, error: 'Too many attempts. Please wait a moment and try again.' };
      }
      return { ok: false, error: 'Sign-in failed. Please try again.' };
    }

    if (!data?.session) {
      return { ok: false, error: 'Sign-in failed. Please try again.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Sign-in failed. Please try again.' };
  }
}
