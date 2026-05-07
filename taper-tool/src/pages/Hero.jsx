import Button from '../components/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onStart }) {
  return (
    <div
      className="tt-fade-in"
      style={{
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'var(--space-16) var(--space-4)'
      }}
    >
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-2) var(--space-4)',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-full)',
        marginBottom: 'var(--space-6)',
        fontSize: 'var(--text-sm)',
        color: 'var(--accent)',
        fontWeight: 'var(--font-medium)'
      }}>
        <Sparkles size={16} />
        AI-Powered Recommendations
      </div>

      <h1 style={{
        fontSize: 'var(--text-4xl)',
        fontWeight: 'var(--font-bold)',
        marginBottom: 'var(--space-4)',
        lineHeight: 1.2,
        letterSpacing: '-0.02em'
      }}>
        Find Your Perfect Taper Haircut
      </h1>

      <p style={{
        fontSize: 'var(--text-lg)',
        color: 'var(--text-secondary)',
        marginBottom: 'var(--space-8)',
        maxWidth: '600px',
        margin: '0 auto var(--space-8)'
      }}>
        Upload a photo or take our quick quiz to get personalized style recommendations
      </p>

      <Button size="lg" icon={<ArrowRight size={20} />} onClick={onStart}>
        Get Started
      </Button>

      <div style={{
        marginTop: 'var(--space-8)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-tertiary)'
      }}>
        Join 12,847 men who found their perfect style this month
      </div>
    </div>
  );
}
