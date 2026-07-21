# KNOWLEDGE BASE — andriwulandika.uk

**Versi:** 1.4
**Tanggal:** 21 Juli 2026
**Status:** Rujukan internal.

> **Catatan status file (21 Jul 2026):** ini adalah versi pertama Knowledge Base
> yang benar-benar **di-commit ke repo**. Master lengkap sebelumnya (yang dirujuk
> di beberapa dokumen sebagai `KNOWLEDGE-BASE-v1.1.md`, mis. §2) berada di luar
> repo dan belum dipindahkan. Sampai isi lengkap dipindahkan, file ini baru
> memuat bagian yang sudah final & disetujui. Nomor bagian (mis. §6) mengikuti
> penomoran master agar rujukan lama tetap konsisten.

---

## Riwayat Revisi

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| ≤ 1.1 | — | Master di luar repo (belum di-commit). |
| 1.2 | 21 Jul 2026 | Harga jasa website ditetapkan berdasarkan riset pasar (lihat §6). Versi pertama yang di-commit ke repo. |
| 1.3 | 21 Jul 2026 | Ditambahkan harga transisi Fase 0 (live) terpisah dari harga target; harga website live diselaraskan ke harga transisi; paket Pengelolaan Media Sosial ditetapkan sebagai lini resmi (aktif). |
| 1.4 | 21 Jul 2026 | Ditambahkan §6c — DRAFT opsi paket kredit AI Tools berbasis biaya API per dokumen (status: diriset, belum final; menunggu keputusan Andri). Tidak ada perubahan kode/harga live. |

---

## 6. Model Bisnis

### 6a. Harga Jasa Website

Dua tingkat: **harga transisi Fase 0** yang tampil di situs sekarang (sengaja
lebih rendah untuk mempercepat 2 klien berbayar pertama), dan **harga target**
hasil riset pasar yang menjadi tujuan setelah validasi.

**Harga transisi Fase 0 (LIVE saat ini — diselaraskan 21 Jul 2026):**

| Paket | Harga transisi (live) | Catatan |
|---|---|---|
| Landing Page / Personal Branding | Rp 1.200.000 | 1 halaman, bayar sekali |
| Company Profile / Website Profil | Rp 3.000.000 | 5–7 halaman, custom |
| Website Instansi / OPD / Desa | mulai Rp 2.500.000 | Harga disesuaikan scope; "mulai dari" |

**Pemicu naik ke harga target:** setelah **2 klien berbayar pertama selesai**
(delivered), harga dinaikkan bertahap menuju tabel target di bawah. Keputusan
menaikkan tetap di tangan Andri.

**Harga target (hasil riset pasar — belum tampil di situs):**

| Paket | Rentang Harga | Catatan |
|---|---|---|
| Landing Page / Personal Branding | Rp 1.200.000 – 2.000.000 | 1 halaman, desain custom ringan |
| Company Profile / UMKM (3-6 halaman) | Rp 3.500.000 – 6.000.000 | Posisi tengah pasar, bukan termurah — cerminkan positioning konsultan |
| Website Desa / Pemerintah Desa | Rp 2.000.000 – 3.500.000 | Diferensiasi kuat: modul APBDes/persuratan berbasis pemahaman RKPD/SAKIP |
| Toko Online Sederhana (katalog + checkout WA) | Rp 2.800.000 – 4.500.000 | Sesuai median pasar |
| Web Application / Sistem Informasi Custom | Mulai Rp 15.000.000, quote per proyek | Tidak dipromosikan aktif di Fase 0 — layani permintaan masuk saja |

**Sumber (harga target):** riset pasar Gemini 21 Jul 2026 (5+ sumber per
kategori: Biznet Gio, KreasiAi, Sribu, Resolusi Izin, ID Digitech, Fastwork,
Jogja Media Web, Juraganweb, Tonjoo, KAZOKKU) + penyesuaian positioning oleh
Claude.

### 6b. Harga Pengelolaan Media Sosial (lini resmi — AKTIF)

Harga **final** (bukan transisi). Ditetapkan & diluncurkan 21 Jul 2026;
tampil di `layanan-bisnis.html` (section `#medsos`).

