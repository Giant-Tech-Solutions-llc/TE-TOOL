'use client'

import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/editorial/Rule'

const faceShapeRows: [string, string, string, string][] = [
  ['Round',   'Low taper · textured volume',           'Reduces side width, builds vertical balance',          'Soft corners, extra height on top'],
  ['Oval',    'Mid taper · natural side compression',  'Preserves symmetry without over-sharpening',           'Temple-to-occipital blend, no hard disconnect'],
  ['Square',  'Low–mid taper · controlled graduation', 'Retains jawline strength, reduces helmet bulk',        'Clean corners, no aggressive skin fade'],
  ['Diamond', 'Mid taper · fuller temple transition',  'Prevents cheekbone overexposure, protects silhouette', 'Leave slight temple density'],
  ['Heart',   'Low taper · fringe-compatible top',     'Balances forehead width, narrows lower profile',       'Soft sideburns, no high start point'],
]

const hairTypeRows: [string, string, string, string][] = [
  ['Straight', 'Low or mid taper · directional texture',     'Can read flat after bulk removal',                'Matte clay, point-cut for texture'],
  ['Wavy',     'Mid taper · layered top',                    'Wave pattern collapses if taper starts too high', 'Keep compression below parietal ridge'],
  ['Curly',    'Low taper · curl-preserving perimeter',      'Over-fading removes curl frame',                  'Scissor-over-comb around curl line'],
  ['Coily',    'Temple-and-nape taper · shape retention',    'Shrinks fast, exposes scalp contrast quickly',    'Sponge or twist styling between cuts'],
]

const maintenanceWindows = [
  { range: 'Day 0 – 3',   title: 'Lock the silhouette', body: 'Texture-appropriate product. Resist over-washing. Let the structure settle.' },
  { range: 'Day 7 – 14',  title: 'Edge correction',    body: 'Nape and temples only. A barber visit kept short. The interior stays untouched.' },
  { range: 'Day 21 – 30', title: 'Full reset',         body: 'Reshape to baseline. New 30-day cycle. The cadence becomes the system.' },
]

