#!/bin/bash

echo "🚀 DEPLOYING H SOULUTIONS TO hsoulutions.com"
echo "=========================================="

# Check if netlify CLI is available
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

echo "🌐 Deploying to Netlify with custom domain..."
netlify deploy --prod --dir=. --site=hsoulutions

echo "✅ Deployed to hsoulutions.com!"
echo ""
echo "🌟 H SOULUTIONS IS LIVE!"
echo "Where Science Meets Soul"
echo "Reality's operating system: φ = 1.618033988749895"
echo ""
echo "🌐 Visit: https://hsoulutions.com"
