# AGENTS.md

Panduan permanen untuk Claude Code (dan agen AI lain) saat bekerja pada
repository ini. Baca berkas ini sebelum melakukan perubahan. Jika sebuah aturan
di sini bertentangan dengan instruksi manusia yang eksplisit, instruksi manusia
menang.

---

## 1. Identitas Proyek

- **Nama:** `andriwulandika/andriwulandika`
- **Pemilik:** Andri Wulandika (Perencana Ahli Pertama).
- **Dua situs dalam satu repo**, masing-masing menjadi proyek Cloudflare Pages terpisah:
  - `site/` → **andriwulandika.uk** — landing jasa pembuatan website.
  - `tools/` → **ai.andriwulandika.uk** — kumpulan AI tools untuk dokumen perencanaan daerah (SiRENJA, SiRKPD, SiKTOR, SiLKjIP, SiPerda, SiGenDok, SiBACARA, SiTelaah) + artikel panduan + template dokumen.

## 2. Tujuan Proyek

- **site/**: memasarkan jasa pembuatan website (bisnis, instansi/OPD, landing page).
- **tools/**: menyediakan AI Writer + template + regulasi untuk dokumen perencanaan
  pemerintah daerah, dengan model **pay-as-you-go** (kredit) dan mode **demo** gratis.
- Prioritas produk: cepat dimuat, SEO-ready, biaya operasional rendah (hosting statis + serverless).

## 3. Arsitektur Aplikasi

- **Frontend:** HTML statis per halaman. **Tanpa framework** (bukan React/Vue/dll),
  tanpa bundler. CSS ditulis inline per halaman atau via stylesheet bersama
  (`tools/assets/css/`). JavaScript memakai **ES Modules** asli yang dimuat langsung
  di browser (`<script type="module">`), plus beberapa skrip klasik.
- **Backend:** **Cloudflare Pages Functions** di `tools/functions/`. Karena satu
  domain dengan frontend, dipanggil lewat path relatif (`/generate`, `/verify`,
  `/admin/*`) — tanpa CORS.
  - `_lib.js` memusatkan seluruh logika (proxy AI, sistem kredit/dompet, admin, rate-limit).
  - Setiap route (`generate.js`, `verify.js`, `admin/*.js`) hanya pembungkus tipis.
- **AI:** demo → **Google Gemini**; berbayar → **Anthropic Claude**. Ada fallback antar-model saat kuota (HTTP 429).
- **State/penyimpanan:** **Cloudflare KV** namespace `ACCESS_CODES` menyimpan kode akses,
  saldo kredit, dan counter rate-limit.
- **Pembayaran:** manual (transfer + konfirmasi WhatsApp); kode akses dibuat lewat panel admin. Tidak ada payment gateway.
- **Aset bersama:** `shared/` adalah sumber tunggal untuk brand & JS bersama; disalin ke
  `site/assets/` dan `tools/assets/` saat build oleh `scripts/sync-assets.sh`.

## 4. Struktur Folder

```
/
├── package.json            # scripts.build → scripts/sync-assets.sh; devDep: sharp
├── package-lock.json
├── AGENTS.md               # berkas ini
├── scripts/
│   └── sync-assets.sh      # copy shared/ → site/assets/ & tools/assets/ (+ root icons)
├── shared/                 # SUMBER TUNGGAL aset bersama
│   ├── brand/              # logo, favicon, wallpaper (dipakai kedua situs)
│   └── js/                 # analytics, apiService, nav-auth, ui-enhance
├── site/                   # → andriwulandika.uk (output dir Cloudflare = "site")
│   ├── *.html, _headers, _redirects, sitemap.xml, robots.txt
│   └── assets/{brand,js,share}/     # brand/js diisi oleh build (sync)
└── tools/                  # → ai.andriwulandika.uk (output dir Cloudflare = "tools")
    ├── *.html, _headers, _redirects, sitemap.xml, robots.txt
    ├── functions/          # Cloudflare Pages Functions (backend)
    │   ├── _lib.js, generate.js, verify.js
    │   └── admin/{generate,list,revoke,topup}.js
    └── assets/
        ├── brand/, js/     # diisi oleh build (sync dari shared/)
        ├── css/            # stylesheet bersama (mis. article.css)
        ├── data/nomenklatur/   # 60+ JSON referensi program/kegiatan
        └── templates/          # .doc/.xls + contoh HTML
```

Catatan: `site/assets/brand`, `site/assets/js`, `tools/assets/brand`, `tools/assets/js`,
serta `*/apple-touch-icon.png` dan `*/favicon.ico` adalah **build output**. Untuk
`tools/` file-file ini **tidak di-commit** (di-generate saat build). Untuk `site/`
salinannya masih di-commit sebagai fallback.

## 5. Coding Standards

- Vanilla HTML5, CSS, dan JavaScript. Jangan memperkenalkan framework/bundler tanpa persetujuan manusia.
- JavaScript: ES Modules, `import`/`export`. Jaga agar tetap berjalan langsung di browser tanpa transpile.
- Path aset: gunakan path relatif konsisten (`assets/...`) agar resolve benar di kedua domain.
- Bahasa: komentar & teks UI dalam **Bahasa Indonesia** (ikuti gaya berkas yang ada).
- Tulis kode yang seragam dengan sekitarnya (penamaan, kepadatan komentar, idiom).
- Backend: jaga pola "logika di `_lib.js`, route sebagai pembungkus tipis".
- Jangan menambah dependency runtime; situs harus tetap statis.

## 6. Git Workflow

- Kembangkan di branch kerja aktif (lihat §7). Jangan commit/push ke `main` langsung.
- Commit hanya saat diminta atau saat langkah kerja selesai; jaga working tree bersih
  dari build output sebelum commit (`git clean -fd` pada file yang di-generate `tools/`).
- Untuk push: `git push -u origin <branch>`. Jika gagal karena jaringan, retry dengan
  backoff (2s, 4s, 8s, 16s).
- Fetch/pull spesifik branch (`git fetch origin <branch>`).

## 7. Branch Strategy

- Branch default: `main` (memicu deploy produksi Cloudflare Pages).
- Branch kerja saat ini: `claude/audit-andriwulandika-uk-8thync`.
- **PR yang sudah merged tidak boleh dipakai ulang.** Jika PR branch kerja sudah
  di-merge, mulai pekerjaan lanjutan sebagai perubahan baru: restart branch dari
  `origin/main` terbaru (nama branch sama) dan push di sana —
  `git fetch origin main && git checkout -B <branch> origin/main`. Jangan menumpuk
  commit baru di atas history yang sudah ter-merge.

## 8. Build, Lint, Test & Deployment

- **Build:** `npm run build` → menjalankan `scripts/sync-assets.sh` (murni bash+cp,
  tanpa `node_modules`). Idempoten & reproducible.
- **Lint/Test:** belum ada framework lint/test di repo. Pengganti minimal sebelum commit:
  `node --check` untuk berkas JS, dan cek keseimbangan tag HTML untuk halaman yang diubah.
  Jangan menambah tooling lint/test baru tanpa persetujuan.
- **Deployment:** otomatis via integrasi GitHub–Cloudflare Pages. Push ke branch =
  preview deployment; merge ke `main` = production deployment.
- **Konfigurasi Cloudflare Pages (WAJIB benar, sumber bug umum):**
  - Proyek `andriwulandika-tools` (ai.andriwulandika.uk):
    **Root Directory `/`**, **Build Command `npm run build`**, **Build Output Directory `tools`**.
    Root harus `/` agar build menjangkau `package.json` dan `shared/`.
  - Proyek `andriwulandika` (andriwulandika.uk): Output Directory `site` (build command
    boleh `npm run build` juga agar aset tersinkron).
- Setelah build gagal, Cloudflare umumnya tidak men-deploy versi baru. Jika halaman/aset
  404 di produksi, curigai konfigurasi Root/Build/Output ini lebih dulu.

## 9. Aturan Refactoring

- Refactor mekanis, bukan redesign: pertahankan perilaku & tampilan (no visual change).
- Kerjakan bertahap per batch, verifikasi tiap batch sebelum lanjut.
- Deduplikasi lewat `shared/` + `sync-assets.sh`, bukan menyalin manual.
- Ekstraksi CSS/komponen hanya jika benar-benar identik/mirip; jangan memaksakan
  unifikasi yang menuntut penulisan ulang semantik.
- Jangan memperluas scope di luar yang diminta. Jangan refactor besar tanpa persetujuan.

## 10. Aturan Debugging

- Reproduksi dulu, baru perbaiki. Untuk isu produksi, minta kode/tampilan error persis
  bila lingkungan tidak bisa menjangkau situs (egress dibatasi).
- Jangan menonaktifkan verifikasi TLS atau unset `HTTPS_PROXY`. 403/407 dari proxy =
  kebijakan egress; laporkan host yang diblokir, jangan di-route around.
- Perbaikan minimal & tertarget; hindari perubahan spekulatif.
- Laporkan hasil apa adanya: bila gagal/terbatas, sampaikan; jangan mengklaim verifikasi
  yang tidak benar-benar dilakukan.

## 11. Aturan Dependency

- Dependency seminimal mungkin. Saat ini hanya `sharp` (devDependency, pemrosesan gambar ad-hoc).
- Tanpa dependency runtime; situs & build harus tetap berjalan tanpa `node_modules` di produksi.
- Sebelum menambah paket: pastikan benar-benar perlu, dan jaga `package-lock.json` konsisten.

## 12. Aturan Keamanan

- **Secret tidak pernah di-commit.** Disimpan sebagai Secret di dashboard Cloudflare:
  `GEMINI_API_KEY`, `CLAUDE_API_KEY`, `ADMIN_PASSWORD`; binding KV `ACCESS_CODES`.
- Jangan menaruh kunci/secret di HTML, JS klien, komentar, atau pesan commit/PR.
- Validasi & sanitasi input di backend (panjang prompt, clamp temperature/maxTokens).
- Endpoint admin harus terlindungi; utamakan perbandingan password constant-time dan
  rate-limit pada `/admin/*` (lihat rencana pengerasan keamanan).
- Kredit hanya dipotong setelah panggilan AI sukses (gagal-aman).

## 13. Aturan Commit (Conventional Commits)

- Format: `type(scope): deskripsi singkat` — deskripsi dalam Bahasa Indonesia.
- `type` yang dipakai repo: `feat`, `fix`, `refactor`, `chore`, `perf`, `docs`.
- `scope` opsional sesuai area: `site`, `tools`, `ui`, `brand`, `anim`, `template`, dll.
- Contoh: `refactor(phase3): extract shared CSS for the 7 identical article pages`.
- Satu commit = satu perubahan logis. Jaga pesan jelas & spesifik.
- Agen menambahkan trailer `Co-Authored-By` sesuai konfigurasi harness; jangan menyertakan
  identitas model apa pun di artefak repo.

## 14. Aturan Pull Request

- Setelah push, buat PR **draft** ke `main` bila belum ada PR terbuka untuk branch itu.
- Ikuti template PR bila ada (`.github/pull_request_template.md`); jika tidak ada, tulis
  ringkasan perubahan + rencana uji. Jangan menyertakan secret/hostname internal.
- Sebutkan syarat deploy bila relevan (mis. konfigurasi Cloudflare) di badan PR.
- Berhemat berkomentar di GitHub; komentari hanya bila perlu.

## 15. Definition of Done

Sebuah pekerjaan dianggap selesai jika:
1. Perubahan sesuai scope yang diminta, tanpa perubahan liar.
2. `npm run build` sukses (exit 0) dan reproducible.
3. Berkas JS lolos `node --check`; halaman HTML yang diubah tetap valid/seimbang.
4. Tidak ada broken link / missing asset baru (cek statis referensi `src`/`href`).
5. Tidak ada file sementara/build-output yang ikut ter-commit.
6. Commit memakai Conventional Commits dan sudah di-push ke branch kerja.
7. PR draft dibuat/diperbarui bila diperlukan.
8. Ringkasan hasil disampaikan; keterbatasan verifikasi dinyatakan jujur.

## 16. Prioritas Pekerjaan

1. Keamanan (secret, endpoint admin, validasi input).
2. Perbaikan produksi yang rusak (build/deploy/akses situs).
3. Korektnes fungsional (fitur AI, kredit, navigasi).
4. Deduplikasi & konsistensi (shared assets, CSS, komponen).
5. Performa (ukuran halaman, gambar, caching).
6. Kerapian/kosmetik.

## 17. Yang Boleh Diputuskan Sendiri oleh Claude Code

- Perbaikan mekanis berisiko rendah dalam scope yang sudah disetujui (ekstraksi CSS,
  dedup aset, perbaikan path, pembersihan build output).
- Pemilihan urutan langkah, penamaan berkas/branch sesuai konvensi yang ada.
- Verifikasi statis/lokal (build, `node --check`, cek link/asset).
- Membuat PR **draft** dan menulis pesan commit/PR.
- Memilih opsi default yang wajar ketika ambiguitas kecil dan mudah dibalik.

## 18. Yang Wajib Menunggu Keputusan Manusia

- Push ke `main` / merge PR ke produksi.
- Deploy produksi atau perubahan konfigurasi Cloudflare/DNS.
- Menambah/mengganti dependency, framework, atau build tooling.
- Refactor besar / perubahan arsitektur / perubahan model data KV.
- Perubahan pada backend `functions/` yang menyentuh alur pembayaran, kredit, atau admin.
- Menambah fitur baru atau mengubah perilaku/tampilan yang terlihat pengguna.
- Tindakan sulit dibalik atau menyentuh sistem live/outward-facing.

## 19. Cara Bekerja Autonomous Hingga Selesai

- Untuk pekerjaan yang sudah disetujui: kerjakan berurutan sampai tuntas tanpa menunggu
  konfirmasi per langkah kecil.
- Jika sebuah tahap gagal, hentikan tahap berikutnya, perbaiki hingga beres, lalu lanjut.
- Verifikasi tiap perubahan (build/statis) sebelum menandai selesai.
- Berhenti dan bertanya hanya saat menemui keputusan pada §18 atau ambiguitas yang
  mengubah arah pekerjaan secara berarti.
- Di akhir, berikan ringkasan padat: status, file/commit/branch, dan risiko tersisa.

## 20. Aturan Efisiensi Token

- Jangan membuat dokumentasi, README, atau berkas penjelasan baru kecuali diminta.
- Jangan menarasikan opsi yang tidak akan dikerjakan atau mengulang fakta yang sudah pasti.
- Ringkasan singkat dan langsung; hindari basa-basi dan pengulangan.
- Baca hanya bagian berkas yang relevan; jangan membaca ulang berkas yang baru saja diedit
  hanya untuk verifikasi.
- Jalankan tool independen secara paralel bila memungkinkan.
- Bila tugas menyebut format ringkasan tertentu, ikuti format itu apa adanya.
