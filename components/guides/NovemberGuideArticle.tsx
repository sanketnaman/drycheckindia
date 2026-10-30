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
  ShieldCheck,
  Store,
  Sparkles,
} from 'lucide-react';

interface NovemberGuideArticleProps {
  guide: Guide;
}

export default function NovemberGuideArticle({ guide }: NovemberGuideArticleProps) {
  const tocItems = [
    { id: 'overview', label: '1. Overview: November 2026 Dry Days in India' },
    { id: 'dates-breakdown', label: '2. Date-by-Date Breakdown of November Dry Days' },
    { id: 'diwali-dry-day', label: '3. Diwali 2026 (8 November): Pan-India Wine Shop Status' },
    { id: 'guru-nanak-jayanti', label: '4. Guru Nanak Jayanti & Kartik Purnima (24 November)' },
    { id: 'kartiki-ekadashi', label: '5. Kartiki Ekadashi (20 November): Maharashtra Closure' },
    { id: 'state-matrix', label: '6. State-by-State November 2026 Closure Matrix' },
    { id: 'cities-covered', label: '7. Major Metros & Cities Impacted' },
    { id: 'theka-timings', label: '8. Festive Theka & Bar Timings' },
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
          November Dry Days 2026
        </span>
      </nav>

      {/* Header section with H1 */}
      <header className="border-b border-neutral-800 pb-6 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Calendar className="h-3.5 w-3.5" />
            Monthly Festive Hub
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60">
            Scope: All-India Calendar
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
            Active November 2026 Schedule
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {guide.h1Title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-neutral-500" />
            <span>Reading time: {guide.readingTimeMinutes} mins</span>
          </div>
          <span className="text-neutral-600">•</span>
          <div>Published: {guide.publishedDate}</div>
          <span className="text-neutral-600">•</span>
          <div className="text-emerald-400 flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" />
            <span>Verified with Official State Excise Gazettes</span>
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
          {guide.excerpt}
        </p>
      </header>

      {/* Table of Contents */}
      <TableOfContents items={tocItems} />

      {/* Section 1: Overview */}
      <section id="overview" className="mt-10 scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <span>1. Overview: November 2026 Dry Days in India</span>
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-neutral-300">
          <p>
            November is traditionally one of the most culturally significant and festival-dense months on the Indian calendar. In 2026, the convergence of major celebrations—including <strong className="text-white">Diwali (Lakshmi Puja)</strong> on 8 November, <strong className="text-white">Guru Nanak Jayanti / Kartik Purnima</strong> on 24 November, alongside regional observances like <strong className="text-white">Kannada Rajyotsava</strong> (1 Nov) and <strong className="text-white">Kartiki Ekadashi</strong> (20 Nov)—triggers statutory alcohol bans across multiple states and union territories.
          </p>
          <p>
            Because excise duty and liquor licensing in India are governed at the state level under the Seventh Schedule of the Constitution, dry days in November are a mixture of:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-300">
            <li>
              <strong className="text-amber-300">Pan-India Gazetted Closures:</strong> Dates like Diwali (8 Nov) and Guru Nanak Jayanti (24 Nov) where nearly all commercial retail wine stores and thekas across Delhi, UP, Maharashtra, Rajasthan, Karnataka, and Punjab remain shut for 24 hours.
            </li>
            <li>
              <strong className="text-amber-300">State-Specific Statutory Holidays:</strong> Statewide retail closures such as Kerala&apos;s Rule 7A (1st of every month BEVCO dry day) and Maharashtra&apos;s Kartiki Ekadashi (20 Nov).
            </li>
            <li>
              <strong className="text-amber-300">District &amp; Religious Corridor Prohibitions:</strong> Targeted local orders restricting alcohol sales near riverfront ghats during Chhath Puja (15-16 Nov in UP/Delhi) or around sacred pilgrimage shrines (e.g. Pandharpur, Varanasi, Pushkar).
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Date-by-Date Breakdown */}
      <section id="dates-breakdown" className="mt-10 scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Calendar className="h-5 w-5 text-amber-400" />
          <span>2. Date-by-Date Breakdown of November 2026 Dry Days</span>
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-neutral-300">
          <p>
            Here is the chronological timetable of notified and observed dry days in November 2026 across Indian states:
          </p>

          <div className="space-y-4 mt-6">
            {/* 1 Nov */}
            <div className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  1 November 2026 (Sunday)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono">
                  Regional / State Order
                </span>
              </div>
              <h3 className="text-sm font-semibold text-amber-400 mb-2">
                Kannada Rajyotsava (Karnataka) &amp; BEVCO Monthly Dry Day (Kerala)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                In <strong className="text-white">Kerala</strong>, all government-operated BEVCO and Consumerfed retail outlets are closed statewide under Rule 7A of the Kerala Foreign Liquor Rules, which mandates a complete dry day on the 1st of every calendar month. In <strong className="text-white">Karnataka</strong>, 1 November marks state formation day (Kannada Rajyotsava); while not an automatic statewide closure, local district commissioners in Bengaluru and sensitive taluks routinely enforce dry day orders to maintain public order during parades and rallies.
              </p>
            </div>

            {/* 8 Nov */}
            <div className="p-4 sm:p-5 rounded-xl border border-amber-500/40 bg-amber-950/20">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  8 November 2026 (Sunday)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold">
                  Pan-India Gazetted Closure
                </span>
              </div>
              <h3 className="text-sm font-semibold text-amber-400 mb-2">
                Diwali / Deepavali / Lakshmi Puja (Pan-India Dry Day)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Diwali is one of the most universally enforced religious dry days in India. Licensed thekas, country spirit vends, beer shops, and retail wine stores are ordered shut for 24 hours across Delhi NCT, Maharashtra (Mumbai, Pune), Uttar Pradesh, Rajasthan, Karnataka, Haryana, Punjab, and West Bengal.
              </p>
            </div>

            {/* 10-11 Nov */}
            <div className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-500"></span>
                  10 &amp; 11 November 2026 (Tuesday &amp; Wednesday)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono">
                  State Specific Notifications
                </span>
              </div>
              <h3 className="text-sm font-semibold text-amber-400 mb-2">
                Govardhan Puja (10 Nov) &amp; Bhai Dooj (11 Nov)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Observed as official festival holidays in Northern and Western India. In select districts of Uttar Pradesh and Rajasthan, local excise notices may restrict retail theka timings or designate specific municipal zones as alcohol-free corridors during major temple processions (such as Mathura and Vrindavan). In Delhi and Maharashtra, wine shops normally operate regular commercial hours unless a specific district magistracy notification is published.
              </p>
            </div>

            {/* 15-16 Nov */}
            <div className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  15 &amp; 16 November 2026 (Sunday &amp; Monday)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono">
                  Local / Riverfront Restrictions
                </span>
              </div>
              <h3 className="text-sm font-semibold text-amber-400 mb-2">
                Chhath Puja: Sandhya Arghya (15 Nov) &amp; Usha Arghya (16 Nov)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                In <strong className="text-white">Bihar</strong>, total statewide prohibition is in force 365 days a year. In <strong className="text-white">Uttar Pradesh, Jharkhand, and Delhi NCR</strong>, district authorities routinely issue temporary containment orders prohibiting liquor sale within 1–2 km of holy riverbanks and ghats (e.g. Ganga ghats in Varanasi, Kanpur, Patna-border, and Yamuna ghats in Delhi) to preserve sanctity.
              </p>
            </div>

            {/* 20-21 Nov */}
            <div className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  20 &amp; 21 November 2026 (Friday &amp; Saturday)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono">
                  Maharashtra State Order
                </span>
              </div>
              <h3 className="text-sm font-semibold text-amber-400 mb-2">
                Kartiki Ekadashi (Prabodhini / Devutthana Ekadashi &amp; Tulsi Vivah)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Kartiki Ekadashi marks the conclusion of the holy Chaturmas period. In <strong className="text-white">Maharashtra</strong>, this is an official statutory dry day. Total closure of all FL-I/FL-II liquor shops, beer bars, and permit rooms is enforced across Pandharpur (Solapur district) and notified across Mumbai, Pune, Nashik, and Solapur.
              </p>
            </div>

            {/* 24 Nov */}
            <div className="p-4 sm:p-5 rounded-xl border border-amber-500/40 bg-amber-950/20">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  24 November 2026 (Tuesday)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold">
                  Pan-India Gazetted Closure
                </span>
              </div>
              <h3 className="text-sm font-semibold text-amber-400 mb-2">
                Guru Nanak Jayanti (Gurpurab) &amp; Kartik Purnima / Dev Deepawali
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Guru Nanak Dev Ji&apos;s birth anniversary coincides with Kartik Purnima. This is a mandatory statewide dry day across Punjab, Chandigarh, Delhi NCT, Haryana, Uttar Pradesh, Rajasthan, Maharashtra, and other states. In holy cities like Varanasi, Amritsar, and Pushkar, total alcohol restrictions are strictly enforced by local police and excise squads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Diwali Status */}
      <section id="diwali-dry-day" className="mt-10 scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Store className="h-5 w-5 text-amber-400" />
          <span>3. Diwali 2026 (8 November): Pan-India Wine Shop Status</span>
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-neutral-300">
          <p>
            Every year, hundreds of thousands of consumers search for <code className="text-amber-300 font-mono text-xs sm:text-sm">&quot;is diwali a dry day&quot;</code> and <code className="text-amber-300 font-mono text-xs sm:text-sm">&quot;are thekas open on diwali&quot;</code>. The legal position across India is unequivocally strict:
          </p>

          <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/20 text-neutral-200">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-300 text-sm sm:text-base">
                  Confirmed: 8 November 2026 is a Full 24-Hour Dry Day
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  In Delhi, Mumbai, Bengaluru, Lucknow, Jaipur, Kolkata, and Chandigarh, licensed retail thekas, IMFL stores, and wine boutiques will shut at their normal closing hour on Saturday night (7 November) and will remain closed throughout Sunday (8 November), reopening only on Monday morning (9 November).
                </p>
              </div>
            </div>
          </div>

          <p>
            Festive gatherings and private home celebrations must plan advance purchases. Over-the-counter retail sales on Diwali day are subject to immediate license cancellation, spot seizures, and heavy fines under Section 33 of State Excise Acts.
          </p>
        </div>
      </section>

      {/* Section 4: Guru Nanak Jayanti */}
      <section id="guru-nanak-jayanti" className="mt-10 scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Scale className="h-5 w-5 text-amber-400" />
          <span>4. Guru Nanak Jayanti &amp; Kartik Purnima (24 November)</span>
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-neutral-300">
          <p>
            The second universal nationwide dry day in November falls on <strong className="text-white">Tuesday, 24 November 2026</strong>. This date commemorates the 557th Prakash Parv of Guru Nanak Dev Ji and also coincides with the sacred festival of <strong className="text-white">Kartik Purnima</strong> (celebrated as Dev Deepawali along the Ganga riverbanks in Varanasi).
          </p>
          <p>
            Excise authorities in Northern India (Delhi, Punjab, Haryana, Uttar Pradesh, Himachal Pradesh, Uttarakhand, Rajasthan) notify this date in their annual gazetted schedules as an absolute holiday. No retail sale, transit, or serving in public banquet spaces is allowed.
          </p>
        </div>
      </section>

      {/* Section 5: Kartiki Ekadashi */}
      <section id="kartiki-ekadashi" className="mt-10 scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <ShieldAlert className="h-5 w-5 text-amber-400" />
          <span>5. Kartiki Ekadashi (20 November): Maharashtra Closure</span>
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-neutral-300">
          <p>
            Unlike Diwali and Guru Nanak Jayanti which are national gazetted events, <strong className="text-white">Kartiki Ekadashi</strong> is deeply rooted in Maharashtra&apos;s Warkari pilgrimage tradition. On this day, hundreds of thousands of Warkari pilgrims congregate in Pandharpur to worship Lord Vitthal (Vithoba).
          </p>
          <p>
            The Maharashtra State Excise Department, under the Bombay Prohibition Act and relevant executive orders, mandates:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-300">
            <li>
              <strong className="text-amber-300">Pandharpur Municipal Area:</strong> Strict complete prohibition within a multi-kilometre radius around the temple town during the entire pilgrimage yatra.
            </li>
            <li>
              <strong className="text-amber-300">Mumbai &amp; Pune:</strong> Mandatory 24-hour closure of all country liquor (CL-III), foreign liquor (FL-II), and retail shops. Commercial permit room operations are similarly curtailed.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 6: State-by-State Matrix */}
      <section id="state-matrix" className="mt-10 scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Building2 className="h-5 w-5 text-amber-400" />
          <span>6. State-by-State November 2026 Closure Matrix</span>
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-neutral-300">
          <p>
            Below is the comprehensive comparison table showing expected wine shop status across top states during November 2026:
          </p>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/40 mt-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-neutral-800/80 text-white font-semibold border-b border-neutral-700">
                <tr>
                  <th className="p-3">State / UT</th>
                  <th className="p-3">1 Nov (Rajyotsava/BEVCO)</th>
                  <th className="p-3">8 Nov (Diwali)</th>
                  <th className="p-3">20 Nov (Kartiki Ekadashi)</th>
                  <th className="p-3">24 Nov (Guru Nanak Jayanti)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-mono text-xs">
                <tr className="hover:bg-neutral-800/30">
                  <td className="p-3 font-medium text-white">Delhi (NCT)</td>
                  <td className="p-3 text-emerald-400">Open (Regular 10 AM-10 PM)</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Full Close)</td>
                  <td className="p-3 text-emerald-400">Open</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Full Close)</td>
                </tr>
                <tr className="hover:bg-neutral-800/30">
                  <td className="p-3 font-medium text-white">Maharashtra</td>
                  <td className="p-3 text-emerald-400">Open (Regular 10:30 AM-10:30 PM)</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Full Close)</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Statewide)</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Full Close)</td>
                </tr>
                <tr className="hover:bg-neutral-800/30">
                  <td className="p-3 font-medium text-white">Uttar Pradesh</td>
                  <td className="p-3 text-emerald-400">Open (Regular 10 AM-10 PM)</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Full Close)</td>
                  <td className="p-3 text-emerald-400">Open (Dev Uthani)</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Kartik Purnima)</td>
                </tr>
                <tr className="hover:bg-neutral-800/30">
                  <td className="p-3 font-medium text-white">Karnataka</td>
                  <td className="p-3 text-amber-400 font-bold">District Orders (Rajyotsava)</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Deepavali)</td>
                  <td className="p-3 text-emerald-400">Open</td>
                  <td className="p-3 text-amber-400">Restricted / Open</td>
                </tr>
                <tr className="hover:bg-neutral-800/30">
                  <td className="p-3 font-medium text-white">Rajasthan</td>
                  <td className="p-3 text-emerald-400">Open (Strict 8 PM Close)</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Full Close)</td>
                  <td className="p-3 text-emerald-400">Open (8 PM Close)</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Gurpurab)</td>
                </tr>
                <tr className="hover:bg-neutral-800/30">
                  <td className="p-3 font-medium text-white">Kerala</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Rule 7A Monthly)</td>
                  <td className="p-3 text-emerald-400 font-bold">Open (Special Festival Hours)</td>
                  <td className="p-3 text-emerald-400">Open</td>
                  <td className="p-3 text-emerald-400">Open</td>
                </tr>
                <tr className="hover:bg-neutral-800/30">
                  <td className="p-3 font-medium text-white">Punjab &amp; Chandigarh</td>
                  <td className="p-3 text-emerald-400">Open</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Diwali)</td>
                  <td className="p-3 text-emerald-400">Open</td>
                  <td className="p-3 text-red-400 font-bold">DRY DAY (Prakash Parv)</td>
                </tr>
                <tr className="hover:bg-neutral-800/30">
                  <td className="p-3 font-medium text-white">Bihar &amp; Gujarat</td>
                  <td className="p-3 text-red-400 font-bold">TOTAL PROHIBITION (365 Days)</td>
                  <td className="p-3 text-red-400 font-bold">TOTAL PROHIBITION (365 Days)</td>
                  <td className="p-3 text-red-400 font-bold">TOTAL PROHIBITION (365 Days)</td>
                  <td className="p-3 text-red-400 font-bold">TOTAL PROHIBITION (365 Days)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 7: Major Metros & Cities Impacted */}
      <section id="cities-covered" className="mt-10 scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <MapPin className="h-5 w-5 text-amber-400" />
          <span>7. Major Metros &amp; Cities Impacted</span>
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-neutral-300">
          <p>
            Dry day notifications and theka closures in November 2026 apply across all principal metropolitan corporations and district collectorates:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
            <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-900/60">
              <span className="font-bold text-white block mb-1">Delhi NCR</span>
              <p className="text-neutral-400">
                New Delhi, South Delhi, Gurugram (Haryana rules apply), Noida &amp; Greater Noida (UP rules apply), Ghaziabad, Faridabad.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-900/60">
              <span className="font-bold text-white block mb-1">Maharashtra Hubs</span>
              <p className="text-neutral-400">
                Mumbai City, Mumbai Suburban, Pune, Nagpur, Nashik, Thane, Kalyan-Dombivli, Navi Mumbai, Pandharpur.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-900/60">
              <span className="font-bold text-white block mb-1">Karnataka Centres</span>
              <p className="text-neutral-400">
                Bengaluru (Bangalore), Mysuru, Mangaluru, Hubballi-Dharwad, Belagavi, Ballari.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-900/60">
              <span className="font-bold text-white block mb-1">Uttar Pradesh Urban Belts</span>
              <p className="text-neutral-400">
                Lucknow, Varanasi, Kanpur, Agra, Prayagraj, Meerut, Bareilly, Gorakhpur.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-900/60">
              <span className="font-bold text-white block mb-1">Rajasthan &amp; Heritage Cities</span>
              <p className="text-neutral-400">
                Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Mount Abu, Bikaner, Pushkar.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-900/60">
              <span className="font-bold text-white block mb-1">Punjab &amp; North Zone</span>
              <p className="text-neutral-400">
                Amritsar, Ludhiana, Chandigarh Tricity, Jalandhar, Patiala, Bathinda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Festive Theka & Bar Timings */}
      <section id="theka-timings" className="mt-10 scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Clock className="h-5 w-5 text-amber-400" />
          <span>8. Festive Theka &amp; Bar Operating Hours</span>
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-neutral-300">
          <p>
            On non-dry days throughout November 2026, standard state retail hours apply:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-300">
            <li>
              <strong className="text-white">Delhi NCT:</strong> Licensed retail stores open from 10:00 AM to 10:00 PM.
            </li>
            <li>
              <strong className="text-white">Uttar Pradesh:</strong> Government-authorized retail vends operate strictly between 10:00 AM and 10:00 PM.
            </li>
            <li>
              <strong className="text-white">Maharashtra:</strong> Retail wine stores operate 10:30 AM to 10:30 PM; licensed permit rooms serve until 11:30 PM or 1:00 AM depending on local commissionerate guidelines.
            </li>
            <li>
              <strong className="text-white">Rajasthan:</strong> Statewide mandatory closing at exactly 8:00 PM. No retail store may operate after 8:00 PM.
            </li>
            <li>
              <strong className="text-white">Karnataka:</strong> CL-2 retail stores operate from 10:00 AM to 10:30 PM; Bengaluru pubs operate up to 1:00 AM on weekends.
            </li>
          </ul>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-200">
            <h3 className="font-semibold text-white text-sm sm:text-base flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-amber-400" />
              Can you buy liquor at clubs or bars on Diwali or Guru Nanak Jayanti?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              In almost all states, gazetted dry days apply equally to standalone restaurants, pubs, and clubs. Bar licenses (L-4, FL-3, CL-9) are legally bound to suspend alcohol service for 24 hours. Only classified 5-star international tourist luxury hotels may serve registered in-house foreign guests in closed private suites in select jurisdictions.
            </p>
          </div>
        </div>
      </section>

      {/* Section 9: FAQs */}
      <section id="faqs" className="mt-10 scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <HelpCircle className="h-5 w-5 text-amber-400" />
          <span>9. Frequently Asked Questions (FAQs)</span>
        </h2>
        <div className="mt-6 space-y-4">
          {guide.faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700/80 transition-colors"
            >
              <h3 className="text-sm sm:text-base font-semibold text-white mb-2 flex items-start gap-2">
                <span className="text-amber-400 font-mono text-xs sm:text-sm mt-0.5">Q{index + 1}.</span>
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 10: Official Sources */}
      <section id="official-sources" className="mt-10 scroll-mt-20 border-t border-neutral-800 pt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <BookOpen className="h-5 w-5 text-amber-400" />
          <span>10. Official Citations &amp; Regulatory References</span>
        </h2>
        <div className="mt-4 space-y-3">
          {guide.sources.map((source, index) => (
            <div
              key={index}
              className="p-3.5 rounded-lg border border-neutral-800 bg-neutral-900/30 text-xs sm:text-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white">{source.title}</h3>
                  <p className="text-neutral-400 text-xs mt-0.5">{source.organization}</p>
                </div>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-xs shrink-0"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                <strong className="text-neutral-300">Verified Rule:</strong> {source.claimSupported}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action card */}
      <div className="mt-12 p-5 sm:p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-neutral-900/60 text-center">
        <h3 className="text-base sm:text-lg font-bold text-white">
          Checking today&apos;s real-time dry day status in your city?
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
          Visit the DryCheck India state trackers for live notifications, municipal updates, and operating hours across all 36 Indian states and union territories.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/india/delhi"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition-colors"
          >
            Check Delhi Tracker
          </Link>
          <Link
            href="/india/maharashtra"
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs sm:text-sm transition-colors"
          >
            Check Maharashtra Tracker
          </Link>
          <Link
            href="/india/uttar-pradesh"
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs sm:text-sm transition-colors"
          >
            Check UP Tracker
          </Link>
        </div>
      </div>
    </article>
  );
}
