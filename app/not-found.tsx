import Link from 'next/link';
import { Wine, MapPin, BookOpen, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-16 text-center text-neutral-200">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-4">
        <Wine className="h-3.5 w-3.5" />
        <span>404 &bull; Page Not Found</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        Ye Page Nahi Mila (Page Not Found)
      </h1>

      <p className="mt-3 text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
        Aap jis URL ko dhoondh rahe hain wo move ho chuka hai ya exist nahi karta. Aaj ka real-time theka aur dry-day status check karne ke liye neeche diye gaye links use karein:
      </p>

      {/* Helpful Action Links */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        <Link
          href="/"
          className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/40 hover:bg-neutral-900 transition-colors block group"
        >
          <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm group-hover:text-amber-400">
            <Search className="h-4 w-4 text-amber-400" />
            <span>Today Live Status</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Check whether today or tomorrow is a dry day across India.
          </p>
        </Link>

        <Link
          href="/states"
          className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/40 hover:bg-neutral-900 transition-colors block group"
        >
          <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm group-hover:text-amber-400">
            <MapPin className="h-4 w-4 text-amber-400" />
            <span>All 36 States &amp; UTs</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Find theka timings and excise rules for your state.
          </p>
        </Link>

        <Link
          href="/guides"
          className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/40 hover:bg-neutral-900 transition-colors block group"
        >
          <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm group-hover:text-amber-400">
            <BookOpen className="h-4 w-4 text-amber-400" />
            <span>Editorial Guides</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            In-depth legal gazette analysis and festival calendars.
          </p>
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-neutral-800/80">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline min-h-[44px]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Homepage Overview</span>
        </Link>
      </div>
    </div>
  );
}
