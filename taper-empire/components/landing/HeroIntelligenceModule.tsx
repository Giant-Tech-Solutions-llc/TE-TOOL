'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { easeLux } from '@/lib/motion'

/**
 * Phase 03 — Interactive Grooming Intelligence Module
 *
 * Replaces the static hero artwork with an auto-cycling 4-stage sequence
 * that visually communicates what the product does without a word of copy:
 *
 *   I.   Subject captured        (cinematic portrait reveals)
 *   II.  Mapping facial structure (landmark dots + jaw arc + symmetry)
 *   III. Evaluating taper geometry (measurements, angles, scoring)
 *   IV.  TaperMatch™ generated     (score reveal, style label, tags)
 *
 * Layers are progressively composited — once a layer enters at its stage,
 * it stays visible through subsequent stages, then everything fades out
 * cleanly when the cycle loops back to Stage I.
 */

const STAGE_MS = 3800
const STAGE_COUNT = 4

const STAGES = [
  { roman: 'I',   label: 'Subject captured',          metric: 'Plate I · Sample'        },
  { roman: 'II',  label: 'Mapping facial structure',  metric: 'Landmarks · 14 / 14'     },
  { roman: 'III', label: 'Evaluating taper geometry', metric: 'Sym 0.94 · Jaw 38°'      },
  { roman: 'IV',  label: 'TaperMatch™ generated',     metric: 'Low Taper · 94 / 100'    },
] as const

export function HeroIntelligenceModule() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStage((s) => (s + 1) % STAGE_COUNT), STAGE_MS)
    return () => clearInterval(t)
  }, [])

  const meta = STAGES[stage]

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-hero bg-ink ring-1 ring-[rgba(255,255,255,0.06)] shadow-luxury">

      {/* Base portrait — real subject, always present.
          Source is 1200px at q94; next/image generates a sharp srcset
          spanning device sizes for retina-crisp delivery. */}
      <div className="absolute inset-0">
        <Image
          src="/hero/subject.webp"
          alt="Subject for facial structure analysis"
          fill
          priority
          quality={95}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"
          placeholder="blur"
          blurDataURL="/hero/subject-blur.webp"
          className="object-cover object-top"
        />
        {/* Soft tonal floor only — vignette removed so the face stays crisp.
            The dark page background already frames the portrait without it. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(7,7,7,0.6) 100%)',
          }}
        />
      </div>

      {/* Layer A — Stage II: face landmarks + jaw/hairline arcs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{ opacity: stage >= 1 && stage < 3 ? 1 : stage === 3 ? 0.4 : 0 }}
        transition={{ duration: 0.65, ease: easeLux }}
      >
        <FaceLandmarksLayer active={stage >= 1} />
      </motion.div>

      {/* Layer B — Stage III: geometry readouts + angle arcs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{ opacity: stage === 2 ? 1 : stage === 3 ? 0.55 : 0 }}
        transition={{ duration: 0.65, ease: easeLux }}
      >
        <GeometryLayer active={stage >= 2} />
      </motion.div>

      {/* Scanning beam — only during mapping/geometry phases */}
      <AnimatePresence>
        {(stage === 1 || stage === 2) && (
          <motion.div
            key="scan"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6, y: ['0%', '100%'] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.4 },
              y: { duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
            }}
            className="absolute inset-x-0 h-40 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(143,122,88,0.28) 50%, transparent 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Layer C — Stage IV: recommendation reveal */}
      <AnimatePresence mode="wait">
        {stage === 3 && <RecommendationLayer key="reveal" />}
      </AnimatePresence>

      {/* ── HUD overlay — stage chips top, label bottom ─────────────── */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Top — stage indicators (sit on a soft tonal scrim so the
            hairlines + roman numeral stay crisp over light hair) */}
        <div className="absolute top-0 inset-x-0 px-5 sm:px-6 pt-5 sm:pt-6 z-10
                        bg-gradient-to-b from-ink/55 via-ink/15 to-transparent">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {STAGES.map((s, i) => {
                const active = stage === i
                const done = stage > i
                return (
                  <motion.span
                    key={s.roman}
                    animate={{
                      width: active ? 32 : 8,
                      opacity: active || done ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.4, ease: easeLux }}
                    className={`h-[2px] rounded-full ${active || done ? 'bg-gold' : 'bg-soft/30'}`}
                  />
                )
              })}
              <span className="ml-3 text-[11px] font-semibold tracking-[0.32em] uppercase text-gold tabular-nums">
                {meta.roman}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.32em] uppercase text-soft/80">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Bottom — stage label + dynamic metric on tonal scrim for readability */}
        <div className="absolute bottom-0 inset-x-0 px-5 sm:px-6 pb-5 sm:pb-6 z-10
                        bg-gradient-to-t from-ink/85 via-ink/40 to-transparent pt-10">
          <div className="flex items-end justify-between gap-3">
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`label-${stage}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: easeLux }}
                  className="text-[11px] sm:text-[12px] font-semibold tracking-[0.32em] uppercase text-soft truncate"
                >
                  {meta.label}
                </motion.p>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`metric-${stage}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: easeLux }}
                className="text-[11px] sm:text-[12px] font-semibold tracking-[0.32em] uppercase text-gold tabular-nums shrink-0"
              >
                {meta.metric}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  LAYER A — Face landmarks
 * ─────────────────────────────────────────────────────────────────────── */
