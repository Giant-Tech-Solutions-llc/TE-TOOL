import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ComparisonShell } from '@/components/guide'
import {
  getComparison,
  comparisonStaticParams,
} from '@/lib/guide'
import {
  breadcrumbSchema,
  comparisonArticleSchema,
  faqSchema,
} from '@/lib/guide/schema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

export function generateStaticParams() {
  return comparisonStaticParams()
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const comparison = getComparison(params.slug)
  if (!comparison) return {}
  const url = `${SITE_URL}/guide/compare/${comparison.slug}`
  return {
    title: comparison.title,
    description: comparison.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: comparison.title,
      description: comparison.metaDescription,
      url,
      type: 'article',
      publishedTime: comparison.publishedAt,
      modifiedTime: comparison.updatedAt,
    },
  }
}

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  const comparison = getComparison(params.slug)
  if (!comparison) notFound()

  const path = `/guide/compare/${comparison.slug}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guide', href: '/guide' },
    { label: 'Compare', href: '/guide' },
    { label: comparison.title },
  ]

  const schemas: Array<Record<string, unknown> | null> = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Guide', path: '/guide' },
      { name: 'Compare', path: '/guide' },
      { name: comparison.title, path },
    ]),
    comparisonArticleSchema(comparison, path),
    comparison.faqs && comparison.faqs.length > 0 ? faqSchema(comparison.faqs) : null,
  ]

  return (
    <>
      {schemas.filter(Boolean).map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <ComparisonShell comparison={comparison} breadcrumbs={breadcrumbs} />
    </>
  )
}
