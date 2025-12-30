#!/bin/bash

echo "========================================="
echo "  RatioKit セットアップスクリプト"
echo "========================================="
echo ""

# 依存関係のインストール
echo "📦 依存関係をインストールしています..."
npm install

# インストールが成功したかチェック
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ npm install に失敗しました。"
    echo "   以下を試してください："
    echo "   1. npm cache clean --force"
    echo "   2. rm -rf node_modules package-lock.json"
    echo "   3. npm install"
    exit 1
fi

echo ""
echo "✅ 依存関係のインストールが完了しました！"
echo ""
echo "🚀 開発サーバーを起動しています..."
echo "   ブラウザで http://localhost:5173 にアクセスしてください"
echo ""

# 開発サーバーの起動
npm run dev

