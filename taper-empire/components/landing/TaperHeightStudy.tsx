'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Cinematic, SectionEyebrow } from '@/components/shared'
import { easeLux } from '@/lib/motion'

/**
 * Phase 08 — Taper Height Study
 *
 * 4-up visual comparison of the four canonical taper heights with full
 * editorial portrait plates. Each plate shows the actual cut on a real
 * subject with gold annotation lines tracing the taper area, blend
 * transition, and guard progression — replacing the prior abstract SVG
 * silhouettes with product-grade reference imagery.
 *
 * Plates live in /public/heights/ (low/mid/high/burst) and are served
 * via next/image at 1200px with q=90 WebP, ~150 kB each.
 */

interface HeightSpec {
  slug:     'low' | 'mid' | 'high' | 'burst'
  position: 'Low' | 'Mid' | 'High' | 'Burst'
  label:    string
  summary:  string
  fit:      string
  contrast: 1 | 2 | 3 | 4
  upkeep:   1 | 2 | 3 | 4
  /** Vertical focus of the cut on this plate — used by object-position */
  focal:    string
}

const HEIGHTS: HeightSpec[] = [
  {
    slug: 'low',
    position: 'Low',
    label: 'Low Taper',
    summary: 'Subtle contrast around the temples and nape. Reads professional and grows out cleanly.',
    fit: 'Conservative · Long grow-out',
    contrast: 1, upkeep: 1, focal: 'center 32%',
  },
  {
    slug: 'mid',
    position: 'Mid',
    label: 'Mid Taper',
    summary: 'Balanced height. Adds visible structure without overstating the silhouette.',
    fit: 'Versatile · Modern',
    contrast: 2, upkeep: 2, focal: 'center 30%',
  },
  {
    slug: 'high',
    position: 'High',
    label: 'High Taper',
    summary: 'Sharp contrast carried high up the head. Bold, intentional, weekly upkeep.',
    fit: 'Bold · Sharp profile',
    contrast: 3, upkeep: 3, focal: 'center 28%',
  },
  {
    slug: 'burst',
    position: 'Burst',
    label: 'Burst Fade',
    summary: 'Fade arcs around the ear instead of running level. Trend-forward, high-styling.',
    fit: 'Trend-forward · Style-led',
    contrast: 4, upkeep: 4, focal: 'center 30%',
  },
]

export function TaperHeightStudy() {
  return (
    <section
      id="taper-heights"
      className="relative bg-ink text-soft border-t border-line grain-soft"
    >
      <Cinematic className="section-y">

        {/* ── Header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easeLux }}
          className="grid grid-cols-12 gap-y-10 lg:gap-x-12 mb-16 lg:mb-20"
        >
          <div className="col-span-12 md:col-span-6">
            <SectionEyebrow className="mb-6">Chapter IV — Taper Heights</SectionEyebrow>
            <h2 className="type-section">
              Four heights.
              <br />
              <span className="italic font-medium text-mute">One choice.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 md:pt-4">
            <p className="text-base lg:text-lg text-soft/65 leading-[1.75] max-w-lg">
              Every taper recommendation maps to one of these four heights. The system picks the
              right one for your face geometry — but seeing the shape difference up front makes
              the brief easier to read.
            </p>
          </div>
        </motion.div>

        {/* ── 4-up grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {HEIGHTS.map((h, i) => (
            <motion.article
              key={h.position}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: easeLux }}
              className="group/h relative rounded-hero border border-line bg-surface/30 p-5 lg:p-6 transition-all duration-500 ease-lux hover:bg-surface/60 hover:border-lineHover hover:-translate-y-1 hover:shadow-luxury-sm"
            >
              {/* Editorial plate — real portrait with gold annotations */}
              <div className="relative aspect-[4/5] rounded-lg-x bg-ink/60 overflow-hidden mb-5 border border-line">
                <Image
                  src={`/heights/${h.slug}.webp`}
                  alt={`${h.label} — editorial reference plate showing taper area, blend transition, and guard progression`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                  quality={95}
                  placeholder="blur"
                  blurDataURL={`/heights/${h.slug}-blur.webp`}
                  className="object-cover transition-transform duration-[1.6s] ease-out group-hover/h:scale-[1.03]"
                  style={{ objectPosition: h.focal }}
                />
                {/* Subtle tonal floor for label readability */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,7,7,0.55) 100%)' }}
                />
                <div className="absolute top-3 left-3 type-eyebrow text-gold tabular-nums z-10">
                  № {String(i + 1).padStart(2, '0')}
                </div>
                <div className="absolute top-3 right-3 type-eyebrow text-soft/85 z-10">
                  {h.position}
                </div>
              </div>

              {/* Label */}
              <h3 className="font-display font-extrabold tracking-[-0.02em] text-xl lg:text-2xl leading-tight mb-3">
                {h.label}
              </h3>

              <p className="text-sm text-soft/65 leading-[1.7] mb-5 line-clamp-3">
                {h.summary}
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <DotStat label="Contrast" value={h.contrast} />
                <DotStat label="Upkeep"   value={h.upkeep} />
              </div>

              <p className="text-[10px] tracking-[0.28em] uppercase text-mute leading-relaxed">
                {h.fit}
              </p>
            </motion.article>
          ))}
        </div>

        {/* ── Footnote ─────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-12 lg:mt-16 text-soft/65 text-sm leading-[1.75] max-w-3xl"
        >
          Most men confuse height for sharpness. Sharpness lives in the blend transition, not in
          how high the cut climbs. The system picks the height that best suits your geometry —
          then the brief tells your barber exactly where the transition lands.
        </motion.p>

      </Cinematic>
    </section>
  )
}

function DotStat({ label, value }: { label: string; value: 1 | 2 | 3 | 4 }) {
  return (
    <div>
      <p className="type-eyebrow text-mute mb-2">{label}</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`block w-1.5 h-1.5 rounded-full ${i <= value ? 'bg-gold' : 'bg-line'}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}
