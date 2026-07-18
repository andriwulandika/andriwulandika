#!/usr/bin/env bash
# build-pages.sh — Generate site/ dan tools/ dari src/ lewat 11ty, lalu salin
# hasilnya menimpa folder yang benar-benar di-deploy Cloudflare Pages.
#
# src/{site,tools}/ adalah SUMBER (boleh pakai {% include %} dsb). site/ dan
# tools/ di root tetap folder yang di-commit & disajikan Cloudflare — TANPA
# build command di Cloudflare itu sendiri (Root/Build/Output tidak berubah).
# Jalankan skrip ini secara lokal/CI setelah mengedit apa pun di src/, lalu
# commit perubahan pada site/ dan/atau tools/ yang muncul di git status.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf dist
npx eleventy --config=.eleventy.site.js
npx eleventy --config=.eleventy.tools.js

cp -a dist/site/. site/
cp -a dist/tools/. tools/

rm -rf dist
echo "Selesai. Jalankan 'git status' untuk melihat apa yang berubah di site/ dan tools/."
