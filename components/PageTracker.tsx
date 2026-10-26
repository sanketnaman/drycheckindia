'use client';

import usePageViews from '@/hooks/use-page-views';

/**
 * Client-side page-view tracker for GA4.
 *
 * Mounted once in the root layout so every App Router client-side navigation
 * fires exactly one page-view event. It is a no-op when GA4 is not configured.
 */
export default function PageTracker() {
  usePageViews();
  return null;
}