function LuxuryTable({
  headers,
  rows,
  caption,
}: {
  headers: string[]
  rows: (string | number)[][]
  caption: string
}) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-line bg-surface/30">
      <table className="w-full text-left min-w-[820px] border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line">
            {headers.map((h, i) => (
              <th
                key={h}
                className="py-6 px-6 lg:px-8 text-[10px] font-medium tracking-[0.32em] uppercase text-gold align-bottom"
              >
                <span className="text-soft/30 mr-3 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-line last:border-b-0 transition-colors hover:bg-surface2/60"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-7 px-6 lg:px-8 align-top text-sm leading-[1.75] ${
                    ci === 0
                      ? 'font-display font-extrabold text-soft text-lg tracking-[-0.01em]'
                      : 'text-soft/65'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function AuthorityContent() {
  return (
    <section className="relative bg-ink text-soft border-t border-line grain-soft">
      <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10 py-24 lg:py-32 space-y-28 lg:space-y-40">

        {/* DIRECT ANSWER — editorial open */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          id="direct-answer"
          className="grid grid-cols-12 gap-y-10 lg:gap-x-12"
        >
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow className="mb-6">Chapter II — Direct Answer</Eyebrow>
            <p className="text-[10px] tracking-[0.32em] uppercase text-mute">A definition, briefly.</p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[clamp(2.25rem,5.6vw,4.5rem)] mb-10">
              The best taper haircut
              <span className="italic font-medium text-mute"> for your face.</span>
            </h2>
            <div className="text-lg lg:text-xl leading-[1.65] text-soft/80 max-w-[64ch]">
              <span className="float-left mr-4 mt-1 font-display text-7xl lg:text-8xl leading-[0.85] font-extrabold text-gold">T</span>
              he best taper haircut aligns face geometry, hair texture behavior, contrast tolerance,
              and maintenance cadence. A recommendation engine that ignores any of those is
              a style gallery in disguise — useful only after you already know what you want.
            </div>
            <div className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-5 text-soft/65 max-w-[64ch]">
              {[
                'Face shape determines side compression tolerance.',
                'Hair texture determines blend visibility and growth pattern.',
                'Taper height determines perceived sharpness and upkeep frequency.',
                'Barber language determines final execution accuracy.',
              ].map((c) => (
                <p key={c} className="flex items-baseline gap-3 text-[15px]">
                  <span className="text-gold/80 mt-0.5 flex-shrink-0" aria-hidden="true">—</span>
                  {c}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Face Geometry + Texture Behavior panels removed from the
            AuthorityContent block — they previously rendered the legacy
            abstract-icon glyph strips (FaceShapeGlyphStrip,
            HairTextureGlyphStrip) that lingered on production. The home
            page already carries dedicated <FaceGeometry /> and
            <TextureBehavior /> sections built on real portrait
            references, so the AuthorityContent duplicates were retiring
            this content twice on the same page. */}

        {/* PULL QUOTE */}
        <motion.figure
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-12 gap-y-8 lg:gap-x-12 py-16 lg:py-20 border-y border-line"
        >
          <div className="col-span-12 lg:col-span-1 flex items-start lg:justify-end">
            <span className="font-display text-[7rem] lg:text-[9rem] leading-[0.65] font-extrabold text-gold/80 select-none" aria-hidden="true">
              &ldquo;
            </span>
          </div>
          <blockquote className="col-span-12 lg:col-span-10 lg:col-start-2">
            <p className="font-display font-extrabold tracking-[-0.025em] leading-[1.05] text-[clamp(1.875rem,4.4vw,3.5rem)] text-soft">
              Most haircut dissatisfaction isn&rsquo;t bad barbering. It&rsquo;s decision
              <span className="italic font-medium text-mute"> mismatch</span> — a consultation
              problem solved before the chair.
            </p>
            <figcaption className="mt-8 text-[10px] tracking-[0.32em] uppercase text-mute">
              Taper Empire editorial — The Founding Thesis
            </figcaption>
          </blockquote>
        </motion.figure>

        {/* MAINTENANCE INTELLIGENCE — luxury table */}
        <motion.div
          id="maintenance"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12 mb-12">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow className="mb-6">Chapter V — Cadence</Eyebrow>
              <h2 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[clamp(2rem,5vw,4rem)]">
                A taper is a system.
                <br />
                <span className="italic font-medium text-mute">Not an event.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-4">
              <p className="text-base text-soft/65 leading-[1.75]">
                Plan the cadence before you book the first cut. The calendar carries the cut.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 border border-line rounded-3xl overflow-hidden bg-surface/30">
            {maintenanceWindows.map((w, i) => (
              <div
                key={w.range}
                className={`py-10 lg:py-14 px-6 lg:px-10 hover:bg-surface2/60 transition-colors duration-300 ${
                  i > 0 ? 'lg:border-l border-line border-t lg:border-t-0' : ''
                }`}
              >
                <p className="font-display text-xs font-extrabold tracking-[0.32em] uppercase text-gold mb-5">
                  {w.range}
                </p>
                <h3 className="font-display font-extrabold tracking-[-0.025em] text-2xl lg:text-3xl mb-4 leading-tight">
                  {w.title}
                </h3>
                <p className="text-sm text-soft/65 leading-[1.8] max-w-xs">{w.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  Phase 08 — Visual glyph strips above the editorial tables
 * ─────────────────────────────────────────────────────────────────────── */

const FACE_SHAPES = [
  { name: 'Round',   draw: 'M 60 18 a 28 28 0 1 0 0.001 0 z' },
  { name: 'Oval',    draw: 'M 60 18 a 24 32 0 1 0 0.001 0 z' },
  { name: 'Square',  draw: 'M 36 22 h 48 v 38 a 6 6 0 0 1 -6 6 h -36 a 6 6 0 0 1 -6 -6 z' },
  { name: 'Diamond', draw: 'M 60 18 L 86 46 L 60 78 L 34 46 Z' },
  { name: 'Heart',   draw: 'M 36 26 q -10 22 8 36 q 16 16 16 18 q 0 -2 16 -18 q 18 -14 8 -36 q -8 -8 -16 4 q -3 4 -8 4 q -5 0 -8 -4 q -8 -12 -16 -4 z' },
] as const

function FaceShapeGlyphStrip() {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-6 lg:mb-8">
      {FACE_SHAPES.map(({ name, draw }) => (
        <div
          key={name}
          className="group/g rounded-lg-x border border-line bg-surface/30 py-4 px-2 flex flex-col items-center hover:border-lineHover hover:bg-surface/60 transition-all duration-300 ease-lux"
        >
          <svg
            viewBox="0 0 120 92"
            className="w-12 h-10 sm:w-14 sm:h-11 text-gold/80 group-hover/g:text-gold transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d={draw} />
          </svg>
          <p className="mt-2 type-eyebrow text-soft/85 group-hover/g:text-soft transition-colors">
            {name}
          </p>
        </div>
      ))}
    </div>
  )
}

function HairTextureGlyphStrip() {
  /* Hair textures rendered as stylized line patterns — straight / wavy /
     curly / coily — drawn with deterministic SVG paths. */
  const TEXTURES = [
    { name: 'Straight', path: 'M10 18 V60 M30 18 V60 M50 18 V60 M70 18 V60 M90 18 V60' },
    { name: 'Wavy',     path: 'M10 20 Q20 32 10 44 T10 60 M30 20 Q40 32 30 44 T30 60 M50 20 Q60 32 50 44 T50 60 M70 20 Q80 32 70 44 T70 60 M90 20 Q100 32 90 44 T90 60' },
    { name: 'Curly',    path: 'M14 20 a8 8 0 1 1 0 16 a8 8 0 1 0 0 16 M40 20 a8 8 0 1 1 0 16 a8 8 0 1 0 0 16 M66 20 a8 8 0 1 1 0 16 a8 8 0 1 0 0 16 M92 20 a8 8 0 1 1 0 16 a8 8 0 1 0 0 16' },
    { name: 'Coily',    path: 'M10 22 a5 5 0 1 1 10 0 a5 5 0 1 0 10 0 a5 5 0 1 1 10 0 a5 5 0 1 0 10 0 a5 5 0 1 1 10 0 a5 5 0 1 0 10 0 a5 5 0 1 1 10 0 a5 5 0 1 0 10 0 M10 42 a5 5 0 1 1 10 0 a5 5 0 1 0 10 0 a5 5 0 1 1 10 0 a5 5 0 1 0 10 0 a5 5 0 1 1 10 0 a5 5 0 1 0 10 0 a5 5 0 1 1 10 0 a5 5 0 1 0 10 0' },
  ] as const

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 lg:mb-8">
      {TEXTURES.map(({ name, path }) => (
        <div
          key={name}
          className="group/t rounded-lg-x border border-line bg-surface/30 py-4 px-2 flex flex-col items-center hover:border-lineHover hover:bg-surface/60 transition-all duration-300 ease-lux"
        >
          <svg
            viewBox="0 0 100 78"
            className="w-14 h-10 sm:w-16 sm:h-11 text-gold/80 group-hover/t:text-gold transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d={path} />
          </svg>
          <p className="mt-2 type-eyebrow text-soft/85 group-hover/t:text-soft transition-colors">
            {name}
          </p>
        </div>
      ))}
    </div>
  )
}
