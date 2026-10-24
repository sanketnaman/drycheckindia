'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { CalendarDays, LayoutDashboard, LogOut, Megaphone } from 'lucide-react';
import { signOutAction } from '@/app/admin/actions';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dry-days', label: 'Dry Days', icon: CalendarDays },
  { href: '/admin/notices', label: 'Notices', icon: Megaphone },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/admin') return pathname === '/admin';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminNav({ email }: { email: string | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = () => {
    setError(null);
    startTransition(async () => {
      try {
        await signOutAction();
        // If the action redirected, navigation is handled by Next.js.
      } catch {
        router.push('/admin/login');
      }
    });
  };

  return (
    <nav aria-label="Admin" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'inline-flex min-h-[44px] items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50',
                    active
                      ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300'
                      : 'border border-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <span
            className="truncate text-xs text-neutral-500"
            title={email ?? undefined}
          >
            {email ?? 'Signed in'}
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={pending}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {pending ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-xs text-rose-400">
          {error}
        </p>
      )}
    </nav>
  );
}
