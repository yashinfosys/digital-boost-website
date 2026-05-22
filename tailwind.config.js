/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        boost: {
          yellow: '#facc15',
          gold: '#f59e0b',
          black: '#050505',
          ink: '#111111',
        },
      },
      boxShadow: {
        glow: '0 0 50px rgba(250, 204, 21, 0.2)',
        card: '0 20px 70px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'radial-boost': 'radial-gradient(circle at 20% 20%, rgba(250, 204, 21, 0.28), transparent 32%), radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.12), transparent 30%)',
      },
    },
  },
  plugins: [],
};
