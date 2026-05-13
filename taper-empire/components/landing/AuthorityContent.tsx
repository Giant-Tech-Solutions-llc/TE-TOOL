'use client'

import { motion } from 'framer-motion'
import { Eyebrow, Asterism } from '@/components/editorial/Rule'

const faceShapeRows = [
  ['Round',   'Low taper · textured volume',           'Reduces side width, builds vertical balance',          'Soft corners, extra height on top'],
  ['Oval',    'Mid taper · natural side compression',  'Preserves symmetry without over-sharpening',           'Temple-to-occipital blend, no hard disconnect'],
  ['Square',  'Low–mid taper · controlled graduation', 'Retains jawline strength, reduces helmet bulk',        'Clean corners, no aggressive skin fade'],
  ['Diamond', 'Mid taper · fuller temple transition',  'Prevents cheekbone overexposure, protects silhouette', 'Leave slight temple density'],
  ['Heart',   'Low taper · fringe-compatible top',     'Balances forehead width, narrows lower profile',       'Soft sideburns, no high start point'],
]

const hairTypeRows = [
  ['Straight', 'Low or mid taper · directional texture',     'Can read flat after bulk removal',                'Matte clay, point-cut for texture'],
  ['Wavy',     'Mid taper · layered top',                    'Wave pattern collapses if taper starts too high', 'Keep compression below parietal ridge'],
  ['Curly',    'Low taper · curl-preserving perimeter',      'Over-fading removes curl frame',                  'Scissor-over-comb around curl line'],
  ['Coily',    'Temple-and-nape taper · shape retention',    'Shrinks fast, exposes scalp contrast quickly',    'Sponge or twist styling between cuts'],
]

const compareRows = [
  ['Taper vs Fade',              'Taper',          'Fade',         'Taper for longevity, fade for immediate edge.'],
  ['Low vs Mid Taper',           'Low taper',      'Mid taper',    'Low for subtle polish, mid for visible structure.'],
  ['Burst Fade vs Classic Taper','Classic taper',  'Burst fade',   'Burst for style-forward, taper for universal fit.'],
  ['Taper vs Undercut',          'Taper',          'Undercut',     'Undercut for hard disconnect, taper for blend.'],
]

