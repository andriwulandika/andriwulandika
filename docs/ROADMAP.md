# ROADMAP — andriwulandika.uk & ai.andriwulandika.uk

Roadmap pengerjaan bertahap (sprint). Status per item:
`TODO` · `IN PROGRESS` · `SELESAI (menunggu review)` · `SELESAI`.

---

## Sprint 1 — Legal & Keamanan Dasar — SELESAI (sudah merge #52)

Dikerjakan di branch `claude/sprint-1-legal-security-dyi4b9`, di-merge lewat
PR #52.

| Kode | Item | Status |
|------|------|--------|
| P0-1 | Halaman Kebijakan Privasi (kedua situs) | ✅ SELESAI (terverifikasi audit 20 Jul 2026) |
| P1-6 | Rate-limit endpoint `/verify` | ✅ SELESAI (terverifikasi audit 20 Jul 2026) |
| P0-2 | Content-Security-Policy dasar (site & tools) | ✅ SELESAI (terverifikasi audit 20 Jul 2026) |
| P1-6 | Panduan mengganti `ADMIN_PASSWORD` | ⚠️ Dokumen & kode siap — nilai aktual di Cloudflare **perlu konfirmasi manual Andri** |

### Ringkasan yang dikerjakan

- **P0-1 — Kebijakan Privasi.** Halaman baru `kebijakan-privasi.html` untuk
  kedua situs (`src/site/` dan `src/tools/`), gaya visual konsisten dengan
  halaman lain. Isi: data yang dikumpulkan (isian AI Tools termasuk nama
  OPD/pejabat, data kontak WhatsApp, analitik GA4), tujuan pemakaian, pihak
  ketiga pemroses (Google, Anthropic, Cloudflare), penegasan bahwa isian AI
  Tools **tidak disimpan di server** (diverifikasi terhadap
  `tools/functions/_lib.js` — prompt hanya diteruskan ke penyedia AI, yang
  disimpan di KV hanya kode akses + saldo kredit + counter rate-limit), hak
  pengguna & kontak (email + WhatsApp), dan tanggal berlaku (20 Juli 2026).
  Rujukan wajar ke UU PDP No. 27/2022. Tautan ditambahkan di footer seluruh
  halaman kedua situs; halaman AI Tools yang tidak berfooter menautkannya lewat
  kalimat persetujuan di dekat form.
- **P1-6 — Rate-limit `/verify`.** `handleVerify` kini memakai helper
  `checkRateLimit` yang sudah ada (namespace `verify:<ip>`, ambang 10
  percobaan/menit/IP) untuk mencegah enumerasi kode akses. Respons saat kena
  limit ramah dan tidak membocorkan detail teknis; halaman "Masuk" menampilkan
  pesannya.
- **P0-2 — CSP dasar.** Header `Content-Security-Policy` ditambahkan pada blok
  `/*` di `src/site/_headers` dan `src/tools/_headers`. Sengaja **longgar namun
  bermakna** untuk Sprint 1: `default-src 'self'` dengan izin eksplisit hanya
  untuk host yang benar-benar dipakai — Google Fonts (tools), Google Tag
  Manager/Analytics, dan cdnjs (html2pdf, tools). `'unsafe-inline'` tetap
  diizinkan karena halaman saat ini memakai style & script inline;
  `'unsafe-eval'` diizinkan di tools sebagai pengaman untuk pustaka ekspor PDF
  (html2pdf/jsPDF). **Pengetatan lanjutan (hapus `unsafe-inline`/`unsafe-eval`
  via nonce/hash, pisahkan CSS/JS inline) masuk Sprint 4.**
- **P1-6 — Panduan `ADMIN_PASSWORD`.** Dokumen baru
  `docs/panduan/ganti-admin-password.md` — langkah klik-demi-klik di dashboard
  Cloudflare Pages, saran membuat password panjang & acak, dan cara memverifikasi
  login admin setelah diganti. Tidak ada secret yang diubah.

### Catatan verifikasi

- `npm run build` dan `npm run build:pages` sukses & reproducible (`git status`
  stabil pada re-run).
- `node --check` lolos untuk `tools/functions/_lib.js` dan `verify.js`.
- Uji fungsional CSP di browser (semua halaman + 8 AI Tools + ekspor PDF tanpa
  error di console) **perlu dilakukan di preview** — lingkungan agen tidak bisa
  menjalankan browser dan egress ke cdnjs diblokir.

