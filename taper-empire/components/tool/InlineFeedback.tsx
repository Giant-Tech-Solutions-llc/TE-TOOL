'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Send, CheckCircle2 } from 'lucide-react'
import { submitFeedback, hasGivenFeedback, markFeedbackGiven } from '@/lib/api-client'
import type { Recommendation } from '@/types'

const RATINGS = [
  { value: 1, emoji: '😞', label: 'Way off' },
  { value: 2, emoji: '😕', label: 'Meh' },
  { value: 3, emoji: '🙂', label: 'Decent' },
  { value: 4, emoji: '😊', label: 'Great' },
  { value: 5, emoji: '🤩', label: 'Spot on' },
]

interface InlineFeedbackProps {
  recommendations: Recommendation[]
  flow: string
}

export function InlineFeedback({ recommendations, flow }: InlineFeedbackProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { if (hasGivenFeedback()) setSubmitted(true) }, [])
  useEffect(() => { if (rating !== null) ref.current?.focus({ preventScroll: true }) }, [rating])

  const handleRate = async (value: number) => {
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
        className="max-w-2xl mx-auto bg-oat/40 border border-border rounded-2xl p-6 text-center"
      >
        <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-3" />
        <h3 className="font-display text-xl font-bold mb-2">Thanks — your feedback shapes the next version.</h3>
        <p className="text-mocha">
          You&apos;re 1 of <strong className="text-jet-black">12,847+</strong> men this month who help us tune the recommendations.
        </p>
      </motion.div>
    )
  }

  return (
    <section aria-label="Feedback" className="max-w-2xl mx-auto bg-oat/40 border border-border rounded-2xl p-6 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-milk border border-border rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-3">
        <Heart className="w-3 h-3" fill="currentColor" /> 5 second favor
      </div>
      <h3 className="font-display text-xl font-bold mb-2">How accurate are these matches?</h3>
      <p className="text-mocha mb-5">Your honest take is what makes Taper Empire smarter — pick one.</p>

      <div role="radiogroup" className="flex justify-center gap-2 mb-5 flex-wrap">
        {RATINGS.map((opt) => {
          const active = (hover ?? rating) === opt.value
          const chosen = rating === opt.value
          return (
            <motion.button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={chosen}
              aria-label={opt.label}
              whileHover={{ y: -2, scale: 1.05 }}
              onMouseEnter={() => setHover(opt.value)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(opt.value)}
              onBlur={() => setHover(null)}
              onClick={() => handleRate(opt.value)}
              className={`min-w-[60px] px-3 py-2 border-2 rounded-xl transition-colors ${
                chosen ? 'bg-accent border-accent text-milk' : active ? 'bg-milk border-border' : 'bg-transparent border-border'
              }`}
            >
              <div className="text-2xl leading-none">{opt.emoji}</div>
              <div className={`text-xs font-semibold mt-1 ${chosen ? 'text-milk' : 'text-mocha'}`}>{opt.label}</div>
            </motion.button>
          )
        })}
      </div>

      {rating !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-left">
          <label htmlFor="feedback-comment" className="block text-sm font-semibold mb-2">
            One thing we could do better?{' '}
            <span className="text-taupe font-normal">(optional, but really helps)</span>
          </label>
          <textarea
            id="feedback-comment"
            ref={ref}
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 2000))}
            placeholder={rating <= 2 ? 'What missed the mark? Be brutally honest.' : 'What stood out? Anything you wish we showed you?'}
            rows={3}
            className="w-full p-3 bg-milk text-jet-black border border-border rounded-xl resize-y outline-none focus:border-accent transition-colors min-h-[88px]"
          />
          <div className="flex justify-between items-center mt-3 gap-2 flex-wrap">
            <span className="text-xs text-taupe">{comment.length}/2000</span>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-accent hover:bg-accent-hover text-milk px-6 py-3 rounded-xl text-base font-semibold inline-flex items-center gap-2 disabled:opacity-70"
            >
              <Send className="w-4 h-4" /> {submitting ? 'Sending…' : comment.trim() ? 'Send feedback' : 'Done'}
            </button>
          </div>
        </motion.div>
      )}
    </section>
  )
}
