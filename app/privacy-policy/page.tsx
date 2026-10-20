import { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  title: 'Privacy Policy | DryCheck India',
  description: 'Privacy policy for DryCheck India. We do not track personal identifying information.',
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

      <div className="space-y-5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
          <p>
            DryCheck India is built with privacy by default. We do not require account registration, login credentials, or personal tracking. When you access the website, standard anonymous server logs (such as request timestamps and general device headers) may be generated for reliability and performance monitoring.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Geolocation &amp; State Selection</h2>
          <p>
            State selections and searches are handled entirely client-side or through clean URL routes (e.g., <code>/india/maharashtra</code>). We do not record or store your precise GPS coordinates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Third-Party Services &amp; Advertisements</h2>
          <p>
            Any future non-intrusive display advertisements rendered via optional placeholders will strictly abide by standard publisher terms. Under no circumstances do we permit, integrate, or display alcohol affiliate links or alcohol delivery promotions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Cookies and Local Storage</h2>
          <p>
            We do not deploy marketing or intrusive tracking cookies. Minimal functional cookies may be used solely for session caching and rapid page rendering.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Changes to This Policy</h2>
          <p>
            We may occasionally update this Privacy Policy to reflect administrative or regulatory updates. Continued use of DryCheck India represents acceptance of any minor modifications.
          </p>
        </section>

        <div className="pt-5 border-t border-neutral-800 text-xs text-neutral-400">
          <Link href="/" className="text-amber-400 hover:underline min-h-[44px] inline-flex items-center">
            &larr; Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
