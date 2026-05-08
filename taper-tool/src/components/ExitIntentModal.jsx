import { useEffect, useRef, useState } from 'react';
import { X, Send, Heart } from 'lucide-react';
import { submitFeedback, hasGivenFeedback } from '../utils/feedback';

const RATINGS = [
  { value: 1, emoji: '😞' },
  { value: 2, emoji: '😕' },
  { value: 3, emoji: '🙂' },
  { value: 4, emoji: '😊' },
  { value: 5, emoji: '🤩' }
];

export default function ExitIntentModal({ recommendations, flow }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [done, setDone] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (hasGivenFeedback()) return;

    const onMouseLeave = (e) => {
      if (triggeredRef.current) return;
      // Only trigger when cursor leaves through the top of the viewport.
      if (e.clientY <= 8 && (!e.relatedTarget && !e.toElement)) {
        triggeredRef.current = true;
        setOpen(true);
      }
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    // Small grace period so the modal doesn't fight the loading transition.
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('keydown', onKeydown);
    }, 1200);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('keydown', onKeydown);
    };
  }, []);

  const close = () => setOpen(false);

  const send = async () => {
    if (rating === null) return;
    await submitFeedback({ rating, comment, recommendations, flow });
    setDone(true);
    setTimeout(() => setOpen(false), 1400);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick feedback"
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        zIndex: 2000,
        backdropFilter: 'blur(4px)'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="tt-fade-in"
        style={{
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-8) var(--space-6)',
          maxWidth: '480px',
          width: '100%',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 'var(--space-3)',
            right: 'var(--space-3)',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: 'var(--space-1)'
          }}
        >
          <X size={18} />
        </button>

        {!done && (
          <>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-1) var(--space-3)',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              color: 'var(--accent)',
              fontWeight: 'var(--font-semibold)',
              marginBottom: 'var(--space-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              <Heart size={12} fill="currentColor" /> Before you go
            </div>

            <h3 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-2)',
              lineHeight: 1.2
            }}>
              Did the matches actually feel like you?
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-base)',
              marginBottom: 'var(--space-5)'
            }}>
              5 seconds. One emoji. Your honest take is the only way we get sharper.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-5)',
              flexWrap: 'wrap'
            }}>
              {RATINGS.map((opt) => {
                const chosen = rating === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-label={`Rate ${opt.value}`}
                    onClick={() => setRating(opt.value)}
                    style={{
                      background: chosen ? 'var(--accent)' : 'transparent',
                      border: `2px solid ${chosen ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--space-3)',
                      fontSize: '1.75rem',
                      cursor: 'pointer',
                      transition: 'all var(--transition)',
                      lineHeight: 1
                    }}
                  >
                    {opt.emoji}
                  </button>
                );
              })}
            </div>

            {rating !== null && (
              <div className="tt-fade-in">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, 2000))}
                  placeholder="One thing we could improve (optional)…"
                  rows={2}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    fontFamily: 'inherit',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    resize: 'vertical',
                    outline: 'none',
                    marginBottom: 'var(--space-4)'
                  }}
                />
                <button
                  type="button"
                  onClick={send}
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg-primary)',
                    border: 'none',
                    padding: 'var(--space-3) var(--space-6)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-semibold)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  <Send size={16} /> Send & close
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={close}
              style={{
                background: 'transparent',
                color: 'var(--text-tertiary)',
                border: 'none',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
                marginTop: 'var(--space-4)',
                textDecoration: 'underline'
              }}
            >
              No thanks
            </button>
          </>
        )}

        {done && (
          <div className="tt-fade-in">
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-2)' }}>🙏</div>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)' }}>
              Got it — thank you.
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', marginTop: 'var(--space-2)' }}>
              That's the kind of input that builds the next version.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
