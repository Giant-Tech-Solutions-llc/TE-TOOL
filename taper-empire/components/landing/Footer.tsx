'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react'

const guides = [
  { href: '/low-taper-guide',           label: 'Low Taper Guide' },
  { href: '/mid-taper-guide',           label: 'Mid Taper Guide' },
  { href: '/high-taper-guide',          label: 'High Taper Guide' },
  { href: '/taper-vs-fade',             label: 'Taper vs Fade' },
  { href: '/barber-guide-for-tapers',   label: 'Barber Guide' },
]

const matches = [
  { href: '/best-taper-for-round-face', label: 'Best for Round Face' },
  { href: '/best-taper-for-oval-face',  label: 'Best for Oval Face' },
  { href: '/best-taper-for-square-face',label: 'Best for Square Face' },
  { href: '/best-taper-for-curly-hair', label: 'Best for Curly Hair' },
  { href: '/best-taper-for-coily-hair', label: 'Best for Coily Hair' },
]

const pages = [
  { href: '/tool',    label: 'Get My Taper Match' },
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms',   label: 'Terms' },
]

const socials = [
  { href: 'https://twitter.com/taperempire',  label: 'Twitter',   Icon: Twitter },
  { href: 'https://facebook.com/taperempire', label: 'Facebook',  Icon: Facebook },
  { href: 'https://instagram.com/taperempire',label: 'Instagram', Icon: Instagram },
  { href: 'https://youtube.com/@taperempire', label: 'YouTube',   Icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-jet-black text-milk relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">

        {/* Top grid: brand + 3 link columns + socials column */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-mocha/40">

          {/* Brand block */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" aria-label="Taper Empire — Home" className="inline-block mb-5">
              <Image
                src="/logos/taper-empire-white.svg"
                alt="Taper Empire"
                width={220}
                height={34}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-taupe leading-relaxed max-w-xs">
              Decision intelligence for men&rsquo;s taper haircuts — AI-matched recommendations
              with on-face previews and barber-ready instructions.
            </p>
          </div>

          {/* Guides */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-milk mb-5">Guides</h4>
            <ul className="space-y-3 text-sm">
              {guides.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-taupe hover:text-milk transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Matches */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-milk mb-5">By Face & Hair</h4>
            <ul className="space-y-3 text-sm">
              {matches.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-taupe hover:text-milk transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-milk mb-5">Pages</h4>
            <ul className="space-y-3 text-sm">
              {pages.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-taupe hover:text-milk transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="col-span-1 md:col-span-2 flex md:justify-end">
            <div className="flex md:flex-col gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-charcoal hover:bg-mocha text-milk flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: copy + tagline */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-8 text-xs text-taupe">
          <p>© {new Date().getFullYear()} Taper Empire. All rights reserved.</p>
          <p>Built for the barbershop · Powered by AI</p>
        </div>
      </div>

      {/* Marquee strip */}
      <MarqueeStrip />
    </footer>
  )
}

function MarqueeStrip() {
  // A massive low-contrast brand wordmark scrolling horizontally
  const phrases = ['Sharp Lines', 'Clean Tapers', 'Decision Intelligence', 'For Every Face']
  const block = (
    <div className="flex items-center gap-12 px-6 whitespace-nowrap">
      {phrases.map((p) => (
        <span key={p} className="inline-flex items-center gap-12">
          <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-mocha/40 tracking-tight">
            {p}
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-mocha/40 shrink-0">
            <path d="M5 19L19 5M19 19V5H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ))}
    </div>
  )
  return (
    <div className="relative overflow-hidden border-t border-mocha/40 py-6">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex"
      >
        {block}
        {block}
      </motion.div>
    </div>
  )
}
