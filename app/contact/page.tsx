import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Clock, ShieldCheck, MapPin, FileText, AlertCircle, ArrowLeft } from 'lucide-react';
import { CONTACT_EMAIL, EDITOR_NAME, EDITOR_ROLE } from '@/lib/site-config';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  title: 'Contact & Corrections Desk',
  description:
    'Contact the DryCheck India editorial desk for dry-day verification, breaking gazette corrections, media inquiries, or IT Rules 2021 compliance.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact & Corrections Desk | DryCheck India',
    description:
      'Contact our editorial and regulatory research desk for dry-day corrections, gazette submissions, and grievance redressal.',
    url: `${SITE_URL}/contact`,
    siteName: 'DryCheck India',
    images: [
      {
        url: '/logo-desktop.png',
        width: 450,
        height: 150,
        alt: 'DryCheck India Editorial Desk',
      },
    ],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact & Corrections',
        item: `${SITE_URL}/contact`,
      },
    ],
  };

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'DryCheck India Contact & Editorial Desk',
    url: `${SITE_URL}/contact`,
    description:
      'Editorial, verification, and statutory grievance desk for alcohol excise policy updates and gazette notifications across India.',
    mainEntity: {
      '@type': 'Organization',
      name: 'DryCheck India',
      url: SITE_URL,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Editorial & Gazette Corrections',
          email: CONTACT_EMAIL,
          availableLanguage: ['English', 'Hindi'],
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={contactPageSchema} />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-8 text-neutral-200">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="my-2 flex items-center text-xs text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2 text-neutral-600">/</span>
          <span className="text-amber-400 font-medium">Contact &amp; Corrections</span>
        </nav>

        {/* Hero Header */}
        <div className="border-b border-neutral-800 pb-5 mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-400 mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Editorial Standards &amp; Grievance Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Contact &amp; Gazette Corrections Desk
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
            DryCheck India is an independent public-service information utility. We verify statewide alcohol sale closures, Section 135C election curfews, and gazetted theka timings across all 36 Indian states and union territories. If you represent a local administration, hospitality body, or have spotted a regional date discrepancy, reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Contact Channels (2 Cols) */}
          <div className="md:col-span-2 space-y-6">
            {/* Primary Email Desk */}
            <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Direct Communication Channels</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    For quickest routing, email our specialized desk with the relevant subject line:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block font-semibold">
                    Gazette &amp; Date Corrections
                  </span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Gazette%20Correction%20Submission`}
                    className="text-xs font-semibold text-white hover:text-amber-400 underline block"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <p className="text-[11px] text-neutral-400">
                    Subject: <em>[State] - [Date] Correction</em>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                    Editorial &amp; Media Inquiries
                  </span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Media%20or%20Partnership%20Query`}
                    className="text-xs font-semibold text-white hover:text-amber-400 underline block"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <p className="text-[11px] text-neutral-400">
                    Interviews, academic research, and licensing.
                  </p>
                </div>
              </div>
            </section>

            {/* How to Submit a Gazette Correction */}
            <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6 space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-400" />
                <span>How to Submit a Gazette or DM Notification</span>
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Because alcohol regulation falls exclusively under the State List (Entry 8, List II) of the Constitution of India, District Collectors and Police Commissioners frequently declare localized dry days on short notice. To help us maintain 100% ground accuracy, please include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-400">
                <li><strong className="text-neutral-200">State &amp; District/City:</strong> Specify whether the order is statewide or confined to municipal/taluk boundaries.</li>
                <li><strong className="text-neutral-200">Order Number &amp; Issuing Authority:</strong> e.g., District Magistrate, Excise Commissionerate, or State Election Commission order copy.</li>
                <li><strong className="text-neutral-200">Document Link / Attachment:</strong> Official state portal URL, gazette PDF link, or scanned circular copy.</li>
              </ul>
              <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-950/20 text-xs text-amber-200 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Turnaround SLA:</strong> Our research team reviews submitted government gazettes and updates public status records within <strong>24 to 48 hours</strong> upon source verification.
                </p>
              </div>
            </section>

            {/* Statutory Compliance & Grievance Officer */}
            <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6 space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Grievance Redressal &amp; Statutory Compliance</span>
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                In compliance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and applicable Indian consumer transparency guidelines, editorial inquiries and statutory grievances may be escalated directly to our designated lead:
              </p>
              <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs space-y-1 text-neutral-300">
                <div><strong>Grievance Officer:</strong> {EDITOR_NAME}</div>
                <div><strong>Designation:</strong> {EDITOR_ROLE}, DryCheck India</div>
                <div><strong>Email:</strong> <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-400 underline">{CONTACT_EMAIL}</a></div>
                <div><strong>Response Standard:</strong> Formal acknowledgement within 24 hours; complete resolution within 15 working days.</div>
              </div>
            </section>
          </div>

          {/* Sidebar Info & Trust Badges (1 Col) */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                <span>Operating Hours (IST)</span>
              </h3>
              <p className="text-xs text-neutral-300">
                <strong>Monday to Saturday:</strong><br />
                9:30 AM to 6:30 PM (IST UTC+5:30)
              </p>
              <p className="text-[11px] text-neutral-400">
                Automated status trackers and verified Supabase datasets update continuously 24/7 across all time zones.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                <span>Editorial Desk Location</span>
              </h3>
              <p className="text-xs text-neutral-300">
                National Capital Region (NCR), New Delhi, India.
              </p>
              <p className="text-[11px] text-neutral-500">
                Monitoring state excise directorates across Northern, Southern, Eastern, Western, and North-Eastern zones.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                Public Utility Notice
              </span>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                DryCheck India is an independent educational reference utility. We do not manufacture, sell, distribute, or facilitate alcohol delivery. We advocate compliance with state-level excise regulations and minimum legal drinking age statutes.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="block text-center text-xs font-semibold text-amber-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 rounded-xl p-3 transition-colors"
              >
                Learn How We Verify Dry Days &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-5 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-amber-400 hover:underline min-h-[44px]">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
          <span className="text-neutral-500">DryCheck India Public Service Desk</span>
        </div>
      </div>
    </>
  );
}
