'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, ChartLine, Info } from 'phosphor-react'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      icon: <House className="h-5 w-5" weight="duotone" />,
    },
    {
      href: '/dashboard',
      icon: <ChartLine className="h-6 w-6" weight="duotone" />,
    },
    {
      href: '/how-it-works',
      icon: <Info className="h-5 w-5" weight="duotone" />,
    },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 pt-3">
      <div className="relative mx-auto flex w-full max-w-4xl items-center justify-between rounded-full border border-slate-800 px-4 py-3 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const isCenter = item.href === '/dashboard'
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative inline-flex items-center justify-center rounded-full border-2 transition duration-200 ${
                isCenter
                  ? `z-10 -mt-5 h-16 w-16 bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 border-transparent transition duration-200 ease-out ${
                      isActive
                        ? 'shadow-[0_0_0_24px_rgba(217,119,6,0.22)] hover:animate-[pulse_1.8s_ease-in-out_1] hover:shadow-[0_0_0_28px_rgba(217,119,6,0.28)] before:absolute before:inset-0 before:-m-1 before:rounded-full before:border before:border-amber-600/60 before:content-[]'
                        : 'shadow-[0_24px_40px_-24px_rgba(217,119,6,0.9)] hover:-translate-y-0.5 hover:shadow-[0_0_0_28px_rgba(217,119,6,0.28)] before:absolute before:inset-0 before:-m-1 before:rounded-full before:border before:border-amber-600/50 before:content-[]'
                    }`
                  : 'h-14 w-14 bg-slate-900/60 text-slate-400 border-slate-800 transition-transform duration-200 hover:scale-105 hover:border-slate-700 hover:bg-slate-900/80 hover:text-slate-100'
              } ${
                isActive && !isCenter
                  ? 'bg-slate-800 text-white border-slate-700 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.85)]'
                  : ''
              }`}
            >
              {item.icon}
              {item.href === '/dashboard' && !isActive ? (
                <span className="absolute -right-1.5 top-0 flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.18)]" />
              ) : null}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
