'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Camera, ScanLine, Sparkles } from 'lucide-react'
import { Cinematic, SectionEyebrow } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { HeroIntelligenceModule } from './HeroIntelligenceModule'
import { easeLux } from '@/lib/motion'

/**
 * Phase 03 — Hero Section Redesign
 *
 * Goal: replace the abstract artwork with the interactive grooming
 * intelligence module, sharpen the CTA hierarchy (primary 'Get My Match',
 * secondary 'View Example Results'), and add three micro trust signals.
 * Body / sections / SEO structure untouched.
 */

const TRUST_SIGNALS = [
  { Icon: Camera,    label: 'Photos deleted after analysis' },
  { Icon: Sparkles,  label: 'Free early access' },
  { Icon: ScanLine,  label: 'Barber-ready recommendations' },
] as const

export function Hero() {
  return (
    <section className="relative bg-ink text-soft overflow-hidden grain">
      <Cinematic as="div" className="pt-36 lg:pt-44 pb-16 lg:pb-24">

        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-12 items-end">

          {/* LEFT — typography column */}
          <div className="col-span-12 lg:col-span-7 relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeLux }}
              className="mb-10"
            >
              <SectionEyebrow>Vol. 01 — Grooming Intelligence</SectionEyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: easeLux }}
              className="type-hero-xl"
            >
              Find the taper that actuall
              <span className="italic font-medium text-mute">fits your face.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4, ease: easeLux }}
              className="mt-10 max-w-xl type-body text-soft/65"
            >
              A grooming intelligence platform that reads facial structure, hair texture, and
              maintenance tolerance — then returns the taper styles most likely to suit you.
              Barber-ready, in under a minute.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55, ease: easeLux }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <Button asChild variant="cream" size="lg" shape="pill">
                <Link href="/tool">
                  Get My Match
                  <span aria-hidden="true">→</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" shape="pill">
                <Link href="/results">
                  View Example Results
                </Link>
              </Button>
            </motion.div>

            {/* Trust signals — three micro proofs */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.85, ease: easeLux }}
              className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              {TRUST_SIGNALS.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-soft/55"
                >
                  <Icon className="w-3.5 h-3.5 text-gold/80" strokeWidth={1.5} />
                  <span>{label}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT — interactive grooming intelligence module */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: easeLux }}
            className="hidden lg:block col-span-5 relative"
          >
            <HeroIntelligenceModule />
          </motion.div>
        </div>

        {/* Mobile module — below content stack */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: easeLux }}
          className="lg:hidden mt-14 -mx-2 sm:mx-0 max-w-md mx-auto"
        >
          <HeroIntelligenceModule />
        </motion.div>

        {/* Authority strip — trust metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.95, ease: easeLux }}
          className="mt-20 lg:mt-32 pt-10 border-t border-line"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            {[
              ['12,847', 'Profiles matched'],
              ['94%',    'Average compatibility'],
              ['~58s',   'To barber-ready brief'],
              ['40+',    'Taper styles indexed'],
            ].map(([metric, label]) => (
              <div
                key={label as string}
                className="flex flex-col gap-2 rounded-med border border-line bg-surface/30 p-5 lg:p-6 hover:border-lineHover hover:bg-surface/60 hover:-translate-y-0.5 transition-all duration-500 ease-lux"
              >
                <span className="font-display text-3xl lg:text-4xl font-extrabold text-soft tracking-tight tabular-nums">
                  {metric}
                </span>
                <span className="text-[10px] font-medium tracking-[0.28em] uppercase text-mute">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Cinematic>

      {/* Moving editorial wordmark strip — bottom of hero */}
      <div className="relative border-t border-line overflow-hidden py-10">
        <div className="marquee-track gap-16 text-soft/[0.06]">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-16 px-8 whitespace-nowrap">
              {['Cinematic Editorial Intelligence', 'For Modern Men', 'Face Optimized', 'Volume 01'].map((p, i) => (
                <span key={`${dup}-${i}`} className="flex items-center gap-16">
                  <span className="font-display font-extrabold tracking-[-0.04em] text-[clamp(3rem,8vw,7rem)] leading-none">
                    {p}
                  </span>
                  <span aria-hidden="true" className="text-gold/40 text-4xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
