/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          bg: "#0f172a",          // Deep Mountain Stone Slate
          card: "#1e293b",        // Clean Slate Card
          cardBorder: "#334155",  // Rock Border
          forest: "#1b4332",      // Deep Forest Green
          emerald: "#2d6a4f",     // Himalayan Pine Green
          leaf: "#52b788",        // Bright Earth Leaf
          mist: "#0284c7",        // Himalayan River Sky Blue
          clay: "#c05621",        // Terracotta Earth Clay
          stone: "#64748b"        // Granite Grey
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
