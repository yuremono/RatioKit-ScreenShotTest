#!/bin/bash
echo "--- EMERGENCY PUSH START ---"
# リモートURLを yuremono/RatioKit-ScreenShotTest に強制固定
git remote set-url origin https://github.com/yuremono/RatioKit-ScreenShotTest.git

# 現在のブランチを確認
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $BRANCH"

# 変更を強制的に発生させる
echo "Update: $(date)" >> deploy-trigger.txt

# コミット
git add .
git commit -m "fix: Emergency sync of README and Zip [$(date)]"

# 強制プッシュ
git push origin $BRANCH --force

# Vercelデプロイ (ローカルプッシュ)
vercel --yes --prod --force

echo "--- EMERGENCY PUSH END ---"


