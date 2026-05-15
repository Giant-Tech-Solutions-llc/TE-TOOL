import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Container primitives — Phase 01 foundation
 *
 * Every section in the Taper Empire ecosystem should use one of these.
 * The width determines the layout pacing — varying width across sections
 * creates the cinematic rhythm the design system calls for.
 *
 *   <Cinematic>  full visual moments (hero, results, immersive sections)
 *   <Editorial>  default content blocks (most sections)
 *   <Reading>    long-form narrow text (manifesto, FAQ body, guide hub)
 */

type Variant = 'cinematic' | 'editorial' | 'reading'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside' | 'nav'
  variant?: Variant
  /** Section vertical padding — defaults to 'standard' (140px). */
  section?: 'none' | 'compact' | 'standard'
}

const variantMap: Record<Variant, string> = {
  cinematic: 'container-cinematic',
  editorial: 'container-editorial',
  reading:   'container-reading',
}

const sectionMap = {
  none:     '',
  compact:  'section-y-compact',
  standard: 'section-y',
}

const ContainerComp = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Tag = 'div', variant = 'editorial', section = 'none', className, children, ...rest }, ref) => {
    const Component: any = Tag
    return (
      <Component
        ref={ref}
        className={cn(variantMap[variant], sectionMap[section], className)}
        {...rest}
      >
        {children}
      </Component>
    )
  }
)
ContainerComp.displayName = 'Container'

export const Container = ContainerComp

export const Cinematic = forwardRef<HTMLDivElement, Omit<ContainerProps, 'variant'>>((p, ref) => (
  <ContainerComp ref={ref} variant="cinematic" {...p} />
))
Cinematic.displayName = 'Cinematic'

export const Editorial = forwardRef<HTMLDivElement, Omit<ContainerProps, 'variant'>>((p, ref) => (
  <ContainerComp ref={ref} variant="editorial" {...p} />
))
Editorial.displayName = 'Editorial'

export const Reading = forwardRef<HTMLDivElement, Omit<ContainerProps, 'variant'>>((p, ref) => (
  <ContainerComp ref={ref} variant="reading" {...p} />
))
Reading.displayName = 'Reading'