| Paket | Harga | Cakupan |
|---|---|---|
| UMKM | Rp 600.000 / bulan | 8–10 konten + caption + desain + laporan bulanan |
| Bertumbuh | Rp 1.500.000 / bulan | 15–20 konten + reels + balas komentar + kalender konten |

Status: **aktif** (bukan lagi "diriset"). Berlangganan bulanan, bisa berhenti
kapan saja.

### 6c. Paket Kredit AI Tools — DRAFT (status: diriset, BELUM final)

> **PENTING:** seluruh angka di bawah adalah **DRAFT untuk keputusan Andri**,
> bukan harga final. Tidak ada perubahan kode atau harga live pada sesi ini.
> Sistem kredit sudah berjalan di kode (`1 kredit = 1 dokumen berhasil`), tapi
> **harga paket top-up belum ditetapkan**. Draft ini menurunkan angka dari
> biaya API nyata agar Andri punya titik awal, bukan menebak.

**Cara kerja (dari kode `tools/functions/_lib.js`):**
- 1 kredit dipotong per **dokumen yang berhasil** dibuat (pay-as-you-go); jika
  generate gagal, kredit tidak terpotong.
- Pengguna berkredit/langganan memakai **Claude Sonnet 4.6** (fallback **Haiku
  4.5** saat rate-limit). Mode demo (tanpa kredit) memakai Gemini — biaya demo
  terpisah & minim, tidak dihitung di sini.

**Biaya API (per 1 juta token, Juli 2026):** Sonnet 4.6 = $3 input / $15 output;
Haiku 4.5 = $1 / $5.

**Asumsi perhitungan (WAJIB diverifikasi sebelum finalisasi):**
- Input prompt ~1.500 token (batas isian 5.000 karakter).
- Output ~4.096 token (nilai default; pengguna bisa set s/d 8.000).
- Kurs ~Rp 16.300 / USD (fluktuatif — cek saat memutuskan).
- **Rata-rata token output nyata belum diukur** — pakai default sebagai asumsi;
  ukur dari log pemakaian nyata sebelum mengunci harga.

**Estimasi biaya (COGS) per dokumen:**

| Skenario | Hitungan | ≈ USD | ≈ Rupiah |
|---|---|---|---|
| Sonnet, output 4.096 (tipikal) | (1.500×$3 + 4.096×$15)/1jt | $0,066 | ~Rp 1.100 |
| Sonnet, output 8.000 (maksimum) | (1.500×$3 + 8.000×$15)/1jt | $0,125 | ~Rp 2.030 |
| Haiku (fallback), output 4.096 | (1.500×$1 + 4.096×$5)/1jt | $0,022 | ~Rp 360 |

**COGS acuan konservatif: ~Rp 1.500 / dokumen** (mayoritas Sonnet, output tipikal).

**DRAFT opsi paket (ilustratif — Andri tetapkan angka final):**

| Paket | Kredit | Harga draft | Per kredit | Margin kotor* |
|---|---|---|---|---|
| Starter | 10 | Rp 50.000 | Rp 5.000 | ~70% |
| Hemat | 50 | Rp 200.000 | Rp 4.000 | ~63% |
| Pro | 150 | Rp 450.000 | Rp 3.000 | ~50% |

*Margin kotor = (harga per kredit − COGS acuan Rp 1.500) ÷ harga per kredit.
Struktur sengaja memberi diskon per-kredit makin besar untuk paket besar, tanpa
menyentuh margin negatif bahkan pada skenario output maksimum (COGS ~Rp 2.030 <
harga per kredit terendah Rp 3.000).

**Belum diperhitungkan (untuk finalisasi):**
- Biaya payment gateway/payment link (mis. ~2–3% + biaya tetap per transaksi).
- Biaya infra kecil (Cloudflare KV, dll) — relatif minim.
- Kebijakan kredit: **non-refundable & tidak kedaluwarsa** (sudah tertera di
  Syarat & Ketentuan) — konfirmasi tetap berlaku untuk paket top-up.

**Status: DRAFT / diriset — menunggu keputusan Andri.** Menetapkan angka final
= perubahan pricing (butuh persetujuan eksplisit Andri per matriks kewenangan).
