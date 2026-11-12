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
  Sparkles,
  Store,
  Beer,
} from 'lucide-react';

export interface StateDiwaliStatus {
  state: string;
  status: string;
  note: string;
  source: string;
  sourceUrl?: string;
  verified: boolean;
  badgeType: 'dry' | 'open' | 'verify' | 'prohibition';
}

export const DIWALI_STATE_RULES: StateDiwaliStatus[] = [
  {
    state: 'Delhi (NCT) & NCR',
    status: 'Dry (24-Hour Mandatory Closure)',
    note: 'Delhi NCR only: Mandatory full-day closure for all 600+ government-run retail liquor stores (thekas) and commercial bars under official Delhi Excise Department gazette orders. Transporting liquor from Haryana or UP into Delhi without an excise permit is strictly illegal under Section 33.',
    source: 'Department of Excise, Entertainment & Luxury Tax, Govt. of NCT of Delhi',
    sourceUrl: 'https://excise.delhigovt.nic.in',
    verified: true,
    badgeType: 'dry',
  },
  {
    state: 'Uttar Pradesh (UP)',
    status: 'Dry (24-Hour Mandatory Closure)',
    note: 'Statewide gazetted festival closure across all 75 districts. All retail IMFL stores, desi thekas, model shops, and hotel/restaurant bars remain completely closed for 24 hours under the UP Excise Act.',
    source: 'Uttar Pradesh Excise Department',
    sourceUrl: 'https://upexcise.gov.in',
    verified: true,
    badgeType: 'dry',
  },
  {
    state: 'Rajasthan',
    status: 'Dry (24-Hour Mandatory Closure)',
    note: 'Statewide gazetted festival dry day. All licensed retail vends, thekas, and commercial bars remain shut for 24 hours under Rajasthan Excise standing orders.',
    source: 'Rajasthan Excise Department',
    sourceUrl: 'https://rajexcise.gov.in',
    verified: true,
    badgeType: 'dry',
  },
  {
    state: 'Maharashtra',
    status: 'Open / [VERIFY with Local Authority]',
    note: 'Diwali (Lakshmi Puja) is not an automatic statewide mandatory gazetted dry day in Maharashtra (unlike Kartiki Ekadashi on 20 Nov). However, local police commissionerates or District Collectors may issue localized advisory circulars. [VERIFY]',
    source: 'State Excise Department, Government of Maharashtra',
    sourceUrl: 'https://stateexcise.maharashtra.gov.in',
    verified: false,
    badgeType: 'verify',
  },
  {
    state: 'Karnataka',
    status: 'Open / [VERIFY with Local Authority]',
    note: 'Not cataloged as a statewide mandatory standing statutory dry day in Karnataka Excise notifications. Standard CL-2 retail (10 AM–10:30 PM) and CL-9 timings apply unless localized municipal or police commissioner directives are notified. [VERIFY]',
    source: 'Karnataka State Excise Department',
    sourceUrl: 'https://stateexcise.karnataka.gov.in',
    verified: false,
    badgeType: 'verify',
  },
  {
    state: 'Kerala',
    status: 'Open / [VERIFY with Local Authority]',
    note: 'Kerala BEVCO and Consumerfed retail outlets observe statutory monthly dry days on the 1st of every month (Rule 7A), but Diwali is not a notified BEVCO dry day. Regular retail hours apply. [VERIFY]',
    source: 'Kerala State Beverages Corporation (BEVCO)',
    sourceUrl: 'https://ksbc.kerala.gov.in',
    verified: false,
    badgeType: 'verify',
  },
  {
    state: 'West Bengal',
    status: 'Open / [VERIFY with Local Authority]',
    note: 'Statewide mandatory dry days in West Bengal cover 26 Jan, 15 Aug, 2 Oct, and Dashami; Diwali is not a standard statewide 24-hour dry day, though local timings may vary. [VERIFY]',
    source: 'Excise Directorate, Government of West Bengal',
    sourceUrl: 'https://excise.wb.gov.in',
    verified: false,
    badgeType: 'verify',
  },
  {
    state: 'Tamil Nadu',
    status: 'Open / [VERIFY with Local Authority]',
    note: 'TASMAC retail liquor outlets operate under normal business hours; Diwali is not an official statutory TASMAC dry day in Tamil Nadu. [VERIFY]',
    source: 'Tamil Nadu State Marketing Corporation (TASMAC)',
    sourceUrl: 'https://tasmac.tn.gov.in',
    verified: false,
    badgeType: 'verify',
  },
  {
    state: 'Telangana',
    status: 'Open / [VERIFY with Local Authority]',
    note: 'Licensed retail wine stores operate under regular operational timings (10:00 AM – 11:00 PM); not an automatic gazetted statewide closure date. [VERIFY]',
    source: 'Telangana Prohibition & Excise Department',
    sourceUrl: 'https://prohibitionexcise.telangana.gov.in',
    verified: false,
    badgeType: 'verify',
  },
  {
    state: 'Gujarat',
    status: 'Permanently Dry (Total Prohibition)',
    note: 'Total statutory prohibition under the Gujarat Prohibition Act, 1949. Alcohol sales, purchase, and consumption are strictly banned 365 days a year across the state (except authorized visitor permits and GIFT City commercial zones).',
    source: 'Gujarat State Prohibition & Excise Department',
    sourceUrl: 'https://eps.gpe.gujarat.gov.in',
    verified: true,
    badgeType: 'prohibition',
  },
  {
    state: 'Bihar',
    status: 'Permanently Dry (Total Prohibition)',
    note: 'Total statutory alcohol ban enforced year-round under the Bihar Prohibition & Excise Act, 2016. Zero alcohol sales permitted on any day of the year.',
    source: 'Excise & Prohibition Department, Government of Bihar',
    sourceUrl: 'https://state.bihar.gov.in',
    verified: true,
    badgeType: 'prohibition',
  },
];

