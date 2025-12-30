# RatioKit

RatioKit は、React、Vue、Svelte の各フレームワークに対応した、レスポンシブなデザインと比率（Ratio）を重視した UI コンポーネントライブラリおよび SCSS テンプレートのプロジェクトです。



## 主な機能と構成

- **マルチフレームワーク対応**: React, Vue, Svelte 5 のそれぞれで利用可能な共通のコンポーネントセットを提供。
- **Ratio-based Design**: 画像やレイアウトの比率を維持したまま柔軟にレスポンシブ対応が可能。
- **Tailwind CSS v4 対応**: 最新の Tailwind CSS v4 環境での動作を想定した SCSS 設計。
- **プレビュー機能**: Vite を使用して、各フレームワークのコンポーネントをブラウザ上で即座に確認可能。

---

# RatioKit Starter Kit (配布パッケージ詳細)

このスターターキットは、React、Vue、Svelte 5、および HTML/CSS の各環境で RatioKit をすぐに試せるように構成されています。

## 🚀 クイックスタート

各フレームワークのディレクトリ（`React/`, `Vue/`, `Svelte/`）に入り、以下のコマンドを実行してください。

```bash
# 自動セットアップスクリプトを実行
bash setup.sh
```

または手動で：
```bash
npm install
npm run dev
```

## 導入時の注意点と改善点

### 1. Tailwind CSS v4 への対応 (Vite 設定)
最新の Tailwind CSS v4 (Rust エンジン) を使用している場合、環境によっては Vite の事前ビルドでエラーが発生することがあります。同梱の `vite.config.ts` には、これを回避するための設定が含まれています。

```typescript
// vite.config.ts
export default defineConfig({
  // ...
  optimizeDeps: {
    // Tailwind v4 / lightningcss のエラーを回避
    exclude: ['@tailwindcss/oxide', 'lightningcss']
  }
})
```

### 2. コンポーネントのインポート (エイリアス設定)
ディレクトリ構造に依存せず、どこからでも簡単にコンポーネントを呼び出せるよう、`@ratiokit` というエイリアスを設定しています。

```typescript
// インポート例
import { FlexRatio } from '@ratiokit';
```

### 3. スタイルのカプセル化 (Scoped CSS) について
RatioKit の基本スタイルは `RatioKit.scss` というグローバルな CSS として提供されていますが、Vue や Svelte の `scoped` 属性を組み合わせて使用することも可能です。既存プロジェクトへの導入でスタイルの干渉を防ぎたい場合は、コンポーネント内で以下のように記述することを推奨します。

## ⚠️ トラブルシューティング

### Tailwind CSS のスタイルが適用されない場合

#### 症状
配布パッケージを展開して開発サーバーを起動したが、Tailwind CSS のユーティリティクラス（`bg-gray-100`, `p-4` など）が効いていない。

#### 原因と解決方法

**原因**: Tailwind CSS v4 を Vite で使用する場合、CSS ファイル内で明示的にインポートする必要があります。

**解決方法**: `src/RatioKit.scss` の**先頭**（`@charset "utf-8";` の直後）に以下を追加してください：

```scss
@charset "utf-8";
@import "tailwindcss";  // ← この行を追加

// ... 以下、既存のコード
```

#### 注意事項
この変更により Tailwind の Preflight（CSSリセット）が有効になります。既存のスタイルと競合する場合は、プロジェクトルートに `tailwind.config.js` を作成して無効化できます：

```javascript
export default {
  corePlugins: {
    preflight: false
  }
}
```

### エントリーポイントでのインポートエラー

**React 環境**: `starter-main.tsx` または `main.tsx` で `RatioKit.scss` が正しくインポートされているか確認してください：

```typescript
import './RatioKit.scss';  // この行が必要
```

**Vue/Svelte 環境**: `main.ts` で同様に確認してください：

```typescript
import '../RatioKit.scss';  // パスはディレクトリ構造により異なります
```

## 📂 ディレクトリ構造
- `src/components/RatioKit/` (or `lib/`): 各フレームワークのコンポーネント本体
- `src/RatioKit.scss`: コアスタイル
- `vite.config.ts`: 推奨設定済みの設定ファイル

---

## 📂 プロジェクト全体のディレクトリ構造

- `RatioKit/`: 各フレームワーク（React, Vue, Svelte）のソースおよび最新の SCSS。
- `public/RatioKit.zip`: 配布用スターターキット（各環境のREADME/setup.sh同梱）。
- `css/`: コンパイル済み CSS ファイル。

## プレビューの実行方法 (プロジェクト全体)

Vite を使用して開発サーバーを起動し、各プレビューページにアクセスしてください。

```bash
npm install
npx vite
```

## 🚀 コーディングエージェントを使ってバイブコーディングを行う時のサンプル

> このREADMEを読んでください。これから Web サイトを [React / Vue / Svelte のいずれかを指定] で作成したいので、まずは配布パッケージに用意されているプレビュー画面を開発サーバーを立ち上げて正常に表示されることを確認してください。確認ができたらプレビュー用のURLを教えてください。


---
**RatioKit** - 比率でデザインする、次世代のUIテンプレート
