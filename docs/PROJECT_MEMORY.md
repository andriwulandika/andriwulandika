# PROJECT MEMORY

Memori lintas sesi: fakta yang mudah terlupa, konteks historis, "kenapa begini". Tambah entri
di atas (terbaru dulu). Bukan changelog kode (itu `CHANGELOG.md`) — ini *konteks & pelajaran*.

---

### 2026-07-19 — Audit total & pembentukan knowledge base
- Claude ditunjuk sebagai Project/Technical Lead & SSOT. Dilakukan audit read-only penuh repo
  (commit `ccf3491`) → `AUDIT_REPORT.md` + knowledge base `docs/` + roadmap/todo/review/future.
- **Temuan kunci:** fondasi kuat (skor ~7.8/10); penghambat utama = bukti sosial, konsistensi
  pesan (harga "tanpa batas" vs kredit), CSP, CI.
- **Belum diverifikasi runtime** (audit statis): perlu uji live untuk konfirmasi bug fungsional
  & klaim performa. Egress ke situs mungkin dibatasi (AGENTS.md §10).

### Konteks historis penting (dari commit & AGENTS.md)
- **Insiden produksi** akibat build command gagal saat deploy → keputusan serve statis tanpa build
  (ADR-002). Jangan ulangi dengan menaruh build command di Cloudflare tanpa alasan kuat.
- **Migrasi tools ke subdomain** `ai.andriwulandika.uk` (dari path di domain utama) → 301 lengkap
  di `site/_redirects`. Jaga redirect ini.
- **Positioning brand** berevolusi ke "Digital Transformation Consultant" (seri commit `feat(brand)`),
  AI diturunkan dari identitas jadi pendukung (arahan pemilik).
- **Phase 5** memperkenalkan 11ty sebagai authoring tanpa mengubah cara deploy.

### Fakta yang mudah salah
- Yang di-serve = `site/`/`tools/` (BUKAN `src/`). Edit halaman ber-include di `src/`.
- Ada **dua** salinan functions: `src/tools/functions/` & `tools/functions/` — jaga sinkron.
- Nomor WhatsApp resmi tunggal: **62811660568**. Domain kanonik: **andriwulandika.uk**.
- Secret hanya di Cloudflare: `GEMINI_API_KEY`, `CLAUDE_API_KEY`, `ADMIN_PASSWORD`; KV `ACCESS_CODES`.
- GA4 ID: `G-MHKQETVZ2R`.

### Pelajaran
- Deploy sederhana (tanpa build) lebih andal daripada pintar-tapi-rapuh.
- Dedup lewat `shared/` + sync, bukan copy manual.
- Utamakan kepercayaan (kejujuran pesan) — ini brand yang menjual kredibilitas.
</content>
