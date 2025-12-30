#!/bin/bash
echo "Rebuilding Zip..."

# 1. テンポラリディレクトリの作成と現在のZipの展開
rm -rf temp_zip && mkdir -p temp_zip
unzip -o public/RatioKit.zip -d temp_zip

# 2. 各フレームワークのStarterAppをAppに上書き（Zip内ではApp.tsx/vue/svelteがメインエントリのため）
# React
cp -v RatioKit/React/src/components/RatioKit/StarterApp.tsx temp_zip/React/src/App.tsx
# Vue
cp -v RatioKit/Vue/src/components/RatioKit/StarterApp.vue temp_zip/Vue/src/App.vue
# Svelte
cp -v RatioKit/Svelte/src/lib/RatioKit/StarterApp.svelte temp_zip/Svelte/src/App.svelte
# HTML
cp -v RatioKit/HTML/index.html temp_zip/HTML/index.html

# 3. RatioKit.scss などの共通ファイルを最新化（もし必要なら）
cp -v RatioKit/RatioKit.scss temp_zip/RatioKit.scss
cp -v RatioKit/RatioKit.scss temp_zip/React/src/RatioKit.scss
cp -v RatioKit/RatioKit.scss temp_zip/Vue/src/RatioKit.scss
cp -v RatioKit/RatioKit.scss temp_zip/Svelte/src/RatioKit.scss
cp -v RatioKit/RatioKitSimple.css temp_zip/RatioKitSimple.css

# 4. Zipの再構築
cd temp_zip && zip -r ../RatioKit.zip . && cd ..
mv -v RatioKit.zip public/RatioKit.zip

# 5. クリーンアップ
rm -rf temp_zip

# 6. Git & Deploy
git add .
git commit -m "Clean up preview screens and update distribution Zip"
git push origin main
vercel --yes --prod --force

echo "Done."
