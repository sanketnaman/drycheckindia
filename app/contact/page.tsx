import { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  title: 'Contact DryCheck India | Support & Corrections',
  description:
    'Reach out to DryCheck India support for questions about dry-day dates, state-specific restrictions, corrections, or technical issues.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact DryCheck India | Support & Corrections',
    description:
      'Contact our support team for dry-day verification, corrections, or technical help.',
    url: `${SITE_URL}/contact`,
    siteName: 'DryCheck India',
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8">
      <div className="border-b border-neutral-800 pb-5 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Contact DryCheck
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
          Have a question, spotted an error, or want to suggest an improvement? Contact our support team.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Mail className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Get in Touch</h2>
            <p className="text-xs text-neutral-400">
              For questions about dry-day dates, state-specific restrictions, corrections, or technical issues, reach out to our support team.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
              Official Support Email
            </span>
            <a
              href="mailto:support@drycheck.in"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg px-3 py-1.5 transition-colors min-h-[36px] focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>support@drycheck.in</span>
            </a>
          </div>

          <a
            href="mailto:support@drycheck.in"
            className="block text-sm font-semibold text-white hover:text-amber-400 transition-colors underline underline-offset-2 decoration-amber-500/40 hover:decoration-amber-400"
          >
            support@drycheck.in
          </a>

          <p className="text-xs text-neutral-500">
            For accurate information, please mention the state and date relevant to your query.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
        <Link href="/" className="text-amber-400 hover:underline min-h-[44px] flex items-center">
          &larr; Back to Home
        </Link>
        <span className="text-neutral-500">DryCheck India Community Review</span>
      </div>
    </div>
  );
}
