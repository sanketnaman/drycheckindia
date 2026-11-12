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
    { id: 'introduction', label: '1. Introduction & Statutory Context' },
    { id: 'rajyotsava-closure', label: '2. Kannada Rajyotsava (1 Nov 2026) Rules' },
    { id: 'gazette-calendar', label: '3. Official Karnataka 2026 Gazette Dry Days Calendar' },
    { id: 'operating-hours', label: '4. CL-2, CL-4, CL-7 & CL-9 Timings & Dry-Day Scope' },
    { id: 'statutory-enforcement', label: '5. Karnataka Excise Act, 1965 & Border Transit Rules' },
    { id: 'cities-covered', label: '6. Major Karnataka Cities: Bengaluru, Mysuru, Hubli & Beyond' },
    { id: 'drinking-age', label: '7. Minimum Legal Drinking Age (21) & Possession Limits' },
    { id: 'how-to-check', label: '8. How to Verify Real-Time Karnataka Dry-Day Status' },
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
              Need to check whether today or 1 November is a dry day in Bengaluru or elsewhere in Karnataka? Our real-time tracking engine monitors standing gazette notifications and district excise circulars across all 31 Karnataka districts in Indian Standard Time (IST):{' '}
              <Link href="/india/karnataka" className="underline font-semibold text-white hover:text-amber-300">
                Check Live Karnataka Dry Day Tracker &rarr;
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
            <span>1. Introduction &amp; Statutory Context</span>
          </h2>
          <p>
            In Karnataka, retail liquor licensing, retail outlets (thekas), and microbreweries are administered by the{' '}
            <strong className="text-white">Karnataka State Excise Department</strong> under the statutory provisions of the{' '}
            <strong className="text-neutral-100">Karnataka Excise Act, 1965</strong>.
          </p>
          <p>
            Whether you are located in Bengaluru (celebrated as India&apos;s pub capital), Mysuru, Mangaluru, Hubballi-Dharwad, or Belagavi,
            statewide gazetted dry-day notifications and licensing rules apply across all CL-2 retail wine stores and CL-9 pub establishments.
          </p>
        </section>

        {/* Section 2: Kannada Rajyotsava */}
        <section id="rajyotsava-closure" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>2. Kannada Rajyotsava (1 Nov 2026): Is Alcohol Banned in Karnataka?</span>
          </h2>
          <p>
            Every year on 1 November, marking Karnataka Formation Day (Kannada Rajyotsava), residents and hospitality venues verify whether statewide retail liquor stores (MRP outlets), microbreweries, and pubs remain open or face localized closures.
          </p>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/80 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              The Official 1 November Rule in Karnataka:
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              1 November is observed as a gazetted state public holiday across Karnataka. Under standard statewide standing excise regulations, Kannada Rajyotsava is not classified as an automatic, permanent calendar dry day. However, the{' '}
              <strong className="text-white">Bengaluru City Police Commissionerate and District Deputy Commissioners</strong> hold statutory powers under the Karnataka Excise Act and CrPC to preserve public order.
              During major state formation rallies, government processions, and flag-hoisting gatherings, district authorities frequently issue localized circulars mandating retail thekas and bars to close until 2:00 PM or for the full calendar day in high-density urban areas.
            </p>
            <p className="text-xs text-neutral-400">
              For confirmed real-time timings on 1 November, always refer to our{' '}
              <Link href="/india/karnataka" className="text-amber-400 underline font-medium hover:text-white">
                Live Karnataka Tracker
              </Link>{' '}
              for localized district notifications.
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
            <span>4. CL-2, CL-4, CL-7 &amp; CL-9 Timings &amp; Dry-Day Scope</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Store className="h-4 w-4 text-amber-400" />
                <span>CL-2 Retail Liquor Stores (MRP Outlets)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong className="text-white font-mono">10:00 AM to 10:30 PM</strong>. In Karnataka, licensed retail liquor shops (CL-2) operate until 10:30 PM. Selling or dispensing alcohol past 10:30 PM is strictly prohibited under Karnataka Excise Rules, and CL-2 outlets always shut completely on notified dry days.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Beer className="h-4 w-4 text-amber-400" />
                <span>Bengaluru Pubs, Bars &amp; Microbreweries (CL-9 / CL-4 / CL-7)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong className="text-white font-mono">10:00 AM to 11:30 PM (Weekdays) / 1:00 AM (Weekends)</strong>. Licensed CL-9 bars, craft microbreweries, and pubs in Indiranagar, Koramangala, MG Road, and Whitefield serve until 11:30 PM on weekdays, with weekend extensions up to 1:00 AM under Bengaluru City Police orders. Private clubs (CL-4) and star hotels (CL-7) also suspend liquor service on mandatory national, gazette, and election dry days.
              </p>
            </div>
          </div>
          <p className="text-xs text-neutral-400">
            Note on <strong className="text-neutral-200">CL-7 Lodging Houses &amp; Luxury Hotels</strong>: Even five-star hotels holding CL-7 licences cannot operate public bar counters during statutory dry days or Section 135C polling curfews, though registered hotel residents remain subject to specific in-room dining rules notified in the District Collector&apos;s order.
          </p>
        </section>

        {/* Section 5: Karnataka Excise Act & Border Transit */}
        <section id="statutory-enforcement" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <span>5. Karnataka Excise Act, 1965 &amp; Border Transit Rules</span>
          </h2>
          <p>
            Under <strong className="text-white">Section 21 of the Karnataka Excise Act, 1965</strong>, Deputy Commissioners (District Magistrates) and Police Commissioners have statutory authority to order the temporary closure of all licensed liquor shops within any taluk, city, or revenue district whenever deemed necessary for preserving public peace—such as during major festivals, bandhs, procession routes, or municipal by-elections.
          </p>
          <p>
            During Lok Sabha, Karnataka Vidhan Sabha, BBMP, or Gram Panchayat elections, <strong className="text-white">Section 135C of the Representation of the People Act, 1951</strong> enforces a strict 48-hour dry period ending with the conclusion of polling, plus a full dry day on vote-counting dates across affected constituencies and a 5-kilometre belt along state borders.
          </p>
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-300">
              Strict Warning on Goa, Maharashtra, Kerala &amp; Tamil Nadu Border Transit
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Travelers driving into Karnataka from <strong className="text-white">Goa, Puducherry, Maharashtra, Kerala, or Tamil Nadu</strong> cannot legally bring non-duty-paid out-of-state liquor across the border—even if purchased with a valid retail bill in Goa or another state. Karnataka Excise checkposts at Karwar, Belagavi, Nippani, Attibele, and Gundlupet seize non-Karnataka excise-stamped bottles under the Karnataka Excise Act unless backed by a valid state transport permit. For air arrivals at Kempegowda International Airport (BLR), standard domestic baggage limits (up to 5 litres of sealed duty-paid liquor in checked luggage per airline rules) still remain subject to Karnataka excise verification outside airport customs boundaries.
            </p>
          </div>
        </section>

        {/* Section 6: Major Cities Covered */}
        <section id="cities-covered" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <MapPin className="h-5 w-5 text-amber-400" />
            <span>6. Major Karnataka Cities: Bengaluru, Mysuru, Hubli &amp; Beyond</span>
          </h2>
          <p>
            Karnataka state excise notifications apply across all municipal corporations and 31 administrative districts in the state:
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

        {/* Section 7: Drinking Age */}
        <section id="drinking-age" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>7. Minimum Legal Drinking Age (21) &amp; Possession Limits</span>
          </h2>
          <p>
            The minimum legal drinking age in Karnataka is <strong className="text-white font-mono">21 years</strong> under the Karnataka Excise (General Conditions of Licences) Rules (note: while age 18 vs 21 amendments have been debated for retail purchase, licensed bars and pubs uniformly enforce 21+ age verification).
            For personal consumption within the state, an individual without a special excise permit is legally permitted to transport or store Karnataka-duty-paid liquor up to <strong className="text-white">18.2 litres of beer</strong> or <strong className="text-white">4.6 litres of Indian Made Foreign Liquor (IMFL)</strong> (plus permitted wine/country spirit limits under Rule 21).
          </p>
        </section>

        {/* Section 8: How to Check */}
        <section id="how-to-check" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>8. How to Verify Real-Time Karnataka Dry-Day Status</span>
          </h2>
          <p>
            Because Karnataka combines a relatively short standing annual dry-day list with frequent localized District Commissioner orders (especially around civic rallies, Bengaluru festivals, and by-elections), follow these steps before planning purchases or events:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs text-neutral-300">
            <li>
              <strong className="text-white">Check Today &amp; Tomorrow Live in IST:</strong> Visit our{' '}
              <Link href="/india/karnataka" className="text-amber-400 font-semibold underline hover:text-white">
                Live Karnataka Dry Day Tracker &rarr;
              </Link>{' '}
              for confirmed statewide holidays as well as reported municipal/police commissioner circulars.
            </li>
            <li>
              <strong className="text-white">Watch District Police Advisories in Bengaluru:</strong> On major state events such as 1 November (Kannada Rajyotsava) or IPL/procession dates, verify whether the Bengaluru City Police Commissionerate has issued a Section 144 / Excise Section 21 half-day or zone-specific bar closure.
            </li>
            <li>
              <strong className="text-white">Confirm Outlet Licence Category:</strong> Remember that CL-2 MRP stores close at 10:30 PM daily, whereas CL-9 microbreweries and pubs in Bengaluru remain open later under city police timings except on mandatory 24-hour dry days.
            </li>
          </ol>
        </section>

        {/* Section 9: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>9. Frequently Asked Questions (FAQs) &bull; Karnataka</span>
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
          <p className="text-[11px] text-neutral-500 pt-2">
            <strong className="text-neutral-300">Editorial Disclaimer:</strong> DryCheck India is an independent public-service information utility and does not sell, deliver, or promote alcohol. Local police commissionerates and District Deputy Commissioners may issue short-notice closure orders under Section 21 of the Karnataka Excise Act, 1965.
          </p>
        </section>

      </div>
    </article>
  );
}