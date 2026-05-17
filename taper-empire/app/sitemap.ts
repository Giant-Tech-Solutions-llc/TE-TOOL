import type { MetadataRoute } from 'next'
import { guideSitemapEntries } from '@/lib/guide'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const guide: MetadataRoute.Sitemap = guideSitemapEntries().map((e) => ({
    url: `${SITE_URL}${e.path}`,
    lastModified: new Date(e.lastModified),
    changeFrequency: 'monthly',
    priority: e.path === '/guide' ? 0.85 : 0.7,
  }))
  return [
    { url: SITE_URL,           lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/tool`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...guide,
  ]
}
