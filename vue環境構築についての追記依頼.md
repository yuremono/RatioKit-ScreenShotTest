# Vue環境構築についての追記依頼

RatioKitのVue環境構築において、以下の点について補足説明があると、よりスムーズに導入できると感じました。

## 1. Tailwind CSS v4 の Vite プラグイン設定
Tailwind CSS v4 を Vite で使用する場合、`vite.config.ts` に `@tailwindcss/vite` プラグインを追加する必要があります。この設定が抜けているとスタイルが適用されないため、導入手順に明記することを推奨します。

```typescript
// vite.config.ts の例
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
```

## 2. スタイルシートのインポート先
`RatioKit.scss` をコピーした後のインポート先（例：`main.ts` や `App.vue`）を具体的に指定すると、初心者が迷わずに済みます。特に Tailwind v4 の `@import "tailwindcss";` より後で読み込むべきという点は非常に重要です。



## 4. TypeScript への対応
提供されているスターターキットは TypeScript 前提（`.ts` ファイル）となっています。JavaScript プロジェクトへ導入する場合のファイル拡張子の読み替え（`.ts` → `.js`）や、必要となる型定義についての注釈があると、より幅広いユーザーに対応できると考えられます。

