# CLAUDE.md — andriwulandika.uk

Ringkasan operasional. Dokumen lengkap ada di `/docs` — baca sesuai kebutuhan lane (lihat AI-ORGANIZATION.md §2). Dokumen ini HANYA ringkasan; jika ada konflik, `/docs` yang menang.

## Konteks Proyek
- **Pemilik:** Andri Wulandika — bukan developer. Instruksi teknis ke Andri harus langkah-demi-langkah.
- **Fase saat ini:** Fase 0 — validasi & pendapatan tercepat. Uji tiap pekerjaan: *apakah ini mempercepat pendapatan, atau hanya kelihatan bagus?*
- **Repo:** `andriwulandika/andriwulandika` (folder `site/` & `tools/`, build 11ty dari `src/`). Hosting: Cloudflare Pages + Functions + KV.
- **Edit selalu di `src/`, TIDAK PERNAH langsung di `site/`/`tools/`.**
- **Dasar kerja:** `docs/ROADMAP.md` (sprint aktif) — kerjakan sesuai urutan sprint, jangan lompat kecuali diminta eksplisit.

## Kewenangan (ringkas — detail di AI-GOVERNANCE.md §1)
| Otonom | Butuh persetujuan Andri | Perintah eksplisit wajib |
|---|---|---|
| Refactor, struktur folder, library minor, copy draft | Stack/hosting/domain, skema DB, pricing, positioning | Deploy production, publikasi atas nama Andri, hapus data, pengeluaran biaya |

Push ke branch = boleh (preview). **Merge ke `main` HANYA setelah Andri approve preview.**

## Aturan Brand — Wajib Dicek Sebelum Sentuh Konten Publik
1. Tagline aktif di hero: **"Punya Usaha, Harus Punya Website"** (bukan "Dari Dokumen ke Dampak" — sudah dipensiunkan).
2. **DILARANG** menyebut: "Anggota aktif TAPD", sub-brand Birokrat/DesaDigital/VillageStock (di luar roadmap).
3. Jabatan resmi "Perencana Ahli Pertama · Bappeda Aceh Tenggara" **tidak boleh** bersanding langsung dengan CTA/penawaran berbayar. Boleh muncul di konteks pengalaman netral (mis. halaman Tentang).
4. Layanan **Pengelolaan Media Sosial** adalah lini resmi (paket & harga ada di ROADMAP.md Sprint 3).
5. AI = teknologi pendukung, bukan identitas brand. Jangan tonjolkan "dibuat oleh AI" di konten publik.

Kalau task menyentuh salah satu poin di atas → jalankan skill `brand-governance-check` dulu sebelum implementasi.

## Standar Kualitas
- Kode production-ready, ada error handling, langsung bisa dijalankan.
- Secrets hanya via env var, tidak pernah di kode/commit.
- Keputusan mahal-dibalik (stack, auth, payment) → wajib ADR di `/docs/adr/`.
- Commit message jelas + centang item selesai di `docs/ROADMAP.md` di akhir sesi. Sesi tanpa update ROADMAP dianggap belum selesai.

## Model per Jenis Kerja
- **Sonnet 4.6** — default untuk implementasi rutin dengan spesifikasi jelas (Sprint 1, 2, 4).
- **Fable 5 / Opus 4.8** — hanya untuk keputusan arsitektur mahal-dibalik atau ADR kompleks (mis. payment link Sprint 3.4).

## Bahasa
- Dokumen internal & konten situs: Bahasa Indonesia.
- Kode, komentar kode, commit message: Bahasa Inggris.
