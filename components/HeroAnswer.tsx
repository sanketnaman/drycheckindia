'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { formatDateDisplay } from '@/lib/dryday';
import { AlertCircle, CheckCircle2, HelpCircle, MapPin } from 'lucide-react';

interface HeroAnswerProps {
  headline?: string;
  answer: 'Yes' | 'No' | 'Maybe' | 'Always';
  statusType: 'dry' | 'not_dry' | 'maybe';
  secondaryLine: string;
  todayDateIST: string;
  tomorrowDateIST: string;
  contextTitle?: string;
  prohibitionNote?: string;
  stateSlug?: string;
  onOpenStateMenu?: () => void;
}

export default function HeroAnswer({
  headline = 'Is today a dry day?',
  answer,
  statusType,
  secondaryLine,
  todayDateIST,
  tomorrowDateIST,
  contextTitle = 'Across India',
  prohibitionNote,
  stateSlug,
  onOpenStateMenu,
}: HeroAnswerProps) {
  // "20 October, Tuesday"
  const formattedTodayShort = useMemo(
    () => formatDateDisplay(todayDateIST, { shortFormat: true }),
    [todayDateIST]
  );

  const styleConfig = {
    dry: {
      color: 'text-rose-400',
      border: 'border-rose-500/40',
      bgGlow: 'bg-rose-500/10 shadow-[0_0_24px_rgba(244,63,94,0.15)]',
      badgeBg: 'bg-rose-950/80 border-rose-700/60 text-rose-300',
      subtext: 'Shops & bars closed by excise directive',
      icon: AlertCircle,
    },
    not_dry: {
      color: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bgGlow: 'bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.15)]',
      badgeBg: 'bg-emerald-950/80 border-emerald-700/60 text-emerald-300',
      subtext: 'Normal retail trading hours apply',
      icon: CheckCircle2,
    },
    maybe: {
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bgGlow: 'bg-amber-500/10 shadow-[0_0_24px_rgba(245,158,11,0.15)]',
      badgeBg: 'bg-amber-950/80 border-amber-700/60 text-amber-300',
      subtext: 'Official confirmation awaited or state-dependent',
      icon: HelpCircle,
    },
  }[statusType];

  const StatusIcon = styleConfig.icon;

  return (
    <section
      aria-label="Dry Day Status Today"
      className="relative w-full pt-1 pb-4 flex flex-col items-center text-center justify-start"
    >
      {/* Top Bar: Date ('20 October, Tuesday') on the top-left, Menu/State button on top-right, both with 44px tap targets */}
      <div className="w-full flex items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 min-h-[44px]">
          <span className="text-amber-400 font-mono text-[11px] uppercase">IST</span>
          <span className="text-white font-medium">{formattedTodayShort}</span>
        </div>

        <Link
          href="#state-directory"
          className="flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 rounded-xl px-3 py-2 transition-colors min-h-[44px]"
        >
          <MapPin className="h-3.5 w-3.5 text-amber-400" />
          <span className="truncate max-w-[130px] sm:max-w-none">{contextTitle}</span>
        </Link>
      </div>

      {/* 1. Giant Headline (Tightly stacked, no extra empty gap) */}
      <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-200 mt-1 mb-1">
        {headline}
      </h1>

      {/* 2. Big Yes / No / Maybe Answer Card (Answer text >= 96px, 100% visible on 360x640) */}
      <div
        className={`w-full max-w-sm sm:max-w-md my-1.5 rounded-3xl border ${styleConfig.border} ${styleConfig.bgGlow} p-4 sm:p-6 transition-all`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <span
              className={`text-[96px] sm:text-[112px] md:text-[124px] font-black tracking-tight leading-none ${styleConfig.color} select-none`}
            >
              {answer}
            </span>
          </div>

          <div
            className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold ${styleConfig.badgeBg}`}
          >
            <StatusIcon className="h-3.5 w-3.5 shrink-0" />
            <span>{styleConfig.subtext}</span>
          </div>

          {prohibitionNote && (
            <p className="mt-4 text-xs text-rose-300 max-w-xs leading-relaxed bg-rose-950/40 p-2 rounded-xl border border-rose-900/40">
              {prohibitionNote}
            </p>
          )}
        </div>
      </div>

      {/* 3. Small Secondary Line (At least 20px on mobile as required) */}
      <div className="mt-2 max-w-lg px-2">
        <p className="text-[20px] sm:text-[22px] font-semibold text-neutral-100 tracking-tight leading-snug">
          {secondaryLine}
        </p>
      </div>
    </section>
  );
}
