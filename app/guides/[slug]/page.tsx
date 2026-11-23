import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPublishedGuides, getPublishedGuideBySlug, getGuideRelatedStates } from '@/lib/guides';
import { getStateBySlug, getStateExciseTimings } from '@/lib/dryday';
import { ChevronRight, MapPin, Clock } from 'lucide-react';
import { EDITOR_NAME } from '@/lib/site-config';
import KeralaGuideArticle from '@/components/guides/KeralaGuideArticle';
import UPGuideArticle from '@/components/guides/UPGuideArticle';
import DelhiGuideArticle from '@/components/guides/DelhiGuideArticle';
import MaharashtraGuideArticle from '@/components/guides/MaharashtraGuideArticle';
import KarnatakaGuideArticle from '@/components/guides/KarnatakaGuideArticle';
import RajasthanGuideArticle from '@/components/guides/RajasthanGuideArticle';
import DryStatesGuideArticle from '@/components/guides/DryStatesGuideArticle';
import NovemberGuideArticle from '@/components/guides/NovemberGuideArticle';
import DiwaliGuideArticle from '@/components/guides/DiwaliGuideArticle';
import WestBengalGuideArticle from '@/components/guides/WestBengalGuideArticle';
import GuruNanakJayantiGuideArticle from '@/components/guides/GuruNanakJayantiGuideArticle';
import ChristmasGuideArticle from '@/components/guides/ChristmasGuideArticle';
import NewYearGuideArticle from '@/components/guides/NewYearGuideArticle';
import GoaLiquorGuideArticle from '@/components/guides/GoaLiquorGuideArticle';
import PunjabGuideArticle from '@/components/guides/PunjabGuideArticle';
import GuideHeroBanner from '@/components/guides/GuideHeroBanner';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const SITE_URL = 'https://drycheck.in';

export const revalidate = 3600;

