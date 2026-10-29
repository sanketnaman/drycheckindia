import { MetadataRoute } from 'next';
import { getAllStates, dateToSlug } from '@/lib/dryday';
import { getPublicEntries } from '@/lib/public-drydays';
import { getPublishedGuides } from '@/lib/guides';

const SITE_URL = 'https://drycheck.in';

// Revalidate hourly so /dry-days/<date> routes appear after new entries are published
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes without artificial new Date() timestamps
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/guides`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Published State & UT Guides with genuine editorial update dates
  const publishedGuides = getPublishedGuides();
  const guideRoutes: MetadataRoute.Sitemap = publishedGuides.map((guide) => {
    let guideLastMod: string | undefined;
    const parsed = Date.parse(guide.lastUpdatedDate);
    if (!Number.isNaN(parsed)) {
      guideLastMod = new Date(parsed).toISOString();
    }
    return {
      url: `${SITE_URL}/guides/${guide.slug}`,
      ...(guideLastMod ? { lastModified: guideLastMod } : {}),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  // State routes: set lastModified to state.lastVerified if exists, otherwise omit it
  const states = getAllStates();
  const stateRoutes: MetadataRoute.Sitemap = states.map((state) => {
    let stateLastMod: string | undefined;
    if (state.lastVerified) {
      const parsed = Date.parse(state.lastVerified);
      if (!Number.isNaN(parsed)) {
        stateLastMod = new Date(parsed).toISOString();
      }
    }
    return {
      url: `${SITE_URL}/india/${state.slug}`,
      ...(stateLastMod ? { lastModified: stateLastMod } : {}),
      changeFrequency: 'daily',
      priority: 0.9,
    };
  });

  // Date routes: set lastModified to the entry's last update time if stored, otherwise omit it
  const entries = await getPublicEntries();
  const dateMap = new Map<string, string | undefined>();
  for (const entry of entries) {
    const slug = dateToSlug(entry.date);
    if (!dateMap.has(slug)) {
      dateMap.set(slug, (entry as { updatedAt?: string }).updatedAt);
    }
  }

  const dateRoutes: MetadataRoute.Sitemap = Array.from(dateMap.entries()).map(
    ([dateSlug, lastUpdate]) => {
      let dateLastMod: string | undefined;
      if (lastUpdate) {
        const parsed = Date.parse(lastUpdate);
        if (!Number.isNaN(parsed)) {
          dateLastMod = new Date(parsed).toISOString();
        }
      }
      return {
        url: `${SITE_URL}/dry-days/${dateSlug}`,
        ...(dateLastMod ? { lastModified: dateLastMod } : {}),
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    }
  );

  return [...staticRoutes, ...guideRoutes, ...stateRoutes, ...dateRoutes];
}
