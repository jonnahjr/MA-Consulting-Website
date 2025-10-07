import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-dom')) return 'vendor_react_dom'
          if (id.includes('react/') || id.includes('node_modules/react')) return 'vendor_react'
          if (id.includes('react-router-dom')) return 'vendor_router'
          if (id.includes('framer-motion')) return 'vendor_framer_motion'
          if (id.includes('react-helmet-async')) return 'vendor_helmet'
          if (id.includes('lucide-react')) return 'vendor_lucide'
          // fallback vendor chunk
          return 'vendor'
        },
      },
    },
  },
})