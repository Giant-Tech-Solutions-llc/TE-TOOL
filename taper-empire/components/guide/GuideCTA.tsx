import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface GuideCTAProps {
  heading?: string
  body?: string
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
}

/**
 * Conversion handoff placed at the end of guide articles. Keeps the hub
 * authoritative while still funneling intent into /tool.
 */
export function GuideCTA({
  heading = 'Stop guessing. Get a barber-ready brief.',
  body = 'Sixty seconds, three matches, full taper geometry, maintenance plan, and the exact language to use at the chair.',
  primary = { href: '/tool', label: 'Analyze Your Face Structure' },
  secondary,
}: GuideCTAProps) {
  return (
    <aside className="relative overflow-hidden rounded-hero border border-line bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)] p-8 lg:p-12">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />
      <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        Move from theory to brief
      </p>
      <h2 className="font-display font-extrabold tracking-[-0.03em] text-soft text-3xl lg:text-[40px] leading-[1.05] mb-5 max-w-2xl">
        {heading}
      </h2>
      <p className="text-soft/70 leading-[1.8] text-base lg:text-lg mb-8 max-w-2xl">{body}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="cream" size="lg" shape="pill">
          <Link href={primary.href}>
            {primary.label}
            <span aria-hidden="true">→</span>
          </Link>
        </Button>
        {secondary && (
          <Button asChild variant="outline" size="lg" shape="pill">
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        )}
      </div>
    </aside>
  )
}
