# Package Distribution Skill

## 目的
配布パッケージ（`public/RatioKit.zip`）を確実に最新の状態で更新・デプロイするためのスキル。

## 重要な教訓（過去の失敗から学んだこと）

### 問題1: ファイルが更新されない
**症状**: zipファイルを更新しても、特定のファイル（StarterApp、main.ts/tsx、RatioKit.scss）が古いままだった。

**原因**:
- `temp_zip`ディレクトリが既に存在し、古いファイルが残っていた
- 差分コピーでは既存ファイルが上書きされないケースがあった
- タイムスタンプチェックが機能していなかった

**解決策**:
```bash
# ❌ 悪い例：既存ディレクトリに上書き
cp -r RatioKit/* temp_zip/  # 既存ファイルが残る可能性

# ✅ 良い例：完全削除してから再作成
rm -rf temp_zip
mkdir -p temp_zip
cp -rv RatioKit/* temp_zip/
```

### 問題2: プラットフォーム固有のSCSSを削除すべきか？
**初期の判断**: 各プラットフォームの`src`内の`RatioKit.scss`を削除し、ルートの`RatioKit.scss`を参照するよう変更しようとした。

**ユーザーの判断**: 「削除は行わなくていい。まずはパッケージが正常に動作することが先決」

**学び**: 動作確認を最優先し、最適化は後回しにする。

## 標準プロセス

### 1. 前提確認
- 現在のワーキングディレクトリ: `/Users/yanoseiji/Desktop/RatioKit-ScreenShotTest`
- スクリプト: `rebuild_zip.sh`
- デプロイ先: Vercel (Git push で自動デプロイ)

### 2. 更新対象ファイル
以下のファイルは必ず最新版が反映される必要がある：

| ファイル | 役割 | 注意点 |
|---------|------|--------|
| `RatioKit/RatioKit.scss` | メインスタイルシート | ルートレベルとSharedStylesにコピー |
| `RatioKit/RatioKitSimple.scss` | シンプル版スタイル | 同上 |
| `RatioKit/React/src/components/RatioKit/StarterApp.tsx` | Reactスターターキット | `src/App.tsx`として配置 |
| `RatioKit/Vue/src/components/RatioKit/StarterApp.vue` | Vueスターターキット | `src/App.vue`として配置 |
| `RatioKit/Svelte/src/lib/RatioKit/StarterApp.svelte` | Svelteスターターキット | `src/App.svelte`として配置 |
| 各プラットフォームの`main.ts`/`main.tsx` | エントリポイント | インポートパスの整合性を確認 |

### 3. 除外対象ファイル
以下のファイルは配布パッケージに含めない：

- `RatioKit/*/src/App.tsx` (ギャラリー用)
- `RatioKit/*/src/App.vue` (ギャラリー用)
- `RatioKit/*/src/App.svelte` (ギャラリー用)
- `RatioKit/*/SnippetModal.css` (ギャラリー専用スタイル)
- `RatioKit/*/src/components/SnippetModal.css` (ギャラリー専用スタイル)
- `RatioKit/*/src/components/RatioKit/App.*` (バックアップ)

### 4. 実行コマンド（推奨）

```bash
# 単一コマンドで完結（最も確実）
bash rebuild_zip.sh && git add public/RatioKit.zip && git commit -m "Update zip with latest files" && git push origin main && vercel --yes --prod --force
```

**各ステップの説明**:
1. `bash rebuild_zip.sh`: Zipファイルを再作成
2. `git add public/RatioKit.zip`: 変更をステージング
3. `git commit -m "..."`: コミット
4. `git push origin main`: GitHubにプッシュ
5. `vercel --yes --prod --force`: Vercelに強制デプロイ

### 5. rebuild_zip.sh の重要なポイント

