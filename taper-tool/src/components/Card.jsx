export default function Card({ children, padding = 'md', hover = false, style = {} }) {
  const paddingMap = {
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  };

  return (
    <div
      className={hover ? 'tt-card-hover' : undefined}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: paddingMap[padding],
        transition: 'all var(--transition)',
        cursor: hover ? 'pointer' : 'default',
        boxShadow: 'var(--shadow-sm)',
        ...style
      }}
    >
      {children}
    </div>
  );
}
