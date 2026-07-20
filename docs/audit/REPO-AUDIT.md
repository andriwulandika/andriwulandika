# Audit Teknis Repo `andriwulandika/andriwulandika`

**Tanggal audit:** 20 Juli 2026
**Sifat sesi:** AUDIT SAJA — tidak ada kode yang diubah, tidak ada deploy. Satu-satunya berkas yang dibuat adalah dokumen ini.
**Cakupan:** dua situs dalam satu repo — `site/` → **andriwulandika.uk** (jasa website) dan `tools/` → **ai.andriwulandika.uk** (8 AI tools ASN + template + artikel).
**Untuk siapa:** pemilik (Andri Wulandika) yang bukan developer. Semua istilah teknis dijelaskan dengan bahasa awam + dampak bisnisnya.

---

## Ringkasan Eksekutif (bahasa awam)

1. **Kabar baik terpenting: tidak ada kunci rahasia (API key) yang bocor di kode.** Kekhawatiran umum bahwa "situs statis pasti membocorkan kunci Gemini di JavaScript" **tidak berlaku di sini** — semua panggilan AI sudah lewat "pintu belakang" aman (Cloudflare Pages Functions), kunci disimpan sebagai rahasia di dashboard Cloudflare.
2. Struktur repo tergolong **sehat dan mudah dirawat oleh non-developer lewat AI**: HTML statis tanpa framework rumit, aturan kerja tertulis rapi di `AGENTS.md`, dan proses build bisa diulang tanpa efek samping.
3. Backend AI sudah punya pengaman kelas menengah: pembatasan laju (rate limit), perbandingan password anti-bocor-waktu, dan validasi input — jarang ditemui pada proyek sekelas ini.
4. **Masalah hukum yang paling mendesak: belum ada halaman Kebijakan Privasi**, padahal situs mengumpulkan data (formulir + Google Analytics) dan mengirim isian ke pihak ketiga (Google/Anthropic) — ini kewajiban UU PDP No. 27/2022.
5. Empat keputusan brand: penyebutan sub-brand (Birokrat/DesaDigital/VillageStock) **sudah bersih** ✓; tetapi frasa **"Anggota aktif TAPD" masih muncul**, jabatan resmi **"Perencana Ahli Pertama · Bappeda" masih bersanding langsung dengan penawaran berbayar**, dan **layanan "Pengelolaan Media Sosial" belum ditambahkan**.
6. **Tagline kampanye baru "Punya Usaha, Harus Punya Website" belum dipakai sama sekali** — positioning situs saat ini masih "Transformasi digital untuk pemerintah & bisnis", yang kurang menyapa target UMKM.
7. Alur konversi cukup ringan (tombol WhatsApp di mana-mana), tetapi pembelian AI tools masih manual (transfer → konfirmasi WhatsApp → admin buat kode) sehingga ada jeda yang bisa membuat calon pembeli mundur.
8. Performa halaman jasa (`site/`) baik karena CSS ditanam langsung; halaman tools memuat font dari server Google (memperlambat sedikit + isu privasi), dan satu halaman (`sigendok.html`) cukup berat (152 KB).
9. Skor Lighthouse resmi **tidak bisa saya jalankan** karena akses jaringan ke domain produksi diblokir kebijakan lingkungan kerja ini (dan Google PageSpeed API menolak dengan "kuota penuh") — saya laporkan apa adanya dan menggantinya dengan penilaian performa statis.
10. Prioritas: (P0) tutup celah hukum privasi & pengerasan keamanan ringan; (P1) perbaiki pelanggaran brand + tambah layanan Media Sosial + pasang tagline baru agar bisa mulai jualan; (P2) rapikan performa & kualitas.

---

## A. Inventaris Repo (kesehatan untuk dirawat non-developer)

