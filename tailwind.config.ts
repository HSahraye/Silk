import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px', '2xl': '1320px' },
    },
    extend: {
      colors: {
        // Warmer dark surfaces — subtle shift from neutral black to a near-imperceptible
        // brown-black, the way Aesop reads cream-paper rather than printer-paper.
        bg: {
          DEFAULT: '#0C0907',
          subtle: '#110D0A',
          raised: '#181310',
          inverse: '#FBF6EC',
        },
        ink: {
          DEFAULT: '#F6EFE0',
          muted: '#A39884',
          subtle: '#6E6657',
          inverse: '#1A130C',
        },
        line: {
          DEFAULT: 'rgba(246,239,224,0.08)',
          strong: 'rgba(246,239,224,0.14)',
          inverse: 'rgba(26,19,12,0.10)',
        },
        // Honey gold — warmer, more food-evocative than before.
        gold: {
          50: '#FBF6EA',
          100: '#F4E9C9',
          200: '#E8D29A',
          300: '#D9B870',
          400: '#C99A47',
          500: '#B57E27',
          600: '#94621B',
          700: '#724A16',
          800: '#553711',
          900: '#3A260C',
        },
        // Slow-roasted bronze for accents and hover surfaces.
        bronze: {
          100: '#E8D3B9',
          200: '#CFAE85',
          300: '#B08555',
          400: '#8E6638',
          500: '#6C4B25',
          600: '#523618',
          700: '#3B260F',
        },
        // California pistachio — used as a single sensory accent.
        pistachio: {
          50: '#F0F4E8',
          100: '#DBE6C5',
          200: '#B8CD92',
          300: '#94B25F',
          400: '#75973A',
          500: '#5B7B27',
          600: '#445E1C',
          700: '#2F4213',
          800: '#1D2A0B',
          900: '#0F1706',
        },
        // Steeped rose — only for the rarest moments (corporate hero, hero glow).
        rose: {
          200: '#E9C5B8',
          300: '#D49A85',
          500: '#A55D43',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 7vw, 6.75rem)', { lineHeight: '0.95', letterSpacing: '-0.038em', fontWeight: '500' }],
        'display-xl': ['clamp(2.75rem, 5.5vw, 4.75rem)', { lineHeight: '1', letterSpacing: '-0.032em', fontWeight: '500' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.028em', fontWeight: '500' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.024em', fontWeight: '500' }],
        'eyebrow': ['0.72rem', { lineHeight: '1', letterSpacing: '0.22em', fontWeight: '500' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'rise': 'rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'shimmer': 'shimmer 8s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'drift': 'drift 16s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        rise: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        drift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(2%,-1%) scale(1.04)' },
        },
      },
      boxShadow: {
        glow: '0 0 110px -30px rgba(217, 184, 112, 0.40)',
        card: '0 1px 0 rgba(246,239,224,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.55)',
        ember: '0 -1px 0 rgba(246,239,224,0.05) inset, 0 30px 80px -30px rgba(181,126,39,0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
