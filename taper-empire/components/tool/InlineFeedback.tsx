'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { submitFeedback, hasGivenFeedback, markFeedbackGiven } from '@/lib/api-client'
import type { Recommendation } from '@/types'

const OPTIONS = [
  { value: 5, label: 'Very accurate',     desc: 'Spot on — I would book this cut.' },
  { value: 4, label: 'Decent match',      desc: 'Mostly right, with a few tweaks.' },
  { value: 2, label: 'Not my style',      desc: 'Wrong direction for me.' },
  { value: 1, label: 'Needs improvement', desc: 'Missed the brief entirely.' },
] as const

interface Props {
  recommendations: Recommendation[]
  flow: string
}

export function InlineFeedback({ recommendations, flow }: Props) {
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { if (hasGivenFeedback()) setSubmitted(true) }, [])
  useEffect(() => { if (rating !== null) ref.current?.focus({ preventScroll: true }) }, [rating])

  const handleSelect = async (value: number) => {
    setRating(value)
    markFeedbackGiven()
    try {
      await submitFeedback({
        rating: value, comment: '', flow,
        recommendations: recommendations.map((r) => ({ style_name: r.style_name, match_score: r.match_score })),
      })
    } catch { /* noop */ }
  }

  const handleSubmit = async () => {
    if (rating === null || submitting) return
    setSubmitting(true)
    await submitFeedback({
      rating, comment, flow,
      recommendations: recommendations.map((r) => ({ style_name: r.style_name, match_score: r.match_score })),
    })
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-y-2 border-jet-black py-10"
      >
        <div className="grid grid-cols-12 gap-y-6 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-8 bg-jet-black" />
              Recorded
            </p>
            <h3 className="font-display font-extrabold tracking-[-0.02em] leading-tight text-2xl lg:text-3xl">
              Filed — thank you.
            </h3>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pt-4">
            <p className="text-base text-mocha leading-[1.7] max-w-prose">
              Every response tunes the next iteration. The recommendation engine improves a little
              every time someone like you tells us where it missed.
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section aria-label="Feedback" className="border-y-2 border-jet-black py-10 lg:py-12">
      <div className="grid grid-cols-12 gap-y-8 lg:gap-x-10">

        <div className="col-span-12 lg:col-span-5">
          <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-8 bg-jet-black" />
            Editorial Feedback
          </p>
          <h3 className="font-display font-extrabold tracking-[-0.025em] leading-[0.95] text-[clamp(1.875rem,3.5vw,2.75rem)] max-w-[16ch]">
            Did this recommendation feel accurate?
          </h3>
          <p className="mt-5 text-sm text-mocha leading-[1.7] max-w-md">
            One tap is enough. Your read is what tunes the next generation of recommendations.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <ul className="border-t border-jet-black/15">
            {OPTIONS.map((opt) => {
              const selected = rating === opt.value
              return (
                <li key={opt.value} className="border-b border-jet-black/15">
                  <button
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className="w-full text-left py-4 lg:py-5 flex items-center gap-4 lg:gap-6 group transition-colors"
                  >
                    <span className={`w-5 h-5 border-2 flex-shrink-0 grid place-items-center transition-colors ${
                      selected ? 'border-jet-black bg-jet-black text-milk' : 'border-jet-black/30 group-hover:border-jet-black'
                    }`}>
                      {selected && <Check className="w-3 h-3" strokeWidth={3} />}
                    </span>
                    <span className="flex-1 grid sm:grid-cols-[14rem_1fr] gap-1 sm:gap-6 items-baseline">
                      <span className={`font-display font-extrabold tracking-[-0.01em] text-lg lg:text-xl ${
                        selected ? 'text-jet-black' : 'text-jet-black group-hover:text-accent transition-colors'
                      }`}>
                        {opt.label}
                      </span>
                      <span className="text-sm text-mocha">{opt.desc}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          {rating !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <label htmlFor="feedback-comment" className="block text-[10px] font-semibold tracking-[0.28em] uppercase text-mocha mb-3">
                Optional — What felt off about the recommendation?
              </label>
              <textarea
                id="feedback-comment"
                ref={ref}
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 2000))}
                placeholder="Texture didn't match, style felt off, maintenance too aggressive…"
                rows={3}
                className="w-full p-4 bg-milk text-jet-black border border-jet-black/30 focus:border-jet-black resize-y outline-none text-sm transition-colors min-h-[96px]"
              />
              <div className="flex justify-between items-center mt-4 gap-2 flex-wrap">
                <span className="text-[10px] tracking-[0.22em] uppercase text-mocha tabular-nums">
                  {comment.length} / 2000
                </span>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-3 bg-jet-black text-milk px-6 h-11 text-xs font-semibold tracking-[0.18em] uppercase hover:bg-charcoal disabled:opacity-60 transition-colors"
                >
                  <span>{submitting ? 'Submitting' : comment.trim() ? 'Submit feedback' : 'Done'}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
