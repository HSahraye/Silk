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
        bg: {
          DEFAULT: '#0A0A0B',
          subtle: '#0F0F11',
          raised: '#141417',
          inverse: '#FAFAF7',
        },
        ink: {
          DEFAULT: '#FAFAF7',
          muted: '#A1A1AA',
          subtle: '#71717A',
          inverse: '#0A0A0B',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.14)',
          inverse: 'rgba(10,10,11,0.08)',
        },
        gold: {
          50: '#FBF7EE',
          100: '#F4ECD3',
          200: '#E8D8A4',
          300: '#D9BF73',
          400: '#C9A24A',
          500: '#B8862A',
          600: '#9A6E1F',
          700: '#7A571A',
          800: '#5C4115',
          900: '#3F2D0F',
        },
        pistachio: {
          50: '#F1F6EC',
          100: '#DDEACE',
          200: '#BCD49E',
          300: '#9ABE6F',
          400: '#7AA847',
          500: '#5E8A30',
          600: '#476A24',
          700: '#324C19',
          800: '#1F3010',
          900: '#101A08',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 7vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '500' }],
        'display-xl': ['clamp(2.75rem, 5.5vw, 4.75rem)', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '500' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '500' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '500' }],
        'eyebrow': ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
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
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        rise: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      boxShadow: {
        glow: '0 0 80px -20px rgba(217, 191, 115, 0.35)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
