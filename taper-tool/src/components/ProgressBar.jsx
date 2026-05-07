export default function ProgressBar({ current, total }) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-2)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)'
      }}>
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height: '8px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}
      >
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: 'var(--accent)',
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );
}
