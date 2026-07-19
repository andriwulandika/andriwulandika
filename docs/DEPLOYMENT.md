# DEPLOYMENT

> Otoritatif: `../AGENTS.md` §8. Ringkasan operasional di sini.

## Model
Cloudflare Pages + integrasi GitHub. **Aset & halaman sudah di-commit** → tiap situs
self-contained, di-serve **tanpa build command**.
- **Push ke branch** = preview deployment.
- **Merge ke `main`** = production deployment. (Merge ke main = **keputusan manusia**, AGENTS.md §18.)

## Konfigurasi Cloudflare (disarankan, anti-salah)
| Project | Domain | Root Directory | Build Command | Output |
|---|---|---|---|---|
| `andriwulandika` | andriwulandika.uk | `site` | (kosong) | `/` |
| `andriwulandika-tools` | ai.andriwulandika.uk | `tools` | (kosong) | `/` |

Binding & Secret (project tools): KV `ACCESS_CODES`; Secrets `GEMINI_API_KEY`, `CLAUDE_API_KEY`,
`ADMIN_PASSWORD`. **Jangan pernah commit secret** (`SECURITY.md`).

## Yang di-serve
Folder situs (`site/`/`tools/`) berisi HTML + `404.html` + `_redirects` + `_headers`.
**Gejala "semua halaman 404"** = Output/Root salah menunjuk root repo → perbaiki Output/Root dulu.

## Sebelum deploy (bila `shared/` atau `src/` berubah)
1. `npm run build` (sync aset) &/atau `npm run build:pages` (generate halaman).
2. Verifikasi `git status` (diff `dist/` vs output = tak ada regresi).
3. Pastikan `tools/functions/` sinkron dengan `src/tools/functions/`.
4. Commit (Conventional Commits) → push branch → PR draft → (manusia) merge ke main.

## Rollback
Cloudflare Pages menyimpan riwayat deployment → rollback ke deployment sebelumnya via dashboard.
Untuk kode: revert commit di `main`.

## Redirect & headers
`_redirects` (301 map domain lama/migrasi + 404 catch-all), `_headers` (cache + security).
Perubahan URL wajib 301 (`SEO_STRATEGY.md`).

Terkait: `SYSTEM_ARCHITECTURE.md`, `SECURITY.md`, `PERFORMANCE.md`.
</content>
