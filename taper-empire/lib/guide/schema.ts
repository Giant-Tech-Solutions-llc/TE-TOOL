/**
 * JSON-LD schema generators for the /guide hub.
 *
 * Output is plain JSON-serializable objects so each page can render them
 * via <script type="application/ld+json">. Generators are pure — they take
 * the same article record the visible page renders, so schema is
 * structurally consistent with what's on screen.
 */

import type { Article, Comparison, ArticleSection, ArticleFAQ } from './types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

interface Crumb {
  name: string
  path: string
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  }
}

export function faqSchema(faqs: ArticleFAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function howToStepsFromSections(sections: ArticleSection[]) {
  for (const s of sections) {
    for (const b of s.blocks) {
      if (b.type === 'howto') return b.steps
    }
  }
  return null
}

export function articleSchema(article: Article, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Organization', name: 'Taper Empire' },
    publisher: {
      '@type': 'Organization',
      name: 'Taper Empire',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logos/taper-empire-white.svg`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
  }
}

export function howToSchema(article: Article) {
  const steps = howToStepsFromSections(article.sections)
  if (!steps) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: article.title,
    description: article.metaDescription,
    step: steps.map((s) => ({
      '@type': 'HowToStep',
      name: s.name,
      text: s.text,
    })),
  }
}

export function comparisonArticleSchema(comparison: Comparison, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comparison.title,
    description: comparison.metaDescription,
    datePublished: comparison.publishedAt,
    dateModified: comparison.updatedAt,
    author: { '@type': 'Organization', name: 'Taper Empire' },
    publisher: {
      '@type': 'Organization',
      name: 'Taper Empire',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logos/taper-empire-white.svg`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
  }
}
