'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import type { QuizData } from '@/types'
import { Button } from '@/components/ui/button'

interface Option {
  value: string
  label: string
  desc: string
  /** Optional reference image displayed above the label */
  image?: string
  imageBlur?: string
  imageAlt?: string
}
interface Question { key: keyof QuizData; label: string; hint: string; options: Option[] }

const questions: Question[] = [
  {
    key: 'faceShape',
    label: "What's your face shape?",
    hint: 'Pull your hair back and look straight into a mirror',
    options: [
      {
        value: 'round',
        label: 'Round',
        desc: 'Full cheeks, equal width & length',
        image: '/quiz/faces/round.webp',
        imageBlur: '/quiz/faces/round-blur.webp',
        imageAlt: 'Round face reference portrait',
      },
      {
        value: 'oval',
        label: 'Oval',
        desc: 'Longer than wide, balanced jaw',
        image: '/quiz/faces/oval.webp',
        imageBlur: '/quiz/faces/oval-blur.webp',
        imageAlt: 'Oval face reference portrait',
      },
      {
        value: 'square',
        label: 'Square',
        desc: 'Strong jaw, defined corners',
        image: '/quiz/faces/square.webp',
        imageBlur: '/quiz/faces/square-blur.webp',
        imageAlt: 'Square face reference portrait',
      },
      {
        value: 'heart',
        label: 'Heart',
        desc: 'Wide forehead, narrow chin',
        image: '/quiz/faces/heart.webp',
        imageBlur: '/quiz/faces/heart-blur.webp',
        imageAlt: 'Heart face reference portrait',
      },
      {
        value: 'diamond',
        label: 'Diamond',
        desc: 'Wide cheekbones, narrow jaw',
        image: '/quiz/faces/diamond.webp',
        imageBlur: '/quiz/faces/diamond-blur.webp',
        imageAlt: 'Diamond face reference portrait',
      },
    ],
  },
  {
    key: 'hairType',
    label: "What's your hair texture?",
    hint: 'How it looks when it air-dries without any product',
    options: [
      { value: 'straight', label: 'Straight', desc: 'Lies flat, no natural wave' },
      { value: 'wavy',     label: 'Wavy',     desc: 'S-shaped waves, moderate volume' },
      { value: 'curly',    label: 'Curly',    desc: 'Defined springy coils' },
      { value: 'coily',    label: 'Coily',    desc: 'Tight zig-zag or dense coil' },
    ],
  },
  {
    key: 'lifestyle',
    label: 'How would you describe your lifestyle?',
    hint: 'Shapes how your taper should look day-to-day',
    options: [
      { value: 'professional', label: 'Professional', desc: 'Office, meetings, formal settings' },
      { value: 'casual',       label: 'Casual',       desc: 'Relaxed everyday comfort' },
      { value: 'creative',     label: 'Creative',     desc: 'Bold looks, self-expression' },
      { value: 'athletic',     label: 'Athletic',     desc: 'Active, function-first style' },
    ],
  },
  {
    key: 'age',
    label: 'What is your age range?',
    hint: 'Helps calibrate style formality and trend fit',
    options: [
      { value: 'teen', label: 'Teen', desc: '13–19' },
      { value: '20s',  label: '20s',  desc: '20–29' },
      { value: '30s',  label: '30s',  desc: '30–39' },
      { value: '40s+', label: '40s+', desc: '40 and over' },
    ],
  },
  {
    key: 'maintenance',
    label: 'How much upkeep can you commit to?',
    hint: 'Determines taper height and how sharp the blend looks',
    options: [
      { value: 'low',    label: 'Low effort',  desc: 'Cut every 4–6 weeks, minimal styling' },
      { value: 'medium', label: 'Some effort', desc: 'Trim every 3–4 weeks, quick styling' },
      { value: 'high',   label: 'High effort', desc: 'Weekly touch-ups, daily styling' },
    ],
  },
]

