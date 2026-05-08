import { useEffect, useState } from 'react';
import { Key, ExternalLink, X, Check, AlertTriangle } from 'lucide-react';
import { getApiKey, setStoredKey, subscribeApiKey, getStoredKey } from '../utils/apiKey';

function useApiKeyState() {
  const [apiKey, setApiKey] = useState(getApiKey());
  useEffect(() => subscribeApiKey((value) => setApiKey(value)), []);
  return apiKey;
}

function KeyDialog({ open, onClose, hasKey }) {
  const [draft, setDraft] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setDraft(getStoredKey() || '');
      setTouched(false);
    }
  }, [open]);

  if (!open) return null;

  const isValidShape = draft.trim().length >= 20;

  const save = () => {
    setTouched(true);
    if (!isValidShape) return;
    setStoredKey(draft.trim());
    onClose();
  };

  const clear = () => {
    setStoredKey('');
    setDraft('');
    setTouched(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        zIndex: 1000
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          maxWidth: '480px',
          width: '100%',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}
      >
        <button
          type="button"
          onClick={onClose}
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

        <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Gemini API Key
        </h3>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-sm)',
          marginBottom: 'var(--space-4)',
          lineHeight: 1.5
        }}>
          Paste your Google AI Studio API key to unlock AI photo analysis and on-face haircut previews. The key is stored only in your browser (localStorage).
        </p>

        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            color: 'var(--accent)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-semibold)',
            marginBottom: 'var(--space-4)',
            textDecoration: 'none'
          }}
        >
          <ExternalLink size={14} /> Get a free key from Google AI Studio
        </a>

        <label
          htmlFor="api-key-input"
          style={{
            display: 'block',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-semibold)',
            marginBottom: 'var(--space-2)'
          }}
        >
          API key
        </label>
        <input
          id="api-key-input"
          type="password"
          autoComplete="off"
          spellCheck="false"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); }}
          placeholder="AIza..."
          style={{
            width: '100%',
            padding: 'var(--space-3)',
            fontSize: 'var(--text-base)',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            border: `1px solid ${touched && !isValidShape ? 'var(--error)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            fontFamily: 'inherit',
            outline: 'none'
          }}
        />
        {touched && !isValidShape && (
          <p style={{ color: 'var(--error)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>
            That doesn't look like a valid key.
          </p>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginTop: 'var(--space-6)',
          flexWrap: 'wrap'
        }}>
          {hasKey ? (
            <button
              type="button"
              onClick={clear}
              style={{
                background: 'transparent',
                color: 'var(--error)',
                border: 'none',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
                cursor: 'pointer',
                padding: 'var(--space-2)'
              }}
            >
              Remove key
            </button>
          ) : <span />}

          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                padding: 'var(--space-3) var(--space-5)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'var(--font-semibold)',
                fontSize: 'var(--text-base)',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              style={{
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
                border: 'none',
                padding: 'var(--space-3) var(--space-5)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'var(--font-semibold)',
                fontSize: 'var(--text-base)',
                cursor: 'pointer'
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApiKeyBanner() {
  const apiKey = useApiKeyState();
  const [open, setOpen] = useState(false);

  if (apiKey) return <KeyDialog open={open} onClose={() => setOpen(false)} hasKey />;

  return (
    <>
      <div
        role="status"
        style={{
          background: 'var(--warning)',
          color: '#fff',
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-medium)',
          flexWrap: 'wrap',
          textAlign: 'center'
        }}
      >
        <AlertTriangle size={16} />
        <span>AI photo previews are off — add your free Gemini API key to enable them.</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            background: '#fff',
            color: 'var(--warning)',
            border: 'none',
            padding: 'var(--space-1) var(--space-3)',
            borderRadius: 'var(--radius-full)',
            fontWeight: 'var(--font-semibold)',
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-1)'
          }}
        >
          <Key size={14} /> Add key
        </button>
      </div>
      <KeyDialog open={open} onClose={() => setOpen(false)} hasKey={false} />
    </>
  );
}

export default function ApiKeyButton() {
  const apiKey = useApiKeyState();
  const [open, setOpen] = useState(false);
  const hasKey = Boolean(apiKey);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={hasKey ? 'API key configured — click to change' : 'Add Gemini API key'}
        title={hasKey ? 'API key configured' : 'Add Gemini API key'}
        style={{
          background: hasKey ? 'var(--bg-secondary)' : 'var(--accent)',
          color: hasKey ? 'var(--text-primary)' : 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-full)',
          padding: 'var(--space-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all var(--transition)'
        }}
      >
        {hasKey ? <Check size={18} /> : <Key size={18} />}
      </button>
      <KeyDialog open={open} onClose={() => setOpen(false)} hasKey={hasKey} />
    </>
  );
}
