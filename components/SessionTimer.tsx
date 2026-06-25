'use client'

import { useEffect, useState } from 'react'

export default function SessionTimer() {
  const [currentSession, setCurrentSession] = useState('London Open')
  const [timeUntilNext, setTimeUntilNext] = useState('')

  useEffect(() => {
    const updateSession = () => {
      const now = new Date()
      const hours = now.getHours() + 1

      let session = 'Session Closed'
      if (hours >= 8 && hours < 11) session = 'London Open'
      else if (hours >= 11 && hours < 13) session = 'Midday Quiet'
      else if (hours >= 13 && hours < 17) session = 'London/NY Overlap'
      else if (hours >= 17 && hours < 19) session = 'NY Late'

      setCurrentSession(session)
    }

    updateSession()
    const interval = setInterval(updateSession, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p className="text-xl font-bold text-gold">{currentSession}</p>
      <p className="text-sm text-gray-400 mt-2">Cameroon WAT</p>
    </div>
  )
}
