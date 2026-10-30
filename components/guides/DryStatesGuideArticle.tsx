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
  ArrowRight,
  ShieldCheck,
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
    { id: 'all-india-comparison', label: '7. All-India Comparison Table: Prohibition vs Open States' },
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
            Bharat ke samvidhaan (Constitution of India) ke <strong className="text-white">Article 47</strong> (Directive Principles of State Policy)
            me spasht roop se ullekh hai ki rajya sarkar ko public health sudharne ke liye{' '}
            <strong className="text-neutral-100">&quot;intoxicating drinks aur hanikarak nasheeli vastuon ke sewan par roak (prohibition) lagane ka prayas karna chahiye&quot;</strong>.
          </p>
          <p>
            Kyunki Constitution ke Seventh Schedule me <strong className="text-white">Alcohol ek State Subject (Entry 8, State List)</strong> hai,
            isliye har rajya sarkar ke paas poorn adhikaar hota hai ki wo apne rajya me sharab par poorn pratibandh (total prohibition) lagaye,
            ya phir excise duty aur taxes ke zariye ise regulate kare.
          </p>
        </section>

        {/* Section 2: The 5 Complete Prohibition States */}
        <section id="five-dry-states" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <span>2. The 5 Complete Statutory Prohibition States &amp; UTs in India</span>
          </h2>
          <p>
            Vartamaan me Bharat ke <strong className="text-white">4 rajyon aur 1 kendrashasit pradesh (Union Territory)</strong> me 365 din
            sharab ki bikri, khareed aur consumption par statutory ban hai:
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
            Gujarat Bharat ka ekmatra aisa prohibition state hai jahan bahar se aane wale domestic tourists aur international travellers ko
            legal roop se alcohol purchase aur consume karne ki vyavastha di gayi hai:
          </p>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/80 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              How Visitors Can Get a Legal Tourist Liquor Permit in Gujarat:
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-300">
              <li><strong className="text-white">Online Application:</strong> Gujarat State Excise portal (<code className="text-amber-300">eps.gpe.gujarat.gov.in</code>) par jakar visitor permit ke liye apply kar sakte hain.</li>
              <li><strong className="text-white">Required Proofs:</strong> Valid identity proof, ticket/boarding pass proving travel into Gujarat, aur residential address proof showing residence outside Gujarat.</li>
              <li><strong className="text-white">Permit Hotels:</strong> Ahmedabad, Surat, Vadodara, Rajkot aur Gandhinagar ke authorized 4-star aur 5-star hotels me designated liquor shops se permit holder alcohol purchase kar sakta hai.</li>
              <li><strong className="text-white">GIFT City Exemption:</strong> Gandhinagar me GIFT City financial tech corridor me authorized international business employees aur official guests ke liye licensed wine and dine areas me alcohol serve karne ki vishesh chhoot di gayi hai.</li>
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
              Google par bohot log search karte hain ki <strong className="text-white">is uttarakhand a dry state</strong> ya{' '}
              <strong className="text-white">uttarakhand is dry state or not</strong>.
            </p>
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong className="text-amber-300">Uttarakhand poora dry state nahi hai.</strong> Dehradun, Mussoorie, Nainital, Haldwani,
              Roorkee aur zyadatar tourist locations par licensed retail wine shops, theke aur hotel bars open rehte hain.
            </p>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Lekin Pavitra Teerth Kshetro me complete ban enforce hai:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
              <li><strong className="text-white">Haridwar &amp; Rishikesh:</strong> Municipal limits aur Ganga ghats ke 5 km ke radius me alcohol aur meat ki bikri poori tarah pratibandhit hai.</li>
              <li><strong className="text-white">Char Dham Corridors:</strong> Badrinath, Kedarnath, Gangotri, Yamunotri mandir parishar ke aas-paas liquor shops strictly banned hain.</li>
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
            Aamtaur par travelers me kai rajyon ko lekar galatfahmiyan hoti hain. Yahan official fact-check hai:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Is Sikkim a Dry State? NO</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Sikkim me sharab poori tarah legal hai. Sikkim me kai famous distilleries hain aur local traditional drink jaise Tongba (millet beer)
                bhi prachalit hai. Gangtok aur baki sabhi zilon me wine shops open rehte hain.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Is Meghalaya a Dry State? NO</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Meghalaya me koi sharabbandi nahi hai. Shillong me vibrant cafe culture, microbreweries aur licensed bars operate karte hain.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Is Jharkhand a Dry State? NO</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Padosi rajya Bihar me ban hone ke bawajood, Jharkhand me sarkar dwara supervised retail liquor theke Ranchi, Jamshedpur, Dhanbad
                aur sabhi zilon me niyamit roop se khulte hain.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Is Pondicherry (Puducherry) a Dry State? NO</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Puducherry me alcohol par desh ke sabse kam excise taxes me se ek hain. Yeh French colony apne cheap liquor, beach cafes aur bars
                ke liye mashhoor hai.
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
              Agar aap flight, train ya car se Bihar ya Gujarat travel kar rahe hain, to bhulkar bhi bag me alcohol na rakhein.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong className="text-white">Bihar:</strong> Border checkposts aur railway stations par breathalyzers aur dog squads se checking hoti hai. Alcohol consumption ya possession par seedha arrest aur non-bailable FIR ho sakti hai.</li>
              <li><strong className="text-white">Gujarat:</strong> Bina permit alcohol le jaana Section 65 aur 66 ke tahat criminal offence hai. Gaadi seize aur arrest ho sakti hai.</li>
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
