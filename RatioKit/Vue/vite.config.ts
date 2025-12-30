import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

/**
 * RatioKit Vue Starter Config
 */
export default defineConfig({
  plugins: [
    vue(),
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
