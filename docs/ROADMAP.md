# ROADMAP — andriwulandika.uk & ai.andriwulandika.uk

Roadmap pengerjaan bertahap (sprint). Status per item:
`TODO` · `IN PROGRESS` · `SELESAI (menunggu review)` · `SELESAI`.

---

## Sprint 1 — Legal & Keamanan Dasar — SELESAI (menunggu review)

Dikerjakan di branch `claude/sprint-1-legal-security-dyi4b9`. Belum di-merge ke
`main`, belum deploy produksi — hanya preview Cloudflare Pages.

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
