'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const steps = [
  {
    num: 'I',
    label: 'Capture',
    title: 'Photo or quiz.',
    body: 'A clear front-facing image — or five short questions. Either path returns the same structured analysis: face geometry, texture behavior, and maintenance cadence.',
  },
  {
    num: 'II',
    label: 'Analysis',
    title: 'Structural read.',
    body: 'We score taper styles against your face shape, hair texture, and lifestyle constraints. The model evaluates compression tolerance, blend visibility, and grow-out behavior.',
  },
  {
    num: 'III',
    label: 'Brief',
    title: 'Barber-ready brief.',
    body: 'Three ranked matches with compatibility scores, the exact guard progression for your barber, and a 30-day maintenance plan calibrated to your hair growth.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-milk text-jet-black border-t border-jet-black/15">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">

        <ScrollReveal>
          <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-20 lg:mb-28">
            <div className="col-span-12 md:col-span-5">
              <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-6">
                Section I — Method
              </p>
              <h2 className="font-display font-extrabold tracking-[-0.025em] leading-[0.95] text-[clamp(2rem,5.5vw,4.5rem)]">
                From your face to a
                <br />
                <span className="italic font-medium text-mocha">cut that holds.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-3">
              <p className="text-base lg:text-lg text-mocha leading-[1.7] max-w-xl">
                Most haircut decisions are made from trend photos and crossed fingers. We
                replace that with a structured read of what your face will actually carry
                between visits — and what your barber needs to hear at the chair.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="border-t border-jet-black/15">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid grid-cols-12 gap-6 lg:gap-10 py-12 lg:py-16 border-b border-jet-black/15"
            >
              <div className="col-span-12 md:col-span-2 flex items-baseline gap-3">
                <span className="font-display text-5xl lg:text-6xl font-extrabold text-mocha tracking-tighter leading-none">
                  {s.num}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-3">
                  {s.label}
                </p>
                <h3 className="font-display font-extrabold tracking-[-0.02em] text-2xl lg:text-3xl leading-[1.05]">
                  {s.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-5 md:col-start-8">
                <p className="text-base text-mocha leading-[1.7]">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