**Stack & versi**
- **Frontend:** HTML5 statis per halaman, **tanpa framework** (bukan React/Vue), tanpa bundler. CSS ditulis inline di tiap halaman; JavaScript memakai ES Modules asli di browser (`<script type="module">`).
- **Build authoring (bukan runtime):** Eleventy/11ty `^3.1.6` + `sharp` `^0.35.1` (hanya 2 dependency, keduanya devDependencies). 11ty hanya dipakai untuk meng-generate halaman dari `src/`, **tidak berjalan saat deploy**.
- **Backend:** Cloudflare Pages Functions (`tools/functions/`) — serverless, satu domain dengan frontend (tanpa CORS).
- **Penyimpanan:** Cloudflare KV namespace `ACCESS_CODES` (kode akses, saldo kredit, counter rate-limit).
- **AI:** demo → Google Gemini (`gemini-2.5-flash`, fallback `gemini-2.5-flash-lite`); berbayar → Anthropic Claude (`claude-sonnet-4-6`, fallback `claude-haiku-4-5`).

**Struktur folder (inti)**
```
src/{site,tools}/   → SUMBER halaman (authoring, boleh pakai include)
shared/{brand,js}/  → SUMBER TUNGGAL aset & JS bersama
site/               → yang di-deploy ke andriwulandika.uk (hasil generate, ikut di-commit)
tools/              → yang di-deploy ke ai.andriwulandika.uk
  └── functions/    → backend (_lib.js + route tipis generate/verify/admin)
scripts/            → sync-assets.sh (copy aset), build-pages.sh (jalankan 11ty)
AGENTS.md           → aturan kerja permanen untuk AI/agen
```

**Cara build & deploy**
- `npm run build` → sinkron aset dari `shared/` ke `site/` & `tools/`.
- `npm run build:pages` → jalankan 11ty lalu salin hasil menimpa `site/`/`tools/`.
- Deploy otomatis lewat integrasi GitHub–Cloudflare Pages: push ke branch = preview, merge ke `main` = produksi. **Root Directory** = `site`/`tools`, **Build Command kosong**, **Output `/`** (self-contained, anti-salah-config).
- **Tidak ada `wrangler.toml`** di repo — konfigurasi Functions/binding/secret diatur lewat dashboard Cloudflare (didokumentasikan di komentar `_lib.js` & `AGENTS.md`).

**Penilaian kesehatan:** ✅ **Sehat untuk dirawat non-developer lewat AI.** Kelebihan: dependency minimal, tanpa framework yang cepat usang, aturan kerja eksplisit di `AGENTS.md`, build idempoten & reproducible (saya verifikasi: `git status` tetap bersih setelah `npm run build:pages`), semua berkas JS lolos `node --check`. Risiko utama: ada **duplikasi wajar** antara `src/` (sumber) dan `site/`/`tools/` (hasil generate yang ikut di-commit) — kalau seseorang mengedit langsung di `tools/*.html` alih-alih di `src/tools/`, perubahan bisa tertimpa saat build berikutnya. Ini sudah diperingatkan di `AGENTS.md`, jadi risikonya terkelola selama aturan diikuti.

---

## B. Temuan Berperingkat

Setiap temuan: **apa · di mana · dampak bisnis · rekomendasi · perkiraan usaha (kecil/sedang/besar)**.

### 🔴 P0 — Kritis / Keamanan & Kepatuhan Hukum

#### P0-1 · Belum ada halaman Kebijakan Privasi (kewajiban UU PDP 27/2022)
- **Apa:** Tidak ada halaman "Kebijakan Privasi" di kedua situs. Padahal situs memasang **Google Analytics 4** (`shared/js/analytics.js`, ID `G-MHKQETVZ2R`) yang aktif otomatis tanpa persetujuan, dan formulir di 8 AI tools mengirim isian pengguna (nama OPD, nama pejabat, isi dokumen) ke pihak ketiga (Google Gemini / Anthropic).
- **Di mana:** seluruh situs; GA di `shared/js/analytics.js`; formulir di `tools/sirenja.html`, `tools/siktor.html`, `tools/sibacara.html`, `tools/sitelaah.html`, `tools/sigendok.html`, `tools/silkjip.html`, `tools/sirkpd.html`, `tools/siperda.html`.
- **Dampak bisnis:** Melanggar UU Perlindungan Data Pribadi No. 27/2022 (nama pejabat = data pribadi; GA mengumpulkan data perilaku). Risiko teguran/sanksi, dan yang lebih praktis: **menurunkan kepercayaan calon pembeli instansi/perusahaan** yang makin sadar soal ini.
- **Rekomendasi:** Buat 1 halaman `kebijakan-privasi.html` (data apa yang dikumpulkan, untuk apa, pihak ketiga mana, cara menghapus/menghubungi) dan tautkan di footer kedua situs. Tambahkan kalimat singkat di dekat formulir & tombol WhatsApp bahwa data diproses sesuai kebijakan tsb. Pertimbangkan menunda pemuatan GA sampai ada persetujuan (consent).
- **Usaha:** **Kecil–Sedang** (1 halaman + tautan footer; consent banner opsional menambah sedikit).

