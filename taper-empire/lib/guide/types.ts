/**
 * Taper Empire — Guide Hub Type System
 *
 * Phase 09 — Semantic SEO Hub. Every article in /guide is described by a
 * structured `Article` record so the template can render it with full
 * schema markup, breadcrumbs, sticky TOC, and inter-cluster cross-links.
 *
 * Content is authored in TypeScript modules (one per cluster) so that:
 *   • search-engine output is fully static
 *   • internal links are typed (compile-time broken-link detection)
 *   • JSON-LD is generated from the same source as the visible content
 */

export type ClusterKey =
  | 'face-shapes'
  | 'taper-styles'
  | 'hair-textures'
  | 'maintenance'
  | 'barber-communication'

export interface ClusterMeta {
  key: ClusterKey
  /** /guide/{slug} */
  slug: string
  label: string
  shortLabel: string
  /** Editorial pitch used on hub + cluster index */
  pitch: string
  /** Long intro for the cluster index page */
  intro: string
  /** Eyebrow chapter label e.g. 'Chapter I — Face Architecture' */
  chapter: string
  /** Cluster cover hex/gradient anchor — used for accent treatments */
  accent: 'gold' | 'cream' | 'graphite'
}

export interface ArticleSection {
  /** Stable id used for the sticky TOC + in-page anchors */
  id: string
  heading: string
  /** Optional sub-eyebrow displayed above the heading */
  eyebrow?: string
  blocks: ContentBlock[]
}

export type ContentBlock =
  | { type: 'prose'; paragraphs: string[] }
  | { type: 'checklist'; intro?: string; items: string[] }
  | {
      type: 'table'
      intro?: string
      columns: string[]
      rows: string[][]
    }
  | {
      type: 'howto'
      intro?: string
      steps: Array<{ name: string; text: string }>
    }
  | { type: 'callout'; tone?: 'gold' | 'ink'; heading: string; body: string }
  | { type: 'quote'; body: string; attribution?: string }
  | { type: 'pair'; left: { label: string; value: string }; right: { label: string; value: string } }

export interface DirectAnswer {
  /** The implicit question this article answers */
  question: string
  /** 2-3 sentence AI-extractable answer */
  answer: string
  /** Bullet list — adds extractable structure */
  bullets?: string[]
}

export interface ArticleFAQ {
  q: string
  a: string
}

export interface ArticleRelated {
  /** Path under /guide */
  href: string
  label: string
  /** ~70-110 char editorial hook */
  hook: string
}

export interface Article {
  cluster: ClusterKey
  /** /guide/{cluster}/{slug} — the slug portion */
  slug: string
  /** H1 */
  title: string
  /** Sub-headline shown directly under H1 */
  subtitle: string
  /** Eyebrow label e.g. 'Face Shape · Round' */
  eyebrow: string
  /** SEO <title>. Defaults to title + ' · Taper Empire'. */
  metaTitle?: string
  metaDescription: string
  /** ISO date — used in Article schema */
  publishedAt: string
  updatedAt: string
  readMinutes: number
  directAnswer: DirectAnswer
  sections: ArticleSection[]
  faqs?: ArticleFAQ[]
  related?: ArticleRelated[]
}

export interface Comparison {
  /** /guide/compare/{slug} */
  slug: string
  title: string
  subtitle: string
  eyebrow: string
  metaDescription: string
  /** Heading for the column comparison block */
  leftLabel: string
  rightLabel: string
  /** Top-line takeaway shown above the table */
  verdict: string
  /** Long-form direct answer */
  directAnswer: DirectAnswer
  /** Multi-row attribute comparison */
  attributes: Array<{ attribute: string; left: string; right: string }>
  /** Sections after the comparison table */
  sections: ArticleSection[]
  faqs?: ArticleFAQ[]
  related?: ArticleRelated[]
  publishedAt: string
  updatedAt: string
}
