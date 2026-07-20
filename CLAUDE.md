# CLAUDE.md

Pemilik repo ini adalah Andri Wulandika (bukan developer). Proyek ini adalah dua situs dalam satu repo: **andriwulandika.uk** (`site/` — jasa pembuatan website untuk UMKM/desa/personal branding/instansi) dan **ai.andriwulandika.uk** (`tools/` — 8 AI tools untuk dokumen perencanaan ASN, model kredit pay-as-you-go). Status saat ini: **Sprint 1 di `docs/ROADMAP.md` sedang berjalan** (patuh hukum & pengerasan keamanan ringan), berdasarkan temuan `docs/audit/REPO-AUDIT.md`.

## Aturan Kerja Wajib Tiap Sesi

- **Edit selalu di `src/`** (dan `shared/` untuk aset bersama) — **jangan pernah** edit langsung di `site/`/`tools/` (hasil generate, tertimpa saat build berikutnya). Lihat `AGENTS.md` untuk detail build (`npm run build`, `npm run build:pages`).
- Kerja di branch baru, push = preview deployment dulu; **merge ke `main` hanya setelah perintah eksplisit Andri**.
- Commit message & kode dalam **Bahasa Inggris**; dokumen `/docs` dalam **Bahasa Indonesia**.
- Baca `AGENTS.md` untuk aturan teknis lengkap (struktur folder, coding standards, keamanan, definition of done).

## Rujukan Dokumen Fondasi (`/docs`)

- `AI-TEAM-CHARTER.md` — baca sebelum sesi apa pun untuk memahami peran, mandat, dan tingkat kewenangan Claude.
- `AI-ORGANIZATION.md` — baca untuk memahami lane pekerjaan (L1–L4) dan alur kerja standar per sesi.
- `AI-GOVERNANCE.md` — baca sebelum keputusan soal pembayaran, data pengguna/privasi, keamanan, atau deploy produksi.
- `KNOWLEDGE-BASE-v1.1.md` — baca untuk konteks brand, positioning, target pasar, dan keputusan strategis aktif.
- `FASE-5-AUDIT-KIT.md` — rujukan cara menjalankan audit teknis lanjutan via Claude Code.
- `ROADMAP.md` — baca untuk tahu sprint & prioritas kerja yang sedang berjalan.
- `audit/REPO-AUDIT.md` — baca untuk detail temuan teknis, keamanan, dan riset harga yang mendasari roadmap.
