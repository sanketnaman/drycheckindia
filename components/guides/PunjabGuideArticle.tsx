import Link from 'next/link';
import { Guide } from '@/lib/guides';
import {
  Calendar,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Building,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Scale,
  Store,
} from 'lucide-react';

interface Props {
  guide: Guide;
}

export default function PunjabGuideArticle({ guide }: Props) {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8">
      {/* Editorial Header */}
      <header className="mb-8 border-b border-neutral-800 pb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            <Scale className="h-3.5 w-3.5" />
            Punjab Excise Act 1914 &amp; Policy
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
            <MapPin className="h-3.5 w-3.5" />
            Punjab &amp; UT Chandigarh
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
            <Clock className="h-3.5 w-3.5" />
            {guide.readingTimeMinutes} min comprehensive read
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {guide.h1Title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
          Alcohol retail and distribution in the state of Punjab is governed by the statutory framework of the venerable <strong>Punjab Excise Act, 1914</strong> and annual state excise policy circulars. Whether you are checking retail wine shop (theka) operating hours in Ludhiana, Amritsar, Jalandhar, or Mohali, verifying gazetted religious dry days like Guru Nanak Jayanti and Guru Gobind Singh Jayanti, or understanding the strict prohibition on bringing cheaper liquor across the Chandigarh border, this guide provides the authoritative legal breakdown.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-xs text-neutral-400">
          <div>
            <span className="text-neutral-500 block">Department</span>
            <span className="font-semibold text-neutral-200">Department of Excise &amp; Taxation, Government of Punjab</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Last Fact-Checked</span>
            <span className="font-semibold text-amber-400">{guide.lastReviewedDate}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Statutory Basis</span>
            <span className="font-semibold text-neutral-200">Punjab Excise Act, 1914 &amp; Punjab Liquor License Rules, 1956</span>
          </div>
        </div>
      </header>

      {/* Retail Theka Operating Hours & Age Requirements */}
      <section className="my-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mb-4">
          <Store className="h-5 w-5 text-amber-400" />
          <span>Punjab Theka Timings, License Types &amp; Legal Drinking Age</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-neutral-400 block mb-1 text-[11px] font-mono uppercase">
              Retail Theka Operating Hours
            </span>
            <span className="text-base font-bold text-white block">9:00 AM – 11:00 PM</span>
            <p className="mt-2 text-neutral-400 leading-relaxed text-[11px]">
              Applicable across all municipal corporations (Ludhiana, Amritsar, Jalandhar, Patiala, Bathinda, SAS Nagar Mohali). Rural vends typically close by 10:00 PM in winter.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-neutral-400 block mb-1 text-[11px] font-mono uppercase">
              Retail Vend Classifications
            </span>
            <span className="text-base font-bold text-amber-400 block">L-2 &amp; L-14A</span>
            <p className="mt-2 text-neutral-400 leading-relaxed text-[11px]">
              <strong>L-2</strong> licenses authorize Indian Made Foreign Liquor (IMFL), beer, and imported wine. <strong>L-14A</strong> licenses authorize country liquor (Desi Sharab).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-neutral-400 block mb-1 text-[11px] font-mono uppercase">
              Statutory Legal Drinking Age
            </span>
            <span className="text-base font-bold text-rose-400 block">25 Years Minimum</span>
            <p className="mt-2 text-neutral-400 leading-relaxed text-[11px]">
              Under Section 29 of the Punjab Excise Act, 1914, selling liquor to or employment of individuals under 25 years of age is strictly prohibited.
            </p>
          </div>
        </div>
      </section>

      {/* Official 2026 Standing Dry Days List in Punjab */}
      <section className="my-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Gazetted Dry Days Calendar 2026 in Punjab
        </h2>
        <p className="text-sm text-neutral-300 mb-6">
          On gazetted dry days, all licensed retail liquor vends (L-2, L-14A), hotel bars (L-3/L-4/L-5), microbreweries (L-10C), and clubs in Punjab remain completely closed under Section 54 of the Punjab Excise Act:
        </p>

        <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-800/80 text-neutral-200 uppercase tracking-wider text-[11px] font-mono">
              <tr>
                <th className="p-3.5 sm:p-4">Date (2026)</th>
                <th className="p-3.5 sm:p-4">Occasion / Observance</th>
                <th className="p-3.5 sm:p-4">Scope</th>
                <th className="p-3.5 sm:p-4">Retail Theka &amp; Bar Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">26 January 2026</td>
                <td className="p-3.5 sm:p-4">Republic Day</td>
                <td className="p-3.5 sm:p-4">Statewide / Pan-India</td>
                <td className="p-3.5 sm:p-4 text-rose-400 font-semibold">CLOSED (Full 24 Hours)</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">23 March 2026</td>
                <td className="p-3.5 sm:p-4">Shaheed Bhagat Singh Martyrdom Day</td>
                <td className="p-3.5 sm:p-4">State Gazette Notice</td>
                <td className="p-3.5 sm:p-4 text-rose-400 font-semibold">CLOSED (Designated Districts)</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">31 March 2026</td>
                <td className="p-3.5 sm:p-4">Mahavir Jayanti</td>
                <td className="p-3.5 sm:p-4">Statewide</td>
                <td className="p-3.5 sm:p-4 text-rose-400 font-semibold">CLOSED</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">15 August 2026</td>
                <td className="p-3.5 sm:p-4">Independence Day</td>
                <td className="p-3.5 sm:p-4">Statewide / Pan-India</td>
                <td className="p-3.5 sm:p-4 text-rose-400 font-semibold">CLOSED (Full 24 Hours)</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">2 October 2026</td>
                <td className="p-3.5 sm:p-4">Gandhi Jayanti</td>
                <td className="p-3.5 sm:p-4">Statewide / Pan-India</td>
                <td className="p-3.5 sm:p-4 text-rose-400 font-semibold">CLOSED (Full 24 Hours)</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">24 November 2026</td>
                <td className="p-3.5 sm:p-4">Guru Nanak Jayanti (Prakash Parv)</td>
                <td className="p-3.5 sm:p-4">Statewide Mandatory</td>
                <td className="p-3.5 sm:p-4 text-rose-400 font-semibold">CLOSED (Full 24 Hours)</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Local Polling Dates</td>
                <td className="p-3.5 sm:p-4">Panchayat / Assembly Elections</td>
                <td className="p-3.5 sm:p-4">Constituency &amp; 3km Border Belt</td>
                <td className="p-3.5 sm:p-4 text-rose-400 font-semibold">CLOSED (48 Hours Pre-Poll)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 26: Gram Panchayat Liquor Ban Resolution */}
      <section className="my-10 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mb-3">
          <ShieldCheck className="h-5 w-5 text-amber-400" />
          <span>Village Panchayat Powers: Section 26 of Punjab Panchayati Raj Act</span>
        </h2>
        <div className="text-xs sm:text-sm text-neutral-300 space-y-3 leading-relaxed">
          <p>
            A unique democratic safeguard in Punjab’s excise administration is embedded in <strong>Section 26 of the Punjab Panchayati Raj Act, 1994</strong>.
          </p>
          <p>
            Under this provision, if a rural Gram Sabha passes a formal resolution supported by a two-thirds majority of residents before the 30th of September of an excise year, no licensed retail liquor vend (L-2 or L-14A) can be allocated or opened within the boundaries of that village for the subsequent financial year. Hundreds of villages across Sangrur, Moga, and Hoshiarpur actively utilize this statutory right to enforce local village-level prohibition.
          </p>
        </div>
      </section>

      {/* Chandigarh Border Transit & Section 61 Penalties */}
      <section className="my-10 rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-rose-300 flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-rose-400" />
          <span>Carrying Liquor Across Chandigarh Border into Punjab: Strict Warning</span>
        </h2>
        <div className="text-xs sm:text-sm text-neutral-300 space-y-3 leading-relaxed">
          <p>
            Because Union Territory of Chandigarh levies lower excise tariffs than the State of Punjab, commuters frequently attempt to transport cheaper liquor from Chandigarh into Mohali, Kharar, Zirakpur, or Patiala.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
            <li>
              <strong>Possession Limits:</strong> Bringing liquor bottles marked <em>&quot;For Sale in Chandigarh Only&quot;</em> across the Punjab border without a valid interstate transit pass is strictly illegal.
            </li>
            <li>
              <strong>Highway Excise Naka Checking:</strong> Joint flying squads of the Punjab Excise Department and Punjab Police maintain static checkpoints along the Chandigarh-Mohali border (Housing Board Chowk, Zirakpur barrier, and Kharar flyover).
            </li>
            <li>
              <strong>Statutory Penalties:</strong> Under Section 61(1) of the Punjab Excise Act, 1914, possession of non-duty paid or smuggled liquor is a cognizable offense punishable with rigorous imprisonment of up to 3 years, heavy pecuniary fines, and immediate confiscation of the transport vehicle.
            </li>
          </ul>
        </div>
      </section>

      {/* Related Legal Guides */}
      <section className="my-10 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-white mb-4">
          Related State &amp; Festival Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <Link
            href="/guides/guru-nanak-jayanti-2026-dry-day"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Guru Nanak Jayanti 2026 (24 Nov)</span>
              <span className="text-neutral-400 text-[11px]">Punjab, Delhi NCR &amp; Haryana mandatory closure rules</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/delhi-dry-days-2026"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Delhi Dry Days 2026 &amp; Theka Timings</span>
              <span className="text-neutral-400 text-[11px]">DTTDC/DSIIDC retail vends &amp; NCR transit quotas</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/rajasthan-dry-days-2026"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Rajasthan Dry Days &amp; 8 PM Curfew</span>
              <span className="text-neutral-400 text-[11px]">Strict early retail curfew &amp; RSBCL rules</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/november-dry-days-2026"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">November Dry Days 2026 All-India</span>
              <span className="text-neutral-400 text-[11px]">Complete national calendar &amp; festival analysis</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="my-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-amber-400" />
          <span>Frequently Asked Questions &bull; Punjab Excise</span>
        </h2>

        <div className="space-y-3">
          {guide.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5"
            >
              <h3 className="text-sm sm:text-base font-semibold text-white flex items-start gap-2">
                <span className="text-amber-400 font-mono font-bold">Q{idx + 1}.</span>
                <span>{faq.question}</span>
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Tracker CTA */}
      <div className="my-8 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 to-neutral-900 p-6 text-center">
        <h3 className="text-lg font-bold text-white">Need Live Today/Tomorrow Dry Day Verification?</h3>
        <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
          DryCheck tracks real-time excise notifications across all 36 Indian states and UTs in Indian Standard Time (IST).
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs hover:bg-amber-300 transition-colors"
          >
            Check Live IST Status Today
          </Link>
          <Link
            href="/india/punjab"
            className="px-5 py-2.5 rounded-xl bg-neutral-800 text-white font-semibold text-xs hover:bg-neutral-700 transition-colors"
          >
            View Punjab State Live Hub
          </Link>
        </div>
      </div>
    </article>
  );
}
