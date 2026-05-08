import { useState, useEffect, useRef } from 'react';
import { Heart, Send, CheckCircle2 } from 'lucide-react';
import { submitFeedback, hasGivenFeedback } from '../utils/feedback';

const RATINGS = [
  { value: 1, emoji: '😞', label: 'Way off' },
  { value: 2, emoji: '😕', label: 'Meh' },
  { value: 3, emoji: '🙂', label: 'Decent' },
  { value: 4, emoji: '😊', label: 'Great' },
  { value: 5, emoji: '🤩', label: 'Spot on' }
];

export default function FeedbackPrompt({ recommendations, flow, onSubmitted }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    if (hasGivenFeedback()) setSubmitted(true);
  }, []);

  useEffect(() => {
    if (rating !== null && commentRef.current) {
      commentRef.current.focus({ preventScroll: true });
    }
  }, [rating]);

  const handleRate = async (value) => {
    setRating(value);
    // Fire-and-forget initial submission so we capture the rating even if
    // the user doesn't write a comment. The comment will be appended on
    // the explicit submit click.
    try {
      await submitFeedback({ rating: value, comment: '', recommendations, flow });
      onSubmitted && onSubmitted();
    } catch { /* noop */ }
  };

  const handleSubmit = async () => {
    if (rating === null || submitting) return;
    setSubmitting(true);
    await submitFeedback({ rating, comment, recommendations, flow });
    setSubmitted(true);
    setSubmitting(false);
    onSubmitted && onSubmitted();
  };

  if (submitted) {
    return (
      <div
        className="tt-fade-in"
        style={{
          maxWidth: '720px',
          margin: '0 auto var(--space-12)',
          padding: 'var(--space-6)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center'
        }}
      >
        <CheckCircle2 size={36} color="var(--success)" style={{ margin: '0 auto var(--space-3)' }} />
        <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-bold)' }}>
          Thanks — your feedback shapes the next version.
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>
          You're 1 of <strong style={{ color: 'var(--text-primary)' }}>12,847+</strong> men this month who help us tune the recommendations.
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Feedback"
      className="tt-fade-in"
      style={{
        maxWidth: '720px',
        margin: '0 auto var(--space-12)',
        padding: 'var(--space-6)',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center'
      }}
    >
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-1) var(--space-3)',
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-xs)',
        color: 'var(--accent)',
        fontWeight: 'var(--font-semibold)',
        marginBottom: 'var(--space-3)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em'
      }}>
        <Heart size={12} fill="currentColor" /> 5 second favor
      </div>

      <h3 style={{
        fontSize: 'var(--text-xl)',
        fontWeight: 'var(--font-bold)',
        marginBottom: 'var(--space-2)'
      }}>
        How accurate are these matches?
      </h3>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: 'var(--text-base)',
        marginBottom: 'var(--space-5)'
      }}>
        Your honest take is what makes Taper Empire smarter — pick one.
      </p>

      <div
        role="radiogroup"
        aria-label="How accurate are these matches?"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-5)',
          flexWrap: 'wrap'
        }}
      >
        {RATINGS.map((opt) => {
          const active = (hover ?? rating) === opt.value;
          const chosen = rating === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={chosen}
              aria-label={opt.label}
              onMouseEnter={() => setHover(opt.value)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(opt.value)}
              onBlur={() => setHover(null)}
              onClick={() => handleRate(opt.value)}
              style={{
                background: chosen ? 'var(--accent)' : active ? 'var(--bg-primary)' : 'transparent',
                border: `2px solid ${chosen ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-2) var(--space-3)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                transition: 'all var(--transition)',
                transform: active ? 'translateY(-2px) scale(1.05)' : 'none',
                minWidth: '60px'
              }}
            >
              <div style={{ lineHeight: 1 }}>{opt.emoji}</div>
              <div style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-semibold)',
                color: chosen ? 'var(--bg-primary)' : 'var(--text-secondary)',
                marginTop: 'var(--space-1)'
              }}>
                {opt.label}
              </div>
            </button>
          );
        })}
      </div>

      {rating !== null && (
        <div className="tt-fade-in" style={{ marginTop: 'var(--space-2)' }}>
          <label
            htmlFor="feedback-comment"
            style={{
              display: 'block',
              textAlign: 'left',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)',
              marginBottom: 'var(--space-2)',
              color: 'var(--text-primary)'
            }}
          >
            One thing we could do better? <span style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-normal)' }}>(optional, but really helps)</span>
          </label>
          <textarea
            id="feedback-comment"
            ref={commentRef}
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 2000))}
            placeholder={rating <= 2
              ? 'What missed the mark? Be brutally honest — we use every reply.'
              : 'What stood out? Anything you wish we showed you?'}
            rows={3}
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
              minHeight: '88px'
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'var(--space-3)',
            gap: 'var(--space-2)',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              {comment.length}/2000
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
                border: 'none',
                padding: 'var(--space-3) var(--space-6)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-semibold)',
                cursor: submitting ? 'wait' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                opacity: submitting ? 0.7 : 1
              }}
            >
              <Send size={16} /> {submitting ? 'Sending…' : comment.trim() ? 'Send feedback' : 'Done'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
