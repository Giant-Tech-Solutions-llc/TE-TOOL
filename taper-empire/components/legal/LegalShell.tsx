import type { ReactNode } from 'react'
import { Cinematic } from '@/components/shared'

/**
 * LegalShell — shared layout for Privacy + Terms pages. Centered editorial
 * column with cinematic eyebrow + display headline + structured body. All
 * legal copy is plain prose (no marketing fluff) so it reads cleanly and
 * processes well for both humans and lawyers.
 */
interface LegalShellProps {
  eyebrow: string
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalShell({ eyebrow, title, lastUpdated, children }: LegalShellProps) {
  return (
    <section className="relative bg-ink text-soft border-t border-line grain-soft">
      <Cinematic className="pt-32 lg:pt-40 pb-28 lg:pb-36">
        <header className="mb-14 lg:mb-20 max-w-3xl">
          <p className="type-eyebrow text-gold mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
            {eyebrow}
          </p>
          <h1 className="font-display font-extrabold tracking-[-0.04em] text-[clamp(40px,5.5vw,72px)] leading-[1.02] mb-7">
            {title}
          </h1>
          <p className="type-eyebrow text-soft/55">
            Last updated · {lastUpdated}
          </p>
        </header>

        <article
          className="
            max-w-3xl text-soft/80 leading-[1.85] text-[15.5px] lg:text-base
            [&_h2]:font-display [&_h2]:font-extrabold [&_h2]:tracking-[-0.025em]
              [&_h2]:text-soft [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:mt-16 [&_h2]:mb-5 [&_h2]:scroll-mt-32
            [&_h3]:font-display [&_h3]:font-extrabold [&_h3]:tracking-[-0.02em]
              [&_h3]:text-soft [&_h3]:text-lg [&_h3]:lg:text-xl [&_h3]:mt-10 [&_h3]:mb-3
            [&_p]:mb-5
            [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:pl-1
            [&_li]:relative [&_li]:pl-6
            [&_li:before]:content-['—'] [&_li:before]:absolute [&_li:before]:left-0 [&_li:before]:top-0 [&_li:before]:text-gold/80
            [&_a]:text-gold [&_a]:underline [&_a]:decoration-gold/40 [&_a]:underline-offset-4
              [&_a:hover]:decoration-gold
            [&_strong]:text-soft [&_strong]:font-semibold
            [&_hr]:border-line [&_hr]:my-12
          "
        >
          {children}
        </article>
      </Cinematic>
    </section>
  )
}
