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
  Info,
} from 'lucide-react';

interface KeralaGuideArticleProps {
  guide: Guide;
}

export default function KeralaGuideArticle({ guide }: KeralaGuideArticleProps) {
  const meta = guide.orderMetadata;

  const tocItems = [
    { id: 'introduction', label: '1. Introduction & Statutory Context' },
    { id: 'summary-table', label: '2. Verified Order Summary Table' },
    { id: 'order-mandate', label: '3. What the Kerala Government Order Says' },
    { id: 'election-dates', label: '4. Kerala Election Dry Days in 2026' },
    { id: 'areas-covered', label: '5. Which Areas Were Covered?' },
    { id: 'consumer-rules', label: '6. Rules for Retail, Bars, Clubs & Individuals' },
    { id: 'how-to-check', label: '7. How to Check Current Dry-Day Status in Kerala' },
    { id: 'related-info', label: '8. Related Kerala State Information' },
    { id: 'faqs', label: '9. Frequently Asked Questions' },
    { id: 'official-sources', label: '10. Official References & Editorial Note' },
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
          Kerala Dry Days 2026
        </span>
      </nav>

      {/* Header section with H1 */}
      <header className="border-b border-neutral-800 pb-6 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Scale className="h-3.5 w-3.5" />
            Official Regulatory Analysis
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60">
            State: Kerala
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-rose-950/60 text-rose-300 border border-rose-800/60">
            Historical Election Record
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
              Order Date: <strong className="text-neutral-200">19 March 2026</strong>
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

      {/* Historical Context Notice Box */}
      <div className="my-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 sm:p-5 text-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm">
            <h2 className="text-sm sm:text-base font-bold text-amber-300">
              Important: Historical Election Notification Reference
            </h2>
            <p className="leading-relaxed text-amber-200/90">
              This guide documents historical alcohol sale restrictions ordered under Kerala Government Order{' '}
              <strong className="text-white">G.O.(Rt)No.332/2026/TAXES</strong> for the 2026 Legislative Assembly election.
              The polling date (09.04.2026) and counting date (04.05.2026) in this order have concluded.
            </p>
            <p className="leading-relaxed text-amber-200/90">
              <strong>This past election order alone does NOT determine today&apos;s dry-day status.</strong> If you need live,
              date-specific dry-day information for Kerala today or tomorrow, please check our live{' '}
              <Link href="/india/kerala" className="underline font-semibold text-white hover:text-amber-300">
                Kerala Dry Day Status Tracker
              </Link>{' '}
              or consult official notifications published by the Kerala State Excise Department.
            </p>
          </div>
        </div>
      </div>

      {/* Table of contents */}
      <TableOfContents items={tocItems} />

      {/* Main Body Content */}
      <div className="space-y-10 text-xs sm:text-sm leading-relaxed text-neutral-300">

        {/* Section A: Introduction */}
        <section id="introduction" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Scale className="h-5 w-5 text-amber-400" />
            <span>1. Introduction &amp; Statutory Context</span>
          </h2>
          <p>
            In Indian administrative and legal parlance, a <strong className="text-white">&ldquo;dry day&rdquo;</strong> refers
            to a specified date or time window during which the retail sale, commercial serving, and public or private distribution
            of alcoholic beverages is legally prohibited by governmental decree.
          </p>
          <p>
            Under the constitutional architecture of India, alcohol regulation is fundamentally a state subject. Pursuant to{' '}
            <strong className="text-white">Entry 8 of List II (State List) in the Seventh Schedule to the Constitution of India</strong>,
            state legislatures exercise plenary authority over the &ldquo;production, manufacture, possession, transport, purchase and sale
            of intoxicating liquors.&rdquo; In the State of Kerala, this statutory domain is principally governed by the{' '}
            <strong className="text-white">Kerala Abkari Act 1 of 1077 (M.E.)</strong> and subsidiary delegated legislation, including the{' '}
            <em>Foreign Liquor Rules</em>.
          </p>
          <p>
            However, during democratic elections, central statutory mandates intersect with state excise governance. Under{' '}
            <strong className="text-white">Section 135C of the Representation of the People Act, 1951</strong>, Parliament established
            a strict statutory bar prohibiting the sale, distribution, or dispensing of liquor in polling areas during the 48-hour
            period concluding with the close of voting. This statutory embargo overrides routine commercial trading licenses to maintain
            electoral integrity, prevent voter inducement, and uphold public tranquility.
          </p>
          <p>
            This editorial guide provides an exhaustive, legally verified breakdown of{' '}
            <strong className="text-white">Government Order G.O.(Rt)No.332/2026/TAXES</strong>, promulgated by the Government of Kerala
            Taxes (A) Department in March 2026 for the General Election to the Kerala Legislative Assembly. It details the exact dates,
            hourly curtailments, establishment coverage, and border enforcement mechanisms established by the Governor of Kerala, while
            offering citizens a clear method for verifying contemporary excise notices.
          </p>
        </section>

        {/* Section B: Summary Table */}
        <section id="summary-table" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <FileText className="h-5 w-5 text-amber-400" />
            <span>2. Verified Order Summary Table</span>
          </h2>
          <p>
            The table below synthesizes the material legal provisions of the official order. Every entry has been verified
            directly against the official notification published by the Government of Kerala.
          </p>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70">
            <table className="w-full text-left border-collapse text-xs">
              <tbody>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50 w-1/3">
                    Government Order
                  </th>
                  <td className="p-3 font-mono font-medium text-amber-300">
                    {meta?.orderNumber || 'G.O.(Rt)No.332/2026/TAXES'}
                  </td>
                </tr>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Issuing Authority
                  </th>
                  <td className="p-3 text-neutral-200">
                    Government of Kerala (By order of the Governor)
                  </td>
                </tr>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Issuing Department
                  </th>
                  <td className="p-3 text-neutral-200">
                    Taxes (A) Department
                  </td>
                </tr>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Signatory
                  </th>
                  <td className="p-3 text-neutral-200">
                    K R Jyothilal, Additional Chief Secretary
                  </td>
                </tr>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Date of Promulgation
                  </th>
                  <td className="p-3 text-neutral-200">
                    19 March 2026 (Dated at Thiruvananthapuram)
                  </td>
                </tr>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Primary Statutory Authority
                  </th>
                  <td className="p-3 text-neutral-200">
                    Section 135C, Representation of the People Act, 1951
                  </td>
                </tr>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Subject / Addressed Event
                  </th>
                  <td className="p-3 text-neutral-200">
                    General Election to Kerala Legislative Assembly, 2026
                  </td>
                </tr>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Polling Date &amp; Restriction
                  </th>
                  <td className="p-3 text-neutral-200">
                    <strong className="text-white">09 April 2026 (Thursday)</strong> &bull; 48 hours ending with the hours fixed for conclusion of poll
                  </td>
                </tr>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Counting Date &amp; Restriction
                  </th>
                  <td className="p-3 text-neutral-200">
                    <strong className="text-white">04 May 2026 (Monday)</strong> &bull; Entire calendar day
                  </td>
                </tr>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Re-Poll Mandate
                  </th>
                  <td className="p-3 text-neutral-200">
                    Mandatory dry day on any re-poll date, if ordered
                  </td>
                </tr>
                <tr className="border-b border-neutral-800/80">
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Geographic Scope
                  </th>
                  <td className="p-3 text-neutral-200">
                    Statewide across the State of Kerala (all 140 constituencies in 14 districts)
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-semibold text-neutral-400 bg-neutral-900/50">
                    Primary Official Source
                  </th>
                  <td className="p-3 text-neutral-200">
                    <a
                      href={meta?.sourcePdfUrl || 'https://www.ceo.kerala.gov.in/ceokerala/pdf/govt_orders/legislative-assembly-2026/government-orders/go-dry-day.pdf'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-amber-400 hover:underline font-medium min-h-[36px]"
                    >
                      <span>Chief Electoral Officer, Kerala (Official Order PDF)</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section C: What the Order Says */}
        <section id="order-mandate" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>3. What the Kerala Government Order Says</span>
          </h2>
          <p>
            Order <strong className="text-white">G.O.(Rt)No.332/2026/TAXES</strong> represents the formal executive realization
            of statutory directives issued by the Election Commission of India (ECI). The order explicitly references two prior
            official communications:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-neutral-300">
            <li>
              <strong className="text-neutral-100">Letter No. 576/14/2026/EPS dated 16.03.2026</strong> from the Election Commission
              of India, conveying that the General Election schedule was announced via ECI Press Note No. ECI/PN/029/2026 dated 15.03.2026.
            </li>
            <li>
              <strong className="text-neutral-100">Letter No. EL3/65/2026-ELEC dated 16.03.2026</strong> from the Chief Electoral
              Officer, Kerala, formally requesting state-level dry-day notifications.
            </li>
          </ol>

          <p>
            Paragraph 2 of the order quotes the governing parliamentary mandate under{' '}
            <strong className="text-white">Section 135C of the Representation of the People Act, 1951</strong>, which stipulates:
          </p>

          <blockquote className="p-4 rounded-xl border-l-4 border-amber-500 bg-neutral-900/80 italic text-neutral-200">
            &ldquo;no spirituous, fermented or intoxicating liquor or other substances of like nature shall be sold, given
            or distributed at a hotel, eating house, tavern, shop or any other place, public or private, within a polling area
            during the period of forty-eight hours ending with the hour fixed for the conclusion of poll for any election in the polling area.&rdquo;
          </blockquote>

          <p>
            In paragraph 3, the Government of Kerala ordered that dry days be strictly observed across the State of Kerala during
            the 48 hours ending with the conclusion of poll on 09.04.2026 (Thursday), on any subsequent re-poll date, and throughout
            counting day on 04.05.2026 (Monday).
          </p>
          <p>
            In paragraph 4, the order specifies rigorous regulatory restrictions binding both commercial entities and private citizens:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-white">Universal Closure of Establishments:</strong> No liquor shops, hotels, restaurants,
              clubs, or other establishments selling or serving liquor are permitted to sell or serve liquor to anyone whosoever
              during the designated periods.
            </li>
            <li>
              <strong className="text-white">All License Categories Bound:</strong> Star hotels, restaurants, non-proprietary clubs,
              and hotels run by anyone—even if holding valid excise licenses for possession and supply of liquor (such as FL-3 bar hotel
              licenses or FL-4A club licenses under Kerala Foreign Liquor Rules)—are strictly prohibited from dispensing liquor.
            </li>
            <li>
              <strong className="text-white">Prohibition on Private Storage:</strong> The storage of liquor by individuals is
              mandated to be curtailed and prohibited, and legal provisions on unlicensed premises are to be vigorously enforced.
            </li>
            <li>
              <strong className="text-white">Inter-State Border Infiltration Checks:</strong> Authorities are directed to prohibit
              the clandestine movement and bootlegging of liquor from adjoining states and union territory enclaves.
            </li>
          </ul>
        </section>

        {/* Section D: Election Dry Days in 2026 */}
        <section id="election-dates" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>4. Kerala Election Dry Days in 2026</span>
          </h2>
          <p>
            The order created two distinct statutory closure windows during the 2026 election cycle:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Window 1 &bull; Polling Closure (48 Hours)
              </span>
              <h3 className="text-base font-bold text-white">
                07 April 2026 to 09 April 2026
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Section 135C specifies a 48-hour backward countdown ending at the exact hour fixed for the conclusion of voting.
                Because polling in Kerala typically concludes at 6:00 PM on voting day (09.04.2026), the mandatory dry-day curfew took
                effect at 6:00 PM on 07.04.2026 (Tuesday) and remained continuously active through the entire voting day of Thursday,
                09.04.2026.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Window 2 &bull; Vote Counting Day
              </span>
              <h3 className="text-base font-bold text-white">
                04 May 2026 (Full Calendar Day)
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Vote counting day (Monday, 04.05.2026) was ordered as a complete 24-hour dry day across Kerala. This restriction applied
                from 12:00 AM midnight at the start of the day through 11:59 PM, ensuring no alcohol sales occurred before, during, or
                immediately following the declaration of election results.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 text-xs text-neutral-400">
            <strong className="text-neutral-200">Temporal Verification:</strong> Both the 09 April 2026 polling window and the
            04 May 2026 counting closure are historical events. Readers should note that these dates represent past election
            administration and do not imply an ongoing dry status today.
          </div>
        </section>

        {/* Section E: Areas Covered */}
        <section id="areas-covered" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <MapPin className="h-5 w-5 text-amber-400" />
            <span>5. Which Areas Were Covered?</span>
          </h2>
          <p>
            Because the 2026 election was a <strong className="text-white">General Election to the Kerala Legislative Assembly</strong>,
            voting occurred simultaneously across all 140 assembly constituencies spanning all 14 revenue districts:
          </p>
          <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/40 text-xs font-mono text-neutral-300">
            Kasaragod &bull; Kannur &bull; Wayanad &bull; Kozhikode &bull; Malappuram &bull; Palakkad &bull; Thrissur &bull;
            Ernakulam &bull; Idukki &bull; Kottayam &bull; Alappuzha &bull; Pathanamthitta &bull; Kollam &bull; Thiruvananthapuram
          </div>
          <p>
            Consequently, the order applied <strong className="text-white">statewide</strong> without localized exemptions.
            No municipality, corporation, or panchayat in Kerala was exempt from the 48-hour polling and counting day closures.
          </p>

          <h3 className="text-sm sm:text-base font-semibold text-white pt-2">
            Inter-State Border Vigilance &amp; Enclaves
          </h3>
          <p>
            Paragraph 4 of the order mandated that authorities take concrete steps to &ldquo;prohibit clandestine movement
            of liquor from adjoining areas of the State of Kerala.&rdquo; In practice, the Kerala Excise Department and State Police
            established inter-agency border checkposts along three critical frontiers:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>
              <strong className="text-white">Tamil Nadu Border:</strong> Checkposts in Palakkad (Walayar corridor), Idukki (Kumily),
              and Thiruvananthapuram (Amaravila/Kaliakkavilai) to prevent cross-border bootlegging from TASMAC vends.
            </li>
            <li>
              <strong className="text-white">Karnataka Border:</strong> Checkposts in Kasaragod (Talapady) and Wayanad (Muthanga/Bavali)
              surveilling movement from Mangaluru and Mysuru districts.
            </li>
            <li>
              <strong className="text-white">Mahe Enclave (Union Territory of Puducherry):</strong> The geographically enclosed enclave of
              Mahe, bordered entirely by Kannur and Kozhikode districts, historically operates under separate Puducherry excise tariffs.
              Coordinated border patrolling prevented transit of lower-taxed spirits into adjacent Kerala polling areas.
            </li>
          </ul>

          <p className="text-xs text-neutral-400">
            For users tracking state-by-state differences, our{' '}
            <Link href="/india/kerala" className="text-amber-400 underline hover:text-white">
              DryCheck Kerala Page
            </Link>{' '}
            monitors standing regulations in Kerala alongside adjacent states including Tamil Nadu and Karnataka.
          </p>
        </section>

        {/* Section F: What It Means for Consumers and Establishments */}
        <section id="consumer-rules" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Beer className="h-5 w-5 text-amber-400" />
            <span>6. Rules for Retail, Bars, Clubs &amp; Individuals</span>
          </h2>
          <p>
            The legal restrictions established in Order G.O.(Rt)No.332/2026/TAXES operated across several commercial and private domains:
          </p>

          <div className="space-y-3">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-1.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-rose-400" />
                <span>Retail Liquor Outlets (BEVCO &amp; Consumerfed)</span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                In Kerala, retail liquor sales operate as a state monopoly through the{' '}
                <strong className="text-white">Kerala State Beverages Corporation (BEVCO)</strong> and the{' '}
                <strong className="text-white">Kerala State Co-operative Consumers&apos; Federation (Consumerfed)</strong>. All company-run
                and federation-run retail self-service and over-the-counter vends were ordered shuttered throughout the 48-hour polling
                window and the entire counting day.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-1.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-rose-400" />
                <span>Hotels, Bar Parlours &amp; Star Establishments</span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                The order explicitly eliminated any exemptions for premium hospitality licenses. Establishments holding FL-3 (bar hotel)
                and FL-11 (beer and wine parlour) licenses—including 3-star, 4-star, 5-star, and luxury heritage hotels—were strictly
                prohibited from serving alcohol. Furthermore, room service of alcoholic beverages to resident in-house guests was completely banned.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-1.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-rose-400" />
                <span>Private &amp; Non-Proprietary Social Clubs</span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Social, athletic, and officers&apos; clubs licensed under FL-4A were not permitted to dispense alcohol to members or guests.
                The order explicitly designated &ldquo;non-proprietary clubs&rdquo; to preclude legal arguments regarding private member ownership.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-1.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-rose-400" />
                <span>Individual Possession &amp; Storage Prohibitions</span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                The order expressly instructed that &ldquo;the storage of liquor by individuals should be curtailed&rdquo; and &ldquo;the
                storage of liquor by individuals is also prohibited.&rdquo; While possession of legally purchased alcohol within statutory
                limits is generally permitted on standard dry days under Kerala Abkari Rules, this election decree gave excise officers
                extraordinary authority to confiscate stockpiled liquor and prosecute unlicensed premises suspected of distribution.
              </p>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-white pt-2">
            Penalties Under Law
          </h3>
          <p>
            Non-compliance with election dry-day directives carries dual penal liabilities:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>
              <strong className="text-white">RPA Section 135C(2):</strong> Any person who contravenes the dry-day order shall be
              punishable with imprisonment for a term which may extend to six months, or with fine which may extend to two thousand rupees, or with both.
            </li>
            <li>
              <strong className="text-white">Kerala Abkari Act:</strong> Commercial establishments face immediate sealing of premises,
              seizure of inventory, and statutory cancellation of their excise licenses by the Excise Commissioner.
            </li>
          </ul>
        </section>

        {/* Section G: How to Check Current Status */}
        <section id="how-to-check" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>7. How to Check Current Dry-Day Status in Kerala</span>
          </h2>
          <p>
            Because election notifications are date-specific and temporary, citizens and visitors should follow this verified,
            six-step procedure whenever verifying dry-day rules in Kerala:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <span className="font-mono text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-800 shrink-0">
                01
              </span>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  Check DryCheck India&apos;s Live Kerala Tracker
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  Visit{' '}
                  <Link href="/india/kerala" className="text-amber-400 font-semibold underline hover:text-white">
                    https://drycheck.in/india/kerala
                  </Link>
                  . Our engine calculates the exact IST status for today and tomorrow across Kerala, accounting for statutory
                  state rules and published gazettes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <span className="font-mono text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-800 shrink-0">
                02
              </span>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  Identify Standing Monthly Dry Days (1st of Every Month)
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  Unlike many other Indian states, Kerala observes a mandatory standing dry day on the <strong className="text-white">1st day
                  of every English calendar month</strong> under Rule 7A of the Foreign Liquor Rules. All BEVCO outlets and bar hotels remain
                  closed on this day each month.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <span className="font-mono text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-800 shrink-0">
                03
              </span>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  Identify the Issuing Authority
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  Legitimate dry days in Kerala must be proclaimed by the Government of Kerala Taxes Department, the State Excise
                  Commissioner, or the District Collector acting as District Magistrate. Unofficial social media claims should never be
                  trusted without verifying the underlying government order.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <span className="font-mono text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-800 shrink-0">
                04
              </span>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  Inspect the Gazette Order for Precise Hours &amp; Scope
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  Always inspect whether the government order applies to the entire state or is restricted to a specific municipality,
                  ward, or taluk (such as during local by-elections or regional temple festivals). Check the exact start and conclusion hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <span className="font-mono text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-800 shrink-0">
                05
              </span>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  Consult the Official BEVCO Calendar
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  The Kerala State Beverages Corporation maintains an official portal (
                  <a
                    href="https://ksbc.kerala.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>ksbc.kerala.gov.in</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  ) publishing scheduled warehouse and retail store holidays.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <span className="font-mono text-sm font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-800 shrink-0">
                06
              </span>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  Contact Local Excise Circle Offices When Unclear
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  For real-time operational confirmation regarding private events, banquet licenses, or club venues, contact your local
                  Excise Range or Circle Office under the Kerala State Excise Department.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section H: Related Information */}
        <section id="related-info" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <span>8. Related Kerala State Information</span>
          </h2>
          <p>
            Explore related real-time data, nearby state rules, and nationwide regulatory resources on DryCheck India:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/india/kerala"
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-xs font-mono text-amber-400 font-semibold block mb-1">
                Real-Time Status &rarr;
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                Kerala Live Tracker
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Check whether today or tomorrow is a dry day in Kerala.
              </p>
            </Link>

            <Link
              href="/guides"
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-xs font-mono text-amber-400 font-semibold block mb-1">
                Editorial Hub &rarr;
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                State Guides Collection
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Browse verified legal and excise guides for Indian states and UTs.
              </p>
            </Link>

            <Link
              href="/#state-directory"
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-neutral-900 transition-all group"
            >
              <span className="text-xs font-mono text-amber-400 font-semibold block mb-1">
                All India Directory &rarr;
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                36 States &amp; UTs Directory
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                View alcohol licensing policies across all 36 Indian jurisdictions.
              </p>
            </Link>
          </div>
        </section>

        {/* Section I: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>9. Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-neutral-400">
            Common questions regarding Kerala&apos;s 2026 election order and state alcohol sales rules.
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

        {/* Section J: Official Sources & Citations */}
        <section id="official-sources" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <FileText className="h-5 w-5 text-amber-400" />
            <span>10. Official References &amp; Editorial Note</span>
          </h2>
          <p>
            In accordance with DryCheck India&apos;s editorial standards, this guide relies exclusively on verified government
            gazettes, official notifications, and statutory enactments.
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
                is an independent public informational project. It is not affiliated with, authorized by, or endorsed by the
                Government of Kerala, the Election Commission of India, or the Kerala State Beverages Corporation.
              </p>
              <p>
                This publication provides general regulatory analysis based on official government documentation available as of{' '}
                <strong className="text-neutral-200">{guide.lastReviewedDate}</strong>. Statutory orders, rules, and election
                schedules are subject to amendment, supersession, or judicial clarification by competent authorities. This article
                does not constitute legal advice.
              </p>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
