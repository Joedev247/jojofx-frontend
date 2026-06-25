'use client'

import Link from 'next/link'
import HeroCarousel from './HeroCarousel'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Features Grid */}
        <section className="grid gap-5 sm:grid-cols-2">
          <div className=" border border-slate-800 bg-slate-900/95 p-5 shadow-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Signal review</p>
            <h2 className="mt-3 text-xl font-semibold text-white">Live analysis summary</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">See the current XAUUSD signal grade, direction guidance, and the status of your latest setup.</p>
          </div>
          <div className=" border border-slate-800 bg-slate-900/95 p-5 shadow-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Trading logic</p>
            <h2 className="mt-3 text-xl font-semibold text-white">Understand the setup rules</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Read the signal validation process and learn how the app checks trend, structure, timing, and risk controls.</p>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className=" border border-slate-800 bg-slate-900/95 p-5 shadow-xl">
          <h2 className="text-xl font-semibold text-white">Next steps</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link href="/dashboard" className="bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 px-4 py-3 text-center text-sm font-semibold hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 rounded-lg">
              Visit Dashboard
            </Link>
            <Link href="/how-it-works" className="border border-slate-700 bg-slate-950 px-4 py-3 text-center text-sm text-slate-200 hover:border-yellow-400 hover:text-yellow-300 hover:shadow-lg hover:shadow-yellow-500/20 rounded-lg">
              Read setup logic
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
