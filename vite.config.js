import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  // Ensure react-map-gl is pre-bundled
  optimizeDeps: {
    include: ['react-map-gl', 'react-map-gl/mapbox']
  }
});
