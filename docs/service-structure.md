# AndriWulandika.uk — Struktur Layanan (Source of Truth)

> Dokumen ini adalah **acuan tunggal** struktur layanan yang tercermin di
> website (`site/index.html` + `site/layanan.html`). Perbarui dokumen ini
> setiap kali struktur/harga layanan berubah, lalu selaraskan website.
>
> Terakhir diperbarui: 2026-07-17

## Positioning

**AndriWulandika.uk = Layanan Digital Bertenaga AI.**
Dikerjakan dengan bantuan AI generatif, **direview & di-QC oleh manusia (Andri)**
sebelum diserahkan. Target klien: **UMKM, kontraktor, konsultan, organisasi,
dan profesional** — bukan korporat besar.

- Model kerja: 80–100% draf dikerjakan Claude AI; Andri sebagai reviewer/QC/business dev.
- **Prompt engineering** = kemampuan internal yang melekat di semua layanan,
  BUKAN layanan standalone di halaman depan.
- Harga: skema **"Mulai dari"** kecuali paket website entry-level (harga tetap)
  dan Social Media Management (langganan bulanan).

## Arsitektur Halaman

- `site/index.html` — hub. Hero → Trust bar → `#layanan` (6 kartu: 5 kategori +
  "kebutuhan lain") → "Cara kami bekerja" (AI + human QC) → Portfolio →
  `#paket` (Harga) → Proses → Add-on website → FAQ → `#kontak` (Final CTA) → Footer.
- `site/layanan.html` — halaman detail 5 kategori + sub-layanan + CTA WA per sub-layanan.
  Anchor: `#dokumen`, `#konten`, `#riset`, `#knowledge`, `#automation`, `#kontak`.
- `site/tentang.html` — profil personal Andri (dipertahankan).
- `site/promo.html` — landing WA-share mobile lama (**masih bertema "Jasa Pembuatan
  Website" — belum diselaraskan, fase 2**).

## 5 Kategori Layanan

### 1. Corporate & Government Documents → `layanan.html#dokumen`
- **Dokumen Bisnis** — Proposal, Company Profile, Business Plan, SOP. Mulai Rp 150rb/dokumen.
- **Surat & Laporan Resmi** — surat resmi, laporan kegiatan/pertanggungjawaban,
  notulen, berita acara, template. Mulai Rp 100rb/dokumen.

> **Batas kepatuhan (WAJIB dijaga):** layanan dokumen ditujukan untuk
> **UMKM / organisasi / komunitas / swasta / profesional**. Semua output adalah
> **draf & bahan referensi milik + tanggung jawab klien**. **BUKAN kontraktor
> resmi pemerintah**; tidak mengambil pengadaan/kontrak instansi. Dokumen
> pemerintah spesifik (RPJMD/Renstra/SAKIP dll) **tidak ditonjolkan** di halaman
> publik. Alasan: Andri berstatus ASN (Perencana Ahli Pertama, Bappeda Aceh
> Tenggara) → hindari benturan kepentingan & belum ada legalitas usaha.

### 2. Digital Content & Marketing → `layanan.html#konten`
- **Content Creation** — artikel/blog SEO, copywriting, materi presentasi. Mulai Rp 50rb/artikel.
- **Social Media Management** — FB & IG: planning, caption, brief desain,
  scheduling, laporan bulanan. **Langganan mulai Rp 750rb/bulan** (tanpa kontrak jangka panjang).
- **Website Development & Copywriting** — landing page, company profile website,
  halaman layanan/produk, blog, FAQ, SEO. Mulai Rp 750rb.

### 3. Research & Analytics → `layanan.html#riset`
- **Market Research** — riset pasar. Mulai Rp 500rb/proyek.
- **Competitive Intelligence** — analisis kompetitor. Mulai Rp 500rb/proyek.
- **Data Visualization & Dashboard** — visualisasi data, dashboard, laporan berkala. Mulai Rp 500rb/proyek.

### 4. Knowledge Management → `layanan.html#knowledge`
- **Knowledge Base Setup** — Mulai Rp 500rb.
- **Training Documentation** — modul/onboarding. Mulai Rp 300rb.
- **Digitalisasi SOP** — Mulai Rp 300rb.

### 5. AI Integration & Automation → `layanan.html#automation`
- **Workflow Automation** — n8n / Make / Zapier. Mulai Rp 500rb/alur kerja.
- **WhatsApp & Email Automation** — Mulai Rp 500rb.
- **Digital Transformation Roadmap** — Mulai Rp 750rb.
- Studi kasus live: **ai.andriwulandika.uk** (platform AI tools + sistem kredit),
  ditampilkan sebagai bukti kapabilitas (bukan lagi ditonjolkan sebagai produk
  sibling di hero).

## Paket Website (harga tetap) — `index.html#paket`
| Paket | Harga | Ringkas |
|---|---|---|
| Landing Page | Rp 750rb | 1 halaman, selesai 3–5 hari |
| Website Profil | Rp 2 juta | 5–7 halaman (paling populer) |
| Website Organisasi | Rp 3,5 juta | 10+ halaman (organisasi/komunitas/sekolah — **framing non-pemerintah**) |

Add-on website: domain & email, maintenance tahunan, Google Bisnisku, optimasi SEO.

## Aturan Brand
- Warna & token: `--dark #0a0a0f`, `--accent #3b82f6`, `--accent2 #6366f1`,
  gradient biru→indigo, WA green `#25D366`. Font sistem. Logo "Spark" di `site/assets/brand/`.
- Restrukturisasi ini = konten & navigasi, **bukan redesign visual**.
- Semua CTA konversi = WhatsApp `wa.me/62811660568` dengan teks prefilled per konteks.

## Klaim yang DILARANG
- Menjanjikan posisi/halaman 1 Google.
- Mengesankan sebagai kontraktor/konsultan resmi pemerintah.
- Klaim "AI ajaib" tanpa menyebut review manusia — selalu: *"dikerjakan AI, direview manusia"*.
