import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

const defaultOptions = {
  changeOrigin: true,
  // Switch to true in production
  secure: false,
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    minify: false, // Disable minification in production
    sourcemap: true, // Enable source maps for debugging in production
  },
  server: {
    proxy: {
      // Set proxy to allow cookie requests from /auth backend endpoint
      '/auth': {
        target: 'http://localhost:5001',
        ...defaultOptions,
      },
      '/profile': {
        target: 'http://localhost:5001',
        ...defaultOptions,
      },
    },
  },
});