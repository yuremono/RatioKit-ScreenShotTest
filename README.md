# RatioKit

RatioKit は、React、Vue、Svelte の各フレームワークに対応した、レスポンシブなデザインと比率（Ratio）を重視した UI コンポーネントライブラリおよび SCSS テンプレートのプロジェクトです。

[**Live Demo (https://ratiokit.vercel.app/)**](https://ratiokit.vercel.app/)

※本プロジェクトは個人開発であり、開発効率を優先するためプルリクエストを経由せず、メインブランチへの直接コミットを中心に構築しています。

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

**原因**: Tailwind CSS v4 を Vite で使用する場合、Vite のプラグイン設定（`vite.config.ts`）が正しく行われている必要があります。

**解決方法**: 各環境の `vite.config.ts` に `@tailwindcss/vite` プラグインが含まれているか確認してください。

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    // ...
    tailwindcss(),
  ],
});
```

### エントリーポイントでのインポート確認

各環境の `main.tsx` または `main.ts` で、以下の順序でインポートされているか確認してください：

```typescript
import './style.css';      // 1. Tailwind の読み込み (@import "tailwindcss" を含む)
import './RatioKit.scss';  // 2. RatioKit スタイルの読み込み
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
npm run dev
# または
npx vite
```

開発サーバーは `http://localhost:8080` で起動します。

## 📋 よく使うコマンド

### 開発サーバーの起動

```bash
# npm scripts を使用（推奨）
npm run dev

# または直接コマンド
npx vite
```

開発サーバーは `http://localhost:8080` で起動します。

**停止方法**: 通常はターミナルで `Ctrl + C` を押すと停止します。

### 開発サーバーの停止

```bash
# ポート8080で実行中の開発サーバーを停止
npm run stop

# すべてのViteプロセスを停止
npm run stop:all

# または直接コマンド（ポート8080を停止）
lsof -ti:8080 | xargs kill

# または直接コマンド（すべてのViteプロセスを停止）
pkill -f vite
```

### ビルド

```bash
# プロジェクト全体をビルド
npm run build

# CSS のみビルド（Tailwind版）
npm run build:css:tailwind

# CSS のみビルド（Simple版）
npm run build:css:simple
```

### 配布パッケージ（Zip）の更新

```bash
# Zipファイルを再作成してデプロイまで実行
npm run deploy

# Zipファイルのみ再作成
npm run rebuild:zip
```

### Git操作

```bash
# 変更をコミットしてプッシュ
git add .
git commit -m "your commit message"
git push origin main
```

### Vercelへのデプロイ

```bash
# npm scripts を使用（推奨）
npm run deploy:vercel

# または直接コマンド
vercel --yes --prod --force
```

**注意**: Vercelは通常、GitHubにプッシュすると自動デプロイされますが、`--force`オプションで手動で強制デプロイできます。

### よく使うコマンドの一覧（npm scripts）

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動（ポート8080） |
| `npm run stop` | ポート8080で実行中の開発サーバーを停止 |
| `npm run stop:all` | すべてのViteプロセスを停止 |
| `npm run build` | プロジェクト全体をビルド |
| `npm run build:css:tailwind` | Tailwind版CSSをビルド |
| `npm run build:css:simple` | Simple版CSSをビルド |
| `npm run rebuild:zip` | 配布用Zipファイルを再作成 |
| `npm run deploy` | Zip更新→Gitコミット→プッシュ→Vercelデプロイを一括実行 |
| `npm run deploy:vercel` | Vercelに手動デプロイ |

**ヒント**: `npm run` と入力すると、利用可能なコマンド一覧が表示されます。

## 🚀 コーディングエージェントを使ってバイブコーディングを行う時のサンプル

> このREADMEを読んでください。これから Web サイトを [React / Vue / Svelte のいずれかを指定] で作成したいので、まずは配布パッケージに用意されているプレビュー画面を開発サーバーを立ち上げて正常に表示されることを確認してください。確認ができたらプレビュー用のURLを教えてください。


---
**2026 - RatioKit** 
