'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient, isSupabaseNotConfigured } from '@/lib/supabase/server';
import { authorizeAdmin } from '@/lib/admin/auth';
import {
  deleteDryDay,
  insertDryDay,
  updateDryDay,
  setDryDayPublished,
  setDryDayVerification,
  validateDryDayInput,
} from '@/lib/admin/drydays';
import {
  deleteNotice,
  insertNotice,
  updateNotice,
  setNoticePublished,
  validateNoticeInput,
} from '@/lib/admin/notices';
import { INVALID_ID_MESSAGE, isUuid } from '@/lib/admin/ids';
import {
  VERIFICATION_STATUSES,
  type ActionResult,
  type DryDayInput,
  type NoticeInput,
  type SaveResult,
  type VerificationStatus,
} from '@/lib/admin/types';

const UNAUTHENTICATED_MESSAGE = 'Your session has expired. Please sign in again.';
const FORBIDDEN_MESSAGE = 'This account does not have admin access.';
const NOT_CONFIGURED_MESSAGE =
  'The admin backend is not configured for this deployment. No changes were saved.';

type AuthGuard =
  | { ok: true; supabase: Awaited<ReturnType<typeof createServerClient>>; userId: string }
  | { ok: false; result: ActionResult };

/**
 * Validates the shape of the action arguments before anything touches the
 * database (I3). Server-action arguments are attacker-controllable: the
 * bound ids come from the list views and the publication flag is a plain
 * boolean, so both are re-checked here.
 */
function invalidActionArgument(message: string): ActionResult {
  return { ok: false, code: 'validation', error: message };
}

/** Validates an optional record id (undefined = create). */
function validateRecordId(id: string | undefined): ActionResult | null {
  if (id === undefined) return null;
  if (!isUuid(id)) return invalidActionArgument(INVALID_ID_MESSAGE);
  return null;
}

/** Validates a publication flag. */
function validatePublishedFlag(published: unknown): ActionResult | null {
  if (typeof published !== 'boolean') {
    return invalidActionArgument('Publication flag must be a boolean.');
  }
  return null;
}

/** Validates a verification status value. */
function validateVerificationStatus(status: unknown): ActionResult | null {
  if (
    typeof status !== 'string' ||
    !VERIFICATION_STATUSES.includes(status as VerificationStatus)
  ) {
    return invalidActionArgument('Choose a verification status.');
  }
  return null;
}

/**
 * Every mutation runs this server-side guard first: valid session AND a
 * verified admin_users membership row (never a client-supplied flag). The SQL
 * RLS policies in 0004 are the second enforcement layer because mutations run
 * with the caller's own session — no service-role key is used anywhere.
 *
 * When Supabase is not configured the guard returns a safe result instead of
 * throwing, so the admin UI shows a message rather than a 500. It fails
 * closed: no database call is made at all.
 */
async function requireAdminForAction(): Promise<AuthGuard> {
  let supabase: Awaited<ReturnType<typeof createServerClient>>;
  try {
    supabase = await createServerClient();
  } catch (error) {
    if (isSupabaseNotConfigured(error)) {
      return {
        ok: false,
        result: { ok: false, code: 'unavailable', error: NOT_CONFIGURED_MESSAGE },
      };
    }
    throw error;
  }

  const authz = await authorizeAdmin(supabase);

  if (authz.kind !== 'ok') {
    return {
      ok: false,
      result: {
        ok: false,
        code: authz.kind,
        error: authz.kind === 'unauthenticated' ? UNAUTHENTICATED_MESSAGE : FORBIDDEN_MESSAGE,
      },
    };
  }

  return { ok: true, supabase, userId: authz.user.id };
}

export async function saveDryDayAction(
  input: DryDayInput,
  id?: string
): Promise<SaveResult> {
  const idError = validateRecordId(id);
  if (idError) return idError;

  const guard = await requireAdminForAction();
  if (!guard.ok) return guard.result;

  const validated = validateDryDayInput(input);
  if (!validated.ok) {
    return { ok: false, code: 'validation', errors: validated.errors };
  }

  const result = id
    ? await updateDryDay(guard.supabase, id, validated.values)
    : await insertDryDay(guard.supabase, validated.values, guard.userId);

  if (!result.ok) return result;

  revalidatePath('/admin/dry-days');
  revalidatePath('/admin');
  return { ok: true, id: result.id };
}