interface DiwaliGuideArticleProps {
  guide: Guide;
}

export default function DiwaliGuideArticle({ guide }: DiwaliGuideArticleProps) {
  const tocItems = [
    { id: 'quick-verdict', label: '1. Quick Answer: Is Diwali 2026 a Dry Day in India?' },
    { id: 'delhi-ncr-focus', label: '2. Delhi NCR Priority Rule: Full 24-Hour Dry Day' },
    { id: 'state-wise-table', label: '3. State-by-State Diwali 2026 Status Table' },
    { id: 'adjacent-dates', label: '4. Key Dates Around Diwali: Chhath, Kartiki Ekadashi & Guru Nanak Jayanti' },
    { id: 'why-dry-days', label: '5. Why Dry Days Occur: Festivals, Elections & State Laws' },
    { id: 'faqs', label: '6. Frequently Asked Questions (FAQs)' },
    { id: 'internal-resources', label: '7. Official State Guides & Live Trackers' },
    { id: 'official-sources', label: '8. Official Citations & Regulatory References' },
  ];

  return (
    <article className="mx-auto w-full max-w-4xl px-4 sm:px-6 pt-2 pb-16 text-neutral-200">
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
          Diwali 2026 Dry Day Guide
        </span>
      </nav>

      {/* Header section with H1 */}
      <header className="border-b border-neutral-800 pb-6 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            Festival Excise Guide
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60">
            Scope: State-by-State Rules
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
            Diwali (8 Nov 2026)
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

      {/* A. Quick Answer (First Viewport on Mobile, Large Font) + B. Last Updated Badge */}
      <section id="quick-verdict" className="my-6 rounded-2xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-950/40 via-neutral-900 to-neutral-950 p-4 sm:p-6 text-neutral-100 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-amber-500/20 pb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Direct Answer • First Viewport Verdict
          </span>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-neutral-800 text-amber-300 border border-neutral-700/60">
            Last Updated: 3 November 2026 (IST)
          </span>
        </div>

        <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug">
          8 Nov 2026 (Diwali) ko poori country mein dry day nahi hai. Har state ka rule alag hai. In Delhi NCR and Uttar Pradesh, all retail liquor shops and commercial bars are completely closed for 24 hours under official gazetted orders. In states like Maharashtra, West Bengal, and Tamil Nadu, retail stores follow standard timings unless local district orders are issued.
        </p>
        <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Because liquor regulation is an exclusive State Subject under India&apos;s Constitution (Entry 8 of the State List), there is no uniform pan-India dry-day mandate on Diwali — retail closure rules depend entirely on your state&apos;s annual excise calendar.
        </p>
      </section>

      {/* Table of Contents */}
      <TableOfContents items={tocItems} />

      {/* Main Body Content */}
      <div className="space-y-10 text-xs sm:text-sm leading-relaxed text-neutral-300 mt-8">

        {/* Section 2: Delhi NCR Priority Rule */}
        <section id="delhi-ncr-focus" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>2. Delhi NCR Priority Rule: Full 24-Hour Dry Day</span>
          </h2>

          <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-4 sm:p-5 text-amber-200 space-y-3">
            <div className="flex items-start gap-3">
              <Store className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-amber-300">
                    Delhi NCR Only: Complete 24-Hour Closure on 8 November 2026
                  </h3>
                  <a
                    href="https://excise.delhigovt.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-amber-300 underline hover:text-white"
                  >
                    <span>Official Delhi Excise Source</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="leading-relaxed text-amber-100/90">
                  In the National Capital Territory of Delhi, the <strong className="text-white">Department of Excise, Entertainment &amp; Luxury Tax</strong> notifies Diwali (Deepawali) as a mandatory standing gazetted dry day. All 600+ government-run retail outlets (managed by DTTDC, DSIIDC, DCCWS, and DSCSC) and commercial restaurant bars remain strictly closed for the entire 24-hour cycle from 12:00 AM midnight to 12:00 AM midnight.
                </p>
                <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-950/30 text-rose-200 text-xs space-y-1">
                  <strong className="text-rose-300 block font-semibold">Strict Legal Border Warning:</strong>
                  <span>Under <strong className="text-white">Section 33 of the Delhi Excise Act, 2009</strong>, transporting alcohol across state lines into Delhi from Haryana (Gurugram/Faridabad) or Uttar Pradesh (Noida/Ghaziabad) without an official Delhi import permit is a non-bailable criminal offence punishable by vehicle impoundment and up to 3 years imprisonment.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: State-by-State Diwali 2026 Status Table */}
        <section id="state-wise-table" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Scale className="h-5 w-5 text-amber-400" />
              <span>3. State-by-State Diwali 2026 Status Table</span>
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              Active Data &bull; 8 November 2026
            </span>
          </div>

          <p>
            Here is the state-wise regulatory breakdown for Diwali (8 November 2026). States are rendered directly from verified excise records; unconfirmed jurisdictions require local district verification:
          </p>

          {/* Responsive scroll-safe table container */}
          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/80 shadow-md">
            <table className="w-full text-left border-collapse text-xs min-w-[620px]">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/90 text-neutral-300">
                  <th className="p-3.5 font-semibold w-[22%]">State / UT</th>
                  <th className="p-3.5 font-semibold w-[28%]">8 Nov 2026 Status</th>
                  <th className="p-3.5 font-semibold w-[50%]">Official Regulatory Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {DIWALI_STATE_RULES.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-neutral-900/40 ${
                      row.state.includes('Delhi') ? 'bg-amber-950/20' : ''
                    }`}
                  >
                    <td className="p-3.5 font-semibold text-white align-top">
                      <div className="flex items-center gap-1.5">
                        {row.state.includes('Delhi') && (
                          <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                        )}
                        <span>{row.state}</span>
                      </div>
                      {row.sourceUrl && (
                        <a
                          href={row.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-[11px] text-amber-400/80 hover:text-amber-300 hover:underline"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </td>
                    <td className="p-3.5 align-top">
                      {row.badgeType === 'dry' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-950/80 text-rose-300 border border-rose-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          {row.status}
                        </span>
                      ) : row.badgeType === 'prohibition' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-950/90 text-red-300 border border-red-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          {row.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {row.status}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-neutral-300 leading-relaxed align-top">
                      <p>{row.note}</p>
                      <span className="text-[11px] text-neutral-500 block mt-1">
                        Authority: {row.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-neutral-400">
              Need real-time status for states not listed above (e.g. Punjab, Goa, Odisha, Assam)?
            </span>
            <Link
              href="/#state-directory"
              className="inline-flex items-center gap-1.5 text-amber-400 font-semibold hover:underline min-h-[36px]"
            >
              <span>Explore All 36 States &amp; UTs Directory &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Section 4: Key Dates Around Diwali */}
        <section id="adjacent-dates" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>4. Key Dates Around Diwali: Chhath, Kartiki Ekadashi &amp; Guru Nanak Jayanti</span>
          </h2>
          <p>
            November 2026 features several closely timed religious observances. Before planning gatherings, always verify date-specific and state-specific orders (<em className="text-amber-300">har date ke saath state-wise check karein</em>):
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-white text-sm">8 November 2026 (Sunday)</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/60 font-mono">
                  Major Festival
                </span>
              </div>
              <h3 className="text-xs font-semibold text-amber-400">Diwali (Lakshmi Puja)</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">State-wise Rule:</strong> Mandatory 24-hour dry day in Delhi NCR, Uttar Pradesh, and Rajasthan. Retail stores operate under regular timings in Tamil Nadu, Kerala, and West Bengal unless local municipal notices are ordered.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-white text-sm">15&ndash;16 November 2026</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono">
                  Ghat Corridors
                </span>
              </div>
              <h3 className="text-xs font-semibold text-amber-400">Chhath Puja (Sandhya &amp; Usha Arghya)</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">State-wise Rule:</strong> Bihar is permanently dry 365 days. In Uttar Pradesh and Delhi NCR, District Magistrates routinely enforce dry perimeters within 1&ndash;2 km of notified riverfront ghats along the Ganga and Yamuna.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-white text-sm">20 November 2026 (Friday)</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/60 font-mono">
                  Maharashtra Gazette
                </span>
              </div>
              <h3 className="text-xs font-semibold text-amber-400">Kartiki Ekadashi (Pandharpur Wari)</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">State-wise Rule:</strong> Mandatory statewide 24-hour dry day throughout Maharashtra (Mumbai, Pune, Solapur, Nashik). Most other Indian states do not observe a dry day on this date.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-white text-sm">24 November 2026 (Tuesday)</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/60 font-mono">
                  Pan-India Gazette
                </span>
              </div>
              <h3 className="text-xs font-semibold text-amber-400">Guru Nanak Jayanti / Kartik Purnima</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">State-wise Rule:</strong> Mandatory gazetted dry day in Delhi NCR, Uttar Pradesh, Maharashtra, Rajasthan, Punjab, and Haryana. All licensed retail thekas and commercial bars remain shut.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Why Dry Days Occur (150 words) */}
        <section id="why-dry-days" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <span>5. Why Dry Days Occur: Festivals, Elections &amp; State Laws</span>
          </h2>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 sm:p-5 space-y-3 leading-relaxed text-xs sm:text-sm">
            <p>
              In India, a dry day is a legally mandated window during which the commercial sale, serving, and public distribution of alcoholic beverages are strictly forbidden. These closures occur primarily due to three statutory mechanisms:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>
                <strong className="text-white">Cultural &amp; Religious Festivals:</strong> State governments declare dry days during major observances (such as Diwali, Republic Day, and Gandhi Jayanti) to preserve social decorum, maintain public sobriety, and prevent festival-related public disorder.
              </li>
              <li>
                <strong className="text-white">Democratic Elections:</strong> Under Section 135C of the Representation of the People Act, 1951, alcohol sales are statutorily banned 48 hours prior to poll closing and throughout vote-counting day to ensure free and fair voting without voter inducement.
              </li>
              <li>
                <strong className="text-white">State Excise Notifications:</strong> Pursuant to Entry 8 of the State List (Seventh Schedule of the Constitution), alcohol regulation belongs exclusively to states. District Magistrates hold delegated emergency powers to mandate sudden localized closures to uphold law and order.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 6: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>6. Frequently Asked Questions (FAQs) &bull; Diwali 2026</span>
          </h2>

          <div className="space-y-3">
            {guide.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-neutral-800/80 bg-neutral-950/70 p-4 space-y-1.5">
                <h3 className="text-xs sm:text-sm font-semibold text-neutral-100 flex items-start gap-2">
                  <span className="text-amber-400 font-mono font-semibold shrink-0">Q{idx + 1}.</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Internal Links */}
        <section id="internal-resources" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Store className="h-5 w-5 text-amber-400" />
            <span>7. Official State Guides &amp; Live Trackers</span>
          </h2>
          <p>
            Check detailed excise rules and live operating hours across our verified state guides:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              href="/dry-days/8-november-2026"
              className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 hover:border-amber-400 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-[11px] font-mono text-amber-400 font-semibold block mb-1">
                Date Specific &rarr;
              </span>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                8 November 2026 Status
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                Live all-India status for Diwali day.
              </p>
            </Link>

            <Link
              href="/guides/delhi-dry-days-2026"
              className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-[11px] font-mono text-amber-400 font-semibold block mb-1">
                State Guide &rarr;
              </span>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                Delhi Dry Days 2026
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                Government vend timings &amp; NCR transit bans.
              </p>
            </Link>

            <Link
              href="/guides/uttar-pradesh-dry-days-2026"
              className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-[11px] font-mono text-amber-400 font-semibold block mb-1">
                State Guide &rarr;
              </span>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                UP Dry Days 2026
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                75 districts calendar &amp; 10 PM closing rules.
              </p>
            </Link>

            <Link
              href="/guides/november-dry-days-2026"
              className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-[11px] font-mono text-amber-400 font-semibold block mb-1">
                Monthly Pillar &rarr;
              </span>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                November 2026 Calendar
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                All-India festival schedule &amp; Chhath Puja rules.
              </p>
            </Link>

            <Link
              href="/guides/karnataka-dry-days-2026"
              className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-[11px] font-mono text-amber-400 font-semibold block mb-1">
                State Guide &rarr;
              </span>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                Karnataka Dry Days 2026
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                CL-2 retail hours &amp; Bengaluru pub timings.
              </p>
            </Link>

            <Link
              href="/guides/kerala-dry-days-2026"
              className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-[11px] font-mono text-amber-400 font-semibold block mb-1">
                State Guide &rarr;
              </span>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                Kerala Dry Days 2026
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                1st of month BEVCO dry day &amp; election rules.
              </p>
            </Link>
          </div>
        </section>

        {/* Section 8: Disclaimer & Citations */}
        <section id="official-sources" className="space-y-4 border-t border-neutral-800 pt-6">
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-4 text-xs text-neutral-400 flex items-start gap-3">
            <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <strong className="text-neutral-200 block">
                Editorial Disclaimer:
              </strong>
              <p>
                Ye jaankari general hai. This information is compiled for public convenience based on annual gazetted state excise circulars. Local operating hours and district-level dry day orders may be modified at short notice by District Magistrates or City Police Commissioners. Always confirm with your local excise notification or your nearest licensed wine shop.
              </p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider pt-2">
            Official Regulatory References
          </h3>
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