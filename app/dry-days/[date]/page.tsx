import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import {
  slugToDate,
  dateToSlug,
  formatDateDisplay,
  getDryStatesOn,
} from '@/lib/dryday';
import { getPublicEntries } from '@/lib/public-drydays';
import {
  Calendar,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';

export const revalidate = 3600;

interface Props {
  params: Promise<{
    date: string;
  }>;
}

const SITE_URL = 'https://drycheck.in';

export async function generateStaticParams() {
  const entries = await getPublicEntries();
  const dateSet = new Set<string>();
  for (const entry of entries) {
    dateSet.add(dateToSlug(entry.date));
  }
  return Array.from(dateSet).map((dateSlug) => ({
    date: dateSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date: rawSlug } = await params;
  const dateIST = slugToDate(rawSlug);

  if (!dateIST) {
    return {
      title: 'Date Not Found | DryCheck India',
    };
  }

  const formatted = formatDateDisplay(dateIST, { showDayOfWeek: true });
  const title = `Dry Days on ${formatted} Across India | DryCheck India`;
  const description = `Complete list of Indian states and union territories observing a dry day on ${formatted}. Official excise rules, festival closures, and store timings.`;
  const canonicalUrl = `${SITE_URL}/dry-days/${rawSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      siteName: 'DryCheck India',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function DatePage({ params }: Props) {
  const { date: rawSlug } = await params;
  const dateIST = slugToDate(rawSlug);

  if (!dateIST) {
    notFound();
  }

  const entries = await getPublicEntries();
  // True while the database has no published, publicly-verifiable entries.
  const datasetEmpty = entries.length === 0;
  const formattedDate = formatDateDisplay(dateIST, { showDayOfWeek: true });
  const dryItems = getDryStatesOn(dateIST, entries);

  const eventDryDays = dryItems.filter((i) => !i.isProhibition);
  const prohibitionStates = dryItems.filter((i) => i.isProhibition);

  const allEntriesOnDate = entries.filter(
    (e) => e.date === dateIST
  );

  const isNational = allEntriesOnDate.some(
    (e) => e.state === 'all' || e.type === 'national'
  );

  const primaryReason =
    allEntriesOnDate[0]?.reason || (isNational ? 'National Observance' : 'Regional Observance');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Dry Days Calendar',
        item: `${SITE_URL}/#dry-days-ahead`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: formattedDate,
        item: `${SITE_URL}/dry-days/${rawSlug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 pt-1 pb-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="my-2 flex items-center text-xs text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-1.5 text-neutral-600" />
          <Link href="/" className="hover:text-white transition-colors">
            Dry Days
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-1.5 text-neutral-600" />
          <span className="text-amber-400 font-medium">{formattedDate}</span>
        </nav>

        <AdSlot id={`date-top-${rawSlug}`} />

        {/* Header Hero */}
        <div className="my-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs text-neutral-300 mb-2">
            <Calendar className="h-3.5 w-3.5 text-amber-400" />
            <span>{formattedDate} (IST)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dry Days on {formattedDate}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
            {datasetEmpty
              ? 'No verified dry-day entries published yet. This page will update once state excise notifications are published.'
              : isNational
              ? `Pan-India mandatory dry day in observance of ${primaryReason}. All retail shops and bars remain closed.`
              : eventDryDays.length > 0
              ? `${eventDryDays.length} Indian ${
                  eventDryDays.length === 1 ? 'state/UT has' : 'states/UTs have'
                } dry day restrictions in effect on this date for ${primaryReason}.`
              : 'No verified dry days scheduled for this date. Statutory-prohibition states remain dry year-round.'}
          </p>
        </div>

        {/* Status Highlight Banner */}
        <div className="my-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5 text-center">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Nationwide Impact
          </div>
          <div className="mt-1.5 text-3xl sm:text-4xl font-black text-rose-400">
            {datasetEmpty
              ? 'Awaiting published data'
              : isNational
              ? 'All India Dry Day'
              : `${eventDryDays.length} States Affected`}
          </div>
          <p className="mt-1 text-xs text-neutral-300">
            {datasetEmpty
              ? 'No published entries in the database yet'
              : `${primaryReason} &bull; Verified against state excise circulars`}
          </p>
        </div>

        {/* States observing on this date */}
        <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h2 className="text-sm sm:text-base font-bold text-white">
              States &amp; UTs Observing Dry Day on {formattedDate}
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              {datasetEmpty
                ? 'Awaiting data'
                : isNational
                ? '36 / 36 Regions'
                : `${eventDryDays.length} Regions`}
            </span>
          </div>

          {eventDryDays.length > 0 ? (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {eventDryDays.map(({ state, entry, status }) => {
                const isPending = entry?.status === 'pending';

                return (
                  <div
                    key={state.slug}
                    className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950 flex flex-col justify-between gap-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/india/${state.slug}`}
                          className="text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                        >
                          {state.name}
                        </Link>
                        <span className="block text-xs text-neutral-500">
                          {state.region} Region
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                          isPending
                            ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                            : 'bg-rose-950/80 text-rose-300 border-rose-800/60'
                        }`}
                      >
                        {isPending ? 'Maybe' : 'Dry Day'}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                      <div className="truncate pr-2">
                        <span className="font-medium text-neutral-300">
                          {entry?.reason}
                        </span>
                        {isPending && (
                          <span className="block text-[10px] text-amber-400/90">
                            Official confirmation awaited
                          </span>
                        )}
                      </div>
                      {entry?.sourceUrl ? (
                        <a
                          href={entry.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-amber-400 hover:underline shrink-0 min-h-[36px]"
                        >
                          <span>Gazette</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-[10px] text-neutral-500 shrink-0">
                          Gazette pending
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-3 p-4 rounded-xl border border-neutral-800 bg-neutral-950/40 text-center text-xs text-neutral-400">
              {datasetEmpty
                ? 'No verified dry-day entries published yet.'
                : 'No verified dry days scheduled for this date.'}
            </div>
          )}

          {prohibitionStates.length > 0 && (
            <div className="mt-4 pt-3 border-t border-neutral-800/60">
              <div className="text-xs text-neutral-400">
                <span className="font-semibold text-neutral-300 flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                  Statutory Prohibition States (Also dry on this and every date):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {prohibitionStates.map(({ state }) => (
                    <Link
                      key={state.slug}
                      href={`/india/${state.slug}`}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors min-h-[36px] inline-flex items-center"
                    >
                      {state.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Back navigation */}
        <div className="my-6 flex items-center justify-between text-xs text-neutral-400">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-amber-400 hover:underline min-h-[44px]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/#state-directory"
            className="hover:text-white transition-colors min-h-[44px] flex items-center"
          >
            All 36 States &amp; UTs &rarr;
          </Link>
        </div>

        <AdSlot id={`date-bottom-${rawSlug}`} />
      </div>
    </>
  );
}
