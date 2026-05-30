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
            <SectionEyebrow className="mb-6">Chapter IV — Barber-Ready Brief</SectionEyebrow>
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
          <GuardLadder />
          <GuardReferenceStrip />
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
 *  GuardReferenceStrip — Phase 12, 4 editorial thumbnails matching the
 *  guard ladder above so the brief reads with both numbers AND visuals.
 * ─────────────────────────────────────────────────────────────────────── */
const GUARD_REFS = [
  { src: '/heights/low.webp',   blur: '/heights/low-blur.webp',   label: 'Low',   sub: 'Nape only' },
  { src: '/heights/mid.webp',   blur: '/heights/mid-blur.webp',   label: 'Mid',   sub: 'Mid temple' },
  { src: '/heights/high.webp',  blur: '/heights/high-blur.webp',  label: 'High',  sub: 'Above ear' },
  { src: '/heights/burst.webp', blur: '/heights/burst-blur.webp', label: 'Burst', sub: 'Ear arc' },
] as const

function GuardReferenceStrip() {
  return (
    <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
      {GUARD_REFS.map((g, i) => (
        <motion.figure
          key={g.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: easeLux }}
          className="relative aspect-square overflow-hidden rounded-md border border-line bg-surface2"
        >
          <Image
            src={g.src}
            alt={`${g.label} taper guard reference`}
            fill
            quality={86}
            sizes="(max-width: 640px) 25vw, 160px"
            placeholder="blur"
            blurDataURL={g.blur}
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,7,7,0.85) 100%)' }}
          />
          <figcaption className="absolute inset-x-0 bottom-1.5 px-2 text-center">
            <p className="font-display font-extrabold tracking-[-0.02em] text-soft text-[11px] sm:text-xs leading-none mb-0.5">
              {g.label}
            </p>
            <p className="text-[8px] sm:text-[9px] font-medium tracking-[0.24em] uppercase text-gold leading-none">
              {g.sub}
            </p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  GuardLadder — visual progression diagram
 * ─────────────────────────────────────────────────────────────────────── */
function GuardLadder() {
  const guards = [
    { label: '#1',     position: 'Nape',      height: 100 },   // shortest
    { label: '#1½',    position: 'Lower',     height: 78  },
    { label: '#2',     position: 'Temple',    height: 56  },
    { label: '#3',     position: 'Above ear', height: 38  },
    { label: 'Scissor',position: 'Top',       height: 18  },
  ]

  return (
    <div className="rounded-lg-x border border-line bg-ink/40 px-4 sm:px-6 py-5">
      <div className="flex items-end gap-2 sm:gap-3 h-32 sm:h-36">
        {guards.map((g, i) => (
          <div key={g.label} className="flex-1 flex flex-col items-center justify-end gap-2">
            <p className="type-eyebrow text-mute tabular-nums">{i + 1}</p>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: `${g.height}%`, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: easeLux }}
              className="w-full rounded-t-md bg-gradient-to-t from-gold/80 to-gold/30 origin-bottom"
              style={{ minHeight: '12px' }}
            />
            <p className="font-display text-sm font-extrabold tracking-tight text-soft text-center leading-none">
              {g.label}
            </p>
            <p className="text-[10px] tracking-[0.18em] uppercase text-mute text-center leading-tight">
              {g.position}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
