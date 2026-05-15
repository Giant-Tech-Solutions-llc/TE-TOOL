'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { easeLux } from '@/lib/motion'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Vertical offset for entrance — default 40 (px). */
  y?: number
}

export function ScrollReveal({ children, className, delay = 0, y = 40 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: easeLux }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