#### P0-2 · Tidak ada Content-Security-Policy (CSP) + render `innerHTML` tanpa sanitasi
- **Apa:** Header keamanan sudah cukup lengkap (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) **tetapi tanpa CSP**. Sementara itu banyak tool menyusun tampilan dengan `innerHTML` dan menyisipkan input pengguna tanpa di-escape (mis. `tools/sigendok.html:1527` `value="${text||''}"`). Sebagian tempat lain sudah pakai `esc(...)` (mis. `sibacara.html`), jadi penanganannya belum konsisten.
- **Di mana:** header di `site/_headers` & `tools/_headers`; pola `innerHTML` tersebar di `tools/sigendok.html` (16×), `tools/sirenja.html` (12×), `tools/siktor.html` (9×), dll.
- **Dampak bisnis:** Ini terutama **self-XSS** (pengguna hanya bisa "menyerang" browsernya sendiri karena isi dokumen tidak disimpan/dibagikan di server — KV hanya menyimpan kode akses). Risiko nyata rendah, **tetapi** tanpa CSP, satu kelalaian escaping di masa depan bisa menjadi celah sungguhan. Ditempatkan di P0 karena murah dipasang dan memperkuat postur keamanan menyeluruh.
- **Rekomendasi:** (1) Tambahkan CSP di `_headers` (mulai mode longgar: izinkan `'self'` + host yang memang dipakai: Google Fonts, Google Analytics/Tag Manager, lalu perketat). (2) Standarkan pemakaian helper `esc()` pada setiap interpolasi ke `innerHTML`, atau ganti ke `textContent` bila hanya teks.
- **Usaha:** **Sedang** (CSP kecil; menyeragamkan escaping perlu telusur per tool secara hati-hati).

> **Catatan penting (bukan temuan):** Pencarian menyeluruh di kode **dan riwayat git** tidak menemukan satu pun API key/secret yang ter-commit (pola `AIza…`, `sk-ant-…`, dll.). Satu-satunya kemunculan "AIzaSy…" adalah **contoh dokumentasi** di artikel yang mengajari pengguna membuat kunci Gemini milik mereka sendiri — bukan kunci asli. Ini menutup kekhawatiran terbesar yang biasanya melekat pada situs AI statis.

### 🟠 P1 — Menghambat Jualan (brand, konversi, kepercayaan)

#### P1-1 · Frasa "Anggota aktif TAPD" masih tampil (melanggar keputusan brand #2)
- **Apa & di mana:** `tools/index.html:859` — teks eksplisit **"Anggota aktif Tim Anggaran Pemerintah Daerah (TAPD)"**; juga `tools/index.html:856` ("…sebagai bagian dari TAPD Aceh Tenggara") dan `site/tentang.html:429` ("…keanggotaan Tim Anggaran Pemerintah Daerah (TAPD)").
- **Dampak bisnis:** Menonjolkan keanggotaan TAPD pada situs komersial bisa dianggap membawa-bawa jabatan/kewenangan anggaran untuk keperluan bisnis — berisiko konflik kepentingan & citra. Keputusan brand sudah memerintahkan menghapusnya.
- **Rekomendasi:** Hapus frasa "Anggota aktif TAPD"/"keanggotaan TAPD"; ganti dengan deskripsi pengalaman yang netral (mis. "berpengalaman dalam siklus perencanaan & penganggaran daerah") tanpa mengklaim keanggotaan aktif.
- **Usaha:** **Kecil** (edit 3 lokasi di `src/`, lalu build ulang).

