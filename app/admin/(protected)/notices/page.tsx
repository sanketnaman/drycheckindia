import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, Search } from 'lucide-react';
import ActionControl from '@/components/admin/ActionControl';
import {
  deleteNoticeAction,
  setNoticePublishedAction,
} from '@/app/admin/actions';
import Pagination from '@/components/admin/Pagination';
import { FormAlert, inputClass, labelClass, primaryButtonClass } from '@/components/admin/FormBits';
import { PublishBadge, SeverityBadge } from '@/components/admin/StatusBadge';
import { authorizeAdmin } from '@/lib/admin/auth';
import { buildNoticeQuery, listNotices, parseNoticeFilters } from '@/lib/admin/notices';
import { utcTimestamptzToIstInput } from '@/lib/admin/time';
import { NOTICE_SEVERITIES, NOTICE_SEVERITY_META, type NoticeRow } from '@/lib/admin/types';
import { getAllStates } from '@/lib/dryday';
import { createServerClient, isSupabaseNotConfigured } from '@/lib/supabase/server';
import SupabaseUnavailableNotice from '@/components/admin/SupabaseUnavailableNotice';

export const metadata: Metadata = { title: 'Public Notices' };

function formatWindow(value: string | null): string {
  const ist = utcTimestamptzToIstInput(value);
  if (!ist) return '';
  return ist.replace('T', ' ');
}

function windowStatus(row: NoticeRow): { label: string; className: string } {
  const now = Date.now();
  const start = row.starts_at ? Date.parse(row.starts_at) : null;
  const end = row.ends_at ? Date.parse(row.ends_at) : null;

  if (start !== null && !Number.isNaN(start) && start > now) {
    return { label: 'Scheduled', className: 'text-sky-300' };
  }
  if (end !== null && !Number.isNaN(end) && end < now) {
    return { label: 'Ended', className: 'text-neutral-500' };
  }
  if (start === null && end === null) {
    return { label: 'Always shown', className: 'text-neutral-400' };
  }
  return { label: 'In window', className: 'text-emerald-300' };
}

