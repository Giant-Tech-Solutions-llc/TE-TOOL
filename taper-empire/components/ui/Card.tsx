import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
}

const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' }

export function Card({ children, padding = 'md', hover, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'bg-milk border border-border rounded-2xl shadow-sm transition-all',
        paddings[padding],
        hover && 'hover:border-accent hover:-translate-y-1 hover:shadow-md cursor-pointer',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
