import { NextRequest, NextResponse } from 'next/server'
import {
  buildEditPrompt,
  buildStockPrompt,
  extractInlineImage,
  extractBase64,
  IMAGE_MODEL_FALLBACKS,
} from '@/lib/gemini/prompts'

export const runtime = 'nodejs'
export const maxDuration = 60

const PRIMARY_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || IMAGE_MODEL_FALLBACKS[0]
const MODEL_CHAIN = [PRIMARY_IMAGE_MODEL, ...IMAGE_MODEL_FALLBACKS].filter(
  (v, i, arr) => v && arr.indexOf(v) === i
)

async function callImageModel(model: string, body: any, apiKey: string) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
  return fetch(`${endpoint}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ image_url: null, source: 'no_key' })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const rec = body?.rec
  const userPhoto = body?.userPhoto
  const userMimeType = body?.userMimeType || 'image/jpeg'

  if (!rec?.style_name) {
    return NextResponse.json({ error: 'Missing rec' }, { status: 400 })
  }

  const parts: any[] = []
  if (userPhoto) {
    parts.push({ text: buildEditPrompt(rec) })
    parts.push({ inlineData: { mimeType: userMimeType, data: extractBase64(userPhoto) } })
  } else {
    parts.push({ text: buildStockPrompt(rec) })
  }

  const requestBody = {
    contents: [{ parts }],
    generationConfig: { responseModalities: ['IMAGE', 'TEXT'], temperature: 0.4 },
  }

  const errors: Array<{ model: string; status: number; summary: string }> = []
  let quotaHit = false

  for (const model of MODEL_CHAIN) {
    try {
      const response = await callImageModel(model, requestBody, apiKey)
      if (!response.ok) {
        const errText = await response.text().catch(() => '')
        const summary = `${response.status} ${errText.slice(0, 240)}`.trim()
        errors.push({ model, status: response.status, summary })
        if (response.status === 429) quotaHit = true
        continue
      }
      const data = await response.json()
      const url = extractInlineImage(data)
      if (url) return NextResponse.json({ image_url: url, source: 'gemini', model })
      errors.push({ model, status: 200, summary: 'no_inline_image' })
    } catch (error: any) {
      errors.push({ model, status: 0, summary: String(error?.message || error) })
    }
  }

  return NextResponse.json({
    image_url: null,
    source: 'unavailable',
    reason: quotaHit ? 'quota_exceeded' : 'upstream_error',
    errors,
  })
}
