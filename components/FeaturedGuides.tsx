import Link from 'next/link';
import { BookOpen, ChevronRight, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { getPublishedGuides } from '@/lib/guides';

export default function FeaturedGuides() {
  const allGuides = getPublishedGuides();

  // Pick top priority guides for homepage showcase
  const prioritySlugs = [
    'guru-nanak-jayanti-2026-dry-day',
    'christmas-2026-dry-day',
    'new-year-2027-dry-day',
    'goa-dry-days-and-liquor-rules',
    'uttar-pradesh-dry-days-2026',
    'delhi-dry-days-2026',
    'maharashtra-dry-days-2026',
    'karnataka-dry-days-2026',
  ];

  const featured = prioritySlugs
    .map((slug) => allGuides.find((g) => g.slug === slug))
    .filter(Boolean);

  return (
    <section className="my-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6" id="featured-guides">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-2">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <span>Essential Regulatory &amp; Festival Guides</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Verified legal breakdowns of state excise rules, upcoming festival closures, and theka timings.
          </p>
        </div>
        <Link
          href="/guides"
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors self-start sm:self-auto min-h-[44px]"
        >
          <span>All 15 Guides</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {featured.map((guide) => {
          if (!guide) return null;
          const isUpcoming = guide.slug === 'guru-nanak-jayanti-2026-dry-day';
          const isHoliday = guide.slug === 'christmas-2026-dry-day' || guide.slug === 'new-year-2027-dry-day';

          return (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group p-4 rounded-xl border border-neutral-800 bg-neutral-950/80 hover:border-amber-500/50 hover:bg-neutral-900/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      isUpcoming
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 font-semibold'
                        : isHoliday
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                    }`}
                  >
                    {isUpcoming ? '⚡ Upcoming (24 Nov)' : isHoliday ? '🎄 Holiday Special' : guide.stateName}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {guide.readingTimeMinutes} min read
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-neutral-850 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="flex items-center gap-1 text-neutral-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-500/70" />
                  <span>Gazette Verified</span>
                </span>
                <span className="text-amber-400 font-medium group-hover:underline flex items-center gap-0.5">
                  Read &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-800/80 text-center">
        <Link
          href="/guides"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-xs font-semibold text-neutral-200 hover:text-white transition-colors w-full sm:w-auto min-h-[44px]"
        >
          <span>Explore All 15 In-Depth State &amp; Festival Guides</span>
          <ChevronRight className="h-4 w-4 text-amber-400" />
        </Link>
      </div>
    </section>
  );
}
