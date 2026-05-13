'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="relative bg-jet-black text-milk overflow-hidden">
      {/* Repeating brand wordmark watermark in the background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-display font-extrabold tracking-[-0.06em] leading-none text-[28vw] text-milk/[0.025] whitespace-nowrap">
          TAPER · EMPIRE
        </span>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">

          {/* Left col — eyebrow + meta */}
          <div className="col-span-12 lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-taupe mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-8 bg-taupe" />
              Section VIII · Closing
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-taupe">No subscription · No signup · No data sold.</p>
          </div>

          {/* Main column — big editorial headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-9"
          >
            <h2 className="font-display font-extrabold tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,9vw,8rem)] mb-12">
              Stop guessing.
              <br />
              <span className="italic font-serif font-normal tracking-tight">Start</span> matching.
            </h2>

            <div className="grid grid-cols-12 gap-y-8 lg:gap-x-10 items-end">
              <p className="col-span-12 lg:col-span-5 text-lg sm:text-xl text-oat leading-[1.55] max-w-[42ch]">
                A barber-ready taper plan, engineered to your face geometry, hair texture, and maintenance reality.
                Sixty seconds, three matches, zero noise.
              </p>

              <div className="col-span-12 lg:col-span-7 lg:col-start-6 flex flex-col sm:flex-row items-stretch sm:items-end gap-4 sm:gap-6 lg:justify-end">
                <Link
                  href="/tool"
                  className="group inline-flex items-center gap-3 bg-milk text-jet-black pl-8 pr-3 py-3 hover:bg-accent hover:text-milk transition-colors"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">Begin the Analysis</span>
                  <span className="grid place-items-center w-10 h-10 bg-jet-black text-milk group-hover:bg-milk group-hover:text-jet-black transition-colors">
                    <ArrowUpRight className="w-5 h-5" strokeWidth={2.25} />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
