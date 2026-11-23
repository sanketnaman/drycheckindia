import React from 'react';
import Link from 'next/link';
import { Store, Building2, Landmark, ShieldAlert, Award, FileSpreadsheet } from 'lucide-react';

export default function StateRetailModelsGuide() {
  const govtCorporations = [
    {
      name: 'TASMAC',
      state: 'Tamil Nadu',
      fullName: 'Tamil Nadu State Marketing Corporation',
      desc: '100% state-run retail monopoly. Private wine shops do not exist in Tamil Nadu. Vends operate strictly from 12:00 PM (Noon) to 10:00 PM.',
      slug: 'tamil-nadu',
    },
    {
      name: 'BEVCO / Consumerfed',
      state: 'Kerala',
      fullName: 'Kerala State Beverages Corporation',
      desc: 'Sole wholesale and primary retail distributor. Operates under strict queue management. Mandatory dry day on the 1st of every calendar month.',
      slug: 'kerala',
    },
    {
      name: 'KSBCL',
      state: 'Karnataka',
      fullName: 'Karnataka State Beverages Corporation Ltd',
      desc: 'State wholesale monopoly supplying all CL-2 retail vends, bars, and clubs. Standard retail hours run 10:00 AM – 10:30 PM.',
      slug: 'karnataka',
    },
    {
      name: 'APBCL',
      state: 'Andhra Pradesh',
      fullName: 'Andhra Pradesh State Beverages Corporation Ltd',
      desc: 'Regulates government and licensed retail vends, setting statutory pricing and managing inventory logistics from 10:00 AM to 9:00 PM.',
      slug: 'andhra-pradesh',
    },
    {
      name: 'DTTDC / DSIIDC / DCCWS',
      state: 'Delhi (NCT)',
      fullName: 'Delhi State Undertakings Retail Consortium',
      desc: 'Since September 2022, Delhi retail liquor is 100% government operated across 600+ computerized POS vends (10:00 AM – 10:00 PM).',
      slug: 'delhi',
    },
    {
      name: 'OSBC / WBSBCL',
      state: 'Odisha & West Bengal',
      fullName: 'Odisha State Beverages & West Bengal BEVCO',
      desc: 'State wholesale clearance corporations providing digital consignment passes (e-Abgari) to licensed private retail franchisees.',
      slug: 'odisha',
    },
  ];

  return (
    <section className="mt-14 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 sm:p-7 backdrop-blur-sm">
      <div className="border-b border-neutral-800 pb-5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-2">
          <Building2 className="h-3.5 w-3.5" />
          <span>Excise Architecture &amp; Corporation Models</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Government Liquor Corporations vs Private Auction Markets in India
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-3xl leading-relaxed">
          How alcohol is bought and sold across Indian states depends on three distinct regulatory frameworks:
          complete State Corporation monopolies (e.g. TASMAC, BEVCO), open licensed private auctions (e.g. UP, Haryana),
          or total statutory prohibition (e.g. Bihar, Gujarat).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Category 1: State Govt Monopolies */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              State Government Retail &amp; Wholesale Corporations
            </h3>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            In several southern and eastern states, private entrepreneurship in liquor retail has been eliminated to curb spurious
            distillation and maximize exchequer revenue. In these states, every bottle is sold directly through government counters:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {govtCorporations.map((corp) => (
              <div
                key={corp.name}
                className="rounded-xl border border-neutral-800/90 bg-neutral-950/70 p-3.5 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-300 text-sm tracking-wide">{corp.name}</span>
                    <span className="text-[11px] text-neutral-400 font-medium px-2 py-0.5 rounded bg-neutral-800">
                      {corp.state}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 block mb-2">{corp.fullName}</span>
                  <p className="text-xs text-neutral-300 leading-relaxed">{corp.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-800/60">
                  <Link
                    href={`/india/${corp.slug}`}
                    className="text-xs text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium"
                  >
                    <span>View {corp.state} dry day schedule &rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2 & 3: Private Auction Markets & Total Prohibition */}
        <div className="space-y-5">
          {/* Private Auction Models */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Store className="h-4 w-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Open Private Licensing &amp; Auctions</h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-3">
              States like <strong className="text-white">Uttar Pradesh, Haryana, Punjab, Rajasthan, and Goa</strong> allocate retail licenses to private entrepreneurs through annual e-lotteries or high-value tenders.
            </p>
            <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
              <li><strong className="text-neutral-200">Uttar Pradesh:</strong> ~₹45,000 Cr excise target; strict track-and-trace QR codes.</li>
              <li><strong className="text-neutral-200">Haryana:</strong> Extended late-night timings (up to 24/7 in Gurugram cyber belts).</li>
              <li><strong className="text-neutral-200">Goa:</strong> Highly competitive pricing with minimal UT-level excise duty.</li>
            </ul>
          </div>

          {/* Total Prohibition */}
          <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="h-4 w-4 text-rose-400" />
              <h4 className="text-sm font-bold text-rose-200">5 Complete Prohibition Jurisdictions</h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-2.5">
              Five states and union territories maintain statutory bans with zero legal wine shops:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'Bihar (2016)', slug: 'bihar' },
                { name: 'Gujarat (1960)', slug: 'gujarat' },
                { name: 'Nagaland (1989)', slug: 'nagaland' },
                { name: 'Mizoram (2019)', slug: 'mizoram' },
                { name: 'Lakshadweep', slug: 'lakshadweep' },
              ].map((dry) => (
                <Link
                  key={dry.name}
                  href={`/india/${dry.slug}`}
                  className="rounded-md bg-rose-900/40 border border-rose-800/50 px-2 py-1 text-[11px] font-medium text-rose-300 hover:bg-rose-800/60 transition-colors"
                >
                  {dry.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
