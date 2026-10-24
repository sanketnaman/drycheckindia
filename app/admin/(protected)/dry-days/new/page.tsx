import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DryDayForm from '@/components/admin/DryDayForm';
import SupabaseUnavailableNotice from '@/components/admin/SupabaseUnavailableNotice';
import { authorizeAdmin } from '@/lib/admin/auth';
import { createServerClient, isSupabaseNotConfigured } from '@/lib/supabase/server';

export const metadata: Metadata = { title: 'New dry day' };

export default async function NewDryDayPage() {
  let supabase;
  try {
    supabase = await createServerClient();
  } catch (error) {
    if (isSupabaseNotConfigured(error)) {
      return <SupabaseUnavailableNotice detail={error.message} backHref="/admin/dry-days" backLabel="← Back to dry days" />;
    }
    throw error;
  }

  const authz = await authorizeAdmin(supabase);
  if (authz.kind === 'unauthenticated') redirect('/admin/login');
  if (authz.kind === 'forbidden') redirect('/admin/login?error=forbidden');

  return (
    <div className="space-y-5">
      <div className="border-b border-neutral-800 pb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">New dry day</h1>
        <p className="mt-1 text-xs text-neutral-400">
          Only record information you can back with a real source. Local restrictions must name the
          affected area and are never shown statewide.
        </p>
      </div>
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
        <DryDayForm />
      </div>
      <p className="text-xs text-neutral-500">
        <Link href="/admin/dry-days" className="text-amber-400 hover:underline">
          ← Back to dry days
        </Link>
      </p>
    </div>
  );
}
