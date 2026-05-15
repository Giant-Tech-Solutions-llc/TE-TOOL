/**
 * Taper Empire — Motion Foundation
 *
 * Phase 01 of the rollout: a single source of reusable Framer Motion
 * variants. Every future section should consume these instead of declaring
 * one-off motion configs. This keeps the motion language consistent across
 * the product — cinematic, restrained, expensive.
 */

import type { Variants, Transition } from 'framer-motion'

/* ── Easing — the single luxury curve used across the system ───────────── */
export const easeLux: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const easeOutBack: [number, number, number, number] = [0.34, 1.2, 0.64, 1]

/* ── Durations — restrained, expensive ─────────────────────────────────── */
export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.2,
} as const

/* ── Reusable transition presets ───────────────────────────────────────── */
export const tFade:   Transition = { duration: duration.base,      ease: easeLux }
export const tReveal: Transition = { duration: duration.cinematic, ease: easeLux }
export const tSpring: Transition = { type: 'spring', stiffness: 200, damping: 24 }

/* ── Variants — drop-in for motion.div / motion.section ────────────────── */

/** Soft fade — for ambient text, eyebrows, mute reveals */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease: easeLux } },
}

/** Cinematic slide-up — primary content reveal */
export const slideUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easeLux } },
}

/** Scale-in — for emphatic moments (score reveal, hero portrait) */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: duration.cinematic, ease: easeLux } },
}

/** Directional reveal — masked entrance, fashion-campaign style */
export const reveal: Variants = {
  hidden:  { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0 0)', transition: { duration: duration.cinematic, ease: easeLux } },
}

/* ── Stagger containers — for sequential row reveals ───────────────────── */
export const staggerParent = (childDelay = 0.08, delayChildren = 0.05): Variants => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren: childDelay, delayChildren },
  },
})

export const staggerChild: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easeLux } },
}

/* ── Hover primitives — to be consumed via motion.* whileHover ─────────── */
export const hoverLift = { y: -2, transition: { duration: duration.fast, ease: easeLux } }
export const hoverImage = { scale: 1.02, transition: { duration: duration.base, ease: easeLux } }
export const hoverButtonFade = { opacity: 0.92, transition: { duration: duration.fast, ease: easeLux } }

/* ── In-view defaults — reusable IntersectionObserver config ───────────── */
export const inViewOnce = { once: true, margin: '-100px' } as const
export const inViewLoose = { once: true, margin: '-40px' } as const
