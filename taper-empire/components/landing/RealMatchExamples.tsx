'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cinematic, SectionEyebrow } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { easeLux } from '@/lib/motion'

/**
 * Phase 05 — Visual Product Proof: Real Match Examples
 *
 * Interactive recommendation showcase. The user sees three real outputs of
 * the system for the same subject — a Top match, an Alternate, and an
 * Off-fit — with full compatibility breakdown, maintenance timeline, and
 * barber-ready brief for each. Switching between cases is the interaction
 * pattern that communicates 'this is what your output looks like'.
 *
 * Lives between HowItWorks and AuthorityContent in app/page.tsx.
 */

interface Match {
  rank: string                  // Display number — № 01 / 02 / 03
  label: string                 // 'Top match' / 'Alternate' / 'Off-fit'
  style: string                 // Style name
  score: number                 // Compatibility score (0–100)
  tags: string[]                // Style-fit tags
  rationale: string             // Why it works (or doesn't)
  attributes: Array<[string, string]>   // Breakdown pairs
  barber: string                // Barber-ready quote
  highlight: 'gold' | 'mute' | 'soft'   // Visual accent
}

const MATCHES: Match[] = [
  {
    rank: '№ 01',
    label: 'Top match',
    style: 'Low Taper Fade',
    score: 94,
    tags: ['Professional', 'Beard compatible', 'Low maintenance'],
    rationale:
      'Compresses the sides without flattening the silhouette. Holds shape through week three and reads professional without losing edge. A grow-out that doesn\'t fight you.',
    attributes: [
      ['Face structure',     'Oval'],
      ['Maintenance',        'Low effort'],
      ['Styling difficulty', 'Easy'],
      ['Beard compatibility','Strong'],
      ['Professionalism',    'High'],
      ['Growth pattern',     'Standard'],
    ],
    barber:
      '"Low taper, leave the natural hairline. Half guard at the temples, blend into a one at the nape. Keep the top two inches scissor-cut."',
    highlight: 'gold',
  },
  {
    rank: '№ 02',
    label: 'Alternate',
    style: 'Mid Taper Fade',
    score: 88,
    tags: ['Modern', 'Trend-forward', 'Beard compatible'],
    rationale:
      'A sharper read on the same structural foundation. Brings the contrast a half-inch higher, asks for slightly more upkeep, and gives the silhouette a more deliberate, modern profile.',
    attributes: [
      ['Face structure',     'Oval'],
      ['Maintenance',        'Medium'],
      ['Styling difficulty', 'Refined'],
      ['Beard compatibility','Strong'],
      ['Professionalism',    'Versatile'],
      ['Growth pattern',     'Standard'],
    ],
    barber:
      '"Mid taper, start at the parietal ridge. Zero on the nape, half guard transition, blend with shears above the contrast line."',
    highlight: 'soft',
  },
  {
    rank: '№ 03',
    label: 'Off-fit',
    style: 'High Burst Fade',
    score: 62,
    tags: ['Bold', 'High maintenance', 'Trend-driven'],
    rationale:
      'Carries the contrast too far up the head for this jaw + hair density combination. Looks sharp at week one, but collapses into ambiguity by week two. The system flags it as a directional miss.',
    attributes: [
      ['Face structure',     'Oval'],
      ['Maintenance',        'High effort'],
      ['Styling difficulty', 'Daily product'],
      ['Beard compatibility','Mismatch'],
      ['Professionalism',    'Casual'],
      ['Growth pattern',     'Sensitive'],
    ],
    barber:
      '"Not recommended for this profile. The contrast height would overpower the natural brow line and pull weight away from the jaw."',
    highlight: 'mute',
  },
]

