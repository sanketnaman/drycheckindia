import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PublicNoticeBar from '@/components/PublicNoticeBar';
import { getPublishedNotices } from '@/lib/public-drydays';

const SITE_URL = 'https://drycheck.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DRY CHECK India | Aaj sookha hai ya nahi, ek nazar mein',
    template: '%s | DRY CHECK India',
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
    siteName: 'DRY CHECK India',
    title: 'DRY CHECK India | Aaj sookha hai ya nahi, ek nazar mein',
    description:
      'Aaj sookha hai ya nahi, ek nazar mein. Find out whether liquor shops and bars are open or closed today and tomorrow in your Indian state or UT.',
    images: [
      {
        url: '/logo-desktop.png',
        width: 450,
        height: 150,
        alt: 'DRY CHECK India',
      },
    ],
  },
  icons: {
    icon: [{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }],
    shortcut: '/favicon-32x32.png',
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
        className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased selection:bg-amber-500 selection:text-neutral-950 font-sans"
      >
        <Navbar />
        {notices.length > 0 && <PublicNoticeBar notices={notices} />}
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
