#!/bin/bash
echo "--- FORCE SYNC START ---"
LOCAL_COUNT=$(git rev-list --count HEAD)
echo "Local commit count: $LOCAL_COUNT"
git status
git add .
git commit -m "docs: Final README and Zip sync [$(date)]" || echo "Nothing to commit"
git push origin main --force
echo "--- FORCE SYNC END ---"


