#!/bin/bash
set -e
bash rebuild_zip.sh
git add public/RatioKit.zip
git commit -m "Update zip with latest files" || true
git push origin main
vercel --yes --prod --force

