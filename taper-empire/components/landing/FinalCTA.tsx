'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-jet-black text-milk relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-mocha/20 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Stop guessing. Start matching.
          </h2>
          <p className="text-lg sm:text-xl text-oat mb-10 max-w-xl mx-auto">
            A precise barber-ready taper plan tailored to your face, hair, and lifestyle —
            in under a minute.
          </p>
          <Link
            href="/tool"
            className="group inline-flex items-center gap-3 bg-milk text-jet-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-oat transition-all shadow-md hover:shadow-lg"
          >
            Get My Taper Match
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-5 text-sm text-taupe">Free · No signup required</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
