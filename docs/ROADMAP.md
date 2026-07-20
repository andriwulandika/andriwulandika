# ROADMAP
**Proyek:** andriwulandika.uk — Digital Headquarters
**Versi:** 1.0 · **Tanggal:** 20 Juli 2026 · **Status:** Menunggu persetujuan
**Lokasi kanonik:** `/docs/ROADMAP.md` · **Dasar:** `docs/audit/REPO-AUDIT.md` (20 Jul 2026)

**Sasaran roadmap:** situs siap jualan (legal, brand selaras, konversi lancar) dalam ±4 minggu kerja santai. Kode temuan (P0-1 dst.) merujuk ke dokumen audit.

---

## Sprint 1 — Patuh Hukum & Amankan (target: minggu ini) 🔴
*Semua usaha KECIL. Satu sesi Claude Code bisa menyelesaikan semuanya.*

| # | Pekerjaan | Temuan | Persetujuan Andri |
|---|---|---|---|
| 1.1 | Halaman `kebijakan-privasi.html` + tautan footer kedua situs + kalimat singkat di dekat form | P0-1 | Review isi halaman sebelum deploy |
| 1.2 | Rate-limit endpoint `/verify` (pakai helper yang sudah ada) | P1-6 | — |
| 1.3 | Ganti `ADMIN_PASSWORD` ke password panjang & acak (di dashboard Cloudflare) | P1-6 | Andri yang mengganti (dipandu) |
| 1.4 | CSP dasar di `_headers` kedua situs | P0-2 | — |

**Selesai bila:** kebijakan privasi tayang, `/verify` ber-rate-limit, CSP aktif tanpa merusak halaman.

## Sprint 2 — Selaraskan Brand (target: minggu ini–depan) 🟠

| # | Pekerjaan | Temuan | Persetujuan Andri |
|---|---|---|---|
| 2.1 | Hapus semua "Anggota aktif TAPD" (3 lokasi), ganti frasa netral | P1-1 | — (keputusan sudah dibuat) |
| 2.2 | Pisahkan "Perencana Ahli Pertama · Bappeda" dari semua konteks berbayar; peran netral di kartu penulis | P1-2 | Review hasil sebelum deploy |
| 2.3 | Hero baru: **"Punya Usaha, Harus Punya Website"** di `site/index.html` + konsistensi di layanan-bisnis & promo; jalur audiens pemerintah tetap ada | P1-4 | Review copy hero |
| 2.4 | Perbaiki H1 terpecah + meta description halaman utama (bagian ringan dari P2-4) | P2-4 | — |

**Selesai bila:** pencarian "TAPD" di repo = 0 hasil; tagline tayang di hero; tidak ada jabatan resmi menempel pada tombol beli.

## Sprint 3 — Buka Pendapatan & Lancarkan Konversi (target: minggu 3–4) 🟠

| # | Pekerjaan | Temuan | Persetujuan Andri |
|---|---|---|---|
| 3.1 | **KEPUTUSAN HARGA (blocker sprint ini):** paket Pengelolaan Media Sosial. Rekomendasi audit: **UMKM Mulai Rp 500–750rb/bln** (8–10 konten+caption+desain+laporan), **Bertumbuh Rp 1,2–1,8 jt/bln** (15–20 konten+reels+balas komentar+kalender) | D-2 | **Wajib — pilih angka** |
| 3.2 | Bangun section/paket "Pengelolaan Media Sosial" di situs | P1-3 | Review sebelum deploy |
| 3.3 | Kurangi gesekan beli AI tools: ekspektasi waktu aktivasi + tombol WA pra-isi paket terpilih | P1-5 | — |
| 3.4 | Evaluasi payment link otomatis (Mayar / Lynk.id) → disusun sebagai ADR + rekomendasi | P1-5 | Wajib (pengeluaran & alur uang) |

**Selesai bila:** layanan medsos bisa dipesan; alur beli kredit punya ekspektasi jelas; keputusan payment link terdokumentasi.

**Catatan pricing lain (keputusan sudah cukup data, tinggal konfirmasi Andri):** harga website & paket kredit AI tools **dipertahankan** (audit menilai kompetitif); opsi naikkan paket Profil ke Rp 2,5–3 jt ditunda sampai ada permintaan nyata.

## Sprint 4 — Kualitas & SEO (berkelanjutan, setelah Sprint 1–3) 🟡

| # | Pekerjaan | Temuan |
|---|---|---|
| 4.1 | Self-host font halaman tools | P2-1 |
| 4.2 | Halaman SEO terpisah: "website UMKM", "website desa", "company profile" | P2-4 |
| 4.3 | Ringankan `sigendok.html` (pisah JS) + kompres aset share ke WebP | P2-2 |
| 4.4 | Pantau kuota KV & Gemini; Workers Paid ($5/bln) hanya bila trafik menuntut | P2-3 |
| 4.5 | Jalankan Lighthouse dari komputer Andri (`pagespeed.web.dev`) sebagai baseline angka resmi | — |

## Di Luar Roadmap (keputusan tercatat)
- Sub-brand Birokrat/DesaDigital/VillageStock: ide masa depan, tidak dikerjakan.
- Arsitektur AI tools **dipertahankan** (Opsi A audit, ± Rp 0/bln): backend sudah aman, demo Gemini gratis, berbayar via Claude. Yang dipantau: harga 1 kredit ≥ biaya token 1 dokumen.
- GA4 sudah terpasang (`G-MHKQETVZ2R`) — koreksi atas KB v1.1 §3.3; Cloudflare Web Analytics tidak lagi diperlukan. Andri perlu dipandu cara membuka dashboard GA4 (masuk Sprint 3/4).

## Aturan Eksekusi (Fase 7)
1. Satu sprint = satu/beberapa sesi Claude Code; setiap sesi diakhiri commit + update ROADMAP (centang selesai).
2. Push ke branch = preview dulu; **merge ke `main` (produksi) hanya setelah Andri melihat preview dan menyetujui** — sesuai AI-GOVERNANCE §1 & §3.
3. Edit selalu di `src/`, tidak pernah langsung di `site/`/`tools/` (aturan `AGENTS.md` repo).
4. Model: Sonnet 4.6 untuk Sprint 1–2 & 4 (spesifikasi sudah jelas); Fable 5/Opus untuk ADR payment (3.4).

## Fakta Baru untuk KB v1.2 (dari audit — dicatat agar tidak hilang)
Repo tunggal `andriwulandika/andriwulandika` (folder `site/` & `tools/`); build 11ty dari `src/`; hosting Cloudflare Pages + Functions + KV; backend AI aman (demo Gemini 2.5 Flash, berbayar Claude Sonnet 4.6); kredit Rp 5rb–300rb; pembayaran manual via WA; GA4 terpasang; `AGENTS.md` = aturan kerja repo.

## Riwayat Revisi
| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 2026-07-20 | Disusun dari REPO-AUDIT.md |
