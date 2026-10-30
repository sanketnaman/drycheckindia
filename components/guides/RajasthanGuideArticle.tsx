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

interface RajasthanGuideArticleProps {
  guide: Guide;
}

export default function RajasthanGuideArticle({ guide }: RajasthanGuideArticleProps) {
  const tocItems = [
    { id: 'introduction', label: '1. Introduction: Is Today a Dry Day in Rajasthan?' },
    { id: 'eight-pm-rule', label: '2. The Strict 8:00 PM Theka Closing Rule' },
    { id: 'gazette-calendar', label: '3. Official Rajasthan 2026 Gazette Dry Days Calendar' },
    { id: 'cities-covered', label: '4. Cities Covered: Jaipur, Jodhpur, Udaipur, Kota & Beyond' },
    { id: 'mount-abu-pushkar', label: '5. Tourist & Sacred Towns: Mount Abu & Pushkar Rules' },
    { id: 'hotel-bar-timings', label: '6. Heritage Hotel Bar Timings vs Retail Theka Timings' },
    { id: 'drinking-age', label: '7. Minimum Legal Drinking Age (21) & Possession Limits' },
    { id: 'how-to-check', label: '8. How to Check Real-Time Rajasthan Dry-Day Status' },
    { id: 'faqs', label: '9. Frequently Asked Questions (FAQs)' },
    { id: 'official-sources', label: '10. Official Citations & Regulatory References' },
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
          Rajasthan Dry Days 2026
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
            State: Rajasthan
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
              Need Live Today/Tomorrow Status in Rajasthan?
            </h2>
            <p className="leading-relaxed text-amber-200/90">
              Agar aap check karna chahte hain ki <strong className="text-white">is today dry day in rajasthan</strong> ya fir{' '}
              <strong className="text-white">today wine shop open or not in rajasthan</strong>, hamara real-time tracker sabhi zilon ke liye live status track karta hai:{' '}
              <Link href="/india/rajasthan" className="underline font-semibold text-white hover:text-amber-300">
                Check Live Rajasthan Dry Day Today Tracker &rarr;
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
            <span>1. Introduction: Is Today a Dry Day in Rajasthan?</span>
          </h2>
          <p>
            Rajasthan me alcohol manufacturing, sale, aur theka licensing ko <strong className="text-white">Rajasthan Excise Department</strong> regulate
            karta hai under the <strong className="text-neutral-100">Rajasthan Excise Act, 1950</strong>.
          </p>
          <p>
            Chahe aap Jaipur (Pink City), Jodhpur (Blue City), Udaipur (City of Lakes), Kota, Bikaner, ya Mount Abu me hon,
            statewide gazette dry-day circulars aur retail operating rules sabhi shops par barabar apply hote hain.
          </p>
        </section>

        {/* Section 2: 8:00 PM Theka Rule */}
        <section id="eight-pm-rule" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Store className="h-5 w-5 text-amber-400" />
            <span>2. The Strict 8:00 PM Theka Closing Rule in Rajasthan</span>
          </h2>
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Why Retail Wine Shops Close Early in Rajasthan:
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Bharat ke adhiktam rajyon me theke raat 10:00 PM ya 10:30 PM tak khulte hain, lekin Rajasthan me saal 2008 se ek strict policy lagu hai:
              <strong className="text-white"> Sabhi retail theke (IMFL aur Desi sharab) theek raat 8:00 baje band ho jaate hain.</strong>
            </p>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Raat 8:00 PM ke baad retail store se alcohol bechna illegal hai aur dukaandar ka licence cancel ho sakta hai. Agar aap Jaipur, Jodhpur ya Udaipur me
              liquor purchase karna chahte hain, to shaam 8 baje se pehle theke pahunchna zaroori hai.
            </p>
          </div>
        </section>

        {/* Section 3: Gazette Calendar */}
        <section id="gazette-calendar" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>3. Official Rajasthan 2026 Gazette Dry Days Calendar</span>
          </h2>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300">
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Day</th>
                  <th className="p-3 font-semibold">Occasion / Observance</th>
                  <th className="p-3 font-semibold">Scope in Rajasthan</th>
                  <th className="p-3 font-semibold">Closure Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">26 January 2026</td>
                  <td className="p-3 text-neutral-300">Monday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Republic Day</strong></td>
                  <td className="p-3 text-neutral-300">Statewide (All Districts)</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      National Mandatory
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">30 January 2026</td>
                  <td className="p-3 text-neutral-300">Friday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Martyrs&apos; Day (Shaheed Diwas)</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Rajasthan</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Gazetted Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">31 March 2026</td>
                  <td className="p-3 text-neutral-300">Tuesday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Mahavir Jayanti</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Rajasthan</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Religious Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">15 August 2026</td>
                  <td className="p-3 text-neutral-300">Saturday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Independence Day</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Rajasthan</td>
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
                  <td className="p-3 text-neutral-300">Statewide Rajasthan</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      National Mandatory
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">20 October 2026</td>
                  <td className="p-3 text-neutral-300">Tuesday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Dussehra (Vijayadashami)</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Rajasthan</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Religious Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">08 November 2026</td>
                  <td className="p-3 text-neutral-300">Sunday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Diwali (Deepawali)</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Rajasthan</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory 24-Hour Dry Day
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Cities Covered */}
        <section id="cities-covered" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <MapPin className="h-5 w-5 text-amber-400" />
            <span>4. Cities Covered: Jaipur, Jodhpur, Udaipur, Kota &amp; Beyond</span>
          </h2>
          <p>
            Rajasthan ke excise niyam rajya ke sabhi pramukh shahron me barabar enforce hote hain:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {[
              'Jaipur',
              'Jodhpur',
              'Udaipur',
              'Kota',
              'Bikaner',
              'Ajmer',
              'Mount Abu',
              'Alwar',
              'Bhilwara',
              'Pushkar',
              'Bharatpur',
              'Sikar',
            ].map((city) => (
              <div
                key={city}
                className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-950 text-center text-xs text-neutral-200 font-medium"
              >
                {city}
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-400 pt-1">
            Chahe aap <strong className="text-neutral-200">is today dry day in jodhpur</strong> check karein ya <strong className="text-neutral-200">dry day in udaipur</strong>, status same gazette circular ke tahat operate hota hai.
          </p>
        </section>

        {/* Section 5: Mount Abu & Pushkar */}
        <section id="mount-abu-pushkar" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <span>5. Tourist &amp; Sacred Towns: Mount Abu &amp; Pushkar Rules</span>
          </h2>
          <p>
            Bohot se tourists ko lagta hai ki Mount Abu ek dry city hai, lekin ye sach nahi hai. Mount Abu me licensed wine shops khulti hain,
            lekin wahan bhi 8:00 PM closing niyam lagu hota hai. Iske alawa:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
            <li><strong className="text-white">Nakki Lake &amp; Sunset Point:</strong> Public areas me alcohol pina strictly prohibited hai. Pakde jane par heavy fine aur police case hota hai.</li>
            <li><strong className="text-white">Pushkar Holy Town:</strong> Pushkar me sacred Brahma Mandir aur Sarovar ke 500-metre radius me non-veg aur alcohol fully banned hai.</li>
          </ul>
        </section>

        {/* Section 6: Heritage Hotels vs Theka Timings */}
        <section id="hotel-bar-timings" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Beer className="h-5 w-5 text-amber-400" />
            <span>6. Heritage Hotel Bar Timings vs Retail Theka Timings</span>
          </h2>
          <p>
            Jabki retail theke raat 8:00 PM par band ho jaate hain, licensed heritage hotels, 4-star/5-star resorts, aur restaurant bars
            ko dining guests ke liye alcohol serve karne ki anumati <strong className="text-white font-mono">11:00 PM ya 12:00 Midnight</strong> tak hoti hai.
            Lekin official dry day ke din hotel bars bhi poori tarah band rehte hain.
          </p>
        </section>

        {/* Section 7: Drinking Age */}
        <section id="drinking-age" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>7. Minimum Legal Drinking Age (21) &amp; Possession Limits</span>
          </h2>
          <p>
            Rajasthan me minimum legal drinking age <strong className="text-white font-mono">21 years</strong> hai.
            Personal consumption ke liye ek vyakti bina permit ke maximum 12 bottles (750ml IMFL/beer) possess kar sakta hai.
          </p>
        </section>

        {/* Section 8: How to Check */}
        <section id="how-to-check" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>8. How to Check Real-Time Rajasthan Dry-Day Status</span>
          </h2>
          <p>
            Aap ek click me check kar sakte hain ki aaj ya kal Rajasthan me dry day hai ya nahi:{' '}
            <Link href="/india/rajasthan" className="text-amber-400 font-semibold underline hover:text-white">
              Check Rajasthan Live Status &rarr;
            </Link>
          </p>
        </section>

        {/* Section 9: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>9. Frequently Asked Questions (FAQs) &bull; Rajasthan</span>
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

        {/* Section 10: Official Sources */}
        <section id="official-sources" className="space-y-4 border-t border-neutral-800 pt-6">
          <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">
            10. Official Citations &amp; Regulatory References
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
