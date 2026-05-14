'use client'

import { motion } from 'framer-motion'

/**
 * Cinematic portrait placeholder — atmospheric silhouette composition with
 * directional lighting, film grain, and a slow subtle pan. Designed to feel
 * like an editorial campaign portrait rather than a UI screenshot.
 *
 * Replace the <svg> silhouette block with a real photograph asset
 * (next/image, fashion-portrait quality) when available — the surrounding
 * lighting/grain treatment remains identical.
 */
export function CinematicPortrait() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface vignette">

      {/* Base — deep tonal gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 60% 30%, #2A2520 0%, #151310 38%, #0A0A0A 100%)',
        }}
      />

      {/* Directional rim light from upper right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-screen opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 78% 22%, rgba(178,150,108,0.45) 0%, transparent 60%)',
        }}
      />

      {/* Subtle ambient floor */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink to-transparent"
      />

      {/* Silhouette — head & shoulders editorial pose */}
      <motion.div
        initial={{ scale: 1.02, y: 0 }}
        animate={{ scale: 1, y: -6 }}
        transition={{ duration: 14, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 flex items-end justify-center"
      >
        <svg
          viewBox="0 0 400 540"
          preserveAspectRatio="xMidYMax meet"
          className="h-[92%] w-auto"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#3F362C" />
              <stop offset="55%" stopColor="#2B2520" />
              <stop offset="100%" stopColor="#181614" />
            </linearGradient>
            <linearGradient id="rim" x1="1" y1="0" x2="0.4" y2="1">
              <stop offset="0%"  stopColor="#B2966C" stopOpacity="0.55" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <radialGradient id="hair" cx="0.5" cy="0.18" r="0.6">
              <stop offset="0%"  stopColor="#23201D" />
              <stop offset="60%" stopColor="#0F0E0D" />
              <stop offset="100%" stopColor="#0A0A0A" />
            </radialGradient>
          </defs>

          {/* Shoulders / torso */}
          <path
            d="M40 540 L40 460 Q120 380 200 376 Q280 380 360 460 L360 540 Z"
            fill="url(#skin)"
          />
          {/* Neck */}
          <path
            d="M168 400 Q168 360 200 358 Q232 360 232 400 Z"
            fill="url(#skin)"
          />
          {/* Jaw / face */}
          <path
            d="M138 285
               Q138 200 200 196
               Q262 200 262 285
               Q262 360 230 388
               Q200 408 170 388
               Q138 360 138 285 Z"
            fill="url(#skin)"
          />
          {/* Hair — taper silhouette */}
          <path
            d="M132 240
               Q126 130 200 116
               Q278 130 268 240
               L260 268
               Q256 200 200 188
               Q144 200 140 268 Z"
            fill="url(#hair)"
          />
          {/* Taper side — short fade */}
          <path
            d="M138 265 Q132 320 152 360 L150 280 Z"
            fill="#0A0A0A"
          />
          <path
            d="M262 265 Q268 320 248 360 L250 280 Z"
            fill="#0A0A0A"
          />
          {/* Subtle rim light on right cheek */}
          <path
            d="M258 240
               Q262 320 232 380
               L228 360
               Q256 310 250 250 Z"
            fill="url(#rim)"
          />
        </svg>
      </motion.div>

      {/* Slow scanning light beam — luxury automotive style */}
      <motion.div
        aria-hidden="true"
        initial={{ y: '-30%', opacity: 0 }}
        animate={{ y: '110%', opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
        className="absolute inset-x-0 h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(143,122,88,0.18) 50%, transparent 100%)',
        }}
      />

      {/* Editorial meta labels */}
      <div className="absolute top-5 left-5 text-[9px] font-medium tracking-[0.32em] uppercase text-soft/55">
        Plate I
      </div>
      <div className="absolute top-5 right-5 text-[9px] font-medium tracking-[0.32em] uppercase text-soft/55">
        Sample subject
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
        <p className="text-[9px] font-medium tracking-[0.32em] uppercase text-soft/55">
          Face Structure Index™
        </p>
        <p className="text-[9px] font-medium tracking-[0.32em] uppercase text-gold/80">
          94 / 100
        </p>
      </div>
    </div>
  )
}
