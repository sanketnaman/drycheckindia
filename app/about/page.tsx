import { Metadata } from 'next';
import Link from 'next/link';
import { Wine, ShieldAlert, BookOpen, Clock, Scale } from 'lucide-react';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  title: 'About DryCheck India | Indian Excise Law & Dry Day Guide',
  description:
    'Learn how dry days are declared in India, what laws govern liquor sale restrictions, and why DryCheck India provides independent, real-time IST updates.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About DryCheck India | Indian Excise Law & Dry Day Guide',
    description:
      'Learn how dry days are declared in India, what laws govern liquor sale restrictions, and why DryCheck India provides independent, real-time IST updates.',
    url: `${SITE_URL}/about`,
    siteName: 'DryCheck India',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-8">
      <div className="border-b border-neutral-800 pb-5 mb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-400 mb-2">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Independent Informational Project</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          About DryCheck India
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
          Aaj sookha hai ya nahi, ek nazar mein. Giving Indian citizens and visitors instant clarity on alcohol licensing closures across all 36 states and union territories.
        </p>
      </div>

      <div className="space-y-6 text-neutral-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Wine className="h-4 w-4 text-amber-400" />
            <span>Why DryCheck India Exists</span>
          </h2>
          <p>
            In India, liquor regulation is a state subject under Entry 8 of the State List (Seventh Schedule of the Constitution of India). That means every state and union territory exercises independent constitutional authority to enact excise laws, license retail vendors, fix dry dates, and impose local restrictions.
          </p>
          <p>
            Whether you are planning a family dinner, hosting friends, visiting another state, or simply wondering why the local store has its shutters down, finding reliable and up-to-date dry day information has historically required wading through PDFs and bureaucratic gazettes.
          </p>
          <p>
            <strong>DryCheck India</strong> was built to answer one simple question within 500 milliseconds: <em>&ldquo;Is today a dry day where I am?&rdquo;</em>
          </p>
        </section>

        <section className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Scale className="h-4 w-4 text-amber-400" />
            <span>How Dry Days Are Categorized</span>
          </h2>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-white">National Holidays (Mandatory Pan-India):</strong>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Three national festivals are observed nationwide as dry days: Republic Day (26 January), Independence Day (15 August), and Mahatma Gandhi Jayanti (2 October).
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-white">Religious &amp; Cultural Festivals:</strong>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Major festivals such as Holi, Diwali, Eid-ul-Fitr, Muharram, Mahavir Jayanti, Buddha Purnima, and Guru Nanak Jayanti. Individual state excise departments designate which of these are dry days in their respective annual calendars.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-white">Elections &amp; Polling Days:</strong>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Under Section 135C of the Representation of the People Act 1951, no spirituous, fermented, or intoxicating liquors can be sold, given, or distributed within a polling area during the 48 hours ending with the hour fixed for the conclusion of the poll.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-white">State-Specific &amp; Statutory Prohibition:</strong>
                <p className="text-xs text-neutral-400 mt-0.5">
                  States like Gujarat, Bihar, Nagaland, Mizoram, and Lakshadweep maintain total statutory alcohol prohibition. States like Kerala mandate a dry day on the 1st of every month statewide.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>Timezone &amp; Midnight Rollover</span>
          </h2>
          <p>
            All computations on this website are anchored strictly in Indian Standard Time (Asia/Kolkata, UTC+5:30). When midnight strikes in New Delhi or Mumbai, the &ldquo;Today&rdquo; status instantly rolls over.
          </p>
        </section>

        <section className="space-y-2 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>Strict Public Service Notice — Coverage: Partial</span>
          </div>
          <p className="text-xs text-neutral-400">
            Not a complete all-India dry-day calendar. Unknown state prohibition values are null, not false. Do not display null as 'not a dry day'. Date entries are empty because the reviewed sources did not establish a complete, current, state-wise date calendar.
          </p>
          <p className="text-xs text-neutral-400">
            DryCheck India does not sell, promote, deliver, facilitate, or market alcohol. It is an independent public-interest web utility designed to save citizens time and prevent unnecessary trips to shuttered stores.
          </p>
        </section>

        <div className="pt-4 flex items-center justify-between border-t border-neutral-800 text-xs text-neutral-400">
          <Link href="/" className="text-amber-400 hover:underline min-h-[44px] flex items-center">
            &larr; Return to Home
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors min-h-[44px] flex items-center">
            Submit an excise notice or report an error &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
