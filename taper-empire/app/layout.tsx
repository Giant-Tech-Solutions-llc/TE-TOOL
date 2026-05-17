import type { Metadata, Viewport } from 'next'
import { Inter, Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Taper Empire — Grooming Intelligence for Modern Men',
    template: '%s · Taper Empire',
  },
  description:
    'Find the taper that actually fits your face. A grooming intelligence platform that reads your face shape, hair texture, and maintenance tolerance — and returns barber-ready taper recommendations.',
  keywords: [
    'taper haircut', 'low taper', 'mid taper', 'high taper', 'fade vs taper',
    'haircut for face shape', 'AI haircut recommendation', 'barber tool',
  ],
  authors: [{ name: 'Taper Empire' }],
  creator: 'Taper Empire',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Taper Empire',
    title: 'Taper Empire — Grooming Intelligence for Modern Men',
    description: 'Find the taper that actually fits your face. Barber-ready recommendations in 60 seconds.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taper Empire — Grooming Intelligence for Modern Men',
    description: 'Find the taper that actually fits your face. Barber-ready recommendations.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: { canonical: SITE_URL },
  category: 'lifestyle',
  formatDetection: { email: false, address: false, telephone: false },
  applicationName: 'Taper Empire',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <body className="bg-ink text-soft antialiased font-sans">
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
