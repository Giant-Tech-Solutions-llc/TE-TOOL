export default function Card({ children, padding = 'md', hover = false, style = {}, className = '' }) {
  const paddingMap = {
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)',
  };

  const cls = [hover ? 'tt-card-hover' : '', className].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className={cls}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: paddingMap[padding],
        transition: 'all var(--transition)',
        cursor: hover ? 'pointer' : 'default',
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
