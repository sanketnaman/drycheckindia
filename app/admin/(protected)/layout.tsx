import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import SupabaseUnavailableNotice from '@/components/admin/SupabaseUnavailableNotice';
import { authorizeAdmin } from '@/lib/admin/auth';
import { createServerClient, isSupabaseNotConfigured } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: { template: '%s · DryCheck Admin', default: 'DryCheck Admin' },
  robots: { index: false, follow: false },
};

/**
 * Guarded shell for every admin page except /admin/login.
 * Unauthenticated -> /admin/login. Authenticated non-member -> forbidden banner
 * on the login page. Membership is verified against admin_users on the server
 * on every request (never a client-side flag).
 *
 * When Supabase is not configured the shell renders a friendly "not
 * configured" panel. It never redirects to /admin/login in that case: the
 * login page needs the same configuration, so redirecting would produce a
 * loop. Authorization still fails closed — no admin content is rendered.
 */
export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  let supabase;
  try {
    supabase = await createServerClient();
  } catch (error) {
    if (isSupabaseNotConfigured(error)) {
      return <SupabaseUnavailableNotice detail={error.message} />;
    }
    throw error;
  }

  const authz = await authorizeAdmin(supabase);

  if (authz.kind === 'unauthenticated') redirect('/admin/login');
  if (authz.kind === 'forbidden') redirect('/admin/login?error=forbidden');

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 py-5 sm:py-6">
      <AdminNav email={authz.user.email} />
      <div className="mt-5">{children}</div>
    </div>
  );
}
