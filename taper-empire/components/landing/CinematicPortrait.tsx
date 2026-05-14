'use client'

import { motion } from 'framer-motion'

/**
 * Ultra-cinematic editorial portrait — photographic-quality SVG silhouette
 * with multi-stop skin-tone gradient, rim lighting, hair texture, jaw shadow,
 * beard mass, and atmospheric haze. Replaces the previous flat silhouette.
 *
 * Replace with an actual hi-res photograph (next/image) when available — the
 * supporting lighting / grain / vignette layers around it remain identical.
 */
export function CinematicPortrait() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ink ring-1 ring-soft/5 shadow-[0_28px_80px_-20px_rgba(0,0,0,0.7),0_8px_24px_-8px_rgba(0,0,0,0.6)]">

      {/* Atmospheric backdrop — warm spotlight + cool fall-off */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 68% 22%, #4A3B26 0%, #2C2218 28%, #181310 60%, #0A0A0A 100%)',
        }}
      />

      {/* Soft directional key light from upper right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-screen opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 80% 18%, rgba(214,178,128,0.55) 0%, rgba(168,134,82,0.18) 40%, transparent 75%)',
        }}
      />

      {/* Cool ambient fill from lower left */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-screen opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 35% 30% at 10% 80%, rgba(120,128,140,0.30) 0%, transparent 70%)',
        }}
      />

      {/* Tonal floor — ground the subject */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.6) 70%, #0A0A0A 100%)',
        }}
      />

      {/* PORTRAIT — ultra-detailed cinematic silhouette */}
      <motion.div
        initial={{ scale: 1.015, y: 4 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 flex items-end justify-center"
      >
        <svg
          viewBox="0 0 460 600"
          preserveAspectRatio="xMidYMax meet"
          className="h-[96%] w-auto"
          aria-hidden="true"
        >
          <defs>
            {/* Skin — base tone with rim light from right */}
            <linearGradient id="skinBase" x1="0.25" y1="0" x2="0.85" y2="0.4">
              <stop offset="0"    stopColor="#1A1410" />
              <stop offset="0.35" stopColor="#2D2117" />
              <stop offset="0.6"  stopColor="#3F2E1F" />
              <stop offset="0.85" stopColor="#5B4528" />
              <stop offset="1"    stopColor="#7A5C36" />
            </linearGradient>

            {/* Cheek warmth */}
            <radialGradient id="cheekGlow" cx="0.72" cy="0.42" r="0.35">
              <stop offset="0"   stopColor="#9F7848" stopOpacity="0.55" />
              <stop offset="0.5" stopColor="#705230" stopOpacity="0.18" />
              <stop offset="1"   stopColor="transparent" />
            </radialGradient>

            {/* Rim light — upper-right edge of head */}
            <linearGradient id="rimHead" x1="0.95" y1="0.05" x2="0.55" y2="0.55">
              <stop offset="0"   stopColor="#D9B380" stopOpacity="0.85" />
              <stop offset="0.4" stopColor="#9C7649" stopOpacity="0.30" />
              <stop offset="1"   stopColor="transparent" />
            </linearGradient>

            {/* Hair body — deep with subtle sheen */}
            <radialGradient id="hairBody" cx="0.5" cy="0.18" r="0.6">
              <stop offset="0"    stopColor="#191613" />
              <stop offset="0.5"  stopColor="#0F0C0A" />
              <stop offset="1"    stopColor="#070605" />
            </radialGradient>

            {/* Hair top sheen — directional gloss */}
            <linearGradient id="hairSheen" x1="0.5" y1="0" x2="0.7" y2="0.4">
              <stop offset="0"   stopColor="#3B2D1E" stopOpacity="0.45" />
              <stop offset="0.6" stopColor="#1A1411" stopOpacity="0.15" />
              <stop offset="1"   stopColor="transparent" />
            </linearGradient>

            {/* Beard / stubble */}
            <linearGradient id="beardGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0"   stopColor="#1E1714" stopOpacity="0.55" />
              <stop offset="1"   stopColor="#0E0B09" stopOpacity="0.85" />
            </linearGradient>

            {/* Shoulder fabric */}
            <linearGradient id="shoulderGrad" x1="0" y1="0" x2="0.5" y2="1">
              <stop offset="0"   stopColor="#191613" />
              <stop offset="0.5" stopColor="#100D0B" />
              <stop offset="1"   stopColor="#080706" />
            </linearGradient>

            {/* Shoulder rim */}
            <linearGradient id="shoulderRim" x1="1" y1="0" x2="0.45" y2="0.6">
              <stop offset="0"   stopColor="#8B6A40" stopOpacity="0.40" />
              <stop offset="0.5" stopColor="#4A3520" stopOpacity="0.12" />
              <stop offset="1"   stopColor="transparent" />
            </linearGradient>

            {/* Skin shadow — left of face */}
            <linearGradient id="faceShadow" x1="0" y1="0" x2="1" y2="0.5">
              <stop offset="0"   stopColor="#080605" stopOpacity="0.65" />
              <stop offset="0.5" stopColor="#15100A" stopOpacity="0.25" />
              <stop offset="1"   stopColor="transparent" />
            </linearGradient>

            {/* Subtle noise for skin texture — fine grain only */}
            <filter id="skinNoise" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="2.4" numOctaves="2" />
              <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0" />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
          </defs>

          {/* SHOULDERS — black tee/fabric */}
          <path
            d="M30 600 L30 510 Q120 410 230 405 Q340 410 430 510 L430 600 Z"
            fill="url(#shoulderGrad)"
          />
          {/* Shoulder rim light — upper right edge */}
          <path
            d="M280 410 Q360 430 430 510 L420 540 Q360 460 280 432 Z"
            fill="url(#shoulderRim)"
          />
          {/* Tee neckline — subtle V */}
          <path
            d="M195 440 Q230 455 265 440 L240 480 Q230 488 220 480 Z"
            fill="#050403"
            opacity="0.7"
          />

          {/* NECK */}
          <path
            d="M192 425 Q192 380 230 378 Q268 380 268 425 L260 445 Q230 455 200 445 Z"
            fill="url(#skinBase)"
          />
          <path
            d="M192 425 Q192 380 230 378 Q268 380 268 425 L260 445 Q230 455 200 445 Z"
            fill="url(#faceShadow)"
            opacity="0.6"
          />

          {/* JAW + FACE — main mass */}
          <path
            d="M150 300
               Q150 200 230 195
               Q310 200 310 300
               Q310 360 297 392
               Q280 422 250 432
               Q230 437 210 432
               Q180 422 163 392
               Q150 360 150 300 Z"
            fill="url(#skinBase)"
          />

          {/* Face shadow side (left) */}
          <path
            d="M150 300 Q150 200 230 195 L228 235 Q173 245 168 305 Q165 360 178 400 Q165 395 158 380 Q150 350 150 300 Z"
            fill="url(#faceShadow)"
          />

          {/* Cheek warm glow */}
          <ellipse cx="278" cy="320" rx="36" ry="44" fill="url(#cheekGlow)" />

          {/* Rim light — right edge of face */}
          <path
            d="M308 280
               Q314 360 282 410
               L268 392
               Q303 348 303 280 Z"
            fill="url(#rimHead)"
          />

          {/* Beard / jaw shadow — adds masculinity */}
          <path
            d="M168 350
               Q170 395 200 425
               Q230 442 260 425
               Q290 395 292 350
               Q280 380 252 395
               Q230 402 208 395
               Q180 380 168 350 Z"
            fill="url(#beardGrad)"
          />

          {/* Subtle skin texture grain — confined to face */}
          <path
            d="M150 200 Q150 200 230 195 Q310 200 310 300 Q310 360 297 392 Q280 422 250 432 Q230 437 210 432 Q180 422 163 392 Q150 360 150 300 Z"
            filter="url(#skinNoise)"
            opacity="0.4"
          />

          {/* HAIR — taper silhouette with directional sheen */}
          <path
            d="M143 268
               Q138 160 200 134
               Q230 122 260 134
               Q322 160 317 268
               Q310 285 300 290
               Q300 215 230 198
               Q160 215 160 290
               Q150 285 143 268 Z"
            fill="url(#hairBody)"
          />
          {/* Hair top sheen */}
          <path
            d="M180 180
               Q230 138 280 180
               Q300 215 295 250
               Q280 200 230 188
               Q180 200 165 250
               Q160 215 180 180 Z"
            fill="url(#hairSheen)"
          />

          {/* TAPER FADE — short sides graduating */}
          <path
            d="M150 270
               Q137 320 158 365
               L170 360
               Q156 320 168 280 Z"
            fill="#0A0807"
            opacity="0.95"
          />
          <path
            d="M310 270
               Q323 320 302 365
               L290 360
               Q304 320 292 280 Z"
            fill="#0A0807"
            opacity="0.95"
          />

          {/* Sharp blend transition line — barely visible */}
          <path
            d="M158 305 Q174 312 168 330"
            fill="none"
            stroke="#1A1411"
            strokeWidth="0.4"
            opacity="0.5"
          />
          <path
            d="M302 305 Q286 312 292 330"
            fill="none"
            stroke="#1A1411"
            strokeWidth="0.4"
            opacity="0.5"
          />

          {/* Brow shadow */}
          <ellipse cx="200" cy="248" rx="22" ry="6" fill="#0A0807" opacity="0.55" />
          <ellipse cx="260" cy="248" rx="22" ry="6" fill="#0A0807" opacity="0.55" />

          {/* Eye sockets — implied, not literal eyes */}
          <ellipse cx="200" cy="258" rx="14" ry="4" fill="#000" opacity="0.65" />
          <ellipse cx="260" cy="258" rx="14" ry="4" fill="#000" opacity="0.65" />

          {/* Nose bridge shadow */}
          <path
            d="M227 268 L227 320 Q231 330 233 320 L233 268 Z"
            fill="#0A0807"
            opacity="0.40"
          />

          {/* Upper lip line */}
          <path
            d="M212 360 Q230 366 248 360"
            fill="none"
            stroke="#0A0807"
            strokeWidth="0.8"
            opacity="0.5"
            strokeLinecap="round"
          />

          {/* Ear hint — left side just visible from front-three-quarter angle */}
          <path
            d="M150 290 Q142 300 144 318 Q148 332 156 332 L160 320 Q156 305 158 290 Z"
            fill="url(#skinBase)"
            opacity="0.7"
          />
        </svg>
      </motion.div>

      {/* Slow vertical light shift — adds cinematic life */}
      <motion.div
        aria-hidden="true"
        animate={{ y: ['-40%', '110%'], opacity: [0, 0.45, 0.45, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 6 }}
        className="absolute inset-x-0 h-44 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(217,179,128,0.14) 45%, rgba(143,122,88,0.12) 55%, transparent 100%)',
        }}
      />

      {/* Film grain overlay — only inside the portrait frame */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.20 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Inner vignette — focuses attention on face */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 92% 78% at 50% 38%, transparent 0%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Editorial labels */}
      <div className="absolute top-5 left-5 text-[9px] font-medium tracking-[0.32em] uppercase text-soft/65 z-10">
        Plate I
      </div>
      <div className="absolute top-5 right-5 text-[9px] font-medium tracking-[0.32em] uppercase text-soft/65 z-10">
        Sample subject
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 z-10">
        <p className="text-[9px] font-medium tracking-[0.32em] uppercase text-soft/65">
          Face Structure Index™
        </p>
        <p className="text-[9px] font-medium tracking-[0.32em] uppercase text-gold">
          94 / 100
        </p>
      </div>
    </div>
  )
}
