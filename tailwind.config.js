/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A192F',
        secondary: '#0D1F3C',
        card: '#112240',
        teal: '#0E7490',
        teal2: '#06B6D4',
        gold: '#D4A017',
        bdr: '#1E3A5F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'grid-drift': 'gridDrift 28s linear infinite',
        'float': 'float 7s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'spin-slow': 'spin 35s linear infinite',
        'spin-reverse': 'spin 24s linear infinite reverse',
        'ticker': 'ticker 30s linear infinite',
        'wa-bounce': 'waBounce 2.5s ease-in-out infinite',
      },
      keyframes: {
        gridDrift: { to: { backgroundPosition: '60px 60px' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        pulseDot: { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: .4, transform: 'scale(.65)' } },
        ticker: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        waBounce: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-7px)' } },
      },
    },
  },
  plugins: [],
}
