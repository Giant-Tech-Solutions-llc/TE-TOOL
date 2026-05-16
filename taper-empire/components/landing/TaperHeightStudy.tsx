'use client'

import { motion } from 'framer-motion'
import { Cinematic, SectionEyebrow } from '@/components/shared'
import { easeLux } from '@/lib/motion'

/**
 * Phase 08 — Taper Height Study
 *
 * A 4-up visual comparison of the four canonical taper heights. Replaces
 * a long descriptive paragraph block with a scannable visual lexicon: a
 * head-and-shoulders side-profile silhouette for each height, with the
 * tapered region highlighted in gold so the difference reads at a glance.
 *
 * Pure SVG — no extra image assets, sharp at every DPR, ~negligible bytes.
 */

interface HeightSpec {
  label:    string
  position: 'Low' | 'Mid' | 'High' | 'Burst'
  // Y-pixel range inside the 240x300 viewBox where the fade region begins
  fadeStart: number
  fadeEnd:   number
  // Whether the fade wraps behind the ear (burst-style)
  burst:    boolean
  summary:  string
  fit:      string
  contrast: 1 | 2 | 3 | 4   // visual rank
  upkeep:   1 | 2 | 3 | 4
}

const HEIGHTS: HeightSpec[] = [
  {
    label:    'Low Taper',
    position: 'Low',
    fadeStart: 200,
    fadeEnd:   240,
    burst:    false,
    summary:  'Subtle contrast around the temples and nape. Reads professional and grows out cleanly.',
    fit:      'Conservative · Long grow-out',
    contrast: 1, upkeep: 1,
  },
  {
    label:    'Mid Taper',
    position: 'Mid',
    fadeStart: 165,
    fadeEnd:   215,
    burst:    false,
    summary:  'Balanced height. Adds visible structure without overstating the silhouette.',
    fit:      'Versatile · Modern',
    contrast: 2, upkeep: 2,
  },
  {
    label:    'High Taper',
    position: 'High',
    fadeStart: 125,
    fadeEnd:   190,
    burst:    false,
    summary:  'Sharp contrast carried high up the head. Bold, intentional, weekly upkeep.',
    fit:      'Bold · Sharp profile',
    contrast: 3, upkeep: 3,
  },
  {
    label:    'Burst Fade',
    position: 'Burst',
    fadeStart: 135,
    fadeEnd:   215,
    burst:    true,
    summary:  'Fade arcs around the ear instead of running level. Trend-forward, high-styling.',
    fit:      'Trend-forward · Style-led',
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
            <SectionEyebrow className="mb-6">Chapter III — Taper Heights</SectionEyebrow>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {HEIGHTS.map((h, i) => (
            <motion.article
              key={h.position}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: easeLux }}
              className="group/h relative rounded-hero border border-line bg-surface/30 p-5 lg:p-7 transition-all duration-500 ease-lux hover:bg-surface/60 hover:border-lineHover hover:-translate-y-1 hover:shadow-luxury-sm"
            >
              {/* SVG silhouette */}
              <div className="relative aspect-[4/5] rounded-lg-x bg-ink/60 overflow-hidden mb-5 border border-line">
                <TaperSilhouette spec={h} />
                <div className="absolute top-3 left-3 type-eyebrow text-gold tabular-nums">
                  № {String(i + 1).padStart(2, '0')}
                </div>
                <div className="absolute top-3 right-3 type-eyebrow text-soft/80 uppercase">
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

/* ───────────────────────────────────────────────────────────────────────
 *  TaperSilhouette — side-profile SVG with the tapered region highlighted
 * ─────────────────────────────────────────────────────────────────────── */
function TaperSilhouette({ spec }: { spec: HeightSpec }) {
  // Standard 240x300 viewBox. Head + neck + shoulders sit centered.
  // The 'fade' region is shown with denser gold dots between fadeStart and fadeEnd.
  const { fadeStart, fadeEnd, burst } = spec

  return (
    <svg
      viewBox="0 0 240 300"
      preserveAspectRatio="xMidYMax meet"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        {/* Subtle warm gradient over the figure */}
        <linearGradient id="figureGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"   stopColor="#1A1714" />
          <stop offset="0.5" stopColor="#12100D" />
          <stop offset="1"   stopColor="#0A0807" />
        </linearGradient>
        {/* Hair gradient — top of head */}
        <radialGradient id="hairGrad" cx="0.5" cy="0.15" r="0.55">
          <stop offset="0"   stopColor="#231F1A" />
          <stop offset="1"   stopColor="#0E0C0A" />
        </radialGradient>
      </defs>

      {/* SHOULDER — wide base */}
      <path
        d="M10 300 L10 248 Q60 200 120 198 Q180 200 230 248 L230 300 Z"
        fill="url(#figureGrad)"
      />
      {/* NECK */}
      <path
        d="M105 240 Q105 200 120 198 Q135 200 135 240 Z"
        fill="url(#figureGrad)"
      />
      {/* SKULL — side profile facing right */}
      <path
        d="M70 180
           Q60 100 110 80
           Q160 70 178 110
           Q188 140 188 175
           Q188 200 175 215
           Q160 230 140 232
           Q120 234 105 228
           Q85 220 75 205
           Q68 195 70 180 Z"
        fill="url(#figureGrad)"
      />
      {/* HAIR MASS — top, fades into face shape */}
      <path
        d="M75 130
           Q60 85 115 75
           Q170 70 186 115
           Q188 140 184 155
           Q176 130 170 120
           Q150 100 120 100
           Q90 105 80 130
           Q78 140 75 130 Z"
        fill="url(#hairGrad)"
      />

      {/* Subtle facial accent — ear opening / jaw shadow */}
      <ellipse cx="160" cy="175" rx="4" ry="6" fill="#000" opacity="0.55" />

      {/* TAPER REGION — gold dot pattern. Denser in the fade window. */}
      {/* Density correlates with how much skin shows after the cut */}
      <FadePattern fadeStart={fadeStart} fadeEnd={fadeEnd} burst={burst} />

      {/* Markers — small horizontal hairlines showing the fade band */}
      <line
        x1="200" y1={fadeStart} x2="216" y2={fadeStart}
        stroke="#8F7A58" strokeWidth="0.8" strokeLinecap="round"
      />
      <line
        x1="200" y1={fadeEnd}   x2="216" y2={fadeEnd}
        stroke="#8F7A58" strokeWidth="0.8" strokeLinecap="round"
      />
      <line
        x1="208" y1={fadeStart} x2="208" y2={fadeEnd}
        stroke="#8F7A58" strokeWidth="0.6"
      />
    </svg>
  )
}

function FadePattern({ fadeStart, fadeEnd, burst }: { fadeStart: number; fadeEnd: number; burst: boolean }) {
  // Generate a grid of gold dots concentrated in the fade region of the skull
  const dots: Array<{ x: number; y: number; r: number; o: number }> = []
  for (let y = fadeStart; y <= fadeEnd; y += 4) {
    // Skull bound at this y — rough ellipse approximation
    const t = (y - 80) / 150 // normalize roughly 0..1 across the head
    const skullCenter = 120 + (t - 0.5) * 18
    // Width of the fade band at this y — wider lower for burst
    const baseWidth = burst
      ? 28 + Math.sin(Math.PI * (y - fadeStart) / Math.max(fadeEnd - fadeStart, 1)) * 30
      : 32
    const left = skullCenter - baseWidth
    const right = skullCenter + baseWidth
    for (let x = left; x <= right; x += 4) {
      // Dot density: low at edges of band, peak in middle
      const norm = (y - fadeStart) / Math.max(fadeEnd - fadeStart, 1)
      const fade = 1 - Math.abs(norm - 0.4) * 1.2
      if (fade < 0.18) continue
      dots.push({ x, y, r: 0.6 + fade * 0.6, o: 0.25 + fade * 0.55 })
    }
  }
  return (
    <g>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#8F7A58" opacity={d.o} />
      ))}
    </g>
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
