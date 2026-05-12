'use client'

import { Camera, Cpu, Scissors } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const steps = [
  {
    icon: Camera,
    n: '01',
    title: 'Upload or Quiz',
    desc: 'Drop a clear headshot or answer 5 quick questions about your face, hair, and lifestyle.',
  },
  {
    icon: Cpu,
    n: '02',
    title: 'AI Analysis',
    desc: 'Gemini analyzes face shape, hair texture, and your preferences to rank 40+ taper styles.',
  },
  {
    icon: Scissors,
    n: '03',
    title: 'Barber-Ready Plan',
    desc: 'Get 3 ranked matches with on-face previews, guard sizes, and maintenance plans.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-oat/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase mb-3">
            How it works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-jet-black mb-4 tracking-tight">
            From photo to perfect taper in 60 seconds
          </h2>
          <p className="text-lg text-mocha max-w-2xl mx-auto">
            Three steps. Zero guesswork. The whole flow is built around decision intelligence,
            not generic style galleries.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={i * 0.1}>
              <div className="h-full p-8 bg-milk border border-border rounded-2xl hover:border-accent transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-display text-5xl font-extrabold text-oat">{s.n}</span>
                  <s.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-jet-black mb-3">
                  {s.title}
                </h3>
                <p className="text-mocha leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
