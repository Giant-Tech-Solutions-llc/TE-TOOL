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
    <div className="overflow-x-auto">
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

        {/* FACE SHAPE INTELLIGENCE */}
        <motion.div
          id="face-shape"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12 mb-12">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow className="mb-6">Chapter III — Face Geometry</Eyebrow>
              <h2 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[clamp(2rem,5vw,4rem)]">
                Mapped to taper strategy.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-4">
              <p className="text-base text-soft/65 leading-[1.75]">
                Every row is engineered to be quotable in a barber chair —
                not just readable on a screen.
              </p>
            </div>
          </div>
          <LuxuryTable
            caption="Face shape matching system"
            headers={['Face Shape', 'Recommended Taper', 'Why It Works', 'Barber Anchor']}
            rows={faceShapeRows}
          />
        </motion.div>

        {/* HAIR TEXTURE INTELLIGENCE */}
        <motion.div
          id="hair-type"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12 mb-12">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow className="mb-6">Chapter IV — Texture Behavior</Eyebrow>
              <h2 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[clamp(2rem,5vw,4rem)]">
                How hair grows out matters.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-4">
              <p className="text-base text-soft/65 leading-[1.75]">
                A taper that flatters on day one but collapses by week two is a failed
                recommendation. Texture defines week-three behavior.
              </p>
            </div>
          </div>
          <LuxuryTable
            caption="Hair texture recommendation system"
            headers={['Hair Type', 'Best Taper Direction', 'Core Risk', 'Execution Note']}
            rows={hairTypeRows}
          />
        </motion.div>

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

          <div className="grid grid-cols-1 lg:grid-cols-3 border-y border-line">
            {maintenanceWindows.map((w, i) => (
              <div
                key={w.range}
                className={`py-10 lg:py-14 px-6 lg:px-10 ${
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
