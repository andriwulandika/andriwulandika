# ADR 0001 — Payment Link untuk Jasa Website & Paket Media Sosial

**Status:** DITERIMA (Andri, 21 Juli 2026) — pilih **(a) manual WA** sekarang;
**pindah ke (b) Mayar.id saat sudah ada pelanggan**.
**Tanggal draf:** 21 Juli 2026. **Tanggal keputusan:** 21 Juli 2026.
**Kategori kewenangan:** payment = wajib persetujuan eksplisit Andri
(`AI-GOVERNANCE.md` §1) — keputusan ini disetujui Andri.

---

## Konteks

Saat ini semua pembayaran diproses **manual via WhatsApp** (kirim nominal,
konfirmasi transfer manual). Dua kebutuhan mulai muncul:

- **Jasa website** — pembayaran **sekali bayar** (Rp 1,2 jt – 3 jt+). Manual
  masih tertahankan pada volume kecil.
- **Pengelolaan Media Sosial** — **langganan bulanan** (Rp 600rb & Rp 1,5 jt /
  bulan). Penagihan bulanan manual akan cepat merepotkan dan rawan lupa/telat
  begitu klien bertambah. Ini pendorong utama butuh payment link/otomatisasi.

Kendala teknis: situs adalah **file statis di Cloudflare Pages** (tanpa backend
pembayaran sendiri). Jadi solusi harus berbasis **link/redirect** (hosted
checkout), bukan integrasi server-side yang kompleks.

## Opsi

> ⚠️ Angka biaya & fitur di bawah dari riset singkat **21 Jul 2026** — **wajib
> diverifikasi ulang** di halaman resmi provider saat mengambil keputusan,
> karena tarif/fitur bisa berubah.

### (a) Tetap manual via WhatsApp (sementara)
- **Biaya:** Rp 0.
- **Recurring/langganan:** tidak ada — tagih & cek transfer manual tiap bulan.
- **Integrasi situs statis:** tidak perlu apa-apa (sudah jalan).
- **Cocok bila:** volume klien masih sangat kecil; ingin nol biaya & nol setup.
- **Risiko:** tidak scalable untuk langganan medsos; rawan lupa tagih; kesan
  kurang profesional saat klien bertambah.

### (b) Mayar.id
- **Biaya:** pendaftaran gratis; **~1% per transaksi** + biaya channel
  (mis. **Rp 4.500** transfer bank/VA, **Rp 5.000** minimarket). Bisa diatur
  siapa menanggung fee (bisnis atau pelanggan).
- **Recurring/langganan:** **YA** — mendukung *recurring payment* / pembayaran
  berlangganan (bulanan/mingguan) secara eksplisit. Cocok untuk paket medsos.
- **Integrasi situs statis:** berbasis **payment link** yang bisa dikustomisasi
  → cukup tempel/redirect dari tombol di situs. Tidak perlu backend.
- **Catatan:** fee persentase relatif rendah + biaya channel flat; perlu cek
  detail cara set langganan otomatis vs invoice ulang.

### (c) Lynk.id
- **Biaya:** akun **Free ~5%/transaksi**; akun **Pro ~3%/transaksi**
  (Pro ~**Rp 99.000/bln**, dibayar tahunan). *Convenience fee* default
  ditanggung pembeli, bisa dialihkan ke penjual.
- **Recurring/langganan:** ada model **membership/langganan** (mis. akses grup
  Telegram/Discord berbayar bulanan) — lebih berorientasi *membership creator*,
  perlu cek apakah cocok untuk "langganan jasa medsos" biasa (bukan komunitas).
- **Integrasi situs statis:** berbasis **link/storefront** (bio-link + produk)
  → tempel/redirect dari situs. Tidak perlu backend.
- **Catatan:** fee % lebih tinggi dari Mayar kecuali ambil Pro; kuat untuk
  jualan produk digital/creator, recurring-nya bergaya membership.

### Ringkas perbandingan

| Kriteria | (a) Manual WA | (b) Mayar.id | (c) Lynk.id |
|---|---|---|---|
| Biaya per transaksi | Rp 0 | ~1% + channel (±Rp4.500 VA) | Free 5% / Pro 3% |
| Biaya tetap | Rp 0 | Rp 0 | Pro ~Rp99rb/bln (tahunan) |
| Recurring langganan (medsos) | Manual | Ya (recurring) | Ya (gaya membership) |
| Cocok situs statis Cloudflare | — | Ya (payment link) | Ya (link/storefront) |
| Kesiapan sekali-bayar (website) | Ya | Ya | Ya |

## Keputusan

**Pilih opsi (a) — tetap manual via WhatsApp untuk sekarang.** Disetujui Andri
(21 Jul 2026).

**Pemicu pindah ke opsi (b) Mayar.id:** begitu **sudah ada pelanggan**
(terutama pelanggan **langganan medsos** pertama, atau saat volume transaksi
manual mulai merepotkan). Saat pemicu tercapai, buat ADR lanjutan / update ADR
ini, verifikasi ulang tarif Mayar, lalu integrasikan payment link.

Alasan: pada Fase 0 dengan volume klien masih sangat kecil, manual WA = nol
biaya & nol setup, dan belum ada beban penagihan bulanan yang nyata. Mayar
disiapkan sebagai langkah berikutnya karena mendukung recurring untuk paket
medsos dan fee-nya paling rendah di antara opsi berbayar.

## Konsekuensi

- **Sekarang:** pembayaran tetap manual via WA (kirim nominal + konfirmasi
  transfer). Nol biaya transaksi, nol integrasi. Harga paket tidak perlu
  disesuaikan untuk menyerap fee.
- **Beban operasional:** penagihan langganan medsos dilakukan manual tiap bulan
  — perlu pengingat manual agar tidak terlewat begitu ada pelanggan langganan.
- **Saat pindah ke Mayar (nanti):** cek ulang tarif (~1% + channel), tentukan
  siapa menanggung fee (bisnis vs pelanggan), pertimbangkan apakah harga paket
  perlu naik tipis untuk menyerap fee, lalu tempel/redirect tombol bayar dari
  situs statis (tanpa backend). Catat di ADR saat itu.
- **Tidak ada** perubahan kode/harga live akibat keputusan ini.
