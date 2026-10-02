import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kumaspeak.app'),
  title: 'Kumamoto Tap & Speak',
  description: 'A tap-to-speak communication app for international students, residents, and visitors in Kumamoto.',
  manifest: '/manifest.json',
  applicationName: 'Kumamoto Tap & Speak',
  alternates: { canonical: './' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'Kumamoto Tap & Speak',
    title: 'Kumamoto Tap & Speak',
    description: 'A tap-to-speak communication app for international students, residents, and visitors in Kumamoto.',
    url: './',
  },
};

const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kumamoto Tap & Speak',
  alternateName: ['KumaSpeak', 'kumaspeak'],
  url: 'https://www.kumaspeak.app/',
};

export const viewport: Viewport = {
  themeColor: '#0f766e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <Analytics />
      <SpeedInsights />
      <body>{children}</body>
    </html>
  );
}
