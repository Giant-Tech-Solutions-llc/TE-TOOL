'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react'

const productLinks = [
  { href: '/tool',                  label: 'Get My Match' },
  { href: '#how-it-works',          label: 'The Method' },
  { href: '/guide',                 label: 'The Guide' },
  { href: '/guide/face-shapes',     label: 'Face Shapes' },
  { href: '/guide/maintenance',     label: 'Maintenance' },
]

const sectionLinks = [
  { href: '/guide/taper-styles',           label: 'Taper Styles' },
  { href: '/guide/hair-textures',          label: 'Hair Textures' },
  { href: '/guide/barber-communication',   label: 'Barber Guide' },
  { href: '/guide/compare/taper-vs-fade',  label: 'Taper vs Fade' },
]

const companyLinks = [
  { href: '/about',                 label: 'About' },
  { href: '/contact',               label: 'Contact' },
  { href: '/privacy',               label: 'Privacy' },
  { href: '/terms',                 label: 'Terms' },
]

const socials = [
  { href: 'https://twitter.com/taperempire',   label: 'X / Twitter', Icon: Twitter },
  { href: 'https://facebook.com/taperempire',  label: 'Facebook',    Icon: Facebook },
  { href: 'https://instagram.com/taperempire', label: 'Instagram',   Icon: Instagram },
  { href: 'https://youtube.com/@taperempire',  label: 'YouTube',     Icon: Youtube },
]

export function Footer() {
  return (
    <footer className="relative bg-ink text-soft border-t border-line overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10">

        {/* ─── Main grid — Recap-style with TE branding ─── */}
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-8 py-16 lg:py-20">

          {/* Brand block — logo + tagline */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <Link href="/" aria-label="Taper Empire — Home" className="inline-flex items-center gap-3 mb-6 group">
              <Image
                src="/logos/brand-icon.svg"
                alt=""
                width={48}
                height={28}
                className="h-7 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                priority={false}
              />
              <Image
                src="/logos/taper-empire-white.svg"
                alt="Taper Empire"
                width={200}
                height={28}
                className="h-7 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-soft/55 leading-[1.85] max-w-sm">
              A grooming intelligence platform for modern men &mdash; face-optimized taper
              recommendations with barber-ready instructions and maintenance plans.
            </p>
            <p className="mt-8 text-[10px] tracking-[0.32em] uppercase text-mute">
              © {new Date().getFullYear()} Taper Empire. All rights reserved.
            </p>
          </div>

          {/* Three nav columns */}
          <div className="col-span-6 md:col-span-2 lg:col-span-2 md:col-start-6 lg:col-start-5">
            <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold mb-6">
              Product
            </p>
            <ul className="space-y-3.5 text-sm">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-soft/75 hover:text-gold transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2 lg:col-span-2">
            <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold mb-6">
              Sections
            </p>
            <ul className="space-y-3.5 text-sm">
              {sectionLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-soft/75 hover:text-gold transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2 lg:col-span-2">
            <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold mb-6">
              Company
            </p>
            <ul className="space-y-3.5 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-soft/75 hover:text-gold transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column (Recap-style stacked icons on the right) */}
          <div className="col-span-6 md:col-span-12 lg:col-span-2 flex md:justify-start lg:justify-end">
            <div className="flex md:flex-row lg:flex-col gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group/icon w-11 h-11 rounded-full bg-surface2 border border-line text-soft/75 grid place-items-center transition-all duration-300 hover:bg-gold hover:border-gold hover:text-ink hover:scale-105"
                >
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover/icon:scale-110" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom strip — practical + beta line ─── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8 border-t border-line text-[10px] tracking-[0.32em] uppercase text-mute">
          <p>Built for the barbershop · Powered by intelligence</p>
          <p>Currently free during beta</p>
        </div>
      </div>

      {/* ─── Marquee wordmark band — Recap-style oversized brand strip ─── */}
      <div className="relative border-t border-line overflow-hidden py-10 lg:py-14">
        <div className="marquee-track gap-16 lg:gap-24">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-16 lg:gap-24 px-8 whitespace-nowrap">
              {['Curated Cuts', 'Cinematic Editorial Intelligence', 'For Modern Men', 'Vol. 01'].map((p, i) => (
                <span key={`${dup}-${i}`} className="flex items-center gap-16 lg:gap-24">
                  <span className="font-display font-extrabold tracking-[-0.04em] text-[clamp(3rem,7vw,6rem)] leading-none text-soft/[0.07]">
                    {p}
                  </span>
                  <Image
                    src="/logos/brand-icon.svg"
                    alt=""
                    width={42}
                    height={24}
                    aria-hidden="true"
                    className="h-6 lg:h-8 w-auto opacity-20 shrink-0"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
