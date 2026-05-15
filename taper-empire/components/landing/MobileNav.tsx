'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { easeLux } from '@/lib/motion'

/**
 * MobileNav — Phase 02 premium fullscreen overlay.
 *
 * Replaces the generic mobile drawer with a cinematic editorial overlay.
 * Spec: cinematic transitions, editorial spacing, fullscreen takeover.
 */

interface MobileNavProps {
  open: boolean
  onClose: () => void
  links: ReadonlyArray<{ href: string; label: string }>
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  // Esc to dismiss
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: easeLux }}
          className="fixed inset-0 z-[60] bg-[rgba(7,7,7,0.96)] backdrop-blur-[24px] grain-soft"
        >
          {/* Top bar — logo + close */}
          <div className="absolute inset-x-0 top-0 px-6 pt-6 flex items-center justify-between">
            <Link href="/" onClick={onClose} aria-label="Taper Empire — Home">
              <Image
                src="/logos/taper-empire-white.svg"
                alt="Taper Empire"
                width={180}
                height={28}
                className="h-6 w-auto"
                priority
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="w-11 h-11 rounded-full border border-[rgba(255,255,255,0.08)] grid place-items-center text-soft hover:bg-soft/[0.06] hover:border-[rgba(255,255,255,0.16)] hover:scale-105 transition-all duration-300 ease-lux"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Section eyebrow — editorial label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeLux }}
            className="absolute top-24 left-6 text-[10px] font-medium tracking-[0.32em] uppercase text-gold flex items-center gap-3"
          >
            <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
            Sections
          </motion.p>

          {/* Oversized link stack — primary nav */}
          <nav className="absolute inset-x-0 top-32 bottom-44 overflow-y-auto px-6">
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.06, ease: easeLux }}
                  className="border-b border-[rgba(255,255,255,0.06)]"
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="group/link flex items-center justify-between py-5 sm:py-6"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-mute tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display font-extrabold tracking-[-0.025em] text-[clamp(2rem,9vw,3.25rem)] leading-[1] text-soft group-hover/link:text-gold transition-colors duration-300">
                        {l.label}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-soft/40 group-hover/link:text-gold group-hover/link:translate-x-1 transition-all duration-300 text-xl"
                    >
                      →
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Bottom CTA + footer line */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: easeLux }}
            className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-6 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(7,7,7,0.6)] backdrop-blur-md"
          >
            <Button asChild variant="cream" size="lg" shape="pill" className="w-full">
              <Link href="/tool" onClick={onClose}>
                Begin the analysis
                <span aria-hidden="true">→</span>
              </Link>
            </Button>
            <p className="mt-5 text-[10px] tracking-[0.32em] uppercase text-mute text-center">
              Currently free during beta
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
