'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { staggerParent, staggerChild } from '@/lib/motion'

interface StaggerProps {
  children: ReactNode
  className?: string
  /** Delay between each child reveal in seconds. Default 0.1. */
  stagger?: number
  /** Delay before the first child reveal. Default 0.05. */
  delayChildren?: number
}

export function StaggerContainer({
  children, className, stagger = 0.1, delayChildren = 0.05,
}: StaggerProps) {
  return (
    <motion.div
      variants={staggerParent(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  )
}
