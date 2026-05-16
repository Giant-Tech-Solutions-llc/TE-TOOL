'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import type { Recommendation } from '@/types'
import { SectionEyebrow } from '@/components/shared'
import { easeLux } from '@/lib/motion'

/**
 * Phase 06 — Secondary Rail (horizontal lookbook)
 *
 * Replaces the prior 3-equal-card grid with a horizontal snap-scrolling
 * lookbook of alternate matches. Reads as a fashion editorial filmstrip
 * rather than a SaaS card pile.
 */

interface Props {
  recs: Recommendation[]
  imageLoading: Record<number, boolean>
}

export function SecondaryRail({ recs, imageLoading }: Props) {
  const railRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const node = railRef.current
    if (!node) return
    const delta = node.clientWidth * 0.8 * (dir === 'right' ? 1 : -1)
    node.scrollBy({ left: delta, behavior: 'smooth' })
  }

  if (recs.length === 0) return null

  return (
    <section aria-labelledby="alt-heading" className="relative">

      <div className="flex items-end justify-between gap-6 mb-10 pb-6 border-b border-line">
        <div>
          <SectionEyebrow className="mb-4">Lookbook — Alternate Matches</SectionEyebrow>
          <h2 id="alt-heading" className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[clamp(2rem,4vw,3.5rem)]">
            More that
            <span className="italic font-medium text-mute"> nearly hit.</span>
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="w-12 h-12 rounded-full grid place-items-center border border-line text-soft hover:bg-soft hover:text-ink hover:border-soft hover:scale-105 transition-all duration-300 ease-lux"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="w-12 h-12 rounded-full grid place-items-center border border-line text-soft hover:bg-soft hover:text-ink hover:border-soft hover:scale-105 transition-all duration-300 ease-lux"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        {recs.map((rec, i) => (
          <RailItem key={i} rec={rec} index={i + 1} loading={!!imageLoading[i + 1]} />
        ))}
      </div>
    </section>
  )
}

function RailItem({ rec, index, loading }: { rec: Recommendation; index: number; loading: boolean }) {
  const rank = String(index + 1).padStart(2, '0')
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: easeLux }}
      className="flex-none w-[78vw] sm:w-[440px] lg:w-[480px] snap-start group"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] bg-surface overflow-hidden mb-5 rounded-hero border border-line shadow-luxury-sm">
        {loading && !rec.image_url ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-gold animate-spin" />
          </div>
        ) : rec.image_url ? (
          <Image
            src={rec.image_url}
            alt={rec.style_name}
            fill
            sizes="(max-width: 640px) 78vw, 480px"
            className="object-cover object-top transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-mute text-xs">
            No preview
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(7,7,7,0.55) 100%)' }}
        />

        <div className="absolute top-4 left-4 type-eyebrow text-soft/80">
          № {rank}
        </div>
        <div className="absolute top-4 right-4 type-eyebrow bg-soft text-ink px-2.5 py-1 rounded-pill shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
          {rec.match_score}%
        </div>
      </div>

      {/* Body */}
      <div className="px-1">
        <h3 className="font-display font-extrabold tracking-[-0.025em] text-2xl lg:text-3xl mb-3 leading-tight">
          {rec.style_name}
        </h3>
        <p className="text-sm text-soft/65 leading-[1.75] mb-5 line-clamp-3">{rec.why_it_works}</p>

        <details className="group/d">
          <summary className="list-none cursor-pointer flex items-center justify-between gap-3 border-t border-line pt-4 type-eyebrow text-soft hover:text-gold transition-colors duration-300">
            <span>Barber brief</span>
            <span aria-hidden="true" className="grid place-items-center w-7 h-7 rounded-full border border-line transition-all duration-300 group-open/d:rotate-180 group-open/d:border-gold group-open/d:text-gold">↓</span>
          </summary>
          <div className="mt-4 space-y-4 text-sm text-soft/65 leading-[1.85]">
            <p>
              <span className="type-eyebrow text-mute block mb-1.5">Cut details</span>
              {rec.barber_instructions}
            </p>
            <p>
              <span className="type-eyebrow text-mute block mb-1.5">Maintenance</span>
              {rec.maintenance}
            </p>
          </div>
        </details>
      </div>
    </motion.article>
  )
}
