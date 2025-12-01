import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = 'https://investornest.ca'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'InvestOrNest - Mortgage vs Investment Calculator for Canadians',
    template: '%s | InvestOrNest',
  },
  description:
    'Free Canadian mortgage vs investment calculator. Should I pay off my mortgage faster or invest? Get instant, transparent answers with semi-annual compounding, inflation adjustment, and home appreciation. Privacy-first, all calculations client-side.',
  keywords: [
    'mortgage calculator',
    'investment calculator',
    'Canadian mortgage',
    'pay off mortgage vs invest',
    'financial calculator',
    'mortgage prepayment',
    'mortgage vs invest',
    'Canadian mortgage calculator',
    'prepay mortgage or invest',
    'mortgage payoff calculator',
    'investment return calculator',
    'net worth calculator',
    'financial planning',
    'Canadian homeowners',
    'mortgage amortization',
  ],
  authors: [{ name: 'Ranbir Singh' }],
  creator: 'Ranbir Singh',
  publisher: 'InvestOrNest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: siteUrl,
    siteName: 'InvestOrNest',
    title: 'InvestOrNest - Mortgage vs Investment Calculator for Canadians',
    description:
      'Free Canadian mortgage vs investment calculator. Should I pay off my mortgage faster or invest? Get instant, transparent answers.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'InvestOrNest - Mortgage vs Investment Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InvestOrNest - Mortgage vs Investment Calculator for Canadians',
    description:
      'Free Canadian mortgage vs investment calculator. Should I pay off my mortgage faster or invest?',
    images: [`${siteUrl}/og-image.png`],
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
  alternates: {
    canonical: siteUrl,
  },
  category: 'Finance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'InvestOrNest',
              description:
                'Free Canadian mortgage vs investment calculator. Should I pay off my mortgage faster or invest?',
              url: siteUrl,
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'CAD',
              },
              creator: {
                '@type': 'Person',
                name: 'Ranbir Singh',
              },
              featureList: [
                'Canadian mortgage calculator with semi-annual compounding',
                'Investment return calculator',
                'Mortgage vs investment comparison',
                'Net worth trajectory visualization',
                'Inflation-adjusted calculations',
                'Home appreciation modeling',
                'Privacy-first client-side calculations',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

