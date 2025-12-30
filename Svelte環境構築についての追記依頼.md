# Svelte環境構築についての追記依頼

RatioKit の Svelte 5 対応にあたり、既存の README やモーダルの説明に以下の情報を追加することで、導入がよりスムーズになると考えられます。

### 1. Svelte 5 特有の API についての明記
Svelte 5 では従来の `new App(...)` ではなく `mount` 関数を使用したマウントが推奨されています。
- **追記案**: `main.ts` での初期化コード例を記載。
  ```typescript
  import { mount } from 'svelte';
  import App from './App.svelte';
  mount(App, { target: document.getElementById('app')! });
  ```

### 2. Snippets（スニペット）の使用方法
`PanelItem` や `CardItem` 等で画像などを渡す際、Svelte 5 の `{#snippet figure()}` 構文を使用しています。
- **追記案**: コンポーネント利用時の具体的なコード例を README に含める。
  ```svelte
  <PanelItem>
    {#snippet figure()}
      <img src="..." alt="" />
    {/snippet}
    <p>コンテンツ</p>
  </PanelItem>
  ```

### 3. Tailwind CSS v4 の Vite プラグイン設定
Svelte 環境で Tailwind v4 を動作させるには、`vite.config.ts` に `@tailwindcss/vite` プラグインを追加する必要があります。
- **追記案**: Svelte 用の `vite.config.ts` 設定例を明示。

### 4. ポートの競合と実行環境
Vite 6 はデフォルトでポート 5173（または設定により 3000）を使用しますが、複数のフレームワークデモを同時に動かす場合にポートが競合します。
- **追記案**: `npm run dev -- --port 3001` のようにポートを指定する方法、または Node.js 18.20/20.0 以上が必要である旨を記載。

### 5. ディレクトリ構造の整合性
README では `src/lib/RatioKit` と記載されていますが、プロジェクト構成によっては `src/components/RatioKit` と混同しやすいため、Svelte 慣習に従った `lib` 配置であることをより強調すると親切です。

