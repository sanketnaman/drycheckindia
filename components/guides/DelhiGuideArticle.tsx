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

interface DelhiGuideArticleProps {
  guide: Guide;
}

export default function DelhiGuideArticle({ guide }: DelhiGuideArticleProps) {
  const tocItems = [
    { id: 'introduction', label: '1. Introduction: Is Today a Dry Day in Delhi?' },
    { id: 'gazette-calendar', label: '2. Official Delhi 2026 Gazette Dry Days Calendar' },
    { id: 'operating-hours', label: '3. Normal Theka & Bar Timings in Delhi' },
    { id: 'ncr-border-rules', label: '4. The NCR Border Dilemma: Gurugram & Noida Transit Ban' },
    { id: 'cities-localities', label: '5. Delhi NCR Micro-Markets & Localities Covered' },
    { id: 'possession-age-limits', label: '6. Legal Drinking Age (21) & Personal Possession Limits' },
    { id: 'how-to-check', label: '7. How to Check If Tomorrow is Dry Day in Delhi' },
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
          Delhi Dry Days 2026
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
            Region: National Capital Territory of Delhi
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
              Need Instant Status for Today or Tomorrow in Delhi?
            </h2>
            <p className="leading-relaxed text-amber-200/90">
              If you need to verify whether <strong className="text-white">&ldquo;is today a dry day in delhi&rdquo;</strong> or check{' '}
              <strong className="text-white">&ldquo;dry day in delhi tomorrow&rdquo;</strong>, our real-time IST engine tracks live gazette status across all 11 revenue districts and micro-markets in Delhi:{' '}
              <Link href="/india/delhi" className="underline font-semibold text-white hover:text-amber-300">
                Check Live Delhi Dry Day Today Tracker &rarr;
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
            <span>1. Introduction: Is Today a Dry Day in Delhi?</span>
          </h2>
          <p>
            Every day, thousands of consumers search online to find out whether <strong className="text-white">&ldquo;is today a dry day in delhi&rdquo;</strong> or what the current{' '}
            <strong className="text-white">&ldquo;delhi theka timing today&rdquo;</strong> are. In the National Capital Territory of Delhi (NCT), alcoholic beverage sales, excise duties, and vend licensing are administered by the{' '}
            <strong className="text-white">Department of Excise, Entertainment &amp; Luxury Tax, Government of NCT of Delhi</strong> under the statutory provisions of the{' '}
            <strong className="text-neutral-100">Delhi Excise Act, 2009</strong>.
          </p>
          <p>
            In Delhi, retail liquor distribution is managed exclusively through four state government corporations:{' '}
            <strong className="text-neutral-100">DTTDC, DSIIDC, DCCWS, and DSCSC</strong>. Whether you are in New Delhi, South Delhi, Connaught Place,
            Dwarka, Rohini, Saket, or Lajpat Nagar, statutory dry-day notifications apply uniformly across all government vends and commercial hospitality venues.
          </p>
          <p>
            If you need to confirm whether <strong className="text-white">&ldquo;is tomorrow dry day in delhi&rdquo;</strong>, this legal guide provides the complete 2026 gazetted dry-day calendar, retail store operational hours, and the strict border transit laws governing travel between Delhi, Gurugram (Haryana), and Noida (Uttar Pradesh).
          </p>
        </section>

        {/* Section 2: Gazette Calendar */}
        <section id="gazette-calendar" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>2. Official Delhi 2026 Gazette Dry Days Calendar</span>
          </h2>
          <p>
            The Delhi Excise Department notifies mandatory dry days through standing gazette orders each year. On these dates, all government retail vends (thekas), departmental liquor stores, and commercial restaurant bars remain strictly closed:
          </p>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300">
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Day</th>
                  <th className="p-3 font-semibold">Occasion / Festival</th>
                  <th className="p-3 font-semibold">Scope in Delhi</th>
                  <th className="p-3 font-semibold">Closure Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">26 January 2026</td>
                  <td className="p-3 text-neutral-300">Monday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Republic Day</strong></td>
                  <td className="p-3 text-neutral-300">All 11 Districts of Delhi</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory Pan-India
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">30 January 2026</td>
                  <td className="p-3 text-neutral-300">Friday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Martyrs&apos; Day (Mahatma Gandhi Death Anniversary)</strong></td>
                  <td className="p-3 text-neutral-300">Statewide NCT Delhi</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Gazetted Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">15 August 2026</td>
                  <td className="p-3 text-neutral-300">Saturday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Independence Day</strong></td>
                  <td className="p-3 text-neutral-300">All 11 Districts of Delhi</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory Pan-India
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">02 October 2026</td>
                  <td className="p-3 text-neutral-300">Friday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Mahatma Gandhi Jayanti</strong></td>
                  <td className="p-3 text-neutral-300">All 11 Districts of Delhi</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory Pan-India
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">20 October 2026</td>
                  <td className="p-3 text-neutral-300">Tuesday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Dussehra (Vijayadashami)</strong></td>
                  <td className="p-3 text-neutral-300">NCT Delhi</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Religious Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">26 October 2026</td>
                  <td className="p-3 text-neutral-300">Monday</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Maharishi Valmiki Jayanti</strong></td>
                  <td className="p-3 text-neutral-300">NCT Delhi</td>
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
                  <td className="p-3 text-neutral-300">All 11 Districts of Delhi</td>
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
                  <td className="p-3 text-neutral-300">NCT Delhi</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Religious Dry Day
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Operating Hours */}
        <section id="operating-hours" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Store className="h-5 w-5 text-amber-400" />
            <span>3. Normal Theka &amp; Bar Timings in Delhi</span>
          </h2>
          <p>
            Private retail liquor stores are not permitted in Delhi; all vends are run by government corporations. Regular operating schedules are as follows:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Store className="h-4 w-4 text-amber-400" />
                <span>Retail Liquor Vends (Thekas)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong className="text-white font-mono">10:00 AM to 10:00 PM</strong>. Delhi&apos;s 600+ government vends shut down operations strictly at 10:00 PM. Vending or distributing alcohol past 10:00 PM is strictly prohibited under Delhi excise law.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Beer className="h-4 w-4 text-amber-400" />
                <span>Licensed Bars, Pubs &amp; Hotel Lounges</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong className="text-white font-mono">11:00 AM to 1:00 AM</strong> (L-17/L-18 licenses). Five-star and luxury hotel establishments with specialized excise endorsements may operate until 3:00 AM.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: The NCR Border Dilemma */}
        <section id="ncr-border-rules" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-rose-400" />
            <span>4. The NCR Border Dilemma: Gurugram &amp; Noida Transit Ban</span>
          </h2>

          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4 sm:p-5 text-rose-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-2 text-xs sm:text-sm">
                <h3 className="text-sm sm:text-base font-bold text-rose-300">
                  CRITICAL LEGAL WARNING: Bringing Alcohol from Haryana or UP into Delhi is Illegal
                </h3>
                <p className="leading-relaxed text-rose-200/90">
                  During dry days in Delhi, residents frequently contemplate crossing into Gurugram (Haryana) or Noida (Uttar Pradesh) to procure liquor.
                  However, under <strong className="text-white">Section 33 of the Delhi Excise Act, 2009</strong>, transporting alcohol across state lines into Delhi without a specific Delhi excise permit is a cognizable criminal offence.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-rose-200">
                  <li>Border checkpoints (Sirhaul border, Aya Nagar, DND Flyway, Kalindi Kunj) feature active excise surveillance and vehicle inspections.</li>
                  <li>Offenders face immediate confiscation of liquor, vehicle impoundment, and <strong className="text-white">penalties of up to 3 years imprisonment or fines up to ₹1,00,000</strong>.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Localities Covered */}
        <section id="cities-localities" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <MapPin className="h-5 w-5 text-amber-400" />
            <span>5. Delhi NCR Micro-Markets &amp; Localities Covered</span>
          </h2>
          <p>
            Delhi&apos;s official dry day notifications and excise regulations apply uniformly across all 11 revenue districts and commercial centres:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {[
              'New Delhi',
              'South Delhi',
              'Connaught Place',
              'Saket',
              'Hauz Khas',
              'Dwarka',
              'Rohini',
              'Karol Bagh',
              'Lajpat Nagar',
              'Mayur Vihar',
              'Vasant Kunj',
              'Chandni Chowk',
            ].map((loc) => (
              <div
                key={loc}
                className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-950 text-center text-xs text-neutral-200 font-medium"
              >
                {loc}
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-400 pt-1">
            Retail vends and hospitality establishments across all these zones adhere strictly to gazetted dry-day closures and the 10:00 PM operational cutoff.
          </p>
        </section>

        {/* Section 6: Possession & Age Limits */}
        <section id="possession-age-limits" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>6. Legal Drinking Age (21) &amp; Personal Possession Limits</span>
          </h2>
          <p>
            The statutory legal drinking age in Delhi is <strong className="text-white">21 years</strong>. Selling or serving alcohol to any individual under 21 is a punishable offence under Delhi excise law.
          </p>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Personal Individual Possession Limits in Delhi:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
              <li><strong className="text-white">Indian Made Foreign Liquor (IMFL) / Spirits:</strong> Maximum 9 Litres per individual</li>
              <li><strong className="text-white">Beer, Cider &amp; Mild Alcopop:</strong> Maximum 18 Litres per individual</li>
              <li><strong className="text-white">Wine:</strong> Maximum 18 Litres per individual</li>
            </ul>
          </div>
        </section>

        {/* Section 7: How to Check */}
        <section id="how-to-check" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>7. How to Check If Tomorrow is Dry Day in Delhi</span>
          </h2>
          <p>
            To verify whether retail liquor vends and commercial bars are open today or will remain closed tomorrow, consult our real-time tracker:{' '}
            <Link href="/india/delhi" className="text-amber-400 font-semibold underline hover:text-white">
              Check Delhi Real-Time Status &rarr;
            </Link>
          </p>
        </section>

        {/* Section 8: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>8. Frequently Asked Questions (FAQs) &bull; Delhi Dry Days</span>
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