'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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

          <nav className="hidden md:flex items-center gap-9 text-[11px] font-medium tracking-[0.22em] uppercase text-soft/70">
            <Link href="#how-it-works" className="hover:text-soft transition-colors">Method</Link>
            <Link href="#face-shape"   className="hover:text-soft transition-colors">Face</Link>
            <Link href="#hair-type"    className="hover:text-soft transition-colors">Hair</Link>
            <Link href="#maintenance"  className="hover:text-soft transition-colors">Maintenance</Link>
            <Link href="#faq"          className="hover:text-soft transition-colors">FAQ</Link>
          </nav>

          <Link
            href="/tool"
            className="group inline-flex items-center gap-2.5 bg-soft text-ink px-5 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-gold hover:text-soft transition-colors"
          >
            <span>Begin</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
