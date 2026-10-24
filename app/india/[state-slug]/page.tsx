import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import HeroAnswer from '@/components/HeroAnswer';
import StateCalendar from '@/components/StateCalendar';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import {
  getAllStates,
  getStateBySlug,
  getTodayIST,
  getTomorrowIST,
  getStatus,
  getNextDryDays,
  getDeterministicSecondaryLine,
  formatDateDisplay,
  dateToSlug,
} from '@/lib/dryday';
import { getPublicEntries } from '@/lib/public-drydays';
import {
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Scale,
  MapPin,
  HelpCircle as QuestionIcon,
  CheckCircle,
  Clock
} from 'lucide-react';

export const revalidate = 3600;

interface Props {
  params: Promise<{
    'state-slug': string;
  }>;
}

const SITE_URL = 'https://drycheck.in';

export async function generateStaticParams() {
  const states = getAllStates();
  return states.map((s) => ({
    'state-slug': s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'state-slug': slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    return {
      title: 'State Not Found | DryCheck India',
    };
  }

  const currentYear = new Date().getFullYear();
  const title = `Is Today a Dry Day in ${state.name}? Dry Day Calendar ${currentYear} | DryCheck India`;
  const description = `Find out if today or tomorrow is a dry day in ${state.name} (${state.region} India). Complete ${currentYear} excise calendar, festival closures, and election restrictions.`;
  const canonicalUrl = `${SITE_URL}/india/${state.slug}`;

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

export default async function StatePage({ params }: Props) {
  const { 'state-slug': slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    notFound();
  }

  const entries = await getPublicEntries();
  // True while the database has no published, publicly-verifiable entries.
  const datasetEmpty = entries.length === 0;
  const todayIST = getTodayIST();
  const tomorrowIST = getTomorrowIST();

  const todayStatus = getStatus(state.slug, todayIST, entries);
  const tomorrowStatus = getStatus(state.slug, tomorrowIST, entries);

  const todayLabel = state.prohibition === true
    ? 'Always'
    : state.prohibition === null
    ? 'Status not verified'
    : todayStatus === 'dry'
    ? 'Yes'
    : todayStatus === 'not_dry'
    ? 'No'
    : todayStatus === 'unavailable'
    ? 'Status not verified'
    : 'Maybe';

  const secondaryLine = state.prohibition
    ? `Total statutory prohibition in ${state.name}. Alcohol is prohibited 365 days a year.`
    : todayStatus === 'unavailable'
    ? 'No verified dry-day status available for this date.'
    : getDeterministicSecondaryLine(todayStatus, tomorrowStatus, `${todayIST}-${state.slug}`);

  const next30Days = state.prohibition ? [] : getNextDryDays(state.slug, todayIST, 30, entries);

  const allEntries = entries.filter(
    (e) => e.state === state.slug || e.state === 'all'
  );

  const formattedToday = formatDateDisplay(todayIST, { showDayOfWeek: true });
  const formattedTomorrow = formatDateDisplay(tomorrowIST, { showDayOfWeek: true });

  // 5 Nearby or popular states for internal links
  const nearbySlugs = state.nearby || ['delhi', 'maharashtra', 'goa', 'kerala', 'karnataka'];
  const nearbyStates = nearbySlugs
    .map((s) => getStateBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .slice(0, 5);

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
        name: 'States & UTs',
        item: `${SITE_URL}/#state-directory`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: state.name,
        item: `${SITE_URL}/india/${state.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is today a dry day in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
        text: state.prohibition
          ? `Yes, ${state.name} observes complete statewide statutory prohibition. Every day is a dry day.`
          : todayStatus === 'dry'
          ? `Yes, today (${formattedToday}) is a scheduled dry day in ${state.name} under official state excise department notifications.`
          : todayStatus === 'maybe'
          ? `Today has a pending or reported dry day signal in ${state.name}. Official confirmation awaited.`
          : todayStatus === 'unavailable'
          ? `Today's dry-day status in ${state.name} is not verified. No official confirmation is available for this date.`
          : `No, today (${formattedToday}) is not a scheduled dry day in ${state.name}. Licensed retail vendors operate during normal trading hours.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is tomorrow a dry day in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
        text: state.prohibition
          ? `Yes, because ${state.name} enforces permanent prohibition year-round.`
          : tomorrowStatus === 'dry'
          ? `Yes, tomorrow (${formattedTomorrow}) is a dry day in ${state.name}. Licensed shops and bars will remain closed.`
          : tomorrowStatus === 'maybe'
          ? `Tomorrow's dry status is pending official confirmation in ${state.name}.`
          : tomorrowStatus === 'unavailable'
          ? `Tomorrow's dry-day status in ${state.name} is not verified. No official confirmation is available.`
          : `No, tomorrow (${formattedTomorrow}) is not scheduled as a dry day in ${state.name}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are the guaranteed dry days in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In ${state.name}, standard national dry days include Republic Day (26 January), Independence Day (15 August), and Mahatma Gandhi Jayanti (2 October), alongside designated religious festivals and election polling windows declared by the State Election Commission.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do I know about upcoming dry days in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can check real-time updates on DryCheck India, or consult notifications published on the ${state.name} State Excise Department portal and official gazette.`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 pt-1 pb-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="my-2 flex items-center text-xs text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-1.5 text-neutral-600" />
          <Link href="/#state-directory" className="hover:text-white transition-colors">
            India
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-1.5 text-neutral-600" />
          <span className="text-amber-400 font-medium">{state.name}</span>
        </nav>

        <AdSlot id={`state-top-${state.slug}`} />

        {/* Hero Section with clear H1 */}
        <HeroAnswer
          headline={`Is today a dry day in ${state.name}?`}
          answer={todayLabel}
          statusType={todayStatus}
          secondaryLine={secondaryLine}
          todayDateIST={todayIST}
          tomorrowDateIST={tomorrowIST}
          contextTitle={`${state.name} (${state.region})`}
          prohibitionNote={state.prohibitionNote}
          stateSlug={state.slug}
        />

        {/* Last Verified Badge */}
        <div className="my-3 flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
            <Clock className="h-3 w-3 text-amber-400" />
            <span>
              Last verified: <strong className="text-neutral-200">{state.lastVerified ? state.lastVerified : 'Not verified yet'}</strong> (IST)
            </span>
          </div>
        </div>

        {/* Today & Tomorrow Quick Comparison Cards */}
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Today &bull; {formattedToday}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  todayStatus === 'dry'
                    ? 'bg-rose-950/70 text-rose-300 border-rose-800/60'
                    : todayStatus === 'maybe'
                    ? 'bg-amber-950/70 text-amber-300 border-amber-800/60'
                    : todayStatus === 'unavailable'
                    ? 'bg-neutral-800/80 text-neutral-300 border-neutral-600/60'
                    : 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60'
                }`}
              >
                {todayLabel}
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-neutral-200">
              {state.prohibition
                ? 'Total statutory prohibition in effect. Retail liquor stores do not operate.'
                : todayStatus === 'dry'
                ? 'Liquor retail shops and bars are mandated closed under state excise rules.'
                : todayStatus === 'maybe'
                ? 'Pending or constituency-level closure in effect. Official confirmation awaited.'
                : todayStatus === 'unavailable'
                ? 'No verified dry-day status available for this date.'
                : 'No scheduled dry day for this date.'}
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Tomorrow &bull; {formattedTomorrow}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  state.prohibition || tomorrowStatus === 'dry'
                    ? 'bg-rose-950/70 text-rose-300 border-rose-800/60'
                    : tomorrowStatus === 'maybe'
                    ? 'bg-amber-950/70 text-amber-300 border-amber-800/60'
                    : tomorrowStatus === 'unavailable'
                    ? 'bg-neutral-800/80 text-neutral-300 border-neutral-600/60'
                    : 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60'
                }`}
              >
                {state.prohibition ? 'Always Dry' : tomorrowStatus === 'dry' ? 'Dry' : tomorrowStatus === 'maybe' ? 'Maybe' : tomorrowStatus === 'unavailable' ? 'Status not verified' : 'Open'}
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-neutral-200">
              {state.prohibition
                ? 'Total statutory prohibition remains actively enforced year-round.'
                : tomorrowStatus === 'dry'
                ? 'Official dry day directive scheduled for tomorrow.'
                : tomorrowStatus === 'maybe'
                ? 'Official confirmation awaited for upcoming civic or festival notification.'
                : tomorrowStatus === 'unavailable'
                ? 'No verified dry-day status available for tomorrow.'
                : 'No dry day order scheduled for tomorrow.'}
            </p>
          </div>
        </div>

        {/* Next 30 Days List */}
        {!state.prohibition && (
          <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-amber-400" />
                  <span>Next 30 Days in {state.name}</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Upcoming closures from {formattedToday}
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {datasetEmpty
                  ? 'Awaiting published data'
                  : `${next30Days.length} ${next30Days.length === 1 ? 'date' : 'dates'}`}
              </span>
            </div>

            {next30Days.length === 0 ? (
              <div className="mt-3 p-4 rounded-xl border border-neutral-800 bg-neutral-950/40 text-center text-xs text-neutral-400">
                <ShieldCheck className="h-5 w-5 text-emerald-400 mx-auto mb-1.5" />
                {datasetEmpty
                  ? 'No verified dry-day entries published yet. This list will update once state excise notifications are published.'
                  : `No verified dry days scheduled for ${state.name} in the next 30 days.`}
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                {next30Days.map((entry, idx) => {
                  const isPending = entry.status === 'pending';
                  const isReported = entry.status === 'reported';
                  const isLocal = entry.type === 'local';

                  return (
                    <div
                      key={`${entry.date}-${idx}`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition-colors gap-2"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-amber-400 shrink-0 font-bold">
                          {formatDateDisplay(entry.date, { showDayOfWeek: true, fullMonth: false })}
                        </span>
                        <div>
                          <Link
                            href={`/dry-days/${dateToSlug(entry.date)}`}
                            className="text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                          >
                            {entry.reason}
                          </Link>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400 mt-0.5">
                            <span className="capitalize">
                              {isLocal ? 'Local restriction' : entry.type}
                              {entry.locality ? `: ${entry.locality}` : ''}
                            </span>
                            <span>&bull;</span>
                            {isReported ? (
                              <span className="text-amber-400 font-medium">
                                Reported — not officially confirmed
                              </span>
                            ) : isPending || isLocal ? (
                              <span className="text-amber-400 font-medium">
                                Maybe &bull; Official confirmation awaited
                              </span>
                            ) : (
                              <span className="text-rose-400 font-medium">Confirmed</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 justify-end text-xs">
                        {entry.sourceUrl ? (
                          <a
                            href={entry.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-amber-400 min-h-[36px] px-2"
                          >
                            <span>Source</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-neutral-500 text-[11px] px-2">
                            Source: Pending gazette
                          </span>
                        )}
                        {entry.sourceNote && (
                          <span className="text-[10px] text-neutral-500 mt-1 block">
                            {entry.sourceNote}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* 12-Month Calendar Grid (Collapsible month by month on mobile) */}
        <StateCalendar
          stateName={state.name}
          stateSlug={state.slug}
          entries={allEntries}
          prohibition={state.prohibition}
        />

        {/* Internal links to 5 nearby or popular states */}
        <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-amber-400" />
            <span>Check Nearby &amp; Neighboring States</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {nearbyStates.map((nb) => {
              const nbStatus = getStatus(nb.slug, todayIST, entries);
              const nbLabel = nb.prohibition
                ? 'Always Dry'
                : nbStatus === 'dry'
                ? 'Dry Today'
                : nbStatus === 'maybe'
                ? 'Maybe'
                : nbStatus === 'unavailable'
                ? 'Status not verified'
                : 'Open Today';

              return (
                <Link
                  key={nb.slug}
                  href={`/india/${nb.slug}`}
                  className="flex flex-col justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-950/80 hover:border-amber-500/50 hover:bg-neutral-900 transition-all min-h-[56px] group"
                >
                  <span className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 truncate">
                    {nb.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono mt-1 ${
                      nb.prohibition || nbStatus === 'dry'
                        ? 'text-rose-400'
                        : nbStatus === 'maybe'
                        ? 'text-amber-400'
                        : nbStatus === 'unavailable'
                        ? 'text-neutral-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {nbLabel} &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* State Excise Regulations Summary */}
        <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3">
            <Scale className="h-4 w-4 text-amber-400" />
            <span>Excise Policy in {state.name}</span>
          </h2>
          <div className="text-xs sm:text-sm text-neutral-300 space-y-2 leading-relaxed">
            {state.prohibition ? (
              <p>
                {state.name} is under statutory alcohol prohibition. The possession, sale, transport, and consumption of liquor is prohibited by law.
              </p>
            ) : (
              <p>
                In {state.name}, dry days are governed by the State Excise Commissioner. On scheduled dry days, all licensed IMFL and country liquor retail vends, bars, and clubs are mandated closed.
              </p>
            )}
            <p className="text-neutral-400 text-xs">
              National holidays (26 January, 15 August, and 2 October) are mandatory pan-India dry days. In addition, 48-hour dry curfews are enforced prior to election voting in designated constituencies.
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3">
            <QuestionIcon className="h-4 w-4 text-amber-400" />
            <span>Frequently Asked Questions &bull; {state.name}</span>
          </h2>

          <div className="space-y-2.5">
            {faqSchema.mainEntity.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-neutral-800/80 bg-neutral-950/70 p-3.5"
              >
                <h3 className="text-xs sm:text-sm font-semibold text-neutral-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono">Q.</span>
                  {faq.name}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed pl-5">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Other states links */}
        <div className="my-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <Link
            href="/"
            className="text-amber-400 hover:underline min-h-[44px] flex items-center"
          >
            &larr; Back to Nationwide Overview
          </Link>
          <Link
            href="/#state-directory"
            className="hover:text-white transition-colors min-h-[44px] flex items-center"
          >
            All 36 States &amp; UTs &rarr;
          </Link>
        </div>

        <AdSlot id={`state-bottom-${state.slug}`} />
      </div>
    </>
  );
}
