'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { getGaMeasurementId } from '@/lib/ga4';

/**
 * Loads the Google Analytics 4 gtag.js script.
 *
 * The script is only rendered when a real Measurement ID is configured — when
 * the ID is missing or a placeholder, nothing is rendered and no network
 * request is made.
 *
 * The initial `page_view` is sent automatically by `config` (this matches the
 * standard gtag snippet). App Router client-side navigations are NOT seen by
 * gtag.js, so those are sent manually by `usePageViews` — which skips the
 * first render to avoid double-counting the initial view.
 *
 * Because SPA navigations are tracked manually, disable
 * "Page changes based on browser history events" in GA4
 * (Admin > Data streams > your stream > Enhanced measurement > Page views >
 * advanced settings) or every client-side navigation is counted twice.
 */
export default function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        data-orig-id={measurementId}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