function EditorialTable({
  caption,
  headers,
  rows,
}: {
  caption: string
  headers: string[]
  rows: (string | number)[][]
}) {
  return (
    <div className="overflow-x-auto border-y-2 border-jet-black">
      <table className="w-full text-left min-w-[760px] tabular-nums">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-jet-black/30">
            {headers.map((h, i) => (
              <th
                key={i}
                className="py-4 px-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-mocha align-bottom"
              >
                <span className="tabular-nums mr-2 text-jet-black/40">{String(i + 1).padStart(2, '0')}</span>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b last:border-b-0 border-jet-black/10 hover:bg-oat/40 transition-colors">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-5 px-5 align-top text-sm leading-relaxed ${
                    ci === 0 ? 'font-display font-extrabold text-jet-black text-base' : 'text-mocha'
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
    <section className="relative bg-milk text-jet-black border-t border-jet-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28 space-y-24 lg:space-y-32">

        {/* DIRECT ANSWER — editorial intro block with drop cap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          id="direct-answer"
          className="grid grid-cols-12 gap-y-8 lg:gap-x-10"
        >
          <div className="col-span-12 lg:col-span-3">
            <Eyebrow className="mb-4">Section II — Direct Answer</Eyebrow>
            <p className="text-xs uppercase tracking-[0.2em] text-mocha">A definition, briefly.</p>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(2rem,5vw,3.75rem)] mb-8">
              What is the best taper haircut?
            </h2>
            <div className="text-xl leading-[1.55] text-jet-black max-w-[60ch]">
              <span className="float-left mr-3 mt-1 font-display text-7xl leading-[0.85] font-extrabold text-accent">T</span>
              he best taper haircut is the one that aligns face geometry, hair texture behavior, contrast tolerance,
              and maintenance cadence. A recommendation engine that ignores any of those is just a style gallery in
              disguise &mdash; useful only after you already know what you want.
            </div>
            <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-mocha text-base max-w-[60ch]">
              {[
                'Face shape determines side compression tolerance.',
                'Hair texture determines blend visibility and growth pattern.',
                'Taper height determines perceived sharpness and upkeep frequency.',
                'Barber language determines final execution accuracy.',
              ].map((c) => (
                <p key={c} className="flex gap-3">
                  <span className="text-accent font-bold mt-0.5" aria-hidden="true">+</span>
                  {c}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        <Asterism />

        {/* FACE SHAPE — full bleed editorial table */}
        <motion.div
          id="face-shape"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-12 gap-y-6 lg:gap-x-10 mb-8">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow className="mb-5">Section III — Face Geometry</Eyebrow>
              <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(2rem,5vw,3.75rem)]">
                Mapped to taper strategy.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="text-base text-mocha leading-relaxed">
                Every row is engineered to be quotable in a barber chair &mdash; not just readable on a screen.
              </p>
            </div>
          </div>
          <EditorialTable
            caption="Face shape matching system"
            headers={['Face Shape', 'Recommended Taper', 'Why It Works', 'Barber Anchor']}
            rows={faceShapeRows}
          />
        </motion.div>

        {/* HAIR TYPE */}
        <motion.div
          id="hair-type"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-12 gap-y-6 lg:gap-x-10 mb-8">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow className="mb-5">Section IV — Texture</Eyebrow>
              <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(2rem,5vw,3.75rem)]">
                How hair grows out matters.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="text-base text-mocha leading-relaxed">
                A taper that flatters on day one but collapses by week two is a failed recommendation. Texture
                determines week-three behavior.
              </p>
            </div>
          </div>
          <EditorialTable
            caption="Hair texture recommendation system"
            headers={['Hair Type', 'Best Taper Direction', 'Core Risk', 'Execution Note']}
            rows={hairTypeRows}
          />
        </motion.div>

        {/* PULL QUOTE — large editorial quote */}
        <motion.figure
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-y-6 lg:gap-x-10 py-12 border-y border-jet-black"
        >
          <div className="col-span-12 lg:col-span-1 flex items-start justify-center lg:justify-end">
            <span className="font-display text-[8rem] leading-[0.65] font-extrabold text-accent select-none" aria-hidden="true">&ldquo;</span>
          </div>
          <blockquote className="col-span-12 lg:col-span-10 lg:col-start-2">
            <p className="font-display font-extrabold tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,4vw,3rem)] text-jet-black">
              Most haircut dissatisfaction isn&rsquo;t bad barbering. It&rsquo;s decision mismatch &mdash; a
              consultation problem solved before the chair.
            </p>
            <figcaption className="mt-6 text-xs uppercase tracking-[0.22em] text-mocha">
              — Taper Empire editorial · The Founding Thesis
            </figcaption>
          </blockquote>
        </motion.figure>

        {/* COMPARISONS */}
        <motion.div
          id="comparisons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-12 gap-y-6 lg:gap-x-10 mb-8">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow className="mb-5">Section V — Comparison Frames</Eyebrow>
              <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(2rem,5vw,3.75rem)]">
                Decisions, side by side.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="text-base text-mocha leading-relaxed">
                Each row answers the actual queries men type before booking &mdash; not the answers a content
                farm wishes they typed.
              </p>
            </div>
          </div>
          <EditorialTable
            caption="Taper comparison frameworks"
            headers={['Comparison', 'Natural Grow-out', 'Sharp Contrast', 'Use Case']}
            rows={compareRows}
          />
        </motion.div>

        {/* MAINTENANCE — calendar style */}
        <motion.div
          id="maintenance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-12 gap-y-8 lg:gap-x-10"
        >
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow className="mb-5">Section VI — Calendar</Eyebrow>
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2rem,5vw,3.75rem)] mb-6">
              A taper is a maintenance system.
            </h2>
            <p className="text-mocha leading-relaxed max-w-[34ch]">
              Not a one-time event. Plan the cadence before you book the first cut.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8 grid sm:grid-cols-3">
            {[
              { range: 'Day 0–3',   title: 'Lock the shape', body: 'Texture-appropriate product. Resist over-washing.' },
              { range: 'Day 7–14',  title: 'Edge cleanup',   body: 'Nape + temples only. Keep the silhouette honest.' },
              { range: 'Day 21–30', title: 'Full reset',     body: 'Reshape to baseline. Reset the calendar.' },
            ].map((b, i) => (
              <div
                key={b.range}
                className={`p-6 sm:p-8 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l border-jet-black/15' : ''}`}
              >
                <p className="font-display text-xs font-extrabold tracking-[0.22em] text-accent uppercase mb-3">{b.range}</p>
                <h3 className="font-display text-2xl font-extrabold tracking-tight mb-3">{b.title}</h3>
                <p className="text-sm text-mocha leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
