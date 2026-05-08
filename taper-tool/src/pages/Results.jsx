import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { ChevronDown, ExternalLink, Sparkles } from 'lucide-react';
import { getStyleIllustration } from '../utils/styleIllustrations';

function slugify(name) {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function DiagnosticBanner({ diagnostics }) {
  if (!diagnostics) return null;
  const { textSource, imageSource, proxy } = diagnostics;
  const aiUsed = textSource && textSource.startsWith('gemini');
  const aiImages = imageSource && imageSource.startsWith('gemini');
  if (aiUsed && aiImages === true && imageSource === 'gemini-all') return null;

  let title;
  let detail;
  if (proxy === 'no-proxy') {
    title = 'Running locally without the API proxy.';
    detail = 'Generic illustrations are shown. To get on-face AI previews, paste a Gemini key in the gear icon, or run `vercel dev`.';
  } else if (proxy === 'server-no-key') {
    title = 'AI is off — server has no GEMINI_API_KEY.';
    detail = 'Set GEMINI_API_KEY in your Vercel project settings, then redeploy. Until then, illustrations are shown.';
  } else if (!aiUsed) {
    title = 'Showing curated recommendations.';
    detail = 'AI text generation is unavailable right now — the curated catalog is being used instead.';
  } else if (!aiImages) {
    title = 'AI text worked but image generation did not.';
    detail = 'Check that your Gemini key has access to gemini-2.5-flash-image-preview, or check the Vercel function logs.';
  } else {
    title = `Some images couldn't be generated (${imageSource}).`;
    detail = 'Curated illustrations are used where AI rendering failed.';
  }

  return (
    <div style={{
      maxWidth: '720px',
      margin: '0 auto var(--space-8)',
      padding: 'var(--space-3) var(--space-4)',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-sm)',
      textAlign: 'center'
    }}>
      <strong style={{ color: 'var(--text-primary)' }}>{title}</strong> {detail}
    </div>
  );
}

export default function Results({ recommendations = [], diagnostics, onReset }) {
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <div
      className="tt-fade-in"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}
    >
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          marginBottom: 'var(--space-2)',
          fontWeight: 'var(--font-bold)',
          letterSpacing: '-0.02em'
        }}>
          Here Are Your Perfect Matches
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
          Based on your unique features and preferences
        </p>
      </div>

      <DiagnosticBanner diagnostics={diagnostics} />

      {recommendations.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            We couldn't generate recommendations right now. Please try again.
          </p>
          <Button onClick={onReset}>Start Over</Button>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-12)'
      }}>
        {recommendations.map((rec, i) => {
          const slug = rec.related_url || slugify(rec.style_name);
          const guideUrl = `https://taperempire.com/${slug}/`;
          const fallbackImage = getStyleIllustration(slug);
          const imageUrl = rec.image_url || fallbackImage;
          const isAiImage = Boolean(rec.image_url);

          return (
            <Card key={i} padding="lg">
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                overflow: 'hidden',
                background: 'var(--bg-secondary)'
              }}>
                <img
                  src={imageUrl}
                  alt={rec.style_name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    if (e.currentTarget.dataset.fallback) return;
                    e.currentTarget.dataset.fallback = '1';
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                {isAiImage && (
                  <div style={{
                    position: 'absolute',
                    bottom: 'var(--space-2)',
                    left: 'var(--space-2)',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-semibold)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                    backdropFilter: 'blur(4px)'
                  }}>
                    <Sparkles size={12} /> AI preview
                  </div>
                )}
                <div style={{
                  position: 'absolute',
                  top: 'var(--space-2)',
                  right: 'var(--space-2)',
                  background: 'var(--accent)',
                  color: 'var(--bg-primary)',
                  padding: 'var(--space-1) var(--space-3)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)'
                }}>
                  {rec.match_score}% Match
                </div>
              </div>

              <h3 style={{
                fontSize: 'var(--text-xl)',
                marginBottom: 'var(--space-3)',
                fontWeight: 'var(--font-semibold)'
              }}>
                {rec.style_name}
              </h3>

              <p style={{
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-4)',
                fontSize: 'var(--text-base)',
                lineHeight: 1.5
              }}>
                {rec.why_it_works}
              </p>

              <div
                role="button"
                tabIndex={0}
                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedCard(expandedCard === i ? null : i);
                  }
                }}
                style={{
                  padding: 'var(--space-3)',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  marginBottom: 'var(--space-4)',
                  outline: 'none'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)' }}>
                    Barber Instructions
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: expandedCard === i ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 200ms'
                    }}
                  />
                </div>
                {expandedCard === i && (
                  <p style={{
                    marginTop: 'var(--space-3)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5
                  }}>
                    {rec.barber_instructions}
                  </p>
                )}
              </div>

              <div style={{
                fontSize: 'var(--text-base)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-4)'
              }}>
                <strong style={{ color: 'var(--text-primary)' }}>Maintenance:</strong>{' '}
                {rec.maintenance}
              </div>

              <a
                href={guideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tt-link-ghost"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  padding: 'var(--space-3) var(--space-6)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontWeight: 'var(--font-semibold)',
                  fontSize: 'var(--text-base)',
                  transition: 'all var(--transition)'
                }}
              >
                <ExternalLink size={16} />
                See Full Guide
              </a>
            </Card>
          );
        })}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Button onClick={onReset}>Start Over</Button>
      </div>
    </div>
  );
}
