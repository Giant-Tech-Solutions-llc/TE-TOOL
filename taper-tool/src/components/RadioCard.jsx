import { Check } from 'lucide-react';

export default function RadioCard({ label, value, selected, onChange, icon }) {
  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      className="tt-radio"
      onClick={() => onChange(value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange(value);
        }
      }}
      style={{
        position: 'relative',
        padding: 'var(--space-4)',
        border: `2px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        transition: 'all var(--transition)',
        background: selected ? 'var(--bg-secondary)' : 'transparent',
        outline: 'none',
        textAlign: 'center',
        userSelect: 'none'
      }}
    >
      {selected && (
        <div style={{
          position: 'absolute',
          top: 'var(--space-2)',
          right: 'var(--space-2)',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Check size={14} color="var(--bg-primary)" />
        </div>
      )}
      {icon && <div style={{ marginBottom: 'var(--space-2)' }}>{icon}</div>}
      <div style={{
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-medium)',
        color: 'var(--text-primary)'
      }}>
        {label}
      </div>
    </div>
  );
}
