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
      className={`sticky top-0 z-40 bg-milk transition-shadow ${
        scrolled ? 'shadow-[0_1px_0_0_rgba(0,0,0,0.08)]' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <Link href="/" aria-label="Taper Empire — Home" className="flex items-center">
            <Image
              src="/logos/taper-empire-black.svg"
              alt="Taper Empire"
              width={200}
              height={32}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-[0.14em] uppercase">
            <Link href="#how-it-works" className="hover:text-accent transition-colors">Method</Link>
            <Link href="#face-shape"   className="hover:text-accent transition-colors">Face</Link>
            <Link href="#hair-type"    className="hover:text-accent transition-colors">Hair</Link>
            <Link href="#comparisons"  className="hover:text-accent transition-colors">Compare</Link>
            <Link href="#faq"          className="hover:text-accent transition-colors">FAQ</Link>
          </nav>

          <Link
            href="/tool"
            className="inline-flex items-center gap-2 bg-jet-black text-milk px-5 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase hover:bg-charcoal transition-colors"
          >
            <span>Begin</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
