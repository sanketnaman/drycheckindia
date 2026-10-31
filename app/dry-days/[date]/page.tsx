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
  getNationwideStatus,
  getStatusHeadline,
  getTodayIST,
  getStateBySlug,
  DATA_UNAVAILABLE_SECONDARY,
  DATA_UNAVAILABLE_LIST_MESSAGE,
} from '@/lib/dryday';
import { getPublicDataset, getPublicEntries } from '@/lib/public-drydays';
import {
  Calendar,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
  ArrowLeft,
  MapPin,
  HelpCircle as QuestionIcon,
} from 'lucide-react';

export const revalidate = 3600;

interface Props {
  params: Promise<{
    date: string;
  }>;
}

const SITE_URL = 'https://drycheck.in';

// Dynamic rendering at request time ensures accurate IST date computation without static freezing

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date: rawSlug } = await params;
  const dateIST = slugToDate(rawSlug);

  if (!dateIST) {
    return {
      title: 'Date Not Found',
    };
  }

  const formattedDate = formatDateDisplay(dateIST, { showDayOfWeek: true });
  const dateWithoutWeekday = formatDateDisplay(dateIST, { showDayOfWeek: false, fullMonth: true });
  const dataset = await getPublicDataset();
  const entries = dataset.entries;
  const allEntriesOnDate = entries.filter((e) => e.date === dateIST);
  const primaryReason = allEntriesOnDate[0]?.reason;

  let title = primaryReason
    ? `${dateWithoutWeekday}: Dry Day in India? ${primaryReason}`
    : `Is ${dateWithoutWeekday} a Dry Day in India? State List`;

  if (title.length > 55) {
    const compactDate = formatDateDisplay(dateIST, { showDayOfWeek: false, fullMonth: false });
    title = primaryReason
      ? `${compactDate}: Dry Day in India? ${primaryReason}`
      : `Is ${compactDate} a Dry Day in India? State List`;
  }

  const description = primaryReason
    ? `Find out if ${formattedDate} is a dry day in India for ${primaryReason}. State-wise liquor shop and theka status, bar timings, and official excise rules.`
    : `Check if ${formattedDate} is a dry day across Indian states. Complete state-wise list, retail liquor shop status, bar timings, and official excise notifications.`;

  const canonicalUrl = `${SITE_URL}/dry-days/${rawSlug}`;
  const fullTitle = `${title} | DryCheck India`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      type: 'article',
      siteName: 'DryCheck India',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
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

  const dataset = await getPublicDataset();
  const entries = dataset.entries;
  // True when the database could not be reached at all — the status is
  // unknown, which is NOT the same as "no entries published".
  const dataUnavailable = !dataset.ok;
  const datasetEmpty = dataset.ok && entries.length === 0;
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

  const hasVerifiedCircular = allEntriesOnDate.some(
    (e) => e.status === 'confirmed' && Boolean(e.sourceUrl && e.sourceUrl.trim().length > 0)
  );

  const primaryReason =
    allEntriesOnDate[0]?.reason || (isNational ? 'National Observance' : 'Regional Observance');

  // Primary status line for this date. Only shown when the nationwide answer
  // is unambiguous: all-India dry day, no dry days anywhere, only unconfirmed
  // signals, or a failed fetch. Mixed coverage keeps the descriptive copy
  // below, which lists the exact states.
  const nationwide = getNationwideStatus(dateIST, entries);
  const dateHeadline = dataUnavailable
    ? 'Abhi status check nahi ho pa raha hai.'
    : nationwide.status === 'dry'
    ? getStatusHeadline('dry', dateIST)
    : nationwide.status === 'not_dry'
    ? getStatusHeadline('not_dry', dateIST)
    : nationwide.status === 'maybe' && nationwide.dryCount === 0 && nationwide.maybeCount > 0
    ? getStatusHeadline('maybe', dateIST)
    : null;

  const popularStateSlugs = [
    'delhi',
    'uttar-pradesh',
    'maharashtra',
    'karnataka',
    'rajasthan',
    'west-bengal',
    'punjab',
    'telangana',
    'tamil-nadu',
    'kerala',
  ];
  const popularStates = popularStateSlugs
    .map((s) => getStateBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

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
        name: 'Dry Days Across India',
        item: `${SITE_URL}/dry-days/${rawSlug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${formattedDate} a dry day in India?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: dataUnavailable
            ? `The real-time status for ${formattedDate} could not be retrieved from the database right now. Please check back shortly.`
            : isNational
            ? `Yes, ${formattedDate} is a nationwide dry day across India in observance of ${primaryReason}. All retail liquor shops, thekas, and commercial bars remain closed.`
            : eventDryDays.length > 0
            ? `${formattedDate} is a dry day in ${eventDryDays.length} state(s) including ${eventDryDays.slice(0, 3).map((s) => s.state.name).join(', ')}${eventDryDays.length > 3 ? ' and others' : ''} for ${primaryReason}. States under total statutory prohibition (Bihar, Gujarat, Nagaland, Mizoram, Lakshadweep) are also closed.`
            : `No nationwide dry day is scheduled for ${formattedDate}. Licensed liquor retail shops and bars operate normally across non-prohibition states.`,
        },
      },
      {
        '@type': 'Question',
        name: `Are wine shops and thekas open or closed on ${formattedDate}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: dataUnavailable
            ? `Shop operating status for ${formattedDate} is temporarily unavailable.`
            : isNational
            ? `All retail wine shops and thekas are mandated closed throughout India on ${formattedDate} for ${primaryReason}.`
            : eventDryDays.length > 0
            ? `Wine shops are closed on ${formattedDate} in states observing ${primaryReason} (${eventDryDays.map((s) => s.state.name).join(', ')}). In other states, retail stores operate during standard excise hours.`
            : `Yes, retail wine shops and thekas operate under regular state excise hours on ${formattedDate} across non-prohibition states.`,
        },
      },
      {
        '@type': 'Question',
        name: `Are bars and restaurants serving alcohol on ${formattedDate}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: dataUnavailable
            ? `Bar service status for ${formattedDate} is temporarily unavailable.`
            : isNational
            ? `No, bar licenses (FL-2/FL-3), pubs, clubs, and star hotels are strictly prohibited from serving alcohol on ${formattedDate} across India.`
            : eventDryDays.length > 0
            ? `Bars and clubs are closed in observing states (${eventDryDays.map((s) => s.state.name).join(', ')}). In other states, bars operate during normal permitted hours.`
            : `Yes, licensed bars, clubs, and hotel restaurants are permitted to serve liquor on ${formattedDate} in non-prohibition states.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which Indian states have a dry day on ${formattedDate}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: dryItems.length > 0
            ? `States with dry day restrictions on ${formattedDate} include: ${dryItems.map((s) => s.state.name).join(', ')}.`
            : `No regional dry days are scheduled on ${formattedDate}, though statutory prohibition states (Bihar, Gujarat, Nagaland, Mizoram, Lakshadweep) enforce permanent closure.`,
        },
      },
      {
        '@type': 'Question',
        name: `Kya ${formattedDate} ko India me theka ya wine shop khuli hai? (Theka status today)`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: dataUnavailable
            ? `Abhi ${formattedDate} ke liye server se status prapt nahi ho pa raha hai.`
            : isNational
            ? `Nahi, ${formattedDate} ko ${primaryReason} ke uplakshya me poore desh me official dry day hai, sabhi theke aur wine shops poori tarah band rahenge.`
            : eventDryDays.length > 0
            ? `${formattedDate} ko ${eventDryDays.map((s) => s.state.name).join(', ')} me theke band rahenge. Baki non-prohibition states me theke apne nirdharit samay par khule rahenge.`
            : `Haan, ${formattedDate} ko koi all-India dry day nahi hai. Sabhi non-prohibition states me wine shops aur theke normal timings par khule rahenge.`,
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

          {dateHeadline && (
            <p className="mt-3 text-xl sm:text-2xl font-black text-white tracking-tight text-balance">
              {dateHeadline}
            </p>
          )}

          <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
            {dataUnavailable
              ? DATA_UNAVAILABLE_SECONDARY
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
            {dataUnavailable
              ? 'Data unavailable'
              : isNational
              ? 'All India Dry Day'
              : `${eventDryDays.length} States Affected`}
          </div>
          <p className="mt-1 text-xs text-neutral-300">
            {dataUnavailable
              ? 'Database se jawab nahi mila — thodi der baad dobara try karein'
              : datasetEmpty
              ? 'No published entries in the database yet'
              : hasVerifiedCircular
              ? `${primaryReason} &bull; Verified against state excise circulars`
              : `${primaryReason} &bull; State and regional calendar listing`}
          </p>
        </div>

        {/* States observing on this date */}
        <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h2 className="text-sm sm:text-base font-bold text-white">
              States &amp; UTs Observing Dry Day on {formattedDate}
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              {dataUnavailable
                ? 'Unavailable'
                : datasetEmpty
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
              {dataUnavailable
                ? DATA_UNAVAILABLE_LIST_MESSAGE
                : datasetEmpty
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

        {/* Check Specific State Trackers for this Date */}
        <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-400" />
              <span>Check State Trackers &amp; Theka Status</span>
            </h2>
            <Link
              href="/#state-directory"
              className="text-xs text-amber-400 hover:underline"
            >
              All 36 States &rarr;
            </Link>
          </div>
          <p className="mt-2.5 text-xs text-neutral-300 leading-relaxed">
            Need local timings, retail theka open/closed status, or municipal orders for your city on {formattedDate}? Select your state tracker:
          </p>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {popularStates.map((st) => (
              <Link
                key={st.slug}
                href={`/india/${st.slug}`}
                className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-950/80 hover:border-amber-500/40 hover:bg-neutral-800/40 transition-colors text-center block"
              >
                <span className="text-xs font-semibold text-white block truncate">
                  {st.name}
                </span>
                <span className="text-[10px] text-amber-400/90 font-mono mt-0.5 block">
                  View Tracker &rarr;
                </span>
              </Link>
            ))}
          </div>

          {/* Quick link to November 2026 Calendar */}
          <div className="mt-4 pt-3 border-t border-neutral-800/60 text-xs text-neutral-400 flex flex-wrap items-center justify-between gap-2">
            <span>Planning ahead for Diwali, Chhath Puja, or Guru Nanak Jayanti?</span>
            <Link
              href="/guides/november-dry-days-2026"
              className="text-amber-400 hover:text-white font-medium underline"
            >
              November 2026 Dry Days All-India Calendar &rarr;
            </Link>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3">
            <QuestionIcon className="h-4 w-4 text-amber-400" />
            <span>Frequently Asked Questions &bull; {formattedDate}</span>
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
