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
  MapPin,
  HelpCircle,
  CheckCircle,
  Building2,
  Beer,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
} from 'lucide-react';

interface UPGuideArticleProps {
  guide: Guide;
}

export default function UPGuideArticle({ guide }: UPGuideArticleProps) {
  const tocItems = [
    { id: 'introduction', label: '1. Introduction: Is Today a Dry Day in UP?' },
    { id: 'upcoming-dates', label: '2. Upcoming UP Dry Days: 8 Nov & 24 Nov 2026' },
    { id: 'election-dm-orders', label: '3. Elections & DM Administration Dry Days' },
    { id: 'operating-timings', label: '4. Normal Operating Timings (Shops & Bars)' },
    { id: 'possession-limits', label: '5. Legal Drinking Age & Possession Limits' },
    { id: 'interstate-warning', label: '6. Interstate Alcohol Transport Ban (Delhi/Haryana)' },
    { id: 'how-to-check', label: '7. How to Check If Tomorrow is Dry Day in UP' },
    { id: 'related-info', label: '8. Related UP State Information & Links' },
    { id: 'faqs', label: '9. Frequently Asked Questions (FAQs)' },
    { id: 'official-sources', label: '10. Official Citations & Regulatory Disclaimer' },
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
          UP Dry Days 2026
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
            State: Uttar Pradesh
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
            Active 2026 Calendar
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
              Looking for Today&apos;s or Tomorrow&apos;s Live Status in UP?
            </h2>
            <p className="leading-relaxed text-amber-200/90">
              Agar aap jan&apos;na chahte hain ki <strong className="text-white">kya aaj UP me dry day hai</strong> ya{' '}
              <strong className="text-white">tomorrow is dry day in UP</strong>, to hamare real-time tracker par instant status dekhein.
              Hamara engine Uttar Pradesh ke sabhi 75 zilon ke liye current IST status track karta hai:{' '}
              <Link href="/india/uttar-pradesh" className="underline font-semibold text-white hover:text-amber-300">
                Check Live Dry Day Today in UP &rarr;
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
            <span>1. Introduction: Is Today a Dry Day in UP?</span>
          </h2>
          <p>
            Har mahine lakho log Google par search karte hain ki <strong className="text-white">kya aaj UP me dry day hai</strong>, ya phir{' '}
            <strong className="text-white">dry day in up today</strong> ki official situation kya hai. Uttar Pradesh, jo aabadi ke hisaab se
            Bharat ka sabse bada rajya hai, wahan liquor sale aur excise policies ko{' '}
            <strong className="text-white">Uttar Pradesh Excise Department</strong> regulate karta hai.
          </p>
          <p>
            Chahe aap Lucknow, Noida, Ghaziabad, Kanpur, Varanasi ya Agra me rehte hon, alcohol licensing aur store closure ke niyam pure state
            me uniformly lagu hote hain. Agar aap plan kar rahe hain ki <strong className="text-white">dry day today in UP</strong> hai ya
            nahi, ya fir <strong className="text-white">today dry day in uttar pradesh</strong> confirm karna chahte hain, to is guide me aapko{' '}
            <strong className="text-white">UP dry day 2026</strong> ke sabhi upcoming dates, normal dukaan ke khulne aur band hone ke timings,
            aur important legal limits ki poori jankari milegi.
          </p>
          <p>
            Agar aapko turant confirm karna ho ki <strong className="text-white">is tomorrow is dry day in up</strong>, to aap hamare real-time{' '}
            <Link href="/india/uttar-pradesh" className="text-amber-400 font-semibold underline hover:text-white">
              Uttar Pradesh Dry Day Tracker
            </Link>{' '}
            par visit karke aaj aur kal ka live legal status check kar sakte hain.
          </p>
        </section>

        {/* Section 2: Upcoming Dates in November 2026 */}
        <section id="upcoming-dates" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>2. Upcoming UP Dry Days: 8 Nov (Diwali) &amp; 24 Nov 2026</span>
          </h2>
          <p>
            November 2026 ke calendar me Uttar Pradesh ke andar do bade festival closures scheduled hain, jin par sabhi retail theke, model shops,
            aur licensed bars poori tarah band rahenge:
          </p>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300">
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Day</th>
                  <th className="p-3 font-semibold">Occasion / Reason</th>
                  <th className="p-3 font-semibold">Applicable Scope</th>
                  <th className="p-3 font-semibold">Closure Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">08 November 2026</td>
                  <td className="p-3 text-neutral-300">Sunday</td>
                  <td className="p-3 text-neutral-200">
                    <strong className="text-white">Diwali (Deepawali)</strong>
                  </td>
                  <td className="p-3 text-neutral-300">All 75 Districts of UP</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory 24-Hour Dry Day
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">24 November 2026</td>
                  <td className="p-3 text-neutral-300">Tuesday</td>
                  <td className="p-3 text-neutral-200">
                    <strong className="text-white">Guru Nanak Jayanti / Guru Tegh Bahadur Shaheedi Diwas</strong>
                  </td>
                  <td className="p-3 text-neutral-300">All 75 Districts of UP</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
                      Mandatory 24-Hour Dry Day
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                8 November 2026 &bull; Diwali Dry Day
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Diwali ke pawan parva par Uttar Pradesh Excise Department poore state me liquor sale par roak lagata hai. Is din sabhi
                desi, videshi (IMFL), beer theke, aur hotel-restaurant bars raat 12:00 baje se agle din subah tak band rehte hain. Agar aap
                wonder kar rahe hain ki <strong className="text-white">dry day in up tomorrow</strong> hoga ya nahi, to Diwali ke din alcohol
                purchase bilkul sambhav nahi hoga.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                24 November 2026 &bull; Guru Nanak Jayanti / Shaheedi Diwas
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Prakash Parv (Guru Nanak Dev Ji Jayanti) aur Sri Guru Tegh Bahadur Ji Shaheedi Diwas ke samman me Uttar Pradesh sarkar ne
                24 November ko statewide dry day ghoshit kiya hai. Is din kisi bhi commercial establishment par liquor serve karna ya bechna
                kanoonan jurm hai.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Elections and DM Administration Orders */}
        <section id="election-dm-orders" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>3. Elections &amp; DM Administration-Ordered Dry Days</span>
          </h2>
          <p>
            Festival dry days ke alawa, Uttar Pradesh me do mukhya sthitiyon me achanak ya gazetted dry days declare kiye jaate hain:
          </p>

          <div className="space-y-3">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-1.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-rose-400" />
                <span>Elections and Counting Days (48-Hour Curfew)</span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Representation of the People Act, 1951 ke <strong className="text-white">Section 135C</strong> ke tahat, kisi bhi
                Lok Sabha, Vidhan Sabha (Assembly), ya Legislative Council (MLC) chunav ke polling area me voting khatam hone ke theek{' '}
                <strong className="text-white">48 ghante pehle se dry curfew</strong> lagu ho jata hai. Iske alawa, vote counting day par
                bhi shanti-vyavastha banaye rakhne ke liye poora din dry day rehta hai.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-1.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-amber-400" />
                <span>District Collector / District Magistrate (DM) Powers</span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Uttar Pradesh Excise Rules ke tahat, har zile ke <strong className="text-white">District Magistrate (DM)</strong> aur
                Licensing Authorities ke paas vishesh adhikaar hota hai ki wo law-and-order (kanoon-vyavastha) maintain karne ke liye kisi bhi
                vishesh din ya ilaqe me dry day declare kar sakte hain. For example:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-400 mt-1">
                <li>Bade dharmik juluse (jaise Kanwar Yatra, Muharram tazia processions, ya Ram Navami shobhayatra).</li>
                <li>Zila panchayat ya local municipal body elections ke dauran.</li>
                <li>Kisi bhi sensitive communal ya security situation ke samay local theke band karwane ke aadesh.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Operating Timings on Normal Days */}
        <section id="operating-timings" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Clock className="h-5 w-5 text-amber-400" />
            <span>4. Normal Operating Timings in UP (Shops, Bars &amp; Star Hotels)</span>
          </h2>
          <p>
            Jab rajya me koi dry day nahi hota, tab Uttar Pradesh Excise Department dwara nirdharit strict trading hours lagu hote hain.
            Kisi bhi theke ya bar ko tay samay se pehle kholna ya baad me chalana illegal hai:
          </p>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300">
                  <th className="p-3 font-semibold">Establishment Category</th>
                  <th className="p-3 font-semibold">Permitted Operating Hours</th>
                  <th className="p-3 font-semibold">Applicable License Type</th>
                  <th className="p-3 font-semibold">Conditions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                <tr>
                  <td className="p-3 font-bold text-white">Retail Liquor Shops &amp; Model Shops</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">10:00 AM &ndash; 10:00 PM</td>
                  <td className="p-3 text-neutral-300">FL-4 / Desi Theka / Model Shop</td>
                  <td className="p-3 text-neutral-400">Strict shutter-down at 10:00 PM; no over-the-counter sales permitted thereafter.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Commercial Bars &amp; Restaurant Clubs</td>
                  <td className="p-3 font-mono font-bold text-amber-400">10:00 AM &ndash; 02:00 AM</td>
                  <td className="p-3 text-neutral-300">FL-6 / FL-7 Bar License</td>
                  <td className="p-3 text-neutral-400">Service permitted up to 2:00 AM depending on local municipal license approval.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Star-Category Hotel Bars</td>
                  <td className="p-3 font-mono font-bold text-purple-400">10:00 AM &ndash; 04:00 AM</td>
                  <td className="p-3 text-neutral-300">Luxury Heritage / 4-Star &amp; 5-Star</td>
                  <td className="p-3 text-neutral-400">Extended nocturnal service allowed strictly inside licensed luxury hotel premises.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-neutral-400">
            Agar aap kisi normal din pe purchase kar rahe hain, to dhyan rahe ki 10:00 PM ke baad UP ke sabhi retail theke band ho jaate hain.
            Aise me agar aapko kal ki sthiti janni hai to hamare platform par{' '}
            <Link href="/india/uttar-pradesh" className="text-amber-400 underline hover:text-white">
              tomorrow is dry day in up
            </Link>{' '}
            status verify kar lena behtar rehta hai.
          </p>
        </section>

        {/* Section 5: Possession Limits and Legal Drinking Age */}
        <section id="possession-limits" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Beer className="h-5 w-5 text-amber-400" />
            <span>5. Legal Drinking Age &amp; Individual Possession Limits in UP</span>
          </h2>
          <p>
            Uttar Pradesh me sharab khareedne, rakhne aur peene se jude kanoon behad sakht hain:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Statutory Requirement
              </span>
              <h3 className="text-base font-bold text-white">
                Legal Drinking Age: 21 Years
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Uttar Pradesh Excise Act ke mutabiq, rajya me sharab khareedne aur consume karne ki kanuni umar{' '}
                <strong className="text-white">21 saal</strong> hai. 21 saal se kam umar ke kisi bhi vyakti ko sharab bechna ya serve
                karna dandaney jurm hai.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Individual Carrying Limits
              </span>
              <h3 className="text-base font-bold text-white">
                Personal Possession Limits
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Bina kisi vishesh &ldquo;Personal Home Bar License&rdquo; ke, ek aam nagrik apne paas ya ghar par adhiktam nimnlikhit matra me hi
                alcohol rakh sakta hai:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-200">
                <li><strong className="text-white">1.5 Litres:</strong> Indian-Made Foreign Liquor (IMFL / Spirits).</li>
                <li><strong className="text-white">1.5 Litres:</strong> Country-made liquor (Desi Sharab).</li>
                <li><strong className="text-white">4 Bottles:</strong> Beer (650 ml each).</li>
              </ul>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 text-xs text-neutral-400">
            <strong className="text-neutral-200">Legal Note:</strong> In limits se zyada quantity bina UP Excise license ke rakhna ya
            transport karna Uttar Pradesh Excise Act, 1910 ke tahat non-bailable offence ban sakta hai, jisme bhari jurmana aur jail ki saza
            dono shamil hain.
          </div>
        </section>

        {/* Section 6: Interstate Transport Ban */}
        <section id="interstate-warning" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <AlertOctagon className="h-5 w-5 text-rose-400" />
            <span>6. Interstate Alcohol Transport Ban: Delhi &amp; Haryana Warning</span>
          </h2>

          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4 sm:p-5 text-rose-200 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-xs sm:text-sm">
                <h3 className="text-sm sm:text-base font-bold text-rose-300">
                  Strict Legal Warning: Bringing Alcohol from Other States is Illegal
                </h3>
                <p className="leading-relaxed text-rose-200/90">
                  Bahut se log Delhi ya Haryana se saste daamo me sharab khareedkar Noida, Ghaziabad ya UP ke kisi aur ziley me le aane ki
                  koshish karte hain. <strong className="text-white">Dhyan rahe: Delhi, Haryana ya kisi bhi doosre state se ek bhi sealed bottle
                  UP me lana poori tarah illegal hai!</strong>
                </p>
                <p className="leading-relaxed text-rose-200/90">
                  Chahe wo Delhi Airport ka duty-free ho ya Gurgaon ka theka, jab tak bottle par{' '}
                  <strong className="text-white">&ldquo;For Sale in Uttar Pradesh Only&rdquo;</strong> ka excise hologram nahi hota, tab tak
                  use UP me enter karwana contraband (tashkari) mana jata hai.
                </p>
              </div>
            </div>

            <div className="border-t border-rose-800/60 pt-3 text-xs text-rose-300/80 space-y-1">
              <p>
                <strong className="text-rose-200">Legal Authority:</strong> As established under the Uttar Pradesh Excise Law and Rules{' '}
                (see{' '}
                <a
                  href="https://www.kaanoon.com/157781/uttar-pradesh-excise-law-and-rules"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white font-medium inline-flex items-center gap-0.5 hover:text-amber-300"
                >
                  <span>Kaanoon UP Excise Reference</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                ), out-of-state liquor ko UP me carry karne par gaadi zapt (impound) ho sakti hai aur arrest kiya ja sakta hai.
              </p>
              <p>
                Noida DND Flyway, Kalindi Kunj, Chilla Border, Anand Vihar aur Haryana-UP checkposts par Excise department aur Police regular
                checking chalati hai.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: How to Check Current Status */}
        <section id="how-to-check" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>7. How to Check If Today or Tomorrow is Dry Day in UP</span>
          </h2>
          <p>
            Agar aapko ye verify karna hai ki <strong className="text-white">kya aaj up me dry day hai</strong> ya fir{' '}
            <strong className="text-white">dry day in up tomorrow</strong> scheduled hai, to in 4 aasan steps ko follow karein:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <span className="font-mono text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-800 shrink-0">
                01
              </span>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  DryCheck India ke UP Tracker par Live Status Dekhein
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  Sabse pehle hamare official{' '}
                  <Link href="/india/uttar-pradesh" className="text-amber-400 font-semibold underline hover:text-white">
                    Uttar Pradesh State Tracker
                  </Link>{' '}
                  par jayein. Ye tool aapko instant headline ke saath batata hai ki aaj theke khule hain ya dry day hai, bina kisi guessing ke.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <span className="font-mono text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-800 shrink-0">
                02
              </span>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  Upcoming State Festivals Check Karein
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  Notice karein ki kya agle 24-48 ghante me koi gazetted national ya regional holiday (jaise 8 November Diwali ya 24 November
                  Guru Nanak Jayanti) to nahi hai. Aise dino par pure Uttar Pradesh me dry day rehta hai.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <span className="font-mono text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-800 shrink-0">
                03
              </span>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  Local District Magistrate (DM) Orders Verify Karein
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  Agar aapke zile me MLC elections, municipal polls, ya koi vishesh dharmik yatra ho rahi hai, to local Collectorate notification
                  check karein kyunki DM ke paas local dry day declare karne ka adhikaar hota hai.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <span className="font-mono text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-800 shrink-0">
                04
              </span>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  Shop Operating Hours Ka Dhyan Rakhein
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  Normal dino par subah 10:00 AM se raat 10:00 PM tak retail stores khule rehte hain. Raat 10 baje ke baad retail sale band
                  ho jaati hai, jise log aksar galti se dry day samajh lete hain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Related Information & Links */}
        <section id="related-info" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <span>8. Related UP State Information &amp; Real-Time Trackers</span>
          </h2>
          <p>
            Explore related state resources, neighbor state rules, and nationwide excise policies on DryCheck India:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/india/uttar-pradesh"
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-xs font-mono text-amber-400 font-semibold block mb-1">
                Real-Time Status &rarr;
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                UP Live Status Page
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Check whether today or tomorrow is a dry day in Uttar Pradesh.
              </p>
            </Link>

            <Link
              href="/guides"
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-xs font-mono text-amber-400 font-semibold block mb-1">
                Guides Hub &rarr;
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                State Guides Directory
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Read deep-dive excise and election guides for other Indian states.
              </p>
            </Link>

            <Link
              href="/#state-directory"
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-xs font-mono text-amber-400 font-semibold block mb-1">
                All India Overview &rarr;
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                36 States &amp; UTs Directory
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Compare alcohol rules across Delhi, Haryana, Bihar, and all India.
              </p>
            </Link>
          </div>
        </section>

        {/* Section 9: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>9. Frequently Asked Questions (FAQs)</span>
          </h2>
          <p className="text-xs text-neutral-400">
            Aamtaur par users dwara puche jaane wale sabse mukhya sawal aur unke official jawab:
          </p>

          <div className="space-y-3">
            {guide.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-1.5"
              >
                <h3 className="text-xs sm:text-sm font-bold text-white flex items-start gap-2">
                  <span className="text-amber-400 font-mono font-semibold shrink-0">
                    Q{idx + 1}.
                  </span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 10: Official Sources & Citations */}
        <section id="official-sources" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <FileText className="h-5 w-5 text-amber-400" />
            <span>10. Official Citations &amp; Regulatory Disclaimer</span>
          </h2>
          <p>
            In accordance with DryCheck India&apos;s editorial standards, all dates, timings, and legal limits cited in this guide
            are grounded in verified government portals and statutory legal provisions:
          </p>

          <div className="space-y-3">
            {guide.sources.map((src, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-white">
                    {src.title}
                  </h3>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:underline min-h-[36px]"
                  >
                    <span>View Official Source</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400">
                  <span className="font-medium text-neutral-300">{src.organization}</span>
                  {src.documentNumber && <span>&bull; Ref: {src.documentNumber}</span>}
                  {src.datePublished && <span>&bull; Published: {src.datePublished}</span>}
                </div>
                <p className="text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/60 mt-1">
                  <strong className="text-neutral-300">Evidence Supported:</strong> {src.claimSupported}
                </p>
              </div>
            ))}
          </div>

          {/* Editorial Note & Regulatory Disclaimer */}
          <div className="mt-6 rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-4 text-xs text-neutral-400 flex items-start gap-3">
            <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <p>
                <strong className="text-neutral-200">Editorial Independence &amp; Legal Disclaimer:</strong> DryCheck India
                is an independent public informational service. We are not affiliated with the Government of Uttar Pradesh,
                the UP Excise Department, or any government body.
              </p>
              <p>
                This publication provides informational analysis based on statutory provisions available as of{' '}
                <strong className="text-neutral-200">{guide.lastReviewedDate}</strong>. Local dry day orders may be issued or modified
                at short notice by respective District Magistrates. This article does not constitute legal counsel.
              </p>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
