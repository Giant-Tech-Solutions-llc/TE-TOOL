'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { easeLux } from '@/lib/motion'
import type { ArticleFAQ } from '@/lib/guide/types'

export function FAQBlock({ faqs }: { faqs: ArticleFAQ[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="rounded-lg-x border border-line bg-surface/20 divide-y divide-line">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className="px-6 lg:px-8">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 lg:py-7 text-left group/faq"
            >
              <span className="font-display font-extrabold tracking-[-0.02em] text-soft text-lg lg:text-xl leading-[1.3] group-hover/faq:text-gold transition-colors duration-300">
                {f.q}
              </span>
              <span
                aria-hidden="true"
                className={`mt-2 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/40 text-gold transition-transform duration-500 ease-lux ${
                  isOpen ? 'rotate-45 bg-gold/10' : ''
                }`}
              >
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
                  <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: easeLux }}
                  className="overflow-hidden"
                >
                  <p className="text-soft/75 leading-[1.85] text-[15.5px] pb-7 pr-12">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
