import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedGuides, getPublishedGuideBySlug } from '@/lib/guides';
import KeralaGuideArticle from '@/components/guides/KeralaGuideArticle';
import UPGuideArticle from '@/components/guides/UPGuideArticle';
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
      title: 'Guide Not Found | DryCheck India',
    };
  }

  const canonicalUrl = `${SITE_URL}/guides/${guide.slug}`;

  return {
    title: guide.seoTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.seoTitle,
      description: guide.metaDescription,
      url: canonicalUrl,
      type: 'article',
      siteName: 'DryCheck India',
      publishedTime: `${guide.publishedDate}T08:00:00+05:30`,
      modifiedTime: `${guide.lastUpdatedDate}T12:00:00+05:30`,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.seoTitle,
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
      '@type': 'Organization',
      name: 'DryCheck India Editorial Team',
      url: SITE_URL,
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

      {/* Render the detailed article */}
      {guide.slug === 'kerala-dry-days-2026' ? (
        <KeralaGuideArticle guide={guide} />
      ) : guide.slug === 'uttar-pradesh-dry-days-2026' ? (
        <UPGuideArticle guide={guide} />
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