#### P1-2 · Jabatan resmi bersanding langsung dengan penawaran berbayar (melanggar keputusan brand #3)
- **Apa & di mana:** "Perencana Ahli Pertama · Bappeda Aceh Tenggara" muncul sebagai kartu penulis di halaman yang **sekaligus menjual** produk berbayar: `tools/renstra-opd-panduan-lengkap.html` (baris 264/613/667, dan halaman ini memuat 4 tautan/ajakan ke `harga`/`aktifkan-pro`/berbayar), `tools/berita-acara-rapat.html:101`, serta `site/tentang.html:381` (kartu profil pada halaman yang penuh tombol "Konsultasi via WhatsApp"). Di `site/index.html:53-56` jabatan hanya ada di data terstruktur (schema, tak terlihat mata) — risikonya lebih ringan tapi sebaiknya ikut ditinjau.
- **Dampak bisnis:** Menempelkan jabatan ASN resmi langsung di sebelah ajakan membeli menimbulkan kesan memakai jabatan untuk keuntungan pribadi — sensitif secara etika ASN dan bisa merusak reputasi.
- **Rekomendasi:** Pisahkan jabatan resmi dari konteks jual-beli. Pada kartu penulis artikel & halaman produk, ganti dengan peran netral (mis. "Praktisi perencanaan daerah" / "Pengembang AI Tools Perencanaan") tanpa menyebut instansi resmi berdampingan dengan harga. Sebutan jabatan boleh tetap ada di halaman "Tentang" yang bersifat biografis, asalkan tidak menempel pada tombol beli/konsultasi berbayar.
- **Usaha:** **Sedang** (perlu telaah tiap lokasi agar pemisahan konteksnya tepat, bukan sekadar hapus kata).

#### P1-3 · Layanan "Pengelolaan Media Sosial" belum ada (melanggar keputusan brand #4)
- **Apa & di mana:** Di seluruh `site/`, media sosial hanya muncul sebagai **add-on kecil** "Koneksi ke media sosial (Rp 150rb)" (`site/index.html:771`), bukan sebagai layanan tersendiri. Tidak ada paket "Pengelolaan Media Sosial".
- **Dampak bisnis:** Kehilangan lini pendapatan berulang (bulanan) yang justru paling cocok untuk target UMKM, dan tidak sesuai keputusan brand.
- **Rekomendasi:** Tambahkan layanan "Pengelolaan Media Sosial" sebagai paket bulanan di `site/layanan-bisnis.html` dan/atau `site/index.html` (lihat rekomendasi harga di Bagian D). Sertakan cakupan jelas (jumlah konten/bulan, desain, caption, laporan).
- **Usaha:** **Sedang** (butuh section/paket baru + penetapan cakupan & harga).

#### P1-4 · Tagline kampanye baru belum dipakai di mana pun
- **Apa & di mana:** "Punya Usaha, Harus Punya Website" **tidak ditemukan** di seluruh situs. Judul utama saat ini: `site/index.html` → "Transformasi digital untuk pemerintah & bisnis"; halaman lain bernuansa serupa (korporat/pemerintah), kurang menyapa UMKM.
- **Dampak bisnis:** Positioning tidak sinkron dengan kampanye. Pesan "transformasi digital" terasa abstrak/mahal bagi UMKM; tagline baru lebih membumi dan mengundang tindakan.
- **Rekomendasi:** Pasang tagline baru sebagai hero utama di `site/index.html` (dan sapaan konsisten di `site/layanan-bisnis.html`, `site/promo.html`). Jaga agar tetap ada jalur untuk audiens instansi/pemerintah (halaman terpisah), tanpa mendominasi pesan utama untuk UMKM.
- **Usaha:** **Kecil–Sedang** (ubah hero + beberapa judul; jaga konsistensi).

