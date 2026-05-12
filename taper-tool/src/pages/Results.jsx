import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { ChevronDown, ExternalLink, Sparkles } from 'lucide-react';
import { getStyleIllustration } from '../utils/styleIllustrations';
import FeedbackPrompt from '../components/FeedbackPrompt';
import ExitIntentModal from '../components/ExitIntentModal';
import { hasGivenFeedback } from '../utils/feedback';

function slugify(name) {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function summarizeError(err) {
  if (!err) return null;
  const where = err.where || 'gemini';
  const model = err.model ? ` [${err.model}]` : '';
  const status = err.status ? ` ${err.status}` : '';
  const summary = err.summary || err.error || '';
  return `${where}${model}${status}: ${summary}`.trim();
}

function DiagnosticBanner({ diagnostics }) {
  if (!diagnostics) return null;
  const { textSource, imageSource, proxy, textReason, imageReason, errors } = diagnostics;
  const aiUsed = textSource && textSource.startsWith('gemini');
  const aiAllImages = imageSource === 'gemini-all';
  if (aiUsed && aiAllImages) return null;

  let title;
  let detail;
  if (proxy === 'no-proxy') {
    title = 'Running locally without the API proxy.';
    detail = 'Generic illustrations are shown. To get on-face AI previews, paste a Gemini key in the gear icon, or run `vercel dev`.';
  } else if (proxy === 'server-no-key') {
    title = 'AI is off — server has no GEMINI_API_KEY.';
    detail = 'Set GEMINI_API_KEY in your Vercel project settings, then redeploy. Until then, illustrations are shown.';
  } else if (!aiUsed && textReason === 'quota_exceeded') {
    title = 'Gemini text quota exhausted on this API key.';
    detail = 'Free-tier quota for the chosen text models is used up. Enable billing in Google AI Studio (https://aistudio.google.com/app/apikey) or wait for daily reset. Curated catalog is shown until then.';
  } else if (!aiUsed) {
    title = 'AI text generation failed — showing curated recommendations.';
    detail = 'The Gemini text call returned an error for every model in the fallback chain. See upstream messages below.';
  } else if (!aiAllImages && imageReason === 'quota_exceeded') {
    title = 'Gemini image quota exhausted on this API key.';
    detail = 'Free-tier quota for Gemini 2.5 Flash Image is very limited (~10/day). Enable billing in Google AI Studio for unlimited generation, or wait for daily reset. Curated illustrations are shown for now.';
  } else if (!aiAllImages) {
    title = imageSource === 'illustration'
      ? 'AI text worked but image generation did not.'
      : `Some images couldn't be generated (${imageSource}).`;
    detail = 'Make sure your Gemini key has access to gemini-2.5-flash-image-preview. See upstream messages below.';
  }

  const errorList = (errors || []).slice(0, 8).map(summarizeError).filter(Boolean);

  return (
    <div style={{
      maxWidth: '760px',
      margin: '0 auto var(--space-8)',
      padding: 'var(--space-4)',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-sm)',
      textAlign: 'left'
    }}>
      <div style={{ textAlign: 'center', marginBottom: errorList.length ? 'var(--space-3)' : 0 }}>
        <strong style={{ color: 'var(--text-primary)' }}>{title}</strong> {detail}
      </div>
      {errorList.length > 0 && (
        <details style={{ marginTop: 'var(--space-2)' }}>
          <summary style={{
            cursor: 'pointer',
            color: 'var(--accent)',
            fontWeight: 'var(--font-semibold)',
            textAlign: 'center'
          }}>
            Show upstream errors ({errorList.length})
          </summary>
          <ul style={{
            margin: 'var(--space-3) 0 0',
            paddingLeft: 'var(--space-5)',
            fontFamily: 'monospace',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            wordBreak: 'break-word'
          }}>
            {errorList.map((line, idx) => (
              <li key={idx} style={{ marginBottom: 'var(--space-1)' }}>{line}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export default function Results({ recommendations = [], diagnostics, onReset }) {
  const [expandedCard, setExpandedCard] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [softStop, setSoftStop] = useState(false);

  useEffect(() => {
    setFeedbackGiven(hasGivenFeedback());
  }, []);

  const flow = diagnostics && diagnostics.proxy ? diagnostics.proxy : 'unknown';

  const handleReset = () => {
    if (!feedbackGiven && !softStop) {
      setSoftStop(true);
      const el = document.getElementById('tt-feedback');
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    onReset();
  };

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
        marginBottom: 'var(--space-12)',
        alignItems: 'start'
      }}>
        {recommendations.map((rec, i) => {
          const slug = rec.related_url || slugify(rec.style_name);
          const guideUrl = `https://taperempire.com/${slug}/`;
          const fallbackImage = getStyleIllustration(slug);
          const imageUrl = rec.image_url || fallbackImage;
          const isAiImage = Boolean(rec.image_url);

          return (
            <Card
              key={i}
              padding="lg"
              className="tt-slide-up"
              style={{ animationDelay: `${i * 110}ms` }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                overflow: 'hidden',
                background: 'var(--bg-secondary)'
              }}>
                <img
                  src={imageUrl}
                  alt={rec.style_name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block'
                  }}
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

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-3)',
                flexWrap: 'wrap',
              }}>
                {i === 0 && (
                  <span style={{
                    background: 'var(--accent)',
                    color: 'var(--bg-primary)',
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-bold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    flexShrink: 0,
                  }}>
                    Best Match
                  </span>
                )}
                <h3 style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-semibold)',
                  margin: 0,
                }}>
                  {rec.style_name}
                </h3>
              </div>

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

      <div id="tt-feedback">
        <FeedbackPrompt
          recommendations={recommendations}
          flow={flow}
          onSubmitted={() => setFeedbackGiven(true)}
        />
      </div>

      {softStop && !feedbackGiven && (
        <p style={{
          textAlign: 'center',
          color: 'var(--accent)',
          fontSize: 'var(--text-sm)',
          marginTop: 'calc(-1 * var(--space-8))',
          marginBottom: 'var(--space-6)',
          fontWeight: 'var(--font-semibold)'
        }}>
          One quick tap above and we'll get out of your way ↑
        </p>
      )}

      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleReset}>Start Over</Button>
      </div>

      <ExitIntentModal recommendations={recommendations} flow={flow} />
    </div>
  );
}
