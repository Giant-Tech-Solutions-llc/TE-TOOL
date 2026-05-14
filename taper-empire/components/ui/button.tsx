'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.08em] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Solid ink — primary action, magazine masthead vibe
        ink: 'bg-jet-black text-milk hover:bg-charcoal active:translate-y-px',
        // Solid mocha accent
        mocha: 'bg-accent text-milk hover:bg-accent-hover active:translate-y-px',
        // Editorial outlined button — works on dark surfaces
        outline: 'border border-soft/30 bg-transparent text-soft hover:bg-soft hover:text-ink hover:border-soft',
        // Inverted — for dark surfaces
        cream: 'bg-milk text-jet-black hover:bg-oat active:translate-y-px',
        // Subtle ghost
        ghost: 'text-mute hover:bg-surface2 hover:text-soft',
        // Editorial link
        link: 'text-soft underline underline-offset-[6px] decoration-[1.5px] hover:decoration-gold hover:text-gold normal-case tracking-normal',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-sm',
        xl: 'h-16 px-10 text-base',
        icon: 'h-10 w-10',
      },
      shape: {
        square: 'rounded-none',
        rounded: 'rounded-md',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'ink',
      size: 'md',
      shape: 'square',
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
  ({ className, variant, size, shape, asChild = false, icon, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, shape, className }))}
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
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { buttonVariants }
