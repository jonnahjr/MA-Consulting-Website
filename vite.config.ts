import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'apps/web'),
  plugins: [react()],
  base: './',
  build: {
    outDir: path.resolve(__dirname, 'apps/web/dist'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 600
  },
  server: {
    port: 3000
  }
})
