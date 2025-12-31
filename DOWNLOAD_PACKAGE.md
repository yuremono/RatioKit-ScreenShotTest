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
| `Dist/RatioKit/HTML/*` | `RatioKit/HTML/*` | HTML/CSS版スターターキット |
| `Dist/RatioKit/*/SnippetModal.css` | `RatioKit/SnippetModal.css` | プレビュー画面のスニペット用スタイル |
| `Dist/RatioKit/*/index.html` | `RatioKit/*/starter-index.html` | Zip内の独立したプレビュー用HTML |
| `Dist/RatioKit/*/src/App.*` | `RatioKit/*/StarterApp.*` | Zip内の独立したデモ用メインコンポーネント |

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

### 推奨方法（自動スクリプト）

プロジェクトには、確実に最新版を反映するための`rebuild_zip.sh`スクリプトが用意されています。

```bash
# 単一コマンドで完結（最も確実）
bash rebuild_zip.sh && git add public/RatioKit.zip && git commit -m "Update zip with latest files" && git push origin main && vercel --yes --prod --force
```

このコマンドは以下を実行します：
1. Zipファイルを完全に再作成（`temp_zip`を削除してから作成）
2. 変更をGitにコミット・プッシュ
3. Vercelに自動デプロイ

**重要**: 過去の失敗から学んだ教訓として、「差分更新」ではなく「完全削除→再作成」のアプローチを採用しています。詳細は [Package Distribution Skill](./.skills/package-distribution/SKILL.md) を参照してください。

### 手動方法（参考）

以下のコマンド（または同等のスクリプト）によって、現在のプロジェクト状態が Zip に反映されます。

```bash
# 1. 完全削除（重要！）
rm -rf temp_zip
rm -f public/RatioKit.zip

# 2. 新規作成
mkdir -p temp_zip

# 3. すべてをコピー
cp -rv RatioKit/* temp_zip/

# 4. ギャラリーファイルを削除
rm -rf temp_zip/React/src/App.tsx temp_zip/Vue/src/App.vue temp_zip/Svelte/src/App.svelte
rm -rf temp_zip/*/SnippetModal.css temp_zip/*/src/SnippetModal.css

# 5. StarterAppをコピー
cp RatioKit/React/src/components/RatioKit/StarterApp.tsx temp_zip/React/src/App.tsx
cp RatioKit/Vue/src/components/RatioKit/StarterApp.vue temp_zip/Vue/src/App.vue
cp RatioKit/Svelte/src/lib/RatioKit/StarterApp.svelte temp_zip/Svelte/src/App.svelte

# 6. Zip作成
cd temp_zip && zip -r ../RatioKit.zip . -q && cd ..
mv RatioKit.zip public/RatioKit.zip
rm -rf temp_zip
```

## 4. ギャラリー（公開側）とプレビュー（Zip側）の分離

プロジェクトでは、Vercel等で公開される「ギャラリー（取扱説明書/カタログ）」と、Zipファイルに含まれる「プレビュー（スターターキットのデモ）」の内容を完全に分離しています。

*   **ギャラリー (公開用)**: `RatioKit/*/App.vue` (or `Preview.tsx`) がソース。セットアップガイドやスニペットコピー機能、ダウンロードボタンが含まれます。
*   **プレビュー (Zip内)**: `RatioKit/*/StarterApp.*` がソース。純粋なコンポーネントの使用例のみを示すクリーンなデモページです。Zip内では `App.*` として配置されます。

この分離により、公開サイト側でダウンロードボタンや説明文を更新しても、ユーザーが手元で動かすデモ画面には影響を与えません。

