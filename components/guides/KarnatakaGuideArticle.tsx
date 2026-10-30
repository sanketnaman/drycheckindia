import React from 'react';
import Link from 'next/link';
import { Guide } from '@/lib/guides';
import TableOfContents from '@/components/guides/TableOfContents';
import {
  Calendar,
  Clock,
  ExternalLink,
  ShieldAlert,
  Scale,
  MapPin,
  HelpCircle,
  CheckCircle,
  Building2,
  BookOpen,
  Store,
  Beer,
} from 'lucide-react';

interface KarnatakaGuideArticleProps {
  guide: Guide;
}

export default function KarnatakaGuideArticle({ guide }: KarnatakaGuideArticleProps) {
  const tocItems = [
    { id: 'introduction', label: '1. Introduction: Is Today a Dry Day in Karnataka?' },
    { id: 'rajyotsava-closure', label: '2. Kannada Rajyotsava (1 Nov 2026): Is Alcohol Banned?' },
    { id: 'gazette-calendar', label: '3. Official Karnataka 2026 Gazette Dry Days Calendar' },
    { id: 'operating-hours', label: '4. CL-2 Theka Hours vs Bengaluru Pub & Brewery Timings' },
    { id: 'cities-covered', label: '5. Major Karnataka Cities: Bengaluru, Mysuru, Hubli & Beyond' },
    { id: 'drinking-age', label: '6. Minimum Legal Drinking Age (21) & Possession Limits' },
    { id: 'how-to-check', label: '7. How to Check Real-Time Karnataka Dry-Day Status' },
    { id: 'faqs', label: '8. Frequently Asked Questions (FAQs)' },
    { id: 'official-sources', label: '9. Official Citations & Regulatory References' },
  ];

  return (
    <article className="mx-auto w-full max-w-4xl px-3 sm:px-6 pt-2 pb-16 text-neutral-200">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="my-2 flex flex-wrap items-center text-xs text-neutral-400">
        <Link href="/" className="hover:text-white transition-colors min-h-[36px] flex items-center">
          Home
        </Link>
        <span className="mx-2 text-neutral-600">/</span>
        <Link href="/guides" className="hover:text-white transition-colors min-h-[36px] flex items-center">
          Guides
        </Link>
        <span className="mx-2 text-neutral-600">/</span>
        <span className="text-amber-400 font-medium truncate max-w-[260px] sm:max-w-none">
          Karnataka Dry Days 2026
        </span>
      </nav>

      {/* Header section with H1 */}
      <header className="border-b border-neutral-800 pb-6 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Scale className="h-3.5 w-3.5" />
            Official State Excise Guide
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60">
            State: Karnataka
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
            Active 2026 Gazette
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {guide.h1Title}
        </h1>

        <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
          {guide.excerpt}
        </p>

        {/* Metadata bar */}
        <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-400 border-t border-neutral-800/80 pt-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-neutral-500" />
            <span>
              Published: <strong className="text-neutral-200">{guide.publishedDate}</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-neutral-500" />
            <span>
              Last Reviewed: <strong className="text-neutral-200">{guide.lastReviewedDate}</strong> (IST)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-neutral-500" />
            <span>{guide.readingTimeMinutes} min read</span>
          </div>
        </div>
      </header>

      {/* Real-time Status Quick Callout */}
      <div className="my-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 sm:p-5 text-amber-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm">
            <h2 className="text-sm sm:text-base font-bold text-amber-300">
              Looking for Today&apos;s or Tomorrow&apos;s Live Status in Karnataka?
            </h2>
            <p className="leading-relaxed text-amber-200/90">
              Agar aap check karna chahte hain ki <strong className="text-white">is nov 1 dry day in karnataka</strong> ya fir{' '}
              <strong className="text-white">bengaluru dry day today</strong>, hamara live tracker Karnataka ke sabhi 31 zilon ke liye current status verify karta hai:{' '}
              <Link href="/india/karnataka" className="underline font-semibold text-white hover:text-amber-300">
                Check Live Karnataka Dry Day Today Tracker &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents items={tocItems} />

      {/* Main Body Content */}
      <div className="space-y-10 text-xs sm:text-sm leading-relaxed text-neutral-300">

        {/* Section 1: Introduction */}
        <section id="introduction" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Scale className="h-5 w-5 text-amber-400" />
            <span>1. Introduction: Is Today a Dry Day in Karnataka?</span>
          </h2>
          <p>
            Karnataka me alcohol retail licensing, theke aur microbreweries ko{' '}
            <strong className="text-white">Karnataka State Excise Department</strong> regulate karta hai under the{' '}
            <strong className="text-neutral-100">Karnataka Excise Act, 1965</strong>.
          </p>
          <p>
            Chahe aap Bengaluru (India ki pub capital), Mysuru, Mangaluru, Hubballi-Dharwad ya Belagavi me hon,
            statewide dry-day orders aur retail licensing rules sabhi CL-2 shops aur CL-9 pubs par apply hote hain.
          </p>
        </section>

        {/* Section 2: Kannada Rajyotsava */}
        <section id="rajyotsava-closure" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>2. Kannada Rajyotsava (1 Nov 2026): Is Alcohol Banned in Karnataka?</span>
          </h2>
          <p>
            Har saal 1st November ko Karnataka Formation Day (Kannada Rajyotsava) ke avasar par lakho log Google par search karte hain ki{' '}
            <strong className="text-white">is nov 1 dry day in karnataka</strong>.
          </p>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/80 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              The Official 1 November Rule in Karnataka:
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              1 November poore rajya me ek gazetted state public holiday hai. Statewide standing excise policy me Rajyotsava permanent calendar dry day ke roop me listed nahi hai, lekin{' '}
              <strong className="text-white">Bengaluru Police Commissionerate aur District Deputy Commissioners</strong> ke paas public order banaye rakhne ke statutory powers hote hain.
              Bohot se saalon me Rajyotsava morning flag-hoisting aur grand state rallies ke dauran major municipal areas me retail thekas ko dopahar 2 PM ya poore din ke liye band rakhne ke local circulars issue kiye jaate hain.
            </p>
            <p className="text-xs text-neutral-400">
              Isliye 1 November ke exact timings ke liye hamesha{' '}
              <Link href="/india/karnataka" className="text-amber-400 underline font-medium hover:text-white">
                Live Karnataka Tracker
              </Link>{' '}
              par confirm karein.
            </p>
          </div>
        </section>

        {/* Section 3: Gazette Calendar */}
        <section id="gazette-calendar" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>3. Official Karnataka 2026 Gazette Dry Days Calendar</span>
          </h2>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300">
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Day</th>
                  <th className="p-3 font-semibold">Occasion / Observance</th>
                  <th className="p-3 font-semibold">Scope in Karnataka</th>
                  <th className="p-3 font-semibold">Closure Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">26 January 2026</td>
                  <td className="p-3 text-neutral-300">Monday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Republic Day</strong></td>
                  <td className="p-3 text-neutral-300">Statewide (All 31 Districts)</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      National Mandatory
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">31 March 2026</td>
                  <td className="p-3 text-neutral-300">Tuesday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Mahavir Jayanti</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Karnataka</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      State Gazette Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">15 August 2026</td>
                  <td className="p-3 text-neutral-300">Saturday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Independence Day</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Karnataka</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      National Mandatory
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">02 October 2026</td>
                  <td className="p-3 text-neutral-300">Friday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Mahatma Gandhi Jayanti</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Karnataka</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      National Mandatory
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">26 October 2026</td>
                  <td className="p-3 text-neutral-300">Monday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Maharishi Valmiki Jayanti</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Karnataka</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Religious Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">01 November 2026</td>
                  <td className="p-3 text-neutral-300">Sunday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Kannada Rajyotsava</strong></td>
                  <td className="p-3 text-neutral-300">State Holiday / DC Order Scope</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950 text-amber-300 border border-amber-800/60">
                      Local Police Directive
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Operating Hours */}
        <section id="operating-hours" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Store className="h-5 w-5 text-amber-400" />
            <span>4. CL-2 Theka Hours vs Bengaluru Pub &amp; Brewery Timings</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Store className="h-4 w-4 text-amber-400" />
                <span>CL-2 Retail Liquor Stores (MRP Outlets)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong className="text-white font-mono">10:00 AM se 10:30 PM tak</strong>. Karnataka me retail wine stores (CL-2) raat 10:30 PM tak khule rehte hain.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Beer className="h-4 w-4 text-amber-400" />
                <span>Bengaluru Pubs, Bars &amp; Microbreweries (CL-9 / CL-4)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong className="text-white font-mono">10:00 AM se 11:30 PM (Weekdays) / 1:00 AM (Weekends)</strong>. Indiranagar, Koramangala, MG Road aur Whitefield ke licensed establishments weekend par 1:00 AM tak serve karte hain.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Major Cities Covered */}
        <section id="cities-covered" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <MapPin className="h-5 w-5 text-amber-400" />
            <span>5. Major Karnataka Cities: Bengaluru, Mysuru, Hubli &amp; Beyond</span>
          </h2>
          <p>
            Karnataka state excise notifications rajya ke sabhi bade shahron me lagoo hoti hain:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {[
              'Bengaluru (Bangalore)',
              'Mysuru (Mysore)',
              'Mangaluru (Mangalore)',
              'Hubballi-Dharwad',
              'Belagavi',
              'Ballari',
              'Kalaburagi',
              'Udupi',
              'Shivamogga',
              'Davangere',
            ].map((city) => (
              <div
                key={city}
                className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-950 text-center text-xs text-neutral-200 font-medium"
              >
                {city}
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Drinking Age */}
        <section id="drinking-age" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>6. Minimum Legal Drinking Age (21) &amp; Possession Limits</span>
          </h2>
          <p>
            Karnataka me minimum legal drinking age <strong className="text-white font-mono">21 years</strong> hai.
            Personal consumption ke liye ek vyakti bina excise permit ke maximum 18.2 litres beer ya 4.6 litres IMFL possess kar sakta hai.
          </p>
        </section>

        {/* Section 7: How to Check */}
        <section id="how-to-check" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>7. How to Check Real-Time Karnataka Dry-Day Status</span>
          </h2>
          <p>
            Aap ek click me jaan sakte hain ki aaj ya kal Karnataka me dry day hai ya nahi:{' '}
            <Link href="/india/karnataka" className="text-amber-400 font-semibold underline hover:text-white">
              Check Karnataka Live Status &rarr;
            </Link>
          </p>
        </section>

        {/* Section 8: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>8. Frequently Asked Questions (FAQs) &bull; Karnataka</span>
          </h2>

          <div className="space-y-3">
            {guide.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-neutral-800/80 bg-neutral-950/70 p-4">
                <h3 className="text-xs sm:text-sm font-semibold text-neutral-100 flex items-center gap-2">
                  <span className="text-amber-400 font-mono">Q.</span>
                  {faq.question}
                </h3>
                <p className="mt-2 text-xs text-neutral-300 leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: Official Sources */}
        <section id="official-sources" className="space-y-4 border-t border-neutral-800 pt-6">
          <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">
            9. Official Citations &amp; Regulatory References
          </h2>
          <ul className="space-y-2">
            {guide.sources.map((src, idx) => (
              <li key={idx} className="text-xs text-neutral-400 flex items-start gap-2">
                <ExternalLink className="h-3.5 w-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline font-medium"
                  >
                    {src.title}
                  </a>
                  <span className="text-neutral-500 block text-[11px] mt-0.5">
                    Authority: {src.organization} &bull; {src.claimSupported}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </article>
  );
}
