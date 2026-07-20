#!/usr/bin/env bash
# sync-assets.sh — Copy shared/ into site/ and tools/ with error handling
set -euo pipefail
cd "$(dirname "$0")"/.. 

echo "🔄 Syncing shared/ assets..."

for root in site tools; do
  echo "  → Syncing to $root/..."
  
  # Create directories
  mkdir -p "$root/assets/brand" "$root/assets/js" || {
    echo "❌ Failed to create directories in $root/"
    exit 1
  }
  
  # Copy brand assets
  if [ -d "shared/brand" ]; then
    cp shared/brand/*.png "$root/assets/brand/" 2>/dev/null || true
    cp shared/brand/*.svg "$root/assets/brand/" 2>/dev/null || true
    echo "     ✓ Brand assets copied"
  else
    echo "     ⚠️  shared/brand/ not found"
  fi
  
  # Copy JS assets
  if [ -d "shared/js" ]; then
    cp shared/js/*.js "$root/assets/js/" 2>/dev/null || true
    echo "     ✓ JS assets copied"
  else
    echo "     ⚠️  shared/js/ not found"
  fi
  
  # Copy favicon + touch icons to root
  if [ -f "shared/brand/apple-touch-icon.png" ]; then
    cp shared/brand/apple-touch-icon.png "$root/"
    echo "     ✓ Apple touch icon copied"
  fi
  if [ -f "shared/brand/favicon.ico" ]; then
    cp shared/brand/favicon.ico "$root/"
    echo "     ✓ Favicon copied"
  fi
done

echo "✅ Sync complete!"
