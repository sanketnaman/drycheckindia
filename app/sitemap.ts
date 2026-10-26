import { MetadataRoute } from 'next';
import { getAllStates, dateToSlug, getTodayIST } from '@/lib/dryday';
import { getPublicEntries } from '@/lib/public-drydays';
import { getPublishedGuides } from '@/lib/guides';

const SITE_URL = 'https://drycheck.in';

// Revalidate hourly (same cadence as the pages) so /dry-days/<date> routes
// appear after new entries are published without a full redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const todayIST = getTodayIST();
  const todayIso = new Date(`${todayIST}T00:00:00.000Z`).toISOString();

  // Static routes with stable, authentic last revision dates
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: todayIso,
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: todayIso,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: '2026-10-26T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: '2026-10-26T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: '2026-10-26T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: '2026-10-26T00:00:00.000Z',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Published State & UT Guides
  const publishedGuides = getPublishedGuides();
  const guideRoutes: MetadataRoute.Sitemap = publishedGuides.map((guide) => {
    let guideLastMod = todayIso;
    const parsed = Date.parse(guide.lastUpdatedDate);
    if (!Number.isNaN(parsed)) {
      guideLastMod = new Date(parsed).toISOString();
    }
    return {
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: guideLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  // State routes (all 36 states and union territories)
  // Use state's lastVerified timestamp if valid, fallback to today's start of day
  const states = getAllStates();
  const stateRoutes: MetadataRoute.Sitemap = states.map((state) => {
    let stateLastMod = todayIso;
    if (state.lastVerified) {
      const parsed = Date.parse(state.lastVerified);
      if (!Number.isNaN(parsed)) {
        stateLastMod = new Date(parsed).toISOString();
      }
    }
    return {
      url: `${SITE_URL}/india/${state.slug}`,
      lastModified: stateLastMod,
      changeFrequency: 'daily',
      priority: 0.9,
    };
  });

  // Unique Date routes
  const entries = await getPublicEntries();
  const dateMap = new Map<string, string>();
  for (const entry of entries) {
    const slug = dateToSlug(entry.date);
    if (!dateMap.has(slug)) {
      dateMap.set(slug, entry.date);
    }
  }

  const dateRoutes: MetadataRoute.Sitemap = Array.from(dateMap.entries()).map(
    ([dateSlug, dryDate]) => {
      let dateLastMod = todayIso;
      const parsed = Date.parse(dryDate);
      if (!Number.isNaN(parsed)) {
        dateLastMod = new Date(parsed).toISOString();
      }
      return {
        url: `${SITE_URL}/dry-days/${dateSlug}`,
        lastModified: dateLastMod,
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    }
  );

  return [...staticRoutes, ...guideRoutes, ...stateRoutes, ...dateRoutes];
}
