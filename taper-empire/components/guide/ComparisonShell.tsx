import { Cinematic } from '@/components/shared'
import { Breadcrumb } from './Breadcrumb'
import { DirectAnswerBlock } from './DirectAnswerBlock'
import { RenderBlock } from './ContentBlock'
import { FAQBlock } from './FAQBlock'
import { RelatedReading } from './RelatedReading'
import { GuideCTA } from './GuideCTA'
import type { Comparison } from '@/lib/guide/types'

interface ComparisonShellProps {
  comparison: Comparison
  breadcrumbs: Array<{ label: string; href?: string }>
}

/**
 * Comparison shell — designed for /guide/compare/* pages. Leads with a
 * side-by-side verdict block, then drops into the long-form sections.
 */
export function ComparisonShell({ comparison, breadcrumbs }: ComparisonShellProps) {
  return (
    <section className="relative bg-ink text-soft border-t border-line grain-soft">
      <Cinematic className="pt-32 lg:pt-40 pb-28 lg:pb-36">
        <Breadcrumb items={breadcrumbs} />

        <header className="mt-10 lg:mt-12 mb-14 lg:mb-20 max-w-4xl">
          <p className="type-eyebrow text-gold mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
            {comparison.eyebrow}
          </p>
          <h1 className="font-display font-extrabold tracking-[-0.04em] text-[clamp(40px,5.4vw,72px)] leading-[1.02] mb-8">
            {comparison.title}
          </h1>
          <p className="text-soft/70 leading-[1.7] text-lg lg:text-xl max-w-3xl">
            {comparison.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-medium tracking-[0.32em] uppercase text-soft/55">
            <span>
              Updated{' '}
              <time dateTime={comparison.updatedAt} className="text-soft/80">
                {formatDate(comparison.updatedAt)}
              </time>
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <span>Decision brief</span>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-y-16 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-9 lg:col-start-2 max-w-[860px]">
            <DirectAnswerBlock data={comparison.directAnswer} />

            {/* ── Verdict + side-by-side comparison table ────────────── */}
            <section
              id="verdict"
              className="mt-20 lg:mt-24 scroll-mt-32"
              aria-labelledby="verdict-heading"
            >
              <p className="type-eyebrow text-gold mb-4 flex items-center gap-3">
                <span aria-hidden="true" className="block h-px w-8 bg-gold/70" />
                Verdict
              </p>
              <h2
                id="verdict-heading"
                className="font-display font-extrabold tracking-[-0.03em] text-3xl lg:text-4xl leading-[1.05] mb-8"
              >
                {comparison.verdict}
              </h2>

              <div className="rounded-lg-x border border-line bg-surface/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[14.5px]">
                    <thead>
                      <tr className="border-b border-line">
                        <th
                          scope="col"
                          className="px-6 lg:px-8 py-5 text-[10px] font-medium tracking-[0.32em] uppercase text-gold w-1/3"
                        >
                          Attribute
                        </th>
                        <th
                          scope="col"
                          className="px-6 lg:px-8 py-5 text-[10px] font-medium tracking-[0.32em] uppercase text-soft/85"
                        >
                          {comparison.leftLabel}
                        </th>
                        <th
                          scope="col"
                          className="px-6 lg:px-8 py-5 text-[10px] font-medium tracking-[0.32em] uppercase text-soft/85"
                        >
                          {comparison.rightLabel}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.attributes.map((row) => (
                        <tr key={row.attribute} className="border-b border-line/60 last:border-b-0">
                          <td className="px-6 lg:px-8 py-5 align-top text-soft font-display font-extrabold tracking-[-0.02em] text-base">
                            {row.attribute}
                          </td>
                          <td className="px-6 lg:px-8 py-5 align-top leading-[1.65] text-soft/75">
                            {row.left}
                          </td>
                          <td className="px-6 lg:px-8 py-5 align-top leading-[1.65] text-soft/75">
                            {row.right}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <div className="mt-20 lg:mt-24 space-y-20 lg:space-y-24">
              {comparison.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  {section.eyebrow && (
                    <p className="type-eyebrow text-gold mb-4 flex items-center gap-3">
                      <span aria-hidden="true" className="block h-px w-8 bg-gold/70" />
                      {section.eyebrow}
                    </p>
                  )}
                  <h2 className="font-display font-extrabold tracking-[-0.03em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] mb-8 lg:mb-10">
                    {section.heading}
                  </h2>
                  <div className="space-y-8">
                    {section.blocks.map((block, i) => (
                      <RenderBlock key={i} block={block} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {comparison.faqs && comparison.faqs.length > 0 && (
              <section id="faq" className="mt-20 lg:mt-24 scroll-mt-32">
                <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
                  <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
                  Frequently asked
                </p>
                <h2 className="font-display font-extrabold tracking-[-0.03em] text-3xl lg:text-4xl leading-[1.05] mb-10">
                  Quick answers to the obvious follow-ups.
                </h2>
                <FAQBlock faqs={comparison.faqs} />
              </section>
            )}

            <div className="mt-20 lg:mt-24">
              <GuideCTA />
            </div>

            {comparison.related && comparison.related.length > 0 && (
              <div className="mt-20 lg:mt-24">
                <RelatedReading items={comparison.related} />
              </div>
            )}
          </div>
        </div>
      </Cinematic>
    </section>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
