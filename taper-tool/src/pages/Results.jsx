import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { ChevronDown, ExternalLink } from 'lucide-react';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<rect fill="#A39382" width="400" height="300"/>' +
      '<text x="50%" y="50%" fill="#FBF7F4" text-anchor="middle" dy=".3em" font-size="20">No Image</text>' +
    '</svg>'
  );

function slugify(name) {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function Results({ recommendations = [], onReset }) {
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <div
      className="tt-fade-in"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}
    >
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
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
          const imageUrl = rec.image_url || PLACEHOLDER_IMAGE;

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
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                />
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
