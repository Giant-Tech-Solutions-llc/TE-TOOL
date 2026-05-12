import { Check } from 'lucide-react';

export default function RadioCard({ label, desc, value, selected, onChange, advancing }) {
  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      className={`tt-radio${selected ? ' tt-radio-selected' : ''}`}
      onClick={() => !advancing && onChange(value)}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !advancing) {
          e.preventDefault();
          onChange(value);
        }
      }}
      style={{
        position: 'relative',
        padding: 'var(--space-4)',
        border: `2px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        cursor: advancing ? 'default' : 'pointer',
        transition: 'border-color var(--transition), background var(--transition)',
        background: selected ? 'var(--bg-secondary)' : 'transparent',
        outline: 'none',
        textAlign: 'center',
        userSelect: 'none',
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
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Check size={13} color="var(--bg-primary)" strokeWidth={2.5} />
        </div>
      )}
      <div style={{
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-semibold)',
        color: 'var(--text-primary)',
        marginBottom: desc ? 'var(--space-1)' : 0,
        paddingRight: selected ? 'var(--space-4)' : 0,
      }}>
        {label}
      </div>
      {desc && (
        <div style={{
          fontSize: 'var(--text-xs)',
          color: selected ? 'var(--text-secondary)' : 'var(--text-tertiary)',
          lineHeight: 1.4,
        }}>
          {desc}
        </div>
      )}
    </div>
  );
}
