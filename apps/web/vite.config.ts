import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor_framer_motion'
            if (id.includes('react-helmet-async')) return 'vendor_helmet'
            if (id.includes('lucide-react')) return 'vendor_lucide'
            if (id.includes('node_modules')) return 'vendor'
          }
        },
      },
    },
  },
})