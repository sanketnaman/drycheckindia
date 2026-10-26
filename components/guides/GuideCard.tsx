import Link from 'next/link';
import { Guide } from '@/lib/guides';
import { Calendar, Clock, ChevronRight, FileText, Scale } from 'lucide-react';

interface GuideCardProps {
  guide: Guide;
  featured?: boolean;
}

export default function GuideCard({ guide, featured = false }: GuideCardProps) {
  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all ${
        featured
          ? 'border-amber-500/40 bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 p-6 sm:p-7 shadow-lg shadow-black/40 hover:border-amber-500/70'
          : 'border-neutral-800 bg-neutral-900/60 p-5 hover:border-neutral-700 hover:bg-neutral-900/90'
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Scale className="h-3 w-3" />
            {guide.stateName} &bull; {guide.region} India
          </span>
          {guide.isHistorical && (
            <span className="px-2 py-0.5 rounded-full font-mono text-[11px] bg-neutral-800 text-neutral-400 border border-neutral-700/60">
              Historical Reference
            </span>
          )}
          {featured && (
            <span className="px-2 py-0.5 rounded-full font-semibold text-[11px] bg-amber-500 text-neutral-950">
              Featured Analysis
            </span>
          )}
        </div>

        <h3
          className={`font-bold text-white group-hover:text-amber-400 transition-colors tracking-tight ${
            featured ? 'text-lg sm:text-xl md:text-2xl mb-2' : 'text-base sm:text-lg mb-2'
          }`}
        >
          <Link href={`/guides/${guide.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {guide.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3 mb-4">
          {guide.excerpt}
        </p>
      </div>

      <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Calendar className="h-3.5 w-3.5 text-neutral-500" />
            Updated {guide.lastUpdatedDate}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Clock className="h-3.5 w-3.5 text-neutral-500" />
            {guide.readingTimeMinutes} min read
          </span>
        </div>

        <span className="inline-flex items-center gap-1 font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform">
          Read Guide <ChevronRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}
