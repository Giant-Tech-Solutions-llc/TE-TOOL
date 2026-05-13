import { cn } from '@/lib/utils'

/**
 * Thin editorial hairline rule used to separate sections, columns, and gutters.
 * Defaults to horizontal — pass `vertical` for column dividers.
 */
export function Rule({
  className,
  vertical = false,
  thickness = 1,
  tone = 'ink',
}: {
  className?: string
  vertical?: boolean
  thickness?: 1 | 2
  tone?: 'ink' | 'muted' | 'cream'
}) {
  const colorClass = tone === 'ink' ? 'bg-jet-black' : tone === 'cream' ? 'bg-milk' : 'bg-jet-black/20'
  const t = thickness === 2 ? (vertical ? 'w-[2px]' : 'h-[2px]') : vertical ? 'w-px' : 'h-px'
  return (
    <div
      aria-hidden="true"
      className={cn(vertical ? `${t} self-stretch` : `${t} w-full`, colorClass, className)}
    />
  )
}

/**
 * "Eyebrow" — small caps label, often paired with a leading rule.
 * Like the dateline above a magazine headline.
 */
export function Eyebrow({
  children,
  className,
  showRule = true,
}: {
  children: React.ReactNode
  className?: string
  showRule?: boolean
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-jet-black',
        className
      )}
    >
      {showRule && <span aria-hidden="true" className="block h-px w-8 bg-jet-black" />}
      {children}
    </p>
  )
}

/**
 * ✦ ✦ ✦ — Editorial asterism / ornamental divider used between sub-sections.
 */
export function Asterism({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-4 text-mocha py-6', className)} aria-hidden="true">
      <span className="h-px w-12 bg-jet-black/30" />
      <span className="text-lg leading-none tracking-[0.6em]">✦ ✦ ✦</span>
      <span className="h-px w-12 bg-jet-black/30" />
    </div>
  )
}

/**
 * Numbered Section Marker — large display number used as a section anchor.
 * Used at the start of editorial "chapters" of the page.
 */
export function ChapterNumber({
  n,
  className,
}: {
  n: string | number
  className?: string
}) {
  return (
    <span
      className={cn(
        'font-display text-[12rem] sm:text-[16rem] leading-[0.85] font-extrabold tracking-[-0.04em] text-jet-black/[0.04] select-none pointer-events-none',
        className
      )}
      aria-hidden="true"
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}
