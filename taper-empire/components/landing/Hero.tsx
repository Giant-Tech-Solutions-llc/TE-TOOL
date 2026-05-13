'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative bg-milk text-jet-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-24 lg:pb-32">

        {/* Eyebrow row — editorial masthead */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid grid-cols-12 items-baseline gap-6 pb-12 border-b border-jet-black/15"
        >
          <div className="col-span-12 md:col-span-7 lg:col-span-8 flex items-baseline gap-4">
            <span className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha">
              Vol. 01
            </span>
            <span className="h-px w-8 bg-jet-black/30" aria-hidden="true" />
            <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-jet-black">
              AI Grooming Intelligence
            </span>
          </div>
          <div className="col-span-12 md:col-span-5 lg:col-span-4 flex md:justify-end gap-6 text-[10px] font-semibold tracking-[0.22em] uppercase text-mocha">
            <span>For Modern Men</span>
            <span aria-hidden="true">/</span>
            <span>Edition I</span>
          </div>
        </motion.div>

        {/* Headline + meta column */}
        <div className="grid grid-cols-12 gap-6 lg:gap-10 pt-14 lg:pt-20">

          {/* Headline */}
          <div className="col-span-12 lg:col-span-9">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
              className="font-display font-extrabold tracking-[-0.035em] leading-[0.92] text-[clamp(2.5rem,8.4vw,8.5rem)]"
            >
              Find the taper
              <br />
              that actually fits
              <br />
              <span className="italic font-medium text-mocha">your face.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-10 max-w-2xl text-lg lg:text-xl text-mocha leading-[1.55]"
            >
              Grooming intelligence that reads your face shape, hair texture, and maintenance
              tolerance — then returns the taper styles most likely to suit you. Barber-ready
              instructions included.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/tool"
                className="inline-flex items-center gap-3 bg-jet-black text-milk px-8 h-14 text-sm font-semibold tracking-[0.18em] uppercase hover:bg-charcoal transition-colors"
              >
                <span>Get My Taper Match</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-semibold tracking-[0.14em] uppercase text-jet-black underline underline-offset-[6px] decoration-[1.5px] decoration-jet-black/30 hover:decoration-accent hover:text-accent transition-colors"
              >
                See the method
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-xs tracking-[0.16em] uppercase text-mocha"
            >
              Currently free during beta &nbsp;·&nbsp; No card &nbsp;·&nbsp; ~60s
            </motion.p>
          </div>

          {/* Right meta column */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="col-span-12 lg:col-span-3 lg:pt-3"
          >
            <div className="lg:sticky lg:top-32">
              <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-5">
                The Index
              </p>
              <ul className="space-y-3 text-sm font-medium">
                {[
                  ['I',   'Face Structure'],
                  ['II',  'Hair Texture'],
                  ['III', 'Maintenance'],
                  ['IV',  'Barber Brief'],
                ].map(([num, label]) => (
                  <li key={num} className="flex items-baseline gap-4 border-b border-jet-black/10 pb-3">
                    <span className="text-[10px] tracking-[0.22em] uppercase text-mocha w-8">{num}</span>
                    <span className="font-display text-base font-extrabold tracking-tight">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs text-mocha leading-relaxed max-w-[24ch]">
                A four-part read on the cut you should actually walk into the barbershop asking for.
              </p>
            </div>
          </motion.aside>

        </div>
      </div>

      {/* Hairline pillar quote — editorial breath */}
      <div className="border-t border-jet-black/15 bg-milk">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-32">
          <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-8">
            Editorial Note
          </p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display font-extrabold tracking-[-0.025em] leading-[0.95] text-[clamp(2rem,6.5vw,6rem)] max-w-[18ch]"
          >
            The right taper for the right man.
          </motion.p>
          <p className="mt-10 max-w-xl text-base lg:text-lg text-mocha leading-[1.6]">
            Most haircut tools throw a gallery at you and call it a recommendation. We start
            from your face, then back into a cut your barber can actually execute on the
            first try.
          </p>
        </div>
      </div>
    </section>
  )
}
