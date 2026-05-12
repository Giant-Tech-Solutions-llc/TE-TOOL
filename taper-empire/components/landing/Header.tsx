'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, Moon } from 'lucide-react'

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 pt-4"
    >
      <div className="max-w-7xl mx-auto bg-milk rounded-2xl shadow-sm border border-border/60 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Taper Empire — Home">
          <Image
            src="/logos/taper-empire-black.svg"
            alt="Taper Empire"
            width={180}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search"
            className="w-10 h-10 rounded-full text-mocha hover:bg-oat/60 hover:text-jet-black transition-colors flex items-center justify-center"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>
          <div className="w-px h-5 bg-border/80" aria-hidden="true" />
          <button
            type="button"
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full text-mocha hover:bg-oat/60 hover:text-jet-black transition-colors flex items-center justify-center"
          >
            <Moon className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>
          <Link
            href="/tool"
            className="ml-2 hidden sm:inline-flex px-5 py-2 bg-jet-black text-milk text-sm font-semibold rounded-full hover:bg-charcoal transition-colors"
          >
            Try the Tool
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
