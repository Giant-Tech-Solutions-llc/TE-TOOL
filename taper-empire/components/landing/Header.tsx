'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { MobileNav } from './MobileNav'

/**
 * Header — Phase 02 floating cinematic navbar.
 *
 * Spec (Global Design System §6):
 *   height            74px (shrinks to 64px when scrolled)
 *   border-radius     999px
 *   width             min(92%, 1380px)
 *   background        rgba(12,12,12,0.78) blurred
 *   border            1px solid rgba(255,255,255,0.06)
 *
 * Scroll behavior: shrink subtly + increase blur, never lose elegance.
 * Mobile: triggers premium fullscreen overlay (see MobileNav).
 */

const NAV_LINKS = [
  { href: '#how-it-works', label: 'Method' },
  { href: '#face-shape',   label: 'Face' },
  { href: '#hair-type',    label: 'Hair' },
  { href: '#maintenance',  label: 'Maintenance' },
  { href: '#faq',          label: 'FAQ' },
] as const

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body scroll lock while overlay is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [mobileOpen])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      {/* Floating pill navbar */}
      <header
        className="fixed top-4 sm:top-5 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none"
        aria-label="Primary"
      >
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between rounded-pill border transition-[height,background-color,backdrop-filter,padding,box-shadow] duration-500 ease-lux ${
            scrolled
              ? 'h-[64px] bg-[rgba(12,12,12,0.88)] backdrop-blur-[22px] border-[rgba(255,255,255,0.08)] shadow-luxury-sm px-4 sm:px-5'
              : 'h-[74px] bg-[rgba(12,12,12,0.78)] backdrop-blur-nav border-[rgba(255,255,255,0.06)] shadow-luxury-sm px-5 sm:px-6'
          }`}
          style={{ width: 'min(92%, 1380px)' }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Taper Empire — Home"
            className="flex items-center group/logo shrink-0"
          >
            <Image
              src="/logos/taper-empire-white.svg"
              alt="Taper Empire"
              width={200}
              height={32}
              priority
              className={`w-auto transition-all duration-500 ease-lux group-hover/logo:opacity-90 ${
                scrolled ? 'h-6' : 'h-7'
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 text-[11px] font-medium tracking-[0.22em] uppercase text-soft/70">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-pill hover:text-soft hover:bg-soft/[0.06] transition-all duration-300 ease-lux"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right cluster — CTA + mobile trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild variant="cream" size="sm" shape="pill" className="hidden sm:inline-flex">
              <Link href="/tool">
                Begin
                <span aria-hidden="true">→</span>
              </Link>
            </Button>

            {/* Mobile menu trigger — visible below lg */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden grid place-items-center w-11 h-11 rounded-full border border-[rgba(255,255,255,0.08)] text-soft hover:bg-soft/[0.06] hover:border-[rgba(255,255,255,0.16)] transition-all duration-300 ease-lux"
            >
              <Bars />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={closeMobile}
        links={NAV_LINKS}
      />
    </>
  )
}

/** Custom hamburger glyph — two hairlines, hugged to the brand */
function Bars() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M5 9h14M5 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