#### P1-5 · Pembelian AI tools masih manual → gesekan konversi
- **Apa & di mana:** Alur beli kredit di `ai.andriwulandika.uk`: transfer manual → konfirmasi via WhatsApp → admin membuat kode lewat `tools/admin-kode.html`. Halaman `tools/harga.html` & `tools/bayar.html` mengarahkan ke proses manual ini.
- **Dampak bisnis:** Jeda antara "mau bayar" dan "dapat akses" membuat sebagian calon pembeli mundur, terutama pembelian bernilai kecil (Rp 5.000–25.000). "Belum ada pembeli Pro" bisa sebagian disebabkan gesekan ini.
- **Rekomendasi:** Jangka pendek — perjelas ekspektasi ("kode aktif dalam X menit di jam kerja") + tombol WhatsApp pra-isi pesan berisi paket yang dipilih. Jangka menengah — pertimbangkan payment link otomatis (mis. Mayar/Lynk.id/Saweria) yang bisa langsung mengaktifkan kredit tanpa langkah admin manual.
- **Usaha:** **Kecil** (perjelas copy) hingga **Besar** (otomasi pembayaran penuh).

#### P1-6 · Pengerasan endpoint sensitif (rate-limit `/verify` & brute-force admin)
- **Apa & di mana:** `handleVerify` (`tools/functions/_lib.js:305`) **tidak** dilindungi rate-limit — memungkinkan percobaan tebak kode akses tanpa batas. Ruang kode `AW-` + 8 karakter dari 32 huruf ≈ 1,1 triliun kombinasi, jadi tebakan acak praktis mustahil, tapi pembatasan tetap patut dipasang. Endpoint `/admin/*` sudah dibatasi 20 permintaan/menit/IP + perbandingan password anti-bocor-waktu, tetapi **tanpa penguncian global** (hanya per-IP).
- **Dampak bisnis:** Risiko rendah saat ini, tapi bila `ADMIN_PASSWORD` lemah, penyerang bisa mencoba dari banyak IP. Endpoint admin bisa membuat/menambah/mencabut kredit & melihat semua kode — kompromi di sini = kerugian finansial langsung.
- **Rekomendasi:** (1) Pasang rate-limit pada `/verify` (pakai helper `checkRateLimit` yang sudah ada). (2) Pastikan `ADMIN_PASSWORD` panjang & acak. (3) Pertimbangkan penguncian sementara setelah sekian kegagalan admin (lintas IP) dan/atau membatasi `/admin/*` ke daftar IP tepercaya.
- **Usaha:** **Kecil** (rate-limit `/verify` reuse fungsi yang ada; sisanya kebijakan operasional).

### 🟡 P2 — Perbaikan Kualitas & Performa

#### P2-1 · Font Google dimuat dari server eksternal (render-blocking + privasi)
- **Apa & di mana:** Halaman tools memuat font dari `fonts.googleapis.com` / `fonts.gstatic.com` (mis. `tools/sirenja.html:22-25`, `siktor.html`, `silkjip.html`, `sibacara.html`, `sirkpd.html`). Memblokir render sebentar dan mengirim IP pengunjung ke Google.
- **Dampak bisnis:** Sedikit memperlambat tampil pertama di HP + menambah pihak ketiga yang menerima data (terkait P0-1).
- **Rekomendasi:** Self-host font (unduh subset WOFF2 ke `assets/`) atau gunakan font sistem. Halaman `site/` sudah bebas font eksternal — jadikan acuan.
- **Usaha:** **Sedang** (unduh + host + ubah referensi di beberapa halaman).

#### P2-2 · Beberapa halaman/aset berat
- **Apa & di mana:** `tools/sigendok.html` = **152 KB** (jauh di atas rata-rata; banyak logika inline). Aset share `site/assets/share/*.png` berukuran 300–460 KB (mis. `wa-story.png` 460 KB) — untuk berbagi sosial, pastikan tidak ikut dimuat pada halaman utama.
- **Dampak bisnis:** Muat lebih lambat di HP/kuota terbatas — target UMKM sering pakai koneksi seluler.
- **Rekomendasi:** Pisahkan JS besar `sigendok.html` ke berkas `.js` yang bisa di-cache; kompres PNG share (atau format WebP) dan pastikan hanya dipakai sebagai `og:image`, bukan tampil di halaman.
- **Usaha:** **Sedang**.