export default async function NoticesAdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

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

  const filters = parseNoticeFilters(sp);
  const list = await listNotices(supabase, filters);
  const states = getAllStates();

  const created = sp.created === '1';
  const updated = sp.updated === '1';
  const successMessage = created
    ? 'Notice created. Publish it when the window is ready.'
    : updated
      ? 'Changes saved.'
      : null;

  const hrefForPage = (page: number) => buildNoticeQuery(filters, { page });

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Public Notices</h1>
          <p className="mt-1 text-xs text-neutral-400">
            {list.error
              ? 'List unavailable'
              : `${list.count} record${list.count === 1 ? '' : 's'}${filters.q || filters.severity || filters.state || filters.published ? ' matching filters' : ''}`}
          </p>
        </div>
        <Link
          href="/admin/notices/new"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-neutral-950 transition-colors hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New notice
        </Link>
      </div>

      <FormAlert success={successMessage} error={list.error ?? undefined} />

      <form
        method="GET"
        action="/admin/notices"
        className="grid gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:grid-cols-2 lg:grid-cols-5"
        aria-label="Filter notices"
      >
        <div className="lg:col-span-2">
          <label htmlFor="field-q" className={labelClass}>
            Search
          </label>
          <input
            type="search"
            name="q"
            id="field-q"
            defaultValue={filters.q ?? ''}
            placeholder="Title, body or state…"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="field-severity" className={labelClass}>
            Severity
          </label>
          <select
            name="severity"
            id="field-severity"
            defaultValue={filters.severity ?? ''}
            className={inputClass}
          >
            <option value="">Any</option>
            {NOTICE_SEVERITIES.map((s) => (
              <option key={s} value={s}>
                {NOTICE_SEVERITY_META[s].label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="field-state" className={labelClass}>
            State
          </label>
          <select
            name="state"
            id="field-state"
            defaultValue={filters.state ?? ''}
            className={inputClass}
          >
            <option value="">All states</option>
            <option value="all">All India</option>
            {states.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="field-published" className={labelClass}>
            Publication
          </label>
          <select
            name="published"
            id="field-published"
            defaultValue={filters.published ?? ''}
            className={inputClass}
          >
            <option value="">Any</option>
            <option value="true">Published</option>
            <option value="false">Unpublished</option>
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-5 flex flex-wrap gap-3">
          <button type="submit" className={primaryButtonClass}>
            <Search className="h-4 w-4" aria-hidden="true" />
            Apply filters
          </button>
          <Link
            href="/admin/notices"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500/60"
          >
            Clear
          </Link>
        </div>
      </form>

      {!list.error && list.rows.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4 py-10 text-center">
          <p className="text-sm font-semibold text-neutral-200">No notices found</p>
          <p className="mt-1 text-xs text-neutral-500">
            Nothing matches the current filters.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              href="/admin/notices"
              className="inline-flex min-h-[40px] items-center rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs font-semibold text-neutral-300 hover:border-neutral-500 hover:text-white"
            >
              Clear filters
            </Link>
            <Link
              href="/admin/notices/new"
              className="inline-flex min-h-[40px] items-center rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-400"
            >
              New notice
            </Link>
          </div>
        </div>
      ) : (
        !list.error && (
          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 custom-scrollbar">
            <table className="w-full min-w-[860px] text-left text-sm">
              <caption className="sr-only">Public notices with publication controls</caption>
              <thead className="border-b border-neutral-800">
                <tr className="text-[11px] uppercase tracking-wider text-neutral-500">
                  <th scope="col" className="px-4 py-3 font-semibold">Title</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Severity</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Scope</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Window (IST)</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/70">
                {list.rows.map((row) => {
                  const status = windowStatus(row);
                  const start = formatWindow(row.starts_at);
                  const end = formatWindow(row.ends_at);
                  return (
                    <tr key={row.id} className="align-top hover:bg-neutral-800/30">
                      <td className="px-4 py-3 max-w-[280px]">
                        <Link
                          href={`/admin/notices/${row.id}/edit`}
                          className="block truncate text-sm font-semibold text-neutral-200 hover:text-amber-300"
                          title={row.title}
                        >
                          {row.title}
                        </Link>
                        <p className="mt-0.5 truncate text-xs text-neutral-500" title={row.body}>
                          {row.body}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <SeverityBadge severity={row.severity} />
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-300">
                        {row.state === null ? (
                          <span className="text-neutral-400">Pan-India</span>
                        ) : row.state === 'all' ? (
                          'All India'
                        ) : (
                          row.state
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-neutral-400">
                        {start && end ? (
                          <>
                            {start}
                            <br />→ {end}
                          </>
                        ) : start ? (
                          <>From {start}</>
                        ) : end ? (
                          <>Until {end}</>
                        ) : (
                          <span className="text-neutral-500">No window (open)</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1.5">
                          <PublishBadge published={row.is_published} />
                          <span className={`text-[11px] font-semibold ${status.className}`}>
                            {status.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <Link
                            href={`/admin/notices/${row.id}/edit`}
                            className="inline-flex min-h-[36px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                          >
                            Edit
                          </Link>
                          <ActionControl
                            label={row.is_published ? 'Unpublish' : 'Publish'}
                            action={setNoticePublishedAction.bind(null, row.id, !row.is_published)}
                          />
                          <ActionControl
                            label="Delete"
                            variant="danger"
                            confirmTitle="Delete notice"
                            confirmMessage={`Delete "${row.title}"? This permanently removes the notice.`}
                            action={deleteNoticeAction.bind(null, row.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      )}

      {!list.error && (
        <Pagination
          page={list.page}
          perPage={list.perPage}
          count={list.count}
          hrefForPage={hrefForPage}
        />
      )}
    </div>
  );
}
