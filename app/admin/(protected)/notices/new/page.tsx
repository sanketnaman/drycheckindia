import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import NoticeForm from '@/components/admin/NoticeForm';
import SupabaseUnavailableNotice from '@/components/admin/SupabaseUnavailableNotice';
import { authorizeAdmin } from '@/lib/admin/auth';
import { createServerClient, isSupabaseNotConfigured } from '@/lib/supabase/server';

export const metadata: Metadata = { title: 'New notice' };

export default async function NewNoticePage() {
  let supabase;
  try {
    supabase = await createServerClient();
  } catch (error) {
    if (isSupabaseNotConfigured(error)) {
      return <SupabaseUnavailableNotice detail={error.message} backHref="/admin/notices" backLabel="← Back to notices" />;
    }
    throw error;
  }

  const authz = await authorizeAdmin(supabase);
  if (authz.kind === 'unauthenticated') redirect('/admin/login');
  if (authz.kind === 'forbidden') redirect('/admin/login?error=forbidden');

  return (
    <div className="space-y-5">
      <div className="border-b border-neutral-800 pb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">New public notice</h1>
        <p className="mt-1 text-xs text-neutral-400">
          Times are entered in IST (UTC+5:30) and stored as UTC. The window is inclusive on both
          ends.
        </p>
      </div>
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <NoticeForm />
      </div>
      <p className="text-xs text-neutral-500">
        <Link href="/admin/notices" className="text-amber-400 hover:underline">
          ← Back to notices
        </Link>
      </p>
    </div>
  );
}
