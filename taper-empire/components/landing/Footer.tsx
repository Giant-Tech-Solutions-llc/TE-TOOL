'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const primaryLinks = [
  { href: '/tool',                  label: 'Begin' },
  { href: '#how-it-works',          label: 'Method' },
  { href: '#face-shape',            label: 'Face Shapes' },
  { href: '#hair-type',             label: 'Hair Textures' },
  { href: '#maintenance',           label: 'Maintenance' },
  { href: '#faq',                   label: 'FAQ' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms',   label: 'Terms' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="relative bg-ink text-soft border-t border-line">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10">

        {/* Editorial wordmark band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-line py-24 lg:py-40"
        >
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-8 flex items-center gap-4">
            <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
            <span>Vol. 01 — Edition I</span>
          </p>
          <p className="font-display font-extrabold tracking-[-0.04em] leading-[0.88] text-[clamp(2.5rem,10vw,9rem)] max-w-[16ch]">
            The grooming
            <br />
            intelligence
            <br />
            <span className="italic font-medium text-mute">layer.</span>
          </p>
        </motion.div>

        {/* Nav grid */}
        <div className="grid grid-cols-12 gap-12 py-16 lg:py-20 border-b border-line">

          <div className="col-span-12 md:col-span-5">
            <Link href="/" aria-label="Taper Empire — Home" className="inline-block mb-8">
              <Image
                src="/logos/taper-empire-white.svg"
                alt="Taper Empire"
                width={240}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-soft/55 leading-[1.85] max-w-md">
              A grooming intelligence platform for modern men. Face-optimized taper
              recommendations with barber-ready instructions and maintenance plans.
            </p>
          </div>

          <div className="col-span-6 md:col-span-4 md:col-start-7">
            <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold mb-6">
              Sections
            </p>
            <ul className="space-y-4 text-sm">
              {primaryLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-soft/70 hover:text-soft transition-colors inline-flex items-baseline gap-3"
                  >
                    <span aria-hidden="true" className="text-mute">—</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold mb-6">
              Practical
            </p>
            <ul className="space-y-4 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-soft/70 hover:text-soft transition-colors inline-flex items-baseline gap-3"
                  >
                    <span aria-hidden="true" className="text-mute">—</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-10 text-[10px] tracking-[0.32em] uppercase text-mute">
          <p>© {new Date().getFullYear()} Taper Empire — All rights reserved</p>
          <p>Currently free during beta</p>
        </div>
      </div>
    </footer>
  )
}
