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
    a: 'Three things: starting height, guard progression, and neckline preference. The platform generates the verbatim script — including the exact phrasing that prevents the "make it short on the sides" misinterpretation.',
  },
  {
    q: 'Is the photo upload private?',
    a: 'Your photo is processed in real time and never written to disk. We use it only to read face geometry and to render the on-face previews you see in the results.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-ink text-soft border-t border-line">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12">

          <div className="col-span-12 lg:col-span-4">
            <Eyebrow className="mb-6">Chapter VII — Correspondence</Eyebrow>
            <h2 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[clamp(2.25rem,5vw,4.5rem)] mb-8">
              Asked.
              <br />
              <span className="italic font-medium text-mute">Answered.</span>
            </h2>
            <p className="text-base text-soft/65 leading-[1.75] max-w-[36ch]">
              No marketing copy. No SEO-stuffed throat-clearing. Straight answers, written the
              way a barbershop owner would say them.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8 rounded-3xl border border-line bg-surface/20 overflow-hidden">
            {items.map((it, i) => {
              const isOpen = open === i
              return (
                <article key={it.q} className={`${i < items.length - 1 ? 'border-b border-line' : ''} ${isOpen ? 'bg-surface/40' : 'hover:bg-surface/30'} transition-colors duration-500`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-7 px-6 lg:px-8 flex items-start gap-6 group"
                  >
                    <span className="font-display tabular-nums text-gold text-xs tracking-[0.32em] mt-2 w-12 flex-shrink-0">
                      Q.{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-display font-extrabold tracking-[-0.015em] text-xl sm:text-2xl leading-tight text-soft group-hover:text-gold transition-colors">
                      {it.q}
                    </span>
                    <span className={`mt-2 flex-shrink-0 grid place-items-center w-9 h-9 rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'border-gold bg-gold/10 text-gold rotate-[180deg]'
                        : 'border-line text-soft/70 group-hover:border-gold group-hover:text-gold group-hover:scale-110'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-6 pb-8 px-6 lg:px-8">
                          <span className="font-display tabular-nums text-gold text-xs tracking-[0.32em] w-12 flex-shrink-0">
                            A.
                          </span>
                          <p className="flex-1 text-base text-soft/65 leading-[1.85] max-w-[60ch]">{it.a}</p>
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
