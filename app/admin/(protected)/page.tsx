import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CalendarPlus, Megaphone, Plus } from 'lucide-react';
import { PublishBadge, SeverityBadge, VerificationBadge } from '@/components/admin/StatusBadge';
import { authorizeAdmin } from '@/lib/admin/auth';
import { countDryDays, listDryDays } from '@/lib/admin/drydays';
import { countNotices, listNotices } from '@/lib/admin/notices';
import { formatDateDisplay } from '@/lib/dryday';
import { createServerClient, isSupabaseNotConfigured } from '@/lib/supabase/server';
import SupabaseUnavailableNotice from '@/components/admin/SupabaseUnavailableNotice';

export const metadata: Metadata = { title: 'Dashboard' };

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | null;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold text-white">
        {value === null ? '—' : value}
      </p>
      {hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

export default async function AdminDashboardPage() {
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

  const [
    dryTotal,
    dryPublished,
    dryPending,
    noticeTotal,
    noticePublished,
    recentDry,
    recentNotices,
  ] = await Promise.all([
    countDryDays(supabase),
    countDryDays(supabase, { published: true }),
    countDryDays(supabase, { verification_status: 'pending' }),
    countNotices(supabase),
    countNotices(supabase, { published: true }),
    listDryDays(supabase, { page: 1, perPage: 5 }),
    listNotices(supabase, { page: 1, perPage: 5 }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Dashboard</h1>
          <p className="mt-1 text-xs text-neutral-400">
            Signed in as <span className="text-neutral-300">{authz.user.email ?? 'admin'}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/dry-days/new"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-neutral-950 transition-colors hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New dry day
          </Link>
          <Link
            href="/admin/notices/new"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500/60"
          >
            <Megaphone className="h-4 w-4" aria-hidden="true" />
            New notice
          </Link>
        </div>
      </div>

      <section aria-label="Statistics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Dry-day records" value={dryTotal} hint="All time" />
        <StatCard label="Published" value={dryPublished} hint="Visible on the public site" />
        <StatCard label="Pending verification" value={dryPending} hint="Never shown as confirmed" />
        <StatCard label="Notices published" value={noticePublished} hint={`${noticeTotal ?? '—'} total`} />
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section
          aria-labelledby="recent-dry-days"
          className="rounded-2xl border border-neutral-800 bg-neutral-900/60"
        >
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
            <h2 id="recent-dry-days" className="flex items-center gap-2 text-sm font-bold text-white">
              <CalendarPlus className="h-4 w-4 text-amber-400" aria-hidden="true" />
              Recent dry days
            </h2>
            <Link href="/admin/dry-days" className="text-xs font-semibold text-amber-400 hover:underline">
              View all
            </Link>
          </div>
          {recentDry.error ? (
            <p role="alert" className="px-4 py-4 text-xs text-rose-400">
              {recentDry.error}
            </p>
          ) : recentDry.rows.length === 0 ? (
            <p className="px-4 py-6 text-xs text-neutral-500">
              No dry-day records yet. Create the first one.
            </p>
          ) : (
            <ul className="divide-y divide-neutral-800/70">
              {recentDry.rows.map((row) => (
                <li key={row.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/dry-days/${row.id}/edit`}
                      className="block truncate text-sm font-semibold text-neutral-200 hover:text-amber-300"
                    >
                      {row.reason}
                    </Link>
                    <p className="mt-0.5 truncate text-xs text-neutral-500">
                      {formatDateDisplay(row.dry_date, { shortFormat: true })} · {row.state}
                      {row.type === 'local' && row.locality ? ` · ${row.locality}` : ''}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <VerificationBadge status={row.verification_status} />
                    <span className="hidden sm:inline">
                      <PublishBadge published={row.is_published} />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          aria-labelledby="recent-notices"
          className="rounded-2xl border border-neutral-800 bg-neutral-900/60"
        >
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
            <h2 id="recent-notices" className="flex items-center gap-2 text-sm font-bold text-white">
              <Megaphone className="h-4 w-4 text-amber-400" aria-hidden="true" />
              Recent notices
            </h2>
            <Link href="/admin/notices" className="text-xs font-semibold text-amber-400 hover:underline">
              View all
            </Link>
          </div>
          {recentNotices.error ? (
            <p role="alert" className="px-4 py-4 text-xs text-rose-400">
              {recentNotices.error}
            </p>
          ) : recentNotices.rows.length === 0 ? (
            <p className="px-4 py-6 text-xs text-neutral-500">No notices yet.</p>
          ) : (
            <ul className="divide-y divide-neutral-800/70">
              {recentNotices.rows.map((row) => (
                <li key={row.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/notices/${row.id}/edit`}
                      className="block truncate text-sm font-semibold text-neutral-200 hover:text-amber-300"
                    >
                      {row.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {row.state ?? 'Pan-India'}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <SeverityBadge severity={row.severity} />
                    <span className="hidden sm:inline">
                      <PublishBadge published={row.is_published} />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
