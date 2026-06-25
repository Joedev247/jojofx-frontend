'use client'

import { useState } from 'react'
import { JOJOFX_RULES } from '@/lib/tradingRules'

export default function RuleChecklist() {
  const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY')
  const [checks, setChecks] = useState<Record<string, boolean>>({})

  const buyChecklist = [
    'Weekly trend is BULLISH (HH, HL pattern)',
    'Price at a Demand Zone or key Support',
    'Bullish Pin Bar or Engulfing on 1H/4H',
    'No major news in next 30 minutes',
    'DXY (Dollar Index) is falling or flat',
    'Stop Loss below the zone + 15 pip buffer',
    'Take Profit at minimum 1:2 RR',
    'Position size calculated correctly',
    'Session is London or New York (WAT)',
    'Max 1–2 trades already taken today',
  ]

  const sellChecklist = [
    'Weekly trend is BEARISH (LH, LL pattern)',
    'Price at a Supply Zone or key Resistance',
    'Bearish Pin Bar or Engulfing on 1H/4H',
    'No major news in next 30 minutes',
    'DXY (Dollar Index) is rising or strong',
    'Stop Loss above the zone + 15 pip buffer',
    'Take Profit at minimum 1:2 RR',
    'Position size calculated correctly',
    'Session is London or New York (WAT)',
    'Max 1–2 trades already taken today',
  ]

  const checklist = direction === 'BUY' ? buyChecklist : sellChecklist

  return (
    <div className="card w-full  p-4 sm:p-5">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button onClick={() => setDirection('BUY')} className={`btn-${direction === 'BUY' ? 'primary' : 'secondary'}`}>BUY Checklist</button>
        <button onClick={() => setDirection('SELL')} className={`btn-${direction === 'SELL' ? 'primary' : 'secondary'}`}>SELL Checklist</button>
      </div>
      <div className="space-y-3">
        {checklist.map((item, idx) => (
          <label key={idx} className="flex items-center cursor-pointer">
            <input type="checkbox" checked={checks[item] || false} onChange={(e) => setChecks({ ...checks, [item]: e.target.checked })} className="mr-3" />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <button className="btn-primary mt-6 w-full">Confirm & Enter Trade</button>
    </div>
  )
}
