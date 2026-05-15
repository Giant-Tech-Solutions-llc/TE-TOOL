'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { easeLux } from '@/lib/motion'

interface SlideInProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  className?: string
}

export function SlideIn({ children, direction = 'up', delay = 0, className }: SlideInProps) {
  const offsets = {
    left:  { x: -56, y: 0 },
    right: { x: 56,  y: 0 },
    up:    { x: 0,   y: 56 },
    down:  { x: 0,   y: -56 },
  }
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, delay, ease: easeLux }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
