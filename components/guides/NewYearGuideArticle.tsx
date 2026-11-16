import Link from 'next/link';
import { Guide } from '@/lib/guides';
import {
  Calendar,
  Clock,
  ShieldCheck,
  Building,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  PartyPopper,
  AlertTriangle,
} from 'lucide-react';

interface Props {
  guide: Guide;
}

export default function NewYearGuideArticle({ guide }: Props) {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8">
      {/* Editorial Header */}
      <header className="mb-8 border-b border-neutral-800 pb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Confirmed: Open Across All Metros
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
            <Calendar className="h-3.5 w-3.5" />
            31 Dec 2026 &amp; 1 Jan 2027
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
          Every year on 31 December, viral WhatsApp forwards and social media posts spark rumors claiming that liquor shops and bars will be closed for New Year celebrations. Here is the direct, verified legal fact: <strong>31 December is NEVER a dry day in any open Indian state or Union Territory.</strong> In fact, state governments actively grant extended operating hours and special commercial hospitality licenses until 1:00 AM, 3:00 AM, or 5:00 AM.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-xs text-neutral-400">
          <div>
            <span className="text-neutral-500 block">Editorial Verification</span>
            <span className="font-semibold text-neutral-200">State Excise Gazettes &bull; New Year 2027 Orders</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Last Fact-Checked</span>
            <span className="font-semibold text-amber-400">{guide.lastReviewedDate}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Statutory Source</span>
            <span className="font-semibold text-neutral-200">State Excise Departments &amp; Police Commissioners</span>
          </div>
        </div>
      </header>

      {/* Quick Verdict Summary */}
      <section className="my-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 sm:p-6 backdrop-blur">
        <h2 className="text-lg sm:text-xl font-bold text-emerald-300 flex items-center gap-2">
          <PartyPopper className="h-5 w-5 text-emerald-400" />
          <span>Quick Legal Breakdown: 31 Dec 2026 vs 1 Jan 2027</span>
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-200 leading-relaxed">
          <p>
            Understanding the distinction between New Year’s Eve (31 December) and New Year’s Day (1 January) is crucial for planning celebrations:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-neutral-950 border border-emerald-500/20">
              <span className="text-emerald-400 font-bold block text-sm mb-1">
                31 December 2026 (New Year&apos;s Eve)
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong>100% OPEN across India</strong> (except statutory dry states Bihar, Gujarat, Nagaland, Mizoram). Retail vends operate normal hours, while restaurants, microbreweries, clubs, and hotels are granted special midnight and early morning night extensions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/20">
              <span className="text-amber-400 font-bold block text-sm mb-1">
                1 January 2027 (New Year&apos;s Day)
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong>OPEN in nearly all states</strong>, with one major statutory exception: <strong>Kerala</strong>, where Rule 7A of the Foreign Liquor Rules mandates that the 1st of every calendar month is a compulsory dry day for all BEVCO retail stores and commercial bars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metro-by-Metro Nightlife & Theka Timings */}
      <section className="my-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Metro Operating Hours &amp; Party Curfew Matrix (31 Dec 2026)
        </h2>
        <p className="text-sm text-neutral-300 mb-6">
          Check the approved retail closure times, bar service extensions, and breathalyzer enforcement alerts across India&apos;s top party hubs:
        </p>

        <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-800/80 text-neutral-200 uppercase tracking-wider text-[11px] font-mono">
              <tr>
                <th className="p-3.5 sm:p-4">City / Region</th>
                <th className="p-3.5 sm:p-4">31 Dec Retail Close</th>
                <th className="p-3.5 sm:p-4">31 Dec Bar/Pub Extensions</th>
                <th className="p-3.5 sm:p-4">1 Jan Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Goa (North &amp; South)</td>
                <td className="p-3.5 sm:p-4">11:00 PM</td>
                <td className="p-3.5 sm:p-4 text-emerald-300 font-medium">Shacks &amp; clubs open up to 4:00 AM</td>
                <td className="p-3.5 sm:p-4 text-emerald-400 font-semibold">OPEN</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Mumbai &amp; Pune (MH)</td>
                <td className="p-3.5 sm:p-4">10:30 PM (FL-II)</td>
                <td className="p-3.5 sm:p-4 text-emerald-300 font-medium">Licensed bars open until 5:00 AM (Special NYE Order)</td>
                <td className="p-3.5 sm:p-4 text-emerald-400 font-semibold">OPEN</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Delhi NCT</td>
                <td className="p-3.5 sm:p-4">10:00 PM</td>
                <td className="p-3.5 sm:p-4">Standard 1:00 AM (Star hotels up to 3:00 AM)</td>
                <td className="p-3.5 sm:p-4 text-emerald-400 font-semibold">OPEN</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Gurugram &amp; Faridabad (HR)</td>
                <td className="p-3.5 sm:p-4">12:00 AM / 24-hr zones</td>
                <td className="p-3.5 sm:p-4 text-emerald-300 font-medium">Cyber Hub &amp; Golf Course bars open until 3:00 AM</td>
                <td className="p-3.5 sm:p-4 text-emerald-400 font-semibold">OPEN</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Bengaluru (KA)</td>
                <td className="p-3.5 sm:p-4">10:30 PM (CL-2)</td>
                <td className="p-3.5 sm:p-4 text-emerald-300 font-medium">Pubs permitted until 1:00 AM or 2:00 AM with police clearance</td>
                <td className="p-3.5 sm:p-4 text-emerald-400 font-semibold">OPEN</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Kolkata (WB)</td>
                <td className="p-3.5 sm:p-4">10:00 PM (Off-shops)</td>
                <td className="p-3.5 sm:p-4 text-emerald-300 font-medium">Park Street restaurants open until 2:00 AM</td>
                <td className="p-3.5 sm:p-4 text-emerald-400 font-semibold">OPEN</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Kerala (Kochi/TVM)</td>
                <td className="p-3.5 sm:p-4">9:00 PM (BEVCO)</td>
                <td className="p-3.5 sm:p-4">FL-3 hotel bars open until 11:00 PM on 31 Dec</td>
                <td className="p-3.5 sm:p-4 text-rose-400 font-semibold">DRY DAY (1st of Month Rule 7A)</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Bihar &amp; Gujarat</td>
                <td className="p-3.5 sm:p-4 text-rose-400">Total Ban</td>
                <td className="p-3.5 sm:p-4 text-rose-400">No commercial bars permitted</td>
                <td className="p-3.5 sm:p-4 text-rose-400 font-semibold">CLOSED (Statutory Ban)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Special Kerala 1st-of-Month Rule Explained */}
      <section className="my-10 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <span>Crucial Exception: Why 1 January is a Dry Day in Kerala</span>
        </h2>
        <div className="text-xs sm:text-sm text-neutral-300 space-y-3 leading-relaxed">
          <p>
            While revellers in Delhi, Mumbai, and Goa can visit wine stores and pubs without interruption on 1 January 2027, <strong>tourists and residents in Kerala face a mandatory 24-hour closure on New Year’s Day</strong>.
          </p>
          <p>
            Under <strong>Rule 7A of the Kerala Foreign Liquor Rules</strong>, the first calendar day of every single month is statutorily designated as a statewide dry day. On this day:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-300">
            <li>All retail liquor vends operated by BEVCO and Consumerfed remain shuttered.</li>
            <li>All private hotel bars (FL-3) and beer/wine parlours (FL-11) are legally prohibited from serving alcohol.</li>
            <li>Clubs, military establishments, and heritage properties must suspend bar dispensing counters.</li>
          </ul>
          <p className="text-amber-200/90 text-xs">
            <strong>Travel Tip for Kerala Tourists:</strong> If you are celebrating New Year’s Eve in Kovalam, Varkala, Kochi, or Munnar, you must purchase any personal liquor requirements before 9:00 PM on 31 December, as retail stores will not reopen until 10:00 AM on 2 January.
          </p>
        </div>
      </section>

      {/* Legal Party Licenses & Breathalyzer Warnings */}
      <section className="my-10 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          New Year Party Laws: Temporary Licenses &amp; Police Traffic Drives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
            <h3 className="text-base font-semibold text-amber-400 flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>One-Day Occasional Party Licenses</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Organizing a ticketed or private party at a rented farmhouse, terrace, community hall, or commercial lounge without a temporary liquor permit is illegal. In Delhi, apply for the <strong>L-49A permit</strong>; in Maharashtra, obtain the <strong>FL-4 license</strong>; and in Uttar Pradesh, procure an <strong>FL-11 temporary occasion license</strong> online.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
            <h3 className="text-base font-semibold text-rose-400 flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Strict Zero-Tolerance Drink-and-Drive Drives</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Every city police department (Delhi Police, Mumbai Police, Bengaluru Traffic Police) sets up hundreds of checkpoint barricades on 31 December night equipped with Alcometer breathalyzers. Under Section 185 of the Motor Vehicles Act, driving with blood alcohol content (BAC) exceeding 30mg per 100ml attracts an immediate ₹10,000 fine, vehicle impoundment, and suspension of driving licenses.
            </p>
          </div>
        </div>
      </section>

      {/* Related Guides Links */}
      <section className="my-10 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-white mb-4">
          Related Holiday &amp; State Regulatory Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <Link
            href="/guides/christmas-2026-dry-day"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Christmas 2026: 25 Dec Rules</span>
              <span className="text-neutral-400 text-[11px]">Goa, Mumbai, Bangalore holiday party and open theka timings</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/kerala-dry-days-2026"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Kerala Dry Days 2026 &amp; BEVCO Rules</span>
              <span className="text-neutral-400 text-[11px]">Detailed breakdown of Rule 7A and 1st-of-month closures</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/goa-dry-days-and-liquor-rules"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Goa Liquor Laws &amp; Tourist Transport</span>
              <span className="text-neutral-400 text-[11px]">Form 25 permits, flight baggage quotas &amp; checkpost limits</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/dry-states-in-india-2026"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Complete List of Dry States 2026</span>
              <span className="text-neutral-400 text-[11px]">Prohibition rules in Bihar, Gujarat, Nagaland &amp; Mizoram</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="my-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-amber-400" />
          <span>Frequently Asked Questions &bull; New Year 2027</span>
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
            href="/#state-directory"
            className="px-5 py-2.5 rounded-xl bg-neutral-800 text-white font-semibold text-xs hover:bg-neutral-700 transition-colors"
          >
            Explore All 36 State Hubs
          </Link>
        </div>
      </div>
    </article>
  );
}
