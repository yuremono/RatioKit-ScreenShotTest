# RatioKit 配布パッケージ作成ガイド (DOWNLOAD_PACKAGE.md)

このドキュメントでは、配布用の Zip ファイル (`public/RatioKit.zip`) がどのファイルを参照し、どのようなプロセスで作成されているかを説明します。

## 1. 参照ファイル (ソース)

Zip ファイルの構築には、プロジェクト内の以下の最新ファイルが参照されます。

| 配布先 (Zip内) | 参照元 (プロジェクト内) | 説明 |
| :--- | :--- | :--- |
| `Dist/RatioKit/*.scss` | `RatioKit/*.scss` | コアとなる最新の SCSS スタイルシート |
| `Dist/RatioKit/React/src/components/RatioKit/*` | `RatioKit/React/*` | React コンポーネント本体 |
| `Dist/RatioKit/Vue/src/components/RatioKit/*` | `RatioKit/Vue/*` | Vue コンポーネント本体 |
| `Dist/RatioKit/Svelte/src/lib/RatioKit/*` | `RatioKit/Svelte/*` | Svelte コンポーネント本体 |
| `Dist/RatioKit/*/SnippetModal.css` | `RatioKit/SnippetModal.css` | プレビュー画面のスニペット用スタイル |

### 除外されるファイル
*   `_10template.scss`: ローカルバックアップ用のため、配布パッケージからは除外されます。
*   `_mixin.scss`: ローカルバックアップ用のため、配布パッケージからは除外されます。

## 2. 作成プロセス

配布用パッケージは以下の手順で自動/手動ビルドされます。

1.  **一時ディレクトリの作成**: `temp_zip` などの作業用フォルダを作成し、既存のベース構造を解凍または展開します。
2.  **最新ソースの同期**: `RatioKit/` フォルダ内の最新の `.scss` ファイルおよび各フレームワークのコンポーネントファイルを、Zip 内の対応するパスに上書きコピーします。
3.  **スターターキット用設定の適用**:
    *   **Vite 設定**: Tailwind CSS v4 の環境エラー対策 (`optimizeDeps.exclude`) およびエイリアス設定 (`@ratiokit`) を含む `vite.config.ts` を各フレームワークフォルダに配置します。
    *   **エントリポイント修正**: 配布環境で正しく動作するよう、エイリアスを使用したインポートパスに修正された `App.vue` / `App.tsx` / `App.svelte` を配置します。
4.  **クリーンアップ**: Zip 内に含まれてはいけないバックアップ用 SCSS ファイルを削除します。
5.  **再圧縮**: すべてのファイルを `RatioKit.zip` として圧縮し、`public/` ディレクトリに配置します。

## 3. 作成・更新コマンド例

以下のコマンド（または同等のスクリプト）によって、現在のプロジェクト状態が Zip に反映されます。

```bash
# 1. 構造の準備
mkdir -p temp_zip && unzip -o public/RatioKit.zip -d temp_zip

# 2. 最新の SCSS とコンポーネントをコピー
find temp_zip -name "RatioKit.scss" -exec cp RatioKit/RatioKit.scss {} \;
find temp_zip -name "RatioKitSimple.scss" -exec cp RatioKit/RatioKitSimple.scss {} \;
cp RatioKit/SnippetModal.css temp_zip/Dist/RatioKit/SnippetModal.css

# 3. 不要なバックアップファイルを削除
find temp_zip -name "_10template.scss" -o -name "_mixin.scss" -exec rm {} +

# 4. Zip作成
cd temp_zip && zip -r ../RatioKit.zip . && cd ..
mv RatioKit.zip public/RatioKit.zip
rm -rf temp_zip
```

---
このプロセスにより、ユーザーがダウンロードするパッケージは常に最新の RatioKit ソースと、最適化された環境設定が含まれた状態になります。

