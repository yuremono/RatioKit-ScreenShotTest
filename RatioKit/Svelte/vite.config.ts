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
      // 全てのコンポーネントを @ratiokit/ 名前空間で呼び出せるように設定
      '@ratiokit': path.resolve(__dirname, './src/lib/RatioKit')
    }
  },
  optimizeDeps: {
    // Tailwind v4 (oxide) の Rust 製エンジンが Vite の事前ビルドで
    // エラー（.node ファイルの読み込み失敗）を起こすのを防ぐための設定
    exclude: ['@tailwindcss/oxide', '@tailwindcss/blobs']
  },
  server: {
    // 稀に発生する Pre-transform error やキャッシュ起因のエラーへの対策として
    // 開発サーバーの設定を最適化
    fs: {
      allow: ['..']
    }
  }
})
