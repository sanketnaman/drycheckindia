import { MetadataRoute } from 'next';
import { getAllStates, getAllEntries, dateToSlug } from '@/lib/dryday';

const SITE_URL = 'https://drycheck.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // State routes (all 36 states and union territories)
  const states = getAllStates();
  const stateRoutes: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${SITE_URL}/india/${state.slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Unique Date routes
  const entries = getAllEntries();
  const dateSet = new Set<string>();
  for (const entry of entries) {
    dateSet.add(dateToSlug(entry.date));
  }

  const dateRoutes: MetadataRoute.Sitemap = Array.from(dateSet).map((dateSlug) => ({
    url: `${SITE_URL}/dry-days/${dateSlug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...stateRoutes, ...dateRoutes];
}
