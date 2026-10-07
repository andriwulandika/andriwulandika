# AI-ORGANIZATION — andriwulandika.uk

**Versi:** 2.0  
**Tanggal:** 7 Oktober 2026  
**Status:** Rujukan internal.

## 1. Tujuan
Mengatur cara kerja AI untuk website personal `andriwulandika.uk` dan AI Workspace `ai.andriwulandika.uk`.

## 2. Pembagian Peran
- **ChatGPT:** arah produk, UX, struktur konten, review, riset, dan orkestrasi pekerjaan.
- **Claude Code:** implementasi teknis di repository bila diperlukan.
- **AI Workspace:** kumpulan tools/otomasi yang menjadi produk digital terpisah dari homepage personal.

## 3. Alur Kerja Repo
1. Pahami tujuan dan kondisi branch.
2. Audit file/referensi sebelum menghapus atau mengubah struktur.
3. Edit source di `src/`.
4. Sinkronkan output `site/` bila diperlukan oleh arsitektur deploy.
5. Build dan lakukan audit broken links/references.
6. Commit ke branch kerja.
7. Preview Cloudflare.
8. Andri review.
9. Merge ke `main` hanya setelah approval.

## 4. Prinsip Desain Website Personal
- Personal, editorial, sederhana, cepat.
- Bukan katalog jasa.
- Konten harus berangkat dari pekerjaan nyata, proyek nyata, dan proses belajar nyata.
- AI ditampilkan sebagai bagian dari cara kerja, bukan gimmick.
- Mobile experience adalah prioritas.

## 5. Aturan Perubahan
Perubahan positioning, domain, stack, payment, auth, atau arsitektur yang sulit dibalik memerlukan persetujuan Andri.

## 6. Status Saat Ini
Fokus utama:
- menyelesaikan redesign Personal Digital Headquarters V3;
- membersihkan artefak website lama;
- memastikan redirects, sitemap, SEO dasar, legal, dan mobile tetap aman;
- mempertahankan AI Workspace/tools yang masih digunakan.

## 7. Dokumen
Dokumen lama tentang paket jasa, harga, demo, dan handoff website telah dipensiunkan karena tidak lagi menjadi sumber kebenaran untuk positioning V3.