#### P2-3 · Risiko batas gratis Cloudflare KV karena rate-limit menulis tiap request
- **Apa & di mana:** `checkRateLimit` melakukan **KV write pada setiap** permintaan `/generate` & `/verify` (`_lib.js:96`). Paket gratis Cloudflare KV = ±1.000 write/hari.
- **Dampak bisnis:** Bila total lalu lintas > ~1.000 permintaan/hari, kuota write gratis habis → fitur bisa gagal. Ini membatasi skala pada tier gratis.
- **Rekomendasi:** Untuk sekarang cukup dipantau. Bila trafik tumbuh, aktifkan Workers Paid ($5/bln, KV write jauh lebih besar) atau ganti mekanisme rate-limit ke pendekatan yang tak menulis tiap request (mis. Durable Objects / Cloudflare Rate Limiting Rules).
- **Usaha:** **Kecil** (pantau) hingga **Sedang** (ganti mekanisme).

#### P2-4 · SEO teknis: halaman jasa `jasa.html` di-redirect (noindex)
- **Apa & di mana:** `site/jasa.html` hanya me-redirect ke beranda dengan `noindex` (baris 8-9). Beberapa H1 juga terpecah oleh markup (mis. "Transformasi digital untuk**pemerintah & bisnis**" menempel). Perlu dipastikan tiap halaman punya `<h1>`, meta description, dan judul yang selaras kata kunci UMKM/website.
- **Dampak bisnis:** Peluang muncul di pencarian Google untuk kata kunci "jasa pembuatan website UMKM/desa" belum dioptimalkan.
- **Rekomendasi:** Tinjau ulang H1/meta tiap halaman `site/` agar mengandung kata kunci target; pastikan sitemap & canonical konsisten; pertimbangkan halaman terpisah ber-SEO untuk "website UMKM", "website desa", "company profile".
- **Usaha:** **Sedang**.

> **Catatan verifikasi jujur:** Skor **Lighthouse resmi tidak dapat saya sajikan**. Akses jaringan ke `andriwulandika.uk` & `ai.andriwulandika.uk` diblokir kebijakan egress lingkungan ini (proxy menjawab 403 CONNECT), dan Google PageSpeed Insights API menolak dengan HTTP 429 (kuota bersama penuh). Temuan performa di atas berbasis **analisis statis** (bobot berkas, jumlah permintaan eksternal, sumber render-blocking). Untuk angka pasti, jalankan sendiri: `npx lighthouse https://andriwulandika.uk --view` dari komputer biasa, atau buka https://pagespeed.web.dev dan tempel URL-nya.

---

## C. Audit AI Tools (bagaimana 8 tools memanggil Gemini)

**Kenyataan arsitektur (berbeda dari asumsi awal):**
- 8 tools = **SiRENJA, SiRKPD, SiKTOR, SiLKjIP, SiPerda, SiGenDok, SiBACARA, SiTelaah**.
- Semua tools memanggil AI **lewat backend sendiri** (`POST /generate`, di `apiService.js` → `tools/functions/generate.js` → `_lib.js`). **Tidak ada** satu pun panggilan langsung ke Gemini/Anthropic dari sisi klien (diverifikasi dengan pencarian `generativelanguage`/`api.anthropic` di semua HTML — nihil).
- **Demo (gratis)** → Gemini (`gemini-2.5-flash`, fallback `gemini-2.5-flash-lite`), hasil **dipotong** ±700 karakter sebagai pratinjau. **Berbayar (punya kredit)** → Anthropic Claude (`claude-sonnet-4-6`, fallback `claude-haiku-4-5`). Kredit dipotong **hanya setelah** dokumen berhasil dibuat (gagal-aman).
- **Kesimpulan penting:** Rekomendasi klasik "pindahkan pemanggilan API ke server agar kunci aman" **sudah dikerjakan**. Kunci Gemini/Claude aman di server; kuota terkendali di satu titik.

**Risiko kuota gratis Gemini:** Tier gratis Gemini punya batas permintaan/menit & /hari. Bila demo ramai, permintaan bisa kena 429 — tetapi kode sudah punya fallback antar-model, jadi degradasinya lunak (bukan mati total). Tidak ada biaya uang pada jalur demo.

**Estimasi biaya bulanan (opsi):**