export async function generateStaticParams() {
  const guides = getPublishedGuides();
  return guides.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getPublishedGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  const canonicalUrl = `${SITE_URL}/guides/${guide.slug}`;
  const fullTitle = `${guide.seoTitle} | DryCheck India`;

  return {
    title: guide.seoTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: guide.metaDescription,
      url: canonicalUrl,
      type: 'article',
      siteName: 'DryCheck India',
      publishedTime: `${guide.publishedDate}T08:00:00+05:30`,
      modifiedTime: `${guide.lastUpdatedDate}T12:00:00+05:30`,
      images: [
        {
          url: guide.heroBannerImage ? `${SITE_URL}${guide.heroBannerImage}` : '/logo-desktop.png',
          width: guide.heroBannerImage ? 1200 : 450,
          height: guide.heroBannerImage ? 630 : 150,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: guide.metaDescription,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getPublishedGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/guides/${guide.slug}`;

  // Structured Data: BreadcrumbList
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
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: canonicalUrl,
      },
    ],
  };

  // Structured Data: Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1Title,
    description: guide.metaDescription,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: canonicalUrl,
    datePublished: `${guide.publishedDate}T08:00:00+05:30`,
    dateModified: `${guide.lastUpdatedDate}T12:00:00+05:30`,
    author: {
      '@type': 'Person',
      name: EDITOR_NAME,
      url: `${SITE_URL}/about`,
    },
    image: [
      guide.heroBannerImage ? `${SITE_URL}${guide.heroBannerImage}` : `${SITE_URL}/logo-desktop.png`,
    ],
    publisher: {
      '@type': 'Organization',
      name: 'DryCheck India',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-header.png`,
      },
    },
    keywords: [...guide.primaryKeywords, ...guide.secondaryKeywords].join(', '),
  };

  // Structured Data: FAQPage (matching visible FAQs in the guide)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const relatedStateSlugs = getGuideRelatedStates(guide.slug);
  const relatedStates = relatedStateSlugs
    .map((s) => getStateBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 pt-2">
        {/* Breadcrumb Navigation matching JSON-LD BreadcrumbList */}
        <nav aria-label="Breadcrumb" className="my-2 flex items-center text-xs text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors min-h-[36px] flex items-center">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-1.5 text-neutral-600" />
          <Link href="/guides" className="hover:text-white transition-colors min-h-[36px] flex items-center">
            Guides
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-1.5 text-neutral-600" />
          <span className="text-amber-400 font-medium truncate max-w-[220px] sm:max-w-none">
            {guide.title}
          </span>
        </nav>
      </div>

      <AdSlot id={`guide-top-${guide.slug}`} />

      {/* Editorial Attribution & Freshness Metadata */}
      <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 text-xs text-neutral-400 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3 mb-4">
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors"
        >
          <span>Written by <strong className="text-neutral-300 font-medium">{EDITOR_NAME}</strong></span>
          <span className="text-neutral-600">&middot;</span>
          <span>Verified against state gazettes</span>
        </Link>
        <span className="text-[11px] font-mono text-neutral-500">
          Last reviewed {guide.lastReviewedDate}
        </span>
      </div>

      {/* Hero Banner (Featured Image or Dynamic Placeholder) */}
      <GuideHeroBanner guide={guide} imageSrc={guide.heroBannerImage} />

      {/* Primary Reciprocal State Link Banner */}
      {guide.stateSlug && guide.stateSlug !== 'all' && (
        <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 mb-6">
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-900 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400 mb-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>Live State Tracker &bull; {guide.stateName}</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                Checking today&apos;s real-time dry day status in {guide.stateName}?
              </h2>
              <p className="text-xs text-neutral-300 mt-1">
                View live IST status, today&apos;s theka open/closed timings, and official 30-day excise calendar for {guide.stateName}.
              </p>
            </div>
            <Link
              href={`/india/${guide.stateSlug}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs hover:bg-amber-300 transition-all shrink-0 min-h-[44px] shadow-sm hover:shadow-md"
            >
              <span>Check {guide.stateName} Today</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Render the detailed article */}
      {guide.slug === 'kerala-dry-days-2026' ? (
        <KeralaGuideArticle guide={guide} />
      ) : guide.slug === 'uttar-pradesh-dry-days-2026' ? (
        <UPGuideArticle guide={guide} />
      ) : guide.slug === 'delhi-dry-days-2026' ? (
        <DelhiGuideArticle guide={guide} />
      ) : guide.slug === 'maharashtra-dry-days-2026' ? (
        <MaharashtraGuideArticle guide={guide} />
      ) : guide.slug === 'karnataka-dry-days-2026' ? (
        <KarnatakaGuideArticle guide={guide} />
      ) : guide.slug === 'rajasthan-dry-days-2026' ? (
        <RajasthanGuideArticle guide={guide} />
      ) : guide.slug === 'dry-states-in-india-2026' ? (
        <DryStatesGuideArticle guide={guide} />
      ) : guide.slug === 'november-dry-days-2026' ? (
        <NovemberGuideArticle guide={guide} />
      ) : guide.slug === 'diwali-2026-dry-day' ? (
        <DiwaliGuideArticle guide={guide} />
      ) : guide.slug === 'west-bengal-dry-days-2026' ? (
        <WestBengalGuideArticle guide={guide} />
      ) : guide.slug === 'guru-nanak-jayanti-2026-dry-day' ? (
        <GuruNanakJayantiGuideArticle guide={guide} />
      ) : guide.slug === 'christmas-2026-dry-day' ? (
        <ChristmasGuideArticle guide={guide} />
      ) : guide.slug === 'new-year-2027-dry-day' ? (
        <NewYearGuideArticle guide={guide} />
      ) : guide.slug === 'goa-dry-days-and-liquor-rules' ? (
        <GoaLiquorGuideArticle guide={guide} />
      ) : guide.slug === 'punjab-dry-days-and-liquor-timings' ? (
        <PunjabGuideArticle guide={guide} />
      ) : (
        <div className="mx-auto w-full max-w-4xl px-4 py-8">
          <h1 className="text-2xl font-bold text-white">{guide.title}</h1>
          <p className="mt-4 text-neutral-300">{guide.excerpt}</p>
        </div>
      )}

      {/* Related State Trackers Section */}
      <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 my-8">
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 gap-2 mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>State Dry Day Trackers &amp; Theka Timings</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Compare official excise operating hours, dry day gazettes, and retail policies across states.
              </p>
            </div>
            <Link
              href="/states"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:underline min-h-[36px]"
            >
              <span>All 36 States Directory</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedStates.map((st) => {
              const timing = getStateExciseTimings(st.slug);
              return (
                <Link
                  key={st.slug}
                  href={`/india/${st.slug}`}
                  className="group p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/80 hover:border-amber-500/50 hover:bg-neutral-900 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-sm text-neutral-200 group-hover:text-amber-400 transition-colors">
                      {st.name}
                    </span>
                    {st.prohibition ? (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 shrink-0">
                        Prohibition
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 shrink-0">
                        {st.region}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1 truncate max-w-[170px]">
                      <Clock className="h-3 w-3 text-amber-500 shrink-0" />
                      <span className="truncate">{st.prohibition ? 'Closed permanently' : timing.retailHours}</span>
                    </span>
                    <span className="text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <AdSlot id={`guide-bottom-${guide.slug}`} />
    </>
  );
}
