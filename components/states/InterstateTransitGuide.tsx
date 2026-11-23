import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Car, Plane, Train, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function InterstateTransitGuide() {
  return (
    <section className="mt-14 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 sm:p-7 backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300 mb-2">
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Interstate Liquor Transit &amp; Carriage Regulations</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          How Much Alcohol Can You Carry Across State Borders in India?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-3xl leading-relaxed">
          Because alcohol excise is a State subject under Entry 8 of the Indian Constitution, transporting alcohol
          across state lines is heavily regulated. Understanding statutory checkposts, DGCA aviation baggage limits,
          and Railway bans prevents vehicle confiscation and criminal arrest.
        </p>
      </div>

      {/* 3 Transit Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {/* Card 1: By Road & Border Checkposts */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                <Car className="h-4 w-4" />
                <span>Road &amp; Highway Borders</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">Section 60/63</span>
            </div>

            <h3 className="text-base font-bold text-white mb-2">
              Interstate Checkposts (Delhi-UP, Goa-Karnataka)
            </h3>

            <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
              <p>
                <strong className="text-white">Goa to Karnataka / Maharashtra:</strong> Goa excise offers transit permits (~₹20) for up to 2 sealed bottles (750ml). However, Karnataka Excise Act (Sections 32 &amp; 34) and Maharashtra checkposts (Majali, Banda) do <em className="text-rose-300">not recognize Goa permits</em> and routinely seize bottles and impose heavy fines.
              </p>
              <p>
                <strong className="text-white">Delhi to UP / Haryana:</strong> Delhi Excise Rule 20 permits maximum <strong className="text-amber-300">1 sealed 750ml bottle</strong> per passenger from Haryana/UP. Crossing into UP with Haryana or Delhi liquor without UP state hologram barcode violates UP Excise Act Section 63 (vehicle seizure &amp; non-bailable arrest).
              </p>
              <p>
                <strong className="text-white">Entering Dry States:</strong> Entering Bihar or Gujarat by road with even a single drop of alcohol is an unbailable criminal offence resulting in mandatory vehicle impoundment and jail.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center gap-1.5 text-[11px] text-rose-400 font-medium">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            <span>Never transport commercial cartons across state boundaries.</span>
          </div>
        </div>

        {/* Card 2: Domestic Flights (DGCA / BCAS) */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20">
                <Plane className="h-4 w-4" />
                <span>Domestic Flights (DGCA)</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">Civil Aviation</span>
            </div>

            <h3 className="text-base font-bold text-white mb-2">
              Domestic Flights Carriage Rules (DGCA &amp; BCAS)
            </h3>

            <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
              <p>
                <strong className="text-white">Checked-in Baggage:</strong> The Bureau of Civil Aviation Security (BCAS) and Directorate General of Civil Aviation (DGCA) permit passengers to carry up to <strong className="text-amber-300">5 Litres of alcohol</strong> per passenger in check-in baggage.
              </p>
              <p>
                <strong className="text-white">Alcohol By Volume (ABV):</strong> Permitted beverages must contain between <strong className="text-sky-300">24% and 70% ABV</strong>. Beverages below 24% ABV (beer, mild wine) face standard weight restrictions. Beverages above 70% ABV are hazardous and banned.
              </p>
              <p>
                <strong className="text-white">Hand / Cabin Baggage:</strong> Strictly <strong className="text-rose-400">0 ml permitted</strong> in domestic cabin bags. Only duty-free liquor purchased post-security on international connecting flights in sealed tamper-evident bags (STEBs) is exempt.
              </p>
              <p>
                <strong className="text-white">Destination Dry State Warning:</strong> Landing at Patna (Bihar) or Ahmedabad/Surat (Gujarat) with checked alcohol triggers luggage scanning and state excise arrest upon airport exit!
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center gap-1.5 text-[11px] text-sky-400 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>Ensure original retail packaging with unbroken manufacturer seals.</span>
          </div>
        </div>

        {/* Card 3: Indian Railways Ban */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                <Train className="h-4 w-4" />
                <span>Indian Railways (Strict Ban)</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">Railways Act 1989</span>
            </div>

            <h3 className="text-base font-bold text-white mb-2">
              Indian Railways: 100% Total Carriage Ban
            </h3>

            <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
              <p>
                <strong className="text-white">Sections 164 &amp; 165:</strong> Under the Indian Railways Act, 1989, carrying any intoxicating liquor, opened or sealed, onto a passenger coach, platform, or railway parcel booking is <strong className="text-rose-400">completely prohibited nationwide</strong>.
              </p>
              <p>
                <strong className="text-white">Zero Exception for Tourists:</strong> Even if you hold an official state tourist permit from Goa, Puducherry, or Daman, the Railway Protection Force (RPF) and Government Railway Police (GRP) enforce central railway law and will confiscate the liquor.
              </p>
              <p>
                <strong className="text-white">Penalties:</strong> Violators face an immediate spot fine of ₹500 to ₹1,000, permanent confiscation of the consignment, and up to <strong className="text-amber-300">6 months imprisonment</strong> for carrying dangerous goods or causing nuisance.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center gap-1.5 text-[11px] text-rose-400 font-medium">
            <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
            <span>Never carry liquor on trains or through railway stations in India.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
