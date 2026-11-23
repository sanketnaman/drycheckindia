'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { STATE_DIRECTORY_FAQS, StateFaqItem } from '@/lib/state-matrix-data';

export default function StateDirectoryFaqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="mt-14 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 sm:p-7 backdrop-blur-sm">
      <div className="border-b border-neutral-800 pb-5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-2">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Frequently Asked Questions &bull; Excise &amp; Transit Rules</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Frequently Asked Questions on Indian State Liquor Laws &amp; Interstate Travel
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-3xl leading-relaxed">
          Authoritative answers to the most common questions regarding alcohol carrying limits across state borders,
          minimum drinking ages, DGCA domestic flight rules, and theka timings.
        </p>
      </div>

      <div className="mt-6 divide-y divide-neutral-800/80">
        {STATE_DIRECTORY_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left text-sm sm:text-base font-semibold text-neutral-200 hover:text-amber-400 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="pr-4">{faq.question}</span>
                <span className="shrink-0 text-neutral-400">
                  {isOpen ? <ChevronUp className="h-4 w-4 text-amber-400" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>
              {isOpen && (
                <div className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line pl-0.5">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
