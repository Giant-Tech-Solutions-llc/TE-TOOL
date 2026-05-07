import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { ChevronDown, ExternalLink, Scissors } from 'lucide-react';

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
        {recommendations.map((rec, i) => (
          <Card key={i} padding="lg">
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/3',
              background: 'linear-gradient(135deg, var(--bg-secondary), var(--border))',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <Scissors size={56} color="var(--accent)" style={{ opacity: 0.6 }} />
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
              fontSize: 'var(--text-sm)',
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
                <span style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>
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
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5
                }}>
                  {rec.barber_instructions}
                </p>
              )}
            </div>

            <div style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-4)'
            }}>
              <strong style={{ color: 'var(--text-primary)' }}>Maintenance:</strong>{' '}
              {rec.maintenance}
            </div>

            <Button variant="ghost" icon={<ExternalLink size={16} />}>
              See Full Guide
            </Button>
          </Card>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Button onClick={onReset}>Start Over</Button>
      </div>
    </div>
  );
}
