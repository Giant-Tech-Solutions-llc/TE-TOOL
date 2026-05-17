import Link from 'next/link'
import type { ArticleRelated } from '@/lib/guide/types'

export function RelatedReading({
  heading = 'Related reading',
  eyebrow = 'Continue the brief',
  items,
}: {
  heading?: string
  eyebrow?: string
  items: ArticleRelated[]
}) {
  if (!items?.length) return null
  return (
    <section className="border-t border-line pt-16 lg:pt-20">
      <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        {eyebrow}
      </p>
      <h2 className="font-display font-extrabold tracking-[-0.03em] text-soft text-3xl lg:text-4xl leading-[1.05] mb-10 lg:mb-12">
        {heading}
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group/related block h-full rounded-lg-x border border-line bg-surface/30 p-6 lg:p-7 transition-all duration-500 ease-lux hover:border-lineHover hover:bg-surface/60 hover:-translate-y-1 hover:shadow-luxury-sm"
            >
              <p className="font-display font-extrabold tracking-[-0.025em] text-soft text-lg lg:text-xl leading-[1.25] mb-3 group-hover/related:text-gold transition-colors duration-300">
                {item.label}
              </p>
              <p className="text-soft/65 leading-[1.7] text-[14.5px] mb-6">
                {item.hook}
              </p>
              <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.32em] uppercase text-gold">
                Read brief
                <span aria-hidden="true" className="transition-transform duration-300 group-hover/related:translate-x-1">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
