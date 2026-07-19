# CUSTOMER JOURNEY

Dua alur berbeda: **Jasa Website** (konsultatif, off-platform) dan **AI Tools** (self-serve + manual payment).

## Alur A — Jasa Website (site/)
1. **Awareness:** pencarian Google / media sosial / referral → landing `andriwulandika.uk`.
2. **Interest:** homepage → jalur `layanan-pemerintah.html` atau `layanan-bisnis.html`.
3. **Consideration:** lihat paket harga, keunggulan, portofolio (⚠️ tipis — penghambat),
   proses kerja, FAQ.
4. **Action:** klik **WhatsApp** (`62811660568`) → konsultasi → kesepakatan.
5. **Delivery:** pengerjaan 3–21 hari, revisi sampai puas.
6. **Retention/Advocacy:** panduan kelola sendiri; peluang add-on & referral. ⚠️ **belum ada
   mekanisme testimoni/studi kasus** — titik kebocoran advocacy.

**Titik friksi:** bukti sosial minim; tak ada form terstruktur (hanya WA); tak ada follow-up otomatis.

## Alur B — AI Tools (tools/)
1. **Awareness:** artikel SEO (Renja/RKPD/SAKIP/KAK dll) & halaman tool menarik ASN dari Google.
2. **Trial:** buka tool → **demo gratis** (Gemini, hasil dipotong ~700 char) tanpa daftar.
3. **Conversion intent:** lihat `harga.html` → tertarik akses penuh.
4. **Payment (manual):** `bayar.html` → transfer → konfirmasi **WhatsApp** → admin buat kode via
   `admin-kode.html`.
5. **Activation:** `aktifkan-pro.html` → masukkan kode → `verify` → simpan di localStorage.
6. **Usage:** generate dokumen (Claude), **1 kredit/dokumen**, saldo tampil di `dashboard.html`.
7. **Repurchase:** top-up kredit (lagi-lagi manual via WA/admin).

**Titik friksi (kritis):**
- Langkah 4 **manual & putus** (keluar platform, tunggu admin) → drop-off besar.
- ⚠️ Ekspektasi "tanpa batas" di `harga.html` vs realita kredit → kekecewaan pasca-beli.
- Tanpa akun/email → sulit re-engagement & pemulihan kode hilang (hanya localStorage).

## Momen kebenaran (yang menentukan konversi)
- **Kualitas hasil demo** (ICP-1) — harus cukup bagus untuk meyakinkan, cukup terbatas untuk
  mendorong beli. Sudah diatur via `truncateDemo`.
- **Kepercayaan halaman** — portofolio/testimoni (site) & kejelasan harga (tools).
- **Kemudahan bayar** — bottleneck utama (lihat `FUTURE_PLAN.md`: self-serve payment).

## Perbaikan berdampak (ringkas → `TODO.md`)
1. Selaraskan pesan harga tools (P0). 2. Tambah testimoni/portofolio (P1).
3. Form kontak terstruktur + WA (P2). 4. Evaluasi self-serve payment & akun (Future).
</content>
