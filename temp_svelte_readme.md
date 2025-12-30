# RatioKit for Svelte

Svelte 5 用の RatioKit スターターキットです。このディレクトリには、すぐに動作確認できるデモ環境と、既存プロジェクトへ導入するためのコンポーネントが含まれています。

## 📦 このディレクトリについて

このディレクトリは以下の2つの用途で使用できます：

1. **デモとして動かす**: このディレクトリ自体を Vite 開発サーバーで起動し、RatioKit の動作を確認
2. **既存プロジェクトへ導入**: 必要なファイルを既存の Svelte プロジェクトにコピーして使用

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

既存の Svelte 5 プロジェクトに以下のパッケージをインストールします：

```bash
npm install sass
npm install -D @tailwindcss/vite
```

### Step 2: package.json の確認

`package.json` に以下が含まれていることを確認してください：

```json
{
  "dependencies": {
    "svelte": "^5.0.0",
    "sass": "^1.97.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@sveltejs/vite-plugin-svelte": "^6.0.0",
    "vite": "^7.0.0"
  }
}
```

### Step 3: Vite 設定の更新

`vite.config.ts` に以下の設定を追加します：

```typescript
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

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
    // Tailwind v4 / lightningcss のエラー回避
    exclude: ['@tailwindcss/oxide', 'lightningcss']
  }
})
```

### Step 4: ファイルのコピー

1. `src/lib/RatioKit/` フォルダを自身のプロジェクトの `src/lib/` にコピー
2. `RatioKit.scss` を `src/` にコピー

### Step 5: グローバルスタイルのインポート

`src/main.ts` または `src/routes/+layout.svelte` で SCSS をインポートします：

```typescript
// main.ts の場合
import './RatioKit.scss';
```

```svelte
<!-- +layout.svelte の場合 (SvelteKit) -->
<script>
  import '../RatioKit.scss';
</script>
```

**重要**: Tailwind v4 の `@import "tailwindcss";` がある場合は、その**後**に RatioKit.scss をインポートしてください。

### Step 6: Svelte 5 でのマウント

Svelte 5 では `mount` 関数を使用します：

```typescript
import { mount } from 'svelte';
import App from './App.svelte';

mount(App, { target: document.getElementById('app')! });
```

### Step 7: コンポーネントの使用

```svelte
<script>
  import { FlexRatio, Cards, CardItem } from '@ratiokit';
</script>

<div class="p-8">
  <FlexRatio class="flex55 gap-8">
    {#snippet children()}
      <div class="bg-gray-100 p-4">左側のコンテンツ</div>
      <div class="bg-gray-200 p-4">右側のコンテンツ</div>
    {/snippet}
  </FlexRatio>
</div>
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
- **Svelte 5 Runes**: このライブラリは Svelte 5 の新しい `$props` と `{#snippet}` 構文を使用しています
- **スタイルの競合**: 既存のスタイルと競合する場合は、RatioKit のクラスに接頭辞を付けるか、CSS の詳細度を調整してください

## 📂 ディレクトリ構造

```
Svelte/
├── index.html              # デモ用HTMLファイル
├── package.json            # 依存関係の定義
├── vite.config.ts          # Vite設定（Tailwind v4対応）
├── svelte.config.js        # Svelte設定
├── setup.sh                # 自動セットアップスクリプト
├── README.md               # このファイル
└── src/
    ├── main.ts             # エントリーポイント
    ├── App.svelte          # デモアプリケーション
    ├── RatioKit.scss       # RatioKitスタイル
    └── lib/
        └── RatioKit/       # コンポーネント本体
            ├── FlexRatio.svelte
            ├── Cards.svelte
            ├── CardItem.svelte
            ├── Accordion.svelte
            ├── Panel.svelte
            ├── PanelItem.svelte
            └── ImgText.svelte
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

### Svelte 5 の構文エラー

1. Svelte のバージョンが 5.x であることを確認
2. `{#snippet}` 構文が正しく使用されているか確認
3. `$props()` を使用しているコンポーネントがあることを確認

---

**RatioKit** - 比率でデザインする、次世代のUIテンプレート

