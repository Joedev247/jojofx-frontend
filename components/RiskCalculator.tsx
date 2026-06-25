'use client'

import { useState } from 'react'
import { calculatePositionSize, calculateRiskReward } from '@/lib/tradingRules'

export default function RiskCalculator() {
  const [accountBalance, setAccountBalance] = useState(100)
  const [riskPercent, setRiskPercent] = useState(2)
  const [stopLossPips, setStopLossPips] = useState(20)
  const [entry, setEntry] = useState(2350)
  const [sl, setSl] = useState(2340)
  const [tp, setTp] = useState(2365)

  const lotSize = calculatePositionSize(accountBalance, riskPercent, stopLossPips)
  const riskAmount = accountBalance * (riskPercent / 100)
  const riskReward = calculateRiskReward(entry, sl, tp)

  return (
    <div className="card w-full  p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold mb-4">Inputs</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Account Balance ($)</label>
              <input type="number" value={accountBalance} onChange={(e) => setAccountBalance(parseFloat(e.target.value))} className="input-field" />
            </div>
            <div>
              <label className="block mb-2">Risk %</label>
              <input type="number" step="0.1" value={riskPercent} onChange={(e) => setRiskPercent(parseFloat(e.target.value))} className="input-field" />
            </div>
            <div>
              <label className="block mb-2">Stop Loss (pips)</label>
              <input type="number" value={stopLossPips} onChange={(e) => setStopLossPips(parseFloat(e.target.value))} className="input-field" />
            </div>
            <div>
              <label className="block mb-2">Entry</label>
              <input type="number" step="0.01" value={entry} onChange={(e) => setEntry(parseFloat(e.target.value))} className="input-field" />
            </div>
            <div>
              <label className="block mb-2">Stop Loss</label>
              <input type="number" step="0.01" value={sl} onChange={(e) => setSl(parseFloat(e.target.value))} className="input-field" />
            </div>
            <div>
              <label className="block mb-2">Take Profit</label>
              <input type="number" step="0.01" value={tp} onChange={(e) => setTp(parseFloat(e.target.value))} className="input-field" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Results</h3>
          <div className="space-y-4">
            <div className="card bg-gray-700">
              <p className="text-sm text-gray-400">Lot Size</p>
              <p className="text-2xl font-bold text-gold">{lotSize} lots</p>
            </div>
            <div className="card bg-gray-700">
              <p className="text-sm text-gray-400">Risk Amount</p>
              <p className="text-2xl font-bold text-red-400">${riskAmount.toFixed(2)}</p>
            </div>
            <div className="card bg-gray-700">
              <p className="text-sm text-gray-400">Risk:Reward Ratio</p>
              <p className={`text-2xl font-bold ${riskReward >= 2 ? 'text-green-400' : 'text-yellow-400'}`}>1:{riskReward.toFixed(2)}</p>
            </div>
            <div className="card bg-gray-700">
              <p className="text-sm text-gray-400">Max Profit ($)</p>
              <p className="text-2xl font-bold text-green-400">${(riskAmount * riskReward).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
