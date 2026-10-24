import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  perPage: number;
  count: number;
  hrefForPage: (page: number) => string;
}

function pageNumbers(page: number, totalPages: number): number[] {
  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
  return [...pages]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);
}

export default function Pagination({ page, perPage, count, hrefForPage }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(count / perPage));
  if (totalPages <= 1 && count <= perPage) {
    if (count === 0) return null;
    return (
      <p className="mt-4 text-xs text-neutral-500" aria-live="polite">
        {count} record{count === 1 ? '' : 's'}
      </p>
    );
  }

  const linkClass =
    'inline-flex min-h-[40px] items-center rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50';
  const activeClass = 'border-amber-500/50 bg-amber-500/10 text-amber-300';
  const idleClass = 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:text-white';
  const disabledClass = 'border-neutral-800 bg-neutral-950 text-neutral-600 cursor-not-allowed';

  const from = (page - 1) * perPage + 1;
  const to = Math.min(count, page * perPage);

  return (
    <nav
      aria-label="Pagination"
      className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-xs text-neutral-500" aria-live="polite">
        Showing {from}–{to} of {count} record{count === 1 ? '' : 's'}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {page > 1 ? (
          <Link href={hrefForPage(page - 1)} className={cn(linkClass, idleClass)} rel="prev">
            ← Previous
          </Link>
        ) : (
          <span className={cn(linkClass, disabledClass)} aria-disabled="true">
            ← Previous
          </span>
        )}

        {pageNumbers(page, totalPages).map((p) =>
          p === page ? (
            <span key={p} className={cn(linkClass, activeClass)} aria-current="page">
              {p}
            </span>
          ) : (
            <Link key={p} href={hrefForPage(p)} className={cn(linkClass, idleClass)}>
              {p}
            </Link>
          )
        )}

        {page < totalPages ? (
          <Link href={hrefForPage(page + 1)} className={cn(linkClass, idleClass)} rel="next">
            Next →
          </Link>
        ) : (
          <span className={cn(linkClass, disabledClass)} aria-disabled="true">
            Next →
          </span>
        )}
      </div>
    </nav>
  );
}
