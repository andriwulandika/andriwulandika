# LAPORAN AUDIT TOTAL — andriwulandika.uk

Tanggal audit: **2026-07-19** · Auditor: Claude (Project/Technical Lead) ·
Metode: pembacaan penuh repository (read-only, tanpa mengubah kode di fase ini).
Basis: commit `ccf3491` pada branch `claude/andri-website-audit-f5al9b`.

Ringkasan eksekutif: proyek ini **jauh lebih matang dari rata-rata proyek personal**.
Arsitektur statis + serverless yang hemat, backend AI yang aman & rapi, SEO teknis solid,
dan positioning brand yang sudah diselaraskan ke *Digital Transformation Consultant*.
Skor kesehatan keseluruhan **~7.8/10**. Yang menahan dari kelas agensi dunia bukan
fondasi, melainkan **konsistensi messaging, bukti sosial (portofolio/testimoni), CSP,
dan disiplin proses (test/CI, sitemap)**. Detail per poin di bawah.

---

## 1. Kondisi Website Saat Ini
Dua situs produksi dalam satu repo, keduanya live:
- **andriwulandika.uk** (`site/`) — landing jasa & profil konsultan. 8 halaman HTML.
- **ai.andriwulandika.uk** (`tools/`) — platform 8 AI tools perencanaan daerah + 15
  artikel panduan + halaman transaksi (harga/bayar/dashboard/admin). 29 halaman HTML +
  backend Cloudflare Functions.

Status: **fungsional & production**. Positioning brand baru (Digital Transformation for
Government & Business) sudah tertanam di homepage, tentang, layanan, produk. Tidak ada
sisa tagline "AI-first" di `site/` (diverifikasi via grep).

## 2. Struktur Folder
Lihat `FOLDER_STRUCTURE.md` untuk detail. Inti:
- `shared/` = SSOT aset (brand + JS) → disalin ke kedua situs oleh `scripts/sync-assets.sh`.
- `src/site/`, `src/tools/` = SSOT halaman (authoring 11ty) → digenerate ke `site/`/`tools/`
  oleh `scripts/build-pages.sh`.
- `site/`, `tools/` = folder yang **di-commit & di-serve apa adanya** oleh Cloudflare Pages
  (tanpa build command saat deploy — keputusan pasca-insiden).
