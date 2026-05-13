'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Loader2 } from 'lucide-react'
import type { Recommendation } from '@/types'

interface Props {
  rec: Recommendation
  index: number
  imageLoading: boolean
}

export function SecondaryMatch({ rec, index, imageLoading }: Props) {
  const [open, setOpen] = useState(false)
  const rank = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border border-jet-black/15 bg-milk hover:border-jet-black transition-colors"
    >
      <div className="grid grid-cols-12 gap-0 items-stretch">

        {/* Thumb */}
        <div className="col-span-12 sm:col-span-4 relative aspect-square sm:aspect-auto bg-oat/60 border-b sm:border-b-0 sm:border-r border-jet-black/15 overflow-hidden">
          {imageLoading && !rec.image_url ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-mocha animate-spin" />
            </div>
          ) : rec.image_url ? (
            <Image
              src={rec.image_url}
              alt={rec.style_name}
              fill
              sizes="(max-width: 640px) 100vw, 30vw"
              className="object-cover object-top"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-mocha">
              No preview
            </div>
          )}
          <div className="absolute top-3 left-3 bg-jet-black text-milk text-[10px] font-semibold tracking-[0.22em] uppercase px-2 py-1">
            № {rank}
          </div>
        </div>

        {/* Body */}
        <div className="col-span-12 sm:col-span-8 p-6 sm:p-7 flex flex-col">

          <div className="flex items-baseline justify-between mb-3 gap-4">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-mocha">
              Alternate Match
            </p>
            <p className="font-display font-extrabold tabular-nums tracking-tight text-2xl">
              {rec.match_score}<span className="text-mocha text-base">%</span>
            </p>
          </div>

          <h3 className="font-display font-extrabold tracking-[-0.015em] leading-tight text-2xl sm:text-3xl mb-3">
            {rec.style_name}
          </h3>

          <p className="text-sm text-mocha leading-[1.7] mb-4">{rec.why_it_works}</p>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-auto pt-4 border-t border-jet-black/15 flex items-center justify-between text-left group"
            aria-expanded={open}
          >
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-jet-black group-hover:text-accent transition-colors">
              {open ? 'Hide barber brief' : 'View barber brief'}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
              strokeWidth={2}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-3 text-sm text-mocha leading-[1.7]">
                  <p>
                    <span className="font-semibold text-jet-black text-[10px] tracking-[0.22em] uppercase block mb-1">
                      Barber Brief
                    </span>
                    {rec.barber_instructions}
                  </p>
                  <p>
                    <span className="font-semibold text-jet-black text-[10px] tracking-[0.22em] uppercase block mb-1">
                      Maintenance
                    </span>
                    {rec.maintenance}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  )
}
