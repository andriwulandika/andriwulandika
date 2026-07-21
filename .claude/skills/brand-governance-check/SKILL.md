---
name: brand-governance-check
description: Gunakan skill ini SEBELUM mengedit, membuat, atau mereview konten publik (halaman situs, copy, pricing, profil pemilik) di andriwulandika.uk atau ai.andriwulandika.uk. Juga gunakan sebelum keputusan yang menyentuh pricing, positioning, atau publikasi atas nama Andri. Memastikan konten patuh pada keputusan brand & matriks kewenangan yang sudah ditetapkan, supaya tidak perlu revisi berulang.
---

# Brand & Governance Check

Checklist ini WAJIB dijalankan sebelum implementasi konten publik. Tujuannya: tangkap pelanggaran SEBELUM ditulis, bukan sesudah — supaya tidak revisi berulang (boros usage limit).

## 1. Cek Larangan Konten (grep dulu sebelum edit)

Jalankan pencarian ini di file yang akan disentuh:

```bash
grep -ril "TAPD" src/
grep -ril "Birokrat\|DesaDigital\|VillageStock" src/
grep -ril "Dari Dokumen ke Dampak" src/
```

- Hasil ditemukan di file yang sedang dikerjakan → **hapus/ganti**, jangan biarkan meski di luar scope task saat ini (kecuali task eksplisit "audit saja").
- Tagline resmi yang berlaku: **"Transformasi digital untuk pemerintah & bisnis"**.

## 2. Cek Penempatan Jabatan Resmi

Jika konten menyebut "Perencana Ahli Pertama" atau "Bappeda Aceh Tenggara":
- Apakah berada di halaman/section yang JUGA berisi CTA berbayar (harga, tombol beli, aktivasi Pro)? → **PELANGGARAN**. Pindahkan ke konteks netral (halaman Tentang, kredensial pengalaman) atau hapus kedekatannya dengan CTA.
- Framing yang aman: "pengalaman 7+ tahun di perencanaan & digitalisasi pemerintahan" — tanpa embel instansi/jabatan resmi bersanding CTA.

## 3. Cek Kewenangan Sebelum Eksekusi

Sebelum mengubah salah satu dari ini, **STOP dan minta persetujuan Andri** (jangan langsung implementasi):
- Pricing (angka harga, struktur paket)
- Positioning/tagline resmi
- Publikasi konten mengatasnamakan Andri (blog, sosmed, email blast) — draft boleh disiapkan, publish tidak
- Stack, hosting, skema database

Draft boleh dibuat otonom; eksekusi/publish/deploy menunggu perintah eksplisit.

## 4. Cek Klaim Regulasi/Sistem Pemerintah

Jika konten menyebut sistem seperti SIPD-RI, e-Monev, KRISNA, SAKIP, dll — pastikan akurat. Jika tidak yakin, tandai dengan komentar `<!-- VERIFY: klaim regulasi, cek dengan Andri -->` daripada menebak.

## 5. Output Setelah Cek

Laporkan singkat (bukan esai):
- ✅/❌ per poin 1–4
- Jika ada ❌, jangan lanjut implementasi — tanyakan atau tandai untuk persetujuan
- Jika semua ✅, lanjut implementasi seperti biasa

## Referensi Lengkap
Detail penuh ada di `/docs/AI-GOVERNANCE.md` §2.4 dan `/docs/KNOWLEDGE-BASE-v1.1.md` §2. Skill ini adalah ringkasan cepat, bukan pengganti.
