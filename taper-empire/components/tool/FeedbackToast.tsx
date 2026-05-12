'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitFeedback, hasGivenFeedback, markFeedbackGiven } from '@/lib/api-client'
import type { Recommendation } from '@/types'

const RATINGS = [
  { value: 1, emoji: '😞' },
  { value: 2, emoji: '😕' },
  { value: 3, emoji: '🙂' },
  { value: 4, emoji: '😊' },
  { value: 5, emoji: '🤩' },
]

const AUTO_DISMISS_MS = 7000

interface FeedbackToastProps {
  recommendations: Recommendation[]
  flow: string
}

export function FeedbackToast({ recommendations, flow }: FeedbackToastProps) {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(100)
  const triggered = useRef(false)
  const tickRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (hasGivenFeedback()) return

    const onMouseLeave = (e: MouseEvent) => {
      if (triggered.current) return
      if (e.clientY <= 8 && !(e as any).relatedTarget) {
        triggered.current = true
        setOpen(true)
      }
    }

    const grace = setTimeout(() => {
      document.addEventListener('mouseleave', onMouseLeave)
    }, 1500)

    return () => {
      clearTimeout(grace)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!open || done) return
    const start = Date.now()
    tickRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.max(0, 100 - (elapsed / AUTO_DISMISS_MS) * 100)
      setProgress(pct)
      if (pct <= 0) {
        if (tickRef.current) clearInterval(tickRef.current)
        setOpen(false)
      }
    }, 80)
    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [open, done])

  const handleRate = async (value: number) => {
    if (tickRef.current) clearInterval(tickRef.current)
    setDone(true)
    markFeedbackGiven()
    try {
      await submitFeedback({
        rating: value,
        flow,
        recommendations: recommendations.map((r) => ({ style_name: r.style_name, match_score: r.match_score })),
      })
    } catch { /* noop */ }
    setTimeout(() => setOpen(false), 1500)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.34, 1.2, 0.64, 1] }}
          className="fixed bottom-6 right-6 z-50 w-72 max-w-[calc(100vw-3rem)] bg-milk border border-border rounded-2xl shadow-xl overflow-hidden"
        >
          {!done ? (
            <div className="px-5 pt-4 pb-3">
              <p className="font-semibold text-jet-black text-sm">How well did we match you?</p>
              <p className="text-xs text-taupe mb-4">One tap · no signup · helps us improve</p>
              <div className="flex gap-2 justify-between mb-4">
                {RATINGS.map((r) => (
                  <motion.button
                    key={r.value}
                    whileHover={{ scale: 1.18, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRate(r.value)}
                    className="flex-1 border border-border rounded-lg py-2 text-xl hover:border-accent transition-colors"
                  >
                    {r.emoji}
                  </motion.button>
                ))}
              </div>
              <div className="h-0.5 bg-oat rounded-full overflow-hidden">
                <div
                  className="h-full bg-border"
                  style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
                />
              </div>
            </div>
          ) : (
            <div className="px-5 py-5 text-center">
              <div className="text-3xl mb-1">🙏</div>
              <p className="text-sm font-semibold text-jet-black">Thanks — that helps.</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
