# Skill: UI Library & Preview Development

Reactコンポーネントライブラリの作成、リファクタリング、およびプレビューページを生成・管理するためのスキルです。

## 🚨 Strict Operational Rules (AIエージェント遵守の鉄則)
- **指示外行動の禁止**: 依頼された作業の範囲を厳守し、明示的な指示がない限り、周辺コードの改変や「良かれと思って」の追加機能実装を行わない。
- **確認優先**: 情報が不足している、または複数の実装方法が考えられる場合は、作業を強行せず必ずユーザーに確認する。
- **削除の原則禁止**: プレビュー画面の要素や実装済みのロジックを、許可なく削除しない。整理が必要な場合は必ず提案し、承諾を得る。
- **既存構造の尊重**: ユーザーが手動で編集した箇所や原型となるコード構造を最大限尊重し、強引なリファクタリングで意図を破壊しない。

## Metadata
- **ID**: `ui-library`
- **Category**: Frontend Framework / React
- **Philosophy**: Modifier-First & Slot-Based (枠は固定、中身は自由)

## Core Patterns

### 1. Component Implementation (React)
- **className First**: `className` は常に最初のプロップスとして定義し、デフォルト値（`"mb-0"` 等）を設ける。
- **Slot Pattern**:
  - `figure` や `children` 等のスロットを提供し、中のタグ（`img` や `h3` 等）は利用者が自由に記述する。
  - `figure` が存在する場合に `.has_img` を付与する等の構造ロジックのみをコンポーネントが担当する。
- **Minimal Props**: `isRev`, `col` 等のレイアウトプロップスを避け、`className` によるクラス指定に統一する。

### 2. Styling Strategy (SCSS)
- **Desktop-First & Dynamic Breakpoints**:
  - `max-md` (767px), `max-sm` (639px), `max-xs` (479px) を基本とする。
  - 特殊な挙動の切替には `.bp-sm` 等のモディファイアクラスを用いる。
- **Low Specificity**: `@include where { ... }` を使用し、Tailwindでの上書きを容易にする。
- **Flexible Values**: CSS変数（`--imgW`, `--itemW`, `--gap`）を使用し、固定ピクセル指定を避ける。
- **No !important**: 原則禁止。

### 3. Preview Page Generation
- **Copy-Paste Friendly**:
  - 利用者がそのままコピペして使えるよう、`className=""` や `figure={""}` を含めた状態でコードを出力する。
- **Variance Coverage**:
  - 1つのコンポーネントに対し、複数のバリエーション（標準、反転、画像サイズ違い、ブレイクポイント違い）を網羅する。

## Workflow
1. **SCSS解析**: 既存のテンプレートクラス（`_10template.scss` 等）から、Reactコンポーネント化すべきロジックを抽出する。
2. **コンポーネント定義**: 上記のPatternに従い、`className` 先頭・スロット形式でコンポーネントを作成する。
3. **プレビュー実装**: `Preview.tsx` に各バリエーションのサンプルを追加する。
4. **ドキュメント更新**: 必要に応じて `AGENT.md` や関連スキルを更新する。

