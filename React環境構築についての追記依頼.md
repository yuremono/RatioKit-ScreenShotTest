# React環境構築についての追記依頼

RatioKitのReact版を導入する際、以下の情報がドキュメント（READMEやモーダル）に不足している、または強調されているとよりスムーズに構築できると感じました。

## 1. 依存関係の明示的なインストール手順
READMEには「導入されていることを確認してください」とありますが、Tailwind CSS v4環境では以下のパッケージが必須となるため、インストールコマンドを記載することをお勧めします。

```bash
npm install -D sass @tailwindcss/vite
```

## 2. Viteの設定 (`vite.config.ts`)
Tailwind CSS v4をViteで使用する場合、`@tailwindcss/vite`プラグインの登録が必須です。既存プロジェクトへの導入手順として、以下の設定例を追記すると親切です。

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

## 3. スタイルのインポート順序
`RatioKit.scss`はTailwindのレイヤー機能（@layer components）を使用しているため、`main.tsx`などでインポートする際、Tailwindのベーススタイル（`@import "tailwindcss";`を含むファイル）の直後に読み込むことが推奨される旨をより明確に伝えるとトラブルを防げます。

## 4. デザインシステムのカスタマイズ
`RatioKit.scss`（またはその内部で読み込まれている`_10template.scss`）で定義されている変数（`--mc`: メインカラー, `--sc`: サブカラー, `--head`: ヘッダー高など）を、プロジェクトの`:root`で上書きすることで簡単にカスタマイズできる点について、具体例を交えて説明があると活用しやすくなります。



