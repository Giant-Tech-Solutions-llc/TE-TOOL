import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  loading,
  icon,
  type = 'button',
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontWeight: 'var(--font-semibold)',
    transition: 'all var(--transition)',
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  };

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--bg-primary)'
    },
    secondary: {
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)'
    }
  };

  const sizes = {
    sm: { padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' },
    md: { padding: 'var(--space-3) var(--space-6)', fontSize: 'var(--text-base)' },
    lg: { padding: 'var(--space-4) var(--space-8)', fontSize: 'var(--text-lg)' }
  };

  const className = `tt-btn-${variant}`;

  return (
    <button
      type={type}
      className={className}
      style={{ ...baseStyles, ...variants[variant], ...sizes[size] }}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={18} className="tt-spin" />}
      {icon && !loading && icon}
      {children}
    </button>
  );
}
