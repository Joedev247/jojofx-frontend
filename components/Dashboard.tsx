'use client'

import { useEffect } from 'react'
import SessionTimer from './SessionTimer'
import TradingViewEmbed from './TradingViewEmbed'
import SignalWidget from './SignalWidget'

export default function Dashboard() {
  useEffect(() => {
    // Fetch dashboard data from backend
  }, [])

  return (
    <div className="space-y-6 w-full mt-20">
      <div className="grid grid-cols-1 gap-5">
        <div className=" bg-slate-900/95  p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-semibold tracking-wide text-white">Live trading session status</h2>
              <p className="mt-2 text-sm text-slate-500">XAUUSD trades across three major sessions: <span className="text-slate-300 font-medium">ASIA</span> (Tokyo), <span className="text-slate-300 font-medium">LONDON</span> (European), and <span className="text-slate-300 font-medium">NY</span> (American). Active indicator shows which session is currently live.</p>
            </div>
          </div>
          <div className="bg-slate-950/80 p-4  mt-10">
            <SessionTimer />
          </div>
        </div>
      </div>

      <div className=" bg-slate-700  " id="live-signals-section">
        <SignalWidget />
      </div>

      <div className="bg-slate-900/95  p-4" id="tradingview-section">
        <h2 className="text-xl font-bold mb-4">XAUUSD Chart</h2>
        <TradingViewEmbed />
      </div>
    </div>
  )
}