**Audit status 20 Juli 2026 (cek langsung ke kode, tanpa build/browser):**
- `kebijakan-privasi.html` ada di `src/site/` dan `src/tools/`, ditautkan di
  footer semua halaman konten kedua situs (lewat include `footer-article.html`
  / `footer-panduan.html`). Halaman tanpa tautan (`404.html`, file verifikasi
  Google, `jasa.html` yang kini redirect) memang tidak butuh footer.
- `handleVerify` di `tools/functions/_lib.js` memanggil
  `checkRateLimit(env, 'verify:${clientIp}', VERIFY_RATE_LIMIT_REQUESTS)` dengan
  `VERIFY_RATE_LIMIT_REQUESTS = 10` dan window 60 detik — sesuai deskripsi.
- CSP `Content-Security-Policy` ada di blok `/*` pada `src/site/_headers` dan
  `src/tools/_headers`, plus `Cross-Origin-Opener-Policy` &
  `Cross-Origin-Resource-Policy` (dari Sprint 2).
- `ADMIN_PASSWORD`: kode (`_lib.js`) sudah memakai `env.ADMIN_PASSWORD` +
  `timingSafeEqual`, dan `docs/panduan/ganti-admin-password.md` ada. **Tidak
  bisa diverifikasi dari kode/agen apakah nilai password di dashboard
  Cloudflare Pages benar-benar sudah diganti dari default** — perlu Andri
  konfirmasi manual di Cloudflare.

---

## Sprint 2 — Legal Lanjutan, Rapikan & Keamanan Header — SELESAI (menunggu review)

Dikerjakan di branch `claude/sprint-2-legal-security`. Belum di-merge ke `main`,
belum deploy produksi — hanya preview Cloudflare Pages.

| Item | Status |
|------|--------|
| Rapikan sisa Sprint 1 (sitemap halaman legal) | ✅ SELESAI (terverifikasi audit 20 Jul 2026) |
| Halaman Syarat & Ketentuan (kedua situs) | ✅ SELESAI (terverifikasi audit 20 Jul 2026) |
| Banner persetujuan cookie/analitik (GA4 opt-in) | ✅ SELESAI (terverifikasi audit 20 Jul 2026) |
| Security header tambahan (COOP/CORP) | ✅ SELESAI (terverifikasi audit 20 Jul 2026) |
| Pengetatan CSP penuh | DIRENCANAKAN → Sprint 4 (lihat di bawah) |

### Ringkasan yang dikerjakan

- **Rapikan sisa Sprint 1.** Halaman `kebijakan-privasi.html` (dan
  `syarat-ketentuan.html` baru) dimasukkan ke `sitemap.xml` kedua situs
  (prioritas rendah, `changefreq` yearly).
- **Syarat & Ketentuan.** Halaman baru `syarat-ketentuan.html` untuk kedua situs,
  gaya konsisten dengan halaman legal lain. Isi: tentang layanan, penggunaan yang
  diperbolehkan, sistem kredit (non-refundable, tidak kedaluwarsa), **tanggung
  jawab pengguna atas dokumen hasil AI** (wajib diperiksa/diverifikasi, bukan
  nasihat hukum), kepemilikan/hak, batasan tanggung jawab, rujukan ke Kebijakan
  Privasi, hukum yang berlaku (Indonesia) + kontak. Ditautkan di footer seluruh
  halaman kedua situs bersama Kebijakan Privasi.
- **Banner persetujuan analitik.** `shared/js/analytics.js` diubah agar GA4 hanya
  dimuat **setelah** pengunjung menyetujui (opt-in, sesuai UU PDP). Pilihan
  disimpan di `localStorage` (`aw_analytics_consent`). Banner kecil (Terima/Tolak
  + tautan Kebijakan Privasi) muncul pada kunjungan pertama; sebelum memilih, GA4
  tidak dimuat sama sekali. Perubahan cukup di `shared/` lalu di-sync ke kedua
  situs — tidak perlu menyunting tiap halaman.
- **Security header tambahan.** `Cross-Origin-Opener-Policy: same-origin` dan
  `Cross-Origin-Resource-Policy: same-site` ditambahkan pada blok `/*` di kedua
  `_headers`. Aman untuk arsitektur saat ini (kedua situs same-site; tidak ada
  subresource lintas-origin selain host yang sudah diizinkan CSP).

