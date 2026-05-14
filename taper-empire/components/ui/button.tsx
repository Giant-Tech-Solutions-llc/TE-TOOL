'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Taper Empire Button — "Soft Tactile Pill"
 *
 * Visual aesthetic borrowed from premium apps (Apple / Aesop / Acne).
 * Every variant uses:
 *   1. Subtle vertical gradient to suggest top-lit material
 *   2. Stacked box-shadow — top inner highlight + bottom inner groove
 *      + outer ambient + close drop for tactile lift
 *   3. `:hover` brightens by 6–10%; `:active` depresses 1px with inset shadow
 *
 * Defaults to a rounded pill at `md` size with the dark `ink` variant.
 */
const buttonVariants = cva(
  [
    'group/btn relative inline-flex items-center justify-center gap-3 whitespace-nowrap',
    'font-semibold uppercase tracking-[0.20em] select-none',
    'transition-[filter,transform,box-shadow,border-color,background-color] duration-300 ease-out',
    'disabled:pointer-events-none disabled:opacity-40',
    '[&_svg]:size-4 [&_svg]:shrink-0',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
  ].join(' '),
  {
    variants: {
      variant: {
        /* ── INK · primary on dark surfaces (Subscribe-style reference) ─── */
        ink: [
          'text-soft',
          'bg-[linear-gradient(180deg,#2A2723_0%,#1E1B17_48%,#13110E_100%)]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.45),0_1px_0_rgba(255,255,255,0.04),0_10px_28px_rgba(0,0,0,0.55),0_3px_8px_rgba(0,0,0,0.4)]',
          'hover:brightness-[1.10] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.45),0_1px_0_rgba(255,255,255,0.05),0_14px_36px_rgba(0,0,0,0.6),0_4px_10px_rgba(0,0,0,0.45)]',
          'active:translate-y-px active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.55),inset_0_-1px_0_rgba(255,255,255,0.04),0_1px_2px_rgba(0,0,0,0.3)]',
        ].join(' '),

        /* ── CREAM · primary CTA, light pill on dark hero/results ──────── */
        cream: [
          'text-ink',
          'bg-[linear-gradient(180deg,#FAF7F2_0%,#EFEBE4_55%,#DCD7CD_100%)]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.14),0_1px_0_rgba(255,255,255,0.10),0_10px_28px_rgba(0,0,0,0.45),0_3px_8px_rgba(0,0,0,0.35)]',
          'hover:brightness-[1.03] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.16),0_1px_0_rgba(255,255,255,0.10),0_14px_36px_rgba(0,0,0,0.5),0_4px_10px_rgba(0,0,0,0.4)]',
          'active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18),inset_0_-1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.25)]',
        ].join(' '),

        /* ── GOLD · bronze accent for rare moments ─────────────────────── */
        gold: [
          'text-soft',
          'bg-[linear-gradient(180deg,#B49872_0%,#8F7A58_50%,#6B5640_100%)]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.32),0_1px_0_rgba(255,255,255,0.06),0_10px_28px_rgba(143,122,88,0.38),0_3px_8px_rgba(0,0,0,0.4)]',
          'hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.20),inset_0_-1px_0_rgba(0,0,0,0.32),0_1px_0_rgba(255,255,255,0.08),0_14px_36px_rgba(143,122,88,0.5),0_4px_10px_rgba(0,0,0,0.45)]',
          'active:translate-y-px active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.45),inset_0_-1px_0_rgba(255,255,255,0.10),0_1px_2px_rgba(0,0,0,0.3)]',
        ].join(' '),

        /* ── OUTLINE · hairline pill, no fill ──────────────────────────── */
        outline: [
          'text-soft bg-transparent border border-soft/25',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_16px_rgba(0,0,0,0.25),0_1px_0_rgba(255,255,255,0.04)]',
          'hover:border-soft/60 hover:bg-soft/[0.04] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_6px_22px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.05)]',
          'active:translate-y-px active:bg-soft/[0.02]',
        ].join(' '),

        /* ── GHOST · minimal pill, transparent ─────────────────────────── */
        ghost: [
          'text-mute bg-transparent',
          'hover:bg-soft/[0.06] hover:text-soft',
          'active:translate-y-px active:bg-soft/[0.03]',
        ].join(' '),

        /* ── LINK · editorial underline (overrides pill shape & casing) ──*/
        link: [
          'text-soft underline underline-offset-[6px] decoration-[1.5px]',
          'hover:decoration-gold hover:text-gold normal-case tracking-normal',
          '!shadow-none !rounded-none px-0 h-auto',
        ].join(' '),

        /* ── MOCHA · legacy alias → maps to gold for backwards-compat ─── */
        mocha: [
          'text-soft',
          'bg-[linear-gradient(180deg,#B49872_0%,#8F7A58_50%,#6B5640_100%)]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.32),0_1px_0_rgba(255,255,255,0.06),0_10px_28px_rgba(143,122,88,0.38),0_3px_8px_rgba(0,0,0,0.4)]',
          'hover:brightness-110',
          'active:translate-y-px',
        ].join(' '),
      },
      size: {
        sm:   'h-10 px-5 text-[10px]',
        md:   'h-12 px-7 text-[11px]',
        lg:   'h-14 px-9 text-[12px]',
        xl:   'h-16 px-12 text-sm',
        icon: 'h-12 w-12 p-0',
      },
      shape: {
        pill:    'rounded-full',
        rounded: 'rounded-xl',
        square:  'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'ink',
      size:    'md',
      shape:   'pill',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, shape, asChild = false, icon, loading, children, disabled, ...props },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size, shape, className }))

    // asChild mode — the caller provides the inner content; we just clone with our classes.
    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {icon && !loading && icon}
        {loading && (
          <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
            <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { buttonVariants }
