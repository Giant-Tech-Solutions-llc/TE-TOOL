import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/**
 * SectionEyebrow — the canonical "Chapter / Phase / Section" label.
 * Pairs a hairline bronze rule with tracked uppercase metadata.
 *
 * Reach for this whenever a section is being introduced. Sections that
 * adopt this pattern feel cohesive across the product without coordinated
 * design work.
 */

interface SectionEyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Visual tone — default is bronze (gold accent). */
  tone?: 'gold' | 'mute' | 'soft'
  /** Whether to show the leading hairline rule. Defaults to true. */
  rule?: boolean
}

const toneMap = {
  gold: 'text-gold',
  mute: 'text-mute',
  soft: 'text-soft',
}

export function SectionEyebrow({
  tone = 'gold',
  rule = true,
  className,
  children,
  ...rest
}: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-4 type-eyebrow',
        toneMap[tone],
        className
      )}
      {...rest}
    >
      {rule && <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />}
      <span>{children}</span>
    </p>
  )
}
