#!/usr/bin/env bash
# build-pages.sh — Build pages with 11ty + integrity check
set -euo pipefail
cd "$(dirname "$0")"/.. 

echo "🏗️  Building pages with 11ty..."

# Clean dist
rm -rf dist 2>/dev/null || true
mkdir -p dist

# Build site
echo "  → Building site/"
if ! npx eleventy --config=.eleventy.site.js; then
  echo "❌ 11ty build failed for site/"
  exit 1
fi

# Build tools
echo "  → Building tools/"
if ! npx eleventy --config=.eleventy.tools.js; then
  echo "❌ 11ty build failed for tools/"
  exit 1
fi

echo ""
echo "📋 Deploying output..."

# Copy and verify site/
echo "  → Deploying dist/site/ → site/"
cp -a dist/site/. site/ || {
  echo "❌ Copy failed for site/"
  exit 1
}
echo "     ✓ Copied successfully"

# Copy and verify tools/
echo "  → Deploying dist/tools/ → tools/"
cp -a dist/tools/. tools/ || {
  echo "❌ Copy failed for tools/"
  exit 1
}
echo "     ✓ Copied successfully"

# Cleanup
rm -rf dist
echo ""
echo "✅ Build complete! Run 'git status' to see changes."
