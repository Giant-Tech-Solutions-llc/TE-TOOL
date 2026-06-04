import Link from 'next/link'

interface Crumb {
  label: string
  /** Absolute path. The last crumb is rendered as plain text (current page). */
  href?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[10px] font-medium tracking-[0.32em] uppercase">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-soft/55">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link href={c.href} className="hover:text-gold transition-colors duration-300">
                  {c.label}
                </Link>
              ) : (
                <span className={last ? 'text-soft/80' : ''}>{c.label}</span>
              )}
              {!last && <span aria-hidden="true" className="text-soft/30">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
