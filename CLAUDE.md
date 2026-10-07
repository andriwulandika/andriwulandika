# CLAUDE.md — andriwulandika.uk

Ringkasan operasional untuk pekerjaan repo. Fokus saat ini: **website personal Andri Wulandika** dan integrasinya dengan **AI Workspace** di `ai.andriwulandika.uk`.

## Konteks Proyek
- **Pemilik:** Andri Wulandika — instruksi teknis harus praktis dan langkah-demi-langkah.
- **Website utama:** personal digital headquarters; bukan landing page jasa.
- **AI Workspace:** tujuan terpisah di `ai.andriwulandika.uk`.
- **Repo:** `andriwulandika/andriwulandika`.
- **Stack:** Eleventy 3 + Cloudflare Pages/Functions/KV.
- **Source:** `src/`; `site/` dan `tools/` adalah output/deploy tree yang sengaja dikomit.
- **Edit:** utamakan `src/`, lalu sinkronkan output `site/` bila perubahan memengaruhi deploy.
- **Branch kerja:** gunakan branch/PR; **merge ke `main` hanya setelah Andri menyetujui preview**.

## Identitas & Arah Brand Aktif
Website utama harus terasa seperti **website personal**, bukan katalog layanan.

Hero aktif:
> **Saya bekerja di antara planning, teknologi, dan AI.**

Positioning:
- Perencana pembangunan daerah.
- Builder sistem digital.
- AI practitioner / pengguna AI untuk knowledge work.
- Pembelajar dan penguji ide digital.

Jangan mengembalikan positioning lama:
- “Transformasi digital untuk pemerintah & bisnis”
- katalog paket jasa website
- harga jasa
- promosi media sosial
- demo UMKM/desa/pemerintah sebagai isi utama homepage.

Tulaku adalah brand terpisah dan tidak boleh dicampur ke identitas utama kecuali diminta eksplisit.

## Struktur Homepage V3
Urutan utama:
1. Hero / identitas
2. Tentang
3. Karya
4. Sekarang
5. AI Workspace
6. Prinsip
7. Contact

Gaya:
- editorial/minimal
- warm paper
- tipografi besar dengan aksen serif italic
- aksen oranye
- tanpa 3D berat
- motion sederhana dan menghormati `prefers-reduced-motion`
- mobile-first dan ringan.

## Aturan Konten
- Bahasa Indonesia untuk konten publik dan dokumen internal.
- Hindari klaim jabatan/instansi sebagai promosi komersial.
- Jangan mengarang proyek, klien, pencapaian, atau testimoni.
- AI diposisikan sebagai alat kerja/praktik, bukan klaim sensasional.
- Link ke AI Workspace harus jelas tetapi tidak mengambil alih identitas homepage.

## Retired / Jangan Dihidupkan Kembali
Halaman jasa/demo lama telah dipensiunkan:
- `jasa.html`
- `layanan-pemerintah.html`
- `layanan-bisnis.html`
- `produk.html`
- `promo.html`
- `tentang.html`
- `demo-*.html`
- preview desain lama.

URL lama yang masih berpotensi diakses diarahkan dengan 301 ke homepage atau tujuan yang relevan. Jangan membuat ulang halaman tersebut tanpa persetujuan Andri.

## Yang Tetap Dipertahankan
- halaman legal: `kebijakan-privasi.html`, `syarat-ketentuan.html`
- `src/tools/` dan fungsi AI Workspace yang masih digunakan
- assets/shared code yang benar-benar direferensikan
- file verifikasi/SEO yang masih diperlukan
- security headers, redirects, dan konfigurasi Cloudflare yang aktif.

## Standar Kualitas
- Production-ready.
- Tidak ada secret di kode.
- Jangan menghapus fungsi AI/tools hanya karena tidak terlihat dari homepage.
- Sebelum menghapus file, cek referensi dan fungsi URL-nya.
- Setelah perubahan struktural: build, audit broken links/references, lalu commit.
- Jangan merge ke `main` tanpa approval Andri.

## Prioritas Kerja Saat Ini
1. Pastikan PR redesign V3 bersih dan preview benar-benar menampilkan homepage baru.
2. Bersihkan sisa artefak/asset/dokumen lama yang tidak lagi memiliki fungsi.
3. Audit responsive/mobile dan link homepage.
4. Audit SEO dasar, sitemap, redirects, dan legal.
5. Setelah V3 disetujui, baru pekerjaan pengembangan berikutnya.

## Bahasa
- Dokumen & konten: Bahasa Indonesia.
- Kode, komentar kode, commit message: Bahasa Inggris.
