import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  title: 'Terms of Use & Disclaimer',
  description: 'Terms of service and excise legal disclaimers for DryCheck India.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: 'Terms of Use & Disclaimer | DryCheck India',
    siteName: 'DryCheck India',
    url: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-8">
      <div className="border-b border-neutral-800 pb-5 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Terms of Use</h1>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
          Last updated: October 2026 &bull; DryCheck India
        </p>
      </div>

      <div className="space-y-5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Important Regulatory Disclaimer:</strong> Information presented on DryCheck India is compiled from official state government notifications, gazette releases, and election commission orders. Excise policies and dry day declarations may change on short notice. Please verify with your local district magistrate or state excise department before making commercial or travel arrangements.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Informational Service Only</h2>
          <p>
            DryCheck India is strictly an informational and educational reference tool. We do not manufacture, sell, distribute, transport, or endorse alcoholic beverages in any jurisdiction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Accuracy and Liability Limitation</h2>
          <p>
            While we strive for prompt accuracy and regularly cross-reference state gazettes, we cannot warrant that all dry day entries are free from error or regional variation. Under no circumstances shall the creators or operators of DryCheck India be held liable for any damages, losses, or inconveniences arising from decisions made based on data displayed on this site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Statutory Prohibition Compliance</h2>
          <p>
            Users are required to obey all prevailing laws of their jurisdiction. In states enforcing total statutory prohibition (such as Gujarat, Bihar, and Nagaland; special restricted regimes apply in Mizoram and Lakshadweep — check local rules), the possession and consumption of alcohol without legal exemption is a punishable criminal offense.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Intellectual Property</h2>
          <p>
            The software, deterministic status calculation algorithms, user interface designs, editorial guides, and curated data structures are the property of DryCheck India and its contributors. Unauthorized scraping or automated commercial republication of compiled calendars without attribution is prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Advertising &amp; External Citations</h2>
          <p>
            DryCheck India is a free public utility supported by display advertising (such as Google AdSense) and voluntary reader support. External links to official state excise portals, Election Commission orders, and legal gazette PDFs are provided strictly for source verification; we do not control the availability or content of third-party government websites. For details on cookies and advertising preferences, see our{' '}
            <Link href="/privacy-policy" className="text-amber-400 hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">6. Age Responsibility &amp; Corrections</h2>
          <p>
            All excise timing, holiday, and possession information published on this site is intended solely as legal awareness for adults meeting their state&apos;s statutory minimum legal drinking age (which varies between 18, 21, and 25 years across Indian states). If you notice an outdated notice or wish to submit a verified District Magistrate order, please reach out via our{' '}
            <Link href="/contact" className="text-amber-400 hover:underline">
              Contact page
            </Link>.
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
