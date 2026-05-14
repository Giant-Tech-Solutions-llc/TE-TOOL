'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STATES = [
  { label: 'Mapping facial proportions',     tag: 'PROPORTIONS' },
  { label: 'Evaluating taper geometry',      tag: 'GEOMETRY' },
  { label: 'Measuring silhouette balance',   tag: 'SILHOUETTE' },
  { label: 'Calculating maintenance profile',tag: 'MAINTENANCE' },
  { label: 'Finalizing style compatibility', tag: 'COMPATIBILITY' },
] as const

interface LoadingViewProps { mode: 'photo' | 'quiz' }

export function LoadingView({ mode }: LoadingViewProps) {
  const [stateIdx, setStateIdx] = useState(0)
  const [progress, setProgress] = useState(2)

  useEffect(() => {
    const DURATION = 38000, MAX = 92
    const start = Date.now()
    const tick = setInterval(() => {
      const t = Math.min((Date.now() - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 2.2)
      setProgress(Math.round(2 + eased * (MAX - 2)))
      if (t >= 1) clearInterval(tick)
    }, 400)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    const cycle = setInterval(() => setStateIdx((p) => (p + 1) % STATES.length), 3600)
    return () => clearInterval(cycle)
  }, [])

  return (
    <div className="relative bg-ink text-soft min-h-screen pt-32 lg:pt-40 pb-24 grain-soft">
      <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12 mb-16 lg:mb-24">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-6 flex items-center gap-4">
              <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
              Phase II — Analysis in Progress
            </p>
            <h2 className="font-display font-extrabold tracking-[-0.04em] leading-[0.92] text-[clamp(2.5rem,7vw,6rem)]">
              Building your
              <br />
              <span className="italic font-medium text-mute">grooming profile.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-3">
            <p className="text-[10px] tracking-[0.32em] uppercase text-mute mb-3">Source</p>
            <p className="font-display text-xl lg:text-2xl font-extrabold tracking-tight">
              {mode === 'photo' ? 'Image analysis' : 'Structured profile'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 border-t border-line pt-12 lg:pt-16">

          <div className="col-span-12 lg:col-span-6">
            <FaceLandmarks />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold mb-8">
              Live processes
            </p>

            <ul className="border-t border-line">
              {STATES.map((s, i) => {
                const active = i === stateIdx
                const done = i < stateIdx
                return (
                  <li key={s.tag} className="flex items-center gap-6 py-5 border-b border-line">
                    <span className="text-[10px] font-medium tracking-[0.32em] uppercase tabular-nums text-mute w-12 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex-1 font-display font-extrabold tracking-[-0.015em] text-lg lg:text-xl leading-snug transition-colors ${
                        active ? 'text-soft' : done ? 'text-soft/40 line-through decoration-soft/20' : 'text-soft/30'
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="flex-shrink-0 w-16 text-right">
                      {active && (
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="inline-block w-2 h-2 bg-gold"
                        />
                      )}
                      {done && (
                        <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-mute">Done</span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>

            <div className="mt-14">
              <div className="flex items-baseline justify-between mb-5">
                <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-mute">Progress</p>
                <p className="font-display font-extrabold tabular-nums tracking-[-0.025em] text-4xl lg:text-5xl">
                  {progress}<span className="text-mute text-xl">%</span>
                </p>
              </div>
              <div className="h-px bg-line relative">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-0 left-0 bg-gold"
                  style={{ height: '1px' }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={stateIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 text-sm text-soft/70"
                >
                  {STATES[stateIdx].label}…
                </motion.p>
              </AnimatePresence>
              <p className="mt-3 text-[10px] tracking-[0.32em] uppercase text-mute">
                Typical duration · 20–40s
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FaceLandmarks() {
  return (
    <div className="relative aspect-[4/5] bg-surface overflow-hidden grain rounded-3xl">
      {/* Tonal base */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 60% 30%, #232017 0%, #14110E 50%, #0A0A0A 100%)' }}
      />

      {/* Corner brackets */}
      <Bracket pos="tl" /><Bracket pos="tr" /><Bracket pos="bl" /><Bracket pos="br" />

      {/* Face structural overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 200 250"
          className="w-3/4 h-3/4 text-gold/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          aria-hidden="true"
        >
          <ellipse cx="100" cy="120" rx="60" ry="78" />
          <line x1="100" y1="40" x2="100" y2="200" strokeDasharray="2 3" />
          <line x1="36" y1="120" x2="164" y2="120" strokeDasharray="2 3" />
          {/* Eye markers */}
          <circle cx="78" cy="105" r="2" fill="currentColor">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="122" cy="105" r="2" fill="currentColor">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="135" r="1.5" fill="currentColor">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="160" r="1.5" fill="currentColor">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
          </circle>
          {/* Hairline arc */}
          <path d="M40 80 Q100 50 160 80" />
          {/* Jaw arc */}
          <path d="M50 165 Q100 200 150 165" />
          {/* Brow line */}
          <path d="M60 95 Q100 88 140 95" />
        </svg>
      </div>

      {/* Scanning beam */}
      <motion.div
        aria-hidden="true"
        animate={{ y: ['0%', '100%', '0%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(143,122,88,0.20) 50%, transparent 100%)',
        }}
      />

      {/* Meta labels */}
      <div className="absolute top-5 left-5 text-[9px] font-medium tracking-[0.32em] uppercase text-soft/70">
        Face Structure Index™
      </div>
      <div className="absolute top-5 right-5 text-[9px] font-medium tracking-[0.32em] uppercase text-gold">
        Live
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-[9px] font-medium tracking-[0.32em] uppercase">
        <span className="text-mute">Geometry · Live trace</span>
        <span className="text-soft/70">No image stored</span>
      </div>
    </div>
  )
}

function Bracket({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const map = {
    tl: 'top-4 left-4 border-t border-l rounded-tl-xl',
    tr: 'top-4 right-4 border-t border-r rounded-tr-xl',
    bl: 'bottom-4 left-4 border-b border-l rounded-bl-xl',
    br: 'bottom-4 right-4 border-b border-r rounded-br-xl',
  }
  return <div className={`absolute w-6 h-6 border-gold/60 ${map[pos]}`} aria-hidden="true" />
}
