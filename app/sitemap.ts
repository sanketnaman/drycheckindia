import { MetadataRoute } from 'next';
import { getAllStates, dateToSlug, slugToDate, getTodayIST } from '@/lib/dryday';
import { getPublicEntries } from '@/lib/public-drydays';
import { getPublishedGuides } from '@/lib/guides';

const SITE_URL = 'https://drycheck.in';

// Revalidate hourly so /dry-days/<date> routes appear after new entries are published
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const todayIST = getTodayIST();

  // Static routes with verified content timestamps
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: '2026-11-23T00:00:00.000Z',
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/states`,
      lastModified: '2026-11-23T00:00:00.000Z',
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: '2026-11-23T00:00:00.000Z',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: '2026-11-16T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: '2026-11-16T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: '2026-11-16T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: '2026-11-16T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Published State & UT Guides with genuine editorial update dates
  const publishedGuides = getPublishedGuides();
  const guideRoutes: MetadataRoute.Sitemap = publishedGuides.map((guide) => {
    let guideLastMod = '2026-11-16T00:00:00.000Z';
    const parsed = Date.parse(guide.lastUpdatedDate);
    if (!Number.isNaN(parsed)) {
      guideLastMod = new Date(parsed).toISOString();
    }
    return {
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: guideLastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    };
  });

  // State routes: updated with comprehensive state-specific excise frameworks
  const states = getAllStates();
  const stateRoutes: MetadataRoute.Sitemap = states.map((state) => {
    return {
      url: `${SITE_URL}/india/${state.slug}`,
      lastModified: '2026-11-23T00:00:00.000Z',
      changeFrequency: 'weekly',
      priority: 0.9,
    };
  });

  // Date routes: only include current and upcoming active dates to prevent stale past-date indexing penalties
  const entries = await getPublicEntries();
  const dateMap = new Map<string, string | undefined>();
  for (const entry of entries) {
    const slug = dateToSlug(entry.date);
    if (!dateMap.has(slug)) {
      dateMap.set(slug, (entry as { updatedAt?: string }).updatedAt);
    }
  }

  const dateRoutes: MetadataRoute.Sitemap = Array.from(dateMap.entries())
    .filter(([dateSlug]) => {
      const dateStr = slugToDate(dateSlug);
      return dateStr ? dateStr >= todayIST : true;
    })
    .map(([dateSlug, lastUpdate]) => {
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
    });

  return [...staticRoutes, ...guideRoutes, ...stateRoutes, ...dateRoutes];
}
