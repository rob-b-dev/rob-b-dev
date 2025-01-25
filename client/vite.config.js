import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false, // Disable minification in production
    sourcemap: true, // Enable source maps for debugging in production
  },
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:5001', // Your API server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
