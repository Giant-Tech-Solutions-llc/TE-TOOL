const STORAGE_KEY = 'taper_tool_feedback';

function safeStorage() {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  } catch {
    return null;
  }
}

export function hasGivenFeedback() {
  const storage = safeStorage();
  if (!storage) return false;
  try {
    return Boolean(storage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

export function markFeedbackGiven() {
  const storage = safeStorage();
  if (!storage) return;
  try { storage.setItem(STORAGE_KEY, '1'); } catch { /* noop */ }
}

export async function submitFeedback({ rating, comment, recommendations, flow }) {
  const payload = {
    rating,
    comment,
    recommendations: Array.isArray(recommendations)
      ? recommendations.map((r) => ({
          style_name: r.style_name,
          match_score: r.match_score
        }))
      : [],
    flow,
    page: typeof window !== 'undefined' ? window.location.href : '',
    referrer: typeof document !== 'undefined' ? document.referrer : ''
  };

  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      markFeedbackGiven();
      return { ok: true };
    }
    return { ok: false, status: res.status };
  } catch (error) {
    return { ok: false, error: String(error && error.message ? error.message : error) };
  }
}
