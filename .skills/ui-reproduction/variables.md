# Style System & Variables

このリソースは、プロジェクトで使用される CSS 変数システムとレスポンシブの設計ルールを定義します。

## 📐 CSS変数システム
...

### 基本変数（_02foundation.scss）

```css
:root {
  /* コンテンツ幅 */
  --wid: 1200px;
  
  /* 余白 */
  --MY: 120px;  /* 縦余白 */
  --PX: 60px;  /* 横余白 */
  --gap: 60px;     /* 要素間隔 */
  
  /* 計算済み余白 */
  --MY5: calc(var(--MY)/2);  /* 半分 */
  --MY3: calc(var(--MY)/3);  /* 1/3 */
  
  /* フォント */
  --bodyFZ: 16px;
  --h2FZ: clamp(20px, 3vw, 30px);
  --h3FZ: clamp(18px, 2vw, 20px);
}
```

### 画面幅計算変数（重要）

```css
/* Katutoki.htmlの飛び出し効果に使用 */
--into: calc(50vw - (var(--wid) / 2));
--out: calc(50% - 50vw);
```

**使い方：**
- `margin-inline: var(--out)` → 画面幅いっぱいの背景
- `max-width: var(--wid)` → コンテンツ幅制限
- `padding-left: var(--into)` → 左側のみパディング
- `margin-right: var(--out)` → 右側飛び出し効果

### レスポンシブ

```css
@media (max-width: 1440px) { --PX: 40px; --gap: 32px; }
@media (max-width: 834px)  { --MY: 80px; --gap: 20px; }
@media (max-width: 640px)  { --PX: 30px; }
```

---

## 🎨 命名規則

### プレフィックス

| プレフィックス | 意味 | 例 |
|---------------|------|-----|
| `fb_` | Flexboxレイアウト | `fb_qa`, `fb_flow` |
| `form_` | DLリスト | `form_simple`, `form_02` |
| `H-` | 見出し装飾 | `H-bd`, `H-bdl` |
| `.card*` | カードレイアウト | `.card3`, `.card4` |
| `.fl*` | 比率指定 | `.fl50`, `.fl37` |
| `.__` | 修飾子 | `.__icon`, `.__scrollX` |

### 数字の意味

- `.card3` → **3列**のカード
- `.fl37` → **3:7**の比率
- `.img30` → 画像が**30%**の幅

---

## 📦 レイアウトシステム

### 基本構造

```scss
section {
  max-width: var(--wid);  /* 1200px */
  margin-inline: auto;     /* 中央寄せ */
}
```

### ラッパー

```scss
.wrapper      // 背景+余白
.wrapper100   // 画面幅背景
.wrapper100in // 画面幅背景+中身は制約
```

---

## 🔧 Mixin（_mixin.scss）

### ブレイクポイント

```scss
$menu: 834px;  /* ハンバーガーメニュー出現ポイント */
@mixin menu { @media (max-width: $menu) { @content; } }
```

**使い方：**
```scss
.h_nav {
  display: flex;
  @include menu {
    display: none;  /* 834px以下で非表示 */
  }
}
```

**それ以外はネイティブCSSで記述：**
```scss
@media (max-width: 834px) { /* ... */ }
@media (max-width: 640px) { /* ... */ }
```

---

## 🎯 実践的な設計思想

### 1. ネイティブCSS優先
- SCSSの機能は最小限に使用
- ブレイクポイントは基本的にネイティブで記述
- ハンバーガーメニュー用のブレイクポイントのみ`@mixin`化（変更頻度が高いため）

### 2. 変数ベース
- すべての余白・サイズを変数で管理
- `--wid`, `--MY`, `--PX`を基準に計算

### 3. モジュラー設計
- プレフィックスで機能が明確
- `.fb_qa`, `.form_simple`など用途が一目瞭然

### 4. CMS制約への対応
- JavaScript自動処理で構造を最適化
- 編集UXを優先した設計（アクセシビリティより実用性）

---

## 📝 次のステップ

### ✅ このドキュメント（基礎）
CSS変数システム、命名規則、レイアウト基礎を理解

### 📦 CMS_COMPONENTS.md（実践）
実際のコンポーネント実装パターンを参照  
**→ スクリーンショット再現時はこちらがメイン**

### 🎯 AGENT.md（高精度化）
飛び出し効果、ネガティブマージン、アンチパターン等の詳細ルール

### 📄 template.html（サンプル）
すべてのパターンの実装例

---

## 🔗 補足：Katutoki.htmlでの変数活用例

```css
/* 画面幅いっぱいの背景、コンテンツは制約 */
section {
  max-width: var(--wid);
  margin-inline: var(--out);
}

/* 画像を右端まで拡張 */
.image-container {
  margin-right: var(--out);
  width: calc(100% + var(--into));
}
```

このパターンで、背景は制約しつつ、特定要素を画面端まで拡張できる。
