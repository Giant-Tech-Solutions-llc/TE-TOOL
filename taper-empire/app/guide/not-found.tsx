import Link from 'next/link'
import { Cinematic } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { CLUSTERS } from '@/lib/guide'

export default function GuideNotFound() {
  return (
    <section className="relative bg-ink text-soft border-t border-line grain-soft">
      <Cinematic className="pt-32 lg:pt-40 pb-28 lg:pb-36">
        <div className="max-w-3xl">
          <p className="type-eyebrow text-gold mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
            404 · Brief not found
          </p>
          <h1 className="font-display font-extrabold tracking-[-0.04em] text-[clamp(44px,6vw,88px)] leading-[1] mb-8">
            That brief doesn&apos;t exist
            <br />
            <span className="italic font-medium text-mute">— or it never did.</span>
          </h1>
          <p className="text-soft/70 leading-[1.7] text-lg lg:text-xl mb-10 max-w-2xl">
            The page you tried to reach isn&apos;t part of the current guide. The five active clusters
            are below — or jump straight into the tool to skip the reading.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-16">
            <Button asChild variant="cream" size="lg" shape="pill">
              <Link href="/guide">
                Back to the guide
                <span aria-hidden="true">→</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" shape="pill">
              <Link href="/tool">Open the tool</Link>
            </Button>
          </div>

          <p className="type-eyebrow text-soft/55 mb-5">Active clusters</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CLUSTERS.map((c) => (
              <li key={c.key}>
                <Link
                  href={`/guide/${c.slug}`}
                  className="group/c flex items-center justify-between rounded-lg-x border border-line bg-surface/30 px-5 py-4 transition-colors duration-300 hover:border-lineHover hover:bg-surface/60"
                >
                  <span className="font-display font-extrabold tracking-[-0.02em] text-soft text-base group-hover/c:text-gold transition-colors">
                    {c.label}
                  </span>
                  <span aria-hidden="true" className="text-gold transition-transform duration-300 group-hover/c:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Cinematic>
    </section>
  )
}
