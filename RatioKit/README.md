# ImgText

SCSSの `.img_text` クラスをラップしたReactコンポーネントです。
1つのソースから、Tailwind上書き用と標準CSS用の両方に対応したスタイルを出力します。

## CSSの設計思想

このコンポーネントのスタイルは、使用環境に合わせて2つの戦略を自動的に切り替えます。

### 1. Tailwind環境 (`$output: "tailwind"`)
- `RatioKit/_mixin.scss` で `$output: "tailwind"` を設定してビルドします。
- スタイルが `@layer components` で囲まれます。
- **メリット**: Tailwindの `utilities` レイヤー（`p-4`, `w-full` など）が常に優先されるため、コンポーネント側の詳細度を気にせず、シングルクラスで簡単に上書きできます。

### 2. 標準CSS環境 (`$output: "simple"`)
- `RatioKit/_mixin.scss` で `$output: "simple"` を設定してビルドします。
- スタイルが `:where()` で保護されます。
- **メリット**: 詳細度が **0** にリセットされるため、外部のどんなCSSクラスからでも、追加のセレクタ（詳細度上げ）なしで上書きが可能です。


### 2. コンポーネントの使用

```tsx
import { ImgText } from './RatioKit';

const MyComponent = () => {
  return (
    <ImgText 
      imgSize="30" 
      figureContent={<img src="photo.jpg" alt="サンプル" />}
    >
      <h3>タイトル</h3>
      <p>説明文が入ります。</p>
    </ImgText>
  );
};
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
| :--- | :--- | :--- | :--- |
| `imgSize` | `ImgSize` | `"50"` | 画像の横幅比率 (10〜100) |
| `isRev` | `boolean` | `false` | 画像とテキストを反転させるか |
| `figureContent` | `ReactNode` | - | 画像エリアの中身 |
| `children` | `ReactNode` | - | テキストエリアの中身 |
| `className` | `string` | `""` | 追加のクラス名 (Tailwindでの上書き用など) |

