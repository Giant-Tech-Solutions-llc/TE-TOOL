'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { easeLux } from '@/lib/motion'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.9, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: easeLux }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
