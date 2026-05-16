'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'framer-motion'
import { Cinematic, SectionEyebrow } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { easeLux } from '@/lib/motion'

/**
 * Phase 04 — Methodology Storytelling Sequence
 *
 * Replaces the prior 3-card vertical stack with a horizontal interactive
 * sequence (Step 01 Face Structure Read™ / Step 02 Taper Geometry Scored™
 * / Step 03 Profile Generated™). Scroll-triggered progression highlights
 * each step as the user moves through the section, establishing the
 * interaction rhythm referenced in the strategy.
 *
 * The 'How It Works' file remains as a thin wrapper so existing imports
 * keep working; this component carries all of the new behavior.
 */

const STEPS = [
  {
    num: '01',
    branded: 'Face Structure Read™',
    title: 'We read your face.',
    body: 'A structural read of facial geometry — width, height, jaw definition, hairline arc. Every variable becomes a coordinate the recommendation engine can work with.',
  },
  {
    num: '02',
    branded: 'Taper Geometry Scored™',
    title: 'We score the taper.',
    body: 'Forty taper styles tested against your face. Compression tolerance, contrast comfort, beard compatibility, and growth pattern feed the silhouette balance equation.',
  },
  {
    num: '03',
    branded: 'Profile Generated™',
    title: 'You get a brief.',
    body: 'A ranked grooming profile with barber-ready specifications, maintenance cadence, styling difficulty score, and visual references for the chair conversation.',
  },
] as const

export function MethodologySequence() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll-triggered progression — tracks section through the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 30%'],
  })

  // Map scroll progress 0..1 → active step index 0..2 with overlap zones
  // 0.00–0.33  → Step 01
  // 0.33–0.66  → Step 02
  // 0.66–1.00  → Step 03
  const activeIndex: MotionValue<number> = useTransform(scrollYProgress, (p): number =>
    p < 0.33 ? 0 : p < 0.66 ? 1 : 2
  )

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-ink text-soft border-t border-line grain-soft"
    >
      <Cinematic className="section-y">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easeLux }}
          className="grid grid-cols-12 gap-y-10 lg:gap-x-12 mb-20 lg:mb-28"
        >
          <div className="col-span-12 md:col-span-6">
            <SectionEyebrow className="mb-6">Chapter I — The Method</SectionEyebrow>
            <h2 className="type-section">
              From your face,
              <br />
              <span className="italic font-medium text-mute">to a barber-ready brief.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 md:pt-4">
            <p className="text-base lg:text-lg text-soft/65 leading-[1.75] max-w-lg">
              The platform replaces gallery browsing and crossed fingers with a structured read
              of what your face will carry between visits — and the exact language your barber
              needs to hear at the chair.
            </p>
          </div>
        </motion.div>

        {/* ── Step grid — horizontal sequence ─────────────────────── */}
        <div className="relative">
          {/* Progression rail — horizontal hairline that fills as you scroll */}
          <div className="absolute left-0 right-0 top-12 lg:top-14 h-px bg-line hidden lg:block">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="absolute inset-0 bg-gold origin-left"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-x-8">
            {STEPS.map((step, i) => (
              <Step
                key={step.num}
                index={i}
                num={step.num}
                branded={step.branded}
                title={step.title}
                body={step.body}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>

        {/* ── Mid-section CTA ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: easeLux }}
          className="mt-24 lg:mt-32 pt-12 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="max-w-xl">
            <p className="type-eyebrow text-gold mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
              Ready when you are
            </p>
            <p className="font-display text-2xl sm:text-3xl font-extrabold tracking-[-0.025em] leading-tight text-soft">
              Sixty seconds. <span className="italic font-medium text-mute">Three matches.</span>
            </p>
          </div>
          <Button asChild variant="cream" size="lg" shape="pill">
            <Link href="/tool">
              Analyze Your Face Structure
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </motion.div>

      </Cinematic>
    </section>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  Step — individual chapter card with scroll-active state + hover lift
 * ─────────────────────────────────────────────────────────────────────── */
interface StepProps {
  index: number
  num: string
  branded: string
  title: string
  body: string
  activeIndex: MotionValue<number>
}

function Step({ index, num, branded, title, body, activeIndex }: StepProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  // active = scroll-based progression has reached this step
  const isActive = useTransform(activeIndex, (a) => a >= index)
  const accentOpacity = useTransform(isActive, (a) => (a ? 1 : 0.35))

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: easeLux }}
      className="relative group/step"
    >
      {/* Scroll-active marker — dot on the rail */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: accentOpacity }}
        className="absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-gold ring-4 ring-ink hidden lg:block"
      />

      {/* Card */}
      <div
        className="relative h-full pt-16 lg:pt-20 pb-10 px-7 lg:px-9 rounded-hero border border-line bg-surface/30 overflow-hidden transition-all duration-500 ease-lux
                   group-hover/step:border-lineHover group-hover/step:bg-surface/60 group-hover/step:-translate-y-1 group-hover/step:shadow-luxury-sm"
      >
        {/* Oversized faded chapter numeral — top-right */}
        <span
          aria-hidden="true"
          className="absolute -top-3 right-6 font-display font-extrabold leading-none tracking-[-0.04em] text-[clamp(6rem,11vw,11rem)] text-gold/[0.10] select-none pointer-events-none transition-colors duration-500 group-hover/step:text-gold/[0.18]"
        >
          {num}
        </span>

        {/* Mini visual signature — different per step */}
        <div className="relative mb-8 h-32 lg:h-40 -mx-7 lg:-mx-9 px-7 lg:px-9 flex items-end">
          {index === 0 && <FaceReadVisual />}
          {index === 1 && <GeometryVisual />}
          {index === 2 && <ProfileVisual />}
        </div>

        {/* Branded label */}
        <p className="type-eyebrow text-gold mb-4 relative z-10">
          {branded}
        </p>

        <h3 className="font-display font-extrabold tracking-[-0.025em] text-2xl lg:text-3xl leading-[1.05] mb-5 relative z-10">
          {title}
        </h3>

        <p className="text-soft/65 leading-[1.75] text-[15px] relative z-10">
          {body}
        </p>
      </div>
    </motion.article>
  )
}

