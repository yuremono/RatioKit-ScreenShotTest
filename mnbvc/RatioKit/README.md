# RatioKit Starter Kit

このスターターキットは、React、Vue、Svelte 5 の各環境で RatioKit をすぐに試せるように構成されています。

## 導入時の注意点と改善点

### 1. Tailwind CSS v4 への対応 (Vite 設定)
最新の Tailwind CSS v4 (Rust エンジン) を使用している場合、環境によっては Vite の事前ビルドでエラーが発生することがあります。
同梱の `vite.config.ts` には、これを回避するための設定が含まれています。

```typescript
// vite.config.ts
export default defineConfig({
  // ...
  optimizeDeps: {
    exclude: ['@tailwindcss/oxide'] // Tailwind v4 の Rust エンジンによるエラーを回避
  }
})
```

### 2. コンポーネントのインポート (エイリアス設定)
ディレクトリ構造に依存せず、どこからでも簡単にコンポーネントを呼び出せるよう、`@ratiokit` というエイリアスを設定しています。

```typescript
// インポート例
import { ImgText } from '@ratiokit';
```

### 3. スタイルのカプセル化 (Scoped CSS) について
RatioKit の基本スタイルは `RatioKit.scss` というグローバルな CSS として提供されていますが、Vue や Svelte の `scoped` 属性を組み合わせて使用することも可能です。

既存プロジェクトへの導入でスタイルの干渉を防ぎたい場合は、コンポーネント内で以下のように記述することを推奨します。

```vue
<!-- Vue での例 -->
<style scoped>
/* 独自のスタイルをここに追加 */
</style>
```

## ディレクトリ構造
- `src/components/RatioKit/`: 各フレームワークのコンポーネント本体
- `src/RatioKit.scss`: コアスタイル
- `vite.config.ts`: 推奨設定済みの設定ファイル

