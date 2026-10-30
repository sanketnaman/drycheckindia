import React from 'react';
import Link from 'next/link';
import { Guide } from '@/lib/guides';
import TableOfContents from '@/components/guides/TableOfContents';
import {
  Calendar,
  Clock,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  Scale,
  MapPin,
  HelpCircle,
  CheckCircle,
  Building2,
  BookOpen,
  ArrowRight,
  Store,
  Beer,
} from 'lucide-react';

interface MaharashtraGuideArticleProps {
  guide: Guide;
}

export default function MaharashtraGuideArticle({ guide }: MaharashtraGuideArticleProps) {
  const tocItems = [
    { id: 'introduction', label: '1. Introduction: Is Today or Tomorrow a Dry Day in Maharashtra?' },
    { id: 'gazette-calendar', label: '2. Complete Maharashtra 2026 Gazette Dry Days Calendar' },
    { id: 'kartiki-ekadashi', label: '3. Upcoming Focus: Kartiki Ekadashi (5 Nov 2026)' },
    { id: 'prohibition-districts', label: '4. Total Prohibition Districts: Wardha & Gadchiroli' },
    { id: 'operating-hours', label: '5. Standard Timings: Retail Wine Shops vs Permit Rooms & Bars' },
    { id: 'cities-covered', label: '6. Major Cities Covered: Mumbai, Pune, Nagpur, Nashik & Beyond' },
    { id: 'drinking-age-permits', label: '7. Legal Drinking Age (21/25) & Liquor Permit Rules' },
    { id: 'how-to-check', label: '8. How to Check Real-Time Maharashtra Status' },
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
          Maharashtra Dry Days 2026
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
            State: Maharashtra
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
              Checking Live Status for Mumbai, Pune or Across Maharashtra?
            </h2>
            <p className="leading-relaxed text-amber-200/90">
              Agar aap jan&apos;na chahte hain ki <strong className="text-white">tomorrow is dry day in maharashtra</strong> ya fir{' '}
              <strong className="text-white">dry day in mumbai today</strong>, hamara real-time tracker sabhi 36 zilon ke liye instant status provide karta hai:{' '}
              <Link href="/india/maharashtra" className="underline font-semibold text-white hover:text-amber-300">
                Check Live Maharashtra Dry Day Today Tracker &rarr;
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
            <span>1. Introduction: Is Today or Tomorrow a Dry Day in Maharashtra?</span>
          </h2>
          <p>
            Maharashtra me alcohol manufacturing, distribution, retail licensing, aur holiday closures ko{' '}
            <strong className="text-white">State Excise Department, Government of Maharashtra</strong> regulate karta hai.
            Ye niyam <strong className="text-neutral-100">Maharashtra Prohibition Act, 1949</strong> (pehle Bombay Prohibition Act) ke statutory framework par aadharit hain.
          </p>
          <p>
            Chahe aap Mumbai City, Mumbai Suburban, Pune, Nagpur, Nashik, Thane, Kalyan-Dombivli, Chhatrapati Sambhajinagar, ya Amravati me hon,
            statewide dry-day circulars sabhi licensed retail wine shops (FL-BR-II) aur permit room bars par ek samaan roop se lagu hote hain.
          </p>
          <p>
            Agar aap plan kar rahe hain ki <strong className="text-white">dry day tomorrow in maharashtra</strong> hoga ya nahi, to is guide me aapko
            pure saal 2026 ka official gazette calendar, Kartiki Ekadashi aur Ganpati Visarjan ke special closures, aur Wardha tatha Gadchiroli zilon ke
            permanent liquor ban ki poori jankari milegi.
          </p>
        </section>

        {/* Section 2: Gazette Calendar */}
        <section id="gazette-calendar" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>2. Complete Maharashtra 2026 Gazette Dry Days Calendar</span>
          </h2>
          <p>
            Maharashtra Excise Department ke statutory schedule ke anusaar, nimnlikhit tareekhon par statewide dry day enforce kiya jaata hai:
          </p>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300">
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Day</th>
                  <th className="p-3 font-semibold">Occasion / Observance</th>
                  <th className="p-3 font-semibold">Geographic Scope</th>
                  <th className="p-3 font-semibold">Closure Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">26 January 2026</td>
                  <td className="p-3 text-neutral-300">Monday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Republic Day</strong></td>
                  <td className="p-3 text-neutral-300">Statewide (All 36 Districts)</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      National Mandatory
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">30 January 2026</td>
                  <td className="p-3 text-neutral-300">Friday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Martyrs&apos; Day (Hutatma Din)</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Maharashtra</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      State Gazette Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">14 April 2026</td>
                  <td className="p-3 text-neutral-300">Tuesday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Dr. B.R. Ambedkar Jayanti</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Maharashtra</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Strict Statewide Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">01 May 2026</td>
                  <td className="p-3 text-neutral-300">Friday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Maharashtra Day &amp; International Labour Day</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Maharashtra</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      State Formation Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">25 July 2026</td>
                  <td className="p-3 text-neutral-300">Saturday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Ashadi Ekadashi (Pandharpur Yatra)</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Maharashtra</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Pilgrimage Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">15 August 2026</td>
                  <td className="p-3 text-neutral-300">Saturday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Independence Day</strong></td>
                  <td className="p-3 text-neutral-300">Statewide (All 36 Districts)</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      National Mandatory
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">25 September 2026</td>
                  <td className="p-3 text-neutral-300">Friday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Anant Chaturdashi (Ganesh Visarjan)</strong></td>
                  <td className="p-3 text-neutral-300">Mumbai, Pune, Thane &amp; Statewide</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory Immersion Closure
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">02 October 2026</td>
                  <td className="p-3 text-neutral-300">Friday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Mahatma Gandhi Jayanti</strong></td>
                  <td className="p-3 text-neutral-300">Statewide (All 36 Districts)</td>
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
                  <td className="p-3 text-neutral-300">Statewide Maharashtra</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Religious Festival Closure
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">05 November 2026</td>
                  <td className="p-3 text-neutral-300">Thursday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Kartiki Ekadashi</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Maharashtra</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory 24-Hour Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">24 November 2026</td>
                  <td className="p-3 text-neutral-300">Tuesday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Guru Nanak Jayanti</strong></td>
                  <td className="p-3 text-neutral-300">Statewide Maharashtra</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Religious Gazette Dry Day
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Upcoming Focus: Kartiki Ekadashi */}
        <section id="kartiki-ekadashi" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>3. Upcoming Focus: Kartiki Ekadashi (5 November 2026)</span>
          </h2>
          <p>
            Maharashtra me <strong className="text-white">5 November 2026</strong> ko Kartiki Ekadashi ke avasar par poore rajya me dry day
            declared hai. Pandharpur me Vitthal Mandir me lakho warkari is din darshan karne pahunchte hain.
          </p>
          <p>
            Is din Mumbai, Pune, Thane, Solapur, aur sabhi revenue divisions me subah se raat tak retail shops aur bars poori tarah band rahenge.
            Agar aap check kar rahe hain ki <strong className="text-white">tomorrow is dry day in maharashtra</strong> on November 4th/5th, to dhyan
            rahein ki 5th November ko alcohol sales prohibited rahegi.
          </p>
        </section>

        {/* Section 4: Prohibition Districts */}
        <section id="prohibition-districts" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <span>4. Total Prohibition Districts: Wardha &amp; Gadchiroli Explained</span>
          </h2>
          <p>
            Maharashtra ke 36 zilon me se 2 zilon me <strong className="text-white">complete statutory prohibition</strong> 365 din lagu rehti hai:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-4 space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-rose-400" />
                <span>Wardha District (Permanent Dry District)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Mahatma Gandhi ke Sevagram Ashram aur Acharya Vinoba Bhave ke Pavnar Ashram ki aitihasik dharohar ke roop me Wardha me
                1975 se sharab ki bikri, khareed aur consumption par poorn ban hai. Yahan koi theka ya bar operate nahi hota.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-4 space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-rose-400" />
                <span>Gadchiroli District (Tribal Welfare Ban)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                1992 se Gadchiroli me local tribal welfare, samajik suraksha aur naxal-prabhavit kshetro me public order banaye rakhne ke liye
                total prohibition enforce hai. Yahan illegal alcohol supply par kadi sazayein hain.
              </p>
            </div>
          </div>

          <p className="text-xs text-neutral-400 pt-1">
            <strong>Note on Chandrapur:</strong> Chandrapur ziley me 2015 me sharabbandi lagayi gayi thi, lekin May 2021 me Maharashtra State
            Cabinet ne ise lift kar diya tha. Isliye vartamaan me Chandrapur me licensed theke aur bars standard rajya excise rules ke tahat open rehte hain.
          </p>
        </section>

        {/* Section 5: Standard Operating Timings */}
        <section id="operating-hours" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Store className="h-5 w-5 text-amber-400" />
            <span>5. Standard Timings: Retail Wine Shops vs Permit Rooms &amp; Bars</span>
          </h2>
          <p>
            Maharashtra me dry days ke alawa normal days par dukaanon aur bars ke niyamit samay is prakaar hain:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Store className="h-4 w-4 text-amber-400" />
                <span>Retail Wine Shops (FL-BR-II)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong className="text-white font-mono">10:00 AM se 10:30 PM tak</strong>. Mumbai, Pune, Thane, aur Navi Mumbai me IMFL
                aur foreign liquor stores raat 10:30 baje tak open rehte hain (country liquor vends raat 10:00 baje close hote hain).
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Beer className="h-4 w-4 text-amber-400" />
                <span>Permit Rooms, Bars &amp; Pubs (FL-III)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong className="text-white font-mono">11:00 AM se 1:30 AM tak</strong>. Municipal Corporation aur police commissionerate ke
                permits ke anusaar commercial dining bars aur nightlife pubs der raat 1:30 AM tak liquor serve kar sakte hain.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Major Cities Covered */}
        <section id="cities-covered" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <MapPin className="h-4 w-4 text-amber-400" />
            <span>6. Major Cities Covered: Mumbai, Pune, Nagpur, Nashik &amp; Beyond</span>
          </h2>
          <p>
            Maharashtra ke official gazette orders rajya ke sabhi bade shahron aur revenue mandalon par lagu hote hain:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {[
              'Mumbai City',
              'Mumbai Suburban',
              'Pune',
              'Nagpur',
              'Nashik',
              'Thane',
              'Kalyan-Dombivli',
              'Navi Mumbai',
              'Chhatrapati Sambhajinagar',
              'Amravati',
              'Solapur',
              'Kolhapur',
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
            Chahe aap <strong className="text-neutral-200">dry day in mumbai</strong> search karein, ya <strong className="text-neutral-200">is tomorrow a dry day in nashik</strong>,
            har sheher me state excise orders barabar enforce kiye jaate hain.
          </p>
        </section>

        {/* Section 7: Legal Drinking Age & Permits */}
        <section id="drinking-age-permits" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>7. Legal Drinking Age (21/25) &amp; Liquor Permit Rules</span>
          </h2>
          <p>
            Maharashtra me alcohol consumption ke liye do alag-alag age tiers hain:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-300">
            <li><strong className="text-white">Mild Beer &amp; Wine:</strong> Minimum legal drinking age <strong className="text-amber-400">21 years</strong> hai.</li>
            <li><strong className="text-white">Hard Liquor / Spirits (Whisky, Rum, Vodka, Gin):</strong> Minimum legal drinking age <strong className="text-amber-400">25 years</strong> hai.</li>
            <li><strong className="text-white">Liquor Permit:</strong> Maharashtra Prohibition Act ke tahat technical taur par sharab khareedne aur peene ke liye state excise permit hona anivarya hota hai, jo daily ya annual basis par permit rooms dwara issue kiya ja sakta hai.</li>
          </ul>
        </section>

        {/* Section 8: How to Check */}
        <section id="how-to-check" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>8. How to Check Real-Time Maharashtra Status</span>
          </h2>
          <p>
            Agar aapko turant confirm karna hai ki <strong className="text-white">tomorrow dry day in maharashtra</strong> hai ya nahi,
            to hamare dedicated tracker par live status check karein:{' '}
            <Link href="/india/maharashtra" className="text-amber-400 font-semibold underline hover:text-white">
              Check Maharashtra Live Status &rarr;
            </Link>
          </p>
        </section>

        {/* Section 9: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>9. Frequently Asked Questions (FAQs) &bull; Maharashtra</span>
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
