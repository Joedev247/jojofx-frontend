'use client'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white px-4 py-8 sm:px-6 sm:py-10 ">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Hero Section */}
        <section className="border border-slate-800 bg-gradient-to-br from-slate-900/95 to-slate-950 p-6 shadow-2xl mt-4 sm:mt-6 md:mt-8">
          <div className="space-y-3">

            {/* Title */}
            <h1 className="text-1xl sm:text-2xl font-bold text-white leading-tight">
              How JOJOFX <span className="text-yellow-400">Signal Analysis</span> Works
            </h1>
            
            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Understand how the XAUUSD signal engine evaluates market conditions, validates setups, and grades entries using the proven JOJOFX trading system.
            </p>

            {/* Quick Stats */}
            <div className="flex gap-4 pt-3">
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-400">3</p>
                <p className="text-xs text-slate-400">Analysis Steps</p>
              </div>
              <div className="w-px bg-slate-700"></div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-400">100%</p>
                <p className="text-xs text-slate-400">Rule-Based</p>
              </div>
              <div className="w-px bg-slate-700"></div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-400">Real-Time</p>
                <p className="text-xs text-slate-400">Signals</p>
              </div>
            </div>
          </div>
        </section>

        <section className=" border border-slate-800 bg-slate-900/95 p-6 shadow-xl space-y-5">
          <h2 className="text-2xl font-semibold text-white">1. Live market scan</h2>
          <p className="text-slate-300 leading-7">
            The system monitors live XAUUSD price action and session structure, then generates a market signal when a valid setup appears on the chart.
          </p>
          <ul className="space-y-3 text-slate-300">
            <li className=" bg-slate-950/80 p-4">Session check: London and New York overlap is prioritized.</li>
            <li className=" bg-slate-950/80 p-4">Trend bias is determined from higher timeframe structure.</li>
            <li className=" bg-slate-950/80 p-4">Signal only activates when price meets a valid supply/demand or breakout retest zone.</li>
          </ul>
        </section>

        <section className=" border border-slate-800 bg-slate-900/95 p-6 shadow-xl space-y-5">
          <h2 className="text-2xl font-semibold text-white">2. Setup validation</h2>
          <p className="text-slate-300 leading-7">
            Each signal is tested against JOJOFX setup rules to ensure it fits risk controls and market structure.
          </p>
          <ul className="space-y-3 text-slate-300">
            <li className=" bg-slate-950/80 p-4">Trend and structure alignment</li>
            <li className=" bg-slate-950/80 p-4">Price location relative to support/resistance zones</li>
            <li className=" bg-slate-950/80 p-4">Rule checks such as stop placement and session timing</li>
          </ul>
        </section>

        <section className=" border border-slate-800 bg-slate-900/95 p-6 shadow-xl space-y-5">
          <h2 className="text-2xl font-semibold text-white">3. Signal grade and risk guidance</h2>
          <p className="text-slate-300 leading-7">
            The app outputs a signal grade, recommended direction, and risk/reward ratio. This helps you make disciplined trading decisions.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className=" bg-slate-950/80 p-4">
              <h3 className="font-semibold text-white">Signal grade</h3>
              <p className="mt-2 text-slate-300">Each setup receives a quality grade based on entry precision, momentum, and rule alignment.</p>
            </div>
            <div className=" bg-slate-950/80 p-4">
              <h3 className="font-semibold text-white">Risk/reward</h3>
              <p className="mt-2 text-slate-300">The system calculates recommended stop and take profit zones so you can preserve capital first.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
