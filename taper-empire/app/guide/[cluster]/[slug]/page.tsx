import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleShell } from '@/components/guide'
import {
  CLUSTERS,
  getArticle,
  articleStaticParams,
  type ClusterKey,
} from '@/lib/guide'
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
} from '@/lib/guide/schema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

export function generateStaticParams() {
  return articleStaticParams()
}

export function generateMetadata({ params }: { params: { cluster: string; slug: string } }): Metadata {
  const cluster = CLUSTERS.find((c) => c.slug === params.cluster)
  if (!cluster) return {}
  const article = getArticle(cluster.key as ClusterKey, params.slug)
  if (!article) return {}
  const url = `${SITE_URL}/guide/${params.cluster}/${params.slug}`
  return {
    title: article.metaTitle ?? article.title,
    description: article.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  }
}

export default function ArticlePage({ params }: { params: { cluster: string; slug: string } }) {
  const cluster = CLUSTERS.find((c) => c.slug === params.cluster)
  if (!cluster) notFound()

  const article = getArticle(cluster.key as ClusterKey, params.slug)
  if (!article) notFound()

  const path = `/guide/${params.cluster}/${params.slug}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guide', href: '/guide' },
    { label: cluster.label, href: `/guide/${cluster.slug}` },
    { label: article.title },
  ]

  const schemas: Array<Record<string, unknown> | null> = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Guide', path: '/guide' },
      { name: cluster.label, path: `/guide/${cluster.slug}` },
      { name: article.title, path },
    ]),
    articleSchema(article, path),
    article.faqs && article.faqs.length > 0 ? faqSchema(article.faqs) : null,
    howToSchema(article),
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
      <ArticleShell article={article} breadcrumbs={breadcrumbs} />
    </>
  )
}
