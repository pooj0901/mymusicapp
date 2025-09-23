import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['framer-motion', '@react-oauth/google']
  },
  build: {
    sourcemap: true
  }
});
