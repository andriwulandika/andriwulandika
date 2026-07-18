#!/usr/bin/env bash
# sync-assets.sh — Copy shared/ (single source of truth) into site/ and tools/,
# the two Cloudflare Pages project roots, so both stay in sync without
# hand-editing duplicate files.
#
# Run manually after touching anything under shared/, or wire it into each
# Cloudflare Pages project's Build command (see README note in shared/).
set -euo pipefail
cd "$(dirname "$0")/.."

for root in site tools; do
  mkdir -p "$root/assets/brand" "$root/assets/js"
  cp shared/brand/*.png shared/brand/*.svg "$root/assets/brand/"
  cp shared/brand/apple-touch-icon.png "$root/apple-touch-icon.png"
  cp shared/brand/favicon.ico "$root/favicon.ico"
  cp shared/js/*.js "$root/assets/js/"
done

echo "Synced shared/brand/ and shared/js/ into site/ and tools/."
