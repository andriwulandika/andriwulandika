# TECH STACK

> Otoritas teknis operasional = `../AGENTS.md` (§3, §5, §8, §11). Dokumen ini ringkasan referensi.

## Frontend
- **HTML5 statis per halaman**, **tanpa framework/bundler runtime** (bukan React/Vue).
- **CSS vanilla** — mayoritas inline `<style>` per halaman + `tools/assets/css/article.css`.
- **JavaScript ES Modules native** (`<script type="module">`) — tanpa transpile. Beberapa skrip klasik.
- Nol dependency runtime klien.

## Backend
- **Cloudflare Pages Functions** (`tools/functions/`) — serverless, same-origin (tanpa CORS).
- `_lib.js` = logika terpusat (proxy AI, kredit/dompet, admin, rate-limit); route = wrapper tipis.
- **Cloudflare KV** namespace `ACCESS_CODES` = kode akses, saldo kredit, counter rate-limit.

## AI
- **Gemini** (`gemini-2.5-flash` + `-lite`) untuk demo; **Claude** (`claude-sonnet-4-6` +
  `claude-haiku-4-5`) untuk berbayar. Fallback antar-model saat HTTP 429.

## Build/authoring (bukan runtime)
- **11ty (Eleventy) ^3.1.6** — authoring lokal/CI: `src/site/`,`src/tools/` → `dist/` → salin ke
  `site/`/`tools/`. **Tidak berjalan saat deploy.**
- **sharp ^0.35.1** — proses gambar ad-hoc. Skrip bash: `sync-assets.sh`, `build-pages.sh`.

## Hosting & infra
- **Cloudflare Pages** (2 project: `andriwulandika` & `andriwulandika-tools`) + custom domain.
- Deploy via integrasi GitHub (push=preview, merge main=production), **Build Command kosong**.
- **GA4** (`G-MHKQETVZ2R`) via `shared/js/analytics.js`.

## Analytics & pihak ketiga
GA4 (googletagmanager) · Google/Anthropic API (server-side) · WhatsApp (wa.me) links.

## Kenapa stack ini
Hemat (hosting gratis, biaya token saja), cepat (statis + edge CDN), aman (permukaan kecil,
secret di server), tahan lama & bisa dirawat 1 orang. Batasan: no CMS, pembayaran manual,
CSS terduplikasi (`AUDIT_REPORT.md`, `DESIGN_SYSTEM.md`).

## Aturan perubahan stack
Menambah framework/bundler/dependency runtime, atau mengubah cara deploy = **keputusan manusia**
(AGENTS.md §18) + catat di `DECISION_LOG.md`.
</content>
