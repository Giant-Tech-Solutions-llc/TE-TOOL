'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Cinematic, SectionEyebrow } from '@/components/shared'
import { easeLux } from '@/lib/motion'

/**
 * Phase Z — Taper Height Study (v2 — uncropped annotated diagrams).
 *
 * 4-up comparison of the four canonical taper heights. The plates are
 * full editorial diagrams with side annotations (TAPER AREA, TEMPLE
 * CORNER BLEND, HAIRLINE DEFINITION scale, nape transition labels), so
 * the renderer uses object-contain on a square frame — never cropping —
 * to keep every annotation visible.
 *
 * Cards are centered: image -> title -> description -> CONTRAST + UPKEEP
 * dot pair -> classification tagline. Mirrors the updated reference.
 */

interface HeightSpec {
  slug:     'low' | 'mid' | 'high' | 'burst'
  label:    string
  summary:  string
  fit:      string
  contrast: 1 | 2 | 3 | 4
  upkeep:   1 | 2 | 3 | 4
}

const HEIGHTS: HeightSpec[] = [
  {
    slug: 'low',
    label: 'Low Taper',
    summary: 'Subtle contrast around the temples and nape. Reads professional and grows out cleanly.',
    fit: 'Conservative · Long grow-out',
    contrast: 1, upkeep: 1,
  },
  {
    slug: 'mid',
    label: 'Mid Taper',
    summary: 'Balanced height. Adds visible structure without overstating the silhouette.',
    fit: 'Versatile · Modern',
    contrast: 2, upkeep: 2,
  },
  {
    slug: 'high',
    label: 'High Taper',
    summary: 'Sharp contrast carried high up the head. Bold, intentional, weekly upkeep.',
    fit: 'Bold · Sharp profile',
    contrast: 3, upkeep: 3,
  },
  {
    slug: 'burst',
    label: 'Burst Fade',
    summary: 'Fade arcs around the ear instead of running level. Trend-forward, high-styling.',
    fit: 'Trend-forward · Style-led',
    contrast: 4, upkeep: 4,
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
              key={h.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: easeLux }}
              className="group/h relative flex flex-col rounded-hero border border-line bg-surface/30 p-5 lg:p-6 transition-all duration-500 ease-lux hover:bg-surface/60 hover:border-lineHover hover:-translate-y-1 hover:shadow-luxury-sm"
            >
              {/* Annotated diagram — full image, never cropped */}
              <div className="relative aspect-square rounded-lg-x bg-ink/60 overflow-hidden mb-6 border border-line">
                <Image
                  src={`/heights/${h.slug}.webp`}
                  alt={`${h.label} — full annotated diagram showing taper area, temple corner blend, hairline definition, and nape transition`}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 320px"
                  quality={95}
                  placeholder="blur"
                  blurDataURL={`/heights/${h.slug}-blur.webp`}
                  className="object-contain transition-transform duration-[1.6s] ease-out group-hover/h:scale-[1.015]"
                />
              </div>

              {/* Title — centered */}
              <h3 className="font-display font-extrabold tracking-[-0.025em] text-2xl lg:text-[26px] leading-tight mb-3 text-center text-soft">
                {h.label}
              </h3>

              {/* Description — centered */}
              <p className="text-[14px] lg:text-[14.5px] text-soft/65 leading-[1.65] mb-6 text-center min-h-[4.5em]">
                {h.summary}
              </p>

              {/* CONTRAST + UPKEEP — centered, side by side */}
              <div className="flex items-start justify-center gap-10 lg:gap-12 mb-5">
                <DotStat label="Contrast" value={h.contrast} />
                <DotStat label="Upkeep"   value={h.upkeep} />
              </div>

              {/* Tagline */}
              <p className="mt-auto pt-5 border-t border-line/70 text-[10px] tracking-[0.28em] uppercase text-gold leading-relaxed text-center">
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
    <div className="flex flex-col items-center">
      <p className="type-eyebrow text-soft mb-2">{label}</p>
      <div className="flex items-center gap-1.5" aria-label={`${label}: ${value} of 4`}>
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
