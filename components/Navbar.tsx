'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border border-slate-800 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-24 h-24 overflow-hidden  group-hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="JOJOFX"
                fill
                sizes="96px"
                className="object-cover object-center"
                priority
              />
            </div>
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-600 hidden sm:inline group-hover:from-yellow-200 group-hover:to-amber-500 transition-all">
              JOJOFX
            </span>
          </Link>

          {/* Forex Vibes Content */}
          <div className="hidden md:flex flex-col items-center justify-center flex-1 px-8">
            <p className="text-sm text-yellow-300/90 font-semibold tracking-wide">🔥 PROFESSIONAL XAUUSD TRADING</p>
            <p className="text-xs text-slate-400 mt-1">Real-time signals • Risk management • Market analysis</p>
            <div className="flex gap-4 mt-3">
              <div className="text-center">
                <p className="text-xs text-yellow-400 font-bold">24/7</p>
                <p className="text-xs text-slate-500">Market Monitoring</p>
              </div>
              <div className="w-px bg-slate-700"></div>
              <div className="text-center">
                <p className="text-xs text-yellow-400 font-bold">AI-Powered</p>
                <p className="text-slate-500 text-xs">Trading Signals</p>
              </div>
              <div className="w-px bg-slate-700"></div>
              <div className="text-center">
                <p className="text-xs text-yellow-400 font-bold">Risk First</p>
                <p className="text-xs text-slate-500">Position Sizing</p>
              </div>
            </div>
          </div>

          {/* View Chart Button for Mobile */}
          <Link href="/dashboard#live-signals-section" className="md:hidden px-3 py-2 text-xs font-bold bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50">
            Live Signals
          </Link>
        </div>
      </div>
    </nav>
  )
}