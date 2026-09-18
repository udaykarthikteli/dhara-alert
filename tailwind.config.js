/** @type {import('tailwindcss').Config} */
export default { darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          bg: "#f5f0e6",          // Warm Himalayan Sandstone Earth Background
          card: "#ffffff",        // Crisp Warm White Card Container
          cardBorder: "#e2e8f0",  // Stone Slate Border
          forest: "#1b4332",      // Deep Himalayan Forest Green
          emerald: "#2d6a4f",     // Himalayan Pine Green
          leaf: "#52b788",        // Leaf Green
          river: "#0284c7",       // Himalayan River Sky Blue
          terracotta: "#c05621",  // Warm Clay Warning
          clayRed: "#b91c1c",     // Critical Red Earth
          stone: "#475569",       // Granite Slate
          darkText: "#0f172a"     // Crisp Reading Text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
