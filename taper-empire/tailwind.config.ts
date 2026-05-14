import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Dark editorial luxury palette */
        ink:      '#0A0A0A',
        surface:  '#111111',
        surface2: '#151515',
        surface3: '#1A1A1A',
        soft:     '#F5F3EF',
        mute:     '#A8A39A',
        line:     '#262422',
        gold:     { DEFAULT: '#8F7A58', hover: '#A08A66' },

        /* Legacy aliases kept for any leftover imports — mapped to the new palette */
        'jet-black': '#0A0A0A',
        charcoal:   '#151515',
        milk:       '#F5F3EF',
        oat:        '#1A1A1A',
        taupe:      '#A8A39A',
        mocha:      '#B0A998',
        border:     '#262422',
        accent:     { DEFAULT: '#8F7A58', hover: '#A08A66' },
        success:    '#7A9E78',
        warning:    '#B58A4D',
        error:      '#C76A5E',
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bricolage)', 'var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-up': 'slideUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
        marquee:    'marquee 38s linear infinite',
        scan:       'scan 4.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        scaleIn: { '0%': { transform: 'scale(0.96)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        scan:    { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(100%)' } },
      },
      backgroundImage: {
        /* Cinematic vignette — very subtle directional gradient */
        'vignette': 'radial-gradient(ellipse 80% 60% at 50% 30%, transparent 0%, rgba(0,0,0,0.45) 100%)',
        /* Tonal floor — top-to-bottom fade for hero footing */
        'floor':    'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)',
      },
    },
  },
  plugins: [],
}
export default config
