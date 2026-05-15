import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ───────────────────────────────────────────────────────────────
       *  COLOR SYSTEM — Taper Empire Global Design System v1.0
       *  Single source of visual truth. Aligned exactly to spec.
       * ─────────────────────────────────────────────────────────────── */
      colors: {
        /* Background */
        ink:        '#070707',          // Primary background
        /* Surfaces — tonal hierarchy */
        surface:    '#111111',          // Surface Primary
        surface2:   '#161616',          // Surface Secondary
        surface3:   '#1C1C1C',          // Surface Elevated
        /* Text — luxury soft white + opacity layers */
        soft:       '#F5F3EF',          // Primary Text
        mute:       'rgba(245,243,239,0.72)', // Secondary Text
        faint:      'rgba(245,243,239,0.48)', // Muted Text
        /* Borders — tonal, not literal */
        line:       'rgba(255,255,255,0.08)',
        lineHover:  'rgba(255,255,255,0.16)',
        /* Accent — muted bronze gold */
        gold:       { DEFAULT: '#8F7A58', hover: '#A08A66' },

        /* Legacy aliases — keep old imports working during phased rollout */
        'jet-black': '#070707',
        charcoal:   '#161616',
        milk:       '#F5F3EF',
        oat:        '#1C1C1C',
        taupe:      'rgba(245,243,239,0.48)',
        mocha:      'rgba(245,243,239,0.72)',
        border:     'rgba(255,255,255,0.08)',
        accent:     { DEFAULT: '#8F7A58', hover: '#A08A66' },
        success:    '#7A9E78',
        warning:    '#B58A4D',
        error:      '#C76A5E',
      },

      /* ───────────────────────────────────────────────────────────────
       *  RADIUS SYSTEM — soft premium geometry
       * ─────────────────────────────────────────────────────────────── */
      borderRadius: {
        'soft':  '12px',  // Small
        'med':   '18px',  // Medium
        'lg-x':  '24px',  // Large
        'hero':  '32px',  // Hero / cinematic
        'card':  '28px',  // Standard card radius
        'pill':  '9999px',
      },

      /* ───────────────────────────────────────────────────────────────
       *  TYPOGRAPHY — fluid editorial scale
       * ─────────────────────────────────────────────────────────────── */
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bricolage)', 'var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        // tuple shape: [size, { lineHeight, letterSpacing, fontWeight }]
        'hero-xl':    ['clamp(72px, 9vw, 140px)', { lineHeight: '0.92', letterSpacing: '-0.06em', fontWeight: '800' }],
        'hero-lg':    ['clamp(52px, 6vw, 88px)',  { lineHeight: '0.96', letterSpacing: '-0.05em', fontWeight: '800' }],
        'section':    ['clamp(38px, 4vw, 64px)',  { lineHeight: '1',    letterSpacing: '-0.04em', fontWeight: '800' }],
        'card-title': ['32px',                    { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '800' }],
        'editorial':  ['24px',                    { lineHeight: '1.7',  letterSpacing: '-0.02em' }],
        'body-lg':    ['18px',                    { lineHeight: '1.8',  letterSpacing: '-0.01em' }],
        'support':    ['15px',                    { lineHeight: '1.7' }],
      },

      /* ───────────────────────────────────────────────────────────────
       *  SPACING — cinematic whitespace rhythm
       * ─────────────────────────────────────────────────────────────── */
      spacing: {
        'section':         '140px',
        'section-compact': '90px',
        'section-mobile':  '72px',
      },
      maxWidth: {
        'editorial': '1180px',
        'cinematic': '1440px',
        'reading':   '720px',
      },

      /* ───────────────────────────────────────────────────────────────
       *  SHADOW — restrained luxury (single tonal shadow)
       * ─────────────────────────────────────────────────────────────── */
      boxShadow: {
        'luxury':    '0 20px 60px rgba(0,0,0,0.38)',
        'luxury-sm': '0 10px 32px rgba(0,0,0,0.30)',
        'lift':      '0 24px 80px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.4)',
      },

      /* ───────────────────────────────────────────────────────────────
       *  ANIMATIONS — restrained, cinematic, ease-out
       * ─────────────────────────────────────────────────────────────── */
      animation: {
        'fade-in':   'fadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up':  'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in':  'scaleIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal':    'reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
        'marquee':   'marquee 38s linear infinite',
        'scan':      'scan 4.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        scaleIn: { '0%': { transform: 'scale(0.96)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        reveal:  { '0%': { clipPath: 'inset(0 100% 0 0)' }, '100%': { clipPath: 'inset(0 0 0 0)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        scan:    { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(100%)' } },
      },

      transitionTimingFunction: {
        'lux': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      backdropBlur: {
        'nav': '18px',
      },

      backgroundImage: {
        /* Card surface — subtle tonal lift */
        'card-surface': 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
        /* Hero vignette */
        'vignette':     'radial-gradient(ellipse 80% 60% at 50% 30%, transparent 0%, rgba(0,0,0,0.45) 100%)',
        'floor':        'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)',
      },
    },
  },
  plugins: [],
}
export default config
