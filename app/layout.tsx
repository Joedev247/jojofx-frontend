import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JOJOFX Trading Bot',
  description: 'Professional XAUUSD trading assistant based on JOJOFX system',
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
        <main className="min-h-screen bg-gray-900 text-white pb-28 pt-16">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  )
}
