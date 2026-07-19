# BUSINESS MODEL

## Aliran pendapatan
### 1. Jasa pembuatan website (site/ — inti pendapatan)
Harga transparan (dari homepage & JSON-LD `offers`):
| Paket | Harga | Untuk |
|---|---|---|
| Landing Page | Rp 750.000 | promosi produk/jasa/acara, 1 halaman |
| Website Profil | Rp 2.000.000 | bisnis/UMKM, 5–7 halaman |
| Website Instansi / OPD | Rp 3.500.000 | pemerintah, sesuai kaidah + AI Tools |
Add-on tersedia (lihat homepage/layanan). Bayar sekali, milik klien; hosting gratis (Cloudflare).

### 2. AI Tools perencanaan daerah (tools/ — produk digital)
Model **pay-as-you-go berbasis kredit**: 1 kredit = 1 dokumen berhasil (`CREDIT_COST=1` di
`_lib.js`). Ada **mode demo gratis** (hasil dipotong ~700 char). Kode langganan lama
(`expiresAt`) dihormati sebagai akses tanpa batas hingga kedaluwarsa.
- **Mesin AI:** demo → Gemini; berbayar → Claude (API key ditanggung penyedia).
- **Pembelian kredit:** **manual** — transfer + konfirmasi WhatsApp → admin membuat/top-up kode
  akses lewat `admin-kode.html`. Tanpa payment gateway (keputusan biaya).

> ⚠️ **Konsistensi pesan:** `tools/harga.html` masih menyebut "akses penuh tanpa batas".
> Model aktual = pay-as-you-go. **Harus diselaraskan** (lihat `AUDIT_REPORT.md` #21). Opsi:
> (a) ubah copy ke bahasa kredit, atau (b) tawarkan paket unlimited nyata berbasis `expiresAt`.

## Struktur biaya (rendah — keunggulan model)
- Hosting: **Rp 0** (Cloudflare Pages, tanpa batas bandwidth).
- Compute: Cloudflare Functions (free tier memadai untuk skala saat ini).
- KV: free/nyaris nol. Domain: biaya kecil tahunan.
- **Biaya variabel utama:** token API AI (Gemini/Claude) untuk pengguna berbayar & demo.
- Tenaga: 1 orang (bus factor 1 — lihat `RISK_REGISTER.md`).

## Unit economics (kerangka, angka untuk diisi pemilik)
- Margin AI tool = harga kredit − biaya token − alokasi demo gratis. **Pastikan harga kredit
  menutup biaya token demo** agar demo tidak merugi pada skala besar.
- Jasa website: margin tinggi (biaya utama = waktu), skalabilitas dibatasi kapasitas 1 orang.

## Risiko model
Pembayaran manual tidak scalable · ketergantungan harga/kuota API · demo gratis bisa disalahgunakan
(dijaga rate-limit 100/mnt/IP) · bus factor 1. Mitigasi & evolusi: `FUTURE_PLAN.md`, `ROADMAP.md`.

Terkait: `SERVICES.md`, `PRODUCTS.md`, `AI_STRATEGY.md`, `RISK_REGISTER.md`.
</content>
