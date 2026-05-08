import { getApiKey } from './apiKey';
import {
  buildRecommendationPrompt,
  buildEditPrompt,
  buildStockPrompt,
  parseRecommendations,
  normalizeRecommendations,
  getFallbackRecommendations,
  extractInlineImage,
  extractBase64,
  IMAGE_MODEL_FALLBACKS
} from '../../api/_lib/prompts.js';

const TEXT_MODEL = import.meta.env.VITE_GEMINI_TEXT_MODEL || 'gemini-2.5-flash';
const IMAGE_MODEL = import.meta.env.VITE_GEMINI_IMAGE_MODEL || IMAGE_MODEL_FALLBACKS[0];
const TEXT_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent`;

const RECOMMEND_PROXY = '/api/recommend';
const IMAGE_PROXY = '/api/generate-image';

let proxyAvailable = null;

export async function checkProxy() {
  if (proxyAvailable !== null) return proxyAvailable;
  try {
    const res = await fetch(RECOMMEND_PROXY, { method: 'GET' });
    if (!res.ok) {
      proxyAvailable = { ok: false, hasKey: false };
      return proxyAvailable;
    }
    const data = await res.json().catch(() => ({}));
    proxyAvailable = { ok: true, hasKey: Boolean(data.hasKey) };
  } catch {
    proxyAvailable = { ok: false, hasKey: false };
  }
  return proxyAvailable;
}

async function fetchRecommendationsViaProxy(inputData) {
  try {
    const res = await fetch(RECOMMEND_PROXY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputData })
    });
    if (!res.ok) return { error: `proxy_${res.status}` };
    const data = await res.json();
    return {
      recs: Array.isArray(data.recommendations) ? data.recommendations : null,
      source: data.source || 'proxy',
      reason: data.reason || null,
      errors: data.errors || null,
      validationError: data.validationError || null
    };
  } catch (error) {
    console.warn('recommend proxy unavailable', error);
    return { error: 'network' };
  }
}

async function fetchImageViaProxy(rec, userPhoto, userMimeType) {
  try {
    const res = await fetch(IMAGE_PROXY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rec, userPhoto, userMimeType })
    });
    if (!res.ok) return { error: `proxy_${res.status}` };
    const data = await res.json();
    return {
      url: data && data.image_url ? data.image_url : null,
      reason: data && data.reason ? data.reason : null,
      errors: data && data.errors ? data.errors : null
    };
  } catch (error) {
    console.warn('image proxy unavailable', error);
    return { error: 'network' };
  }
}

async function getTextRecommendationsDirect(inputData) {
  const apiKey = getApiKey();
  if (!apiKey) return getFallbackRecommendations(inputData.data || {});

  const parts = [{ text: buildRecommendationPrompt(inputData) }];
  if (inputData.type === 'photo' && inputData.data && inputData.data.photo) {
    parts.push({
      inlineData: {
        mimeType: inputData.data.mimeType || 'image/jpeg',
        data: extractBase64(inputData.data.photo)
      }
    });
  }

  try {
    const response = await fetch(`${TEXT_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) throw new Error(`API request failed: ${response.status}`);

    const data = await response.json();
    const text =
      data && data.candidates && data.candidates[0] &&
      data.candidates[0].content && data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;

    const recs = parseRecommendations(text);
    if (recs && recs.length > 0) return normalizeRecommendations(recs);
    return getFallbackRecommendations(inputData.data || {});
  } catch (error) {
    console.error('Direct text API error:', error);
    return getFallbackRecommendations(inputData.data || {});
  }
}