export async function deleteDryDayAction(id: string): Promise<ActionResult> {
  const idError = validateRecordId(id);
  if (idError) return idError;

  const guard = await requireAdminForAction();
  if (!guard.ok) return guard.result;

  const result = await deleteDryDay(guard.supabase, id);
  if (!result.ok) return result;

  revalidatePath('/admin/dry-days');
  revalidatePath('/admin');
  return { ok: true };
}

export async function setDryDayPublishedAction(
  id: string,
  published: boolean
): Promise<ActionResult> {
  const idError = validateRecordId(id);
  if (idError) return idError;

  const publishedError = validatePublishedFlag(published);
  if (publishedError) return publishedError;

  const guard = await requireAdminForAction();
  if (!guard.ok) return guard.result;

  const result = await setDryDayPublished(guard.supabase, id, published);
  if (!result.ok) return result;

  revalidatePath('/admin/dry-days');
  revalidatePath('/admin');
  return { ok: true };
}

/**
 * Quick confirm/unconfirm from the list view. Confirm sets verification to
 * 'confirmed'; unconfirm returns it to 'pending' (honest "unverified" — never
 * invents a 'reported' news signal). Publication is never changed here.
 */
export async function setDryDayVerificationAction(
  id: string,
  status: VerificationStatus
): Promise<ActionResult> {
  const idError = validateRecordId(id);
  if (idError) return idError;

  const statusError = validateVerificationStatus(status);
  if (statusError) return statusError;

  const guard = await requireAdminForAction();
  if (!guard.ok) return guard.result;

  const result = await setDryDayVerification(guard.supabase, id, status);
  if (!result.ok) return result;

  revalidatePath('/admin/dry-days');
  revalidatePath('/admin');
  return { ok: true };
}

export async function saveNoticeAction(input: NoticeInput, id?: string): Promise<SaveResult> {
  const idError = validateRecordId(id);
  if (idError) return idError;

  const guard = await requireAdminForAction();
  if (!guard.ok) return guard.result;

  const validated = validateNoticeInput(input);
  if (!validated.ok) {
    return { ok: false, code: 'validation', errors: validated.errors };
  }

  const result = id
    ? await updateNotice(guard.supabase, id, validated.values)
    : await insertNotice(guard.supabase, validated.values, guard.userId);

  if (!result.ok) return result;

  revalidatePath('/admin/notices');
  revalidatePath('/admin');
  return { ok: true, id: result.id };
}

export async function deleteNoticeAction(id: string): Promise<ActionResult> {
  const idError = validateRecordId(id);
  if (idError) return idError;

  const guard = await requireAdminForAction();
  if (!guard.ok) return guard.result;

  const result = await deleteNotice(guard.supabase, id);
  if (!result.ok) return result;

  revalidatePath('/admin/notices');
  revalidatePath('/admin');
  return { ok: true };
}

export async function setNoticePublishedAction(
  id: string,
  published: boolean
): Promise<ActionResult> {
  const idError = validateRecordId(id);
  if (idError) return idError;

  const publishedError = validatePublishedFlag(published);
  if (publishedError) return publishedError;

  const guard = await requireAdminForAction();
  if (!guard.ok) return guard.result;

  const result = await setNoticePublished(guard.supabase, id, published);
  if (!result.ok) return result;

  revalidatePath('/admin/notices');
  revalidatePath('/admin');
  return { ok: true };
}

/** Best-effort sign-out, then always land on the login page. */
export async function signOutAction(): Promise<void> {
  try {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
  } catch {
    // Best effort: cookies are cleared by the sign-out flow or remain valid
    // until they expire; the login page handles either state.
  }
  redirect('/admin/login');
}
