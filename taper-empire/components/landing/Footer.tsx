'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const primaryLinks = [
  { href: '/tool',                  label: 'Get My Match' },
  { href: '#how-it-works',          label: 'Method' },
  { href: '#face-shape',            label: 'Face Shapes' },
  { href: '#hair-type',             label: 'Hair Textures' },
  { href: '#comparisons',           label: 'Compare' },
  { href: '#faq',                   label: 'FAQ' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms',   label: 'Terms' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-jet-black text-milk">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Editorial wordmark band */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="border-b border-milk/15 py-24 lg:py-32"
        >
          <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-taupe mb-6">
            Vol. 01 — Edition I
          </p>
          <p className="font-display font-extrabold tracking-[-0.025em] leading-[0.95] text-[clamp(2.25rem,9vw,8rem)] max-w-[18ch]">
            The grooming
            <br />
            intelligence
            <br />
            <span className="italic font-medium text-taupe">layer.</span>
          </p>
        </motion.div>

        {/* Nav + brand */}
        <div className="grid grid-cols-12 gap-10 py-16 lg:py-20 border-b border-milk/15">

          <div className="col-span-12 md:col-span-5">
            <Link href="/" aria-label="Taper Empire — Home" className="inline-block mb-6">
              <Image
                src="/logos/taper-empire-white.svg"
                alt="Taper Empire"
                width={240}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-taupe leading-[1.7] max-w-md">
              A grooming intelligence platform for modern men. Face-optimized taper
              recommendations with barber-ready instructions and maintenance plans.
            </p>
          </div>

          <div className="col-span-6 md:col-span-4 md:col-start-7">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-taupe mb-5">
              Sections
            </p>
            <ul className="space-y-3 text-sm font-medium">
              {primaryLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-milk hover:text-accent transition-colors inline-flex items-baseline gap-2"
                  >
                    <span aria-hidden="true" className="text-taupe">—</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-taupe mb-5">
              Practical
            </p>
            <ul className="space-y-3 text-sm font-medium">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-milk hover:text-accent transition-colors inline-flex items-baseline gap-2"
                  >
                    <span aria-hidden="true" className="text-taupe">—</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom band */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-10 text-[11px] tracking-[0.16em] uppercase text-taupe">
          <p>© {new Date().getFullYear()} Taper Empire — All rights reserved</p>
          <p>Currently free during beta</p>
        </div>
      </div>
    </footer>
  )
}
