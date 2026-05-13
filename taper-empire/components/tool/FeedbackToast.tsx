'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { submitFeedback, hasGivenFeedback, markFeedbackGiven } from '@/lib/api-client'
import type { Recommendation } from '@/types'

const OPTIONS = [
  { value: 5, label: 'Very accurate' },
  { value: 4, label: 'Decent match' },
  { value: 2, label: 'Not my style' },
  { value: 1, label: 'Needs improvement' },
] as const

const AUTO_DISMISS_MS = 9000

interface Props {
  recommendations: Recommendation[]
  flow: string
}

export function FeedbackToast({ recommendations, flow }: Props) {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(100)
  const triggered = useRef(false)
  const tickRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (hasGivenFeedback()) return
    const onLeave = (e: MouseEvent) => {
      if (triggered.current) return
      if (e.clientY <= 8 && !(e as any).relatedTarget) {
        triggered.current = true
        setOpen(true)
      }
    }
    const grace = setTimeout(() => document.addEventListener('mouseleave', onLeave), 2000)
    return () => {
      clearTimeout(grace)
      document.removeEventListener('mouseleave', onLeave)
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

  const handleSelect = async (value: number) => {
    if (tickRef.current) clearInterval(tickRef.current)
    setDone(true)
    markFeedbackGiven()
    try {
      await submitFeedback({
        rating: value, flow,
        recommendations: recommendations.map((r) => ({ style_name: r.style_name, match_score: r.match_score })),
      })
    } catch { /* noop */ }
    setTimeout(() => setOpen(false), 1800)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed bottom-6 right-6 z-50 w-[320px] max-w-[calc(100vw-3rem)] bg-milk border border-jet-black shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          {!done ? (
            <>
              <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-jet-black/15">
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.32em] uppercase text-mocha mb-1">
                    Before you go
                  </p>
                  <p className="text-sm font-semibold text-jet-black leading-snug">
                    Did the matches feel accurate?
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => setOpen(false)}
                  className="w-6 h-6 grid place-items-center text-mocha hover:text-jet-black transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
              <ul>
                {OPTIONS.map((opt) => (
                  <li key={opt.value} className="border-b border-jet-black/10 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className="w-full text-left px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-jet-black hover:bg-oat/60 hover:text-accent transition-colors flex items-center justify-between"
                    >
                      <span>{opt.label}</span>
                      <span aria-hidden="true" className="text-mocha">→</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="h-0.5 bg-oat overflow-hidden">
                <div
                  className="h-full bg-jet-black"
                  style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
                />
              </div>
            </>
          ) : (
            <div className="px-5 py-6 text-center">
              <div className="w-8 h-8 mx-auto mb-3 grid place-items-center bg-jet-black text-milk">
                <Check className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <p className="text-sm font-semibold text-jet-black">Recorded — thank you.</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
