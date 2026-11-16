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
  Plane,
  Car,
  FileText,
  BadgeAlert,
} from 'lucide-react';

interface Props {
  guide: Guide;
}

export default function GoaLiquorGuideArticle({ guide }: Props) {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8">
      {/* Editorial Header */}
      <header className="mb-8 border-b border-neutral-800 pb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            Official Excise &amp; Transit Guide
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
            <Building className="h-3.5 w-3.5" />
            Goa State &amp; Checkposts
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
          Goa is internationally famous for its relaxed lifestyle, beach culture, and significantly lower excise duty on beer, wine, and spirits. However, misconceptions regarding carrying alcohol out of Goa by flight, train, or personal vehicle lead thousands of travellers each year to heavy fines, bottle confiscation, and checkpost detentions. Here is the authoritative guide to Goa&apos;s standing dry days, the statutory 2-bottle tourist permit (Form 25), airline baggage limits, and border enforcement rules.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-xs text-neutral-400">
          <div>
            <span className="text-neutral-500 block">Regulatory Department</span>
            <span className="font-semibold text-neutral-200">Office of the Commissioner of Excise, Government of Goa</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Last Fact-Checked</span>
            <span className="font-semibold text-amber-400">{guide.lastReviewedDate}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Statutory Basis</span>
            <span className="font-semibold text-neutral-200">Goa Excise Duty Act, 1964 &amp; BCAS Flying Regulations</span>
          </div>
        </div>
      </header>

      {/* Quick Summary Card: Standing Dry Days in Goa */}
      <section className="my-8 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 sm:p-6 backdrop-blur">
        <h2 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-amber-400" />
          <span>Standing Dry Days in Goa: Only 3 Days Annually</span>
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-200 leading-relaxed">
          <p>
            Unlike northern and southern states that observe 10 to 20 religious dry days, the Government of Goa enforces only <strong>three mandatory statewide dry days</strong> each year under standard excise circulars:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-amber-400 font-bold block mb-1">26 January</span>
              <span className="text-neutral-300">Republic Day (Mandatory statewide closure of all retail thekas &amp; bars)</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-amber-400 font-bold block mb-1">15 August</span>
              <span className="text-neutral-300">Independence Day (Pan-India statutory closure)</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-amber-400 font-bold block mb-1">2 October</span>
              <span className="text-neutral-300">Gandhi Jayanti (Mandatory national dry observance)</span>
            </div>
          </div>
          <p className="text-xs text-neutral-400 mt-2">
            * Note: Temporary 48-hour dry curfews are additionally enforced in specific panchayat or municipal wards during local or legislative elections pursuant to Section 135C of the Representation of the People Act, 1951.
          </p>
        </div>
      </section>

      {/* The 2-Bottle Permit Rule (Form 25) Explained */}
      <section className="my-10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="h-6 w-6 text-amber-400" />
          <span>The Goa Liquor Transit Permit (Form 25) Explained</span>
        </h2>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Under the Goa Excise Duty Rules, 1964, any tourist or passenger desiring to transport legally purchased Indian Made Foreign Liquor (IMFL) or imported foreign liquor out of Goa must obtain a <strong>Transit Permit (officially known as Form 25 / Liquor Transport Permit)</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Permit Entitlement &amp; Costs</span>
            </h3>
            <ul className="text-xs text-neutral-300 space-y-2 list-disc pl-4">
              <li>
                <strong>Authorized Quantity:</strong> Maximum <strong>2 bottles of IMFL/foreign liquor</strong> (up to 750ml each) or 1 bottle of liquor and 1 bottle of wine per valid permit.
              </li>
              <li>
                <strong>How to Obtain:</strong> Any licensed Goa retail wine merchant can issue the permit at the cash billing counter upon presenting government photo ID (Aadhaar, Passport, Driving License).
              </li>
              <li>
                <strong>Official Fee:</strong> The statutory permit fee is approximately ₹20 to ₹25 per permit. Ensure the shopkeeper prints the serial number and stamps the permit with their excise retail license.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <BadgeAlert className="h-4 w-4 text-rose-400" />
              <span>Interstate Legal Reality Check</span>
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong>Crucial Warning:</strong> While a Form 25 permit makes possession legal within Goa and satisfies airport security screeners, neighbouring states (Maharashtra and Karnataka) operate under their own state excise laws. Maharashtra state excise officers at Patradevi or Banda checkposts do not automatically recognize Goa permits unless destination state duties have been discharged.
            </p>
          </div>
        </div>
      </section>

      {/* Flight, Train & Road Transit Rules Matrix */}
      <section className="my-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Carrying Alcohol from Goa: By Flight, Train &amp; Road Checkposts
        </h2>

        <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-800/80 text-neutral-200 uppercase tracking-wider text-[11px] font-mono">
              <tr>
                <th className="p-3.5 sm:p-4">Transport Mode</th>
                <th className="p-3.5 sm:p-4">Permitted Limit</th>
                <th className="p-3.5 sm:p-4">Required Documents</th>
                <th className="p-3.5 sm:p-4">Border Check / Risk Factor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white flex items-center gap-2">
                  <Plane className="h-4 w-4 text-amber-400" />
                  <span>Domestic Flight (Dabolim / Mopa)</span>
                </td>
                <td className="p-3.5 sm:p-4 text-emerald-300 font-medium">
                  Up to 5 Litres in Check-in Baggage (24%–70% ABV)
                </td>
                <td className="p-3.5 sm:p-4">
                  Retail Cash Invoice + Goa Excise Permit (Form 25)
                </td>
                <td className="p-3.5 sm:p-4 text-neutral-300">
                  Zero risk at Goa airports if packed in secure leak-proof retail packaging in checked bags. Never in cabin baggage.
                </td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white flex items-center gap-2">
                  <Car className="h-4 w-4 text-amber-400" />
                  <span>Road (Personal Car / Bus)</span>
                </td>
                <td className="p-3.5 sm:p-4 text-amber-300 font-medium">
                  Max 2 bottles with Form 25
                </td>
                <td className="p-3.5 sm:p-4">
                  Form 25 Permit + Retail Invoice
                </td>
                <td className="p-3.5 sm:p-4 text-rose-300">
                  High Risk: Maharashtra &amp; Karnataka checkposts (Patradevi, Kankavli, Majali) actively inspect car boots. Commercial quantities lead to arrest.
                </td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white flex items-center gap-2">
                  <Building className="h-4 w-4 text-amber-400" />
                  <span>Indian Railways (Konkan Railway)</span>
                </td>
                <td className="p-3.5 sm:p-4 text-rose-300 font-medium">
                  PROHIBITED under Railway Act
                </td>
                <td className="p-3.5 sm:p-4">
                  No permits valid on trains
                </td>
                <td className="p-3.5 sm:p-4 text-rose-300">
                  Section 164/165 of the Indian Railways Act prohibits carriage of inflammable items/liquor in passenger carriages. RPF/excise checks occur at Madgaon &amp; Thivim.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Flight Baggage Rules under BCAS */}
      <section className="my-10 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mb-3">
          <Plane className="h-5 w-5 text-amber-400" />
          <span>Aviation Rules: How to Fly with Alcohol from Goa</span>
        </h2>
        <div className="text-xs sm:text-sm text-neutral-300 space-y-3 leading-relaxed">
          <p>
            Under Bureau of Civil Aviation Security (BCAS) and Directorate General of Civil Aviation (DGCA) regulations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li>
              <strong>Cabin Baggage Prohibition:</strong> You cannot carry alcohol bottles in cabin hand-baggage due to liquids, aerosols, and gels (LAGs) limits (maximum 100ml containers only). All alcohol must go into <strong>registered check-in luggage</strong>.
            </li>
            <li>
              <strong>Alcohol Content Limits:</strong> Alcoholic beverages containing between 24% and 70% ABV (alcohol by volume) are permitted up to <strong>5 litres per passenger</strong> in check-in baggage, provided they remain in unopened commercial retail packaging.
            </li>
            <li>
              <strong>Beverages over 70% ABV:</strong> High-proof spirits exceeding 70% ABV (140 proof) are hazardous dangerous goods and completely prohibited on domestic aircraft.
            </li>
            <li>
              <strong>Beer &amp; Mild Wine:</strong> Alcoholic beverages containing 24% or less ABV have no specific DGCA quantity limitation other than standard airline passenger baggage weight allowances.
            </li>
          </ul>
        </div>
      </section>

      {/* Checkpost Penalties & Confiscation Warning */}
      <section className="my-10 rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-rose-300 flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-rose-400" />
          <span>Border Checkpost Penalties: Maharashtra &amp; Karnataka</span>
        </h2>
        <div className="text-xs sm:text-sm text-neutral-300 space-y-3 leading-relaxed">
          <p>
            Excise border checkposts at <strong>Patradevi (Goa-Maharashtra)</strong>, <strong>Dodamarg</strong>, and <strong>Majali (Goa-Karnataka)</strong> are heavily staffed with enforcement flying squads:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-300">
            <li>
              If caught transporting commercial cartons (more than personal quotas) without a destination state transit pass, state excise squads will confiscate the liquor and seize the transport vehicle.
            </li>
            <li>
              Under Section 65 of the Maharashtra Prohibition Act, 1949, illegal importation is punishable with up to 5 years imprisonment and compounding fines starting at ₹25,000.
            </li>
            <li>
              Under Sections 32 and 34 of the Karnataka Excise Act, 1965, illegal interstate liquor trafficking is a non-bailable offense.
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
            href="/guides/christmas-2026-dry-day"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Christmas 2026: 25 Dec Rules</span>
              <span className="text-neutral-400 text-[11px]">Goa party hours, open retail stores &amp; tourist guidelines</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/new-year-2027-dry-day"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">New Year 2027: 31 Dec Rules</span>
              <span className="text-neutral-400 text-[11px]">Extended night bar timings &amp; metro celebration permits</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/maharashtra-dry-days-2026"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Maharashtra Dry Days 2026</span>
              <span className="text-neutral-400 text-[11px]">Mumbai liquor permits, FL-II vends &amp; dry districts</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/karnataka-dry-days-2026"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Karnataka Dry Days 2026</span>
              <span className="text-neutral-400 text-[11px]">Bengaluru pub timings &amp; KSBCL border checks</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="my-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-amber-400" />
          <span>Frequently Asked Questions &bull; Goa Liquor Laws</span>
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
            href="/india/goa"
            className="px-5 py-2.5 rounded-xl bg-neutral-800 text-white font-semibold text-xs hover:bg-neutral-700 transition-colors"
          >
            View Goa State Live Hub
          </Link>
        </div>
      </div>
    </article>
  );
}
