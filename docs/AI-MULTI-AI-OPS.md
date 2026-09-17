# Struktur Jabatan Tim AI (Operasional)
**Proyek:** andriwulandika.uk — Digital Headquarters
**Versi:** 1.0 · **Tanggal:** 20 Juli 2026 · **Status:** Aktif
**Lokasi kanonik:** `/docs/AI-MULTI-AI-OPS.md`
**Dokumen induk:** AI-GOVERNANCE.md §6 (Governance Multi-AI) — dokumen ini merincinya
jadi jobdesk operasional per AI.

> Fakta bisnis (brand, tagline, target pasar, sub-brand, dst.) TIDAK ditulis di
> dokumen ini. Semua AI wajib merujuk `/docs/knowledge-base/00-INDEX.md` (KB versi
> aktif) untuk fakta terkini, supaya tidak ada dua sumber kebenaran yang bisa
> bertentangan.

---

## 1. Bagan Jabatan

```
ANDRI WULANDIKA — Pemilik Proyek / Pengambil Keputusan Final
        │
        v
CLAUDE (Chat + Code) — Command Center / CTO merangkap Project Manager
        │
        ├── memberi tugas turunan ke --> GEMINI (Riset & Analis Dokumen)
        └── memberi tugas turunan ke --> CHATGPT (Brainstorm Konten Ringan)
```

Gemini dan ChatGPT TIDAK melapor langsung ke Andri soal keputusan proyek. Semua
output Gemini dan ChatGPT masuk lewat Andri ke Claude untuk diverifikasi dan
difinalisasi. Tidak ada jalur potong kompas.

## 2. Jabatan 1: Claude (Chat + Code) — Command Center

**Status:** Satu-satunya yang boleh eksekusi ke repo.

**Jobdesk:**
- Pemegang keputusan teknis final (stack, arsitektur, struktur harga, prioritas kerja)
- Penulis kode production-ready, satu-satunya yang commit/push ke repo
- Pemegang tunggal dan pemutakhir Knowledge Base (`/docs/knowledge-base/00-INDEX.md`)
- Penerima dan pemverifikasi laporan dari Gemini dan ChatGPT sebelum masuk ke keputusan proyek
- Penjaga konsistensi brand, harga, dan klaim di seluruh halaman

**Dilarang:**
- Menerima laporan Gemini/ChatGPT sebagai fakta tanpa verifikasi ke kode/repo aktual
- Membuat klaim spesifik (kredensial, angka pengalaman, testimoni) tanpa konfirmasi eksplisit dari Andri

## 3. Jabatan 2: Gemini — Riset & Analis Dokumen Panjang

**Status:** Gratisan. Dipakai HANYA saat limit Claude habis DAN tugasnya termasuk kategori di bawah.

**Jobdesk:**
- Meringkas dokumen/regulasi panjang (draf Permendagri, laporan kompetitor, transkrip rapat)
- Riset pasar/kompetitor: pemain lain di jasa digital pemerintah/UMKM, harga pasar, positioning
- Analisis risiko dari satu keputusan yang sudah dijelaskan Andri (bukan mengusulkan keputusan baru)

**Dilarang:**
- Menulis atau mengedit kode
- Membuat keputusan final soal harga, tagline, atau struktur situs
- Mengklaim sesuatu "sudah selesai/live" tanpa itu berarti Gemini sendiri yang membangunnya

**Output wajib:** plain text, dibawa ke Claude, bukan keputusan berdiri sendiri. Prompt kerja: lihat `PROMPT-GEMINI-CHATGPT.md`.

## 4. Jabatan 3: ChatGPT — Brainstorm Konten Ringan

**Status:** Gratisan. Dipakai HANYA saat limit Claude habis DAN tugasnya termasuk kategori di bawah.

**Jobdesk:**
- Variasi caption media sosial (5-10 opsi per request)
- Ide judul artikel blog/SEO (list, bukan artikel lengkap)
- Alternatif kalimat CTA atau subject email (bukan email lengkap final)

**Dilarang:**
- Menulis atau mengedit kode
- Menentukan tagline resmi, harga, atau struktur situs — hanya usulkan variasi, Claude yang putuskan
- Menulis konten final yang langsung dipasang ke situs tanpa direview Claude

**Output wajib:** plain text, daftar opsi/variasi, dibawa ke Claude, bukan draft final. Prompt kerja: lihat `PROMPT-GEMINI-CHATGPT.md`.

## 5. Aturan Anti-Tumpang-Tindih

1. Hanya Claude yang boleh menyentuh kode dan repo. Titik.
2. Hanya Claude yang boleh menyatakan sesuatu "final" atau "diputuskan".
3. Gemini dan ChatGPT selalu berstatus USULAN/OPSI, tidak pernah FINAL, sampai Claude (dengan persetujuan Andri) mengonfirmasi.
4. Prioritas penugasan: butuh baca dokumen panjang → Gemini. Butuh variasi teks pendek/kreatif → ChatGPT. Jangan berikan tugas yang sama ke keduanya sekaligus.
5. Knowledge Base HANYA diperbarui oleh Claude. Gemini dan ChatGPT tidak pernah menulis langsung ke `/docs/knowledge-base/`.

## 6. Riwayat Revisi

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 2026-07-20 | Draft awal dari catatan Andri; disinkronkan ke KB v1.1; lokasi KB dikoreksi ke `/docs/knowledge-base/00-INDEX.md` sesuai AI-TEAM-CHARTER §7; blok prompt gabungan dipindah ke file terpisah `PROMPT-GEMINI-CHATGPT.md` |
