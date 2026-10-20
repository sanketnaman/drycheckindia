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
  formatDateDisplay,
  SITE_URL,
} from '@/lib/dryday';

export const revalidate = 3600; // Hourly ISR for accurate midnight IST rollover

export const metadata: Metadata = {
  title: 'DryCheck India | Aaj sookha hai ya nahi, ek nazar mein',
  description:
    'Aaj sookha hai ya nahi, ek nazar mein. Check whether today or tomorrow is a dry day across Indian states and UTs with real-time excise notifications & 2026 calendars.',
  alternates: {
    canonical: 'https://drycheck.in',
  },
  openGraph: {
    title: 'DRY CHECK India | Aaj sookha hai ya nahi, ek nazar mein',
    description:
      'Real-time check for alcohol store openings, dry dates, and excise directives in all 36 Indian states and union territories.',
    url: 'https://drycheck.in',
    type: 'website',
    siteName: 'DRY CHECK India',
    images: [
      {
        url: '/logo-desktop.png',
        width: 450,
        height: 150,
        alt: 'DRY CHECK India',
      },
    ],
  },
};

export default function HomePage() {
  const todayIST = getTodayIST();
  const tomorrowIST = getTomorrowIST();

  const todayNationwide = getNationwideStatus(todayIST);
  const tomorrowNationwide = getNationwideStatus(tomorrowIST);

  const secondaryLine = getDeterministicSecondaryLine(
    todayNationwide.status,
    tomorrowNationwide.status,
    todayIST
  );

  const dryStatesToday = getDryStatesOn(todayIST);
  const dryStatesTomorrow = getDryStatesOn(tomorrowIST);

  const upcoming4Weeks = getUpcomingDryDaysGrouped(todayIST, 28);

  const formattedToday = formatDateDisplay(todayIST, { showDayOfWeek: true });
  const formattedTomorrow = formatDateDisplay(tomorrowIST, { showDayOfWeek: true });

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

        {/* Location banner — client-side only, does not affect cached HTML */}
        <LocationBanner />

        <LocationBanner />

        {/* 1, 2, 3: Headline, Big Answer (>=96px, no scroll on 360x640), Secondary line (>=20px) */}
        <HeroAnswer
          headline="Is today a dry day?"
          answer={todayNationwide.label}
          statusType={todayNationwide.status}
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
          emptyMessage="No verified dry day dates yet"
        />

        <AdSlot id="home-middle" />

        {/* 5. "Dry tomorrow in:" list of states with links */}
        <DryStateList
          title="Dry Tomorrow In:"
          dateDisplay={formattedTomorrow}
          items={dryStatesTomorrow}
          emptyMessage="No verified dry day dates yet"
          isTomorrow
        />

        {/* 6. "Dry days ahead (next 4 weeks)" list grouped by date */}
        <UpcomingDryDays groups={upcoming4Weeks} />

        {/* Searchable State Selector on mobile (e.g. typing "bih" shows Bihar) */}
        <StateDirectory />

        <AdSlot id="home-bottom" />
      </div>
    </>
  );
}