- `tools/functions/` = backend Cloudflare Pages Functions.
- **Catatan:** ada duplikasi sumber (`src/`) vs output (`site/`,`tools/`) yang keduanya
  di-commit. Ini disengaja (self-contained deploy) tapi menaikkan risiko *drift* bila
  editor mengubah output langsung. Lihat Technical Debt (#20).

## 3. Struktur Komponen
Tanpa framework/komponen runtime. "Komponen" berupa:
- **CSS**: sebagian besar **inline `<style>` per halaman** (homepage ~450 baris CSS inline).
  Stylesheet bersama minimal (`tools/assets/css/article.css`).
- **JS bersama** (`shared/js/`): `analytics.js` (GA4 + auto-load ui-enhance),
  `apiService.js` (klien AI + dompet kredit), `nav-auth.js` (swap tombol Masuk→Dashboard),
  `ui-enhance.js` (scroll progress, back-to-top, hover polish; idempoten & reduced-motion aware).
- **Include 11ty** (`src/tools/_includes/`): `nav-article.html`, `footer-article.html`,
  `footer-panduan.html`, `nav-sitool-minimal.html` — dipakai 12 halaman tools (klaster identik).
- **Temuan:** desain nav/footer/hero **diduplikasi sebagai CSS inline** di banyak halaman
  `site/` — belum diekstrak. Konsistensi dijaga manual (rawan). Lihat #17, #20.

## 4. Struktur Halaman
- **site/**: `index` (989 br), `tentang` (636), `layanan-pemerintah` (235),
  `layanan-bisnis` (245), `produk` (201), `promo` (164, canonical→beranda), `jasa` (18,
  stub redirect→beranda), `404`, `googlea044b9a8efd52fe7` (verifikasi Google, kosong).
- **tools/**: `index` (1462), 8 halaman SiTool (SiRENJA/SiRKPD/SiKTOR/SiLKjIP/SiPerda/
  SiGenDok/SiBACARA/SiTelaah), 15 artikel panduan/edukasi, `harga`/`bayar`/`aktifkan-pro`/
  `panduan-kredit`/`dashboard`/`admin-kode`, `template`, `regulasi`, `404`.
- Halaman terbesar `tools/sigendok.html` (2512 br) — kandidat pemecahan/optimasi.

## 5. Teknologi yang Digunakan
Lihat `TECH_STACK.md`. Inti: HTML5 + CSS vanilla + JavaScript ES Modules (native, tanpa
transpile) · Cloudflare Pages (hosting statis global) · Cloudflare Pages Functions (backend)
· Cloudflare KV (`ACCESS_CODES`) · 11ty (authoring/build lokal, **bukan runtime**) ·
Google Gemini (demo) + Anthropic Claude (berbayar) · GA4. Tanpa framework/bundler runtime.

## 6. Dependency
`package.json` sangat ramping: hanya **devDependencies** — `@11ty/eleventy ^3.1.6`
(authoring), `sharp ^0.35.1` (proses gambar ad-hoc). **Nol dependency runtime klien**.
Situs 100% berjalan tanpa `node_modules` saat deploy. Ini kekuatan besar (permukaan serang
& biaya pemeliharaan minimal). `package-lock.json` ada & konsisten.

## 7. Build System
Dua skrip bash idempoten:
- `npm run build` → `sync-assets.sh` (copy `shared/` → `site/assets/`,`tools/assets/` + ikon root).
- `npm run build:pages` → `build-pages.sh` (11ty `src/*` → `dist/*`, lalu `cp` menimpa `site/`/`tools/`).
Keduanya **opsional saat deploy** (hasil sudah di-commit). Reproducible (git status bersih
setelah re-run bila `src/` tak berubah). **Tidak ada** langkah lint/test/format terautomasi.

## 8. Deployment
Cloudflare Pages via integrasi GitHub. Dua project terpisah, masing-masing Root Directory
`site` / `tools`, **Build Command kosong**, Output `/`. Push branch = preview; merge `main`
= production. Custom domain: `andriwulandika.uk` & `ai.andriwulandika.uk`. Redirect 301
menyeluruh dari domain lama/pages.dev & migrasi tools ke subdomain (`site/_redirects`).
Detail & mode gagal ("semua 404") terdokumentasi di AGENTS.md §8. Lihat `DEPLOYMENT.md`.

## 9. CI/CD
**Tidak ada `.github/workflows`** — tidak ada CI test/lint/build-check otomatis. CD murni
mengandalkan integrasi Cloudflare–GitHub. **Gap:** tidak ada gerbang kualitas otomatis
sebelum production (mis. `node --check`, HTML validation, link-check, diff `dist/` vs output).
Rekomendasi: tambah GitHub Actions ringan (lihat `ROADMAP.md` M2, `TODO.md` CI-01).

## 10. Performance
Kuat secara arsitektur: statis + edge CDN + hosting immutable-cache untuk aset (`_headers`
`max-age=31536000, immutable`), HTML `max-age=0, must-revalidate`. Script di-`defer`.
`prefers-reduced-motion` dihormati. **Namun:**
- **CSS inline besar per halaman** menaikkan berat HTML & menghalangi cache lintas-halaman.
- **Aset PNG berat** di `shared/brand/` (wallpaper ~300 KB ×2, logo PNG 60–67 KB) — perlu
  audit apakah benar-benar dipakai di jalur kritis; belum ada `webp/avif` atau `loading=lazy`
  konsisten. Belum ada `<link rel="preload">` untuk font/hero.
- Klaim homepage "PageSpeed 100" & "loading < 1 detik" **belum diverifikasi dengan data**
  (lihat #21 Bug/klaim). Lihat `PERFORMANCE.md`.

## 11. SEO
Secara teknis **di atas rata-rata**: title/description unik per halaman, canonical benar
(termasuk `promo.html`→beranda untuk hindari duplicate content), Open Graph + Twitter Card,
**JSON-LD** (WebSite + Person + Service dengan `offers` harga), sitemap & robots per situs,
301 map lengkap. **Temuan/perbaikan:**
- **SITEMAP↔NOINDEX konflik:** `tools/sitemap.xml` mendaftarkan `bayar.html`,
  `aktifkan-pro.html`, `admin-kode.html` yang **ber-`noindex`** (kontradiksi; buang dari sitemap).
- **4× `<meta google-site-verification>`** di homepage — kumulasi verifikasi lama, sebaiknya
  dirapikan (fungsional tapi berantakan).
- `lastmod` sitemap sebagian statis (16–19 Juli) — perlu proses update.
- Belum ada `BreadcrumbList`/`FAQPage`/`Article` schema di artikel panduan (peluang rich result).
Lihat `SEO_STRATEGY.md`.

## 12. Accessibility
Dasar baik: `lang="id"`, `aria-label` pada tombol nav/burger/to-top, `aria-expanded`
di-toggle, `prefers-reduced-motion` menyeluruh, fokus keyboard pada FAQ (button). **Gap:**
- **Kontras** teks sekunder `--text3 #64748b` di atas latar sangat gelap perlu diuji WCAG AA
  (borderline pada teks kecil).
- Belum ada **skip-to-content link**; landmark (`<main>`) tidak konsisten dipakai.
- Beberapa ikon emoji dekoratif tanpa `aria-hidden`.
- Belum ada audit axe/Lighthouse a11y terdokumentasi. Lihat `QUALITY_REVIEW.md` (a11y).

## 13. Security
**Titik terkuat proyek.** Backend `_lib.js`:
- Secret hanya di Cloudflare (tak pernah di-commit): `GEMINI_API_KEY`, `CLAUDE_API_KEY`,
  `ADMIN_PASSWORD`; binding KV `ACCESS_CODES`.
- Admin auth **constant-time** (`timingSafeEqual`), **rate-limit** publik (100/mnt) & admin
  (20/mnt) dengan **fail-closed** (tanpa KV → tolak).
- Validasi input: panjang prompt 5–5000, clamp temperature 0–2 & maxTokens 100–8000.
- **Kredit dipotong hanya setelah AI sukses** (fail-safe, tak ada double-charge saat error).
- Kode akses random tanpa karakter ambigu; namespace rate-limit terpisah.
Security headers di `_headers`: HSTS, X-Content-Type-Options, X-Frame-Options SAMEORIGIN,
Referrer-Policy, Permissions-Policy. **Gap utama:**
- **Tidak ada Content-Security-Policy** (di kedua situs). Karena banyak inline `<style>`/
  `<script>`, CSP butuh perencanaan (nonce/hash atau `unsafe-inline` sementara + allowlist).
- Rate-limit berbasis IP KV bisa di-race pada beban tinggi (increment non-atomik) —
  aman untuk skala saat ini, catat sebagai known-limit. Lihat `SECURITY.md`.

## 14. UX
Alur jelas: hero → trust bar → layanan → produk → keunggulan → portofolio → harga → proses
→ FAQ → CTA WhatsApp. CTA WhatsApp konsisten (nomor tunggal `62811660568`, 41 tautan). Tools
punya mode demo gratis (menurunkan friksi) & dashboard saldo. **Gesekan:**
- **Pembayaran manual** (transfer + konfirmasi WA + kode akses admin) — friksi tinggi & tidak
  scalable; belum ada self-serve. (Keputusan sadar demi biaya; lihat `BUSINESS_MODEL.md`.)
- **Bukti sosial tipis**: portofolio homepage 1 nyata + 2 placeholder "Segera"; tanpa testimoni
  klien nyata. Ini penghambat konversi terbesar dari sisi UX/persuasi.

## 15. UI
Konsisten & modern: dark theme, gradien aksen biru–indigo, glassmorphism, sudut membulat,
animasi masuk (`reveal`), micro-interaction hover. Kualitas visual **tinggi & koheren** antar
halaman `site/`. **Catatan:** karena styling diduplikasi inline, perbedaan halus antar halaman
mudah muncul saat edit manual; tidak ada satu design-token file. Lihat `DESIGN_SYSTEM.md`.

## 16. Branding
Aset brand lengkap (logo lockup/badge/mark dalam SVG+PNG multi-varian, favicon set, wallpaper).
Positioning terbaru selaras: "Digital Transformation for Government & Business" dengan AI
sebagai pendukung. **Tensi identitas yang perlu diputuskan sadar:** JSON-LD `Person.jobTitle`
= "Perencana Ahli Pertama" + `worksFor` Bappeda. Ini **memperkuat E-E-A-T/otoritas** tapi
sedikit berbeda dari citra "konsultan independen". Rekomendasi: pertahankan (aset kepercayaan),
namun samakan narasi di semua halaman. Lihat `BRAND_GUIDELINES.md`, `POSITIONING.md`.

## 17. Konsistensi Desain
- **Positif:** warna/tipografi/komponen seragam; `ui-enhance.js` menyatukan chrome (scroll bar,
  to-top) lintas halaman tanpa menimpa style lokal (`:where()` zero-specificity — rapi).
- **Risiko:** sumber kebenaran desain tersebar di banyak `<style>` inline; **belum ada token CSS
  terpusat** yang di-share. Perubahan brand (mis. ganti aksen) = edit banyak file.
- **Inkonsistensi path aset** kecil: homepage memuat `assets/js/analytics.js` (relatif) dan
  `/assets/js/ui-enhance.js` (absolut) berdampingan — keduanya jalan di domain ini, tapi tak seragam.

## 18. Hal yang Sudah Selesai
Fondasi arsitektur & deploy · backend AI + sistem kredit + admin · security hardening
(constant-time, rate-limit, fail-safe kredit) · positioning brand baru di `site/` · SEO teknis
(schema, OG, canonical, sitemap, 301) · 8 AI tools + 15 artikel · 11ty authoring (Phase 5) ·
dedup aset via `shared/` · halaman layanan Pemerintah & Bisnis + Produk + About rombak.

## 19. Hal yang Belum Selesai
Portofolio nyata & testimoni · CSP · CI/test otomatis · perbaikan sitemap↔noindex · self-serve
payment · optimasi gambar (webp/lazy/preload) · verifikasi klaim performa · schema artikel
(Article/FAQ/Breadcrumb) · sinkron messaging "tanpa batas" vs "pay-as-you-go" (lihat #21) ·
placeholder "Produk Digital Berikutnya" masih kosong.

## 20. Technical Debt
1. **Dual-source commit** (`src/` + output `site/`/`tools/` sama-sama di-commit) → risiko drift;
   mitigasi: disiplin edit di `src/` + (ideal) CI yang mem-verifikasi `dist/`==output.
2. **CSS inline terduplikasi** di `site/` → tak ada token/komponen CSS terpusat.
3. **Tanpa lint/test/CI** → gerbang kualitas manual (AGENTS.md §8 mendefinisikan pengganti minimal).
4. **Halaman raksasa** (`sigendok.html` 2512 br) monolitik.
5. **`node --check`-only** untuk JS Functions; tak ada unit test untuk logika kredit/rate-limit.

## 21. Bug / Klaim yang Perlu Diverifikasi
- **[SEO] sitemap tools mendaftarkan halaman noindex** (bayar/aktifkan-pro/admin-kode) — perbaiki.
- **[Messaging] `tools/harga.html`** mendeskripsikan Berbayar sebagai "akses penuh **tanpa batas**,
  API key sudah termasuk", padahal backend memakai **pay-as-you-go 1 kredit/dokumen**. Ini janji
  yang tidak sesuai implementasi → **wajib diselaraskan** (ubah copy atau model). Prioritas tinggi.
- **[Klaim] homepage** "PageSpeed 100" & "loading < 1 detik" belum ada bukti terlampir → jalankan
  Lighthouse/PSI, simpan hasil di `PERFORMANCE.md`, atau lunakkan klaim.
- **[SEO] 4× google-site-verification** di homepage — rapikan.
- Belum ada bug fungsional yang teridentifikasi via pembacaan statis (butuh uji runtime untuk konfirmasi).

## 22. Risiko
Ringkas (detail + skор di `RISK_REGISTER.md`):
- **Kepercayaan/konversi** rendah karena minim bukti sosial (dampak bisnis tertinggi).
- **Janji vs kenyataan** (harga "tanpa batas") → risiko reputasi/komplain.
- **Skalabilitas pembayaran manual** → bottleneck operasional bila permintaan naik.
- **Ketergantungan API pihak ketiga** (Gemini/Claude quota/harga/kebijakan).
- **Drift dual-source** tanpa CI.
- **Bus factor 1** (satu orang, satu WhatsApp, satu admin password).

## 23. Prioritas Perbaikan (urutan paling efektif)
Mengikuti prioritas AGENTS.md §16 (keamanan → produksi rusak → korektnes → konsistensi → perf → kosmetik):
1. **P0 Korektnes/Reputasi:** selaraskan messaging harga "tanpa batas"↔pay-as-you-go.
2. **P0 SEO:** hapus halaman noindex dari `tools/sitemap.xml`.
3. **P1 Konversi:** tambah portofolio nyata + minimal 2–3 testimoni.
4. **P1 Security:** rancang & pasang CSP (mulai report-only).
5. **P1 Proses:** GitHub Actions gate (`node --check`, HTML/link check, verifikasi `dist/`).
6. **P2 Perf:** optimasi gambar (webp, lazy, preload hero), verifikasi klaim PSI.
7. **P2 SEO+:** schema Article/FAQ/Breadcrumb di artikel; rapikan verifikasi Google.
8. **P2 Maintainability:** ekstraksi token/komponen CSS bersama untuk `site/`.
9. **P3 A11y:** skip link, landmark `<main>`, audit kontras & axe.
10. **P3 Growth:** self-serve payment (evaluasi payment gateway) — keputusan bisnis.

## 24. Rekomendasi
Proyek ini sudah punya **fondasi kelas atas**; jalan menuju "kelas agensi dunia" adalah
**kepercayaan + konsistensi + proses**, bukan menulis ulang teknologi. Tiga taruhan terbesar:
1. **Bukti sosial** (portofolio nyata, testimoni, studi kasus) — pengungkit konversi #1.
2. **Kejujuran & konsistensi pesan** (perbaiki janji harga; satu narasi brand di semua kanal).
3. **Otomasi kualitas** (CI + CSP + optimasi perf terukur) agar skala tanpa menurunkan mutu.

Urutan eksekutif lengkap ada di `ROADMAP.md` (5 milestone) dan `TODO.md` (Critical→Future).
Semua keputusan yang mengubah arah harus melewati `DECISION_LOG.md` dan persetujuan pemilik
(sesuai peran Claude sebagai SSOT yang tidak menabrak dokumen yang telah disepakati).
</content>
