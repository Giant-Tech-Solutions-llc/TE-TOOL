'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-oat via-milk to-milk -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-mocha/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-accent text-milk px-4 py-2 rounded-full text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          AI-Powered Taper Recommendations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-jet-black mb-6 leading-[1.05]"
        >
          Find Your Perfect{' '}
          <span className="bg-gradient-to-r from-accent to-mocha bg-clip-text text-transparent">
            Taper Haircut
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-mocha mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Get AI-matched taper recommendations for your face shape, hair texture, and lifestyle.
          On-face previews · barber-ready instructions · 60-second result.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/tool"
            className="group inline-flex items-center justify-center gap-2 bg-accent text-milk px-8 py-4 rounded-xl text-lg font-semibold hover:bg-accent-hover shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
          >
            Get My Taper Match
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center text-mocha hover:text-jet-black underline-offset-4 hover:underline transition-colors"
          >
            See how it works
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-sm text-taupe"
        >
          Free · No signup · Used by 12,000+ men
        </motion.p>
      </div>
    </section>
  )
}
