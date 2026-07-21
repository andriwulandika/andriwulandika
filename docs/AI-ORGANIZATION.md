# AI-ORGANIZATION — andriwulandika.uk

**Versi:** 1.1
**Tanggal:** 21 Juli 2026
**Status:** Rujukan internal (organisasi & alur kerja AI).

> **Catatan status file (21 Jul 2026):** ini versi pertama AI-ORGANIZATION yang
> benar-benar **di-commit ke repo**. Master lengkap sebelumnya (dirujuk di
> beberapa dokumen sebagai `AI-ORGANIZATION.md`, mis. §2 untuk lane) berada di
> luar repo dan belum dipindahkan seluruhnya. Nomor bagian mengikuti penomoran
> master agar rujukan lama tetap konsisten; bagian yang belum dipindahkan
> ditandai jelas.

---

## 1. Tujuan

Mendefinisikan bagaimana pekerjaan AI diorganisasi untuk proyek andriwulandika.uk
— siapa mengerjakan apa, di platform mana, dan alur standar tiap sesi — agar
efisien (hemat token) dan patuh matriks kewenangan (lihat `AI-GOVERNANCE.md` §1).

## 2. Lane / Pembagian Dokumen

*(Ringkas — detail master belum dipindahkan ke repo.)* Baca dokumen sesuai
kebutuhan lane: `docs/ROADMAP.md` (sprint aktif), `docs/KNOWLEDGE-BASE.md`
(model bisnis & harga), `CLAUDE.md` (ringkasan operasional & aturan brand),
`AI-GOVERNANCE.md` (kewenangan). Jangan scan seluruh repo bila dokumen fondasi
sudah cukup sebagai konteks.

## 3. Alur Kerja Standar per Sesi

1. **Analisis & konteks.** Baca sprint aktif di `docs/ROADMAP.md` dan dokumen
   fondasi yang relevan dengan tugas. Tentukan lane (lihat §2).
2. **Perencanaan.** Susun rencana kerja & prompt; identifikasi tiap langkah
   masuk kategori otonom / butuh persetujuan / perintah eksplisit
   (`AI-GOVERNANCE.md` §1).
3. **Eksekusi.** Ubah file repo: edit selalu di `src/`, jalankan build
   (`scripts/build-pages.sh`), commit, buka PR.
3a. **Pembagian jenis kerja per platform.** Untuk efisiensi token: diskusi,
   perencanaan, penyusunan prompt, dan ringkasan/laporan status dikerjakan di
   chat Claude.ai (dokumen fondasi sudah tersedia sebagai konteks, tanpa perlu
   scan file berulang). Claude Code dipakai khusus untuk eksekusi yang mengubah
   file repo: edit kode, build, commit, PR. Task ringkasan atau tinjauan status
   tidak diminta ke Claude Code kecuali memang butuh membaca kondisi live repo
   yang belum diketahui di chat.
4. **Checkpoint persetujuan.** Push ke branch = preview (boleh). **Merge ke
   `main` HANYA setelah Andri approve preview.** Keputusan mahal-dibalik
   (stack, pricing, payment) wajib ADR + persetujuan Andri.

## 4. Peran & Model per Jenis Kerja

*(Dipindahkan dari master — belum di-commit.)* Ringkas: Sonnet 4.6 untuk
implementasi rutin; Fable 5 / Opus 4.8 untuk keputusan arsitektur mahal-dibalik
atau ADR kompleks. Detail di `CLAUDE.md` (Model per Jenis Kerja).

## 5. Standar Keluaran

*(Dipindahkan dari master — belum di-commit.)* Kode production-ready, secrets
via env var, commit message jelas, update `docs/ROADMAP.md` di akhir sesi.

## 6. Koordinasi & Handoff

*(Dipindahkan dari master — belum di-commit.)* Status & langkah berikutnya
dicatat di `docs/HANDOFF-CLAUDE-CODE.md` agar sesi berikutnya tahu posisi.

## 7. Riwayat Revisi

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| ≤ 1.0 | — | Master di luar repo (belum di-commit). |
| 1.1 | 21 Jul 2026 | Versi pertama yang di-commit ke repo. Tambah aturan pembagian kerja platform untuk efisiensi token (§3 poin 3a). |
