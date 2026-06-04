import type { DirectAnswer } from '@/lib/guide/types'

/**
 * Direct Answer Block — the AI-extractable summary card placed near the
 * top of every guide article. Structured so retrieval systems (Google AI
 * Overviews, ChatGPT, Perplexity, Gemini) can lift the answer cleanly.
 */
export function DirectAnswerBlock({ data }: { data: DirectAnswer }) {
  return (
    <aside
      aria-label="Direct answer"
      className="relative rounded-hero border border-gold/20 bg-[linear-gradient(180deg,rgba(143,122,88,0.10)_0%,rgba(143,122,88,0.02)_100%)] p-8 lg:p-10 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />
      <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        Direct Answer
      </p>

      <p className="font-display font-extrabold tracking-[-0.025em] text-xl lg:text-2xl leading-[1.25] text-soft mb-5">
        {data.question}
      </p>

      <p className="text-soft/80 leading-[1.85] text-[15px] lg:text-base mb-6">
        {data.answer}
      </p>

      {data.bullets && data.bullets.length > 0 && (
        <ul className="space-y-3 border-t border-gold/15 pt-6">
          {data.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-soft/75 leading-[1.7] text-[14.5px]">
              <span aria-hidden="true" className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
