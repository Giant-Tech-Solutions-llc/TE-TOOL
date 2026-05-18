'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="relative bg-ink text-soft overflow-hidden border-t border-line">
      {/* Atmospheric directional lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(143,122,88,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(143,122,88,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Repeating brand watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-display font-extrabold tracking-[-0.06em] leading-none text-[28vw] text-soft/[0.025] whitespace-nowrap">
          TAPER · EMPIRE
        </span>
      </div>

      <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10 py-32 lg:py-48">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12">

          <div className="col-span-12 lg:col-span-3">
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-6 flex items-center gap-4">
              <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
              Chapter VIII — Closing
            </p>
            <p className="text-[10px] tracking-[0.32em] uppercase text-mute">
              No subscription · No card · No data sold.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-9"
          >
            <h2 className="font-display font-extrabold tracking-[-0.045em] leading-[0.88] text-[clamp(3rem,10vw,11rem)] mb-16">
              Stop guessing.
              <span className="italic font-medium text-mute">Start matching.</span>
            </h2>

            <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12 items-end">
              <p className="col-span-12 lg:col-span-5 text-lg sm:text-xl text-soft/65 leading-[1.65] max-w-[44ch]">
                A barber-ready taper plan, engineered to your face geometry, hair texture, and
                maintenance reality. Sixty seconds, three matches, zero noise.
              </p>

              <div className="col-span-12 lg:col-span-7 lg:col-start-6 flex flex-col sm:flex-row items-stretch sm:items-end gap-4 lg:justify-end">
                <Button asChild variant="cream" size="xl" shape="pill">
                  <Link href="/tool">
                    Begin the analysis
                    <span aria-hidden="true">→</span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
