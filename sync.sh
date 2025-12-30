#!/bin/bash
echo "--- SYNC START ---"
date
git status
git add .
git commit -m "docs: Final integrated README and Zip update [$(date)]"
git push origin main
vercel --yes --prod --force
echo "--- SYNC END ---"


