'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2, Loader2 } from 'lucide-react'
import type { Recommendation } from '@/types'

interface Props {
  rec: Recommendation
  imageLoading: boolean
}

export function PrimaryMatch({ rec, imageLoading }: Props) {
  const [lightbox, setLightbox] = useState(false)

  const labels = inferStyleFitLabels(rec)

  return (
    <article className="border-y-2 border-jet-black bg-milk">
      <div className="grid grid-cols-12 gap-0">

        {/* Hero image */}
        <div className="col-span-12 lg:col-span-7 relative aspect-square lg:aspect-[5/6] bg-oat/60 border-b lg:border-b-0 lg:border-r border-jet-black/20 overflow-hidden group">
          {imageLoading && !rec.image_url ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-7 h-7 mx-auto mb-3 text-mocha animate-spin" />
                <p className="text-[10px] tracking-[0.22em] uppercase text-mocha">Rendering preview</p>
              </div>
            </div>
          ) : rec.image_url ? (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              aria-label="View at full size"
              className="absolute inset-0 cursor-zoom-in"
            >
              <Image
                src={rec.image_url}
                alt={rec.style_name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                unoptimized
                priority
              />
              <div className="absolute top-4 right-4 w-9 h-9 bg-milk/90 backdrop-blur-sm border border-jet-black/15 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-mocha text-sm">
              Preview unavailable
            </div>
          )}

          {/* Floating meta — top-left chip */}
          <div className="absolute top-4 left-4 bg-jet-black text-milk text-[10px] font-semibold tracking-[0.22em] uppercase px-3 py-1.5 z-10">
            Primary Match
          </div>
        </div>

        {/* Content panel */}
        <div className="col-span-12 lg:col-span-5 p-8 lg:p-10 xl:p-12 flex flex-col">

          <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-8 bg-jet-black" />
            TaperMatch™ Score
          </p>

          <div className="flex items-baseline gap-4 mb-7">
            <p className="font-display font-extrabold tracking-[-0.04em] leading-none text-[clamp(3.5rem,7vw,5.5rem)]">
              {rec.match_score}<span className="text-mocha text-3xl">%</span>
            </p>
            <p className="text-xs tracking-[0.18em] uppercase text-mocha">Compatible</p>
          </div>

          <h2 className="font-display font-extrabold tracking-[-0.02em] leading-[0.95] text-[clamp(2rem,3.5vw,3rem)] mb-5">
            {rec.style_name}
          </h2>

          {labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-7">
              {labels.map((l) => (
                <span
                  key={l}
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase border border-jet-black/30 text-jet-black px-2.5 py-1"
                >
                  {l}
                </span>
              ))}
            </div>
          )}

          {/* Reasoning */}
          <section className="mb-7">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-mocha mb-2">
              Face Structure Index™
            </p>
            <p className="text-base text-jet-black leading-[1.65]">{rec.why_it_works}</p>
          </section>

          {/* Barber notes */}
          <section className="mb-7 pt-7 border-t border-jet-black/15">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-mocha mb-2">
              Barber Brief
            </p>
            <p className="text-sm text-mocha leading-[1.7]">{rec.barber_instructions}</p>
          </section>

          {/* Maintenance */}
          <section className="mb-2 pt-7 border-t border-jet-black/15">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-mocha mb-2">
              Maintenance Score™
            </p>
            <p className="text-sm text-mocha leading-[1.7]">{rec.maintenance}</p>
          </section>

        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && rec.image_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[100] bg-jet-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-milk text-jet-black grid place-items-center hover:bg-accent hover:text-milk transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[min(92vh,92vw)] aspect-square"
            >
              <Image
                src={rec.image_url}
                alt={rec.style_name}
                fill
                sizes="92vw"
                className="object-contain"
                unoptimized
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-milk">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-taupe mb-1">
                    {rec.match_score}% Match
                  </p>
                  <p className="font-display text-2xl font-extrabold">{rec.style_name}</p>
                </div>
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-taupe">
                  taperempire.com
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

/** Lightweight heuristic — extract style-fit labels from the recommendation. */
function inferStyleFitLabels(rec: Recommendation): string[] {
  const text = `${rec.style_name} ${rec.why_it_works} ${rec.barber_instructions} ${rec.maintenance}`.toLowerCase()
  const labels: string[] = []
  if (/(low|minimal|four|six week)/i.test(text)) labels.push('Low maintenance')
  if (/(professional|office|formal)/i.test(text)) labels.push('Professional')
  if (/(casual|every|relax)/i.test(text)) labels.push('Casual')
  if (/(modern|trend|bold|sharp|edge)/i.test(text)) labels.push('Trend-forward')
  if (/(beard|stubble)/i.test(text)) labels.push('Beard compatible')
  return labels.slice(0, 3)
}
