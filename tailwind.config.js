/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A1128',
          alt: '#0F172A',
        },
        primary: {
          DEFAULT: '#1E3A8A',
        },
        accent: {
          DEFAULT: '#2563EB',
          light: '#60A5FA',
        },
        highlight: '#A7C7FF',
        text: {
          DEFAULT: '#FFFFFF',
          muted: '#D6E4FF',
        }
      },
      fontFamily: {
  sans: ['Inter', 'sans-serif'],
  heading: ['Space Grotesk', 'sans-serif'],
  signature: ['"Great Vibes"', 'cursive'], 
}
    },
  },
  plugins: [],
}
