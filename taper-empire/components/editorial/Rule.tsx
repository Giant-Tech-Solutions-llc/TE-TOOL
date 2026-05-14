import { cn } from '@/lib/utils'

export function Rule({
  className,
  vertical = false,
  thickness = 1,
  tone = 'line',
}: {
  className?: string
  vertical?: boolean
  thickness?: 1 | 2
  tone?: 'soft' | 'line' | 'gold' | 'ink'
}) {
  const colorClass =
    tone === 'soft' ? 'bg-soft' :
    tone === 'gold' ? 'bg-gold' :
    tone === 'ink'  ? 'bg-ink'  : 'bg-line'
  const t = thickness === 2 ? (vertical ? 'w-[2px]' : 'h-[2px]') : vertical ? 'w-px' : 'h-px'
  return <div aria-hidden="true" className={cn(vertical ? `${t} self-stretch` : `${t} w-full`, colorClass, className)} />
}

export function Eyebrow({
  children,
  className,
  showRule = true,
  tone = 'gold',
}: {
  children: React.ReactNode
  className?: string
  showRule?: boolean
  tone?: 'gold' | 'mute' | 'soft'
}) {
  const color = tone === 'mute' ? 'text-mute' : tone === 'soft' ? 'text-soft' : 'text-gold'
  return (
    <p className={cn('flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.32em]', color, className)}>
      {showRule && <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />}
      {children}
    </p>
  )
}

export function Asterism({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-5 py-8 text-gold/60', className)} aria-hidden="true">
      <span className="h-px w-16 bg-line" />
      <span className="text-base tracking-[0.6em] leading-none">✦ ✦ ✦</span>
      <span className="h-px w-16 bg-line" />
    </div>
  )
}

export function ChapterNumber({ n, className }: { n: string | number; className?: string }) {
  return (
    <span
      className={cn(
        'font-display text-[12rem] sm:text-[16rem] leading-[0.85] font-extrabold tracking-[-0.04em] text-soft/[0.04] select-none pointer-events-none',
        className
      )}
      aria-hidden="true"
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}
