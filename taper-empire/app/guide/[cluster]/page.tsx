import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Cinematic } from '@/components/shared'
import { Breadcrumb, GuideCTA } from '@/components/guide'
import {
  CLUSTERS,
  getArticlesByCluster,
  clusterStaticParams,
  ALL_COMPARISONS,
} from '@/lib/guide'
import { breadcrumbSchema } from '@/lib/guide/schema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

export function generateStaticParams() {
  return clusterStaticParams()
}

export function generateMetadata({ params }: { params: { cluster: string } }): Metadata {
  const cluster = CLUSTERS.find((c) => c.slug === params.cluster)
  if (!cluster) return {}
  const url = `${SITE_URL}/guide/${cluster.slug}`
  return {
    title: `${cluster.label} — Decision Briefs`,
    description: cluster.pitch,
    alternates: { canonical: url },
    openGraph: { title: `${cluster.label} — Taper Empire Guide`, description: cluster.pitch, url },
  }
}

export default function ClusterIndexPage({ params }: { params: { cluster: string } }) {
  const cluster = CLUSTERS.find((c) => c.slug === params.cluster)
  if (!cluster) notFound()

  const articles = getArticlesByCluster(cluster.key)
  const relatedComparisons = ALL_COMPARISONS.filter((c) =>
    c.related?.some((r) => r.href.startsWith(`/guide/${cluster.slug}`)),
  ).slice(0, 2)

  const schema = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Guide', path: '/guide' },
    { name: cluster.label, path: `/guide/${cluster.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative bg-ink text-soft border-t border-line grain-soft">
        <Cinematic className="pt-32 lg:pt-40 pb-24 lg:pb-32">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Guide', href: '/guide' },
              { label: cluster.label },
            ]}
          />

          {/* ── Header ───────────────────────────────────────────── */}
          <header className="mt-10 lg:mt-14 mb-16 lg:mb-24 max-w-4xl">
            <p className="type-eyebrow text-gold mb-7 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
              {cluster.chapter}
            </p>
            <h1 className="font-display font-extrabold tracking-[-0.04em] text-[clamp(44px,6vw,88px)] leading-[0.98] mb-8">
              {cluster.label}.
            </h1>
            <p className="text-soft/75 leading-[1.75] text-lg lg:text-xl max-w-3xl">
              {cluster.intro}
            </p>
          </header>

          {/* ── Article grid ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-24 lg:mb-32">
            {articles.map((a, i) => (
              <Link
                key={a.slug}
                href={`/guide/${cluster.slug}/${a.slug}`}
                className="group/art block h-full rounded-lg-x border border-line bg-surface/30 p-7 lg:p-8 transition-all duration-500 ease-lux hover:border-lineHover hover:bg-surface/60 hover:-translate-y-1 hover:shadow-luxury-sm"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display font-extrabold tabular-nums tracking-[-0.03em] text-gold/40 text-3xl leading-none group-hover/art:text-gold/70 transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="type-eyebrow text-soft/40 tabular-nums">{a.readMinutes} min</span>
                </div>
                <p className="type-eyebrow text-gold mb-4">{a.eyebrow}</p>
                <p className="font-display font-extrabold tracking-[-0.025em] text-soft text-xl lg:text-[22px] leading-[1.15] mb-4 group-hover/art:text-gold transition-colors duration-300">
                  {a.title}
                </p>
                <p className="text-soft/65 leading-[1.7] text-[14.5px] mb-6 line-clamp-3">
                  {a.directAnswer.answer.split('. ')[0]}.
                </p>
                <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.32em] uppercase text-gold">
                  Read brief
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover/art:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>

          {/* ── Cross-cluster strip ──────────────────────────────── */}
          {relatedComparisons.length > 0 && (
            <div className="mb-24 lg:mb-32 pt-12 lg:pt-16 border-t border-line">
              <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
                <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
                Decision comparisons
              </p>
              <h2 className="font-display font-extrabold tracking-[-0.03em] text-soft text-2xl lg:text-3xl leading-[1.15] mb-8 max-w-3xl">
                Comparisons that decide between {cluster.label.toLowerCase()}.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedComparisons.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/guide/compare/${c.slug}`}
                    className="group/cmp block rounded-lg-x border border-line bg-surface/20 p-6 transition-all duration-500 ease-lux hover:border-lineHover hover:bg-surface/50"
                  >
                    <p className="font-display font-extrabold tracking-[-0.02em] text-soft text-lg leading-[1.2] mb-2 group-hover/cmp:text-gold transition-colors">
                      {c.title}
                    </p>
                    <p className="text-soft/60 leading-[1.6] text-[14px]">{c.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <GuideCTA />
        </Cinematic>
      </section>
    </>
  )
}
