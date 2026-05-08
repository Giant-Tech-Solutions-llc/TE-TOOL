const STORAGE_KEY = 'taper_tool_gemini_key';

function safeStorage() {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function getStoredKey() {
  const storage = safeStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw && raw.trim() ? raw.trim() : null;
  } catch {
    return null;
  }
}

export function getApiKey() {
  const stored = getStoredKey();
  if (stored) return stored;
  const env = import.meta.env.VITE_GEMINI_API_KEY;
  return env && String(env).trim() ? String(env).trim() : null;
}

export function setStoredKey(value) {
  const storage = safeStorage();
  if (!storage) return false;
  try {
    if (!value || !value.trim()) {
      storage.removeItem(STORAGE_KEY);
    } else {
      storage.setItem(STORAGE_KEY, value.trim());
    }
    notifyListeners();
    return true;
  } catch {
    return false;
  }
}

export function clearStoredKey() {
  return setStoredKey('');
}

const listeners = new Set();

function notifyListeners() {
  const value = getApiKey();
  listeners.forEach((cb) => {
    try { cb(value); } catch { /* noop */ }
  });
}

export function subscribeApiKey(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function hasApiKey() {
  return Boolean(getApiKey());
}
