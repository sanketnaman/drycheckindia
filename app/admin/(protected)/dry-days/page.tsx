import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, Search } from 'lucide-react';
import ActionControl from '@/components/admin/ActionControl';
import Pagination from '@/components/admin/Pagination';
import { FormAlert, inputClass, labelClass, primaryButtonClass } from '@/components/admin/FormBits';
import { PublishBadge, TypeBadge, VerificationBadge } from '@/components/admin/StatusBadge';
import {
  setDryDayPublishedAction,
  setDryDayVerificationAction,
  deleteDryDayAction,
} from '@/app/admin/actions';
import { authorizeAdmin } from '@/lib/admin/auth';
import {
  DRY_DAYS_PER_PAGE,
  buildDryDayQuery,
  listDryDays,
  parseDryDayFilters,
} from '@/lib/admin/drydays';
import { VERIFICATION_STATUSES, VERIFICATION_META } from '@/lib/admin/types';
import { formatDateDisplay, getAllStates } from '@/lib/dryday';
import { createServerClient, isSupabaseNotConfigured } from '@/lib/supabase/server';
import SupabaseUnavailableNotice from '@/components/admin/SupabaseUnavailableNotice';

export const metadata: Metadata = { title: 'Dry Days' };

export default async function DryDaysAdminPage({
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

  const filters = parseDryDayFilters(sp);
  const list = await listDryDays(supabase, filters);
  const states = getAllStates();

  const created = sp.created === '1';
  const updated = sp.updated === '1';
  const successMessage = created
    ? 'Dry day created. Publish it when you are ready.'
    : updated
      ? 'Changes saved.'
      : null;

  const hrefForPage = (page: number) => buildDryDayQuery(filters, { page });

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Dry Days</h1>
          <p className="mt-1 text-xs text-neutral-400">
            {list.error ? 'List unavailable' : `${list.count} record${list.count === 1 ? '' : 's'}${filters.q || filters.state || filters.dry_date || filters.verification_status || filters.published ? ' matching filters' : ''}`}
          </p>
        </div>
        <Link
          href="/admin/dry-days/new"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-neutral-950 transition-colors hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New dry day
        </Link>
      </div>

      <FormAlert success={successMessage} error={list.error ?? undefined} />

      {/* Filters (GET — server-rendered) */}
      <form
        method="GET"
        action="/admin/dry-days"
        className="grid gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:grid-cols-2 lg:grid-cols-5"
        aria-label="Filter dry days"
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
            placeholder="Reason, state or locality…"
            className={inputClass}
          />
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
          <label htmlFor="field-verification_status" className={labelClass}>
            Verification
          </label>
          <select
            name="verification_status"
            id="field-verification_status"
            defaultValue={filters.verification_status ?? ''}
            className={inputClass}
          >
            <option value="">Any</option>
            {VERIFICATION_STATUSES.map((v) => (
              <option key={v} value={v}>
                {VERIFICATION_META[v].label}
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
        <div className="sm:col-span-2 lg:col-span-5 flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="field-dry_date" className={labelClass}>
              Date
            </label>
            <input
              type="date"
              name="dry_date"
              id="field-dry_date"
              defaultValue={filters.dry_date ?? ''}
              className={inputClass}
            />
          </div>
          <button type="submit" className={primaryButtonClass}>
            <Search className="h-4 w-4" aria-hidden="true" />
            Apply filters
          </button>
          <Link
            href="/admin/dry-days"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500/60"
          >
            Clear
          </Link>
        </div>
      </form>

      {/* Results */}
      {!list.error && list.rows.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4 py-10 text-center">
          <p className="text-sm font-semibold text-neutral-200">No dry days found</p>
          <p className="mt-1 text-xs text-neutral-500">
            Nothing matches the current filters. Records are never fabricated — create one when you
            have a verified source.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              href="/admin/dry-days"
              className="inline-flex min-h-[40px] items-center rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs font-semibold text-neutral-300 hover:border-neutral-500 hover:text-white"
            >
              Clear filters
            </Link>
            <Link
              href="/admin/dry-days/new"
              className="inline-flex min-h-[40px] items-center rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-400"
            >
              New dry day
            </Link>
          </div>
        </div>
      ) : (
        !list.error && (
          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 custom-scrollbar">
            <table className="w-full min-w-[900px] text-left text-sm">
              <caption className="sr-only">Dry-day records with publication controls</caption>
              <thead className="border-b border-neutral-800">
                <tr className="text-[11px] uppercase tracking-wider text-neutral-500">
                  <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                  <th scope="col" className="px-4 py-3 font-semibold">State</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Type / area</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Occasion</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Verification</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/70">
                {list.rows.map((row) => (
                  <tr key={row.id} className="align-top hover:bg-neutral-800/30">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <time dateTime={row.dry_date} className="text-sm font-semibold text-neutral-200">
                        {formatDateDisplay(row.dry_date, { shortFormat: true })}
                      </time>
                      {row.time_start && (
                        <p className="mt-0.5 text-[11px] text-neutral-500">
                          {row.time_start}
                          {row.time_end ? `–${row.time_end}` : ''} IST
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-300">
                      {row.state === 'all' ? 'All India' : row.state}
                    </td>
                    <td className="px-4 py-3">
                      <TypeBadge type={row.type} locality={row.locality} />
                    </td>
                    <td className="px-4 py-3 max-w-[260px]">
                      <p className="truncate text-sm text-neutral-200" title={row.reason}>
                        {row.reason}
                      </p>
                      {row.source_url && (
                        <a
                          href={row.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 inline-block text-[11px] font-semibold text-amber-400 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        >
                          Source ↗
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <VerificationBadge status={row.verification_status} />
                    </td>
                    <td className="px-4 py-3">
                      <PublishBadge published={row.is_published} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <Link
                          href={`/admin/dry-days/${row.id}/edit`}
                          className="inline-flex min-h-[36px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        >
                          Edit
                        </Link>
                        {row.verification_status === 'confirmed' ? (
                          <ActionControl
                            label="Unconfirm"
                            confirmTitle="Unconfirm dry day"
                            confirmMessage={`Mark "${row.reason}" as pending verification again? Pending records are not shown on the public site until they are confirmed or recorded as reported.`}
                            action={setDryDayVerificationAction.bind(null, row.id, 'pending')}
                          />
                        ) : (
                          <ActionControl
                            label="Confirm"
                            confirmTitle="Confirm dry day"
                            confirmMessage={`Mark "${row.reason}" as officially confirmed? If the record is also published, the public site will show it as a confirmed dry day.`}
                            action={setDryDayVerificationAction.bind(null, row.id, 'confirmed')}
                          />
                        )}
                        <ActionControl
                          label={row.is_published ? 'Unpublish' : 'Publish'}
                          action={setDryDayPublishedAction.bind(null, row.id, !row.is_published)}
                        />
                        <ActionControl
                          label="Delete"
                          variant="danger"
                          confirmTitle="Delete dry day"
                          confirmMessage={`Delete "${row.reason}" (${formatDateDisplay(row.dry_date, { shortFormat: true })})? This permanently removes the record.`}
                          action={deleteDryDayAction.bind(null, row.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {!list.error && (
        <Pagination
          page={list.page}
          perPage={list.perPage || DRY_DAYS_PER_PAGE}
          count={list.count}
          hrefForPage={hrefForPage}
        />
      )}
    </div>
  );
}
