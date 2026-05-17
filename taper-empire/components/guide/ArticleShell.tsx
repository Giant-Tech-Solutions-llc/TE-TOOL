import { Cinematic } from '@/components/shared'
import { Breadcrumb } from './Breadcrumb'
import { StickyTOC } from './StickyTOC'
import { DirectAnswerBlock } from './DirectAnswerBlock'
import { RenderBlock } from './ContentBlock'
import { FAQBlock } from './FAQBlock'
import { RelatedReading } from './RelatedReading'
import { GuideCTA } from './GuideCTA'
import type { Article, ArticleSection } from '@/lib/guide/types'

interface ArticleShellProps {
  article: Article
  breadcrumbs: Array<{ label: string; href?: string }>
}

/**
 * Long-form article shell — sticky TOC on the left rail, content + CTAs
 * on the right. Server-rendered (the only client component is the TOC,
 * which observes scroll position).
 */
export function ArticleShell({ article, breadcrumbs }: ArticleShellProps) {
  const tocItems = article.sections.map((s) => ({ id: s.id, label: s.heading }))

  return (
    <section className="relative bg-ink text-soft border-t border-line grain-soft">
      <Cinematic className="pt-32 lg:pt-40 pb-28 lg:pb-36">
        <Breadcrumb items={breadcrumbs} />

        {/* ── Headline block ─────────────────────────────────────────── */}
        <header className="mt-10 lg:mt-12 mb-14 lg:mb-20 max-w-4xl">
          <p className="type-eyebrow text-gold mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
            {article.eyebrow}
          </p>
          <h1 className="font-display font-extrabold tracking-[-0.04em] text-[clamp(40px,5.4vw,72px)] leading-[1.02] mb-8">
            {article.title}
          </h1>
          <p className="text-soft/70 leading-[1.7] text-lg lg:text-xl max-w-3xl">
            {article.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-medium tracking-[0.32em] uppercase text-soft/55">
            <span>
              Updated{' '}
              <time dateTime={article.updatedAt} className="text-soft/80">
                {formatDate(article.updatedAt)}
              </time>
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <span>{article.readMinutes} min read</span>
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <span className="text-gold">Reviewed by Taper Empire research</span>
          </div>
        </header>

        {/* ── Body grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-y-16 lg:gap-x-12">
          {/* TOC rail */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
              <StickyTOC items={tocItems} />
            </div>
          </aside>

          {/* Main column */}
          <div className="col-span-12 lg:col-span-9 max-w-[720px]">
            <DirectAnswerBlock data={article.directAnswer} />

            <div className="mt-20 lg:mt-24 space-y-20 lg:space-y-24">
              {article.sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
              ))}
            </div>

            {article.faqs && article.faqs.length > 0 && (
              <section
                id="faq"
                className="mt-20 lg:mt-24 scroll-mt-32"
                aria-labelledby="article-faq-heading"
              >
                <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
                  <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
                  Frequently asked
                </p>
                <h2
                  id="article-faq-heading"
                  className="font-display font-extrabold tracking-[-0.03em] text-3xl lg:text-4xl leading-[1.05] mb-10"
                >
                  Quick answers to the obvious follow-ups.
                </h2>
                <FAQBlock faqs={article.faqs} />
              </section>
            )}

            <div className="mt-20 lg:mt-24">
              <GuideCTA />
            </div>

            {article.related && article.related.length > 0 && (
              <div className="mt-20 lg:mt-24">
                <RelatedReading items={article.related} />
              </div>
            )}
          </div>
        </div>
      </Cinematic>
    </section>
  )
}

function SectionRenderer({ section }: { section: ArticleSection }) {
  return (
    <section id={section.id} className="scroll-mt-32">
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
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
