'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-xl backdrop-saturate-150 border-b border-line'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <Link href="/" aria-label="Taper Empire — Home" className="flex items-center">
            <Image
              src="/logos/taper-empire-white.svg"
              alt="Taper Empire"
              width={200}
              height={32}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-[11px] font-medium tracking-[0.22em] uppercase text-soft/70">
            {[
              ['#how-it-works', 'Method'],
              ['#face-shape',   'Face'],
              ['#hair-type',    'Hair'],
              ['#maintenance',  'Maintenance'],
              ['#faq',          'FAQ'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-full hover:text-soft hover:bg-soft/[0.06] transition-all duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          <Button asChild variant="cream" size="sm" shape="pill">
            <Link href="/tool">
              Begin
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
