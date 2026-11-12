import React from 'react';
import Link from 'next/link';
import { Guide } from '@/lib/guides';
import TableOfContents from '@/components/guides/TableOfContents';
import {
  Calendar,
  Clock,
  ExternalLink,
  ShieldAlert,
  FileText,
  AlertTriangle,
  Scale,
  HelpCircle,
  CheckCircle,
  Building2,
  Beer,
  BookOpen,
  Sparkles,
  MapPin,
  Store,
} from 'lucide-react';

interface WestBengalGuideArticleProps {
  guide: Guide;
}

export default function WestBengalGuideArticle({ guide }: WestBengalGuideArticleProps) {
  const tocItems = [
    { id: 'introduction', label: '1. Introduction: Is Today a Dry Day in West Bengal?' },
    { id: 'annual-calendar', label: '2. West Bengal Annual Dry Days 2026 Calendar' },
    { id: 'december-christmas-rules', label: '3. December, Christmas (25 Dec) & New Year (31 Dec) Rules' },
    { id: 'durga-puja-festivals', label: '4. Durga Puja, Kali Puja & Festival Closure Rules' },
    { id: 'operating-hours', label: '5. Kolkata & District Wine Shop / Bar Operating Hours' },
    { id: 'legal-age-possession', label: '6. Legal Drinking Age & Individual Possession Quotas' },
    { id: 'bihar-border-warning', label: '7. Interstate Transit Warning: West Bengal to Bihar Border' },
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
          West Bengal Dry Days 2026
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
            State: West Bengal
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
            Active 2026 Reference
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
              Looking for Today&apos;s or Tomorrow&apos;s Live Status in West Bengal?
            </h2>
            <p className="leading-relaxed text-amber-200/90">
              Need to confirm whether retail liquor vends in Kolkata or across West Bengal are open today or tomorrow? Our real-time tracker provides instant verification across all 23 districts in Indian Standard Time (IST):{' '}
              <Link href="/india/west-bengal" className="underline font-semibold text-white hover:text-amber-300">
                Check Live West Bengal Dry Day Tracker &rarr;
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
            <Store className="h-5 w-5 text-amber-400" />
            <span>1. Introduction: Is Today a Dry Day in West Bengal?</span>
          </h2>
          <p>
            In the State of West Bengal, alcoholic beverage manufacturing, wholesale warehousing, and retail licensing are governed by the <strong className="text-white">Directorate of Excise, Finance Department, Government of West Bengal</strong> under <strong className="text-white">The Bengal Excise Act, 1909 (Bengal Act V of 1909)</strong>.
          </p>
          <p>
            Unlike northern Indian states such as Uttar Pradesh or Delhi where dozens of religious and cultural festivals require complete liquor bans, <strong className="text-amber-300">West Bengal maintains one of the most liberal alcohol calendars in India</strong> with very few statutory dry days.
          </p>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/80 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Quick Rule of Thumb for West Bengal:
            </h3>
            <p className="text-xs text-neutral-200">
              On most regular calendar days and major cultural festivities (including the peak days of Durga Puja, Kali Puja, Christmas, and New Year&apos;s Eve), licensed Foreign Liquor (FL) off-shops, local country spirit vends, and hotel dining bars <strong className="text-emerald-400">operate normally</strong>.
            </p>
            <p className="text-xs text-neutral-400">
              Full 24-hour mandatory state shutdowns are strictly restricted to the three national holidays (26 January, 15 August, 2 October), Muharram, statutory election voting windows, and specific idol immersion hours during Bijoya Dashami.
            </p>
          </div>
        </section>

        {/* Section 2: Annual Calendar Table */}
        <section id="annual-calendar" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>2. West Bengal Annual Dry Days 2026 Calendar</span>
          </h2>
          <p>
            The following table lists the standing gazetted dry days and recurring statutory closures officially recognized under West Bengal Excise circulars:
          </p>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300">
                  <th className="p-3 font-semibold">Date &amp; Day</th>
                  <th className="p-3 font-semibold">Occasion / Reason</th>
                  <th className="p-3 font-semibold">Dry Day Scope</th>
                  <th className="p-3 font-semibold">Outlets Affected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">26 January 2026 (Monday)</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Republic Day</strong></td>
                  <td className="p-3 text-rose-300 font-medium">Full Day (24 Hours)</td>
                  <td className="p-3 text-neutral-300">All retail FL Off, CS shops, clubs &amp; bars closed statewide</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">25 March 2026 (Wednesday)</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Dol Yatra (Holi)</strong></td>
                  <td className="p-3 text-amber-300 font-medium">Half Day (Up to 2:00 PM)</td>
                  <td className="p-3 text-neutral-300">Shops closed in the morning; permitted to open after 2:00 PM</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">17 July 2026 (Friday)</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Muharram</strong></td>
                  <td className="p-3 text-rose-300 font-medium">Full Day (24 Hours)</td>
                  <td className="p-3 text-neutral-300">Statewide mandatory closure of retail shops and bars</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">15 August 2026 (Saturday)</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Independence Day</strong></td>
                  <td className="p-3 text-rose-300 font-medium">Full Day (24 Hours)</td>
                  <td className="p-3 text-neutral-300">All licensed liquor retail outlets, bars &amp; clubs closed</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">2 October 2026 (Friday)</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Mahatma Gandhi Jayanti</strong></td>
                  <td className="p-3 text-rose-300 font-medium">Full Day (24 Hours)</td>
                  <td className="p-3 text-neutral-300">Strict mandatory pan-India dry day across West Bengal</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">20 October 2026 (Tuesday)</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Bijoya Dashami (Durga Visarjan)</strong></td>
                  <td className="p-3 text-amber-300 font-medium">From 4:00 PM / Immersion Window</td>
                  <td className="p-3 text-neutral-300">Retail vends shut along designated immersion routes &amp; ghats</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">Election Polling Days</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Assembly / Lok Sabha / By-Elections</strong></td>
                  <td className="p-3 text-rose-300 font-medium">48 Hours Ending with Poll Close</td>
                  <td className="p-3 text-neutral-300">Enforced strictly under Section 135C of RPA 1951 in notified constituencies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: December, Christmas & New Year Guidelines */}
        <section id="december-christmas-rules" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <span>3. December, Christmas (25 Dec) &amp; New Year (31 Dec) Rules</span>
          </h2>
          <p>
            With thousands of domestic tourists and international travelers visiting Kolkata, Darjeeling, and the Dooars during the winter festive season, travelers frequently verify whether December holidays such as Christmas Eve or Christmas Day carry state dry-day restrictions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-2">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Christmas (25 December): OPEN</span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">Christmas is NOT a dry day in West Bengal.</strong> Retail wine shops operate standard business hours (12:00 PM to 10:00 PM). Kolkata&apos;s famous festive hubs around Park Street, Allen Park, Bow Barracks, and Salt Lake Sector V operate with peak hospitality footfall.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-2">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>New Year&apos;s Eve (31 Dec): OPEN</span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">31 December and 1 January are NOT dry days.</strong> Retail thekas and wine shops are fully operational. Licensed restaurants, pubs, lounges, and star hotels frequently obtain special night extension permits from the Excise Directorate allowing service until late night.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/80 space-y-2 text-xs">
            <h3 className="font-semibold text-amber-400 uppercase tracking-wider">
              Late-Night Party Permits in Kolkata during Winter Season:
            </h3>
            <p className="text-neutral-300 leading-relaxed">
              Under special festive provisions, the West Bengal Excise Directorate permits commercial &ldquo;FL On&rdquo; establishments (restaurants, pubs, and luxury clubs) to apply for temporary extended operating hours (often running up to <strong>1:00 AM, 2:00 AM, or even 4:00 AM</strong> in designated 4-star and 5-star establishments) upon payment of prescribed late-closing excise fees.
            </p>
          </div>
        </section>

        {/* Section 4: Durga Puja & Festival Rules */}
        <section id="durga-puja-festivals" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>4. Durga Puja, Kali Puja &amp; Festival Closure Rules</span>
          </h2>
          <p>
            West Bengal&apos;s cultural calendar is centered around Durga Puja and Kali Puja. Many out-of-state visitors erroneously assume that alcohol is banned during the festive carnival. Here is the verified statutory position:
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60">
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">1.</span>
                <span>Durga Puja (Maha Saptami, Ashtami, Navami): Fully OPEN</span>
              </h3>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                During the primary days of Durga Puja, retail wine shops, off-shops, and hotel lounges are completely open. The Government of West Bengal does not enforce a dry day on Saptami, Ashtami, or Navami.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60">
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">2.</span>
                <span>Bijoya Dashami (Dussehra Immersion): Partial Dry Restrictions</span>
              </h3>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                On Bijoya Dashami, to maintain public order during idol immersions (Bisarjan) along the Hooghly river ghats, district administrations and police commissionerates (including Kolkata Police and Bidhannagar Police) typically mandate a retail closure either from <strong className="text-neutral-200">4:00 PM onwards</strong> or for the full afternoon/evening period.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60">
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">3.</span>
                <span>Kali Puja &amp; Diwali (Deepavali): OPEN</span>
              </h3>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                Unlike Delhi and UP where Diwali is a mandatory dry day, in West Bengal, retail wine shops operate during standard trading hours on Kali Puja and Diwali unless a localized curfew is notified by a District Magistrate for sensitive law-and-order concerns.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Operating Hours */}
        <section id="operating-hours" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Clock className="h-5 w-5 text-amber-400" />
            <span>5. Kolkata &amp; District Wine Shop / Bar Operating Hours</span>
          </h2>
          <p>
            West Bengal divides licensed retail alcohol points into distinct categories with specific legal operating schedules:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Store className="h-4 w-4 text-amber-400" />
                <span>Retail &ldquo;FL Off&rdquo; &amp; CS Thekas</span>
              </div>
              <p className="text-neutral-300">
                <strong className="text-white">Hours:</strong> 12:00 PM (Noon) &ndash; 10:00 PM
              </p>
              <p className="text-neutral-400">
                In specific high-density zones under Kolkata Municipal Corporation (KMC), selected shops operate until 10:30 PM. Sealed bottles can be purchased for off-premise consumption.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Beer className="h-4 w-4 text-amber-400" />
                <span>Commercial &ldquo;FL On&rdquo; Bars &amp; Pubs</span>
              </div>
              <p className="text-neutral-300">
                <strong className="text-white">Hours:</strong> 12:00 PM (Noon) &ndash; 12:00 Midnight
              </p>
              <p className="text-neutral-400">
                Bars, lounges, and microbreweries serve drinks on-premise. Establishments with late-night closing endorsements may serve liquor up to 2:00 AM or 4:00 AM.
              </p>
            </div>
          </div>

          <p className="text-xs text-neutral-400 italic">
            * Note: Wholesale supply and brand registry are monitored centrally by the West Bengal State Beverages Corporation Limited (BEVCO). Retail prices are uniform across all licensed stores in the state.
          </p>
        </section>

        {/* Section 6: Legal Age & Possession Limits */}
        <section id="legal-age-possession" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Scale className="h-5 w-5 text-amber-400" />
            <span>6. Legal Drinking Age &amp; Individual Possession Quotas</span>
          </h2>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/80 space-y-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                Statutory Legal Drinking Age:
              </h3>
              <p className="text-xs text-neutral-300">
                Under <strong className="text-white">Section 51 of The Bengal Excise Act, 1909</strong>, the minimum legal drinking age in West Bengal is <strong className="text-amber-400 font-bold">21 Years</strong>. Serving, selling, or supplying alcoholic liquor to anyone below 21 is punishable with financial penalties and license cancellation.
              </p>
            </div>

            <div className="border-t border-neutral-800/80 pt-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                Individual Legal Possession Limits (Without Special Transport Permit):
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
                <li><strong className="text-white">Foreign Liquor / IMFL (Whisky, Rum, Vodka, Gin):</strong> Up to 12 quart bottles (maximum 9 Litres).</li>
                <li><strong className="text-white">Beer:</strong> Up to 12 standard bottles (maximum 7.8 Litres).</li>
                <li><strong className="text-white">Country Spirit (CS):</strong> Up to 4 bottles.</li>
              </ul>
              <p className="text-[11px] text-neutral-400 mt-2">
                Possessing quantities exceeding these limits in private residences or vehicles without an authorized Excise Transport Pass constitutes illegal hoarding under the Act.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Interstate Transit Warning - West Bengal to Bihar */}
        <section id="bihar-border-warning" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-rose-400" />
            <span>7. Interstate Transit Warning: West Bengal to Bihar Border</span>
          </h2>
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 space-y-2 text-rose-200">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-300">
              Crucial Warning for Travelers Bordering Bihar:
            </h3>
            <p className="text-xs leading-relaxed">
              West Bengal shares extensive highway and railway borders with the State of <strong className="text-white">Bihar</strong> (including border checkposts at Asansol, Barakar, Malda, and Siliguri/Kishanganj).
            </p>
            <p className="text-xs leading-relaxed">
              While liquor purchase is entirely legal in West Bengal, <strong className="text-white">Bihar enforces 100% complete statutory alcohol prohibition</strong> under the Bihar Prohibition &amp; Excise Act, 2016.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
              <li><strong className="text-white">Zero Tolerance Checkposts:</strong> State border police and excise squads deploy breathalyzers, scanner gates, and trained sniffer canine units along NH-19 (GT Road) and railway transit points.</li>
              <li><strong className="text-white">Penalties:</strong> Carrying even one sealed bottle from West Bengal across the border triggers non-bailable FIR registration, immediate arrest, vehicle impoundment, and heavy court fines.</li>
            </ul>
          </div>
        </section>

        {/* Section 8: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>8. Frequently Asked Questions (FAQs) &bull; West Bengal Dry Days</span>
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

          <div className="mt-4 p-3 rounded-lg bg-neutral-900/40 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
            <strong className="text-neutral-200">Editorial Disclaimer:</strong> DryCheck India is an independent public-service information utility. We do not promote, facilitate, or sell alcohol. Operating hours, festive exemptions, and local dry notifications are governed by the West Bengal Excise Directorate and local district administrations. Please verify locally before planning events.
          </div>
        </section>

      </div>
    </article>
  );
}