const initialQuiz: QuizData = { faceShape: null, hairType: null, lifestyle: null, age: null, maintenance: null }

interface QuizProps { onComplete: (data: QuizData) => void }

export function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<QuizData>(initialQuiz)
  const [advancing, setAdvancing] = useState(false)
  const advTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => () => { if (advTimer.current) clearTimeout(advTimer.current) }, [])

  const q = questions[step]
  const selected = data[q.key]

  const handleAnswer = (value: string) => {
    if (advancing) return
    const next = { ...data, [q.key]: value as any }
    setData(next)
    setAdvancing(true)
    advTimer.current = setTimeout(() => {
      setAdvancing(false)
      if (step < questions.length - 1) setStep((s) => s + 1)
      else onComplete(next)
    }, 380)
  }

  const handleBack = () => {
    if (step === 0) return
    if (advTimer.current) clearTimeout(advTimer.current)
    setAdvancing(false)
    setStep((s) => s - 1)
  }

  return (
    <div>
      {/* Editorial step progress */}
      <div className="flex justify-center items-center gap-3 mb-12">
        {questions.map((_, i) => {
          const done = i < step
          const active = i === step
          return (
            <motion.div
              key={i}
              animate={{ width: active ? 36 : done ? 18 : 6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`h-px ${done || active ? 'bg-gold' : 'bg-line'}`}
            />
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-12">
            <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold mb-4">
              Question {String(step + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
            </p>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-soft mb-4 tracking-[-0.025em] leading-[1.05]">
              {q.label}
            </h3>
            <p className="text-sm text-mute max-w-md mx-auto">{q.hint}</p>
          </div>

          <div
            className={`grid gap-3 max-w-4xl mx-auto
              ${q.options.length === 3 ? 'sm:grid-cols-3' : ''}
              ${q.options.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : ''}
              ${q.options.length === 5 ? 'sm:grid-cols-3 lg:grid-cols-5' : ''}
              grid-cols-1`}
          >
            {q.options.map((opt) => {
              const isSel = selected === opt.value
              return (
                <motion.button
                  key={opt.value}
                  type="button"
                  whileHover={{ y: advancing ? 0 : -3 }}
                  whileTap={{ scale: advancing ? 1 : 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleAnswer(opt.value)}
                  className={`group/opt relative text-left overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isSel
                      ? 'bg-surface2 text-soft border-gold/60 shadow-[0_8px_24px_rgba(0,0,0,0.4)]'
                      : 'bg-surface/60 hover:bg-surface2 text-soft border-line hover:border-soft/30 hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)]'
                  }`}
                >
                  {/* Reference portrait — shown when the option carries one (face shape question) */}
                  {opt.image && (
                    <div className="relative aspect-[4/5] overflow-hidden bg-ink/60 border-b border-line">
                      <Image
                        src={opt.image}
                        alt={opt.imageAlt ?? `${opt.label} reference`}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 30vw, 180px"
                        quality={90}
                        placeholder={opt.imageBlur ? 'blur' : 'empty'}
                        blurDataURL={opt.imageBlur}
                        className="object-cover object-center transition-transform duration-[1.4s] ease-out group-hover/opt:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,7,7,0.65) 100%)' }}
                      />
                    </div>
                  )}

                  <div className="relative p-6">
                    <div className={`absolute top-4 right-4 w-5 h-5 border rounded-full transition-colors ${
                      isSel ? 'bg-gold border-gold text-ink' : 'border-line'
                    } grid place-items-center`}>
                      {isSel && <Check className="w-3 h-3" strokeWidth={3} />}
                    </div>
                    <p className="font-display font-extrabold text-lg tracking-tight mb-2 pr-8">
                      {opt.label}
                    </p>
                    <p className="text-xs text-mute leading-relaxed">{opt.desc}</p>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {step > 0 && (
            <div className="text-center mt-12">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                ← Back
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
