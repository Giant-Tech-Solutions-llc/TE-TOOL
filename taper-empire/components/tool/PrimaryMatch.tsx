'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2, Loader2 } from 'lucide-react'
import type { Recommendation } from '@/types'
import { easeLux } from '@/lib/motion'

/**
 * Phase 06 — Primary Match (immersive premium product experience)
 *
 * Replaces the prior side-by-side card with a fullscreen-feeling editorial
 * split: a cinematic hairstyle plate on the left (clickable to a
 * fullscreen lightbox) and an analysis panel on the right with a
 * cinematic score ring, expanded grooming analysis grid, maintenance
 * cadence timeline, and a barber-ready brief — every section consuming
 * the Phase 01 design tokens for consistency with the landing showcase.
 */

interface Props {
  rec: Recommendation
  imageLoading: boolean
}

export function PrimaryMatch({ rec, imageLoading }: Props) {
  const [lightbox, setLightbox] = useState(false)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  useEffect(() => {
    const target = rec.match_score
    const start = performance.now()
    const DURATION = 1500
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
  const maintenance = inferMaintenanceIntensity(rec)

  return (
    <article className="relative bg-ink text-soft border border-line rounded-hero overflow-hidden shadow-luxury">
      <div className="grid grid-cols-12 gap-0 items-stretch">

        {/* LEFT — large cinematic image */}
        <div className="col-span-12 lg:col-span-7 relative aspect-[4/5] lg:aspect-auto bg-surface overflow-hidden group">
          {imageLoading && !rec.image_url ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-9 h-9 mx-auto mb-4 text-gold animate-spin" />
                <p className="type-eyebrow text-mute">Rendering preview</p>
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
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(7,7,7,0.65) 100%)' }}
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

          {/* Top-left chip */}
          <div className="absolute top-5 left-5 bg-gold text-ink px-3 py-1.5 rounded-pill type-eyebrow shadow-[0_4px_14px_rgba(0,0,0,0.5)] z-10">
            Primary Match
          </div>

          {/* Bottom-left overlay style name */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 z-10">
            <p className="font-display font-extrabold tracking-[-0.025em] text-2xl lg:text-3xl text-soft leading-tight">
              {rec.style_name}
            </p>
            <p className="type-eyebrow text-soft/70">Plate · Your Result</p>
          </div>
        </div>

        {/* RIGHT — analysis panel */}
        <div className="col-span-12 lg:col-span-5 p-8 lg:p-10 xl:p-12 flex flex-col bg-ink">

          {/* Cinematic score ring + numeric */}
          <div className="flex items-start gap-6 mb-8">
            <ScoreRing target={rec.match_score} current={scoreDisplay} />
            <div className="flex-1 min-w-0">
              <p className="type-eyebrow text-gold mb-3 flex items-center gap-3">
                <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
                TaperMatch™ Score
              </p>
              <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(1.75rem,3vw,2.5rem)]">
                {rec.style_name}
              </h2>
            </div>
          </div>

          {/* Style-fit tag pills */}
          {labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-7 pb-7 border-b border-line">
              {labels.map((l) => (
                <span
                  key={l}
                  className="text-[9px] font-semibold tracking-[0.28em] uppercase border border-line text-soft/85 px-3 py-1.5 rounded-pill bg-surface/40"
                >
                  {l}
                </span>
              ))}
            </div>
          )}

          {/* Face Structure Analysis */}
          <section className="mb-7 pb-7 border-b border-line">
            <p className="type-eyebrow text-gold mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
              Face Structure Analysis
            </p>
            <p className="text-base text-soft/85 leading-[1.75]">{rec.why_it_works}</p>
          </section>

          {/* Compatibility Breakdown — 6-attribute grid */}
          <section className="mb-7 pb-7 border-b border-line">
            <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
              Compatibility Breakdown
            </p>
            <dl className="grid grid-cols-2 gap-y-5 gap-x-6">
              {[
                ['Face structure',     heuristics.face],
                ['Maintenance',        heuristics.maintenance],
                ['Styling difficulty', heuristics.styling],
                ['Beard compatibility',heuristics.beard],
                ['Professionalism',    heuristics.professionalism],
                ['Growth pattern',     heuristics.growth],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <dt className="text-[10px] tracking-[0.32em] uppercase text-mute mb-1.5">{k}</dt>
                  <dd className="font-display text-base lg:text-lg font-extrabold text-soft tracking-tight leading-tight">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Maintenance Cadence — 3-window timeline */}
          <section className="mb-7 pb-7 border-b border-line">
            <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
              Maintenance Cadence
            </p>
            <MaintenanceTimeline intensity={maintenance} maintenance={rec.maintenance} />
          </section>

          {/* Barber-Ready Brief */}
          <section>
            <p className="type-eyebrow text-gold mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
              Barber-Ready Brief
            </p>
            <figure className="rounded-lg-x border-l-2 border-gold bg-surface/40 px-6 py-5">
              <blockquote className="text-base text-soft/85 leading-[1.75] italic">
                {rec.barber_instructions}
              </blockquote>
              <figcaption className="mt-3 type-eyebrow text-mute">
                Verbatim brief · ready to read aloud
              </figcaption>
            </figure>
          </section>
        </div>
      </div>

      {/* ── Fullscreen lightbox ─────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && rec.image_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeLux }}
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
              transition={{ duration: 0.5, ease: easeLux }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[min(94vh,94vw)] aspect-square rounded-hero overflow-hidden"
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
                  <p className="type-eyebrow text-mute mb-2">
                    {rec.match_score}% TaperMatch™
                  </p>
                  <p className="font-display text-3xl font-extrabold tracking-[-0.02em]">{rec.style_name}</p>
                </div>
                <p className="type-eyebrow text-mute">taperempire.com</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  ScoreRing — cinematic circular reveal around the match score numeric
 * ─────────────────────────────────────────────────────────────────────── */
function ScoreRing({ target, current }: { target: number; current: number }) {
  const R = 56                  // radius
  const C = 2 * Math.PI * R     // circumference
  const progress = current / 100
  const dashOffset = C * (1 - progress)

  return (
    <div className="relative shrink-0 w-[148px] h-[148px]">
      <svg width="148" height="148" viewBox="0 0 148 148" className="absolute inset-0 -rotate-90">
        {/* Track */}
        <circle
          cx="74" cy="74" r={R}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="3"
        />
        {/* Progress arc */}
        <circle
          cx="74" cy="74" r={R}
          fill="none"
          stroke="#8F7A58"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-display font-extrabold tabular-nums tracking-[-0.04em] leading-none text-[clamp(2.5rem,4.5vw,3.25rem)]">
          {current}<span className="text-mute text-base align-top ml-0.5">%</span>
        </p>
        <p className="type-eyebrow text-mute mt-1.5">Match</p>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  MaintenanceTimeline — 3-window cadence with active-state dots
 * ─────────────────────────────────────────────────────────────────────── */
function MaintenanceTimeline({ intensity, maintenance }: { intensity: 1 | 2 | 3; maintenance: string }) {
  const windows = [
    { range: 'Day 0–3',   title: 'Lock the shape',  active: true,           },
    { range: 'Day 7–14',  title: 'Edge cleanup',    active: intensity >= 2  },
    { range: 'Day 21–30', title: 'Full reset',      active: intensity >= 1  },
  ]

  return (
    <>
      <div className="relative pt-2">
        <div className="absolute left-3 right-3 top-[14px] h-px bg-line" />
        <div className="grid grid-cols-3 gap-3">
          {windows.map((w) => (
            <div key={w.range} className="relative flex flex-col items-start">
              <span
                className={`relative z-10 w-2.5 h-2.5 rounded-full ring-4 ring-ink mb-3 ${
                  w.active ? 'bg-gold' : 'bg-line'
                }`}
                aria-hidden="true"
              />
              <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-mute mb-1">
                {w.range}
              </p>
              <p className={`font-display text-sm font-extrabold tracking-tight leading-tight ${
                w.active ? 'text-soft' : 'text-soft/40'
              }`}>
                {w.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-sm text-soft/65 leading-[1.75]">{maintenance}</p>
    </>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  Heuristics — derive analysis attributes from the recommendation text
 * ─────────────────────────────────────────────────────────────────────── */
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

function inferMaintenanceIntensity(rec: Recommendation): 1 | 2 | 3 {
  const m = rec.maintenance.toLowerCase()
  if (/high|weekly/.test(m)) return 3
  if (/low|minimal/.test(m)) return 1
  return 2
}

function computeHeuristics(rec: Recommendation) {
  const m = rec.maintenance.toLowerCase()
  const b = rec.barber_instructions.toLowerCase()
  const w = rec.why_it_works.toLowerCase()
  return {
    face: /round|oval|square|diamond|heart/.exec(w)?.[0]?.replace(/^./, c => c.toUpperCase()) || 'Balanced',
    maintenance: /low|minimal/.test(m) ? 'Low effort' : /high|weekly/.test(m) ? 'High effort' : 'Medium',
    styling: /textur|pomade|clay|product/.test(b) ? 'Moderate' : /scissor|sharp|defin/.test(b) ? 'Refined' : 'Easy',
    beard: /beard|stubble/.test(b) ? 'Strong' : 'Compatible',
    professionalism: /professional|office|formal/.test(w) ? 'High' : 'Versatile',
    growth: /coily|curl|texture|grow/.test(b) ? 'Texture-aware' : 'Standard',
  }
}
