import {
  buildEditPrompt,
  buildStockPrompt,
  extractInlineImage,
  extractBase64,
  IMAGE_MODEL_FALLBACKS
} from './_lib/prompts.js';

const PRIMARY_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || IMAGE_MODEL_FALLBACKS[0];

const MODEL_CHAIN = [PRIMARY_IMAGE_MODEL, ...IMAGE_MODEL_FALLBACKS]
  .filter((value, index, arr) => value && arr.indexOf(value) === index);

function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body.length > 0) {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return new Promise((resolve) => {
    let chunks = '';
    req.on('data', (c) => { chunks += c; });
    req.on('end', () => {
      try { resolve(JSON.parse(chunks || '{}')); } catch { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

async function callImageModel(model, body, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  return fetch(`${endpoint}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(200).json({ image_url: null, source: 'no_key' });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const rec = body && body.rec ? body.rec : null;
  const userPhoto = body && body.userPhoto ? body.userPhoto : null;
  const userMimeType = (body && body.userMimeType) || 'image/jpeg';

  if (!rec || !rec.style_name) {
    res.status(400).json({ error: 'Missing rec' });
    return;
  }

  const parts = [];
  if (userPhoto) {
    parts.push({ text: buildEditPrompt(rec) });
    parts.push({
      inline_data: {
        mime_type: userMimeType,
        data: extractBase64(userPhoto)
      }
    });
  } else {
    parts.push({ text: buildStockPrompt(rec) });
  }

  const requestBody = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ['IMAGE', 'TEXT'],
      temperature: 0.4
    }
  };

  for (const model of MODEL_CHAIN) {
    try {
      const response = await callImageModel(model, requestBody, apiKey);
      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        console.warn(`image model ${model} -> ${response.status}: ${errText.slice(0, 300)}`);
        if (response.status === 404 || response.status === 400) continue;
        break;
      }
      const data = await response.json();
      const url = extractInlineImage(data);
      if (url) {
        res.status(200).json({ image_url: url, source: 'gemini', model });
        return;
      }
      console.warn(`image model ${model} returned no inline image, trying fallback`);
    } catch (error) {
      console.error(`image model ${model} error`, error);
    }
  }

  res.status(200).json({ image_url: null, source: 'unavailable' });
}
