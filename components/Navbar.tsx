'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { getAllStates, StateInfo } from '@/lib/dryday';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const states = useMemo(() => getAllStates(), []);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return states;
    const q = searchQuery.toLowerCase();
    return states.filter(
      (s) => s.name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q)
    );
  }, [states, searchQuery]);

  const handleSelectState = (slug: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    router.push(`/india/${slug}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-3 sm:px-6">
          {/* Top-left: On mobile, displays date ("20 October, Tuesday") as requested; on tablet/desktop shows brand + date */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 min-h-[44px] min-w-[44px] py-1 text-left group"
              aria-label="DryCheck India home"
            >
              <Image
                src="/logo-header.png"
                alt="DryCheck India"
                width={300}
                height={100}
                className="h-10 sm:h-12 w-auto object-contain"
                priority={false}
              />
            </Link>
          </div>

          {/* Top-Right: Menu / Search button with min 44px tap target */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-700 bg-neutral-900/90 text-xs font-semibold text-neutral-200 hover:text-white hover:border-amber-500/60 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Open state search and menu"
            >
              <Search className="h-4 w-4 text-amber-400" />
              <span className="font-medium">State / Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Searchable State Modal with instant mobile typing (e.g. typing "bih" shows Bihar) */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search and select Indian State or Union Territory"
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 backdrop-blur-sm p-3 pt-6 sm:pt-16"
        >
          <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <MapPin className="h-4 w-4 text-amber-400" />
                Select State / UT
              </div>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="flex items-center justify-center h-10 w-10 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors min-h-[44px] min-w-[44px]"
                aria-label="Close state picker"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Input - Auto focus, mobile ready */}
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type state (e.g. 'bih', 'delhi', 'goa')..."
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-9 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Instant Filtered States List */}
            <div className="mt-3 max-h-72 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {filteredStates.map((state: StateInfo) => (
                <button
                  key={state.slug}
                  onClick={() => handleSelectState(state.slug)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-left text-sm text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors group min-h-[44px]"
                >
                  <span className="font-semibold">{state.name}</span>
                  <div className="flex items-center gap-2">
                    {state.prohibition && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60">
                        Prohibition
                      </span>
                    )}
                    <span className="text-xs text-neutral-500 group-hover:text-neutral-400">
                      {state.region}
                    </span>
                  </div>
                </button>
              ))}

              {filteredStates.length === 0 && (
                <div className="py-8 text-center text-xs text-neutral-400">
                  No state found matching &ldquo;{searchQuery}&rdquo;.
                </div>
              )}
            </div>

            {/* Quick Navigation Footer */}
            <div className="mt-3 pt-3 border-t border-neutral-800 flex flex-wrap justify-between items-center text-xs text-neutral-400 gap-2">
              <div className="flex items-center gap-3">
                <Link
                  href="/guides"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-neutral-300 hover:text-white min-h-[44px] flex items-center font-medium"
                >
                  State Guides
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-neutral-300 hover:text-white min-h-[44px] flex items-center"
                >
                  About &amp; Excise Info
                </Link>
              </div>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  router.push('/');
                }}
                className="text-amber-400 hover:underline min-h-[44px] flex items-center font-medium"
              >
                All India Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
