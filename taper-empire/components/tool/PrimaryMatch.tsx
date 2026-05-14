'use client'

import { useState, useEffect } from 'react'
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
  const [scoreDisplay, setScoreDisplay] = useState(0)

  // Animated reveal of the match score
  useEffect(() => {
    const target = rec.match_score
    const start = performance.now()
    const DURATION = 1400
    const tick = (t: number) => {
      const p = Math.min((t - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setScoreDisplay(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    const r = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(r)
  }, [rec.match_score])

  const heuristics = computeHeuristics(rec)
  const labels = inferStyleFitLabels(rec)

  return (
    <article className="relative bg-ink text-soft">
      <div className="grid grid-cols-12 gap-0 items-stretch">

        {/* LEFT — large cinematic image */}
        <div className="col-span-12 lg:col-span-7 relative aspect-[4/5] lg:aspect-[5/6] bg-surface overflow-hidden group lg:rounded-l-3xl">
          {imageLoading && !rec.image_url ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-8 h-8 mx-auto mb-4 text-gold animate-spin" />
                <p className="text-[10px] tracking-[0.32em] uppercase text-mute">Rendering preview</p>
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
                className="object-cover object-top transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                unoptimized
                priority
              />
              {/* Subtle vignette over image */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.6) 100%)' }}
              />
              <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-ink/70 backdrop-blur-md border border-soft/15 grid place-items-center text-soft opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                <Maximize2 className="w-4 h-4" />
              </div>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-mute text-sm">
              Preview unavailable
            </div>
          )}

          {/* Floating chip */}
          <div className="absolute top-5 left-5 bg-gold text-ink text-[10px] font-semibold tracking-[0.32em] uppercase px-3 py-1.5 rounded-full z-10 shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
            Primary Match
          </div>

          {/* Overlay style name */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 z-10">
            <p className="font-display font-extrabold tracking-[-0.025em] text-2xl lg:text-3xl text-soft leading-tight">
              {rec.style_name}
            </p>
            <p className="text-[10px] tracking-[0.32em] uppercase text-soft/70">Plate I</p>
          </div>
        </div>

        {/* RIGHT — analysis panel */}
        <div className="col-span-12 lg:col-span-5 p-8 lg:p-12 xl:p-14 flex flex-col bg-ink lg:rounded-r-3xl">

          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-5 flex items-center gap-4">
            <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
            TaperMatch™ Score
          </p>

          {/* Oversized cinematic match score */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-display font-extrabold tabular-nums tracking-[-0.05em] leading-[0.85] text-[clamp(5rem,11vw,9rem)]">
              {scoreDisplay}
            </span>
            <span className="font-display font-extrabold text-3xl lg:text-4xl text-mute">%</span>
          </div>
          <p className="text-[10px] tracking-[0.32em] uppercase text-mute mb-8">Compatible</p>

          {labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-line">
              {labels.map((l) => (
                <span
                  key={l}
                  className="text-[9px] font-medium tracking-[0.28em] uppercase border border-line text-soft/80 px-3 py-1.5 rounded-full"
                >
                  {l}
                </span>
              ))}
            </div>
          )}

          {/* Analysis grid — Face Structure / Maintenance / Styling Difficulty / Beard / Pro Score / Growth */}
          <dl className="grid grid-cols-2 gap-y-7 mb-10 pb-10 border-b border-line">
            {[
              ['Face structure',    heuristics.face],
              ['Maintenance',       heuristics.maintenance],
              ['Styling difficulty',heuristics.styling],
              ['Beard compatibility', heuristics.beard],
              ['Professionalism',   heuristics.professionalism],
              ['Growth pattern',    heuristics.growth],
            ].map(([k, v]) => (
              <div key={k as string}>
                <dt className="text-[10px] tracking-[0.32em] uppercase text-mute mb-2">{k}</dt>
                <dd className="font-display text-base lg:text-lg font-extrabold text-soft tracking-tight leading-tight">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Face Structure Analysis */}
          <section className="mb-8 pb-8 border-b border-line">
            <p className="text-[10px] tracking-[0.32em] uppercase text-gold mb-3">
              Face Structure Analysis
            </p>
            <p className="text-sm lg:text-base text-soft/80 leading-[1.75]">{rec.why_it_works}</p>
          </section>

          {/* Barber Instructions */}
          <section>
            <p className="text-[10px] tracking-[0.32em] uppercase text-gold mb-3">
              Barber Instructions
            </p>
            <p className="text-sm text-soft/65 leading-[1.85]">{rec.barber_instructions}</p>
          </section>

        </div>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightbox && rec.image_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[100] bg-ink/97 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface border border-line text-soft grid place-items-center hover:bg-gold hover:text-ink hover:border-gold hover:scale-105 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[min(94vh,94vw)] aspect-square"
            >
              <Image
                src={rec.image_url}
                alt={rec.style_name}
                fill
                sizes="94vw"
                className="object-contain"
                unoptimized
              />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end gap-4 text-soft">
                <div>
                  <p className="text-[10px] tracking-[0.32em] uppercase text-mute mb-2">
                    {rec.match_score}% TaperMatch™
                  </p>
                  <p className="font-display text-3xl font-extrabold tracking-[-0.02em]">{rec.style_name}</p>
                </div>
                <p className="text-[10px] tracking-[0.32em] uppercase text-mute">
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

function inferStyleFitLabels(rec: Recommendation): string[] {
  const text = `${rec.style_name} ${rec.why_it_works} ${rec.barber_instructions} ${rec.maintenance}`.toLowerCase()
  const labels: string[] = []
  if (/(low|minimal|four|six week)/.test(text)) labels.push('Low maintenance')
  if (/(professional|office|formal)/.test(text)) labels.push('Professional')
  if (/(casual|every|relax)/.test(text)) labels.push('Casual')
  if (/(modern|trend|bold|sharp|edge)/.test(text)) labels.push('Trend-forward')
  if (/(beard|stubble)/.test(text)) labels.push('Beard compatible')
  return labels.slice(0, 4)
}

function computeHeuristics(rec: Recommendation) {
  const m = rec.maintenance.toLowerCase()
  const b = rec.barber_instructions.toLowerCase()
  return {
    face: /round|oval|square|diamond|heart/.exec(rec.why_it_works.toLowerCase())?.[0]?.replace(/^./, c => c.toUpperCase()) || 'Balanced',
    maintenance: /low|minimal/.test(m) ? 'Low effort' : /high|weekly/.test(m) ? 'High effort' : 'Medium',
    styling: /textur|pomade|clay|product/.test(b) ? 'Moderate' : /scissor|sharp|defin/.test(b) ? 'Refined' : 'Easy',
    beard: /beard|stubble/.test(b) ? 'Strong' : 'Compatible',
    professionalism: /professional|office|formal/.test(rec.why_it_works.toLowerCase()) ? 'High' : 'Versatile',
    growth: /coily|curl|texture|grow/.test(b) ? 'Texture-aware' : 'Standard',
  }
}
