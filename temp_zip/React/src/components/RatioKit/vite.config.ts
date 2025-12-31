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
    // Tailwind v4 (oxide) や一部の CSS ツールが Vite の事前ビルドで
    // エラー（.node ファイルや依存パッケージの読み込み失敗）を起こすのを防ぐための設定
    exclude: ['@tailwindcss/oxide', '@tailwindcss/blobs', 'lightningcss']
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
