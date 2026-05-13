'use client'

import { Eyebrow, ChapterNumber, Asterism } from '@/components/editorial/Rule'
import { motion } from 'framer-motion'

const steps = [
  {
    n: '01',
    title: 'Submit your inputs',
    lede: 'A clear headshot, or 5 questions about face, hair, lifestyle, and upkeep.',
    body:
      'The engine accepts either modality. A photo is the gold standard — it lets the AI read face geometry directly. The quiz path exists for privacy-conscious users; results converge within a few percentage points.',
  },
  {
    n: '02',
    title: 'The engine scores 40 styles',
    lede: 'Face shape, hair texture, lifestyle, age, and maintenance tolerance feed four ranking lenses.',
    body:
      'Geometric fit, growth pattern compatibility, formality alignment, and maintenance cadence each produce a sub-score. The composite ranking is normalized to a 0–99 match percentage that&rsquo;s honest about its uncertainty.',
  },
  {
    n: '03',
    title: 'You receive a barber-ready plan',
    lede: 'Three ranked matches with on-face previews, guard sizes, and a four-week maintenance calendar.',
    body:
      'Each recommendation includes a verbatim script you can read aloud to your barber, with guard progressions, blend heights, neckline preference, and a maintenance frequency that matches your hair texture&rsquo;s growth pattern.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-milk text-jet-black border-t border-jet-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-32">

        {/* Section masthead */}
        <div className="relative grid grid-cols-12 gap-y-8 lg:gap-x-10 mb-16 lg:mb-24">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow className="mb-6">Section I — The Method</Eyebrow>
            <h2 className="font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(2.5rem,6vw,5.5rem)]">
              Three steps.
              <br />
              Zero guesswork.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pl-10 lg:border-l lg:border-jet-black/15">
            <p className="text-lg text-mocha leading-relaxed">
              The method below is engineered to remove every avoidable failure mode of a barbershop visit:
              vague language, trend mismatch, and texture-blindness. Read it through &mdash; or skim the
              numbered headings.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative grid grid-cols-12 gap-y-6 lg:gap-x-10 py-12 lg:py-16 border-t border-jet-black/15 first:border-t-0 group"
            >
              {/* Giant outline number floating in left gutter */}
              <div className="absolute -left-2 -top-4 lg:-top-6 select-none pointer-events-none">
                <ChapterNumber n={s.n} className="!text-jet-black/[0.045] !text-[8rem] sm:!text-[12rem]" />
              </div>

              <div className="relative col-span-12 lg:col-span-4 lg:col-start-1">
                <p className="font-display text-sm font-extrabold tracking-[0.2em] text-accent uppercase mb-3">
                  Step {s.n}
                </p>
                <h3 className="font-display font-extrabold tracking-[-0.02em] text-[2rem] sm:text-[2.5rem] leading-[1.05] text-jet-black">
                  {s.title}
                </h3>
              </div>

              <div className="relative col-span-12 lg:col-span-7 lg:col-start-6">
                <p className="text-xl sm:text-2xl font-display font-medium text-jet-black leading-snug mb-6 max-w-[40ch]">
                  {s.lede}
                </p>
                <p className="text-base text-mocha leading-[1.7] max-w-[60ch]">{s.body}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <Asterism className="mt-16" />
      </div>
    </section>
  )
}
