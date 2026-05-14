'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { submitFeedback, hasGivenFeedback, markFeedbackGiven } from '@/lib/api-client'
import type { Recommendation } from '@/types'

const OPTIONS = [
  { value: 5, label: 'Extremely accurate' },
  { value: 4, label: 'Mostly accurate' },
  { value: 2, label: 'Partially accurate' },
  { value: 1, label: 'Not a fit' },
] as const

const AUTO_DISMISS_MS = 9000

interface Props { recommendations: Recommendation[]; flow: string }

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
    return () => { clearTimeout(grace); document.removeEventListener('mouseleave', onLeave) }
  }, [])

  useEffect(() => {
    if (!open || done) return
    const start = Date.now()
    tickRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.max(0, 100 - (elapsed / AUTO_DISMISS_MS) * 100)
      setProgress(pct)
      if (pct <= 0) { if (tickRef.current) clearInterval(tickRef.current); setOpen(false) }
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
    } catch {}
    setTimeout(() => setOpen(false), 1800)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 w-[340px] max-w-[calc(100vw-3rem)] bg-surface border border-line rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {!done ? (
            <>
              <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-line">
                <div>
                  <p className="text-[9px] font-medium tracking-[0.4em] uppercase text-gold mb-2">
                    Before you go
                  </p>
                  <p className="text-sm font-semibold text-soft leading-snug">
                    Did this feel accurate?
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => setOpen(false)}
                  className="w-6 h-6 grid place-items-center text-mute hover:text-soft transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
              <ul>
                {OPTIONS.map((opt) => (
                  <li key={opt.value} className="border-b border-line last:border-b-0">
                    <button
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className="w-full text-left px-5 py-3 text-xs font-medium tracking-[0.18em] uppercase text-soft/80 hover:bg-surface2 hover:text-gold transition-colors flex items-center justify-between"
                    >
                      <span>{opt.label}</span>
                      <span aria-hidden="true" className="text-mute">→</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="h-px bg-line overflow-hidden">
                <div className="h-full bg-gold" style={{ width: `${progress}%`, transition: 'width 80ms linear' }} />
              </div>
            </>
          ) : (
            <div className="px-5 py-7 text-center">
              <div className="w-9 h-9 mx-auto mb-3 grid place-items-center bg-gold text-ink rounded-full">
                <Check className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <p className="text-sm font-semibold text-soft">Recorded — thank you.</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
