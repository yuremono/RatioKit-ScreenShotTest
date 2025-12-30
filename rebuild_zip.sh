#!/bin/bash
echo "Rebuilding Zip..."
rm -rf temp_zip && mkdir -p temp_zip && unzip -o public/RatioKit.zip -d temp_zip
cp -v RatioKit/React/StarterApp.tsx temp_zip/Dist/RatioKit/React/src/App.tsx
cp -v RatioKit/Vue/StarterApp.vue temp_zip/Dist/RatioKit/Vue/src/App.vue
cp -v RatioKit/Svelte/StarterApp.svelte temp_zip/Dist/RatioKit/Svelte/src/App.svelte
cp -v RatioKit/HTML/starter-index.html temp_zip/Dist/RatioKit/HTML/index.html
cd temp_zip && zip -r ../RatioKit.zip . && cd ..
mv -v RatioKit.zip public/RatioKit.zip
git add public/RatioKit.zip
git commit -m "Update zip with clean source via script"
git push origin main
vercel --yes --prod --force
echo "Done."

