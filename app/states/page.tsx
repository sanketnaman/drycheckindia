import { Metadata } from 'next';
import Link from 'next/link';
import { getAllStates, StateInfo, getStateExciseTimings } from '@/lib/dryday';
import { getStateExciseProfile } from '@/lib/state-excise-profiles';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import {
  MapPin,
  ChevronRight,
  ShieldAlert,
  Clock,
  Scale,
  Sparkles,
  ExternalLink,
  Store,
} from 'lucide-react';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  title: 'All 36 States & UTs Dry Day Directory | Official Excise Rules',
  description:
    'Comprehensive directory of all 28 Indian States and 8 Union Territories. Check state-wise dry day lists, retail wine shop timings, liquor possession limits, and excise laws.',
  alternates: {
    canonical: `${SITE_URL}/states`,
  },
  openGraph: {
    title: 'All 36 States & UTs Dry Day Directory | DryCheck India',
    description:
      'Comprehensive directory of all 28 Indian States and 8 Union Territories. Check state-wise dry day lists, retail wine shop timings, liquor possession limits, and excise laws.',
    url: `${SITE_URL}/states`,
    siteName: 'DryCheck India',
    type: 'website',
    images: [
      {
        url: '/logo-desktop.png',
        width: 450,
        height: 150,
        alt: 'DryCheck India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All 36 States & UTs Dry Day Directory | DryCheck India',
    description:
      'Comprehensive directory of all 28 Indian States and 8 Union Territories. State excise laws, dry day notifications, and wine shop timings.',
  },
};

export const revalidate = 86400;

export default function StatesIndexPage() {
  const allStates = getAllStates();

  const regionsOrder = [
    'North',
    'West',
    'South',
    'East',
    'North-East',
    'Central',
    'UT',
  ] as const;

  const regionLabels: Record<string, string> = {
    North: 'Northern States & Territories',
    West: 'Western States & Territories',
    South: 'Southern States & Territories',
    East: 'Eastern States & Territories',
    'North-East': 'North-Eastern States',
    Central: 'Central Indian States',
    UT: 'Island & Union Territories',
  };

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
        name: 'States & Union Territories',
        item: `${SITE_URL}/states`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'DryCheck India All States and Union Territories Directory',
    description:
      'Official directory covering alcohol laws, retail shop timings, statutory dry days, and excise notifications across all 36 Indian States and Union Territories.',
    url: `${SITE_URL}/states`,
    publisher: {
      '@type': 'Organization',
      name: 'DryCheck India',
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allStates.map((s, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: s.name,
        url: `${SITE_URL}/india/${s.slug}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />

      <div className="mx-auto w-full max-w-5xl px-3 sm:px-6 pt-2 pb-16 text-neutral-200">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="my-2 flex items-center text-xs text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors min-h-[36px] flex items-center">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-1.5 text-neutral-600" />
          <span className="text-amber-400 font-medium">States &amp; UTs Directory</span>
        </nav>

        {/* Hero Section */}
        <header className="border-b border-neutral-800 pb-8 mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span>All-India Regulatory Directory &bull; 36 Jurisdictions</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Indian States &amp; Union Territories Dry Day Directory
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed">
            In the Republic of India, alcohol manufacturing, sale, and dry-day enforcement are state subjects under
            Entry 8 of the State List (Seventh Schedule of the Constitution). Explore verified regulatory frameworks,
            theka timings, statutory dry day orders, and possession rules across all 28 states and 8 Union Territories.
          </p>

          {/* Quick Regulatory Highlights Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3.5">
              <span className="text-xs text-neutral-400 font-medium block">Total Jurisdictions</span>
              <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">36</span>
              <span className="text-[11px] text-neutral-500">28 States + 8 UTs</span>
            </div>
            <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-3.5">
              <span className="text-xs text-rose-300 font-medium block">Statutory Prohibition</span>
              <span className="text-xl sm:text-2xl font-bold text-rose-200 mt-1 block">5 States / UTs</span>
              <span className="text-[11px] text-rose-400/80">Bihar, Gujarat, Nagaland, MZ, LD</span>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3.5">
              <span className="text-xs text-neutral-400 font-medium block">Regulated Markets</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-400 mt-1 block">31 States / UTs</span>
              <span className="text-[11px] text-neutral-500">Scheduled dry days</span>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3.5">
              <span className="text-xs text-neutral-400 font-medium block">National Dry Days</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1 block">3 Mandatory</span>
              <span className="text-[11px] text-neutral-500">26 Jan, 15 Aug, 2 Oct</span>
            </div>
          </div>
        </header>

        <AdSlot id="states-directory-top" />

        {/* Directory Categorized by Region */}
        <div className="space-y-10">
          {regionsOrder.map((regionKey) => {
            const statesInRegion = allStates.filter((s) => s.region === regionKey);
            if (statesInRegion.length === 0) return null;

            return (
              <section key={regionKey} aria-labelledby={`region-heading-${regionKey}`}>
                <div className="flex items-center gap-2 mb-4 border-b border-neutral-800 pb-2">
                  <h2
                    id={`region-heading-${regionKey}`}
                    className="text-lg sm:text-xl font-bold text-white tracking-wide"
                  >
                    {regionLabels[regionKey] || `${regionKey} India`}
                  </h2>
                  <span className="text-xs font-mono text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded-full">
                    {statesInRegion.length} {statesInRegion.length === 1 ? 'state' : 'states'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {statesInRegion.map((st: StateInfo) => {
                    const profile = getStateExciseProfile(st.slug);
                    const timing = getStateExciseTimings(st.slug);
                    return (
                      <Link
                        key={st.slug}
                        href={`/india/${st.slug}`}
                        className="group flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 hover:border-amber-500/50 hover:bg-neutral-900/90 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-base text-neutral-100 group-hover:text-amber-400 transition-colors">
                              {st.name}
                            </h3>
                            {st.prohibition ? (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 shrink-0">
                                Prohibition
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 shrink-0">
                                Regulated
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                            {profile?.actName || `Excise laws and wine shop guidelines for ${st.name}.`}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                          <span className="flex items-center gap-1.5 text-neutral-400">
                            <Clock className="h-3 w-3 text-amber-500" />
                            <span className="truncate max-w-[170px]">
                              {st.prohibition ? 'Closed permanently' : timing.retailHours || 'Check state schedule'}
                            </span>
                          </span>

                          <span className="inline-flex items-center gap-0.5 font-medium text-amber-400 group-hover:translate-x-0.5 transition-transform">
                            <span>Check</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Informational Context Box */}
        <section className="mt-14 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 text-xs text-neutral-400 space-y-3 leading-relaxed">
          <div className="flex items-center gap-2 text-neutral-200 font-semibold text-sm">
            <Scale className="h-4 w-4 text-amber-400" />
            <span>Constitutional Mandate &bull; Seventh Schedule (Entry 8, State List)</span>
          </div>
          <p>
            Under Article 246 and the Seventh Schedule of the Indian Constitution, state legislatures possess exclusive power
            to enact laws governing intoxicating liquors: manufacturing, production, possession, transport, purchase, and sale.
            Consequently, national dry days (Republic Day on January 26, Independence Day on August 15, and Mahatma Gandhi Jayanti
            on October 2) are universally observed across all regulated states, while religious, electoral, and municipal dry days
            are declared autonomously via respective state excise gazettes.
          </p>
          <p>
            Always verify real-time notifications with local District Magistrates, Collectors, and State Excise Commissionerates
            before planning interstate transit or retail purchases.
          </p>
        </section>

        <div className="mt-8">
          <AdSlot id="states-directory-bottom" />
        </div>
      </div>
    </>
  );
}
