'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Cinematic, SectionEyebrow } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { easeLux } from '@/lib/motion'

/**
 * Phase 08 — Barber-Ready Brief Showcase
 *
 * Visualizes the actual deliverable a user walks into the barbershop
 * with: a typed brief card with the verbatim instructions, guard
 * progression diagram, maintenance cadence, and the brand mark in the
 * corner. Replaces a paragraph of 'we generate barber-ready briefs'
 * marketing copy with the actual thing being described.
 */

export function BarberBriefShowcase() {
  return (
    <section
      id="barber-brief"
      className="relative bg-ink text-soft border-t border-line grain-soft"
    >
      <Cinematic className="section-y">

        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 items-start">

          {/* LEFT — editorial copy */}
          <div className="col-span-12 lg:col-span-5 lg:pt-4">
            <SectionEyebrow className="mb-6">Chapter VI — Barber-Ready Brief</SectionEyebrow>
            <h2 className="type-section mb-7">
              Exact language.
              <br />
              <span className="italic font-medium text-mute">No charades.</span>
            </h2>
            <p className="text-base lg:text-lg text-soft/65 leading-[1.75] max-w-md mb-7">
              The chair conversation is where most haircut decisions fall apart. The output
              isn&rsquo;t a mood board — it&rsquo;s a printable brief with the exact phrasing
              your barber needs to hear.
            </p>
            <ul className="space-y-3 mb-10 max-w-md">
              {[
                'Guard progression with exact numbers',
                'Starting height and blend transition point',
                'Texture finish and styling direction',
                'Neckline preference + sideburn strategy',
                '30-day maintenance cadence',
              ].map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-soft/85">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="cream" size="lg" shape="pill">
              <Link href="/tool">
                Generate My Brief
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* RIGHT — mock barber brief card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.05, ease: easeLux }}
            className="col-span-12 lg:col-span-7"
          >
            <BriefCard />
          </motion.div>

        </div>

      </Cinematic>
    </section>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  BriefCard — mock printable barber brief
 * ─────────────────────────────────────────────────────────────────────── */
function BriefCard() {
  return (
    <article className="relative rounded-hero border border-line bg-surface/40 shadow-luxury overflow-hidden">

      {/* Watermark — large faded brand wordmark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-display font-extrabold tracking-[-0.05em] text-[12rem] text-soft/[0.025] whitespace-nowrap">
          TAPER · EMPIRE
        </span>
      </div>

      <div className="relative p-7 sm:p-10 lg:p-12">

        {/* Top meta row */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-6 border-b border-line">
          <div>
            <p className="type-eyebrow text-gold mb-2">Taper Empire — Edition I</p>
            <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">
              Barber-Ready Brief
            </p>
          </div>
          <p className="type-eyebrow text-mute tabular-nums">№ 0094 · Profile · Oval</p>
        </div>

        {/* Subject + score */}
        <div className="grid grid-cols-3 gap-x-6 sm:gap-x-10 py-6 border-b border-line">
          <div>
            <p className="type-eyebrow text-mute mb-1.5">Style</p>
            <p className="font-display text-lg sm:text-xl font-extrabold tracking-tight leading-tight">
              Low Taper Fade
            </p>
          </div>
          <div>
            <p className="type-eyebrow text-mute mb-1.5">Match</p>
            <p className="font-display text-lg sm:text-xl font-extrabold tabular-nums tracking-tight">
              94<span className="text-mute text-sm">%</span>
            </p>
          </div>
          <div>
            <p className="type-eyebrow text-mute mb-1.5">Maintenance</p>
            <p className="font-display text-lg sm:text-xl font-extrabold tracking-tight leading-tight">
              Low effort
            </p>
          </div>
        </div>

        {/* Brief paragraph */}
        <div className="py-6 border-b border-line">
          <p className="type-eyebrow text-gold mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
            Verbatim brief
          </p>
          <blockquote className="rounded-lg-x border-l-2 border-gold bg-ink/50 px-5 sm:px-6 py-4">
            <p className="text-sm sm:text-base text-soft/90 leading-[1.85] italic">
              &ldquo;Low taper, leave the natural hairline. Half guard at the temples, blend
              into a one at the nape. Keep the top two inches scissor-cut for natural movement.
              No skin fade. Edge up clean but soft on the sideburns.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Guard progression */}
        <div className="py-6 border-b border-line">
          <p className="type-eyebrow text-gold mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
            Guard progression
          </p>
          <GuardProgression />
        </div>

        {/* Maintenance row */}
        <div className="pt-6">
          <p className="type-eyebrow text-gold mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
            Maintenance cadence
          </p>
          <div className="relative pt-2">
            <div className="absolute left-3 right-3 top-[14px] h-px bg-line" />
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Day 0–3',  'Lock the shape', true],
                ['Day 7–14', 'Edge cleanup',   false],
                ['Day 21–30','Full reset',     true],
              ].map(([range, title, active]) => (
                <div key={range as string} className="relative flex flex-col items-start">
                  <span
                    className={`relative z-10 w-2.5 h-2.5 rounded-full ring-4 ring-surface mb-3 ${
                      active ? 'bg-gold' : 'bg-line'
                    }`}
                    aria-hidden="true"
                  />
                  <p className="type-eyebrow text-mute mb-1">{range}</p>
                  <p className={`font-display text-sm font-extrabold tracking-tight leading-tight ${
                    active ? 'text-soft' : 'text-soft/40'
                  }`}>
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-7 pt-5 border-t border-line">
          <p className="type-eyebrow text-mute">Ready to read aloud</p>
          <p className="type-eyebrow text-soft/65">taperempire.com</p>
        </div>
      </div>
    </article>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  GuardProgression — Phase 12.1
 *  Single row of five portrait reference cards matching the updated brief
 *  reference design. Each card is a crop of the actual taper at that
 *  guard height, captioned with guard number and head position so the
 *  brief reads as visual instruction the barber can scan in one glance.
 * ─────────────────────────────────────────────────────────────────────── */
const GUARD_STEPS = [
  { src: '/guards/nape.webp',      blur: '/guards/nape-blur.webp',      label: '#1',      position: 'Nape' },
  { src: '/guards/lower.webp',     blur: '/guards/lower-blur.webp',     label: '#1½',     position: 'Lower' },
  { src: '/guards/temple.webp',    blur: '/guards/temple-blur.webp',    label: '#2',      position: 'Temple' },
  { src: '/guards/above-ear.webp', blur: '/guards/above-ear-blur.webp', label: '#3',      position: 'Above ear' },
  { src: '/guards/top.webp',       blur: '/guards/top-blur.webp',       label: 'Scissor', position: 'Top' },
] as const

function GuardProgression() {
  return (
    <div className="rounded-lg-x border border-line bg-ink/40 p-3 sm:p-4">
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {GUARD_STEPS.map((g, i) => (
          <motion.figure
            key={g.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: easeLux }}
            className="group/guard relative overflow-hidden rounded-md border border-line bg-surface2"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={g.src}
                alt={`${g.label} guard — ${g.position} reference`}
                fill
                quality={88}
                sizes="(max-width: 640px) 20vw, 140px"
                placeholder="blur"
                blurDataURL={g.blur}
                className="object-cover object-center transition-transform duration-700 ease-lux group-hover/guard:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,7,7,0.92) 100%)' }}
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-2 sm:bottom-2.5 px-1.5 text-center">
              <p className="font-display font-extrabold tracking-[-0.02em] text-soft text-[12px] sm:text-sm leading-none mb-1">
                {g.label}
              </p>
              <p className="text-[8px] sm:text-[9px] font-medium tracking-[0.24em] uppercase text-gold leading-none">
                {g.position}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  )
}
