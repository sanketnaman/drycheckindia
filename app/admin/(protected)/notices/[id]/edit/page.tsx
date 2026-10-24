import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import NoticeForm from '@/components/admin/NoticeForm';
import SupabaseUnavailableNotice from '@/components/admin/SupabaseUnavailableNotice';
import { authorizeAdmin } from '@/lib/admin/auth';
import { getNotice } from '@/lib/admin/notices';
import { createServerClient, isSupabaseNotConfigured } from '@/lib/supabase/server';

export const metadata: Metadata = { title: 'Edit notice' };

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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

  const { row, error } = await getNotice(supabase, id);
  if (error) {
    return (
      <div className="rounded-2xl border border-rose-800/70 bg-rose-950/50 p-5">
        <h1 className="text-lg font-bold text-rose-200">Could not load this notice</h1>
        <p className="mt-1 text-sm text-rose-300/90">{error}</p>
        <Link
          href="/admin/notices"
          className="mt-4 inline-flex min-h-[40px] items-center rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white"
        >
          ← Back to notices
        </Link>
      </div>
    );
  }
  if (!row) notFound();

  return (
    <div className="space-y-5">
      <div className="border-b border-neutral-800 pb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Edit notice</h1>
        <p className="mt-1 text-xs text-neutral-400">{row.state ?? 'Pan-India'}</p>
      </div>
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <NoticeForm initial={row} />
      </div>
      <p className="text-xs text-neutral-500">
        <Link href="/admin/notices" className="text-amber-400 hover:underline">
          ← Back to notices
        </Link>
      </p>
    </div>
  );
}