function FaceLandmarksLayer({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 460 600"
      preserveAspectRatio="xMidYMax meet"
      className="absolute inset-x-0 bottom-0 mx-auto h-[96%] w-auto text-gold"
      aria-hidden="true"
    >
      {/* Hairline arc — top of head, mapped to real subject coordinates */}
      <motion.path
        d="M168 163 Q230 88 293 163"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="2 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.9 : 0 }}
        transition={{ duration: 1, ease: easeLux }}
      />
      {/* Jaw arc — bottom contour through chin */}
      <motion.path
        d="M143 388 Q230 470 317 388"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="2 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.9 : 0 }}
        transition={{ duration: 1, ease: easeLux, delay: 0.15 }}
      />

      {/* Landmark dots — repositioned to align with the real subject */}
      {[
        [192, 219, 0.05], [268, 219, 0.10],   // eyes
        [230, 88,  0.15],                      // hairline center
        [168, 163, 0.18], [293, 163, 0.22],    // temples
        [230, 244, 0.28], [230, 306, 0.33],    // nose bridge top + tip
        [205, 406, 0.40], [255, 406, 0.45],    // mouth corners
        [143, 388, 0.50], [317, 388, 0.55],    // jaw corners
        [230, 456, 0.60],                      // chin
        [186, 200, 0.65], [273, 200, 0.70],    // brows
      ].map(([x, y, d], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="2.4"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.4 }}
          transition={{ duration: 0.5, delay: active ? (d as number) : 0, ease: easeLux }}
        />
      ))}
    </svg>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  LAYER B — Geometry analysis (symmetry line, angle arc, readouts)
 * ─────────────────────────────────────────────────────────────────────── */
function GeometryLayer({ active }: { active: boolean }) {
  return (
    <>
      <svg
        viewBox="0 0 460 600"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-x-0 bottom-0 mx-auto h-[96%] w-auto text-gold"
        aria-hidden="true"
      >
        {/* Vertical symmetry axis — through real subject's nose */}
        <motion.line
          x1="230" y1="88" x2="230" y2="470"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.55 : 0 }}
          transition={{ duration: 0.9, ease: easeLux }}
        />

        {/* Horizontal eye line — runs across at real eye y=219 */}
        <motion.line
          x1="130" y1="219" x2="330" y2="219"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.55 : 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeLux }}
        />

        {/* Jaw angle arc — at the left jaw corner */}
        <motion.path
          d="M143 388 Q170 420 200 440"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.95 : 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: easeLux }}
        />

        {/* Width gauge — spans across the cheekbone level */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 0.9 : 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeLux }}
        >
          <line x1="143" y1="290" x2="143" y2="310" stroke="currentColor" strokeWidth="0.6" />
          <line x1="317" y1="290" x2="317" y2="310" stroke="currentColor" strokeWidth="0.6" />
          <line x1="143" y1="300" x2="317" y2="300" stroke="currentColor" strokeWidth="0.4" />
        </motion.g>
      </svg>

      {/* Floating readouts — positioned as percentages so they scale fluidly */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: active ? 1 : 0, x: active ? 0 : -8 }}
        transition={{ duration: 0.5, delay: 0.55, ease: easeLux }}
        className="absolute top-[44%] left-[8%] text-[9px] font-medium tracking-[0.32em] uppercase text-gold tabular-nums"
      >
        Width <span className="text-soft/80">92mm</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: active ? 1 : 0, x: active ? 0 : 8 }}
        transition={{ duration: 0.5, delay: 0.7, ease: easeLux }}
        className="absolute top-[44%] right-[8%] text-[9px] font-medium tracking-[0.32em] uppercase text-gold tabular-nums"
      >
        Sym <span className="text-soft/80">0.94</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
        transition={{ duration: 0.5, delay: 0.85, ease: easeLux }}
        className="absolute bottom-[28%] left-[14%] text-[9px] font-medium tracking-[0.32em] uppercase text-gold tabular-nums"
      >
        Jaw <span className="text-soft/80">38°</span>
      </motion.div>
    </>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  LAYER C — Recommendation reveal
 * ─────────────────────────────────────────────────────────────────────── */
function RecommendationLayer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: easeLux }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Tonal floor — emphasize the readout */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/4"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(7,7,7,0.65) 55%, rgba(7,7,7,0.92) 100%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-16 px-6 sm:px-8 flex flex-col items-center text-center z-10">

        {/* TaperMatch™ score — oversized cinematic numeric */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeLux }}
          className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold mb-3"
        >
          TaperMatch™ Score
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: easeLux }}
          className="font-display font-extrabold leading-[0.85] tracking-[-0.05em] text-soft"
        >
          <CountUp from={0} to={94} duration={1.4} className="text-[clamp(4.5rem,12vw,7rem)]" />
          <span className="text-mute text-3xl ml-1">%</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: easeLux }}
          className="mt-4 font-display font-extrabold text-soft tracking-[-0.02em] text-2xl sm:text-3xl"
        >
          Low Taper Fade
        </motion.p>

        {/* Tag pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: easeLux }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          {['Professional', 'Beard compatible', 'Low maintenance'].map((t) => (
            <span
              key={t}
              className="text-[9px] font-medium tracking-[0.28em] uppercase border border-[rgba(255,255,255,0.16)] text-soft/85 px-3 py-1 rounded-pill bg-[rgba(255,255,255,0.04)]"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  CountUp — animated numeric reveal (cinematic 0→target)
 * ─────────────────────────────────────────────────────────────────────── */
function CountUp({
  from, to, duration = 1.2, className,
}: { from: number; to: number; duration?: number; className?: string }) {
  const [value, setValue] = useState(from)

  useEffect(() => {
    const start = performance.now()
    const DURATION = duration * 1000
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [from, to, duration])

  return <span className={`tabular-nums ${className ?? ''}`}>{value}</span>
}
