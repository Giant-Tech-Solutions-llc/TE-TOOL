'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import type { QuizData } from '@/types'
import { Button } from '@/components/ui/Button'

interface Option { value: string; label: string; desc: string }
interface Question { key: keyof QuizData; label: string; hint: string; options: Option[] }

const questions: Question[] = [
  {
    key: 'faceShape',
    label: "What's your face shape?",
    hint: 'Pull your hair back and look straight into a mirror',
    options: [
      { value: 'round',   label: 'Round',   desc: 'Full cheeks, equal width & length' },
      { value: 'oval',    label: 'Oval',    desc: 'Longer than wide, balanced jaw' },
      { value: 'square',  label: 'Square',  desc: 'Strong jaw, defined corners' },
      { value: 'heart',   label: 'Heart',   desc: 'Wide forehead, narrow chin' },
      { value: 'diamond', label: 'Diamond', desc: 'Wide cheekbones, narrow jaw' },
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

const initialQuiz: QuizData = {
  faceShape: null, hairType: null, lifestyle: null, age: null, maintenance: null,
}

interface QuizProps {
  onComplete: (data: QuizData) => void
}

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
      {/* Dot-pill progress */}
      <div className="flex justify-center items-center gap-2 mb-8">
        {questions.map((_, i) => {
          const done = i < step
          const active = i === step
          return (
            <motion.div
              key={i}
              animate={{ width: active ? 28 : done ? 16 : 6 }}
              transition={{ duration: 0.3 }}
              className={`h-1.5 rounded-full ${done || active ? 'bg-accent' : 'bg-border'}`}
            />
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-widest text-taupe uppercase mb-2">
              Question {step + 1} of {questions.length}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-jet-black mb-2 tracking-tight">
              {q.label}
            </h3>
            <p className="text-sm text-mocha">{q.hint}</p>
          </div>

          <div
            className={`grid gap-3 max-w-3xl mx-auto
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
                  whileHover={{ scale: advancing ? 1 : 1.02 }}
                  whileTap={{ scale: advancing ? 1 : 0.98 }}
                  onClick={() => handleAnswer(opt.value)}
                  className={`relative text-center p-4 border-2 rounded-xl transition-colors
                    ${isSel ? 'border-accent bg-oat/50' : 'border-border bg-milk hover:border-accent'}`}
                >
                  {isSel && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-3 h-3 text-milk" strokeWidth={3} />
                    </div>
                  )}
                  <p className="font-semibold text-jet-black text-sm mb-1 pr-4">{opt.label}</p>
                  <p className={`text-xs leading-relaxed ${isSel ? 'text-mocha' : 'text-taupe'}`}>
                    {opt.desc}
                  </p>
                </motion.button>
              )
            })}
          </div>

          {step > 0 && (
            <div className="text-center mt-8">
              <Button variant="ghost" size="sm" onClick={handleBack} icon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
