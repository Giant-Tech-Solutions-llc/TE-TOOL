'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const sequence = [
  {
    num: '01',
    label: 'Mapping',
    title: 'Facial structure read.',
    body: 'A structural analysis of facial geometry — width, height, jaw definition, hairline arc. Every variable becomes a coordinate the recommendation engine can work with.',
  },
  {
    num: '02',
    label: 'Evaluation',
    title: 'Taper geometry scored.',
    body: 'Forty taper styles tested against your face. Compression tolerance, contrast comfort, beard compatibility, and growth pattern feed the silhouette balance equation.',
  },
  {
    num: '03',
    label: 'Composition',
    title: 'Profile generated.',
    body: 'A ranked grooming profile with barber-ready specifications, maintenance cadence, styling difficulty score, and visual references for the chair conversation.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-ink text-soft border-t border-line grain-soft">
      <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10 py-24 lg:py-40">

        <ScrollReveal>
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12 mb-20 lg:mb-28">
            <div className="col-span-12 md:col-span-5">
              <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-6 flex items-center gap-4">
                <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
                Chapter I — The Method
              </p>
              <h2 className="font-display font-extrabold leading-[0.92] tracking-[-0.035em] text-[clamp(2.5rem,6.2vw,5.5rem)]">
                From your face,
                <br />
                <span className="italic font-medium text-mute">to a barber-ready brief.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-4">
              <p className="text-base lg:text-lg text-soft/65 leading-[1.75] max-w-xl">
                The platform replaces gallery browsing and crossed fingers with a structured read
                of what your face will carry between visits — and the exact language your barber
                needs to hear at the chair.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-x-10">
          {sequence.map((s, i) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-line bg-surface/30 p-8 lg:p-10 hover:bg-surface/60 hover:border-soft/15 transition-all duration-500 group/card"
            >
              {/* Oversized chapter number */}
              <span className="block font-display font-extrabold leading-none tracking-[-0.04em] text-[clamp(5rem,9vw,8rem)] text-gold/15 mb-6 group-hover/card:text-gold/25 transition-colors duration-500">
                {s.num}
              </span>

              <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold mb-4">
                {s.label}
              </p>
              <h3 className="font-display font-extrabold tracking-[-0.025em] text-3xl lg:text-4xl leading-[1.0] mb-5">
                {s.title}
              </h3>
              <p className="text-soft/65 leading-[1.75] max-w-md">
                {s.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
