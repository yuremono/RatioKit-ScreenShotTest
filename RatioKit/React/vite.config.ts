import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

/**
 * RatioKit React Starter Config
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@ratiokit': path.resolve(__dirname, './src/components/RatioKit')
    }
  },
  optimizeDeps: {
    exclude: ['@tailwindcss/oxide', '@tailwindcss/blobs']
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