### Catatan verifikasi

- `npm run build` + `npm run build:pages` sukses & reproducible.
- Uji di preview: buka semua halaman, muncul **banner analitik** (klik Terima →
  GA4 aktif; Tolak → tidak ada permintaan ke Google Analytics di tab Network),
  buka halaman **Syarat & Ketentuan** kedua situs, dan pastikan **tidak ada error
  CSP/CORP di console** termasuk ekspor PDF. (Perlu browser — tidak bisa dari
  lingkungan agen.)

### Audit status 20 Juli 2026

- `syarat-ketentuan.html` ada di `src/site/` dan `src/tools/`.
- `sitemap.xml` kedua situs sudah mencantumkan `kebijakan-privasi.html` dan
  `syarat-ketentuan.html`.
- `shared/js/analytics.js` berisi logic consent (`aw_analytics_consent` di
  `localStorage`) + banner "Terima/Tolak"; file identik dengan
  `src/site/assets/js/analytics.js` dan `src/tools/assets/js/analytics.js`
  (sudah di-sync), dan dirujuk di semua halaman konten kedua situs.
- `Cross-Origin-Opener-Policy: same-origin` dan
  `Cross-Origin-Resource-Policy: same-site` ada di blok `/*` kedua `_headers`.

---

## Item tambahan ditemukan saat audit (belum tercatat sebagai sprint resmi)

