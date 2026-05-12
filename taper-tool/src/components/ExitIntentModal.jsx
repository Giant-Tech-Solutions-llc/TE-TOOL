import { useEffect, useRef, useState } from 'react';
import { submitFeedback, hasGivenFeedback } from '../utils/feedback';

const RATINGS = [
  { value: 1, emoji: '😞' },
  { value: 2, emoji: '😕' },
  { value: 3, emoji: '🙂' },
  { value: 4, emoji: '😊' },
  { value: 5, emoji: '🤩' },
];

const AUTO_DISMISS_MS = 7000;

export default function ExitIntentModal({ recommendations, flow }) {
  const [open, setOpen]       = useState(false);
  const [done, setDone]       = useState(false);
  const [progress, setProgress] = useState(100);
  const triggeredRef  = useRef(false);
  const tickRef       = useRef(null);

  // Exit-intent trigger: cursor leaves through the top of the viewport
  useEffect(() => {
    if (hasGivenFeedback()) return;

    const onMouseLeave = (e) => {
      if (triggeredRef.current) return;
      if (e.clientY <= 8 && !e.relatedTarget && !e.toElement) {
        triggeredRef.current = true;
        setOpen(true);
      }
    };

    const grace = setTimeout(() => {
      document.addEventListener('mouseleave', onMouseLeave);
    }, 1200);

    return () => {
      clearTimeout(grace);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Auto-dismiss countdown bar
  useEffect(() => {
    if (!open || done) return;

    const start = Date.now();
    tickRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / AUTO_DISMISS_MS) * 100);
      setProgress(pct);
      if (pct <= 0) {
        clearInterval(tickRef.current);
        setOpen(false);
      }
    }, 80);

    return () => clearInterval(tickRef.current);
  }, [open, done]);

  const handleRate = async (value) => {
    clearInterval(tickRef.current);
    setDone(true);
    try {
      await submitFeedback({ rating: value, comment: '', recommendations, flow });
    } catch { /* noop */ }
    setTimeout(() => setOpen(false), 1600);
  };

  if (!open) return null;

  return (
    <div
      className="tt-toast-enter"
      style={{
        position: 'fixed',
        bottom: 'var(--space-6)',
        right: 'var(--space-6)',
        zIndex: 2000,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        padding: 'var(--space-4) var(--space-5) var(--space-3)',
        width: '280px',
        overflow: 'hidden',
      }}
    >
      {!done ? (
        <>
          <p style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-1)',
          }}>
            How well did we match you?
          </p>
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            marginBottom: 'var(--space-4)',
          }}>
            One tap · no signup · helps us improve
          </p>

          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-4)',
          }}>
            {RATINGS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleRate(opt.value)}
                className="tt-emoji-btn"
                style={{
                  background: 'transparent',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-2)',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  flex: 1,
                  lineHeight: 1,
                  transition: 'transform 150ms ease, border-color 150ms ease',
                }}
              >
                {opt.emoji}
              </button>
            ))}
          </div>

          {/* Countdown bar */}
          <div style={{
            height: '2px',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--border)',
              transition: 'width 80ms linear',
            }} />
          </div>
        </>
      ) : (
        <div className="tt-fade-in" style={{ textAlign: 'center', padding: 'var(--space-2) 0 var(--space-1)' }}>
          <div style={{ fontSize: '1.6rem', marginBottom: 'var(--space-1)' }}>🙏</div>
          <p style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--text-primary)',
          }}>
            Thanks — that helps.
          </p>
        </div>
      )}
    </div>
  );
}
