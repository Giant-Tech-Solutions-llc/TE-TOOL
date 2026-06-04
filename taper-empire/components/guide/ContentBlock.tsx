import type { ContentBlock } from '@/lib/guide/types'

/**
 * Generic dispatch renderer for the structured content blocks used inside
 * an article section. Server-rendered so every paragraph, list item, and
 * cell is part of the static HTML the crawler sees.
 */
export function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'prose':
      return <ProseBlock paragraphs={block.paragraphs} />
    case 'checklist':
      return <ChecklistBlock intro={block.intro} items={block.items} />
    case 'table':
      return <ComparisonTable intro={block.intro} columns={block.columns} rows={block.rows} />
    case 'howto':
      return <HowToBlock intro={block.intro} steps={block.steps} />
    case 'callout':
      return <CalloutBlock tone={block.tone} heading={block.heading} body={block.body} />
    case 'quote':
      return <QuoteBlock body={block.body} attribution={block.attribution} />
    case 'pair':
      return <PairBlock left={block.left} right={block.right} />
  }
}

/* ─────────────────────────────────────────────────────────────── */

function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-5 text-soft/80 leading-[1.85] text-[16.5px]">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}

function ChecklistBlock({ intro, items }: { intro?: string; items: string[] }) {
  return (
    <div className="rounded-lg-x border border-line bg-surface/30 p-7 lg:p-9">
      {intro && (
        <p className="text-soft/75 leading-[1.8] text-[15.5px] mb-6">{intro}</p>
      )}
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-4 text-soft/85 leading-[1.7] text-[15px]">
            <span
              aria-hidden="true"
              className="mt-[7px] grid h-4 w-4 shrink-0 place-items-center rounded-full border border-gold/60 text-gold"
            >
              <svg viewBox="0 0 12 12" width="8" height="8" fill="none">
                <path d="M2 6.2 4.6 9 10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ComparisonTable({
  intro,
  columns,
  rows,
}: {
  intro?: string
  columns: string[]
  rows: string[][]
}) {
  return (
    <div className="rounded-lg-x border border-line bg-surface/20 overflow-hidden">
      {intro && (
        <p className="text-soft/75 leading-[1.8] text-[15.5px] px-7 pt-7 lg:px-9 lg:pt-8">{intro}</p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[14.5px] mt-2">
          <thead>
            <tr className="border-b border-line">
              {columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={`px-6 lg:px-8 py-4 text-[10px] font-medium tracking-[0.32em] uppercase ${
                    i === 0 ? 'text-gold' : 'text-soft/70'
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-line/60 last:border-b-0">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-6 lg:px-8 py-5 align-top leading-[1.65] ${
                      ci === 0 ? 'text-soft font-display font-extrabold tracking-[-0.02em] text-base' : 'text-soft/75'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function HowToBlock({
  intro,
  steps,
}: {
  intro?: string
  steps: Array<{ name: string; text: string }>
}) {
  return (
    <div className="rounded-lg-x border border-line bg-surface/20 p-7 lg:p-9">
      {intro && (
        <p className="text-soft/75 leading-[1.8] text-[15.5px] mb-7">{intro}</p>
      )}
      <ol className="space-y-7">
        {steps.map((step, i) => (
          <li key={step.name} className="grid grid-cols-[auto_1fr] gap-x-5">
            <span className="font-display font-extrabold tabular-nums text-gold/70 text-2xl leading-none tracking-[-0.03em] mt-[2px]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="font-display font-extrabold tracking-[-0.025em] text-soft text-lg lg:text-xl leading-tight mb-2">
                {step.name}
              </p>
              <p className="text-soft/75 leading-[1.75] text-[15.5px]">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function CalloutBlock({
  tone = 'ink',
  heading,
  body,
}: {
  tone?: 'gold' | 'ink'
  heading: string
  body: string
}) {
  const gold = tone === 'gold'
  return (
    <div
      className={`rounded-lg-x p-7 lg:p-9 border ${
        gold
          ? 'bg-[linear-gradient(180deg,rgba(143,122,88,0.10)_0%,rgba(143,122,88,0.02)_100%)] border-gold/30'
          : 'bg-surface/40 border-line'
      }`}
    >
      <p className="type-eyebrow text-gold mb-4 flex items-center gap-3">
        <span aria-hidden="true" className="block h-px w-8 bg-gold/70" />
        Note
      </p>
      <p className="font-display font-extrabold tracking-[-0.025em] text-soft text-xl lg:text-2xl leading-[1.2] mb-4">
        {heading}
      </p>
      <p className="text-soft/80 leading-[1.8] text-[15.5px]">{body}</p>
    </div>
  )
}

function QuoteBlock({ body, attribution }: { body: string; attribution?: string }) {
  return (
    <figure className="border-l border-gold/60 pl-7 lg:pl-9">
      <blockquote className="font-display font-medium italic tracking-[-0.015em] text-mute text-2xl lg:text-[28px] leading-[1.3]">
        “{body}”
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-[10px] font-medium tracking-[0.32em] uppercase text-soft/55">
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}

function PairBlock({
  left,
  right,
}: {
  left: { label: string; value: string }
  right: { label: string; value: string }
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 rounded-lg-x border border-line overflow-hidden bg-surface/20">
      {[left, right].map((pane, i) => (
        <div
          key={i}
          className={`p-7 lg:p-8 ${i === 0 ? 'border-b sm:border-b-0 sm:border-r border-line' : ''}`}
        >
          <p className="type-eyebrow text-gold mb-3">{pane.label}</p>
          <p className="font-display font-extrabold tracking-[-0.02em] text-soft text-xl lg:text-2xl leading-[1.25]">
            {pane.value}
          </p>
        </div>
      ))}
    </div>
  )
}