export function RealMatchExamples() {
  const [active, setActive] = useState(0)
  const match = MATCHES[active]

  return (
    <section
      id="real-matches"
      className="relative bg-ink text-soft border-t border-line grain-soft"
    >
      <Cinematic className="section-y">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easeLux }}
          className="grid grid-cols-12 gap-y-10 lg:gap-x-12 mb-16 lg:mb-20"
        >
          <div className="col-span-12 md:col-span-6">
            <SectionEyebrow className="mb-6">Chapter II — Real Match Examples</SectionEyebrow>
            <h2 className="type-section">
              Three reads
              <br />
              <span className="italic font-medium text-mute">from the system.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 md:pt-4">
            <p className="text-base lg:text-lg text-soft/65 leading-[1.75] max-w-lg">
              The platform outputs more than one answer — a top match, alternates that score nearly
              as high, and explicit off-fits with the reasoning attached. The system never asks you
              to guess what it didn&rsquo;t recommend.
            </p>
          </div>
        </motion.div>

        {/* ── Carousel switcher pills ─────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Match examples"
          className="flex flex-wrap items-center gap-2 mb-10 lg:mb-12"
        >
          {MATCHES.map((m, i) => (
            <button
              key={m.rank}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`group/pill flex items-center gap-3 rounded-pill border px-5 py-2.5 transition-all duration-300 ease-lux ${
                active === i
                  ? 'border-gold bg-gold/10 text-soft'
                  : 'border-line bg-surface/30 text-soft/70 hover:border-lineHover hover:text-soft hover:bg-surface/50'
              }`}
            >
              <span className={`text-[10px] font-medium tracking-[0.32em] uppercase tabular-nums ${
                active === i ? 'text-gold' : 'text-mute'
              }`}>
                {m.rank}
              </span>
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase">
                {m.label}
              </span>
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase opacity-70 hidden sm:inline">
                · {m.style}
              </span>
            </button>
          ))}
        </div>

        {/* ── Showcase panel ──────────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-8">

          {/* LEFT — subject photo (sticky) */}
          <div className="col-span-12 lg:col-span-5">
            <SubjectPanel match={match} />
          </div>

          {/* RIGHT — breakdown panel */}
          <div className="col-span-12 lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: easeLux }}
                className="rounded-hero border border-line bg-surface/30 p-8 lg:p-10"
              >
                <ScoreHeader match={match} />
                <Tags tags={match.tags} />
                <Rationale text={match.rationale} />
                <BreakdownGrid attrs={match.attributes} />
                <MaintenanceTimeline maintenance={match.attributes.find(([k]) => k === 'Maintenance')?.[1] ?? 'Medium'} />
                <BarberBrief quote={match.barber} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: easeLux }}
          className="mt-20 lg:mt-28 pt-10 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-soft/65 text-base lg:text-lg max-w-xl leading-[1.7]">
            See your own three reads — same depth of breakdown, scored to your geometry.
          </p>
          <Button asChild variant="cream" size="lg" shape="pill">
            <Link href="/tool">
              Generate My Profile
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </motion.div>

      </Cinematic>
    </section>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  Subject panel — sticky portrait + label
 * ─────────────────────────────────────────────────────────────────────── */
