# Skill: UI Reproduction (CMS Template & Tailwind)

スクリーンショットを分析し、自社CMSの独自クラスとTailwind CSSを用いて高精度に再現するスキルです。

## Metadata
- **ID**: `ui-reproduction`
- **Category**: Frontend Development
- **Resources**: [Patterns](./patterns.md), [Variables](./variables.md)

## Workflow

### 1. 視覚的分析 (Visual Analysis)
スクリーンショットを以下の優先順位で解析します。
1. **Layout**: 全幅（`.wrapper100in`）かコンテナ内か。比率（`.fl50`, `.fl37`等）はどれか。
2. **Component**: カード型（`.card*`）、画像テキスト（`.it*`/`.ti*`）、リスト（`.form_*`）の特定。
3. **Detail**: Tailwind CSSによる色、フォント、微細な余白の調整。

### 2. 実装手順 (Implementation)
1. **大枠の構築**: 特定したレイアウトクラスで `section` を作成。
2. **構造の整形**: CMSの `function.js` による自動整形（`img` → `figure` 等）を想定したHTMLを書く。
3. **配置の微調整**: `variables.md` に記載の計算式（`--out` 等）を用いて「飛び出し」や「重なり」を再現。

## Best Practices
- **Atomic vs Component**: 大枠はコンポーネントクラス（`.card3`）で行い、細部はアトミック（Tailwind）で調整。
- **Responsive**: `lg:flex` のように、モバイル（縦並び）を基準にPC用クラスを追加する。
- **Negative Margin**: 重なり効果は `margin-top: -4em` 等を推奨。

## Resources
- [Patterns](./patterns.md): クラス一覧とHTML構造。
- [Variables](./variables.md): CSS変数システムとレスポンシブ仕様。
