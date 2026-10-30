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
  getStatusHeadline,
  getNextDryDays,
  getDeterministicSecondaryLine,
  formatDateDisplay,
  dateToSlug,
  DATA_UNAVAILABLE_SECONDARY,
  DATA_UNAVAILABLE_LIST_MESSAGE,
  getStateMajorCities,
  getStateExciseTimings,
  type PublicStatus,
} from '@/lib/dryday';
import { getPublicDataset } from '@/lib/public-drydays';
import { getPublishedGuidesByState } from '@/lib/guides';
import {
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Scale,
  MapPin,
  HelpCircle as QuestionIcon,
  CheckCircle,
  Clock,
  BookOpen,
  Store,
  Beer,
} from 'lucide-react';

export const revalidate = 3600;

interface Props {
  params: Promise<{
    'state-slug': string;
  }>;
}

const SITE_URL = 'https://drycheck.in';

// Dynamic rendering at request time ensures accurate IST date computation without static freezing

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'state-slug': slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    return {
      title: 'State Not Found | DryCheck India',
    };
  }

  const todayIST = getTodayIST();
  const formattedToday = formatDateDisplay(todayIST, { showDayOfWeek: false, fullMonth: false });

  const title = `Is Today Dry Day in ${state.name}? (${formattedToday}) - Wine Shop Status | DryCheck India`;
  const description = `Check if today or tomorrow is a dry day in ${state.name} (${formattedToday}). Real-time wine shop & theka open/closed status, bar timings, and official 2026 excise calendar.`;
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

  const publishedGuides = getPublishedGuidesByState(state.slug);

  const dataset = await getPublicDataset();
  const entries = dataset.entries;
  // True when the database could not be reached at all — the status is
  // unknown, which is NOT the same as "no entries published".
  const dataUnavailable = !dataset.ok;
  const datasetEmpty = dataset.ok && entries.length === 0;
  const todayIST = getTodayIST();
  const tomorrowIST = getTomorrowIST();

  const todayStatus: PublicStatus = dataUnavailable
    ? 'unavailable'
    : getStatus(state.slug, todayIST, entries);
  const tomorrowStatus: PublicStatus = dataUnavailable
    ? 'unavailable'
    : getStatus(state.slug, tomorrowIST, entries);

  // Primary hero answer: the required status sentences; statutory prohibition
  // keeps its own standing presentation ("Always" + the legal note).
  const heroAnswer =
    state.prohibition === true ? 'Always' : getStatusHeadline(todayStatus, todayIST, todayIST, state.slug);

  // Short badge label for the Today comparison card.
  const todayBadge =
    state.prohibition === true
      ? 'Always'
      : todayStatus === 'dry'
      ? 'Yes'
      : todayStatus === 'maybe'
      ? 'Maybe'
      : todayStatus === 'unavailable'
      ? 'Unavailable'
      : 'No';

  const secondaryLine = state.prohibition
    ? `Total statutory prohibition in ${state.name}. Alcohol is prohibited 365 days a year.`
    : dataUnavailable
    ? DATA_UNAVAILABLE_SECONDARY
    : getDeterministicSecondaryLine(todayStatus, tomorrowStatus, `${todayIST}-${state.slug}`);

  const next30Days = state.prohibition ? [] : getNextDryDays(state.slug, todayIST, 30, entries);

  const allEntries = entries.filter(
    (e) => e.state === state.slug || e.state === 'all'
  );

  const majorCities = getStateMajorCities(state.slug);
  const timingInfo = getStateExciseTimings(state.slug);

  const hasVerifiedSource = allEntries.some(
    (e) => e.status === 'confirmed' && Boolean(e.sourceUrl && e.sourceUrl.trim().length > 0)
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
            ? `Today has a reported dry day signal in ${state.name}. Official confirmation awaited.`
            : todayStatus === 'unavailable'
            ? `Today's dry-day status in ${state.name} could not be retrieved from the database right now.`
            : `No, today is not a scheduled dry day in ${state.name}. Licensed retail vendors operate during normal trading hours.`,
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
            ? `Tomorrow's dry status is reported but not yet officially confirmed in ${state.name}.`
            : tomorrowStatus === 'unavailable'
            ? `Tomorrow's dry-day status in ${state.name} could not be retrieved from the database right now.`
            : `No, tomorrow is not scheduled as a dry day in ${state.name}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Are wine shops and thekas open today in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: state.prohibition
            ? `No, ${state.name} is a statutory prohibition state. Wine shops and thekas are permanently closed.`
            : todayStatus === 'dry'
            ? `No, all retail wine shops and thekas in ${state.name} are closed today (${formattedToday}) due to official dry day directives.`
            : todayStatus === 'maybe'
            ? `Wine shop status is pending official confirmation for today in ${state.name}.`
            : todayStatus === 'unavailable'
            ? `Wine shop operating status in ${state.name} is temporarily unavailable.`
            : `Yes, licensed retail wine shops and thekas in ${state.name} are open today (${formattedToday}) during standard excise hours (typically 10:00 AM to 10:00 PM).`,
        },
      },
      {
        '@type': 'Question',
        name: `Are bars and restaurants serving alcohol today in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: state.prohibition
            ? `No, serving or selling alcohol is illegal in ${state.name}.`
            : todayStatus === 'dry'
            ? `No, licensed bars, clubs, and hotel lounges in ${state.name} are strictly prohibited from serving alcohol on official dry days.`
            : todayStatus === 'maybe'
            ? `Bar service rules for today are pending official confirmation in ${state.name}.`
            : todayStatus === 'unavailable'
            ? `Bar operating status in ${state.name} is temporarily unavailable.`
            : `Yes, licensed bars, clubs, and hotel lounges in ${state.name} are permitted to serve liquor today during standard licensed hours.`,
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
          answer={heroAnswer}
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
                {todayBadge}
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-neutral-200">
              {state.prohibition
                ? 'Total statutory prohibition in effect. Retail liquor stores do not operate.'
                : todayStatus === 'dry'
                ? 'Liquor retail shops and bars are mandated closed under state excise rules.'
                : todayStatus === 'maybe'
                ? 'Reported closure — official confirmation awaited.'
                : todayStatus === 'unavailable'
                ? 'Database se status abhi retrieve nahi ho pa raha hai.'
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
                {state.prohibition ? 'Always Dry' : tomorrowStatus === 'dry' ? 'Dry' : tomorrowStatus === 'maybe' ? 'Maybe' : tomorrowStatus === 'unavailable' ? 'Unavailable' : 'Open'}
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-neutral-200">
              {state.prohibition
                ? 'Total statutory prohibition remains actively enforced year-round.'
                : tomorrowStatus === 'dry'
                ? 'Official dry day directive scheduled for tomorrow.'
                : tomorrowStatus === 'maybe'
                ? 'Reported closure — official confirmation awaited for tomorrow.'
                : tomorrowStatus === 'unavailable'
                ? 'Database se status abhi retrieve nahi ho pa raha hai.'
                : 'No dry day order scheduled for tomorrow.'}
            </p>
          </div>
        </div>

        {/* Retail Theka & Bar Operating Hours Card */}
        {!state.prohibition && (
          <section className="my-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Store className="h-4 w-4 text-amber-400" />
                <span>Liquor Store &amp; Bar Operating Hours &bull; {state.name}</span>
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  todayStatus === 'dry'
                    ? 'bg-rose-950/70 text-rose-300 border-rose-800/60'
                    : 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60'
                }`}
              >
                {todayStatus === 'dry' ? 'Thekas Closed Today' : 'Thekas Open Today'}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                <span className="text-neutral-400 block text-[11px]">Retail Wine Shop / Theka Hours</span>
                <span className="font-semibold text-white mt-1 block text-xs sm:text-sm">
                  {timingInfo.retailHours}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                <span className="text-neutral-400 block text-[11px]">Bar &amp; Restaurant Timings</span>
                <span className="font-semibold text-white mt-1 block text-xs sm:text-sm">
                  {timingInfo.barHours}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                <span className="text-neutral-400 block text-[11px]">Statutory Legal Drinking Age</span>
                <span className="font-semibold text-amber-400 mt-1 block text-xs sm:text-sm">
                  {timingInfo.legalAge} Years Minimum
                </span>
              </div>
            </div>

            {timingInfo.notes && (
              <p className="mt-2.5 text-[11px] text-neutral-400 italic">
                * Note: {timingInfo.notes}
              </p>
            )}
          </section>
        )}

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
                {dataUnavailable
                  ? 'Data unavailable'
                  : datasetEmpty
                  ? 'Awaiting published data'
                  : `${next30Days.length} ${next30Days.length === 1 ? 'date' : 'dates'}`}
              </span>
            </div>

            {next30Days.length === 0 ? (
              <div className="mt-3 p-4 rounded-xl border border-neutral-800 bg-neutral-950/40 text-center text-xs text-neutral-400">
                <ShieldCheck className="h-5 w-5 text-emerald-400 mx-auto mb-1.5" />
                {dataUnavailable
                  ? DATA_UNAVAILABLE_LIST_MESSAGE
                  : datasetEmpty
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
              const nbStatus: PublicStatus = dataUnavailable
                ? 'unavailable'
                : getStatus(nb.slug, todayIST, entries);
              const nbLabel = nb.prohibition
                ? 'Always Dry'
                : nbStatus === 'dry'
                ? 'Dry Today'
                : nbStatus === 'maybe'
                ? 'Maybe'
                : nbStatus === 'unavailable'
                ? 'Unavailable'
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
            ) : hasVerifiedSource ? (
              <p>
                In {state.name}, dry days and sale restrictions are notified by state excise authorities. On notified dates, licensed retail liquor shops and commercial establishments remain closed in accordance with official orders.
              </p>
            ) : (
              <p>
                In {state.name}, alcohol sale regulations and holiday closures are subject to state and local administration orders. Operating hours and restrictions vary based on official notifications.
              </p>
            )}
            <p className="text-neutral-400 text-xs">
              National holidays (26 January, 15 August, and 2 October) are mandatory pan-India dry days. In addition, 48-hour dry curfews are enforced prior to election voting in designated constituencies.
            </p>
            {state.slug === 'kerala' && (
              <p className="text-xs text-neutral-300 pt-1">
                For detailed legal analysis of election-related alcohol closures in Kerala, read our verified guide:{' '}
                <Link
                  href="/guides/kerala-dry-days-2026"
                  className="text-amber-400 underline font-medium hover:text-white"
                >
                  Learn more about Kerala&apos;s 2026 election dry-day order, including the official dates and restrictions
                </Link>
                .
              </p>
            )}
            {state.slug === 'uttar-pradesh' && (
              <p className="text-xs text-neutral-300 pt-1">
                For detailed rules on upcoming festival closures, shop operating hours, and interstate limits, read our verified guide:{' '}
                <Link
                  href="/guides/uttar-pradesh-dry-days-2026"
                  className="text-amber-400 underline font-medium hover:text-white"
                >
                  Uttar Pradesh Dry Days 2026: Upcoming Dates, Rules &amp; Liquor Timings
                </Link>
                .
              </p>
            )}
            {state.slug === 'delhi' && (
              <p className="text-xs text-neutral-300 pt-1">
                For detailed rules on standing gazette dry days, 10 PM government vend timings, and Gurugram/Noida border transit limits, read our verified guide:{' '}
                <Link
                  href="/guides/delhi-dry-days-2026"
                  className="text-amber-400 underline font-medium hover:text-white"
                >
                  Delhi Dry Days 2026: Official Calendar, Theka Timings &amp; NCR Rules
                </Link>
                .
              </p>
            )}
            {state.slug === 'maharashtra' && (
              <p className="text-xs text-neutral-300 pt-1">
                For detailed Mumbai and Pune festival closures, Kartiki Ekadashi, and Wardha/Gadchiroli prohibition rules, read our verified guide:{' '}
                <Link
                  href="/guides/maharashtra-dry-days-2026"
                  className="text-amber-400 underline font-medium hover:text-white"
                >
                  Maharashtra Dry Days 2026: Mumbai &amp; Pune Calendar, Local Bans &amp; Rules
                </Link>
                .
              </p>
            )}
            {state.slug === 'karnataka' && (
              <p className="text-xs text-neutral-300 pt-1">
                For detailed rules on Kannada Rajyotsava (1 Nov), Bengaluru pub timings, and CL-2 retail hours, read our verified guide:{' '}
                <Link
                  href="/guides/karnataka-dry-days-2026"
                  className="text-amber-400 underline font-medium hover:text-white"
                >
                  Karnataka Dry Days 2026: Kannada Rajyotsava (1 Nov), Bengaluru Timings &amp; Rules
                </Link>
                .
              </p>
            )}
            {state.slug === 'rajasthan' && (
              <p className="text-xs text-neutral-300 pt-1">
                For detailed rules on the strict 8 PM wine shop curfew, Jaipur/Jodhpur dates, and Mount Abu tourist limits, read our verified guide:{' '}
                <Link
                  href="/guides/rajasthan-dry-days-2026"
                  className="text-amber-400 underline font-medium hover:text-white"
                >
                  Rajasthan Dry Days 2026: Official Dates, 8 PM Theka Rules &amp; City List
                </Link>
                .
              </p>
            )}
            {state.slug === 'gujarat' && (
              <p className="text-xs text-neutral-300 pt-1">
                For complete legal details on Gujarat visitor liquor permits, GIFT City dining rules, and national prohibition laws, read our comprehensive guide:{' '}
                <Link
                  href="/guides/dry-states-in-india-2026"
                  className="text-amber-400 underline font-medium hover:text-white"
                >
                  Dry States in India 2026: Complete List of Prohibition States vs Open States
                </Link>
                .
              </p>
            )}
            {state.slug === 'bihar' && (
              <p className="text-xs text-neutral-300 pt-1">
                For official statutory context on Bihar&apos;s 2016 total prohibition act, interstate transit penalties, and the national dry states list, read our comprehensive guide:{' '}
                <Link
                  href="/guides/dry-states-in-india-2026"
                  className="text-amber-400 underline font-medium hover:text-white"
                >
                  Dry States in India 2026: Complete List of Prohibition States vs Open States
                </Link>
                .
              </p>
            )}
          </div>
        </section>

        {/* Major Cities & Districts Covered */}
        {majorCities.length > 0 && (
          <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-amber-400" />
              <span>Districts &amp; Major Cities Covered in {state.name}</span>
            </h2>
            <p className="text-xs text-neutral-300 mb-3 leading-relaxed">
              Official dry-day notifications, festival closures, and operating hours in {state.name} apply across all municipal corporations, revenue districts, and urban centres, including:
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {majorCities.map((city) => (
                <span
                  key={city}
                  className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs font-medium"
                >
                  {city}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-neutral-400">
              Whether you are searching if wine shops or thekas are open today in {majorCities.slice(0, 3).join(', ')}, or other towns, the legal status displayed on DryCheck is verified under {state.name} State Excise Department circulars.
            </p>
          </section>
        )}

        {/* State Regulatory Guides Section */}
        {publishedGuides.length > 0 && (
          <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span>Official Regulatory &amp; Election Guides &bull; {state.name}</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  In-depth legal breakdown of government orders, polling restrictions, and excise policies for {state.name}.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {publishedGuides.map((guide) => (
                <div
                  key={guide.slug}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-neutral-800/80 bg-neutral-950 hover:border-amber-500/50 transition-colors gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Official Gazette Analysis
                      </span>
                      {guide.isHistorical && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                          Historical Order
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors block"
                    >
                      {guide.title}
                    </Link>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {guide.excerpt || guide.metaDescription}
                    </p>
                  </div>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:underline shrink-0 min-h-[44px]"
                  >
                    <span>Read Guide</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

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
