'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import { Rule, Eyebrow } from '@/components/editorial/Rule'

const STATS = [
  { k: '012', v: 'Taper styles in catalog' },
  { k: '04', v: 'Decision inputs' },
  { k: '60s', v: 'From upload to verdict' },
  { k: '12.8k', v: 'Men matched this month' },
]

export function Hero() {
  return (
    <section className="relative bg-milk text-jet-black">
      {/* Masthead bar — like the top of a magazine */}
      <div className="border-y border-jet-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-9 text-[11px] font-semibold tracking-[0.22em] uppercase">
          <span>Vol. I · No. 001</span>
          <span className="hidden sm:block">A Decision Intelligence Tool for Men</span>
          <span>Est. 2026</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">

          {/* LEFT GUTTER — vertical issue indicator */}
          <aside className="hidden lg:flex col-span-1 flex-col items-center justify-start gap-6 pt-2">
            <span className="text-[10px] tracking-[0.4em] uppercase text-mocha" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Issue 001 · Find the cut
            </span>
            <Rule vertical className="flex-1 min-h-[120px]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-mocha">↓</span>
          </aside>

          {/* MAIN COLUMN — headline + lede */}
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow className="mb-8">The Feature · Volume One</Eyebrow>

              <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[0.92] text-jet-black text-[clamp(3.5rem,9vw,9rem)]">
                The right
                <br />
                taper, for
                <br />
                the right
                <br />
                <span className="italic font-serif font-normal tracking-tight">man.</span>
              </h1>

              <div className="mt-10 max-w-[42ch] text-lg sm:text-xl text-mocha leading-[1.55]">
                <span className="float-left mr-3 mt-1 font-display text-6xl leading-[0.85] font-extrabold text-jet-black">A</span>
                premium recommendation engine for men&rsquo;s taper haircuts. Built on face geometry, hair behavior,
                and barbershop language &mdash; not trend galleries.
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  href="/tool"
                  className="group inline-flex items-center gap-3 bg-jet-black text-milk pl-8 pr-3 py-3 hover:bg-charcoal transition-colors"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">Begin the Analysis</span>
                  <span className="grid place-items-center w-10 h-10 bg-milk text-jet-black group-hover:bg-accent group-hover:text-milk transition-colors">
                    <ArrowUpRight className="w-5 h-5" strokeWidth={2.25} />
                  </span>
                </Link>

                <Link
                  href="#how-it-works"
                  className="text-sm font-semibold tracking-[0.18em] uppercase text-jet-black underline underline-offset-[6px] decoration-[1.5px] hover:decoration-accent hover:text-accent transition-colors"
                >
                  Read the method ↓
                </Link>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — TOC + ratings card, magazine sidebar */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pl-10 lg:border-l lg:border-jet-black/15">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Eyebrow className="mb-6">Inside this issue</Eyebrow>
              <ol className="space-y-3 mb-10">
                {[
                  ['I',   'The Method',                '#how-it-works'],
                  ['II',  'Face Shape System',         '#face-shape'],
                  ['III', 'Hair Texture System',       '#hair-type'],
                  ['IV',  'Comparison Frameworks',     '#comparisons'],
                  ['V',   'Maintenance Calendar',      '#maintenance'],
                  ['VI',  'Frequently Asked Questions','#faq'],
                ].map(([roman, title, href]) => (
                  <li key={roman}>
                    <Link
                      href={href}
                      className="group flex items-baseline justify-between gap-4 py-2 border-b border-jet-black/15 hover:border-jet-black transition-colors"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-display text-sm font-extrabold text-mocha tabular-nums w-6">{roman}.</span>
                        <span className="text-sm font-medium text-jet-black group-hover:text-accent transition-colors">
                          {title}
                        </span>
                      </span>
                      <span className="text-mocha text-xs">→</span>
                    </Link>
                  </li>
                ))}
              </ol>

              {/* Star rating card — small editorial review block */}
              <div className="bg-jet-black text-milk p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-taupe mb-3">A reader&rsquo;s verdict</p>
                <div className="flex gap-0.5 mb-3" aria-hidden="true">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-warning text-warning" />)}
                </div>
                <p className="font-display text-xl font-extrabold tracking-tight leading-tight mb-4">
                  &ldquo;Walked in, showed my barber the printout, walked out with the best cut I&rsquo;ve had in years.&rdquo;
                </p>
                <p className="text-xs uppercase tracking-[0.15em] text-taupe">
                  M.R. &mdash; <span className="text-milk">Brooklyn, NY</span>
                </p>
              </div>
            </motion.div>
          </aside>
        </div>

        {/* Bottom stats strip — newspaper kicker */}
        <motion.dl
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-4 mt-16 lg:mt-24 border-t border-jet-black"
        >
          {STATS.map((s, i) => (
            <div
              key={s.k}
              className={`py-6 pr-4 ${i !== 0 ? 'sm:border-l sm:border-jet-black/15 sm:pl-6' : ''} ${i % 2 === 1 ? 'border-l border-jet-black/15 pl-6 sm:border-l-0 sm:pl-0' : ''} ${i >= 2 ? 'border-t border-jet-black/15 sm:border-t-0 pt-6 sm:pt-6' : ''} sm:pl-6 sm:border-l sm:border-jet-black/15`}
            >
              <dt className="text-[11px] uppercase tracking-[0.2em] text-mocha mb-2">{s.v}</dt>
              <dd className="font-display text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] tabular-nums">{s.k}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