| Opsi | Deskripsi | Perkiraan biaya/bulan |
|---|---|---|
| **A. Kondisi sekarang** (disarankan dipertahankan) | Cloudflare Pages + Functions (tier gratis: 100rb req Functions/hari), KV gratis, demo Gemini gratis, Claude hanya untuk pengguna berbayar | **± Rp 0** baseline. Biaya Claude bersifat variabel & seharusnya tertutup oleh harga kredit (pastikan harga kredit > biaya token per dokumen). |
| **B. Naik ke Workers Paid** (bila trafik tumbuh) | Mengatasi batas KV write (P2-3) & Functions | **± US$5 (± Rp 80rb)** + biaya Claude variabel |
| **C. Semua ke Claude (tanpa demo Gemini)** | Kualitas seragam, tapi ada biaya token bahkan untuk demo | Naik sesuai volume demo — **tidak disarankan** karena membebani biaya untuk pengunjung yang belum bayar |

**Rekomendasi:** Pertahankan Opsi A. Yang perlu dipastikan pemilik: (1) **harga 1 kredit ≥ biaya token 1 dokumen Claude** agar tidak rugi per transaksi; (2) pantau kuota gratis Gemini & batas KV write (P2-3).

---

## D. Hasil Riset Harga Pasar (Indonesia, 2025–2026)

Angka di bawah adalah kisaran pasar dari sumber publik; dipakai untuk menakar posisi harga yang "tidak memberatkan pembeli tapi tetap layak bisnis".

### D-1. Jasa pembuatan website (UMKM / company profile / desa)
- Paket dasar UMKM / 1 halaman: sekitar **Rp 1,5–3 juta** (ada yang mulai Rp 200rb–900rb untuk template sederhana).
- Company profile 5–10 halaman: **Rp 3–15 juta** (menengah **Rp 4–7 juta**).
- Website desa: umumnya **Rp 1–10 juta**; paket profesional **Rp 2,5–5 juta/tahun**; paket hemat Rp 200rb–500rb (template).

