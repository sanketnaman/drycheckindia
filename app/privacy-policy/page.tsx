import { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  title: 'Privacy Policy | DryCheck India',
  description:
    'Privacy Policy for DryCheck India. Details on cookie usage, Google Analytics, Google AdSense advertising disclosures, and user rights.',
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy | DryCheck India',
    siteName: 'DryCheck India',
    url: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-8">
      <div className="border-b border-neutral-800 pb-5 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
          Last revised: October 2026 &bull; DryCheck India
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-neutral-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Overview &amp; Information We Collect</h2>
          <p>
            DryCheck India (accessible via <code>https://drycheck.in</code>) is an independent public information platform. We do not require visitors to register an account, provide names, phone numbers, or enter payment details.
          </p>
          <p>
            When you visit the site, standard non-identifying server logs (such as HTTP request headers, browser user agent, referring URL, and approximate timestamp) are automatically processed by our edge infrastructure (Cloudflare) strictly for routing, security, and caching.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Geolocation &amp; State Selection</h2>
          <p>
            State selections and searches are handled client-side or through clean URL routes (e.g., <code>/india/maharashtra</code>). We do not request, track, or store your precise GPS coordinates.
          </p>
          <p>
            If you use our location features, your approximate region (inferred from edge networking headers) is used ephemerally in component state to suggest your relevant state calendar. It is never written to permanent databases, user profiles, or tracking registries.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Cookies &amp; Tracking Technologies</h2>
          <p>
            Cookies are small text files stored on your device by your web browser. DryCheck India uses cookies and related technologies for the following specific purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-400">
            <li>
              <strong className="text-neutral-200">Essential / Functional:</strong> Lightweight state tokens used for caching, CDN load-balancing, and fast edge delivery.
            </li>
            <li>
              <strong className="text-neutral-200">Analytics:</strong> Measuring traffic patterns to optimize performance and content accuracy.
            </li>
            <li>
              <strong className="text-neutral-200">Advertising:</strong> Delivering contextual or personalized advertising via authorized third-party ad networks.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Google Analytics 4 (GA4)</h2>
          <p>
            We use Google Analytics 4 to collect aggregated, anonymized information about how visitors navigate the site. This service helps us understand popular state pages, technical errors, and peak usage hours.
          </p>
          <p>
            Google Analytics operates with IP anonymization enabled. It does not record personal identifying information. You may opt out of Google Analytics tracking across all websites by installing the official{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>
        </section>

        <section className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <h2 className="text-base font-bold text-white">5. Google AdSense &amp; Third-Party Advertising Disclosures</h2>
          <p>
            DryCheck India displays or may display non-intrusive advertisements served by third-party advertising partners, including Google AdSense. In compliance with Google Publisher Policies, please note:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li>
              <strong className="text-white">Third-Party Cookies:</strong> Third-party vendors, including Google, use cookies (such as the DoubleClick cookie) to serve ads based on a user&apos;s prior visits to this website or other websites on the Internet.
            </li>
            <li>
              <strong className="text-white">Personalized Advertising:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to DryCheck India and/or other sites across the web.
            </li>
            <li>
              <strong className="text-white">Opting Out of Personalized Ads:</strong> Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline"
              >
                Google Ads Settings
              </a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline"
              >
                aboutads.info
              </a>{' '}
              or the{' '}
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline"
              >
                Network Advertising Initiative Opt-Out Page
              </a>.
            </li>
            <li>
              <strong className="text-white">Strict Content Standard:</strong> DryCheck India strictly enforces a zero-alcohol commercial policy. We do not host, accept, or link to alcohol delivery affiliates, liquor sales, or commercial beverage sponsors.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">6. Data Protection Rights</h2>
          <p>
            Under applicable data protection laws, including the Indian Digital Personal Data Protection (DPDP) Act 2023, the European General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-400">
            <li>We do not sell, rent, or trade your personal data.</li>
            <li>You have the right to request information regarding any data collected about you.</li>
            <li>You have the right to disable non-essential cookies via your browser settings at any time.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">7. Children&apos;s Privacy</h2>
          <p>
            DryCheck India provides excise regulatory calendar information and does not solicit personal data from children under the age of 18. If you believe any minor data has been collected inadvertently, please contact us immediately for deletion.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">8. Policy Updates &amp; Contact Us</h2>
          <p>
            We may periodically update this policy to align with administrative, statutory, or technical standards. Updates take effect immediately upon posting to this page.
          </p>
          <p>
            For privacy inquiries or data rights requests, please contact our administrative team at:{' '}
            <a href="mailto:support@drycheck.in" className="text-amber-400 hover:underline font-mono">
              support@drycheck.in
            </a>.
          </p>
        </section>

        <div className="pt-5 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
          <Link href="/" className="text-amber-400 hover:underline min-h-[44px] inline-flex items-center">
            &larr; Return to Home
          </Link>
          <Link href="/terms" className="text-neutral-400 hover:text-white min-h-[44px] inline-flex items-center">
            Terms of Use &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
