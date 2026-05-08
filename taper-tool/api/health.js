export default function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  res.status(200).json({
    ok: true,
    proxy: 'available',
    hasKey: Boolean(apiKey),
    keyLength: apiKey ? apiKey.length : 0,
    textModel: process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash',
    imageModel: process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image-preview',
    runtime: 'vercel-node',
    nodeVersion: process.version
  });
}
