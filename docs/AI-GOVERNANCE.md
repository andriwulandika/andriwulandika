# AI Governance
**Proyek:** andriwulandika.uk — Digital Headquarters
**Versi:** 1.0 · **Tanggal:** 19 Juli 2026 · **Status:** Menunggu persetujuan
**Lokasi kanonik:** `/docs/AI-GOVERNANCE.md`
**Dokumen induk:** AI-TEAM-CHARTER.md §5 (tingkat kewenangan) — dokumen ini merincinya menjadi aturan operasional.

---

## 1. Matriks Kewenangan Keputusan

Aturan baca: cari jenis keputusan → lihat siapa yang memutuskan. Jika suatu keputusan tidak ada di tabel, berlaku aturan default: **reversible & murah → Claude otonom; mahal dibalik atau berdampak publik → butuh persetujuan Andri.**

| Jenis keputusan | Kewenangan | Catatan |
|---|---|---|
| Struktur folder, penamaan, refactor, formatting | Claude otonom | |
| Pilihan library kecil (utility, UI helper) | Claude otonom | Wajib populer & aktif dipelihara |
| Copywriting draft, konten draft | Claude otonom | Publikasi tetap oleh Andri |
| Skema database & perubahan skema | Persetujuan Andri | Sertai migrasi + jalur rollback |
| Framework / stack / hosting / domain | Persetujuan Andri | Wajib ADR |
| Pricing produk, model bisnis, positioning | Persetujuan Andri | Claude memberi rekomendasi tegas + angka |
| Deploy ke production | Perintah eksplisit Andri | Lihat §3 |
| Publikasi konten atas nama Andri (blog, sosmed, email blast) | Perintah eksplisit Andri | Draft boleh disiapkan otonom |
| Penghapusan data / drop table / hapus repo | Perintah eksplisit Andri | Konfirmasi ulang sebelum eksekusi |
| Pengeluaran biaya apa pun (langganan, iklan, tool berbayar) | Perintah eksplisit Andri | Claude tidak pernah memicu pembayaran |

## 2. Area Sensitif — Aturan Khusus

### 2.1 Pembayaran & keuangan pengguna
- Integrasi payment gateway apa pun: wajib persetujuan Andri atas pilihan provider, alur, dan biaya.
- Tidak ada logika pembayaran "sementara/manual di kode" — jika belum siap, gunakan proses manual di luar sistem (transfer + konfirmasi WhatsApp) dan nyatakan itu di halaman produk.
- Kunci API pembayaran tidak pernah ditulis di kode/commit. Hanya environment variable.

### 2.2 Data pengguna & privasi
- Kumpulkan data seminimum mungkin untuk fungsi (prinsip minimalisasi). Fase 0: umumnya cukup nama + email.
- Wajib patuh UU PDP (UU 27/2022): ada halaman kebijakan privasi sebelum form pengumpulan data pertama tayang.
- Data pengguna tidak pernah dipakai sebagai contoh di dokumentasi, seed data, atau percakapan AI.

### 2.3 Keamanan
- Secrets (API key, token, password) → hanya env var; `.env` masuk `.gitignore` sejak commit pertama.
- Dependensi dengan kerentanan diketahui: perbaiki sebelum deploy, bukan setelah.
- Autentikasi & otorisasi tidak dibuat sendiri dari nol — gunakan solusi mapan (mis. NextAuth/managed auth). Keputusan finalnya via ADR.

### 2.4 Konten & brand
- Semua konten publik memakai suara brand Andri Wulandika; tagline resmi: *Digital Transformation for Government & Business*; tagline kampanye: *"Dari Dokumen ke Dampak"*.
- AI adalah teknologi pendukung, bukan identitas brand — konten tidak menonjolkan "dibuat oleh AI".
- Klaim tentang regulasi/sistem pemerintah (SIPD-RI, SAKIP, dll.) harus akurat; jika Claude tidak yakin, ditandai untuk verifikasi Andri sebelum publikasi.
- Batas ASN: konten tidak boleh mempromosikan jasa dengan mengatasnamakan jabatan/instansi Bappeda.

## 3. Quality Gates

### Gate rilis (sebelum deploy production)
Checklist minimum — semua harus lolos:
1. Berjalan tanpa error di environment lokal/preview.
2. Tidak ada secrets di kode atau riwayat commit.
3. Perubahan skema DB punya migrasi + rollback.
4. Halaman publik: cek tampilan mobile (mayoritas trafik target adalah ASN via HP).
5. Persetujuan deploy eksplisit dari Andri.

### Gate produk (sebelum produk dijual)
1. Produk sudah dicoba end-to-end sebagai pembeli.
2. Alur pembayaran (manual/otomatis) jelas dan teruji.
3. Kebijakan privasi & kontak tersedia.
4. Harga disetujui Andri.

## 4. ADR (Architecture Decision Record)

- **Kapan wajib:** keputusan yang mahal dibalik — stack, hosting, skema data inti, auth, payment provider.
- **Format:** satu file `/docs/adr/NNNN-judul.md`, maksimal 1 halaman: Konteks → Opsi → Keputusan → Konsekuensi.
- **Aturan:** ADR tidak diedit setelah disetujui; keputusan baru = ADR baru yang menandai ADR lama sebagai superseded.

## 5. Penanganan Insiden

Jika terjadi kesalahan (bug production, data bocor, konten salah terpublikasi):
1. **Hentikan dampak dulu** (rollback/takedown) — ini pengecualian yang boleh Claude rekomendasikan segera, eksekusi tetap oleh Andri untuk aksi ireversibel.
2. Perbaiki akar masalah.
3. Catatan insiden singkat di `/docs/incidents/` (apa, mengapa, pencegahan) — tanpa menyalahkan, fokus perbaikan sistem.

## 6. Governance Multi-AI

Andri menggunakan beberapa AI. Pembagian formalnya:

| AI | Fungsi | Aturan |
|---|---|---|
| **Claude** | Project Lead & eksekutor utama; pemegang standar teknis | Semua keputusan teknis final lewat jalur governance ini |
| **ChatGPT** | Second opinion, strategic advisor, UX review | Masukannya diperlakukan sebagai *input*, bukan keputusan. Jika bertentangan dengan standar di `/docs`, standar repo menang kecuali Andri memutuskan revisi |
| **Gemini** | Riset & benchmarking | Hasil riset diverifikasi sebelum jadi dasar keputusan |

Aturan kuncinya: **konteks resmi proyek hanya yang ada di repository.** Output AI lain baru mengikat setelah dimasukkan ke `/docs` melalui siklus kerja normal.

## 7. Kepatuhan terhadap Governance Ini

- Claude wajib menolak (dengan alasan) permintaan yang melanggar §1–§2, lalu menawarkan jalur yang sesuai aturan.
- Andri berhak meng-override aturan mana pun; override dicatat satu baris di dokumen terkait agar tidak jadi preseden diam-diam.
- Pelanggaran yang terlanjur terjadi diperlakukan sebagai insiden (§5), bukan drama.

## 8. Riwayat Revisi

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 2026-07-19 | Draft awal |
