import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import SupabaseUnavailableNotice from '@/components/admin/SupabaseUnavailableNotice';
import { authorizeAdmin } from '@/lib/admin/auth';
import { createServerClient, isSupabaseNotConfigured } from '@/lib/supabase/server';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  let supabase;
  try {
    supabase = await createServerClient();
  } catch (error) {
    if (isSupabaseNotConfigured(error)) {
      // Not a 500: render a friendly "not configured" panel. The message never
      // contains configuration values.
      return <SupabaseUnavailableNotice detail={error.message} />;
    }
    throw error;
  }

  const authz = await authorizeAdmin(supabase);

  // Already signed in AND a verified admin member -> straight to the dashboard.
  if (authz.kind === 'ok') redirect('/admin');

  // Authenticated but not a member (or redirected with ?error=forbidden):
  // show the form with an explanatory banner instead of a broken redirect loop.
  const forbidden = authz.kind === 'forbidden' || params.error === 'forbidden';

  return <LoginForm forbidden={forbidden} />;
}
