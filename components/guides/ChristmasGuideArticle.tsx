import Link from 'next/link';
import { Guide } from '@/lib/guides';
import {
  Calendar,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Building,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  PartyPopper,
} from 'lucide-react';

interface Props {
  guide: Guide;
}

export default function ChristmasGuideArticle({ guide }: Props) {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8">
      {/* Editorial Header */}
      <header className="mb-8 border-b border-neutral-800 pb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Confirmed: Open Across Major Metros
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
            <Calendar className="h-3.5 w-3.5" />
            25 December 2026 (Friday)
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
          Every December, millions of holidaymakers, party planners, and tourists across India ask whether Christmas Day (25 December 2026) is a dry day. The short legal answer is: <strong>No, Christmas is NOT a national gazetted dry day in India.</strong> Commercial retail liquor thekas, star-hotel lounges, restaurants, and pubs remain fully operational in almost all major states and tourist destinations including Goa, Delhi NCR, Maharashtra, Karnataka, and West Bengal.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-xs text-neutral-400">
          <div>
            <span className="text-neutral-500 block">Editorial Verification</span>
            <span className="font-semibold text-neutral-200">State Excise Gazette Analysis &bull; Christmas 2026</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Last Fact-Checked</span>
            <span className="font-semibold text-amber-400">{guide.lastReviewedDate}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Statutory Source</span>
            <span className="font-semibold text-neutral-200">State Excise Calendars &amp; Ministry of Home Affairs</span>
          </div>
        </div>
      </header>

      {/* Quick Verdict Executive Summary Card */}
      <section className="my-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 sm:p-6 backdrop-blur">
        <h2 className="text-lg sm:text-xl font-bold text-emerald-300 flex items-center gap-2">
          <PartyPopper className="h-5 w-5 text-emerald-400" />
          <span>Executive Legal Verdict: Christmas 2026</span>
        </h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-200 leading-relaxed">
          <p>
            Under the guidelines issued by the Ministry of Home Affairs and respective State Excise Departments, India recognizes only three compulsory nationwide dry days: <strong>Republic Day (26 January)</strong>, <strong>Independence Day (15 August)</strong>, and <strong>Gandhi Jayanti (2 October)</strong>.
          </p>
          <p>
            Christmas (25 December) is a gazetted central government public holiday, but it is <strong>categorically not classified as a statutory alcohol dry day</strong> in general excise law. Retail wine stores, microbreweries, clubs, and hotel dining establishments will operate under standard commercial timings.
          </p>
          <div className="rounded-xl bg-neutral-950/80 p-4 border border-emerald-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-emerald-400 font-semibold block">Retail Vends (Thekas):</span>
              <span className="text-neutral-300">Open under regular state operating hours (e.g., 10 AM – 10 PM in Delhi/UP).</span>
            </div>
            <div>
              <span className="text-emerald-400 font-semibold block">Pubs, Bars &amp; Clubs:</span>
              <span className="text-neutral-300">Open with special extended Christmas Eve / Christmas night commercial permits.</span>
            </div>
          </div>
        </div>
      </section>

      {/* State-by-State Christmas 2026 Status Table */}
      <section className="my-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          State-by-State Liquor Rules for 25 December 2026
        </h2>
        <p className="text-sm text-neutral-300 mb-6">
          While metropolitan party hubs remain lively and open, statutory dry states and local tribal councils maintain their year-round restrictions. Check the authoritative multi-state matrix below:
        </p>

        <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-800/80 text-neutral-200 uppercase tracking-wider text-[11px] font-mono">
              <tr>
                <th className="p-3.5 sm:p-4">State / Territory</th>
                <th className="p-3.5 sm:p-4">25 Dec Status</th>
                <th className="p-3.5 sm:p-4">Retail Theka Timings</th>
                <th className="p-3.5 sm:p-4">Bar / Pub Night Life</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Goa</td>
                <td className="p-3.5 sm:p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold">
                    OPEN &bull; Peak Fest
                  </span>
                </td>
                <td className="p-3.5 sm:p-4">9:00 AM – 11:00 PM</td>
                <td className="p-3.5 sm:p-4 text-emerald-300 font-medium">Open late with music/beach permits</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Delhi NCT</td>
                <td className="p-3.5 sm:p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold">
                    OPEN
                  </span>
                </td>
                <td className="p-3.5 sm:p-4">10:00 AM – 10:00 PM</td>
                <td className="p-3.5 sm:p-4">Standard 1:00 AM (Hotel bars up to 3 AM)</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Maharashtra (Mumbai/Pune)</td>
                <td className="p-3.5 sm:p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold">
                    OPEN
                  </span>
                </td>
                <td className="p-3.5 sm:p-4">10:00 AM – 10:30 PM</td>
                <td className="p-3.5 sm:p-4">Open until 1:30 AM (Extended holiday order)</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Karnataka (Bengaluru)</td>
                <td className="p-3.5 sm:p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold">
                    OPEN
                  </span>
                </td>
                <td className="p-3.5 sm:p-4">9:00 AM – 10:30 PM</td>
                <td className="p-3.5 sm:p-4">Pubs open until 1:00 AM in core zones</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">West Bengal (Kolkata)</td>
                <td className="p-3.5 sm:p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold">
                    OPEN &bull; Major Gala
                  </span>
                </td>
                <td className="p-3.5 sm:p-4">10:00 AM – 10:00 PM</td>
                <td className="p-3.5 sm:p-4">Park Street carnivals open until 2:00 AM</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Uttar Pradesh (Noida/Lucknow)</td>
                <td className="p-3.5 sm:p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold">
                    OPEN
                  </span>
                </td>
                <td className="p-3.5 sm:p-4">10:00 AM – 10:00 PM</td>
                <td className="p-3.5 sm:p-4">Commercial hotel bars until 11:00 PM / 12:00 AM</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Kerala</td>
                <td className="p-3.5 sm:p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold">
                    OPEN
                  </span>
                </td>
                <td className="p-3.5 sm:p-4">10:00 AM – 9:00 PM (BEVCO)</td>
                <td className="p-3.5 sm:p-4">FL-3 hotel bars open until 11:00 PM</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Bihar &amp; Gujarat</td>
                <td className="p-3.5 sm:p-4">
                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 text-[11px] font-bold">
                    CLOSED (Statutory Ban)
                  </span>
                </td>
                <td className="p-3.5 sm:p-4 text-rose-300">Total statutory prohibition</td>
                <td className="p-3.5 sm:p-4 text-rose-300">Zero bars or public sale (Visitor permits in Gujarat)</td>
              </tr>
              <tr className="hover:bg-neutral-800/30">
                <td className="p-3.5 sm:p-4 font-semibold text-white">Nagaland &amp; Mizoram</td>
                <td className="p-3.5 sm:p-4">
                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 text-[11px] font-bold">
                    CLOSED (State Acts)
                  </span>
                </td>
                <td className="p-3.5 sm:p-4 text-rose-300">Prohibition enforced year-round</td>
                <td className="p-3.5 sm:p-4 text-rose-300">No commercial bars permitted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Metro Highlights */}
      <section className="my-10 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Major City Insights: Goa, Mumbai, Delhi &amp; Kolkata
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
            <h3 className="text-base font-semibold text-amber-400 flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Goa: Peak Tourist Season</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Christmas in Goa marks the single highest tourism inflow period of the year. Beach shacks, night markets in Arpora, clubs in Vagator and Anjuna, and heritage pubs in Panaji operate at full throttle. There are zero state-imposed dry-day hours on 24 Dec (Christmas Eve) or 25 Dec (Christmas Day). Remember that transporting bottles outside Goa requires an official Form 25 permit.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
            <h3 className="text-base font-semibold text-amber-400 flex items-center gap-2 mb-2">
              <Building className="h-4 w-4" />
              <span>Delhi NCR: Party Licenses &amp; Curfews</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              In Delhi, retail vends operate from 10:00 AM to 10:00 PM. Private party organizers and banquet venues serving liquor must apply for an online <strong>L-49A (1-day personal party permit)</strong> via the Delhi Excise Portal. In neighbouring Gurugram and Noida, modern retail outlets operate without dry-day impediments.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
            <h3 className="text-base font-semibold text-amber-400 flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Kolkata: Park Street Festive Carnival</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Kolkata treats Christmas as one of its premiere cultural carnivals. Park Street, Bow Barracks, and central hospitality strips operate with specialized lighting and holiday crowd management. State excise authorities traditionally grant commercial on-premise bars extension permissions until 2:00 AM.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
            <h3 className="text-base font-semibold text-amber-400 flex items-center gap-2 mb-2">
              <Building className="h-4 w-4" />
              <span>Mumbai &amp; Bengaluru: Nightlife Extensions</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Bandra, Lower Parel, and Juhu in Mumbai, alongside Indiranagar, Koramangala, and Church Street in Bengaluru, host major Christmas dining celebrations. Maharashtra State Excise permits FL-III establishments to serve until 1:30 AM. In Bengaluru, high footfall microbreweries remain open until 1:00 AM.
            </p>
          </div>
        </div>
      </section>

      {/* Private Party & Event Permit Rules */}
      <section className="my-10 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mb-3">
          <ShieldCheck className="h-5 w-5 text-amber-400" />
          <span>Excise Laws for Christmas Parties &amp; Farmhouse Gatherings</span>
        </h2>
        <div className="text-xs sm:text-sm text-neutral-300 space-y-3 leading-relaxed">
          <p>
            If you are hosting a Christmas get-together at a private banquet hall, farmhouse, club lawns, or rented Airbnb villa, you must comply with state excise temporary licensing laws:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li>
              <strong>Temporary Occasional License:</strong> In states like Delhi (L-49A), Uttar Pradesh (FL-11 occasional permit), and Maharashtra (FL-4 one-day party license), serving alcohol at a hired commercial premises legally requires an online one-day license costing between ₹2,000 and ₹10,000 depending on guest count.
            </li>
            <li>
              <strong>Duty-Paid Barcode Requirement:</strong> All bottles served at commercial gatherings must bear the legitimate excise hologram and barcode of the host state. Serving non-duty paid liquor (e.g. Haryana bottles at a Noida farmhouse) is a non-bailable offense resulting in immediate raid and property seizure.
            </li>
            <li>
              <strong>Legal Drinking Age Enforcement:</strong> Event organizers remain strictly liable under the State Excise Act if minors (under 21 in Delhi/UP/Karnataka, under 25 in Punjab/Maharashtra for hard spirits) are served alcohol.
            </li>
          </ul>
        </div>
      </section>

      {/* Related Legal Guides */}
      <section className="my-10 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-white mb-4">
          Related Holiday &amp; State Regulatory Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <Link
            href="/guides/new-year-2027-dry-day"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">New Year 2027: 31 Dec &amp; 1 Jan Rules</span>
              <span className="text-neutral-400 text-[11px]">Extended bar timings &amp; metro midnight party permits</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/goa-dry-days-and-liquor-rules"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Goa Liquor Rules &amp; Tourist Permits</span>
              <span className="text-neutral-400 text-[11px]">2-bottle transport limits, checkposts &amp; flight guidelines</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/dry-states-in-india-2026"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">Dry States in India 2026 List</span>
              <span className="text-neutral-400 text-[11px]">Prohibition laws in Bihar, Gujarat, Nagaland &amp; Mizoram</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
          <Link
            href="/guides/november-dry-days-2026"
            className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-white block">November Dry Days 2026 Calendar</span>
              <span className="text-neutral-400 text-[11px]">Diwali &amp; Guru Nanak Jayanti gazetted dates</span>
            </div>
            <span className="text-amber-400 font-bold ml-2">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="my-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-amber-400" />
          <span>Frequently Asked Questions &bull; Christmas 2026</span>
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
            href="/states"
            className="px-5 py-2.5 rounded-xl bg-neutral-800 text-white font-semibold text-xs hover:bg-neutral-700 transition-colors"
          >
            Explore All 36 State Hubs
          </Link>
        </div>
      </div>
    </article>
  );
}
