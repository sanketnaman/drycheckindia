'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getGaMeasurementId } from '@/lib/ga4';

/**
 * Sends a GA4 `page_view` event on every App Router client-side navigation.
 *
 * Why this exists: gtag.js does not observe `history.pushState`, so SPA route
 * changes would otherwise never be recorded. The initial page load is NOT
 * sent from here — `GoogleAnalytics` lets `gtag('config', ...)` send it — so
 * the first render is skipped to avoid a duplicate.
 *
 * Note: this must be paired with disabling
 * "Page changes based on browser history events" in the GA4 enhanced
 * measurement settings, otherwise GA4 sends its own `page_view` on every
 * navigation and each view is counted twice.
 *
 * Tracking is a no-op when no real Measurement ID is configured.
 */
export default function usePageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lastUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const measurementId = getGaMeasurementId();
    if (!measurementId) return;

    const url =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // First run = initial page load, already counted by gtag('config').
    if (lastUrlRef.current === null) {
      lastUrlRef.current = url;
      return;
    }
    if (lastUrlRef.current === url) return;
    lastUrlRef.current = url;

    // gtag may not be defined yet if the script hasn't loaded.
    const w = window as Window & typeof globalThis & {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };
    if (typeof w.gtag !== 'function') return;

    w.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.origin + url,
      page_title: document.title,
    });
  }, [pathname, searchParams]);
}
