# ROADMAP — andriwulandika.uk & ai.andriwulandika.uk

Roadmap pengerjaan bertahap (sprint). Status per item:
`TODO` · `IN PROGRESS` · `SELESAI (menunggu review)` · `SELESAI`.

---

## Sprint 1 — Legal & Keamanan Dasar — SELESAI (sudah merge #52)

Dikerjakan di branch `claude/sprint-1-legal-security-dyi4b9`, di-merge lewat
PR #52.

| Kode | Item | Status |
|------|------|--------|
| P0-1 | Halaman Kebijakan Privasi (kedua situs) | SELESAI (menunggu review) |
| P1-6 | Rate-limit endpoint `/verify` | SELESAI (menunggu review) |
| P0-2 | Content-Security-Policy dasar (site & tools) | SELESAI (menunggu review) |
| P1-6 | Panduan mengganti `ADMIN_PASSWORD` | SELESAI (menunggu review) |

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

---

## Sprint 2 — Legal Lanjutan, Rapikan & Keamanan Header — SELESAI (menunggu review)

Dikerjakan di branch `claude/sprint-2-legal-security`. Belum di-merge ke `main`,
belum deploy produksi — hanya preview Cloudflare Pages.

| Item | Status |
|------|--------|
| Rapikan sisa Sprint 1 (sitemap halaman legal) | SELESAI (menunggu review) |
| Halaman Syarat & Ketentuan (kedua situs) | SELESAI (menunggu review) |
| Banner persetujuan cookie/analitik (GA4 opt-in) | SELESAI (menunggu review) |
| Security header tambahan (COOP/CORP) | SELESAI (menunggu review) |
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

---

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
