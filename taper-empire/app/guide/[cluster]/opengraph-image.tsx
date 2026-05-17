import { ImageResponse } from 'next/og'
import { CLUSTERS, getArticlesByCluster } from '@/lib/guide'

export const runtime = 'edge'
export const alt = 'Taper Empire — cluster index'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG({ params }: { params: { cluster: string } }) {
  const cluster = CLUSTERS.find((c) => c.slug === params.cluster)
  const articles = cluster ? getArticlesByCluster(cluster.key) : []

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#070707',
          color: '#F5F3EF',
          padding: '72px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '60px', height: '2px', background: '#8F7A58' }} />
          <span
            style={{
              fontSize: '20px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#8F7A58',
              fontWeight: 500,
            }}
          >
            {cluster?.chapter ?? 'Taper Empire · Guide'}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '104px',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#F5F3EF',
          }}
        >
          {cluster?.label ?? 'The Taper Guide'}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span
            style={{
              fontSize: '18px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(245,243,239,0.55)',
            }}
          >
            Taper Empire — taperempire.com/guide
          </span>
          <div
            style={{
              display: 'flex',
              padding: '14px 28px',
              borderRadius: '999px',
              border: '1px solid rgba(143,122,88,0.45)',
              color: '#8F7A58',
              fontSize: '18px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {articles.length.toString().padStart(2, '0')} Briefs
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
