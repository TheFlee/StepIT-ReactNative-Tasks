/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#1E2460',
        accent: '#F97316',
        'app-bg': '#F0F2F8',
        muted: '#6B7280',
        danger: '#EF4444',
        'dark-navy': '#0F1235',
        'dark-surface': '#1A1F5E',
      },
    },
  },
  plugins: [],
};
