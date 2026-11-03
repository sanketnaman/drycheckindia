import { Metadata } from 'next';
import Link from 'next/link';
import { Wine, BookOpen, Clock, Scale, UserCheck, ShieldCheck, RefreshCw } from 'lucide-react';
import { EDITOR_NAME, EDITOR_ROLE, EDITOR_BIO, CONTACT_EMAIL } from '@/lib/site-config';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  title: 'About & How We Verify Dry Days',
  description:
    'Learn how dry days are declared in India, what laws govern liquor sale restrictions, and why DryCheck India provides independent, real-time IST updates.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About & How We Verify Dry Days | DryCheck India',
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
                  States like Gujarat, Bihar, and Nagaland maintain total statutory alcohol prohibition (special restricted regimes apply in Mizoram and Lakshadweep — check local rules). States like Kerala mandate a dry day on the 1st of every month statewide.
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

        {/* Who Runs DryCheck India */}
        <section className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-amber-400" />
            <span>Who Runs DryCheck India</span>
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
            <p>
              DryCheck India is curated and managed by <strong className="text-white">{EDITOR_NAME}</strong> ({EDITOR_ROLE}).
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {EDITOR_BIO}
            </p>
            <p className="text-xs text-neutral-400 pt-1">
              Have questions or feedback about our editorial process? Reach out directly via our{' '}
              <Link href="/contact" className="text-amber-400 underline hover:text-white">
                Contact page
              </Link>{' '}
              or email <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-400 underline hover:text-white">{CONTACT_EMAIL}</a>.
            </p>
          </div>
        </section>

        {/* How We Verify Dry Days */}
        <section className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span>How We Verify</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                Authoritative Sources We Rely On:
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-400">
                <li><strong className="text-neutral-200">State Excise Notifications &amp; Official Gazettes:</strong> Direct circulars, annual dry-day lists, and statutory orders issued by state governments and union territory excise departments.</li>
                <li><strong className="text-neutral-200">Election Commission Statutory Orders:</strong> Notifications issued under Section 135C of the Representation of the People Act, 1951 by the Election Commission of India (ECI) and State Election Commissions, mandating liquor sale bans in polling areas 48 hours prior to poll close and on counting days.</li>
                <li><strong className="text-neutral-200">Reputable News Reports:</strong> Major national and state media outlets for emergency law-and-order restrictions or breaking administrative circulars.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                How We Label Status:
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-400">
                <li><strong className="text-rose-400">Confirmed (Dry / Closed):</strong> Backed by an official gazette notification, confirmed government circular, or standing statutory prohibition.</li>
                <li><strong className="text-amber-400">Maybe / Reported (Not Officially Confirmed):</strong> Supported by local reporting or preliminary announcement, but awaiting gazette publication or official administrative confirmation.</li>
                <li><strong className="text-emerald-400">Open / Not Dry:</strong> Standard retail operations permitted under normal state excise hours when no dry day notification applies.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                Conflicting Sources &amp; Independence:
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                When official notices conflict or local reports are ambiguous, we do not guess or speculate. We mark the record as unconfirmed (<span className="text-amber-400">Maybe</span>) or note the conflicting scopes so users are informed.
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed mt-1.5">
                DryCheck India is an independent public-service website. We are neither an official government agency nor affiliated with any state excise department.
              </p>
            </div>
          </div>
        </section>

        {/* Corrections Policy */}
        <section className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-amber-400" />
            <span>Corrections Policy</span>
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
            <p className="text-xs text-neutral-400 leading-relaxed">
              We take factual accuracy seriously. If you spot an error, an unlisted municipal restriction, or an outdated calendar date, please report it to us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-400 underline hover:text-white font-medium">
                {CONTACT_EMAIL}
              </a>
              {' '}or via our <Link href="/contact" className="text-amber-400 underline hover:text-white">Contact page</Link>.
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We aim to review submitted excise notices and gazette links within <strong>48 hours</strong>. When updates occur, our in-depth guides show an &ldquo;Updated&rdquo; and &ldquo;Last reviewed&rdquo; date so readers can verify freshness.
            </p>
          </div>
        </section>

        {/* Public Notice Disclaimer */}
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
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
