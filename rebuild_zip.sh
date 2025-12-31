#!/bin/bash
set -e  # エラーが発生したら停止

echo "============================================"
echo "Zipファイル完全再作成（確実に最新版を反映）"
echo "============================================"

# 1. 既存のZipファイルと一時ディレクトリを完全削除
echo "Step 1: 既存ファイルを削除..."
rm -rf temp_zip
rm -f public/RatioKit.zip
rm -f RatioKit.zip

# 2. 一時ディレクトリを作成
echo "Step 2: 一時ディレクトリを作成..."
mkdir -p temp_zip

# 3. RatioKitディレクトリから必要なファイルを直接コピー（完全に新規作成）
echo "Step 3: RatioKitディレクトリからファイルをコピー..."

# 3-1. ルートレベルのファイル
echo "  - ルートレベルのファイル..."
cp -v RatioKit/RatioKit.scss temp_zip/RatioKit.scss
cp -v RatioKit/RatioKitSimple.css temp_zip/RatioKitSimple.css
cp -v RatioKit/RatioKitSimple.scss temp_zip/RatioKitSimple.scss
cp -v RatioKit/README.md temp_zip/README.md
cp -v RatioKit/index.ts temp_zip/index.ts

# 3-2. Reactフォルダ全体をコピー
echo "  - Reactフォルダ..."
mkdir -p temp_zip/React
cp -rv RatioKit/React/* temp_zip/React/ 2>/dev/null || true
echo "  - React: ギャラリーファイルを削除してStarterAppをコピー..."
rm -rf temp_zip/React/src/App.tsx
rm -rf temp_zip/React/src/components/RatioKit/App.tsx
rm -rf temp_zip/React/src/components/SnippetModal.css
rm -rf temp_zip/React/src/SnippetModal.css
cp -v RatioKit/React/src/components/RatioKit/StarterApp.tsx temp_zip/React/src/App.tsx

# 3-3. Vueフォルダ全体をコピー
echo "  - Vueフォルダ..."
mkdir -p temp_zip/Vue
cp -rv RatioKit/Vue/* temp_zip/Vue/ 2>/dev/null || true
rm -rf temp_zip/Vue/src/App.vue
rm -rf temp_zip/Vue/src/components/RatioKit/App.vue
rm -rf temp_zip/Vue/src/components/RatioKit/SnippetModal.css
rm -rf temp_zip/Vue/src/SnippetModal.css
rm -rf temp_zip/Vue/SnippetModal.css
cp -v RatioKit/Vue/src/components/RatioKit/StarterApp.vue temp_zip/Vue/src/App.vue

# 3-4. Svelteフォルダ全体をコピー
echo "  - Svelteフォルダ..."
mkdir -p temp_zip/Svelte
cp -rv RatioKit/Svelte/* temp_zip/Svelte/ 2>/dev/null || true
rm -rf temp_zip/Svelte/src/App.svelte
rm -rf temp_zip/Svelte/src/lib/RatioKit/App.svelte
rm -rf temp_zip/Svelte/src/lib/RatioKit/SnippetModal.css
rm -rf temp_zip/Svelte/src/SnippetModal.css
rm -rf temp_zip/Svelte/SnippetModal.css
cp -v RatioKit/Svelte/src/lib/RatioKit/StarterApp.svelte temp_zip/Svelte/src/App.svelte

# 3-5. HTMLフォルダ
echo "  - HTMLフォルダ..."
mkdir -p temp_zip/HTML/css
cp -v RatioKit/HTML/index.html temp_zip/HTML/index.html
cp -v RatioKit/HTML/css/RatioKit.css temp_zip/HTML/css/RatioKit.css

# 3-6. SharedStylesフォルダ
echo "  - SharedStylesフォルダ..."
mkdir -p temp_zip/SharedStyles
cp -v RatioKit/SharedStyles/RatioKit.scss temp_zip/SharedStyles/RatioKit.scss
cp -v RatioKit/SharedStyles/RatioKitSimple.scss temp_zip/SharedStyles/RatioKitSimple.scss
cp -v RatioKit/SharedStyles/RatioKit.css temp_zip/SharedStyles/RatioKit.css
cp -v RatioKit/SharedStyles/RatioKitSimple.css temp_zip/SharedStyles/RatioKitSimple.css

# 3-7. Dist/RatioKit/HTML/index.html
echo "  - Dist/RatioKit/HTML/index.html..."
mkdir -p temp_zip/Dist/RatioKit/HTML/css
cp -v RatioKit/HTML/index.html temp_zip/Dist/RatioKit/HTML/index.html
cp -v RatioKit/HTML/css/RatioKit.css temp_zip/Dist/RatioKit/HTML/css/RatioKit.css

# 4. 重要なファイルが確実にコピーされているか確認
echo ""
echo "Step 4: 重要なファイルの確認..."
echo "  - RatioKit.scss: $(test -f temp_zip/RatioKit.scss && echo 'OK' || echo 'NG')"
echo "  - React/src/main.tsx: $(test -f temp_zip/React/src/main.tsx && echo 'OK' || echo 'NG')"
echo "  - React/src/App.tsx: $(test -f temp_zip/React/src/App.tsx && echo 'OK' || echo 'NG')"
echo "  - Vue/src/main.ts: $(test -f temp_zip/Vue/src/main.ts && echo 'OK' || echo 'NG')"
echo "  - Vue/src/App.vue: $(test -f temp_zip/Vue/src/App.vue && echo 'OK' || echo 'NG')"
echo "  - Svelte/src/main.ts: $(test -f temp_zip/Svelte/src/main.ts && echo 'OK' || echo 'NG')"
echo "  - Svelte/src/App.svelte: $(test -f temp_zip/Svelte/src/App.svelte && echo 'OK' || echo 'NG')"

# 5. Zipファイルを作成
echo ""
echo "Step 5: Zipファイルを作成..."
cd temp_zip
zip -r ../RatioKit.zip . -q
cd ..
mv -v RatioKit.zip public/RatioKit.zip

# 6. Gitにコミット・プッシュ
echo ""
echo "Step 6: Gitにコミット・プッシュ..."
git add public/RatioKit.zip
git commit -m "Rebuild zip from scratch: ensure all files are latest version" || echo "No changes to commit"
git push origin main

# 7. Vercelにデプロイ
echo ""
echo "Step 7: Vercelにデプロイ..."
vercel --yes --prod --force

echo ""
echo "============================================"
echo "完了しました！"
echo "============================================"
