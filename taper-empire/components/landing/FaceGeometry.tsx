'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Cinematic, SectionEyebrow } from '@/components/shared'
import { easeLux } from '@/lib/motion'

/**
 * Phase 12 — Face Geometry chapter.
 *
 * Five face-shape cards (Round / Oval / Square / Heart / Diamond) sit
 * across the top as visual references. Beneath them: a structured
 * mapping table — face shape → recommended taper → why → barber anchor —
 * so each row is independently scannable by a reader and extractable by
 * an AI overview.
 */

interface FaceShape {
  key: string
  label: string
  glyph: string
  image: string
  blur: string
  sublabel: string
  recommended: string
  why: string
  anchor: string
}

const FACES: FaceShape[] = [
  {
    key: 'round',
    label: 'Round',
    glyph: '◉',
    image: '/face-geometry/round.webp',
    blur: '/face-geometry/round-blur.webp',
    sublabel: 'Soft jaw, equal width to height',
    recommended: 'Low taper',
    why: 'Reduces side width, builds vertical balance',
    anchor: 'Soft corners, extra height on top',
  },
  {
    key: 'oval',
    label: 'Oval',
    glyph: '⬭',
    image: '/face-geometry/oval.webp',
    blur: '/face-geometry/oval-blur.webp',
    sublabel: 'Balanced proportions',
    recommended: 'Low taper',
    why: 'Preserves symmetry without over-sharpening',
    anchor: 'Temple-to-occipital blend, no hard disconnect',
  },
  {
    key: 'square',
    label: 'Square',
    glyph: '▣',
    image: '/face-geometry/square.webp',
    blur: '/face-geometry/square-blur.webp',
    sublabel: 'Strong jaw, defined corners',
    recommended: 'Low taper',
    why: 'Retains jawline strength, reduces helmet bulk',
    anchor: 'Clean corners, no aggressive skin fade',
  },
  {
    key: 'diamond',
    label: 'Diamond',
    glyph: '◈',
    image: '/face-geometry/diamond.webp',
    blur: '/face-geometry/diamond-blur.webp',
    sublabel: 'Wide cheekbones, narrow forehead and jaw',
    recommended: 'Mid taper',
    why: 'Prevents cheekbone overexposure, protects silhouette',
    anchor: 'Leave slight temple density',
  },
  {
    key: 'heart',
    label: 'Heart',
    glyph: '♡',
    image: '/face-geometry/heart.webp',
    blur: '/face-geometry/heart-blur.webp',
    sublabel: 'Broad forehead, narrower jawline',
    recommended: 'Mid taper · Fuller temple transition',
    why: 'Balances forehead width, narrows lower profile',
    anchor: 'Soft sideburns, no high-start point',
  },
]

export function FaceGeometry() {
  return (
    <section
      id="face-shape"
      className="relative bg-ink text-soft border-t border-line grain-soft"
    >
      <Cinematic className="section-y">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easeLux }}
          className="grid grid-cols-12 gap-y-10 lg:gap-x-12 mb-16 lg:mb-20"
        >
          <div className="col-span-12 md:col-span-7">
            <SectionEyebrow className="mb-6">Chapter II — Face Geometry</SectionEyebrow>
            <h2 className="type-section">
              Mapped to
              <br />
              <span className="italic font-medium text-mute">taper strategy.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-4">
            <p className="text-base lg:text-lg text-soft/65 leading-[1.75] max-w-md">
              Every read is engineered to be quotable in a barber chair — not just readable on a
              screen.
            </p>
          </div>
        </motion.div>

        {/* ── Five face shape cards ──────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-14 lg:mb-20">
          {FACES.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: easeLux }}
              className="group/face"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg-x border border-line bg-surface2 transition-all duration-500 group-hover/face:border-lineHover group-hover/face:shadow-luxury-sm">
                <Image
                  src={f.image}
                  alt={`${f.label} face shape reference portrait`}
                  fill
                  quality={92}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                  placeholder="blur"
                  blurDataURL={f.blur}
                  className="object-cover object-center transition-transform duration-700 ease-lux group-hover/face:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,7,7,0.85) 100%)' }}
                />
              </div>
              <div className="mt-4 px-1">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span aria-hidden="true" className="text-gold text-base leading-none">{f.glyph}</span>
                  <p className="font-display font-extrabold tracking-[-0.025em] text-soft text-base lg:text-lg">
                    {f.label}
                  </p>
                </div>
                <p className="text-[11px] text-soft/55 leading-snug">
                  {f.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Comparison table ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: easeLux }}
          className="relative rounded-hero border border-line bg-surface/30 overflow-hidden"
        >
          {/* Header row */}
          <div className="hidden lg:grid grid-cols-12 gap-6 px-8 py-5 border-b border-line bg-[rgba(255,255,255,0.02)]">
            <Th className="col-span-2">01 · Face shape</Th>
            <Th className="col-span-3">02 · Recommended taper</Th>
            <Th className="col-span-4">03 · Why it works</Th>
            <Th className="col-span-3">04 · Barber anchor</Th>
          </div>

          <div className="divide-y divide-line">
            {FACES.map((f) => (
              <div
                key={f.key}
                className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-6 px-6 lg:px-8 py-6 lg:py-7 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.015)]"
              >
                <div className="lg:col-span-2 flex items-center gap-3">
                  <span aria-hidden="true" className="grid place-items-center w-8 h-8 rounded-full border border-gold/45 text-gold text-sm">
                    {f.glyph}
                  </span>
                  <p className="font-display font-extrabold tracking-[-0.02em] text-soft text-base">
                    {f.label}
                  </p>
                </div>
                <Cell className="lg:col-span-3" eyebrow="Recommended">
                  {f.recommended}
                </Cell>
                <Cell className="lg:col-span-4" eyebrow="Why it works">
                  {f.why}
                </Cell>
                <Cell className="lg:col-span-3" eyebrow="Barber anchor">
                  {f.anchor}
                </Cell>
              </div>
            ))}
          </div>
        </motion.div>
      </Cinematic>
    </section>
  )
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`type-eyebrow text-soft/55 ${className}`}>{children}</p>
  )
}

function Cell({
  children, eyebrow, className = '',
}: { children: React.ReactNode; eyebrow: string; className?: string }) {
  return (
    <div className={className}>
      <p className="lg:hidden type-eyebrow text-soft/45 mb-1">{eyebrow}</p>
      <p className="text-soft/85 leading-[1.55] text-[14.5px] lg:text-[15px]">{children}</p>
    </div>
  )
}
