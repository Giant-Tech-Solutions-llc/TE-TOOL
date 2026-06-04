import type { Metadata } from 'next'
import Link from 'next/link'
import { Cinematic } from '@/components/shared'
import { Breadcrumb, GuideCTA } from '@/components/guide'
import { Button } from '@/components/ui/button'
import {
  CLUSTERS,
  ALL_ARTICLES,
  ALL_COMPARISONS,
  getArticlesByCluster,
} from '@/lib/guide'
import { breadcrumbSchema } from '@/lib/guide/schema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

export const metadata: Metadata = {
  title: 'The Taper Guide — Decision Intelligence for the Modern Cut',
  description:
    'A structured authority hub for taper haircut decisions — face shape matching, taper geometry, hair texture compatibility, maintenance systems, and barber communication. Built for clients who want to walk in with a brief, not a hope.',
  alternates: { canonical: `${SITE_URL}/guide` },
  openGraph: {
    title: 'The Taper Guide — Decision Intelligence for the Modern Cut',
    description:
      'A structured authority hub for taper haircut decisions — face shapes, taper styles, textures, maintenance, and barber communication.',
    url: `${SITE_URL}/guide`,
  },
}

export default function GuideHubPage() {
  const schema = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Guide', path: '/guide' },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative bg-ink text-soft border-t border-line grain-soft">
        <Cinematic className="pt-32 lg:pt-40 pb-20 lg:pb-28">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guide' }]} />

          {/* ── Hero ─────────────────────────────────────────────── */}
          <header className="mt-10 lg:mt-14 mb-20 lg:mb-28 max-w-4xl">
            <p className="type-eyebrow text-gold mb-7 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
              The Taper Empire Guide · Vol. 01
            </p>
            <h1 className="font-display font-extrabold tracking-[-0.04em] text-[clamp(48px,7vw,108px)] leading-[0.95] mb-8">
              Decision intelligence
              <br />
              <span className="italic font-medium text-mute">for the modern cut.</span>
            </h1>
            <p className="text-soft/70 leading-[1.7] text-lg lg:text-xl max-w-3xl">
              Most taper recommendations are vibes. This guide is the opposite — a structured authority hub
              that maps face geometry, taper styles, hair texture, maintenance cadence, and barber
              communication into a single coherent decision system. Walk into the chair with a brief, not a hope.
            </p>
          </header>

          {/* ── Stat strip ───────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20 lg:mb-28 pb-12 lg:pb-16 border-b border-line">
            <Stat n={ALL_ARTICLES.length.toString().padStart(2, '0')} label="Decision briefs" />
            <Stat n={ALL_COMPARISONS.length.toString().padStart(2, '0')} label="Comparison pages" />
            <Stat n={CLUSTERS.length.toString().padStart(2, '0')} label="Authority clusters" />
            <Stat n="60s" label="Tool turnaround" />
          </div>

          {/* ── Cluster grid ─────────────────────────────────────── */}
          <div className="space-y-12 lg:space-y-16">
            {CLUSTERS.map((cluster, i) => {
              const articles = getArticlesByCluster(cluster.key)
              return (
                <ClusterCard
                  key={cluster.key}
                  index={i}
                  cluster={cluster}
                  articleCount={articles.length}
                />
              )
            })}
          </div>

          {/* ── Comparisons strip ────────────────────────────────── */}
          <div className="mt-24 lg:mt-32 pt-16 lg:pt-20 border-t border-line">
            <p className="type-eyebrow text-gold mb-6 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
              Comparison briefs
            </p>
            <h2 className="font-display font-extrabold tracking-[-0.03em] text-soft text-3xl lg:text-5xl leading-[1.05] mb-10 lg:mb-14 max-w-3xl">
              When two cuts overlap, the comparison is the decision.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {ALL_COMPARISONS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/guide/compare/${c.slug}`}
                  className="group/cmp block rounded-lg-x border border-line bg-surface/30 p-6 lg:p-8 transition-all duration-500 ease-lux hover:border-lineHover hover:bg-surface/60 hover:-translate-y-1 hover:shadow-luxury-sm"
                >
                  <p className="type-eyebrow text-gold mb-3">{c.eyebrow}</p>
                  <p className="font-display font-extrabold tracking-[-0.025em] text-soft text-xl lg:text-2xl leading-[1.15] mb-3 group-hover/cmp:text-gold transition-colors duration-300">
                    {c.title}
                  </p>
                  <p className="text-soft/65 leading-[1.7] text-[14.5px] mb-5">{c.subtitle}</p>
                  <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.32em] uppercase text-gold">
                    Read brief
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover/cmp:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Closing CTA ──────────────────────────────────────── */}
          <div className="mt-24 lg:mt-32">
            <GuideCTA
              heading="Skip the theory — get the brief built for your face."
              body="The guide is the system. The tool is the execution. Sixty seconds, three matches, and the exact language to use at the chair."
            />
          </div>
        </Cinematic>
      </section>
    </>
  )
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-display font-extrabold tabular-nums tracking-[-0.04em] text-soft text-4xl lg:text-5xl leading-none mb-3">
        {n}
      </p>
      <p className="type-eyebrow text-soft/55">{label}</p>
    </div>
  )
}

function ClusterCard({
  cluster,
  index,
  articleCount,
}: {
  cluster: typeof CLUSTERS[number]
  index: number
  articleCount: number
}) {
  return (
    <Link
      href={`/guide/${cluster.slug}`}
      className="group/cluster block relative rounded-hero border border-line bg-surface/20 overflow-hidden transition-all duration-500 ease-lux hover:border-lineHover hover:bg-surface/40 hover:shadow-luxury-sm"
    >
      <div className="relative grid grid-cols-12 gap-y-8 lg:gap-x-12 p-8 lg:p-12">
        {/* Oversized numeral */}
        <div className="col-span-12 lg:col-span-3">
          <span
            aria-hidden="true"
            className="font-display font-extrabold tabular-nums tracking-[-0.04em] text-gold/[0.18] leading-none text-[clamp(96px,12vw,160px)] block group-hover/cluster:text-gold/[0.28] transition-colors duration-500"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <div className="col-span-12 lg:col-span-9">
          <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-8 bg-gold/70" />
            {cluster.chapter}
          </p>
          <h2 className="font-display font-extrabold tracking-[-0.03em] text-soft text-3xl lg:text-[44px] leading-[1.05] mb-5 group-hover/cluster:text-gold transition-colors duration-300">
            {cluster.label}
          </h2>
          <p className="text-soft/70 leading-[1.75] text-base lg:text-lg max-w-2xl mb-8">
            {cluster.pitch}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-medium tracking-[0.32em] uppercase">
            <span className="text-soft/55">
              <span className="text-soft/85 tabular-nums">{String(articleCount).padStart(2, '0')}</span> briefs
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <span className="text-gold flex items-center gap-2">
              Open cluster
              <span aria-hidden="true" className="transition-transform duration-300 group-hover/cluster:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