/* ───────────────────────────────────────────────────────────────────────
 *  Step-specific mini visuals — match the cinematic intelligence vibe
 * ─────────────────────────────────────────────────────────────────────── */

function FaceReadVisual() {
  return (
    <div className="relative w-full aspect-[5/3] overflow-hidden rounded-lg-x bg-surface2 border border-line">
      <Image
        src="/hero/subject.webp"
        alt=""
        fill
        sizes="280px"
        className="object-cover object-top opacity-90 grayscale-[10%]"
      />
      {/* Landmark dots — same coordinate system as hero, scaled down */}
      <svg viewBox="0 0 460 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full text-gold">
        {[
          [192, 219], [268, 219],   // eyes
          [230, 88],                 // hairline center
          [168, 163], [293, 163],    // temples
          [205, 406], [255, 406],    // mouth corners
          [230, 456],                // chin
        ].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 0.95, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: easeLux }}
          />
        ))}
      </svg>
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-medium tracking-[0.32em] uppercase text-soft/70">
        <span>Landmarks</span>
        <span className="text-gold tabular-nums">14 / 14</span>
      </div>
    </div>
  )
}

function GeometryVisual() {
  return (
    <div className="relative w-full aspect-[5/3] overflow-hidden rounded-lg-x bg-surface2 border border-line">
      <svg viewBox="0 0 280 168" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="geoGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8F7A58" stopOpacity="0.20" />
            <stop offset="1" stopColor="#8F7A58" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Tonal floor */}
        <rect x="0" y="0" width="280" height="168" fill="url(#geoGrad)" />

        {/* Vertical symmetry */}
        <motion.line
          x1="140" y1="20" x2="140" y2="148"
          stroke="#8F7A58" strokeWidth="0.6" strokeDasharray="3 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: easeLux }}
        />
        {/* Horizontal eye line */}
        <motion.line
          x1="40" y1="70" x2="240" y2="70"
          stroke="#8F7A58" strokeWidth="0.6" strokeDasharray="3 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeLux }}
        />
        {/* Jaw arc */}
        <motion.path
          d="M70 110 Q140 145 210 110"
          fill="none" stroke="#8F7A58" strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.95 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3, ease: easeLux }}
        />
        {/* Width gauge */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55, ease: easeLux }}
        >
          <line x1="60" y1="84" x2="60" y2="96" stroke="#F5F3EF" strokeWidth="0.8" />
          <line x1="220" y1="84" x2="220" y2="96" stroke="#F5F3EF" strokeWidth="0.8" />
          <line x1="60" y1="90" x2="220" y2="90" stroke="#F5F3EF" strokeWidth="0.4" />
        </motion.g>
      </svg>
      <div className="absolute top-3 left-3 text-[9px] font-medium tracking-[0.32em] uppercase text-soft/70">
        SYM <span className="text-gold tabular-nums">0.94</span>
      </div>
      <div className="absolute top-3 right-3 text-[9px] font-medium tracking-[0.32em] uppercase text-soft/70">
        JAW <span className="text-gold tabular-nums">38°</span>
      </div>
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-medium tracking-[0.32em] uppercase text-soft/70">
        <span>Geometry</span>
        <span className="text-gold tabular-nums">5 / 5</span>
      </div>
    </div>
  )
}

function ProfileVisual() {
  return (
    <div className="relative w-full aspect-[5/3] overflow-hidden rounded-lg-x bg-surface2 border border-line">
      {/* Tonal warm wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(143,122,88,0.18) 0%, transparent 65%)',
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeLux }}
          className="text-[9px] font-medium tracking-[0.32em] uppercase text-gold mb-1.5"
        >
          TaperMatch™
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeLux }}
          className="font-display font-extrabold tabular-nums tracking-[-0.04em] leading-[0.85] text-[clamp(2.25rem,5vw,3rem)] text-soft"
        >
          94<span className="text-mute text-base align-top ml-0.5">%</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: easeLux }}
          className="font-display font-extrabold tracking-[-0.015em] text-sm text-soft mt-1"
        >
          Low Taper Fade
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeLux }}
          className="mt-2 flex flex-wrap gap-1 justify-center"
        >
          {['Pro', 'Beard ✓', 'Low'].map((t) => (
            <span
              key={t}
              className="text-[8px] font-medium tracking-[0.24em] uppercase border border-line text-soft/75 px-1.5 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-medium tracking-[0.32em] uppercase text-soft/70">
        <span>Profile</span>
        <span className="text-gold">Ready</span>
      </div>
    </div>
  )
}
