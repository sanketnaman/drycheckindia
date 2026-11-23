import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PublicNoticeBar from '@/components/PublicNoticeBar';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import BuyMeACoffee from '@/components/BuyMeACoffee';
import PageTracker from '@/components/PageTracker';
import { getPublishedNotices } from '@/lib/public-drydays';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'DryCheck India',
  appleWebApp: {
    title: 'DryCheck India',
  },
  title: {
    default: 'DryCheck India | Aaj sookha hai ya nahi, ek nazar mein',
    template: '%s | DryCheck India',
  },
  description:
    'Aaj sookha hai ya nahi, ek nazar mein. Instant check for dry days today and tomorrow across all 36 Indian states and union territories with real-time IST calendars.',
  keywords: [
    'DryCheck India',
    'dry day today',
    'is today a dry day',
    'dry day tomorrow',
    'sookha din',
    'dry day calendar 2026',
    'excise dry day list india',
    'delhi dry day',
    'maharashtra dry day',
    'bangalore dry day',
    'kerala dry day'
  ],
  authors: [{ name: 'DryCheck India Team' }],
  creator: 'DryCheck India',
  publisher: 'DryCheck India',
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'DryCheck India',
    title: 'DryCheck India | Aaj sookha hai ya nahi, ek nazar mein',
    description:
      'Aaj sookha hai ya nahi, ek nazar mein. Find out whether liquor shops and bars are open or closed today and tomorrow in your Indian state or UT.',
    images: [
      {
        url: '/logo-desktop.png',
        width: 450,
        height: 150,
        alt: 'DryCheck India',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DryCheck India | Aaj sookha hai ya nahi, ek nazar mein',
    description:
      'Aaj sookha hai ya nahi, ek nazar mein. Check today and tomorrow dry day status in India instantly.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notices = await getPublishedNotices();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var _fetch=window.fetch;Object.defineProperty(window,'fetch',{configurable:true,enumerable:true,get:function(){return _fetch;},set:function(v){_fetch=v;}});}catch(e){}})();`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased selection:bg-amber-500 selection:text-neutral-950 font-sans relative overflow-x-clip"
      >
        {/* Subtle Gold Theme Ambient Glow on Top Header/Hero across all pages */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[550px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,158,11,0.12),transparent_75%)] z-0"
        />

        {/* Global Gold Grid Pattern Background across all pages */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-grid-gold"
        />

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          {notices.length > 0 && <PublicNoticeBar notices={notices} />}
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </div>
        <GoogleAnalytics />
        <BuyMeACoffee />
        <Suspense fallback={null}>
          <PageTracker />
        </Suspense>
      </body>
    </html>
  );
}
