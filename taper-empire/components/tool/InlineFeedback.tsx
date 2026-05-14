'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { submitFeedback, hasGivenFeedback, markFeedbackGiven } from '@/lib/api-client'
import type { Recommendation } from '@/types'
import { Button } from '@/components/ui/button'

const OPTIONS = [
  { value: 5, label: 'Extremely accurate', desc: 'I would book this cut today.' },
  { value: 4, label: 'Mostly accurate',    desc: 'Right direction, a few notes.' },
  { value: 2, label: 'Partially accurate', desc: 'Some pieces hit, others missed.' },
  { value: 1, label: 'Not a fit',          desc: 'Wrong call for me.' },
] as const

interface Props { recommendations: Recommendation[]; flow: string }

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
    } catch {}
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
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-y border-line py-12 lg:py-14"
      >
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-4 flex items-center gap-4">
              <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
              Recorded
            </p>
            <h3 className="font-display font-extrabold tracking-[-0.025em] leading-tight text-2xl lg:text-3xl">
              Filed — thank you.
            </h3>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pt-5">
            <p className="text-base text-soft/65 leading-[1.85] max-w-prose">
              Every response tunes the next iteration. The recommendation engine improves a
              little every time someone tells us where it missed.
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section aria-label="Feedback" className="border-y border-line py-12 lg:py-16">
      <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">

        <div className="col-span-12 lg:col-span-5">
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-5 flex items-center gap-4">
            <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
            Brief Feedback
          </p>
          <h3 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[clamp(2rem,4vw,3rem)] max-w-[18ch]">
            Did this feel accurate?
          </h3>
          <p className="mt-6 text-sm text-soft/65 leading-[1.85] max-w-md">
            One tap is enough. Your read is what tunes the next generation of recommendations.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <ul className="border-t border-line">
            {OPTIONS.map((opt) => {
              const selected = rating === opt.value
              return (
                <li key={opt.value} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className="w-full text-left py-5 lg:py-6 flex items-center gap-5 lg:gap-7 group transition-colors"
                  >
                    <span className={`w-5 h-5 border rounded-full flex-shrink-0 grid place-items-center transition-all duration-300 ${
                      selected ? 'border-gold bg-gold text-ink scale-110' : 'border-soft/30 group-hover:border-gold group-hover:scale-105'
                    }`}>
                      {selected && <Check className="w-3 h-3" strokeWidth={3} />}
                    </span>
                    <span className="flex-1 grid sm:grid-cols-[15rem_1fr] gap-1 sm:gap-7 items-baseline">
                      <span className={`font-display font-extrabold tracking-[-0.015em] text-lg lg:text-xl ${
                        selected ? 'text-soft' : 'text-soft group-hover:text-gold transition-colors'
                      }`}>
                        {opt.label}
                      </span>
                      <span className="text-sm text-soft/65">{opt.desc}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          {rating !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <label htmlFor="feedback-comment" className="block text-[10px] font-medium tracking-[0.32em] uppercase text-mute mb-4">
                Optional — What would improve this recommendation?
              </label>
              <textarea
                id="feedback-comment"
                ref={ref}
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 2000))}
                placeholder="Texture mismatch, style felt off, maintenance too aggressive…"
                rows={3}
                className="w-full p-4 bg-surface text-soft border border-line rounded-2xl focus:border-gold resize-y outline-none text-sm transition-colors min-h-[112px]"
              />
              <div className="flex justify-between items-center mt-5 gap-2 flex-wrap">
                <span className="text-[10px] tracking-[0.32em] uppercase text-mute tabular-nums">
                  {comment.length} / 2000
                </span>
                <Button
                  variant="cream"
                  size="md"
                  shape="pill"
                  onClick={handleSubmit}
                  disabled={submitting}
                  loading={submitting}
                >
                  {submitting ? 'Submitting' : comment.trim() ? 'Submit feedback' : 'Done'}
                  {!submitting && <span aria-hidden="true">→</span>}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
