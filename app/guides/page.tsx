import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedGuides, getGuideStateSummary } from '@/lib/guides';
import GuideCard from '@/components/guides/GuideCard';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { BookOpen, ChevronRight, Scale, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  title: 'State Dry Day Guides & Legal Reference | DryCheck India',
  description:
    'Authoritative, verified legal and regulatory guides on dry days, election alcohol restrictions, and state excise policies across India.',
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
  openGraph: {
    title: 'State Dry Day Guides & Legal Reference | DryCheck India',
    description:
      'Authoritative, verified legal and regulatory guides on dry days, election alcohol restrictions, and state excise policies across India.',
    url: `${SITE_URL}/guides`,
    siteName: 'DryCheck India',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'State Dry Day Guides & Legal Reference | DryCheck India',
    description:
      'Authoritative, verified legal and regulatory guides on dry days, election alcohol restrictions, and state excise policies across India.',
  },
};

export default function GuidesIndexPage() {
  const publishedGuides = getPublishedGuides();
  const stateSummary = getGuideStateSummary();

  const featuredGuide = publishedGuides.find((g) => g.slug === 'kerala-dry-days-2026') || publishedGuides[0];
  const remainingGuides = publishedGuides.filter((g) => g.slug !== featuredGuide?.slug);

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
        name: 'Guides',
        item: `${SITE_URL}/guides`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'DryCheck India State Dry Day Guides',
    description:
      'Authoritative legal analyses and regulatory guides covering alcohol sale restrictions, election notifications, and excise rules across Indian states.',
    url: `${SITE_URL}/guides`,
    publisher: {
      '@type': 'Organization',
      name: 'DryCheck India',
      url: SITE_URL,
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
          <span className="text-amber-400 font-medium">Guides</span>
        </nav>

        {/* Hero Header */}
        <header className="border-b border-neutral-800 pb-6 mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>DryCheck India Editorial Library</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Official State Dry Day Guides &amp; Regulatory Reference
          </h1>

          <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed">
            In-depth legal analyses, election dry-day orders, and state excise department policies.
            Every guide in this library is researched from primary government gazettes, statutory enactments,
            and verified official communications.
          </p>
        </header>

        <AdSlot id="guides-top" />

        {/* Featured Guide Section */}
        {featuredGuide && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Featured Guide</span>
              </h2>
              <span className="text-xs font-mono text-neutral-400">
                Verified Government Source
              </span>
            </div>

            <GuideCard guide={featuredGuide} featured={true} />
          </section>
        )}

        {/* Remaining Published Guides (if any) */}
        {remainingGuides.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-400" />
              <span>More State &amp; UT Regulatory Guides</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {remainingGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {/* Browse Guides by State / Directory Coverage */}
        <section className="mb-12 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-2 mb-5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>Browse Guides by State &amp; Union Territory</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Detailed regulatory dossiers are published individually following primary gazette verification.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-800 text-amber-400 shrink-0 font-medium self-start sm:self-auto">
              {publishedGuides.length} {publishedGuides.length === 1 ? 'Guide Published' : 'Guides Published'}
            </span>
          </div>

          {/* Currently published state cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {stateSummary.map((state) => (
              <div
                key={state.stateSlug}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">
                    {state.stateName}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {state.guideCount} {state.guideCount === 1 ? 'Guide' : 'Guides'}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  {state.region} India &bull; Assembly election order &amp; excise rules
                </p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <Link
                    href={`/india/${state.stateSlug}`}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    State Tracker &rarr;
                  </Link>
                  <Link
                    href={`/guides/kerala-dry-days-2026`}
                    className="text-amber-400 hover:underline font-medium"
                  >
                    Read Guide &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State / Roadmap for Other States */}
          <div className="mt-6 p-4 rounded-xl border border-neutral-800/80 bg-neutral-950/40 text-xs text-neutral-300 space-y-2">
            <div className="flex items-center gap-2 text-neutral-200 font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Looking for other Indian States and Union Territories?</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              We publish long-form regulatory guides only after primary gazettes, statutory orders, and court directives
              are independently reviewed by our editorial team. In the meantime, you can check real-time dry day status,
              prohibition laws, and excise rules for all 36 Indian states and union territories in our live tracker.
            </p>
            <div className="pt-2">
              <Link
                href="/#state-directory"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:underline font-semibold"
              >
                <span>Explore the 36-State Real-Time Directory</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Editorial Standards Note */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 text-xs text-neutral-400 space-y-2">
          <h2 className="text-sm font-bold text-neutral-200">
            About DryCheck India Guides
          </h2>
          <p className="leading-relaxed">
            Unlike superficial blogs or automated aggregators, DryCheck India Guides are comprehensive legal and
            regulatory dossiers. Every article explicitly cites government notification numbers, departments, issuing
            officers, and statutory provisions (such as the Representation of the People Act, 1951, and respective state
            Abkari acts).
          </p>
          <p className="leading-relaxed">
            Notice an updated gazette or have a state excise order to share?{' '}
            <Link href="/contact" className="text-amber-400 hover:underline">
              Submit an official notification to our editorial team
            </Link>
            .
          </p>
        </section>

        <AdSlot id="guides-bottom" />
      </div>
    </>
  );
}
