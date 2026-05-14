'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CinematicPortrait } from './CinematicPortrait'
import { Button } from '@/components/ui/button'

const REVEAL = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as any }

export function Hero() {
  return (
    <section className="relative bg-ink text-soft overflow-hidden grain">
      <div className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 max-w-[1480px] mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-12 gap-x-8 lg:gap-x-12 items-end">

          {/* LEFT — typography */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7 relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[10px] font-medium tracking-[0.4em] uppercase text-mute mb-10 flex items-center gap-4"
            >
              <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
              <span>Vol. 01 — Grooming Intelligence</span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...REVEAL, delay: 0.15 }}
              className="font-display font-extrabold leading-[0.88] tracking-[-0.045em] text-[clamp(2.75rem,8.6vw,9.5rem)]"
            >
              Find the taper
              <br />
              that actually
              <br />
              <span className="italic font-medium text-mute">fits your face.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...REVEAL, delay: 0.4 }}
              className="mt-10 max-w-xl text-base lg:text-lg text-soft/65 leading-[1.65]"
            >
              A grooming intelligence platform that reads facial structure, hair texture, and
              maintenance tolerance — then returns the taper styles most likely to suit you.
              Barber-ready, in under a minute.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...REVEAL, delay: 0.55 }}
              className="mt-12 flex flex-wrap items-center gap-5"
            >
              <Button asChild variant="cream" size="lg" shape="pill">
                <Link href="/tool">
                  Begin the analysis
                  <span aria-hidden="true">→</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" shape="pill">
                <Link href="#how-it-works">
                  <span aria-hidden="true" className="block h-px w-6 bg-soft/40" />
                  See the method
                </Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.85 }}
              className="mt-10 text-[10px] tracking-[0.32em] uppercase text-mute"
            >
              Currently free during beta &nbsp;·&nbsp; No card &nbsp;·&nbsp; ~60s
            </motion.p>
          </div>

          {/* RIGHT — cinematic portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block col-span-5 xl:col-span-5 relative"
          >
            <CinematicPortrait />
          </motion.div>
        </div>

        {/* AUTHORITY STRIP — trust metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...REVEAL, delay: 0.9 }}
          className="mt-24 lg:mt-32 pt-10 border-t border-line"
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
                className="flex flex-col gap-2 rounded-2xl border border-line bg-surface/30 p-5 lg:p-6 hover:border-soft/15 hover:bg-surface/60 hover:-translate-y-0.5 transition-all duration-500"
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
      </div>

      {/* Moving editorial wordmark strip — bottom of hero */}
      <div className="relative border-t border-line overflow-hidden py-10 mt-8">
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
