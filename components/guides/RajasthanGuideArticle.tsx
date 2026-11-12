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
    { id: 'introduction', label: '1. Introduction & Statutory Framework' },
    { id: 'eight-pm-rule', label: '2. The Strict 8:00 PM Theka Closing Rule' },
    { id: 'gazette-calendar', label: '3. Official Rajasthan 2026 Gazette Dry Days Calendar' },
    { id: 'election-border-rules', label: '4. Elections (Section 135C) & Interstate Border Enforcement' },
    { id: 'cities-covered', label: '5. Cities Covered: Jaipur, Jodhpur, Udaipur, Kota & Beyond' },
    { id: 'mount-abu-pushkar', label: '6. Tourist & Sacred Towns: Mount Abu & Pushkar Rules' },
    { id: 'hotel-bar-timings', label: '7. Heritage Hotel Bar Timings vs Retail Theka Timings' },
    { id: 'drinking-age', label: '8. Minimum Legal Drinking Age (21) & Possession Limits' },
    { id: 'how-to-check', label: '9. How to Verify Real-Time Rajasthan Dry-Day Status' },
    { id: 'faqs', label: '10. Frequently Asked Questions (FAQs)' },
    { id: 'official-sources', label: '11. Official Citations & Regulatory References' },
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
              Need to confirm whether licensed retail shops and bars are open or closed today in Rajasthan? Our real-time tracker evaluates active excise orders across all districts in Indian Standard Time (IST):{' '}
              <Link href="/india/rajasthan" className="underline font-semibold text-white hover:text-amber-300">
                Check Live Rajasthan Dry Day Tracker &rarr;
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
            <span>1. Introduction &amp; Statutory Framework</span>
          </h2>
          <p>
            In Rajasthan, alcohol manufacture, distribution, and retail theka licensing are administered by the{' '}
            <strong className="text-white">Rajasthan Excise Department</strong> under the statutory authority of the{' '}
            <strong className="text-neutral-100">Rajasthan Excise Act, 1950</strong>.
          </p>
          <p>
            Whether you are visiting Jaipur (the Pink City), Jodhpur (the Blue City), Udaipur (the City of Lakes), Kota, Bikaner, or Mount Abu,
            statewide gazetted dry-day circulars and retail operational mandates apply uniformly across all commercial licenses.
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
              Why Retail Wine Shops Close Early Across Rajasthan:
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              While retail liquor stores in most Indian states operate until 10:00 PM or 10:30 PM, Rajasthan enforces a unique statewide policy introduced in 2008:
              <strong className="text-white"> All retail liquor stores (selling IMFL and country liquor) must shutter their operations strictly at 8:00 PM.</strong>
            </p>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Selling or dispensing alcoholic beverages after 8:00 PM is illegal and leads to immediate retail license cancellation. Anyone planning to purchase liquor in Jaipur, Jodhpur, or Udaipur must ensure they arrive before the 8:00 PM evening deadline.
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

        {/* Section 4: Election & Interstate Border Rules */}
        <section id="election-border-rules" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <span>4. Elections (Section 135C) &amp; Interstate Border Enforcement</span>
          </h2>
          <p>
            Beyond standing national and religious holidays, <strong className="text-white">Section 135C of the Representation of the People Act, 1951</strong> mandates a 48-hour dry window prior to the close of polling (and a full counting-day closure) during Lok Sabha, Rajasthan Vidhan Sabha, Municipal, and Panchayati Raj elections. Under the <strong className="text-white">Rajasthan Excise Act, 1950</strong>, District Collectors frequently extend this restriction up to an 8-kilometre or 3-kilometre belt along adjoining districts when neighbouring states (such as Haryana, Uttar Pradesh, or Madhya Pradesh) go to polls.
          </p>
          <p className="text-xs text-neutral-300">
            <strong className="text-white">Important Gujarat &amp; Haryana Border Caution:</strong> Because Gujarat enforces total statutory prohibition, Rajasthan excise and Gujarat police run strict highway nakabandi along Abu Road, Udaipur–Shamlaji, and Banswara borders. Conversely, bringing lower-priced Haryana or Chandigarh liquor into Jaipur, Alwar, or Bikaner without a Rajasthan excise permit is an offence punishable with vehicle seizure and prosecution under Section 19/54 of the Rajasthan Excise Act.
          </p>
        </section>

        {/* Section 5: Cities Covered */}
        <section id="cities-covered" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <MapPin className="h-5 w-5 text-amber-400" />
            <span>5. Cities Covered: Jaipur, Jodhpur, Udaipur, Kota &amp; Beyond</span>
          </h2>
          <p>
            Rajasthan state excise regulations and dry-day mandates apply uniformly across all major cities and 50 administrative districts:
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
            Whether you are in Jaipur, Jodhpur, Udaipur, or Kota, all municipal regions follow identical statewide gazette notifications and the uniform 8:00 PM retail vend closing curfew.
          </p>
        </section>

        {/* Section 6: Mount Abu & Pushkar */}
        <section id="mount-abu-pushkar" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <span>6. Tourist &amp; Sacred Towns: Mount Abu &amp; Pushkar Rules</span>
          </h2>
          <p>
            Many tourists mistakenly assume Mount Abu is under total alcohol prohibition. Licensed retail stores do operate in Mount Abu, subject to the statewide 8:00 PM closing rule. In addition:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
            <li><strong className="text-white">Nakki Lake &amp; Sunset Point:</strong> Consuming alcohol in public tourist spaces is strictly banned. Violations trigger police detainment and significant administrative fines.</li>
            <li><strong className="text-white">Pushkar Holy Town:</strong> In consideration of the spiritual sanctity of the Brahma Temple and the holy lake, alcohol and non-vegetarian food are strictly prohibited within designated central pilgrim zones.</li>
          </ul>
        </section>

        {/* Section 7: Heritage Hotels vs Theka Timings */}
        <section id="hotel-bar-timings" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Beer className="h-5 w-5 text-amber-400" />
            <span>7. Heritage Hotel Bar Timings vs Retail Theka Timings</span>
          </h2>
          <p>
            While retail liquor stores shutter at 8:00 PM, licensed heritage hotels, 4-star/5-star luxury resorts, and approved hotel dining lounges are authorized to serve resident guests and dining patrons until <strong className="text-white font-mono">11:00 PM or 12:00 Midnight</strong>. However, on official gazetted dry days, hotel bars must also suspend alcohol service completely.
          </p>
        </section>

        {/* Section 8: Drinking Age */}
        <section id="drinking-age" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>8. Minimum Legal Drinking Age (21) &amp; Possession Limits</span>
          </h2>
          <p>
            The statutory minimum legal drinking age in Rajasthan is <strong className="text-white font-mono">21 years</strong>.
            For personal consumption, an individual without a specialized commercial excise permit may possess up to 12 standard bottles (750ml IMFL or beer) of Rajasthan-duty-paid liquor—always keep the printed excise retail bill handy when traveling between districts.
          </p>
        </section>

        {/* Section 9: How to Check */}
        <section id="how-to-check" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>9. How to Verify Real-Time Rajasthan Dry-Day Status</span>
          </h2>
          <p>
            Before planning destination weddings, desert safaris, or retail purchases in Rajasthan, verify compliance with three quick checks:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs text-neutral-300">
            <li>
              <strong className="text-white">Check Today &amp; Tomorrow Live Status:</strong> Visit our{' '}
              <Link href="/india/rajasthan" className="text-amber-400 font-semibold underline hover:text-white">
                Live Rajasthan Dry Day Tracker &rarr;
              </Link>{' '}
              for date-specific status in Indian Standard Time (IST).
            </li>
            <li>
              <strong className="text-white">Plan Retail Purchases Before 8:00 PM IST:</strong> Even on open days, composite liquor shops across Rajasthan legally lock shutters at 8:00 PM sharp—after 8:00 PM, only licensed hotel bars and restaurants remain open.
            </li>
            <li>
              <strong className="text-white">Confirm Sacred Zone &amp; Border Rules:</strong> If hosting events near Pushkar, Nathdwara, or border towns adjoining Gujarat, confirm municipal perimeter restrictions directly with your venue or District Excise Office.
            </li>
          </ol>
        </section>

        {/* Section 10: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>10. Frequently Asked Questions (FAQs) &bull; Rajasthan</span>
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

        {/* Section 11: Official Sources */}
        <section id="official-sources" className="space-y-4 border-t border-neutral-800 pt-6">
          <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">
            11. Official Citations &amp; Regulatory References
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
            <strong className="text-neutral-300">Editorial Disclaimer:</strong> DryCheck India is an independent public-service reference platform and does not promote or facilitate alcohol sales. Festival timings, election border curfews, and dry-day declarations remain governed by the Rajasthan Excise Department and local District Collectors.
          </p>
        </section>

      </div>
    </article>
  );
}