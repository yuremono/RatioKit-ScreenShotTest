# CMSコンポーネント実装パターン集

> **使い方**  
> スクリーンショットから「.card3」「.img_text」「.fl37」等のテンプレートクラスを選択し、大枠のレイアウトを構築。  
> 細かい装飾はTailwind CSSで調整する前提。

---

## 🎯 スクリーンショット → 実装フロー

```
1. レイアウト構造を特定（下記パターン表を参照）
2. テンプレートクラスで大枠を構築
3. 必要に応じて修飾子を追加
4. Tailwindで細かい装飾（色、余白、フォント等）
```

---

## 📦 主要コンポーネント一覧

### 1️⃣ カードレイアウト（`.card*`）

| 見た目 | クラス | 備考 |
|--------|--------|------|
| 2列の等幅カード | `.card2` | |
| 3列の等幅カード | `.card3` | 最頻出 |
| 4〜6列 | `.card4` `.card5` `.card6` | |
| 可変幅（伸縮） | `.cardflex` | 何個でも1行 |
| 固定幅 | `.cardfix` | `--w`変数で幅指定 |

**修飾子：** `.__icon`, `.__scrollX`, `.img3-2`, `.imgCover`

**基本HTML：**
```html
<div class="card3 __icon">
  <div class="box">
    <img src="..." alt="...">
    <h3>タイトル</h3>
    <div><p>説明</p></div>
  </div>
  <!-- 繰り返し -->
</div>
```

---

### 2️⃣ 画像テキスト横並び（`.it*` / `.ti*`）

| 見た目 | クラス | 画像比率 |
|--------|--------|----------|
| 画像:テキスト = 3:7 | `.img_text .img30` | 30% |
| 画像:テキスト = 4:6 | `.img_text .img40` | 40% |
| テキスト:画像（逆） | `.img_text .img30` | 順序逆 |

**修飾子：** `.AIC`（縦中央）, `.sheet`（背景付き）

**基本HTML：**
```html
<div class="ti01 img30 AIC">
  <img src="..." alt="">
  <div>
    <h2>タイトル</h2>
    <p>説明文</p>
  </div>
</div>
```

---

### 3️⃣ Flexbox系（`.fb_*`）

| 見た目 | クラス | 用途 |
|--------|--------|------|
| Q&A形式 | `.fb_qa` | 質問と回答の繰り返し |
| ステップ・フロー | `.fb_flow` | 番号付き手順 |
| メニュー表 | `.fb_menu` | 料理名+価格等 |

**修飾子：** `.firstOpen`, `.noArrow`

**基本HTML（Q&A）：**
```html
<div class="fb_qa">
  <div class="box"><div>質問1</div></div>
  <div class="box"><div>回答1</div></div>
  <!-- 繰り返し -->
</div>
```

---

### 4️⃣ DLリスト（`.form_wrap .form_*`）

| 見た目 | クラス | 用途 |
|--------|--------|------|
| シンプル下線 | `.form_simple` | ニュース一覧 |
| 装飾なし | `.form_01` | 基本情報 |
| 背景付き | `.form_02` `.form_03` | 強調表示 |
| タイムライン | `.form_enkaku` | 沿革 |

**修飾子：** `.__scroll`（スクロール有効）

**基本HTML：**
```html
<div class="form_wrap form_simple">
  <dl>
    <dt>2025.01.15</dt>
    <dd>お知らせ内容</dd>
  </dl>
</div>
```

---

### 5️⃣ 比率指定Flexbox（`.fl*`）

| 見た目 | クラス | 比率 |
|--------|--------|------|
| 左右50:50 | `.fl50` | 均等 |
| 左30:右70 | `.fl37` | 3:7 |
| 左40:右60 | `.fl46` | 4:6 |
| 左60:右40 | `.fl64` | 6:4 |

**修飾子：** `.__rev`（順序逆転）

**基本HTML：**
```html
<div class="fl37">
  <div class="H-bd">
    <h2>左側コンテンツ</h2>
  </div>
  <div>
    <img src="..." alt="">
  </div>
</div>
```

---

### 6️⃣ 見出し装飾（`.H-*`）

| 見た目 | クラス |
|--------|--------|
| 下線 | `.H-bd` |
| 左線 | `.H-bdl` |
| 背景色 | `.H-bg` |
| 画面幅背景 | `.head_01` |
| 両側線 | `.barBFAF` |

**基本HTML：**
```html
<div class="H-bd">
  <article>
    <h2>見出し</h2>
  </article>
</div>
```

---

### 7️⃣ ラッパー・背景制御

| 見た目 | クラス | 挙動 |
|--------|--------|------|
| 背景+余白 | `.wrapper` | padding付き |
| 画面幅背景 | `.wrapper100` | 全幅 |
| 画面幅背景+中身制約 | `.wrapper100in` | 背景のみ全幅 |
| 幅制約 | `.inBase` `.in1200` | 固定幅 |

---

## 🎨 クラスの3分類

### コンポーネントクラス
複数プロパティを一括設定（例：`.sheet`, `.card3`）

### アトミッククラス
単一プロパティ指定（例：`.AIC`, `.mt20`, `.TAC`）  
※ Tailwindで代替可能

### コンテナクラス（参考）
子要素を装飾（例：`.p-check`で中の`<p>`にチェックマーク）  
※ スクリーンショット再現ではTailwindで代替推奨

---

## 🔧 CMS固有の自動処理（function.js）

以下の処理が自動実行される（知識として把握）：

```javascript
// 不要要素の削除
$(".dis, .disnone").remove();

// imgをfigureで囲む
$('#contents img').wrap('<figure>');

// .boxをarticleで囲む
$('div>.box').wrapInner('<article>');

// .img_text/.img_textをarticleで囲む
$("[class*='it0'], [class*='ti0']").wrapInner("<article>");
```

スクリーンショット再現では、**最終的なDOM構造（JavaScript処理後）を想定してHTMLを書く**。

---

## ✅ 実装チェックリスト

### レイアウト選択
- [ ] カード系 → `.card3` 等
- [ ] 画像テキスト → `.img_text` `.img_text`
- [ ] Q&A/フロー → `.fb_qa` `.fb_flow`
- [ ] 比率指定 → `.fl37` 等

### 修飾子
- [ ] アイコン配置 → `.__icon`
- [ ] 横スクロール → `.__scrollX`
- [ ] 背景付き → `.sheet`
- [ ] 中央揃え → `.AIC`

### Tailwindで調整
- [ ] 色（text/bg色）
- [ ] 余白（mt/mb/px/py等）
- [ ] フォント（text-lg/font-bold等）
- [ ] 角丸・影等の装飾

---

## 📝 関連ドキュメント

- **SCSS_TEMPLATE.md**: CSS変数システム（`--wid`, `--into`, `--out`）
- **AGENT.md**: スクリーンショット再現の高精度ルール
- **template.html**: 全パターンの実装サンプル
