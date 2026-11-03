import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPublishedGuides, getPublishedGuideBySlug } from '@/lib/guides';
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

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <AdSlot id={`guide-top-${guide.slug}`} />

      {/* Editorial Attribution */}
      <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 pt-2 text-xs text-neutral-400">
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors"
        >
          <span>Written by <strong className="text-neutral-300 font-medium">{EDITOR_NAME}</strong></span>
          <span className="text-neutral-600">&middot;</span>
          <span>Last reviewed {guide.lastReviewedDate}</span>
        </Link>
      </div>

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
      ) : (
        <div className="mx-auto w-full max-w-4xl px-4 py-8">
          <h1 className="text-2xl font-bold text-white">{guide.title}</h1>
          <p className="mt-4 text-neutral-300">{guide.excerpt}</p>
        </div>
      )}

      <AdSlot id={`guide-bottom-${guide.slug}`} />
    </>
  );
}
