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
  HelpCircle,
  CheckCircle,
  Building2,
  BookOpen,
  Globe2,
} from 'lucide-react';

interface DryStatesGuideArticleProps {
  guide: Guide;
}

export default function DryStatesGuideArticle({ guide }: DryStatesGuideArticleProps) {
  const tocItems = [
    { id: 'constitutional-basis', label: '1. Constitutional Basis: Article 47 & Alcohol Laws in India' },
    { id: 'five-dry-states', label: '2. The 5 Complete Statutory Prohibition States & UTs' },
    { id: 'gujarat-permits', label: '3. Gujarat Tourist Permits & GIFT City Exceptions' },
    { id: 'uttarakhand-sacred-ban', label: '4. Sacred Town Bans: Is Uttarakhand a Dry State?' },
    { id: 'myth-busting', label: '5. Myth Busting: Are Sikkim, Meghalaya & Jharkhand Dry States?' },
    { id: 'penalties-transit', label: '6. Interstate Smuggling Penalties & Border Checkposts' },
    { id: 'faqs', label: '7. Frequently Asked Questions (FAQs)' },
    { id: 'official-sources', label: '8. Official Citations & Regulatory References' },
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
          Dry States in India 2026
        </span>
      </nav>

      {/* Header section with H1 */}
      <header className="border-b border-neutral-800 pb-6 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Scale className="h-3.5 w-3.5" />
            National Regulatory Pillar
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60">
            Scope: Pan-India Law
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
            Active 2026 Reference
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
          <Globe2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm">
            <h2 className="text-sm sm:text-base font-bold text-amber-300">
              Looking for Today&apos;s Live Dry Day Status Across All 36 States?
            </h2>
            <p className="leading-relaxed text-amber-200/90">
              Whether you are planning travel or checking if alcohol is banned in your destination state today,
              DryCheck India evaluates live gazette notifications in real-time IST for all 36 Indian states and union territories:{' '}
              <Link href="/#state-directory" className="underline font-semibold text-white hover:text-amber-300">
                Explore All 36 States Directory &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents items={tocItems} />

      {/* Main Body Content */}
      <div className="space-y-10 text-xs sm:text-sm leading-relaxed text-neutral-300">

        {/* Section 1: Constitutional Basis */}
        <section id="constitutional-basis" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Scale className="h-5 w-5 text-amber-400" />
            <span>1. Constitutional Basis: Article 47 &amp; Alcohol Laws in India</span>
          </h2>
          <p>
            Under the Constitution of India, <strong className="text-white">Article 47</strong> (Directive Principles of State Policy) explicitly establishes that the State shall endeavor to bring about prohibition of the consumption, except for medicinal purposes, of intoxicating drinks and of drugs which are injurious to health.
          </p>
          <p>
            Pursuant to the Seventh Schedule to the Constitution of India, <strong className="text-white">Alcohol is a State Subject (Entry 8, List II &ndash; State List)</strong>. As a result, each individual state legislature exercises plenary constitutional authority either to enact complete statutory alcohol prohibition within its borders or to generate public revenue through state excise taxation and licensed commercial retail distribution.
          </p>
        </section>

        {/* Section 2: The 5 Complete Prohibition States */}
        <section id="five-dry-states" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <span>2. The 5 Complete Statutory Prohibition States &amp; UTs in India</span>
          </h2>
          <p>
            Currently, <strong className="text-white">4 Indian states and 1 Union Territory</strong> enforce complete, 365-day statutory prohibition on the sale, purchase, and consumption of alcoholic beverages:
          </p>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300">
                  <th className="p-3 font-semibold">State / UT</th>
                  <th className="p-3 font-semibold">Enacted Since</th>
                  <th className="p-3 font-semibold">Statutory Act / Law</th>
                  <th className="p-3 font-semibold">Key Exemptions</th>
                  <th className="p-3 font-semibold">Penalties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">Gujarat</td>
                  <td className="p-3 text-neutral-300">1960 (State formation)</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Gujarat Prohibition Act, 1949</strong></td>
                  <td className="p-3 text-neutral-300">Online tourist permits; GIFT City official visitors</td>
                  <td className="p-3 text-rose-300">Fines, bootlegging jail up to 10 years</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">Bihar</td>
                  <td className="p-3 text-neutral-300">April 2016</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Bihar Prohibition &amp; Excise Act, 2016</strong></td>
                  <td className="p-3 text-neutral-300">Zero consumer exemptions</td>
                  <td className="p-3 text-rose-300">First-time fine or jail; non-bailable repeated offences</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">Nagaland</td>
                  <td className="p-3 text-neutral-300">1989</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Nagaland Liquor Total Prohibition (NLTP) Act, 1989</strong></td>
                  <td className="p-3 text-neutral-300">Military cantonments / hospitals</td>
                  <td className="p-3 text-rose-300">Imprisonment up to 3 years and fines</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">Mizoram</td>
                  <td className="p-3 text-neutral-300">2019</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Mizoram Liquor Prohibition Act, 2019</strong></td>
                  <td className="p-3 text-neutral-300">Defence personnel quotas only</td>
                  <td className="p-3 text-rose-300">Fines and imprisonment</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">Lakshadweep</td>
                  <td className="p-3 text-neutral-300">Permanent</td>
                  <td className="p-3 text-neutral-200"><strong className="text-white">Lakshadweep Prohibition Regulation</strong></td>
                  <td className="p-3 text-neutral-300">Bangaram Island (uninhabited tourist resort only)</td>
                  <td className="p-3 text-rose-300">Seizure of vessel and arrest</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Gujarat Tourist Permits & GIFT City */}
        <section id="gujarat-permits" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <span>3. Gujarat Tourist Permits &amp; GIFT City Exceptions</span>
          </h2>
          <p>
            Gujarat is the sole prohibition state in India that provides a formal statutory mechanism allowing domestic tourists and international visitors to legally purchase and consume alcohol:
          </p>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/80 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              How Visitors Can Obtain a Legal Tourist Liquor Permit in Gujarat:
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-300">
              <li><strong className="text-white">Online Application:</strong> Travelers can apply directly on the Gujarat State Excise portal (<code className="text-amber-300">eps.gpe.gujarat.gov.in</code>) for an official visitor permit.</li>
              <li><strong className="text-white">Required Documentation:</strong> Valid government identity proof, travel tickets or boarding passes confirming arrival into Gujarat, and proof of primary residence outside the State of Gujarat.</li>
              <li><strong className="text-white">Authorized Permit Outlets:</strong> Approved permit holders may purchase designated rations from authorized liquor counters situated inside certified 4-star and 5-star hotels in Ahmedabad, Surat, Vadodara, Rajkot, and Gandhinagar.</li>
              <li><strong className="text-white">GIFT City Exemption:</strong> In Gandhinagar&apos;s GIFT City financial hub, authorized international business executives and official visitors are permitted to consume alcohol in designated licensed dining and lounge facilities.</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Sacred Town Bans - Is Uttarakhand a Dry State? */}
        <section id="uttarakhand-sacred-ban" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <span>4. Sacred Town Bans: Is Uttarakhand a Dry State?</span>
          </h2>
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              The Real Truth About Uttarakhand Alcohol Laws:
            </h3>
            <p className="text-xs text-neutral-200 leading-relaxed">
              Online travelers frequently search whether <strong className="text-white">&ldquo;is uttarakhand a dry state&rdquo;</strong> or ask{' '}
              <strong className="text-white">&ldquo;uttarakhand is dry state or not&rdquo;</strong>.
            </p>
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong className="text-amber-300">Uttarakhand is NOT a complete dry state.</strong> Licensed retail wine stores, thekas, and hotel dining bars operate routinely across major cities including Dehradun, Mussoorie, Nainital, Haldwani, and Roorkee.
            </p>
            <p className="text-xs text-neutral-300 leading-relaxed">
              However, complete statutory alcohol bans are enforced in sacred spiritual zones:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
              <li><strong className="text-white">Haridwar &amp; Rishikesh:</strong> The sale and public possession of alcohol and meat are strictly prohibited within municipal areas and along the sacred ghats of the River Ganga.</li>
              <li><strong className="text-white">Char Dham Corridors:</strong> Liquor sales are strictly banned around the revered temple complexes of Badrinath, Kedarnath, Gangotri, and Yamunotri.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Myth Busting */}
        <section id="myth-busting" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <CheckCircle className="h-5 w-5 text-amber-400" />
            <span>5. Myth Busting: Are Sikkim, Meghalaya, Jharkhand &amp; Andaman Dry States?</span>
          </h2>
          <p>
            Travelers frequently encounter misconceptions regarding alcohol availability across other Indian jurisdictions. Here is the verified legal reality:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Is Sikkim a Dry State? NO</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Alcohol is entirely legal in Sikkim. The state is home to prominent commercial breweries and distilleries, and traditional beverages such as Tongba (millet beer) are culturally established. Licensed stores operate regularly in Gangtok and across the state.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Is Meghalaya a Dry State? NO</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Meghalaya enforces no alcohol prohibition. Shillong features an active cafe culture, microbreweries, and licensed hospitality bars.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Is Jharkhand a Dry State? NO</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Despite sharing a border with Bihar, Jharkhand permits government-regulated retail liquor vends to operate regularly in Ranchi, Jamshedpur, Dhanbad, and all administrative districts.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Is Pondicherry (Puducherry) a Dry State? NO</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Puducherry maintains some of the lowest alcohol excise taxes in India. The union territory is famous for its coastal French Quarter cafes, beach lounges, and bars.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Interstate Smuggling Penalties */}
        <section id="penalties-transit" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-rose-400" />
            <span>6. Interstate Smuggling Penalties &amp; Border Checkposts</span>
          </h2>
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 space-y-2 text-rose-200">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-300">
              Important Transit Warning for Bihar &amp; Gujarat Travelers:
            </h3>
            <p className="text-xs leading-relaxed">
              If traveling by air, railway, or private automobile into Bihar or Gujarat, do NOT carry any alcoholic beverages in your luggage.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong className="text-white">Bihar:</strong> Inter-state checkposts and railway stations deploy breathalyzers and trained canine inspection squads. Alcohol possession or consumption triggers immediate arrest and non-bailable FIR registration.</li>
              <li><strong className="text-white">Gujarat:</strong> Transporting liquor without an authorized state transport permit is a criminal offence under Sections 65 and 66 of the Gujarat Prohibition Act, leading to vehicle confiscation and arrest.</li>
            </ul>
          </div>
        </section>

        {/* Section 7: FAQs */}
        <section id="faqs" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>7. Frequently Asked Questions (FAQs) &bull; Dry States in India</span>
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

        {/* Section 8: Official Sources */}
        <section id="official-sources" className="space-y-4 border-t border-neutral-800 pt-6">
          <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">
            8. Official Citations &amp; Legal References
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