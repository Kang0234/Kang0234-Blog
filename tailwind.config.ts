import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: '#fff5f8',
          100: '#ffe4ee',
          200: '#ffc9dd',
          300: '#ffa0c2',
          400: '#ff7ab6',
          500: '#f24d94',
          600: '#d92f77',
          700: '#b81f5f',
          800: '#981c50',
          900: '#7e1c45',
        },
      },
      fontFamily: {
        cute: ['"ZCOOL KuaiLe"', '"Noto Sans SC"', 'cursive', 'sans-serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'sakura-fall': 'sakuraFall linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        sakuraFall: { '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' }, '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' } },
      },
    },
  },
  plugins: [],
};
export default config;
