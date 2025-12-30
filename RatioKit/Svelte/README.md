# RatioKit - Vite & Tailwind v4 Optimized UI Components

RatioKit は、React, Vue 3, Svelte 5, および Pure HTML/CSS で共通のデザインを再現できる UI コンポーネント集です。

**⚠️ 重要: 本パッケージのフレームワーク版（React/Vue/Svelte）は、Vite 6+ および Tailwind CSS v4 環境での利用を前提に最適化されています。**  
Vite 以外のビルドツール（Webpack 等）や Tailwind v3 以前の環境では、設定の調整が必要になる場合があります。

## ⚙️ 推奨環境
- **Node.js**: v18.20 または v20.0 以上
- **Build Tool**: Vite 6+
- **CSS Engine**: Tailwind CSS v4

## ディレクトリ構成

パッケージを展開すると、以下の構造になっています。各フレームワークディレクトリは、そのまま `npm install` して動かせる Vite プロジェクトになっています。

```text
RatioKit/
├── React/              # React 18+ Vite プロジェクト (Tailwind v4)
├── Vue/                # Vue 3 Vite プロジェクト (Tailwind v4)
├── Svelte/             # Svelte 5 Vite プロジェクト (Tailwind v4)
├── SharedStyles/       # HTML プレビュー用や共有 CSS 本体
│   ├── RatioKit.css          # Tailwind用 (Layer構成)
│   └── RatioKitSimple.css    # CMS/既存サイト用 (詳細度0)
└── README.md           # このファイル
```

## 🚀 クイックスタート (Vite 環境)

各フレームワークのディレクトリに移動し、Vite 開発サーバーを起動してください。

```bash
cd React  # または Vue, Svelte
npm install
npm run dev
```
※ ポートが競合する場合は `npm run dev -- --port 3001` のように指定してください。

## 📦 既存の Vite プロジェクトへの導入

### 1. 必要なパッケージのインストール
Tailwind CSS v4 と Sass を使用するため、以下のインストールが必要です。

```bash
npm install -D sass @tailwindcss/vite
```

### 2. Vite の設定 (`vite.config.ts`)
Tailwind CSS v4 を動作させるためにプラグインを登録してください。

```typescript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
// framework plugin (react/vue/svelte)

export default defineConfig({
  plugins: [
    // react(), etc.
    tailwindcss(),
  ],
})
```

### 3. ファイルのコピー
各フォルダ内の `RatioKit` コンポーネントフォルダと `RatioKit.scss` をプロジェクトの `src` 配下（Svelte の場合は `src/lib`）にコピーしてください。

### 4. スタイルのインポート
`main.ts` 等で `RatioKit.scss` をインポートします。
**重要**: Tailwind v4 の `@import "tailwindcss";` を含む CSS ファイルの**後**に読み込むことで、Tailwind のユーティリティクラスによる上書きを確実に有効化できます。

## 🎨 スタイル・デザインの制御

### デザインシステムのカスタマイズ
RatioKit は CSS 変数でデザインを管理しています。`:root` で以下の変数を上書きすることで、プロジェクト全体の色やサイズを簡単に変更できます。

```css
:root {
  --mc: #2db542;    /* メインカラー */
  --sc: #3194c9;    /* サブカラー */
  --ac: #512db5;    /* アクセントカラー */
  --head: 80px;     /* ヘッダーの高さ */
  --gap: 30px;      /* 要素間の余白 */
}
```

### CSS 変数の使用方法
Tailwind クラス内で RatioKit の変数を使用する場合は、以下のように記述します。
- `min-h-[var(--head)]`
- `gap-[var(--gap)]`

## 🧩 各フレームワーク特有の注意点

### Svelte 5
- **マウント方法**: Svelte 5 では `mount` 関数を使用した初期化が推奨されます。
- **Snippet**: `PanelItem` や `CardItem` で画像を渡す際は `{#snippet figure()}` 構文を使用してください。

### React / Vue
- **TypeScript**: 提供されているコンポーネントは TypeScript 前提です。JavaScript 環境で利用する場合は拡張子を読み替えてください。

---
&copy; 2026 RatioKit
