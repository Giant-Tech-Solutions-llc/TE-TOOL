'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Cinematic, SectionEyebrow } from '@/components/shared'
import { easeLux } from '@/lib/motion'

/**
 * Phase Y.3 — Texture Behavior chapter (v2 — portrait reference cards).
 *
 * Four portrait cards across the top show how each hair texture
 * (Straight / Wavy / Curly / Coily) reads at the chair. The decision
 * grid beneath maps each texture to the best taper direction, the core
 * risk, and the execution note a barber needs to honor it.
 */

interface Texture {
  key: string
  label: string
  image: string
  blur: string
  tagline: string
  glyph: string
  direction: string
  risk: string
  execution: string
}

const TEXTURES: Texture[] = [
  {
    key: 'straight',
    label: 'Straight',
    image: '/textures/straight.webp',
    blur: '/textures/straight-blur.webp',
    tagline: 'Low or mid taper',
    glyph: '∣',
    direction: 'Low or mid taper · Directional texture',
    risk: 'Can read flat after bulk removal',
    execution: 'Matte clay, point-cut for texture',
  },
  {
    key: 'wavy',
    label: 'Wavy',
    image: '/textures/wavy.webp',
    blur: '/textures/wavy-blur.webp',
    tagline: 'Mid taper',
    glyph: '∿',
    direction: 'Mid taper · Layered top',
    risk: 'Wave pattern collapses if taper starts too high',
    execution: 'Keep compression below parietal ridge',
  },
  {
    key: 'curly',
    label: 'Curly',
    image: '/textures/curly.webp',
    blur: '/textures/curly-blur.webp',
    tagline: 'Low taper',
    glyph: '↻',
    direction: 'Low taper · Curl-preserving perimeter',
    risk: 'Over-fading removes curl frame',
    execution: 'Scissor-over-comb around curl line',
  },
  {
    key: 'coily',
    label: 'Coily',
    image: '/textures/coily.webp',
    blur: '/textures/coily-blur.webp',
    tagline: 'Temple & nape',
    glyph: '◜◝',
    direction: 'Temple-and-nape taper · Shape retention',
    risk: 'Shrinks fast, exposes scalp contrast quickly',
    execution: 'Sponge or twist styling between cuts',
  },
]

export function TextureBehavior() {
  return (
    <section
      id="hair-type"
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
            <SectionEyebrow className="mb-6">Chapter V — Texture Behavior</SectionEyebrow>
            <h2 className="type-section">
              How hair grows out
              <br />
              <span className="italic font-medium text-mute">matters.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-4">
            <p className="text-base lg:text-lg text-soft/65 leading-[1.75] max-w-md">
              A taper that flatters on day one but collapses by week two is a failed
              recommendation. Texture defines week-three behavior.
            </p>
          </div>
        </motion.div>

        {/* ── Four portrait reference chips ──────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-14 lg:mb-20">
          {TEXTURES.map((t, i) => (
            <motion.figure
              key={t.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: easeLux }}
              className="group/tex relative overflow-hidden rounded-lg-x border border-line bg-surface/30 transition-all duration-500 hover:border-lineHover hover:bg-surface/60 hover:-translate-y-1 hover:shadow-luxury-sm"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={t.image}
                  alt={`${t.label} hair texture reference portrait`}
                  fill
                  quality={92}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                  placeholder="blur"
                  blurDataURL={t.blur}
                  className="object-cover object-center transition-transform duration-700 ease-lux group-hover/tex:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,7,7,0.92) 100%)' }}
                />
              </div>

              <figcaption className="px-4 pt-3 pb-4 border-t border-line bg-[rgba(255,255,255,0.015)]">
                <div className="flex items-center gap-2.5 mb-1">
                  <span aria-hidden="true" className="grid place-items-center w-6 h-6 rounded-full border border-gold/45 text-gold text-[12px] leading-none">
                    {t.glyph}
                  </span>
                  <p className="font-display font-extrabold tracking-[-0.02em] text-soft text-[15px] uppercase">
                    {t.label}
                  </p>
                </div>
                <p className="text-[11px] text-gold/85 font-medium tracking-[0.2em] uppercase">
                  {t.tagline}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* ── Decision grid ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: easeLux }}
          className="relative rounded-hero border border-line bg-surface/30 overflow-hidden"
        >
          <div className="hidden lg:grid grid-cols-12 gap-6 px-8 py-5 border-b border-line bg-[rgba(255,255,255,0.02)]">
            <Th className="col-span-2">01 · Hair type</Th>
            <Th className="col-span-3">02 · Best taper direction</Th>
            <Th className="col-span-3">03 · Core risk</Th>
            <Th className="col-span-4">04 · Execution note</Th>
          </div>

          <div className="divide-y divide-line">
            {TEXTURES.map((t) => (
              <div
                key={t.key}
                className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-6 px-6 lg:px-8 py-6 lg:py-7 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.015)]"
              >
                <div className="lg:col-span-2 flex items-center gap-3">
                  <span aria-hidden="true" className="grid place-items-center w-8 h-8 rounded-full border border-gold/45 text-gold text-sm">
                    {t.glyph}
                  </span>
                  <p className="font-display font-extrabold tracking-[-0.02em] text-soft text-base">
                    {t.label}
                  </p>
                </div>
                <Cell className="lg:col-span-3" eyebrow="Direction">{t.direction}</Cell>
                <Cell className="lg:col-span-3" eyebrow="Core risk">{t.risk}</Cell>
                <Cell className="lg:col-span-4" eyebrow="Execution">{t.execution}</Cell>
              </div>
            ))}
          </div>
        </motion.div>
      </Cinematic>
    </section>
  )
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`type-eyebrow text-soft/55 ${className}`}>{children}</p>
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
