import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InvestOrNest - Mortgage vs Investment Calculator for Canadians',
  description:
    'Should I pay off my mortgage faster or invest? Get instant, transparent answers with our Canadian mortgage vs investment calculator.',
  keywords: [
    'mortgage calculator',
    'investment calculator',
    'Canadian mortgage',
    'pay off mortgage vs invest',
    'financial calculator',
    'mortgage prepayment',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

