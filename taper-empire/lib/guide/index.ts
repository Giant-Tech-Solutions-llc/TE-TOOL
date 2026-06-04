/**
 * Guide hub registry — single source of truth for cluster + article content.
 * Routes consume the helpers exported here; nothing else imports the
 * individual cluster modules.
 */

import type { Article, ClusterKey, Comparison } from './types'
import { CLUSTERS, getCluster } from './clusters'
import { FACE_SHAPE_ARTICLES } from './face-shapes'
import { TAPER_STYLE_ARTICLES } from './taper-styles'
import { HAIR_TEXTURE_ARTICLES } from './hair-textures'
import { MAINTENANCE_ARTICLES } from './maintenance'
import { BARBER_ARTICLES } from './barber-communication'
import { COMPARISONS } from './comparisons'

export { CLUSTERS, getCluster }
export type { Article, Comparison, ClusterKey } from './types'

export const ALL_ARTICLES: Article[] = [
  ...FACE_SHAPE_ARTICLES,
  ...TAPER_STYLE_ARTICLES,
  ...HAIR_TEXTURE_ARTICLES,
  ...MAINTENANCE_ARTICLES,
  ...BARBER_ARTICLES,
]

export const ALL_COMPARISONS: Comparison[] = COMPARISONS

export function getArticlesByCluster(key: ClusterKey): Article[] {
  return ALL_ARTICLES.filter((a) => a.cluster === key)
}

export function getArticle(cluster: ClusterKey, slug: string): Article | undefined {
  return ALL_ARTICLES.find((a) => a.cluster === cluster && a.slug === slug)
}

export function getComparison(slug: string): Comparison | undefined {
  return ALL_COMPARISONS.find((c) => c.slug === slug)
}

/* ── Static-generation params helpers ───────────────────────────────── */

export function articleStaticParams(): Array<{ cluster: string; slug: string }> {
  return ALL_ARTICLES.map((a) => ({ cluster: a.cluster, slug: a.slug }))
}

export function clusterStaticParams(): Array<{ cluster: string }> {
  return CLUSTERS.map((c) => ({ cluster: c.slug }))
}

export function comparisonStaticParams(): Array<{ slug: string }> {
  return ALL_COMPARISONS.map((c) => ({ slug: c.slug }))
}

/* ── Sitemap helper ─────────────────────────────────────────────────── */

export function guideSitemapEntries(): Array<{ path: string; lastModified: string }> {
  const entries: Array<{ path: string; lastModified: string }> = [
    { path: '/guide', lastModified: '2026-05-17' },
  ]
  for (const c of CLUSTERS) {
    entries.push({ path: `/guide/${c.slug}`, lastModified: '2026-05-17' })
  }
  for (const a of ALL_ARTICLES) {
    entries.push({ path: `/guide/${a.cluster}/${a.slug}`, lastModified: a.updatedAt })
  }
  for (const cmp of ALL_COMPARISONS) {
    entries.push({ path: `/guide/compare/${cmp.slug}`, lastModified: cmp.updatedAt })
  }
  return entries
}