async function generateStyleImageDirect(rec, userPhoto, userMimeType) {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const parts = [];
  if (userPhoto) {
    parts.push({ text: buildEditPrompt(rec) });
    parts.push({
      inlineData: {
        mimeType: userMimeType || 'image/jpeg',
        data: extractBase64(userPhoto)
      }
    });
  } else {
    parts.push({ text: buildStockPrompt(rec) });
  }

  const body = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ['IMAGE', 'TEXT'],
      temperature: 0.4
    }
  };

  const chain = [IMAGE_MODEL, ...IMAGE_MODEL_FALLBACKS]
    .filter((value, index, arr) => value && arr.indexOf(value) === index);

  for (const model of chain) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
      const res = await fetch(`${endpoint}?key=${encodeURIComponent(apiKey)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.warn(`Direct image model ${model} -> ${res.status}: ${text.slice(0, 300)}`);
        if (res.status === 404 || res.status === 400) continue;
        return null;
      }
      const data = await res.json();
      const url = extractInlineImage(data);
      if (url) return url;
    } catch (error) {
      console.error(`Direct image model ${model} error:`, error);
    }
  }
  return null;
}

export async function getRecommendations(inputData) {
  const proxy = await checkProxy();
  const diagnostics = {
    proxy: proxy.ok ? (proxy.hasKey ? 'server-key' : 'server-no-key') : 'no-proxy',
    textSource: 'fallback',
    imageSource: 'illustration',
    textReason: null,
    imageReason: null,
    errors: []
  };

  let recs;
  if (proxy.ok) {
    const proxyRes = await fetchRecommendationsViaProxy(inputData);

    // Hard-fail on validation: do NOT generate images for non-male photos.
    if (proxyRes && proxyRes.validationError) {
      return {
        recommendations: [],
        diagnostics: { ...diagnostics, textSource: 'gemini-validation-rejected' },
        validationError: proxyRes.validationError
      };
    }

    if (proxyRes && proxyRes.recs) {
      recs = proxyRes.recs;
      diagnostics.textSource = proxyRes.source === 'gemini' ? 'gemini-via-proxy' : 'fallback-via-proxy';
      if (proxyRes.errors) diagnostics.errors.push(...proxyRes.errors.map(e => ({ where: 'text', ...e })));
      if (proxyRes.reason) diagnostics.textReason = proxyRes.reason;
    } else if (proxyRes && proxyRes.error) {
      diagnostics.errors.push({ where: 'text-proxy', summary: proxyRes.error });
    }
  }
  if (!recs) {
    recs = await getTextRecommendationsDirect(inputData);
    diagnostics.textSource = getApiKey() ? 'gemini-direct' : 'fallback-local';
  }
  if (!Array.isArray(recs) || recs.length === 0) {
    recs = getFallbackRecommendations(inputData.data || {});
    diagnostics.textSource = 'fallback';
  }

  const userPhoto = inputData && inputData.type === 'photo' && inputData.data ? inputData.data.photo : null;
  const userMime = inputData && inputData.type === 'photo' && inputData.data ? inputData.data.mimeType : null;
  let imageHits = 0;

  const withImages = await Promise.all(
    recs.map(async (rec) => {
      let image = null;
      if (proxy.ok && proxy.hasKey) {
        const proxyImage = await fetchImageViaProxy(rec, userPhoto, userMime);
        if (proxyImage && proxyImage.url) {
          image = proxyImage.url;
        } else if (proxyImage) {
          if (proxyImage.errors) {
            diagnostics.errors.push(...proxyImage.errors.map(e => ({ where: 'image', style: rec.style_name, ...e })));
          }
          if (proxyImage.reason && !diagnostics.imageReason) {
            diagnostics.imageReason = proxyImage.reason;
          }
        }
      }
      if (!image) {
        image = await generateStyleImageDirect(rec, userPhoto, userMime);
      }
      if (image) imageHits += 1;
      return { ...rec, image_url: image || rec.image_url || null };
    })
  );

  diagnostics.imageSource = imageHits === recs.length
    ? 'gemini-all'
    : imageHits > 0
      ? `gemini-${imageHits}-of-${recs.length}`
      : 'illustration';

  if (typeof window !== 'undefined') {
    // Make the full diagnostic available in devtools for support.
    window.__TAPER_DIAG__ = diagnostics;
  }

  return { recommendations: withImages, diagnostics };
}
