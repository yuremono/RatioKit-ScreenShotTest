# RatioKit for Vue

Vue 3 用の RatioKit スターターキットです。このディレクトリには、すぐに動作確認できるデモ環境と、既存プロジェクトへ導入するためのコンポーネントが含まれています。

## 📦 このディレクトリについて

このディレクトリは以下の2つの用途で使用できます：

1. **デモとして動かす**: このディレクトリ自体を Vite 開発サーバーで起動し、RatioKit の動作を確認
2. **既存プロジェクトへ導入**: 必要なファイルを既存の Vue プロジェクトにコピーして使用

## 🚀 デモとして動かす方法

### 自動セットアップ（推奨）

```bash
# このディレクトリで実行
bash setup.sh
```

`setup.sh` が以下を自動実行します：
- `npm install`: 依存関係のインストール
- `npm run dev`: 開発サーバーの起動

### 手動セットアップ

```bash
# 1. 依存関係をインストール
npm install

# 2. 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:5173 にアクセスすると、RatioKit のカタログページが表示されます。

## 📥 既存プロジェクトへの導入方法

### Step 1: 依存関係のインストール

既存の Vue 3 プロジェクトに以下のパッケージをインストールします：

```bash
npm install sass
npm install -D @tailwindcss/vite
```

### Step 2: package.json の確認

`package.json` に以下が含まれていることを確認してください：

```json
{
  "dependencies": {
    "vue": "^3.5.0",
    "sass": "^1.97.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@vitejs/plugin-vue": "^6.0.0",
    "vite": "^7.0.0"
  }
}
```

### Step 3: Vite 設定の更新

`vite.config.ts` に以下の設定を追加します：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@ratiokit': path.resolve(__dirname, './src/components/RatioKit'),
    },
  },
  optimizeDeps: {
    // Tailwind v4 / lightningcss のエラー回避
    exclude: ['@tailwindcss/oxide', 'lightningcss']
  }
})
```

### Step 4: ファイルのコピー

1. `src/components/RatioKit/` フォルダを自身のプロジェクトの `src/components/` にコピー
2. `RatioKit.scss` を `src/` にコピー

### Step 5: グローバルスタイルのインポート

`src/main.ts` で SCSS をインポートします：

```typescript
import './RatioKit.scss';
```

**重要**: Tailwind v4 の `@import "tailwindcss";` がある場合は、その**後**に RatioKit.scss をインポートしてください。

### Step 6: コンポーネントの使用

```vue
<script setup>
import { FlexRatio, Cards, CardItem } from '@ratiokit';
</script>

<template>
  <div class="p-8">
    <FlexRatio class="flex55 gap-8">
      <div class="bg-gray-100 p-4">左側のコンテンツ</div>
      <div class="bg-gray-200 p-4">右側のコンテンツ</div>
    </FlexRatio>
  </div>
</template>
```

## 🎨 カスタマイズ

CSS 変数を上書きすることで、デザインを簡単にカスタマイズできます：

```css
:root {
  --mc: #2db542; /* メインカラー */
  --gap: 30px;   /* 余白 */
  --wid: 1080px; /* コンテンツ幅 */
}
```

## 📝 補足事項

- **依存関係のエラー**: `lightningcss` や `@tailwindcss/oxide` 関連のエラーが出る場合は、`vite.config.ts` の `optimizeDeps.exclude` 設定を確認してください
- **エイリアス設定**: `@ratiokit` でインポートできるようにエイリアスを設定しています
- **スタイルの競合**: 既存のスタイルと競合する場合は、RatioKit のクラスに接頭辞を付けるか、CSS の詳細度を調整してください
- **Scoped CSS**: Vue の `<style scoped>` を使用する場合、RatioKit のクラスは影響を受けません

## 📂 ディレクトリ構造

```
Vue/
├── index.html              # デモ用HTMLファイル
├── package.json            # 依存関係の定義
├── vite.config.ts          # Vite設定（Tailwind v4対応）
├── setup.sh                # 自動セットアップスクリプト
├── README.md               # このファイル
└── src/
    ├── main.ts             # エントリーポイント
    ├── App.vue             # デモアプリケーション
    ├── RatioKit.scss       # RatioKitスタイル
    └── components/
        └── RatioKit/       # コンポーネント本体
            ├── FlexRatio.vue
            ├── Cards.vue
            ├── CardItem.vue
            ├── Accordion.vue
            ├── Panel.vue
            ├── PanelItem.vue
            └── ImgText.vue
```

## 🆘 トラブルシューティング

### npm install でエラーが出る

```bash
# キャッシュをクリアしてから再インストール
npm cache clean --force
npm install
```

### Vite でビルドエラーが出る

```bash
# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### スタイルが反映されない

1. `RatioKit.scss` が正しくインポートされているか確認
2. Tailwind の `@import "tailwindcss";` より**後**にインポートされているか確認
3. ブラウザのキャッシュをクリア

### コンポーネントが見つからない

1. `vite.config.ts` でエイリアス設定が正しいか確認
2. パスが正しいか確認（`@ratiokit` を使用）

---

**RatioKit** - 比率でデザインする、次世代のUIテンプレート

