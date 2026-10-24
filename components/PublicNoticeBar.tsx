'use client';

import { usePathname } from 'next/navigation';
import { Megaphone } from 'lucide-react';

import { NOTICE_SEVERITY_META } from '@/lib/admin/types';
import type { PublicNotice } from '@/lib/public-drydays';

/**
 * Published public notices (from public_notices, fetched server-side).
 *
 * - Never renders on admin routes (pathname check runs during SSR too, so
 *   there is no flash of notice on /admin/*).
 * - State-scoped notices only appear on their /india/<slug> page; global
 *   notices (state = null) appear everywhere else.
 */
export default function PublicNoticeBar({ notices }: { notices: PublicNotice[] }) {
  const pathname = usePathname();

  if (notices.length === 0) return null;
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;

  const stateSlug = pathname.startsWith('/india/')
    ? pathname.slice('/india/'.length).replace(/\/+$/, '')
    : null;

  const visible = notices.filter(
    (notice) => notice.state === null || (stateSlug !== null && notice.state === stateSlug)
  );
  if (visible.length === 0) return null;

  return (
    <section
      aria-label="Public notices"
      role="status"
      className="mx-auto w-full max-w-4xl px-3 sm:px-6 pt-3"
    >
      <ul className="space-y-2">
        {visible.map((notice) => {
          const meta = NOTICE_SEVERITY_META[notice.severity];
          return (
            <li
              key={notice.id}
              className={`rounded-xl border px-3 py-2.5 ${meta.badge}`}
            >
              <div className="flex items-start gap-2">
                <Megaphone className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold">{notice.title}</p>
                  <p className="text-xs opacity-90 mt-0.5 whitespace-pre-wrap break-words">
                    {notice.body}
                  </p>
                  <span className="mt-1 inline-block text-[10px] uppercase tracking-wider opacity-80">
                    {meta.label}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
