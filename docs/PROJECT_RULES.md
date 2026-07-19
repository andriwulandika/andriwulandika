# PROJECT RULES

Kompas keputusan. Ringkas & mengikat. Otoritas teknis penuh = `../AGENTS.md`.

## Aturan emas
1. **Hierarki otoritas:** instruksi manusia > AGENTS.md (teknis) > knowledge base `docs/` (strategi)
   > kode. Konflik = cacat yang dilaporkan, bukan diputuskan diam-diam.
2. **AI = pendukung, bukan identitas.** (`AI_STRATEGY.md`, `POSITIONING.md`)
3. **Jujur.** Tidak ada klaim tanpa bukti, tidak ada janji yang tak ditepati implementasi
   (mis. "tanpa batas" vs kredit). Tidak memfabrikasi portofolio/testimoni.
4. **Hemat & statis.** Nol dependency runtime; jangan tambah framework/bundler/payment gateway
   tanpa keputusan manusia.
5. **Keamanan dulu.** Secret tak pernah di-commit; input divalidasi; endpoint admin terlindungi.

## Yang boleh diputuskan sendiri (Claude) — AGENTS.md §17
Perbaikan mekanis risiko rendah dalam scope disetujui, verifikasi statis/lokal, dokumentasi,
PR draft, pemilihan urutan/nama sesuai konvensi.

## Yang WAJIB menunggu manusia — AGENTS.md §18
Merge ke `main`/deploy produksi · ubah Cloudflare/DNS · tambah dependency/framework/tooling ·
refactor besar/arsitektur/model data KV · ubah backend pembayaran/kredit/admin · fitur baru atau
perubahan tampilan/perilaku yang terlihat pengguna · tindakan sulit dibalik.

## Definition of Done — AGENTS.md §15
Scope tepat · `npm run build` sukses & reproducible · JS lolos `node --check` · HTML valid ·
tak ada broken link/asset baru · tak ada build-output ter-commit · Conventional Commits & push ·
PR draft · ringkasan jujur.

## Prioritas pekerjaan — AGENTS.md §16
Keamanan → produksi rusak → korektnes → konsistensi/dedup → performa → kosmetik.

## Aturan dokumentasi (knowledge base)
- Keputusan besar → ADR di `DECISION_LOG.md`. Selesai kerja → update `TODO.md`, `CHANGELOG.md`,
  `PROJECT_MEMORY.md`. Jaga dokumen saling terhubung & tidak saling bertentangan.
</content>
