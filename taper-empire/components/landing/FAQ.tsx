'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const items = [
  {
    q: 'What taper haircut is best for a round face?',
    a: 'A low taper with height-focused top styling is usually the best starting point for a round face because it reduces side width while creating vertical structure.',
  },
  {
    q: 'Is a taper better than a fade for professional settings?',
    a: 'A taper is often better for professional environments because it grows out cleaner and keeps side transitions less aggressive than most skin fades.',
  },
  {
    q: 'How often should a taper haircut be maintained?',
    a: 'Most taper cuts need edge cleanup every 10–14 days and full shape maintenance every 3–4 weeks, depending on hair texture and contrast level.',
  },
  {
    q: 'What should I tell my barber for a low taper?',
    a: 'Ask for low tapering around temples and nape, guard progression details, and clear instructions on how much weight to keep near the parietal ridge.',
  },
  {
    q: 'Is the photo upload private?',
    a: 'Your photo is processed in real time and never stored on our servers. We use it only to analyze face shape and generate the on-face previews.',
  },
]

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 lg:py-28 bg-oat/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase mb-3">FAQ</p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-jet-black mb-4 tracking-tight">
            Frequently asked questions
          </h2>
        </ScrollReveal>

        <div className="space-y-3">
          {items.map((it, i) => {
            const open = openIdx === i
            return (
              <ScrollReveal key={it.q} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full text-left bg-milk border border-border rounded-2xl px-6 py-5 hover:border-accent transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-jet-black">{it.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-mocha transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-mocha leading-relaxed">{it.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
