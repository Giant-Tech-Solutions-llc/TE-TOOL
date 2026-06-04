'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  label: string
}

/**
 * Sticky TOC — left-rail navigation that highlights the current section
 * via IntersectionObserver. Hidden on mobile (the article body remains
 * the canonical reading order on small screens).
 */
export function StickyTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    if (!items.length) return
    const elements = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav aria-label="On this page" className="text-[11px]">
      <p className="font-medium tracking-[0.32em] uppercase text-gold mb-5 flex items-center gap-3">
        <span aria-hidden="true" className="block h-px w-8 bg-gold/70" />
        On this page
      </p>
      <ol className="space-y-3">
        {items.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                className={`block pl-4 leading-[1.5] transition-colors duration-300 ease-lux ${
                  active ? 'text-soft' : 'text-soft/55 hover:text-soft/85'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 h-3 w-[2px] rounded-full transition-colors duration-300 ease-lux ${
                    active ? 'bg-gold' : 'bg-line'
                  }`}
                />
                {item.label}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
