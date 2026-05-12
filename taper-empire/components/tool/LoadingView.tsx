'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  'Analyzing your inputs…',
  'Scoring 40+ taper styles…',
  'Matching face shape to taper height…',
  'Calibrating for hair texture…',
  'Checking lifestyle alignment…',
  'Generating AI style previews…',
  'Ranking your top matches…',
  'Finalizing recommendations…',
  'Almost ready…',
]

interface LoadingViewProps { mode: 'photo' | 'quiz' }

export function LoadingView({ mode }: LoadingViewProps) {
  const [msgIdx, setMsgIdx] = useState(0)
  const [progress, setProgress] = useState(4)

  useEffect(() => {
    const DURATION = 36000
    const MAX = 87
    const start = Date.now()
    const tick = setInterval(() => {
      const t = Math.min((Date.now() - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 2)
      setProgress(Math.round(4 + eased * (MAX - 4)))
      if (t >= 1) clearInterval(tick)
    }, 400)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    const cycle = setInterval(() => {
      setMsgIdx((p) => (p + 1) % MESSAGES.length)
    }, 3200)
    return () => clearInterval(cycle)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[60vh]"
    >
      {/* Dual ring spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-[3px] border-border" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-accent"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border-2 border-transparent border-t-taupe"
        />
      </div>

      <h3 className="font-display text-3xl font-bold text-jet-black mb-3 tracking-tight">
        Building your taper plan
      </h3>

      <div className="h-7 mb-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-mocha"
          >
            {MESSAGES[msgIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-sm">
        <div className="h-1.5 bg-oat rounded-full overflow-hidden mb-2">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
            className="h-full bg-accent rounded-full"
          />
        </div>
        <div className="flex justify-between text-xs text-taupe">
          <span>{mode === 'photo' ? 'AI face analysis + previews' : 'Style matching + previews'}</span>
          <span>{progress}%</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-taupe">Typically takes 20–40 seconds</p>
    </motion.div>
  )
}
