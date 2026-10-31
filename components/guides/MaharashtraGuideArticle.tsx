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
              If you need to verify whether <strong className="text-white">&ldquo;tomorrow is dry day in maharashtra&rdquo;</strong> or check{' '}
              <strong className="text-white">&ldquo;dry day in mumbai today&rdquo;</strong>, our real-time engine monitors official gazette notifications across all 36 districts:{' '}
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
            In Maharashtra, alcoholic beverage manufacturing, wholesale distribution, retail licensing, and statutory holiday closures are administered by the{' '}
            <strong className="text-white">State Excise Department, Government of Maharashtra</strong>.
            These regulations are rooted in the statutory framework of the <strong className="text-neutral-100">Maharashtra Prohibition Act, 1949</strong> (formerly the Bombay Prohibition Act).
          </p>
          <p>
            Whether you reside in Mumbai City, Mumbai Suburban, Pune, Nagpur, Nashik, Thane, Kalyan-Dombivli, Chhatrapati Sambhajinagar, or Amravati,
            statewide gazetted dry-day orders apply uniformly across all licensed retail wine shops (FL-BR-II) and permit rooms/bars (FL-III).
          </p>
          <p>
            If you are planning around whether <strong className="text-white">&ldquo;dry day tomorrow in maharashtra&rdquo;</strong> will take effect, this guide provides the complete 2026 gazette calendar, key religious observances including Kartiki Ekadashi and Ganesh Visarjan, and the total statutory prohibition enforcement in Wardha and Gadchiroli districts.
          </p>
        </section>

        {/* Section 2: Gazette Calendar */}
        <section id="gazette-calendar" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>2. Complete Maharashtra 2026 Gazette Dry Days Calendar</span>
          </h2>
          <p>
            Under the statutory notifications of the Maharashtra Excise Department, alcohol sales are strictly prohibited statewide on the following dates:
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
            In Maharashtra, <strong className="text-white">5 November 2026</strong> marks a gazetted statewide dry day on the sacred observance of Kartiki Ekadashi. Hundreds of thousands of Warkari pilgrims assemble at the revered Vitthal-Rukmini Temple in Pandharpur.
          </p>
          <p>
            On this date, retail liquor shops and commercial bars across Mumbai, Pune, Thane, Solapur, and all regional revenue divisions remain completely closed for 24 hours. If you are checking whether <strong className="text-white">&ldquo;tomorrow is dry day in maharashtra&rdquo;</strong> around early November, note that alcohol vending and service are strictly banned on 5 November.
          </p>
        </section>

        {/* Section 4: Prohibition Districts */}
        <section id="prohibition-districts" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <span>4. Total Prohibition Districts: Wardha &amp; Gadchiroli Explained</span>
          </h2>
          <p>
            Out of Maharashtra&apos;s 36 administrative districts, 2 districts enforce <strong className="text-white">complete statutory prohibition</strong> 365 days a year:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-4 space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-rose-400" />
                <span>Wardha District (Permanent Dry District)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                To honor the historical heritage of Mahatma Gandhi&apos;s Sevagram Ashram and Acharya Vinoba Bhave&apos;s Pavnar Ashram, a complete prohibition on the sale, purchase, and consumption of alcohol has been in force in Wardha since 1975. No commercial liquor stores or bars operate here.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-4 space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-rose-400" />
                <span>Gadchiroli District (Tribal Welfare Ban)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Total statutory prohibition has been enforced in Gadchiroli since 1992 to support tribal community welfare, protect local socioeconomic health, and maintain public order. Stringent penal consequences apply to illicit liquor trafficking.
              </p>
            </div>
          </div>

          <p className="text-xs text-neutral-400 pt-1">
            <strong>Note on Chandrapur:</strong> Complete prohibition was instituted in Chandrapur district in 2015 but subsequently revoked by the Maharashtra State Cabinet in May 2021. Licensed retail outlets and bars in Chandrapur currently operate under regular state excise regulations.
          </p>
        </section>

        {/* Section 5: Standard Operating Timings */}
        <section id="operating-hours" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Store className="h-5 w-5 text-amber-400" />
            <span>5. Standard Timings: Retail Wine Shops vs Permit Rooms &amp; Bars</span>
          </h2>
          <p>
            Outside of notified dry days, standard legal operational hours across Maharashtra are governed as follows:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Store className="h-4 w-4 text-amber-400" />
                <span>Retail Wine Shops (FL-BR-II)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong className="text-white font-mono">10:00 AM to 10:30 PM</strong>. In Mumbai, Pune, Thane, and Navi Mumbai, licensed retail wine stores selling IMFL and imported spirits remain open until 10:30 PM (country liquor outlets close at 10:00 PM).
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Beer className="h-4 w-4 text-amber-400" />
                <span>Permit Rooms, Bars &amp; Pubs (FL-III)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong className="text-white font-mono">11:00 AM to 1:30 AM</strong>. Under standard municipal corporation and police commissionerate permissions, commercial dining establishments, permit rooms, and nightlife venues are permitted to serve liquor until 1:30 AM.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Major Cities Covered */}
        <section id="cities-covered" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <MapPin className="h-5 w-5 text-amber-400" />
            <span>6. Major Cities Covered: Mumbai, Pune, Nagpur, Nashik &amp; Beyond</span>
          </h2>
          <p>
            Maharashtra&apos;s official gazette orders and excise regulations apply across all municipal corporations and administrative districts:
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
            Whether consumers search for <strong className="text-neutral-200">&ldquo;dry day in mumbai&rdquo;</strong> or query <strong className="text-neutral-200">&ldquo;is tomorrow a dry day in nashik&rdquo;</strong>, state excise notifications are enforced uniformly across every municipality.
          </p>
        </section>

        {/* Section 7: Legal Drinking Age & Permits */}
        <section id="drinking-age-permits" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>7. Legal Drinking Age (21/25) &amp; Liquor Permit Rules</span>
          </h2>
          <p>
            Maharashtra enforces a dual-tier legal drinking age structure:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-300">
            <li><strong className="text-white">Mild Beer &amp; Wine:</strong> Minimum legal drinking age is <strong className="text-amber-400">21 years</strong>.</li>
            <li><strong className="text-white">Hard Liquor / Spirits (Whisky, Rum, Vodka, Gin):</strong> Minimum legal drinking age is <strong className="text-amber-400">25 years</strong>.</li>
            <li><strong className="text-white">Liquor Permit Requirement:</strong> Under the Maharashtra Prohibition Act, individuals purchasing or consuming alcohol are technically required to hold a valid liquor consumption permit, obtainable digitally or through licensed permit rooms.</li>
          </ul>
        </section>

        {/* Section 8: How to Check */}
        <section id="how-to-check" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>8. How to Check Real-Time Maharashtra Status</span>
          </h2>
          <p>
            To verify whether <strong className="text-white">&ldquo;tomorrow dry day in maharashtra&rdquo;</strong> or check today&apos;s real-time legal status, visit our dedicated tracker:{' '}
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