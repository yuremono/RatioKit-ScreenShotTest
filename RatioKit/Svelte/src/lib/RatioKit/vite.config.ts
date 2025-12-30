import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

/**
 * RatioKit Svelte Starter Config
 */
export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@ratiokit': path.resolve(__dirname, './src/lib/RatioKit')
    }
  },
  optimizeDeps: {
    exclude: ['@tailwindcss/oxide', '@tailwindcss/blobs', 'lightningcss']
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
