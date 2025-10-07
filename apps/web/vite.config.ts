import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // important for Vercel
  server: { port: 3000 },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // everything goes into one vendor chunk to avoid React internal errors
        manualChunks: () => 'vendor'
      }
    }
  }
})
