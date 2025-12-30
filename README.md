# RatioKit

RatioKit は、React、Vue、Svelte の各フレームワークに対応した、レスポンシブなデザインと比率（Ratio）を重視した UI コンポーネントライブラリおよび SCSS テンプレートのプロジェクトです。

## 主な機能と構成

- **マルチフレームワーク対応**: React, Vue, Svelte 5 のそれぞれで利用可能な共通のコンポーネントセットを提供。
- **Ratio-based Design**: 画像やレイアウトの比率を維持したまま柔軟にレスポンシブ対応が可能。
- **Tailwind CSS v4 対応**: 最新の Tailwind CSS v4 環境での動作を想定した SCSS 設計。
- **プレビュー機能**: Vite を使用して、各フレームワークのコンポーネントをブラウザ上で即座に確認可能。

## ディレクトリ構造

- `RatioKit/`: 各フレームワーク（React, Vue, Svelte）のコンポーネントソースおよび最新の SCSS ソース。
- `css/`: 各環境で即座に利用可能なコンパイル済み CSS ファイル。
- `scss/`: プロジェクト全体のベースとなる SCSS 構成ファイル群。

## プレビューの実行方法

Vite を使用して開発サーバーを起動し、各プレビューページにアクセスしてください。

```bash
npm install
npx vite
```

### プレビューページ一覧
- [React プレビュー](http://localhost:8080/ReactPreview.html)
- [Vue プレビュー](http://localhost:8080/VuePreview.html)
- [Svelte プレビュー](http://localhost:8080/SveltePreview.html)

## Vercel デプロイについて

このプロジェクトは Vercel へのデプロイを想定しており、GitHub と連携することで自動的にプレビュー環境が構築されます。