function SubjectPanel({ match }: { match: Match }) {
  return (
    <div className="lg:sticky lg:top-32">
      <div className="relative aspect-[4/5] rounded-hero overflow-hidden border border-line bg-surface">
        <Image
          src="/hero/subject.webp"
          alt="Example subject for facial structure analysis"
          fill
          quality={92}
          sizes="(max-width: 1024px) 100vw, 500px"
          className="object-cover object-top"
        />

        {/* Tonal floor for label readability */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,7,7,0.85) 100%)' }}
        />

        {/* Top label */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[10px] font-semibold tracking-[0.32em] uppercase text-soft/85">
          <span>Subject · Plate II</span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Active read
          </span>
        </div>

        {/* Bottom label — current match summary */}
        <AnimatePresence mode="wait">
          <motion.div
            key={match.rank}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: easeLux }}
            className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3"
          >
            <div>
              <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-soft/85 mb-1">
                {match.rank} · {match.label}
              </p>
              <p className="font-display font-extrabold tracking-[-0.02em] text-xl text-soft">
                {match.style}
              </p>
            </div>
            <p className="font-display font-extrabold tabular-nums tracking-[-0.03em] text-2xl text-gold">
              {match.score}%
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 grid grid-cols-3 divide-x divide-line border border-line rounded-med overflow-hidden bg-surface/30">
        {[
          ['Face Shape', 'Oval'],
          ['Hair',       'Wavy'],
          ['Beard',      'Stubble'],
        ].map(([k, v]) => (
          <div key={k as string} className="px-4 py-4 text-center">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-mute mb-1">{k}</p>
            <p className="font-display text-base font-extrabold tracking-tight text-soft">{v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  Right-panel sub-components
 * ─────────────────────────────────────────────────────────────────────── */

function ScoreHeader({ match }: { match: Match }) {
  return (
    <div className="flex items-baseline justify-between gap-6 mb-3 flex-wrap">
      <div>
        <p className="type-eyebrow text-gold mb-3 flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
          TaperMatch™ Score
        </p>
        <h3 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2rem,4.6vw,3.5rem)]">
          {match.style}
        </h3>
      </div>
      <p className="font-display font-extrabold tabular-nums tracking-[-0.04em] leading-none text-[clamp(3rem,7vw,5rem)] text-soft">
        {match.score}<span className="text-mute text-2xl">%</span>
      </p>
    </div>
  )
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-7 pb-7 border-b border-line">
      {tags.map((t) => (
        <span
          key={t}
          className="text-[9px] font-semibold tracking-[0.28em] uppercase border border-line text-soft/85 px-3 py-1.5 rounded-pill bg-surface/40"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

function Rationale({ text }: { text: string }) {
  return (
    <div className="mb-7 pb-7 border-b border-line">
      <p className="type-eyebrow text-gold mb-3 flex items-center gap-3">
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        Face Structure Analysis
      </p>
      <p className="text-base text-soft/80 leading-[1.75]">{text}</p>
    </div>
  )
}

function BreakdownGrid({ attrs }: { attrs: Match['attributes'] }) {
  return (
    <div className="mb-7 pb-7 border-b border-line">
      <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        Compatibility Breakdown
      </p>
      <dl className="grid grid-cols-2 gap-y-5 gap-x-6">
        {attrs.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[10px] tracking-[0.32em] uppercase text-mute mb-1.5">{k}</dt>
            <dd className="font-display text-base lg:text-lg font-extrabold text-soft tracking-tight leading-tight">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function MaintenanceTimeline({ maintenance }: { maintenance: string }) {
  // Mark the cadence intensity by maintenance level
  const intensity = /high/i.test(maintenance) ? 3 : /low/i.test(maintenance) ? 1 : 2

  const windows = [
    { range: 'Day 0–3',   title: 'Lock the shape',   active: true,           dotLabel: 'Set' },
    { range: 'Day 7–14',  title: 'Edge cleanup',     active: intensity >= 2, dotLabel: 'Touch' },
    { range: 'Day 21–30', title: 'Full reset',       active: intensity >= 1, dotLabel: 'Reset' },
  ]

  return (
    <div className="mb-7 pb-7 border-b border-line">
      <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        Maintenance Cadence
      </p>

      {/* Track */}
      <div className="relative pt-2">
        <div className="absolute left-3 right-3 top-[14px] h-px bg-line" />
        <div className="grid grid-cols-3 gap-3">
          {windows.map((w, i) => (
            <div key={w.range} className="relative flex flex-col items-start">
              <span
                className={`relative z-10 w-2.5 h-2.5 rounded-full ring-4 ring-ink mb-3 ${
                  w.active ? 'bg-gold' : 'bg-line'
                }`}
                aria-hidden="true"
              />
              <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-mute mb-1">
                {w.range}
              </p>
              <p className={`font-display text-sm font-extrabold tracking-tight leading-tight ${
                w.active ? 'text-soft' : 'text-soft/40'
              }`}>
                {w.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BarberBrief({ quote }: { quote: string }) {
  return (
    <div>
      <p className="type-eyebrow text-gold mb-4 flex items-center gap-3">
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        Barber-Ready Brief
      </p>
      <figure className="rounded-lg-x border-l-2 border-gold bg-surface/40 px-6 py-5">
        <blockquote className="text-base text-soft/85 leading-[1.75] italic">
          {quote}
        </blockquote>
        <figcaption className="mt-3 text-[10px] font-medium tracking-[0.32em] uppercase text-mute">
          Verbatim brief · ready to read aloud
        </figcaption>
      </figure>
    </div>
  )
}