```bash
#!/bin/bash
set -e  # エラー発生時に停止（重要！）

# Step 1: 完全削除（最重要）
rm -rf temp_zip
rm -f public/RatioKit.zip

# Step 2: 新規作成
mkdir -p temp_zip

# Step 3: すべてをコピー
cp -rv RatioKit/* temp_zip/

# Step 4: ギャラリーファイルを削除
rm -rf temp_zip/React/src/App.tsx
rm -rf temp_zip/Vue/src/App.vue
rm -rf temp_zip/Svelte/src/App.svelte
# ... その他の除外ファイル

# Step 5: StarterAppをコピー
cp -v RatioKit/React/src/components/RatioKit/StarterApp.tsx temp_zip/React/src/App.tsx
cp -v RatioKit/Vue/src/components/RatioKit/StarterApp.vue temp_zip/Vue/src/App.vue
cp -v RatioKit/Svelte/src/lib/RatioKit/StarterApp.svelte temp_zip/Svelte/src/App.svelte

# Step 6: Zip作成
cd temp_zip && zip -r ../RatioKit.zip . -q && cd ..
mv -v RatioKit.zip public/RatioKit.zip
```

## トラブルシューティング

### ケース1: デプロイが始まらない
**症状**: `vercel --yes --prod --force` を実行しても何も起こらない

**対処法**:
```bash
# ターミナル出力を確認
bash rebuild_zip.sh 2>&1 | tee deploy.log

# または、Vercel CLIのログを確認
vercel --debug --yes --prod --force
```

### ケース2: 一部のファイルが古いまま
**症状**: Zipを解凍すると特定のファイルが更新されていない

**対処法**:
```bash
# 1. 手動で確認
unzip -l public/RatioKit.zip | grep "main.ts"
unzip -l public/RatioKit.zip | grep "StarterApp"

# 2. temp_zipの内容を確認
ls -la temp_zip/React/src/
cat temp_zip/React/src/main.tsx

# 3. 完全に削除してから再実行
rm -rf temp_zip public/RatioKit.zip
bash rebuild_zip.sh
```

### ケース3: ターミナル出力が表示されない
**症状**: コマンドを実行しても何も表示されない

**原因**: シェルの状態やバッファリングの問題

**対処法**:
```bash
# 明示的にbashを指定
/bin/bash rebuild_zip.sh

# または、スクリプト内でechoを確認
bash -x rebuild_zip.sh  # デバッグモード
```

## AI エージェントへの指示

### Zipファイル更新を依頼された場合

1. **確認事項**:
   - ユーザーが「zipファイル更新」「Zipファイルを更新」「配布パッケージ更新」等のキーワードを使った場合
   - 現在の作業ディレクトリを確認

2. **実行内容**:
   ```bash
   bash rebuild_zip.sh && git add public/RatioKit.zip && git commit -m "Update zip with latest files" && git push origin main && vercel --yes --prod --force
   ```

3. **確認ポイント**:
   - ターミナル出力で `Step 1` から `Step 7` が正常に完了したか確認
   - `git commit` でコミットが作成されたか確認（"No changes to commit" でないこと）
   - `vercel` でデプロイが開始されたか確認
   - デプロイURL（`https://ratiokit-screenshottest-*.vercel.app`）が表示されたか確認

4. **ユーザーへの報告**:
   - 各ステップの成功/失敗を簡潔に報告
   - デプロイURLを提示
   - 問題があれば、このスキルの「トラブルシューティング」セクションを参照して対処

### やってはいけないこと

- ❌ スクリプトの内容を推測で変更しない（ユーザーが「削除処理は不要」と明言している場合は特に）
- ❌ `rebuild_zip.sh`の中で`sed`コマンドを使ってファイルを書き換えない（動作確認が優先）
- ❌ ユーザーの明示的な指示なしに、最適化や改善を試みない
- ❌ タイムスタンプチェックやハッシュチェックを追加しない（過去に失敗している）

### やるべきこと

- ✅ スクリプトをそのまま実行する
- ✅ ターミナル出力を確認し、エラーがあれば報告する
- ✅ 不明点があれば、実行前にユーザーに確認する
- ✅ 完全削除→再作成のアプローチを維持する

## 参考リンク

- [DOWNLOAD_PACKAGE.md](../../DOWNLOAD_PACKAGE.md): 配布パッケージの構造と参照元の説明
- [rebuild_zip.sh](../../rebuild_zip.sh): 実際のビルドスクリプト
- [Memory: zipファイル更新プロセス](#): このスキルの内容を記憶として保存しておく

## 更新履歴

- 2025-12-31: 初版作成（チャット履歴から学んだ教訓をまとめた）

