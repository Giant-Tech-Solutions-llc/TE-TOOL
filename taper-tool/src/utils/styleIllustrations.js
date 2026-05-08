// Inline SVG illustrations for each approved style. Bundled with the app so
// every card always has a visual even when AI generation is unavailable.
// They render through a single <img src="data:image/svg+xml,..."> tag so
// the same component code path works whether the image is from Gemini or here.

function svg(palette, top, taperLines, accentLabel) {
  const { bg, skin, hair, shadow, accent } = palette;
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${bg.from}"/>
          <stop offset="100%" stop-color="${bg.to}"/>
        </linearGradient>
        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${skin.from}"/>
          <stop offset="100%" stop-color="${skin.to}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg)"/>
      <!-- shoulders -->
      <path d="M60 300 Q200 200 340 300 Z" fill="${shadow}"/>
      <!-- neck -->
      <rect x="180" y="200" width="40" height="40" fill="url(#skin)"/>
      <!-- head -->
      <ellipse cx="200" cy="160" rx="60" ry="72" fill="url(#skin)"/>
      <!-- ears -->
      <ellipse cx="142" cy="165" rx="8" ry="14" fill="url(#skin)"/>
      <ellipse cx="258" cy="165" rx="8" ry="14" fill="url(#skin)"/>
      <!-- hair top -->
      ${top}
      <!-- taper lines on sides -->
      ${taperLines}
      <!-- subtle features -->
      <ellipse cx="180" cy="160" rx="3" ry="4" fill="${shadow}" opacity="0.5"/>
      <ellipse cx="220" cy="160" rx="3" ry="4" fill="${shadow}" opacity="0.5"/>
      <path d="M188 188 Q200 196 212 188" stroke="${shadow}" stroke-width="2" fill="none" opacity="0.4"/>
      <!-- tiny label -->
      <text x="200" y="285" text-anchor="middle" fill="${accent}" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="600" letter-spacing="2">${accentLabel}</text>
    </svg>
  `.trim().replace(/\s+/g, ' '))}`;
}

const palette = {
  bg: { from: '#E5DED2', to: '#D8D0C6' },
  skin: { from: '#D8B89A', to: '#A88968' },
  hair: '#3A2418',
  shadow: '#1A1109',
  accent: '#7C6A58'
};

// Distinguishing top + taper geometry per style
const STYLES = {
  'low-taper-fade': {
    top: `<path d="M150 105 Q200 60 250 105 L255 130 Q200 100 145 130 Z" fill="${palette.hair}"/>`,
    taper: `
      <rect x="140" y="170" width="6" height="42" fill="${palette.hair}" opacity="0.35"/>
      <rect x="254" y="170" width="6" height="42" fill="${palette.hair}" opacity="0.35"/>
    `,
    label: 'LOW TAPER FADE'
  },
  'mid-taper-fade': {
    top: `<path d="M148 95 Q200 40 252 95 L260 130 Q200 90 140 130 Z" fill="${palette.hair}"/>`,
    taper: `
      <rect x="138" y="148" width="8" height="60" fill="${palette.hair}" opacity="0.45"/>
      <rect x="254" y="148" width="8" height="60" fill="${palette.hair}" opacity="0.45"/>
    `,
    label: 'MID TAPER FADE'
  },
  'high-taper-fade': {
    top: `<path d="M150 80 Q200 20 250 80 L262 120 Q200 75 138 120 Z" fill="${palette.hair}"/>`,
    taper: `
      <rect x="135" y="125" width="10" height="80" fill="${palette.hair}" opacity="0.55"/>
      <rect x="255" y="125" width="10" height="80" fill="${palette.hair}" opacity="0.55"/>
    `,
    label: 'HIGH TAPER FADE'
  },
  'blowout-taper': {
    top: `<path d="M138 100 Q160 20 200 30 Q240 20 262 100 L262 130 Q200 88 138 130 Z" fill="${palette.hair}"/>`,
    taper: `
      <rect x="135" y="155" width="10" height="55" fill="${palette.hair}" opacity="0.45"/>
      <rect x="255" y="155" width="10" height="55" fill="${palette.hair}" opacity="0.45"/>
    `,
    label: 'BLOWOUT TAPER'
  },
  'low-blowout-taper': {
    top: `<path d="M140 100 Q170 35 200 40 Q230 35 260 100 L260 130 Q200 90 140 130 Z" fill="${palette.hair}"/>`,
    taper: `
      <rect x="140" y="172" width="8" height="40" fill="${palette.hair}" opacity="0.4"/>
      <rect x="252" y="172" width="8" height="40" fill="${palette.hair}" opacity="0.4"/>
    `,
    label: 'LOW BLOWOUT TAPER'
  }
};

const cache = new Map();

export function getStyleIllustration(slug) {
  if (cache.has(slug)) return cache.get(slug);
  const style = STYLES[slug] || STYLES['low-taper-fade'];
  const url = svg(palette, style.top, style.taper, style.label);
  cache.set(slug, url);
  return url;
}
