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
  Sparkles,
  Info,
} from 'lucide-react';

interface GuruNanakJayantiGuideArticleProps {
  guide: Guide;
}

export default function GuruNanakJayantiGuideArticle({ guide }: GuruNanakJayantiGuideArticleProps) {
  const tocItems = [
    { id: 'introduction', label: '1. Introduction: Prakash Parv & Shaheedi Diwas' },
    { id: 'direct-answer', label: '2. Is 24 November 2026 a Dry Day Across India?' },
    { id: 'state-matrix', label: '3. State-by-State Verification Matrix' },
    { id: 'punjab-chandigarh', label: '4. Punjab & Chandigarh: Strict 24-Hour Closure' },
    { id: 'delhi-ncr-haryana', label: '5. Delhi NCR & Haryana: Government Vends & Pub Rules' },
    { id: 'uttar-pradesh-rules', label: '6. Uttar Pradesh: All 75 Districts Standing Mandate' },
    { id: 'bars-and-hotels', label: '7. Rules for Bars, Clubs, Restaurants & Private Stock' },
    { id: 'how-to-check', label: '8. How to Verify Live Status on 24 November' },
    { id: 'faqs', label: '9. Frequently Asked Questions (FAQs)' },
    { id: 'official-sources', label: '10. Official Citations & Regulatory References' },
  ];

  return (
    <article className="mx-auto w-full max-w-4xl px-3 sm:px-6 pt-2 pb-16 text-neutral-200">
      {/* Header section with H1 */}
      <header className="border-b border-neutral-800 pb-6 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            2026 Religious Observance Dossier
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60">
            Date: 24 November 2026
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-rose-950/60 text-rose-300 border border-rose-800/60">
            Major Northern States Mandate
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

      {/* Real-time Status Callout Box */}
      <div className="my-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 sm:p-5 text-amber-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm">
            <h2 className="text-sm sm:text-base font-bold text-amber-300">
              Need Live Today/Tomorrow Status Across India?
            </h2>
            <p className="leading-relaxed text-amber-200/90">
              To check if retail thekas and commercial bars are operating in your specific district today or on 24 November, verify real-time status in Indian Standard Time (IST):{' '}
              <Link href="/dry-days/24-november-2026" className="underline font-semibold text-white hover:text-amber-300">
                Check 24 November 2026 Nationwide Dry Day Status &rarr;
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
            <span>1. Introduction: Prakash Parv &amp; Shaheedi Diwas</span>
          </h2>
          <p>
            On <strong className="text-white">Tuesday, 24 November 2026</strong>, millions of citizens across India and the global diaspora observe <strong className="text-white">Guru Nanak Jayanti</strong> (also celebrated as <em>Guru Nanak Gurpurab</em> or <em>Prakash Parv</em>), marking the birth anniversary of Guru Nanak Dev Ji, the revered founder of Sikhism. Concurrently, several state excise calendars mark this date in solemn memory of <strong className="text-white">Sri Guru Tegh Bahadur Ji Shaheedi Diwas</strong> (Martyrdom Day of the ninth Sikh Guru).
          </p>
          <p>
            Because alcoholic beverage regulation in India is an exclusive State Subject under <strong className="text-white">Entry 8 of List II (State List) in the Seventh Schedule to the Constitution of India</strong>, the Central Government does not enforce a uniform pan-India dry day mandate on religious festivals. Instead, each state and union territory excise department independently notifies which festive observances require mandatory liquor shop closures.
          </p>
          <p>
            This legal reference guide breaks down the official state gazette notifications, theka operating curfews, restaurant and bar exemptions, and interstate transit cautions in effect on 24 November 2026.
          </p>
        </section>

        {/* Section 2: Direct Answer */}
        <section id="direct-answer" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>2. Is 24 November 2026 a Dry Day Across India?</span>
          </h2>
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Direct Regulatory Verdict:
            </h3>
            <p className="text-xs text-neutral-200 leading-relaxed">
              <strong className="text-white">Yes, in major Northern and Western states.</strong> Across Punjab, Union Territory of Chandigarh, National Capital Territory of Delhi, Uttar Pradesh, Haryana, and Rajasthan, 24 November 2026 is officially gazetted as a mandatory 24-hour dry day. All licensed retail liquor shops (thekas, wine shops, model shops), departmental stores, wholesale bonded warehouses, and commercial bars/clubs must remain completely shut.
            </p>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Conversely, in several Southern and Eastern states (such as West Bengal, Karnataka, Goa, and Tamil Nadu), 24 November is not gazetted as a standing statewide dry day, meaning retail outlets operate regular commercial excise hours unless localized District Magistrate orders are issued for religious processions.
            </p>
          </div>
        </section>

        {/* Section 3: State-by-State Verification Matrix */}
        <section id="state-matrix" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>3. State-by-State Verification Matrix (24 November 2026)</span>
          </h2>
          <p>
            The table below synthesizes confirmed standing gazette orders across major Indian jurisdictions for 24 November 2026:
          </p>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300">
                  <th className="p-3 font-semibold">State / UT</th>
                  <th className="p-3 font-semibold">24 Nov Dry Status</th>
                  <th className="p-3 font-semibold">Establishments Closed</th>
                  <th className="p-3 font-semibold">Statutory Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                <tr>
                  <td className="p-3 font-semibold text-white">Punjab</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory Dry Day
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">All retail vends, bars, pubs, clubs &amp; hotels</td>
                  <td className="p-3 font-mono text-[11px] text-amber-300">Punjab Excise Act, 1914</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Chandigarh (UT)</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory Dry Day
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">All retail shops, microbreweries &amp; lounges</td>
                  <td className="p-3 font-mono text-[11px] text-amber-300">Excise &amp; Taxation Dept, UT</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Delhi (NCT)</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory Dry Day
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">DTTDC, DSIIDC, DCCWS, DSCSC &amp; hotel bars</td>
                  <td className="p-3 font-mono text-[11px] text-amber-300">Delhi Excise Act, 2009</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Uttar Pradesh</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory Dry Day
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">All 75 districts: retail thekas, model shops &amp; bars</td>
                  <td className="p-3 font-mono text-[11px] text-amber-300">UP Excise Act, 1910</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Haryana</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory Dry Day
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">Gurugram, Faridabad &amp; all districts: vends &amp; bars</td>
                  <td className="p-3 font-mono text-[11px] text-amber-300">Haryana Excise Policy</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Rajasthan</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory Dry Day
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">All retail liquor stores &amp; commercial hotels</td>
                  <td className="p-3 font-mono text-[11px] text-amber-300">Rajasthan Excise Act, 1950</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Maharashtra</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                      Regular Trading Day*
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">Open regular hours (*Local DM orders in Nanded)</td>
                  <td className="p-3 font-mono text-[11px] text-amber-300">Maharashtra Prohibition Act</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">West Bengal</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                      Regular Trading Day
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">Kolkata FL off-shops &amp; bars open normal hours</td>
                  <td className="p-3 font-mono text-[11px] text-amber-300">Bengal Excise Act, 1909</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Karnataka</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                      Regular Trading Day
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">Bengaluru CL-2 &amp; CL-9 vends open regular hours</td>
                  <td className="p-3 font-mono text-[11px] text-amber-300">Karnataka Excise Act, 1965</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Bihar, Gujarat &amp; Nagaland</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Total Prohibition
                    </span>
                  </td>
                  <td className="p-3 text-neutral-300">Statutory complete prohibition 365 days a year</td>
                  <td className="p-3 font-mono text-[11px] text-amber-300">State Prohibition Acts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Punjab & Chandigarh */}
        <section id="punjab-chandigarh" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <span>4. Punjab &amp; Chandigarh: Strict 24-Hour Closure</span>
          </h2>
          <p>
            In the State of Punjab—the spiritual heartland of Sikhism—Guru Nanak Jayanti is observed with the highest reverence. Under the <strong className="text-white">Punjab Excise Act, 1914</strong> and annual policy directives issued by the Department of Excise and Taxation, 24 November is a strictly enforced statewide dry day.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Store className="h-4 w-4 text-amber-400" />
                <span>Punjab Statewide Scope</span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                All retail liquor vends (L-2, L-14A), country liquor shops, microbreweries, and bars across Amritsar, Ludhiana, Jalandhar, Patiala, Bathinda, Mohali (SAS Nagar), and all 23 districts remain shut from midnight to midnight (00:00 to 24:00 hrs).
              </p>
            </div>
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="h-4 w-4 text-amber-400" />
                <span>UT Chandigarh Administration</span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                The Excise &amp; Taxation Department of Union Territory Chandigarh enforces parallel dry restrictions across Sectors 17, 26, 35, Elante Mall, and all commercial zones. Serving or retailing alcohol anywhere in Chandigarh on 24 November is illegal.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Delhi NCR & Haryana */}
        <section id="delhi-ncr-haryana" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>5. Delhi NCR &amp; Haryana: Government Vends &amp; Pub Rules</span>
          </h2>
          <p>
            In the National Capital Territory of Delhi, the <strong className="text-white">Delhi Excise Department</strong> notifies standing annual dry days pursuant to the <strong className="text-neutral-100">Delhi Excise Act, 2009</strong> and Delhi Excise Rules, 2010. Guru Nanak Jayanti is gazetted as a mandatory calendar closure.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-300">
            <li><strong className="text-white">All Government Corporations Closed:</strong> Over 600 retail vends operated by DTTDC, DSIIDC, DCCWS, and DSCSC remain locked for 24 hours.</li>
            <li><strong className="text-white">Hotel &amp; Restaurant Bars (L-16 / L-17):</strong> Commercial lounges, pubs, and dining bars across Connaught Place, Hauz Khas, Aerocity, and Saket cannot serve liquor.</li>
            <li><strong className="text-white">Haryana NCR (Gurugram &amp; Faridabad):</strong> Under Haryana Excise policy, Gurugram (including Cyber Hub, Sector 29, and Golf Course Road) and Faridabad observe mandatory closures matching Delhi. Traveling across the Delhi-Gurugram border does not offer open retail thekas on 24 November.</li>
          </ul>
        </section>

        {/* Section 6: Uttar Pradesh */}
        <section id="uttar-pradesh-rules" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Store className="h-5 w-5 text-amber-400" />
            <span>6. Uttar Pradesh: All 75 Districts Standing Mandate</span>
          </h2>
          <p>
            In Uttar Pradesh, the state government observes 24 November as a gazetted state dry day across all 75 revenue districts under the <strong className="text-white">Uttar Pradesh Excise Act, 1910</strong>. Whether you are in Noida, Greater Noida, Ghaziabad, Lucknow, Kanpur, Agra, or Varanasi:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
            <li>Retail foreign liquor (IMFL) thekas, beer shops, and country liquor stores remain closed from 00:00 to 24:00 hours.</li>
            <li>Commercial hotel bars (FL-6 / FL-7) and registered social clubs cannot dispense alcoholic drinks.</li>
            <li>Enforcement squads conduct surprise field inspections; selling liquor during a notified dry day attracts heavy administrative penalties, licence suspension, and criminal FIRs under Section 60 of the UP Excise Act.</li>
          </ul>
        </section>

        {/* Section 7: Bars, Clubs, Hotels & Private Stock */}
        <section id="bars-and-hotels" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <span>7. Rules for Bars, Clubs, Restaurants &amp; Private Stock</span>
          </h2>
          <p>
            Citizens and travelers frequently inquire about exemptions on religious dry days. The legal reality across states observing mandatory closure on 24 November:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-1.5">
              <span className="font-semibold text-rose-300 block">Commercial Bars &amp; Pubs</span>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Strictly prohibited from dispensing alcohol. No exceptions apply for happy hours, dining packages, or private parties on licensed premises.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-1.5">
              <span className="font-semibold text-amber-300 block">5-Star &amp; Luxury Hotels</span>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Public bar counters are mandated shut. In certain states, room service for bona fide resident guests is permitted subject to district collector orders.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-1.5">
              <span className="font-semibold text-emerald-300 block">Private Home Consumption</span>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Consuming legally purchased, duty-paid alcohol inside a private residence is permitted, provided personal statutory possession limits are respected.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: How to Check */}
        <section id="how-to-check" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>8. How to Verify Live Status on 24 November</span>
          </h2>
          <p>
            DryCheck India provides real-time verification in Indian Standard Time (IST) across all 36 Indian states and UTs. On 24 November, verify your state&apos;s status instantly:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href="/india/punjab"
              className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-xs font-medium text-amber-400 hover:border-amber-500/40"
            >
              Punjab Live Tracker &rarr;
            </Link>
            <Link
              href="/india/delhi"
              className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-xs font-medium text-amber-400 hover:border-amber-500/40"
            >
              Delhi Live Tracker &rarr;
            </Link>
            <Link
              href="/india/uttar-pradesh"
              className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-xs font-medium text-amber-400 hover:border-amber-500/40"
            >
              Uttar Pradesh Live Tracker &rarr;
            </Link>
            <Link
              href="/india/haryana"
              className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-xs font-medium text-amber-400 hover:border-amber-500/40"
            >
              Haryana Live Tracker &rarr;
            </Link>
            <Link
              href="/india/rajasthan"
              className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-xs font-medium text-amber-400 hover:border-amber-500/40"
            >
              Rajasthan Live Tracker &rarr;
            </Link>
          </div>
        </section>

        {/* Section 9: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>9. Frequently Asked Questions (FAQs) &bull; Guru Nanak Jayanti</span>
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
            <strong className="text-neutral-300">Editorial Disclaimer:</strong> DryCheck India is an independent public-service information utility. We do not promote, facilitate, or sell alcohol. Dry-day orders are promulgated by respective state governments and Union Territory administrations under their constitutional excise powers.
          </p>
        </section>

      </div>
    </article>
  );
}
