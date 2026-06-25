'use client'

import { useState } from 'react'
import { api } from '@/lib/api'
import { JOJOFX_RULES } from '@/lib/tradingRules'

export default function SignalForm() {
  const [formData, setFormData] = useState({
    symbol: 'XAUUSD',
    direction: 'BUY',
    setup_type: 'SR_Bounce',
    entry_price: 0,
    suggested_stop_loss: 0,
    suggested_take_profit: 0,
    session: 'London_Open',
    news_check_passed: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.signals.create(formData)
      alert('Signal submitted successfully')
      setFormData({ ...formData, entry_price: 0 })
    } catch (error) {
      alert('Error submitting signal')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card w-full p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block mb-2">Direction</label>
          <select value={formData.direction} onChange={(e) => setFormData({ ...formData, direction: e.target.value as any })} className="input-field">
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Setup Type</label>
          <select value={formData.setup_type} onChange={(e) => setFormData({ ...formData, setup_type: e.target.value as any })} className="input-field">
            {JOJOFX_RULES.SETUP_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Entry Price</label>
          <input type="number" step="0.01" value={formData.entry_price} onChange={(e) => setFormData({ ...formData, entry_price: parseFloat(e.target.value) })} className="input-field" />
        </div>
        <div>
          <label className="block mb-2">Stop Loss</label>
          <input type="number" step="0.01" value={formData.suggested_stop_loss} onChange={(e) => setFormData({ ...formData, suggested_stop_loss: parseFloat(e.target.value) })} className="input-field" />
        </div>
        <div>
          <label className="block mb-2">Take Profit</label>
          <input type="number" step="0.01" value={formData.suggested_take_profit} onChange={(e) => setFormData({ ...formData, suggested_take_profit: parseFloat(e.target.value) })} className="input-field" />
        </div>
        <div>
          <label className="block mb-2">Session</label>
          <select value={formData.session} onChange={(e) => setFormData({ ...formData, session: e.target.value })} className="input-field">
            <option value="London_Open">London Open</option>
            <option value="London_NY_Overlap">London/NY Overlap</option>
            <option value="New_York">New York</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="flex items-center">
          <input type="checkbox" checked={formData.news_check_passed} onChange={(e) => setFormData({ ...formData, news_check_passed: e.target.checked })} className="mr-2" />
          News Check Passed
        </label>
      </div>
      <button type="submit" className="btn-primary mt-6 w-full">Submit Signal</button>
    </form>
  )
}