Ketiga item ini disebut dalam permintaan audit 20 Juli 2026 tapi **belum ada di
sprint manapun di atas** — dicatat di sini supaya masuk perencanaan sprint
berikutnya. Item 2.1 dan 2.2 diselesaikan pada sesi 20 Juli 2026 (lanjutan PR #55).

| Item | Status | Bukti |
|------|--------|-------|
| 2.1 — Hapus penyebutan "TAPD" | ✅ Selesai (final) | `grep -ril "TAPD" src/` → tidak ada hasil (dicek ulang di seluruh repo, hanya tersisa di catatan audit ini). Diganti dengan frasa netral yang tetap merujuk pengalaman koordinasi 51 OPD, tanpa menyebut keanggotaan TAPD, di `src/tools/index.html` dan `src/site/tentang.html`. `site/tentang.html` dan `tools/index.html` (build output) sudah di-regenerate via `scripts/build-pages.sh`. |
| 2.2 — Pisahkan jabatan Bappeda dari konteks jasa berbayar | ✅ Selesai (final) | `src/site/tentang.html` — ditambahkan section disclaimer terpisah antara "Why Work With Me" dan CTA berbayar, plus reword ringan pada value-card 01 agar tidak membingkai jabatan ASN sebagai alasan langsung membeli jasa. Kalimat disclaimer sudah **final & disetujui Andri** (versi asli, bukan draft). |
| Ganti hero lama "Punya Usaha, Harus Punya Website" | ✅ Selesai | `grep -ril "Punya Usaha, Harus Punya Website" src/` → tidak ada hasil. Hero saat ini di `src/site/index.html`: `"Transformasi digital untuk pemerintah & bisnis"` |

> Koreksi kecil (21 Jul 2026): `CLAUDE.md` & `.claude/skills/brand-governance-check/SKILL.md` disinkronkan agar mengacu ke tagline hero live `"Transformasi digital untuk pemerintah & bisnis"` — bukan perubahan positioning, hanya sinkronisasi dokumen (referensi tagline lama sebelumnya salah).

---

## Redesign Homepage — Editorial Premium (Arah A) (22 Jul 2026)

Andri memilih arah desain **Editorial Premium (Arah A)** untuk tampilan situs
(referensi kualitas: situs pemenang award / Awwwards). Diputuskan **upgrade di
dalam stack statis yang ada** — BUKAN migrasi ke Next.js/Three.js (keputusan
stack mahal-dibalik; ditolak tanpa ADR + persetujuan, sesuai `CLAUDE.md`).

| Item | Status | Bukti |
|------|--------|-------|
| R.1 — Prototipe preview Editorial (Arah A) | ✅ Selesai & merge (#64) | Dulu `src/site/preview-editorial.html` (noindex). Kini dipromosikan jadi homepage, file preview dihapus. |
| R.2 — Adopsi logo "a" terracotta + favicon | ✅ Selesai | `src/site/assets/brand/logo-a-mark.png` + `favicon-a-{32,180,512}.png`. Aksen brand: `--accent:#c2510c`, `--brand:#e76e44`. |
| R.3 — Font self-hosted (CSP-safe) | ✅ Selesai | Playfair Display + Plus Jakarta Sans di `src/site/assets/fonts/*.woff2` (tanpa CDN font, patuh CSP `font-src 'self'`). |
| R.4 — Promosikan Editorial jadi `index.html` resmi | ✅ Selesai (22 Jul 2026) | `src/site/index.html` diganti desain Editorial. **SEO dipertahankan**: 4 verifikasi Google, JSON-LD (WebSite/Person/Service + FAQPage), OG/Twitter, `robots:index`, `analytics.js`. Konten: hero, layanan, portofolio filter, proses, harga lengkap, FAQ, CTA, footer. |
| R.5 — Enhancement "Awwwards-feel" (tanpa ganti framework) | ✅ Selesai | Lenis smooth-scroll self-hosted (`assets/js/lenis.min.js`, via `npm pack`, CSP-safe), scroll-reveal (IntersectionObserver), parallax gambar portofolio, tombol magnetik, hover-zoom, canvas 3D subtil di hero. Semua hormati `prefers-reduced-motion`. |
| R.6 — Terapkan logo/favicon ke SELURUH halaman | ⏳ Belum | Halaman lain (`tentang`, `layanan-*`, `produk`, `demo-*`, dll) masih favicon lama. Rollout terpisah. |
| R.7 — Ganti placeholder TikTok | ⏳ Menunggu Andri | Footer `index.html` masih `href="#"` (TODO) — butuh URL TikTok resmi. |

---

## Eksplorasi Arah Desain Homepage Baru (26 Jul 2026) — ⏳ Menunggu pilihan Andri

Tiga pratinjau arah desain baru (selain Editorial Premium/Arah A yang saat ini
live) dibuat sebagai perbandingan, **tidak menyentuh `index.html` live**. Konten
(tagline, copy layanan, harga) identik dengan homepage saat ini — hanya
tampilan visual & struktur yang berbeda, supaya perbandingan murni soal gaya,
bukan soal isi.

| Arah | File preview (noindex) | Ciri visual |
|---|---|---|
| B — Modern Tech/SaaS | `src/site/preview-modern-tech.html` | Terang, aksen gradasi indigo→cyan, kartu rounded, latar gradient mesh mengalir di hero. |
| C — Corporate Government-Trust | `src/site/preview-corporate-trust.html` | Navy + emas, tipografi serif formal, grid simetris, latar garis geometris halus — untuk kesan resmi/instansi. |
| D — Bold & Berani (Dark Mode) | `src/site/preview-bold-dark.html` | Latar gelap, aksen oranye-cyan vivid, tipografi besar uppercase, glow berdenyut di hero. |
| B+ — Modern Tech dengan animasi 3D | `src/site/preview-modern-tech-3d.html` | Varian Arah B + mockup "device card" 3D (CSS transform, bukan WebGL/Three.js) dengan chip mengambang, tilt interaktif saat disentuh/di-hover. Dioptimalkan untuk HP: tanpa izin sensor gerak, tanpa animasi berat, terverifikasi tanpa overflow horizontal di viewport 390px. |
| E — Cinematic Agency (terinspirasi hobro.digital) | `src/site/preview-cinematic-agency.html` | Latar gelap hangat (amber), wordmark besar kinetik, cursor custom dua-lapis (dot + ring, desktop saja), teks reveal per-kata saat scroll, efek mengetik siklus 4 layanan, strip portofolio drag-scroll. Semua vanilla CSS/JS (tanpa GSAP/library baru) — teknik ditiru dari hobro.digital, konten/harga/tagline tetap 100% milik Andri (tidak menyalin case study/tim/logo mereka). Font: **Space Grotesk** (self-hosted, `assets/fonts/space-grotesk-*.woff2`), bukan font asli hobro.digital (Kamerik205/PP Neue Montreal — font berbayar berlisensi, tidak boleh disalin/di-vendor tanpa lisensi); Space Grotesk dipilih sebagai alternatif gratis (OFL) dengan karakter geometric-grotesk tebal yang serupa. Wordmark "ANDRI WULANDIKA" dibuat bold maksimal (700) + tracking rapat (-0.045em) untuk kesan logotype seperti "HOBRO DIGITAL" — bukan menyalin huruf SVG kustom mereka. |

### Tambahan Arah E — Animasi 3D Spline aktif ("Zero gravity physics")

Atas permintaan Andri, `preview-cinematic-agency.html` menampilkan **scene 3D
Spline interaktif** ("Zero gravity physics landing page" — objek melayang yang
bereaksi didorong kursor) sebagai latar hero, di belakang wordmark.

- **Scene**: hasil remix Andri dari komunitas Spline
  (`spline.design/community/file/3b3310ba-...`), lalu di-export sebagai HTML
  statis mandiri via `my.spline.design/zerogravityphysicslandingpage-...`.
  Watermark "Built with Spline" dipertahankan (wajib untuk pemakaian gratis).
- **Sepenuhnya self-hosted, tanpa perubahan CSP**: file export disimpan di
  `src/site/assets/spline/zero-gravity-hero.html`, dengan satu-satunya
  dependency-nya (`@splinetool/runtime@1.12.98`, sebelumnya dimuat dari
  unpkg.com) di-vendor ke `src/site/assets/js/spline-runtime/`. Dipasang lewat
  `<iframe>` **same-origin** — bukan lewat CDN eksternal — jadi CSP
  `script-src 'self'` situs tidak perlu diubah sama sekali.
- **Sengaja dibatasi (gating) demi performa HP**: hanya dimuat di layar
  ≥900px (desktop/tablet), tidak saat `prefers-reduced-motion`, tidak saat
  `navigator.connection.saveData` aktif, dan baru di-load (lazy) via iframe
  ketika hero benar-benar terlihat di viewport (`IntersectionObserver`). Di
  HP, hero tetap gradient amber ringan — nol biaya loading tambahan,
  diverifikasi tanpa request jaringan sama sekali ke arah Spline saat viewport
  <900px.
- **Verifikasi**: dites headless (Playwright) — file HTML & runtime termuat
  200 OK, tidak ada error console, tidak ada request gagal, konteks WebGL2
  berhasil dibuat, chunk scene (physics/opentype) berhasil diminta. **Render
  visual 3D-nya sendiri tidak bisa dipastikan dari lingkungan agen** (GPU
  software/headless, bukan GPU asli) — Andri perlu cek langsung di preview
  Cloudflare pakai browser sendiri untuk konfirmasi visual final.

Semua tetap memakai font self-hosted yang sudah ada (Jakarta/Playfair, CSP-safe),
tagline resmi persis `"Transformasi digital untuk pemerintah & bisnis"`, dan
harga sesuai `docs/KNOWLEDGE-BASE.md` §6 (tidak ada perubahan pricing).

**Menunggu Andri memilih salah satu arah (atau tetap dengan Arah A) sebelum ada
promosi ke `index.html`** — sesuai kewenangan di `CLAUDE.md` (perubahan
positioning/tampilan utama butuh persetujuan pemilik sebelum merge ke `main`).

---

## Harga Jasa Website (ditetapkan 21 Jul 2026)

Harga jasa website **sudah ditetapkan** berdasarkan riset pasar (bukan lagi
"dipertahankan tanpa angka"). Angka lengkap per paket + sumber riset ada di
**`docs/KNOWLEDGE-BASE.md` §6 (Model Bisnis)**. Paket kredit AI Tools belum
diubah pada sesi ini.

### Temuan: harga live ≠ harga target — ✅ SELESAI: diselaraskan ke harga transisi (21 Jul 2026)

**Status: Selesai — diselaraskan ke harga transisi Fase 0 (21 Jul 2026).**
Andri memutuskan memakai harga transisi (lebih rendah dari harga target) untuk
mempercepat 2 klien berbayar pertama. Harga live sudah diubah:

| Paket | Sebelum (live lama) | Sesudah (harga transisi live) | Harga target (KB §6a) |
|---|---|---|---|
| Landing Page | Rp 750rb | **Rp 1,2 juta** | Rp 1.200.000 – 2.000.000 |
| Company Profile / Website Profil | Rp 2 juta | **Rp 3 juta** | Rp 3.500.000 – 6.000.000 |
| Instansi / OPD / Website Desa | Rp 3,5 juta | **mulai Rp 2,5 juta** | Rp 2.000.000 – 3.500.000 |

File yang diubah: `src/site/index.html`, `src/site/layanan-bisnis.html`,
`src/site/layanan-pemerintah.html`, `src/site/promo.html` (termasuk
meta-description + teks WA link). Pemicu naik ke harga target: setelah 2 klien
berbayar pertama selesai (lihat `docs/KNOWLEDGE-BASE.md` §6a).

> Catatan interpretasi: paket pemerintah di situs berlabel **"Instansi / OPD"**
> (mencakup desa). Harga "mulai Rp 2,5 juta" diterapkan ke paket itu; label
> paket tidak diubah. Kalau Andri ingin paket "Website Desa" terpisah dari
> "Instansi/OPD", itu perubahan struktur paket tersendiri (belum dikerjakan).

---

## Sprint 3 — Pengelolaan Media Sosial (lini layanan baru)

| Item | Status | Bukti |
|------|--------|-------|
| 3.1 — Tetapkan harga paket Pengelolaan Media Sosial | ✅ Selesai (21 Jul 2026) | Harga final: UMKM Rp 600rb/bln, Bertumbuh Rp 1,5 juta/bln. Tercatat di `docs/KNOWLEDGE-BASE.md` §6b (status: aktif). |
| 3.2 — Bangun section paket di situs | ✅ Selesai (21 Jul 2026) | Section `#medsos` (2 kartu paket + CTA WhatsApp pra-isi) di `src/site/layanan-bisnis.html`; kartu ringkas lini layanan di `src/site/index.html` (link ke `layanan-bisnis.html#medsos`); blok "Paket Media Sosial" + CTA WhatsApp di `src/site/promo.html`. |
| 3.4 — Payment link (jasa website + langganan medsos) | ✅ Diputuskan (21 Jul 2026): manual WA sekarang, pindah ke Mayar saat ada pelanggan | `docs/adr/0001-payment-link.md` status DITERIMA. Opsi (a) manual WA dipilih untuk Fase 0; pemicu pindah ke (b) Mayar.id = ada pelanggan langganan medsos pertama. Tidak ada perubahan kode/harga live. |

---

## Sprint 4 — Pengetatan CSP penuh (RENCANA)

## Sprint 4 — Pengetatan CSP penuh (RENCANA)

**Tujuan:** menghapus `'unsafe-inline'` dan `'unsafe-eval'` dari CSP agar proteksi
XSS benar-benar kuat. Ini **refactor besar lintas ~40 halaman** dan sengaja
dipisah dari Sprint 2 karena berisiko memecah tampilan/fungsi bila terburu-buru.

**Kendala teknis:** situs disajikan sebagai file statis di Cloudflare Pages tanpa
build saat deploy, jadi **nonce per-request tidak tersedia** (butuh middleware
yang menulis ulang HTML tiap request). Pengetatan harus lewat refactor + hash.

**Langkah yang direncanakan (bertahap, per batch, verifikasi tiap batch):**

1. **Hapus `unsafe-eval`:** verifikasi apakah html2pdf/jsPDF benar-benar butuh
   `eval`/`new Function` di preview. Bila tidak, langsung hapus `'unsafe-eval'`
   dari `script-src` tools (kemungkinan besar aman untuk jsPDF 2.x + html2canvas).
2. **Inline event handler → `addEventListener`:** ganti seluruh atribut `onclick`,
   `onchange`, `onkeydown`, `oninput` (banyak di 8 AI Tools & halaman wizard)
   menjadi listener di skrip. Ini prasyarat utama menghapus `'unsafe-inline'`
   pada `script-src`.
3. **Eksternalkan/hash skrip inline:** pindahkan blok `<script>` inline (nav
   burger, reveal, progress bar, TOC, FAQ) ke file `assets/js/*` bersama, atau
   hitung `sha256` tiap blok dan daftarkan di `script-src`.
4. **Eksternalkan style inline bila memungkinkan:** pindahkan `<style>` besar ke
   file CSS; untuk atribut `style=""` yang tersisa, pertimbangkan `'unsafe-hashes'`
   atau refactor ke kelas — lalu hapus `'unsafe-inline'` dari `style-src`.
5. **Uji menyeluruh** tiap halaman + 8 AI Tools + ekspor PDF sebelum mengencangkan
   header. Pertimbangkan fase `Content-Security-Policy-Report-Only` lebih dulu
   bila ingin memantau pelanggaran tanpa risiko.
