import Link from 'next/link';
import { getDeterministicFooterQuip, getTodayIST } from '@/lib/dryday';
import { Sparkles, ShieldAlert } from 'lucide-react';

export default function Footer() {
  const todayIST = getTodayIST();
  const { rhyme, tone } = getDeterministicFooterQuip(todayIST);

  return (
    <footer className="w-full border-t border-neutral-800/80 bg-neutral-950 mt-12 pb-12 pt-8 text-neutral-400">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Daily Quip */}
        <div className="mb-8 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
            <Sparkles className="h-3 w-3" />
            <span>DryCheck Daily Verse &bull; {tone}</span>
          </div>
          <blockquote className="mt-3 space-y-1 text-sm sm:text-base italic text-neutral-200 font-serif">
            {rhyme.map((line, idx) => (
              <p key={idx}>&ldquo;{line}&rdquo;</p>
            ))}
          </blockquote>
          <p className="mt-2 text-[11px] text-neutral-500">
            Fresh daily rhyme &bull; Deterministic for {todayIST} IST
          </p>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="mb-6 rounded-xl border border-neutral-800/70 bg-neutral-900/30 p-4 text-xs text-neutral-400 flex items-start gap-3">
          <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-neutral-200">Disclaimer:</strong> Information is compiled from official notifications and may change. Please verify with your state excise department before making plans. DryCheck India is an independent public-service website and does not endorse or promote the sale or consumption of alcohol.
          </p>
        </div>

        {/* Navigation & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800/60 pt-5 text-xs">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              Home
            </Link>
            <Link href="/about" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              About &amp; Excise Info
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              Contact / Corrections
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              Terms of Use
            </Link>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-400 text-center">
            <span>DryCheck India &bull; Asia/Kolkata (IST)</span>
            <span>&bull;</span>
            <span>&copy; 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