Sumber: [Iniwebsitemu — Panduan Harga 2025](https://iniwebsitemu.com/artikel/biaya-pembuatan-website-indonesia-2025-panduan-harga-lengkap) · [Tonjoo — Biaya Pembuatan Website](https://tonjoo.com/id/biaya-pembuatan-website/) · [ResolusiWeb — mulai Rp 900rb](https://resolusiweb.com/jasa-pembuatan-website-company-profile) · [DesaGo — Biaya Website Desa](https://www.desago.id/blog/detail/63/biaya-pembuatan-website-desa) · [Fastwork — Website Desa](https://fastwork.id/web-development/village)

**Posisi harga situs saat ini:** Landing Page **Rp 750rb**, Website Profil **Rp 2 juta**, Instansi/OPD **Rp 3,5 juta**. → **Kompetitif, cenderung di sisi terjangkau** dibanding pasar. Aman untuk menarik UMKM; ada ruang menaikkan paket Profil ke Rp 2,5–3 juta bila permintaan bagus, atau menambah paket "UMKM" khusus di bawah Landing Page bila ingin titik masuk lebih murah.

### D-2. Pengelolaan media sosial (paket bulanan)
- Entry/UMKM (freelancer, 8–12 konten/bln, dari aset brand): mulai **± Rp 450rb–1 juta/bln**.
- Menengah (20 konten + desain + copywriting + balas komentar + laporan): **± Rp 2–3 juta/bln**.
- Premium/agency (optimasi penuh): **Rp 10–25 juta+/bln**.

Sumber: [Fastwork — Social Media Management](https://fastwork.id/social-media-management) · [ResolusiWeb — mulai Rp 450rb](https://resolusiweb.com/jasa-pengelolaan-media-sosial) · [Beruang Digital — Harga SMM](https://beruangdigital.id/harga-social-media-marketing/) · [Sagara Ruang — Paket 2026](https://www.sagararuang.com/blog/harga-social-media-management-paket-agency-2026) · [Cycent — Harga SMM](https://www.cycent.co.id/harga-jasa-social-media-management/)

**Rekomendasi harga awal (untuk layanan baru P1-3):**
- **Paket UMKM Mulai:** ± **Rp 500rb–750rb/bln** (8–10 konten feed, caption, desain sederhana, laporan bulanan) — titik masuk ringan.
- **Paket Bertumbuh:** ± **Rp 1,2–1,8 juta/bln** (15–20 konten, story/reels, balas komentar, kalender konten).
- Posisikan di sisi terjangkau agar UMKM berani mencoba, dengan opsi upsell ke paket bertumbuh.

### D-3. Produk digital / template untuk ASN
- Riset spesifik "template dokumen perencanaan ASN" **tidak menghasilkan daftar harga publik** yang jelas (kebanyakan hasil adalah dokumen pemerintah, bukan produk jual). Sebagai pembanding, produk digital (ebook/template Excel-Word) di platform lokal seperti **Lynk.id/Karyakarsa** umumnya dijual **Rp 15rb–150rb** per item, dengan penjual bebas menetapkan harga.

Sumber: [Lynk.id — jual produk digital](https://lynk.id/) · [Panduan jual ebook Lynk.id (Bank Mega)](https://blog.bankmega.com/cara-menjual-ebook-di-lynk-id-untuk-pemula/) · [Digima — Panduan Lynk.id](https://digima.co.id/panduan-lengkap-menggunakan-lynk-id-untuk-jual-ebook/) · [SmartASNPlus — RKPD/Renja](http://smartasn.co.id/index.php/Detail/rkpd_renja)

**Posisi harga tools saat ini:** paket kredit **Rp 5rb / 25rb / 100rb / 175rb / 300rb** (+ demo Rp 0). → **Sudah sangat terjangkau & sesuai pola pasar produk digital ASN.** Rentang ini masuk akal. Karena "belum ada pembeli Pro", masalahnya lebih besar kemungkinan pada **gesekan pembayaran manual (P1-5)** dan **kepercayaan/positioning**, bukan pada angka harganya.

*(Keterbatasan riset: pencarian web ini US-based; harga lokal spesifik ASN kurang terindeks. Angka di atas adalah kisaran indikatif — validasi dengan 2–3 pesaing langsung sebelum menetapkan final.)*

---

## E. Usulan Urutan Pengerjaan (Roadmap)

Diurutkan agar **cepat bisa jualan** sambil menutup risiko hukum/keamanan lebih dulu. Semua ini adalah rekomendasi — **belum dikerjakan** di sesi audit ini.

**Tahap 1 — Amankan & patuh hukum (minggu ini, usaha kecil):**
1. P0-1 Buat halaman Kebijakan Privasi + tautan footer (tutup kewajiban UU PDP).
2. P1-6 Pasang rate-limit di `/verify`; pastikan `ADMIN_PASSWORD` kuat.
3. P0-2 Tambahkan CSP dasar di `_headers`.

**Tahap 2 — Selaraskan brand agar siap kampanye (minggu ini–depan, kecil–sedang):**
4. P1-1 Hapus semua "Anggota aktif TAPD".
5. P1-2 Pisahkan jabatan resmi dari penawaran berbayar.
6. P1-4 Pasang tagline "Punya Usaha, Harus Punya Website" sebagai hero.

**Tahap 3 — Buka lini pendapatan & lancarkan konversi (2–4 minggu, sedang):**
7. P1-3 Tambahkan layanan "Pengelolaan Media Sosial" (paket + harga sesuai Bagian D-2).
8. P1-5 Perjelas alur beli AI tools; rencanakan payment link otomatis.

**Tahap 4 — Kualitas, performa & SEO (berkelanjutan, sedang):**
9. P2-1 Self-host font di halaman tools.
10. P2-4 Rapikan H1/meta/SEO halaman `site/` untuk kata kunci UMKM/desa.
11. P2-2 Ringankan `sigendok.html` & kompres aset share.
12. P2-3 Pantau kuota KV/Gemini; siapkan Workers Paid bila trafik tumbuh.

---

*Disusun sebagai audit-only. Tidak ada perubahan kode, tidak ada commit ke `main`, tidak ada deploy. Angka Lighthouse tidak disertakan karena keterbatasan akses jaringan yang dilaporkan jujur di Bagian B (P2).*
