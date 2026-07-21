# ADR 0001 — Payment Link untuk Jasa Website & Paket Media Sosial

**Status:** DRAF — **BELUM DIPUTUSKAN**, menunggu approval Andri.
**Tanggal draf:** 21 Juli 2026.
**Kategori kewenangan:** payment = wajib persetujuan eksplisit Andri
(`AI-GOVERNANCE.md` §1). ADR ini hanya menyajikan opsi; **tidak memilih sendiri**.

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

**BELUM DIPUTUSKAN — menunggu approval Andri, lihat opsi di atas.**

Pemilihan provider pembayaran & struktur fee menyentuh biaya dan positioning →
wajib persetujuan Andri (`AI-GOVERNANCE.md` §1). ADR ini sengaja tidak memilih.

## Konsekuensi

*(Placeholder — diisi setelah keputusan dibuat.)* Setelah Andri memilih opsi,
bagian ini mencatat: dampak biaya ke margin (terutama paket medsos bulanan),
langkah integrasi tombol bayar di situs, siapa menanggung fee (bisnis vs
pelanggan), dan apakah harga paket perlu disesuaikan untuk menyerap fee.
