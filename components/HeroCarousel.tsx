'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    title: 'XAUUSD Signal Analysis',
    subtitle: 'Made Simple',
    description: 'Real-time XAUUSD signal quality monitoring with AI-powered analysis',
    color: 'from-blue-600/20 to-blue-900/20',
    borderColor: 'border-blue-800/30'
  },
  {
    id: 2,
    title: 'Professional Trading',
    subtitle: 'Risk Management',
    description: 'Advanced position sizing and risk controls for every trade',
    color: 'from-amber-600/20 to-amber-900/20',
    borderColor: 'border-amber-800/30'
  },
  {
    id: 3,
    title: '24/7 Market Monitoring',
    subtitle: 'Live Sessions',
    description: 'Track ASIA, LONDON, and NY sessions with real-time updates',
    color: 'from-emerald-600/20 to-emerald-900/20',
    borderColor: 'border-emerald-800/30'
  },
  {
    id: 4,
    title: 'AI-Powered Signals',
    subtitle: 'Smart Trading',
    description: 'Intelligent signal validation across trend, structure, and timing',
    color: 'from-purple-600/20 to-purple-900/20',
    borderColor: 'border-purple-800/30'
  },
  {
    id: 5,
    title: 'Trusted by Traders',
    subtitle: 'JOJOFX System',
    description: 'Built on proven XAUUSD trading methodology and risk protocols',
    color: 'from-yellow-600/20 to-yellow-900/20',
    borderColor: 'border-yellow-800/30'
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoPlay])

  const goToSlide = (index: number) => {
    setCurrent(index)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 10000)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 10000)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 10000)
  }

  const slide = slides[current]

  return (
    <section className="w-full mt-4 sm:mt-6 md:mt-8">
      {/* Main Carousel */}
      <div className="relative w-full overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">
        {/* Slides */}
        <div className="relative h-48 sm:h-56 md:h-64">
          {slides.map((s, index) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color}`} />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 md:px-10">
                <div className="max-w-2xl">
                  {/* Icon and Label */}
                  <div className="flex items-center gap-2 mb-2">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-yellow-400/80 font-bold">
                        𝐉𝐎𝐉𝐎𝐅𝐗
                      </p>
                    </div>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">
                    {s.title}
                  </h1>
                  
                  {/* Subtitle */}
                  <p className="text-sm sm:text-base md:text-lg text-yellow-400 font-semibold mb-2">
                    {s.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed mb-4">
                    {s.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-slate-950/60 hover:bg-slate-950/90 text-white p-2 rounded-full border border-slate-700 transition-all backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-slate-950/60 hover:bg-slate-950/90 text-white p-2 rounded-full border border-slate-700 transition-all backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === current
                  ? 'bg-yellow-500 w-2 h-2 shadow-lg shadow-yellow-500/50'
                  : 'bg-slate-600 w-1.5 h-1.5 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      
    </section>
  )
}
