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

          <nav className="hidden md:flex items-center gap-9 text-[11px] font-medium tracking-[0.22em] uppercase text-soft/70">
            <Link href="#how-it-works" className="hover:text-soft transition-colors">Method</Link>
            <Link href="#face-shape"   className="hover:text-soft transition-colors">Face</Link>
            <Link href="#hair-type"    className="hover:text-soft transition-colors">Hair</Link>
            <Link href="#maintenance"  className="hover:text-soft transition-colors">Maintenance</Link>
            <Link href="#faq"          className="hover:text-soft transition-colors">FAQ</Link>
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
