'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STATES = [
  { label: 'Analyzing facial structure',         tag: 'STRUCTURE' },
  { label: 'Evaluating taper compatibility',     tag: 'COMPATIBILITY' },
  { label: 'Scoring hairstyle balance',          tag: 'BALANCE' },
  { label: 'Generating barber-ready references', tag: 'REFERENCES' },
  { label: 'Finalizing your grooming profile',   tag: 'PROFILE' },
] as const

interface LoadingViewProps { mode: 'photo' | 'quiz' }

export function LoadingView({ mode }: LoadingViewProps) {
  const [stateIdx, setStateIdx] = useState(0)
  const [progress, setProgress] = useState(2)

  // Long fake-progress curve (max 92% — auth wall can claim 8% later)
  useEffect(() => {
    const DURATION = 38000
    const MAX = 92
    const start = Date.now()
    const tick = setInterval(() => {
      const t = Math.min((Date.now() - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 2.2)
      setProgress(Math.round(2 + eased * (MAX - 2)))
      if (t >= 1) clearInterval(tick)
    }, 400)
    return () => clearInterval(tick)
  }, [])

  // Cycle state messages
  useEffect(() => {
    const cycle = setInterval(() => {
      setStateIdx((p) => (p + 1) % STATES.length)
    }, 3400)
    return () => clearInterval(cycle)
  }, [])

  return (
    <div className="bg-milk text-jet-black min-h-[80vh]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-24 lg:pt-24">

        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-10 mb-12 lg:mb-20">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-8 bg-jet-black" />
              Phase II — Analysis in Progress
            </p>
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,6.5vw,5.5rem)]">
              Building your
              <br />
              <span className="italic font-medium text-mocha">taper plan.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-6">
            <p className="text-xs tracking-[0.18em] uppercase text-mocha mb-2">Source</p>
            <p className="font-display text-xl font-extrabold tracking-tight">
              {mode === 'photo' ? 'Image analysis' : 'Structured profile'}
            </p>
          </div>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-12 gap-10 lg:gap-12 border-t border-jet-black/15 pt-12 lg:pt-16">

          {/* Face mapping aesthetic */}
          <div className="col-span-12 lg:col-span-5">
            <FaceMappingFrame />
          </div>

          {/* Live state list */}
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-6">
              Active processes
            </p>

            <ul className="space-y-0 border-t border-jet-black/15">
              {STATES.map((s, i) => {
                const active = i === stateIdx
                const done = i < stateIdx || (stateIdx === STATES.length - 1 && i === stateIdx && progress >= 88)
                return (
                  <li
                    key={s.tag}
                    className="flex items-center gap-5 lg:gap-8 py-5 border-b border-jet-black/15"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.22em] uppercase tabular-nums text-mocha w-10 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex-1 font-display font-extrabold tracking-[-0.01em] text-lg lg:text-xl leading-snug transition-colors ${
                        active ? 'text-jet-black' : done ? 'text-mocha line-through decoration-[1px] decoration-mocha/40' : 'text-mocha/40'
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="flex-shrink-0">
                      {active && (
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="block w-2 h-2 bg-accent"
                        />
                      )}
                      {done && (
                        <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-mocha">Done</span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>

            {/* Progress meter */}
            <div className="mt-12">
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha">Progress</p>
                <p className="font-display font-extrabold tabular-nums tracking-tight text-3xl lg:text-4xl">
                  {progress}<span className="text-mocha text-lg">%</span>
                </p>
              </div>
              <div className="h-px bg-jet-black/15 relative overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 bg-jet-black"
                  style={{ height: '2px' }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={stateIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 text-sm text-mocha"
                >
                  {STATES[stateIdx].label}…
                </motion.p>
              </AnimatePresence>
              <p className="mt-3 text-xs tracking-[0.18em] uppercase text-mocha">
                Typical duration · 20–40s
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

/* Face mapping frame — animated geometric overlay */
function FaceMappingFrame() {
  return (
    <div className="relative aspect-[4/5] bg-oat/40 border border-jet-black/15 overflow-hidden">
      {/* Corner brackets */}
      <Bracket pos="tl" />
      <Bracket pos="tr" />
      <Bracket pos="bl" />
      <Bracket pos="br" />

      {/* Crosshair center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 200 250"
          className="w-3/4 h-3/4 text-jet-black/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          aria-hidden="true"
        >
          {/* Stylized face oval */}
          <ellipse cx="100" cy="120" rx="60" ry="78" />
          {/* Vertical center */}
          <line x1="100" y1="40" x2="100" y2="200" strokeDasharray="2 3" />
          {/* Horizontal symmetry */}
          <line x1="36" y1="120" x2="164" y2="120" strokeDasharray="2 3" />
          {/* Eye markers */}
          <circle cx="78" cy="105" r="1.5" fill="currentColor" />
          <circle cx="122" cy="105" r="1.5" fill="currentColor" />
          {/* Hairline arc */}
          <path d="M40 80 Q100 50 160 80" />
          {/* Jaw arc */}
          <path d="M50 165 Q100 200 150 165" />
        </svg>
      </div>

      {/* Scan line */}
      <motion.div
        animate={{ y: ['0%', '100%', '0%'] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        style={{ top: 0 }}
      />

      {/* Meta labels */}
      <div className="absolute top-4 left-4 text-[9px] font-semibold tracking-[0.22em] uppercase text-mocha">
        Face Structure Index™
      </div>
      <div className="absolute bottom-4 left-4 text-[9px] font-semibold tracking-[0.22em] uppercase text-mocha">
        Sample · No image stored
      </div>
      <div className="absolute top-4 right-4 text-[9px] font-semibold tracking-[0.22em] uppercase text-mocha">
        Live
      </div>
    </div>
  )
}

function Bracket({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const map = {
    tl: 'top-3 left-3 border-t border-l',
    tr: 'top-3 right-3 border-t border-r',
    bl: 'bottom-3 left-3 border-b border-l',
    br: 'bottom-3 right-3 border-b border-r',
  }
  return <div className={`absolute w-5 h-5 border-jet-black ${map[pos]}`} aria-hidden="true" />
}
