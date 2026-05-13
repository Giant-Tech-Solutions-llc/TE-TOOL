'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Eyebrow } from '@/components/editorial/Rule'

const items = [
  {
    q: 'What taper haircut is best for a round face?',
    a: 'A low taper with height-focused top styling is usually the right starting point for a round face. It reduces side width and builds vertical structure — the two levers that visually rebalance round proportions.',
  },
  {
    q: 'Is a taper better than a fade for professional settings?',
    a: 'Often, yes. Tapers grow out more gracefully and keep side transitions less aggressive than most skin fades — which means fewer awkward transition weeks between cuts in environments where consistent grooming matters.',
  },
  {
    q: 'How often should a taper be maintained?',
    a: 'Edge cleanup every 10–14 days, full shape reset every 3–4 weeks. The exact cadence depends on hair texture (coily shrinks faster than straight) and how sharp you want the contrast to read at week two.',
  },
  {
    q: 'What should I tell my barber for a low taper?',
    a: 'Three things: starting height, guard progression, and neckline preference. Our tool generates the verbatim script — including the exact phrasing that prevents the "make it short on the sides" misinterpretation.',
  },
  {
    q: 'Is the photo upload private?',
    a: 'Your photo is processed in real time and never written to disk. We use it only to read face geometry and to render the on-face previews you see in the results.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-milk text-jet-black border-t border-jet-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">

          {/* Left meta column */}
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow className="mb-5">Section VII — Correspondence</Eyebrow>
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2.25rem,5vw,4rem)] mb-6">
              Frequently
              <br />
              asked.
              <br />
              Honestly
              <br />
              answered.
            </h2>
            <p className="text-base text-mocha leading-relaxed max-w-[36ch]">
              No marketing-team copy. No SEO-stuffed throat-clearing. Straight answers, written the way a
              barbershop owner would say them.
            </p>
          </div>

          {/* Right Q&A list */}
          <div className="col-span-12 lg:col-span-8 border-t border-jet-black">
            {items.map((it, i) => {
              const isOpen = open === i
              return (
                <article key={it.q} className="border-b border-jet-black/15">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-7 flex items-start gap-6 group"
                  >
                    <span className="font-display font-extrabold tabular-nums text-mocha text-sm tracking-[0.15em] mt-1.5 w-10 flex-shrink-0">
                      Q. {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-display font-extrabold tracking-[-0.01em] text-xl sm:text-2xl leading-tight text-jet-black group-hover:text-accent transition-colors">
                      {it.q}
                    </span>
                    <span className="mt-1.5 flex-shrink-0 grid place-items-center w-8 h-8 border border-jet-black/30 group-hover:border-jet-black group-hover:bg-jet-black group-hover:text-milk transition-colors">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-6 pb-7 pl-0">
                          <span className="font-display font-extrabold tabular-nums text-accent text-sm tracking-[0.15em] w-10 flex-shrink-0">
                            A.
                          </span>
                          <p className="flex-1 text-base text-mocha leading-[1.75] max-w-[60ch]">{it.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
