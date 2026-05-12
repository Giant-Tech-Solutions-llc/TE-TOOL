'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 bg-milk/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-jet-black hover:text-mocha transition-colors"
          >
            TAPER EMPIRE
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="#how-it-works" className="hidden sm:block text-sm text-mocha hover:text-jet-black transition-colors">
              How it works
            </Link>
            <Link href="#faq" className="hidden sm:block text-sm text-mocha hover:text-jet-black transition-colors">
              FAQ
            </Link>
            <Link
              href="/tool"
              className="px-5 py-2 bg-jet-black text-milk text-sm font-semibold rounded-full hover:bg-charcoal transition-colors"
            >
              Try the Tool
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
