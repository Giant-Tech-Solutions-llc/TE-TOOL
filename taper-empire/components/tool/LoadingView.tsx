'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useToolStore } from '@/store/useToolStore'

const STATES = [
  { label: 'Mapping facial proportions',     tag: 'PROPORTIONS' },
  { label: 'Evaluating taper geometry',      tag: 'GEOMETRY' },
  { label: 'Measuring silhouette balance',   tag: 'SILHOUETTE' },
  { label: 'Calculating maintenance profile',tag: 'MAINTENANCE' },
  { label: 'Finalizing style compatibility', tag: 'COMPATIBILITY' },
] as const

interface LoadingViewProps { mode: 'photo' | 'quiz' }

export function LoadingView({ mode }: LoadingViewProps) {
  const { inputData } = useToolStore()
  const [stateIdx, setStateIdx] = useState(0)
  const [progress, setProgress] = useState(2)

  // Pull the user's uploaded photo (if any) out of the store. ToolFlow
  // dispatches photo input as { type: 'photo', data: { photo: dataUrl, ... } }
  // — we never persist it server-side, we just render the same data URL
  // in the scanner panel so the user sees their own face being analyzed.
  const photoSrc =
    inputData?.type === 'photo' && typeof (inputData.data as any)?.photo === 'string'
      ? ((inputData.data as any).photo as string)
      : null

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
            <FaceLandmarks photoSrc={photoSrc} />
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

function FaceLandmarks({ photoSrc }: { photoSrc?: string | null }) {
  return (
    <div className="relative aspect-square bg-ink overflow-hidden grain rounded-3xl border border-line">
      {/* Subject portrait — if the user uploaded a photo we render that
          directly (data URL via a plain <img>; next/image rejects raw
          data: URLs in production). Otherwise fall back to the Phase II
          scanner reference plate so the panel still reads correctly when
          the flow is the Quick Quiz. */}
      {photoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoSrc}
          alt="Your uploaded photo — facial proportion analysis"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <Image
          src="/scanner/subject.webp"
          alt="Subject portrait — facial proportion analysis"
          fill
          priority
          quality={94}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 600px"
          placeholder="blur"
          blurDataURL="/scanner/subject-blur.webp"
          className="object-cover object-center"
        />
      )}

      {/* Subtle tonal floor to keep meta-labels legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,7,7,0.55) 0%, rgba(7,7,7,0.05) 22%, rgba(7,7,7,0.05) 78%, rgba(7,7,7,0.75) 100%)',
        }}
      />

      {/* Scanner SVG overlay — face geometry + landmark dots + scanning
          beam. Coordinates match the brand reference (viewBox 0 0 1000 1000). */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full text-gold pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          {/* Horizontal scanning beam — gold gradient with bright center */}
          <linearGradient id="scan-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"    stopColor="#C27D0E" stopOpacity="0"   />
            <stop offset="0.30" stopColor="#C27D0E" stopOpacity="0.85"/>
            <stop offset="0.50" stopColor="#FFFFFF" stopOpacity="1"   />
            <stop offset="0.70" stopColor="#C27D0E" stopOpacity="0.85"/>
            <stop offset="1"    stopColor="#C27D0E" stopOpacity="0"   />
          </linearGradient>
          <radialGradient id="scan-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0"   stopColor="#FFE9B8" stopOpacity="0.95" />
            <stop offset="0.4" stopColor="#C27D0E" stopOpacity="0.55" />
            <stop offset="1"   stopColor="#C27D0E" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* Vertical center line */}
        <line
          x1="500" y1="60" x2="500" y2="940"
          stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.45"
        />

        {/* Face oval (dashed gold outline) — sized to the portrait crop */}
        <ellipse
          cx="500" cy="540" rx="240" ry="290"
          fill="none" stroke="currentColor" strokeWidth="1.2"
          strokeDasharray="5 4" opacity="0.85"
        />

        {/* Landmark dots — eyes / brows / nose / mouth / jaw / chin / temple */}
        <g fill="currentColor">
          {[
            // eyes
            [432, 470, 0.0], [568, 470, 0.15],
            // brows
            [432, 440, 0.25], [568, 440, 0.30],
            // temples
            [330, 470, 0.35], [670, 470, 0.40],
            // cheekbones
            [380, 560, 0.45], [620, 560, 0.50],
            // nose bridge + tip
            [500, 510, 0.55], [500, 590, 0.60],
            // mouth corners + center
            [460, 670, 0.65], [540, 670, 0.70], [500, 670, 0.75],
            // jaw line
            [380, 720, 0.80], [620, 720, 0.85],
            // chin
            [500, 800, 0.90],
            // hairline crown
            [500, 280, 0.95],
          ].map(([x, y, d]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5">
              <animate
                attributeName="opacity"
                values="0.25;1;0.25"
                dur="2.6s"
                begin={`${d as number}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Edge tick clusters — the small 5-dot column on either side from
            the brand SVG. Acts as a visual scale reference. */}
        <g fill="currentColor">
          {[480, 510, 540, 570, 600].map((y, i) => (
            <circle key={`L${i}`} cx="50" cy={y} r="3" opacity="0.7" />
          ))}
          {[480, 510, 540, 570, 600].map((y, i) => (
            <circle key={`R${i}`} cx="950" cy={y} r="3" opacity="0.7" />
          ))}
        </g>

        {/* Horizontal scanning beam — animates up and down across the face,
            crossing the eye line at peak brightness. */}
        <motion.g
          animate={{ y: [-220, 220, -220] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Beam line */}
          <rect x="20" y="538" width="960" height="3" fill="url(#scan-beam)" />
          {/* Central glow */}
          <circle cx="500" cy="540" r="60" fill="url(#scan-glow)" />
          {/* Edge tick marks */}
          <line x1="30"  y1="540" x2="80"  y2="540" stroke="currentColor" strokeWidth="1.5" />
          <line x1="920" y1="540" x2="970" y2="540" stroke="currentColor" strokeWidth="1.5" />
        </motion.g>

        {/* Top-left scanner bracket icon */}
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.9"
          transform="translate(40, 50)"
        >
          <path d="M0 14 L0 0 L14 0" />
          <path d="M40 0 L54 0 L54 14" />
          <path d="M54 40 L54 54 L40 54" />
          <path d="M14 54 L0 54 L0 40" />
          <circle cx="27" cy="27" r="4" fill="currentColor" />
        </g>
      </svg>

      {/* Top-left scanner label */}
      <div className="absolute top-5 left-5 max-w-[60%]">
        <p className="text-[9px] font-semibold tracking-[0.32em] uppercase text-gold mb-3 mt-[80px]">
          Scanning
        </p>
        <p className="text-[12px] font-semibold tracking-[0.24em] uppercase text-soft leading-[1.4]">
          Analyzing facial
          <br />
          proportions
        </p>
        <span aria-hidden="true" className="mt-3 block h-px w-14 bg-gold/70" />
      </div>

      {/* Top-right live indicator */}
      <div className="absolute top-5 right-5 inline-flex items-center gap-2 text-[9px] font-semibold tracking-[0.32em] uppercase text-gold">
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="inline-block w-1.5 h-1.5 rounded-full bg-gold"
        />
        Live
      </div>

      {/* Bottom meta strip */}
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-[9px] font-semibold tracking-[0.32em] uppercase">
        <span className="text-soft/85">Geometry · Live trace</span>
        <span className="text-mute">No image stored</span>
      </div>
    </div>
  )
}
