import Image from 'next/image';
import { Metadata } from 'next';
import HeroAnswer from '@/components/HeroAnswer';
import LocationBanner from '@/components/LocationBanner';
import DryStateList from '@/components/DryStateList';
import UpcomingDryDays from '@/components/UpcomingDryDays';
import StateDirectory from '@/components/StateDirectory';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import {
  getTodayIST,
  getTomorrowIST,
  getNationwideStatus,
  getDeterministicSecondaryLine,
  getDryStatesOn,
  getUpcomingDryDaysGrouped,
  getStatusHeadline,
  formatDateDisplay,
  SITE_URL,
  DATA_UNAVAILABLE_SECONDARY,
  DATA_UNAVAILABLE_LIST_MESSAGE,
  type PublicStatus,
} from '@/lib/dryday';
import { getPublicDataset } from '@/lib/public-drydays';

export const revalidate = 3600; // Hourly ISR for accurate midnight IST rollover

export const metadata: Metadata = {
  title: 'Is Today a Dry Day in India? | DryCheck India',
  description:
    'Aaj sookha hai ya nahi, ek nazar mein. Check whether today or tomorrow is a dry day across Indian states and UTs with real-time excise notifications.',
  alternates: {
    canonical: 'https://drycheck.in',
  },
  openGraph: {
    title: 'Is Today a Dry Day in India? | DryCheck India',
    description:
      'Real-time check for alcohol store openings, dry dates, and excise directives in all 36 Indian states and union territories.',
    url: 'https://drycheck.in',
    type: 'website',
    siteName: 'DryCheck India',
    images: [
      {
        url: '/logo-desktop.png',
        width: 450,
        height: 150,
        alt: 'DryCheck India',
      },
    ],
  },
};

export default async function HomePage() {
  const dataset = await getPublicDataset();
  const entries = dataset.entries;
  // True when the database could not be reached at all — the status is
  // unknown, which is NOT the same as "no entries published".
  const dataUnavailable = !dataset.ok;
  // True when the fetch succeeded but no entries are published yet.
  const datasetEmpty = dataset.ok && entries.length === 0;
  const todayIST = getTodayIST();
  const tomorrowIST = getTomorrowIST();

  const todayNationwide = getNationwideStatus(todayIST, entries);
  const tomorrowNationwide = getNationwideStatus(tomorrowIST, entries);

  const heroStatus: PublicStatus = dataUnavailable ? 'unavailable' : todayNationwide.status;
  // Nationwide aggregate: when some (but not all) states are confirmed dry,
  // neither "Haan" nor "Pata nahi" fits — say exactly that. Reported-only
  // signals (no confirmed state) are honestly "Pata nahi".
  const heroAnswer =
    heroStatus === 'maybe' && todayNationwide.dryCount > 0
      ? 'Aaj kuch rajyon mein theka band hai.'
      : getStatusHeadline(heroStatus, todayIST);

  const secondaryLine = dataUnavailable
    ? DATA_UNAVAILABLE_SECONDARY
    : datasetEmpty
    ? 'No verified dry-day entries published yet. Status will update once state excise notifications are published.'
    : getDeterministicSecondaryLine(
        todayNationwide.status,
        tomorrowNationwide.status,
        todayIST
      );

  const dryStatesToday = getDryStatesOn(todayIST, entries);
  const dryStatesTomorrow = getDryStatesOn(tomorrowIST, entries);

  const upcoming4Weeks = getUpcomingDryDaysGrouped(todayIST, 28, entries);

  const formattedToday = formatDateDisplay(todayIST, { showDayOfWeek: true });
  const formattedTomorrow = formatDateDisplay(tomorrowIST, { showDayOfWeek: true });

  const listEmptyMessage = dataUnavailable
    ? DATA_UNAVAILABLE_LIST_MESSAGE
    : datasetEmpty
    ? 'No verified dry-day entries published yet'
    : 'No verified dry days scheduled for this date';

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DryCheck India',
    url: 'https://drycheck.in',
    description:
      'Aaj sookha hai ya nahi, ek nazar mein. Instant check for dry days today and tomorrow across all 36 Indian states and union territories.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://drycheck.in/india/{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <JsonLd data={websiteSchema} />

      <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 pt-1 pb-12">
        <AdSlot id="home-top" />

        {/* Location banner — client-side region detection; status computed from
            the same entry dataset the server-rendered hero uses */}
        <LocationBanner entries={entries} dataUnavailable={dataUnavailable} />

        {/* 1, 2, 3: Headline, Big Answer (>=96px, no scroll on 360x640), Secondary line (>=20px) */}
        <HeroAnswer
          headline="Is today a dry day?"
          answer={heroAnswer}
          statusType={heroStatus}
          secondaryLine={secondaryLine}
          todayDateIST={todayIST}
          tomorrowDateIST={tomorrowIST}
          contextTitle="All India Status"
        />

        {/* 4. "Dry today in:" list of states with links */}
        <DryStateList
          title="Dry Today In:"
          dateDisplay={formattedToday}
          items={dryStatesToday}
          datasetEmpty={datasetEmpty}
          dataUnavailable={dataUnavailable}
          emptyMessage={listEmptyMessage}
        />

        <AdSlot id="home-middle" />

        {/* 5. "Dry tomorrow in:" list of states with links */}
        <DryStateList
          title="Dry Tomorrow In:"
          dateDisplay={formattedTomorrow}
          items={dryStatesTomorrow}
          datasetEmpty={datasetEmpty}
          dataUnavailable={dataUnavailable}
          emptyMessage={listEmptyMessage}
          isTomorrow
        />

        {/* 6. "Dry days ahead (next 4 weeks)" list grouped by date */}
        <UpcomingDryDays
          groups={upcoming4Weeks}
          datasetEmpty={datasetEmpty}
          dataUnavailable={dataUnavailable}
        />

        {/* Searchable State Selector on mobile (e.g. typing "bih" shows Bihar) */}
        <StateDirectory />

        <AdSlot id="home-bottom" />
      </div>
    </>
  );
}
