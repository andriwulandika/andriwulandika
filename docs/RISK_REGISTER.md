# RISK REGISTER

Skor = Dampak (1–5) × Kemungkinan (1–5). Urut dari tertinggi. Perbarui saat kondisi berubah.

| ID | Risiko | D | K | Skор | Mitigasi | Pemilik | Status |
|---|---|---|---|---|---|---|---|
| R1 | **Konversi rendah** karena bukti sosial tipis (portofolio/testimoni) | 5 | 4 | 20 | Kumpulkan studi kasus + testimoni nyata; perkuat portofolio (`PORTFOLIO_STRATEGY.md`) | Pemilik | Terbuka |
| R2 | **Janji ≠ kenyataan**: harga tools "tanpa batas" vs kredit → komplain/reputasi | 4 | 4 | 16 | Selaraskan copy/model (OPEN-1) segera | Pemilik | Terbuka (P0) |
| R3 | **Bus factor 1**: satu orang, satu WA, satu admin password, kode di localStorage | 5 | 3 | 15 | Dokumentasi (KB ini), backup akses admin, rotasi password, rencana kontinuitas | Pemilik | Mitigasi berjalan |
| R4 | **Biaya token AI** membengkak (demo gratis / lonjakan) | 4 | 3 | 12 | Rate-limit (ada), pantau biaya, pastikan harga kredit menutup token, captcha bila perlu | Pemilik | Terpantau |
| R5 | **Ketergantungan API pihak ke-3** (kuota/harga/kebijakan Gemini/Claude) | 4 | 3 | 12 | Multi-provider+fallback (ada); abstraksi `_lib.js`; pantau perubahan API | Claude/Pemilik | Terpantau |
| R6 | **Drift dual-source** (`src/` vs output; `src/tools/functions` vs `tools/functions`) | 3 | 4 | 12 | Disiplin edit di sumber; CI diff `dist/`↔output (CI-01) | Claude | Terbuka |
| R7 | **Tanpa CSP** → risiko XSS bila ada input tak tersanitasi di klien | 4 | 2 | 8 | Rancang CSP report-only→enforce (OPEN-2); audit titik injeksi | Claude | Terbuka |
| R8 | **Pembayaran manual** tak scalable → drop-off & beban admin | 3 | 3 | 9 | Perlancar alur WA; evaluasi self-serve (OPEN-5) | Pemilik | Terbuka |
| R9 | **Klaim performa tak terbukti** ("PageSpeed 100") | 2 | 3 | 6 | Ukur PSI/Lighthouse; simpan bukti atau lunakkan klaim | Claude | Terbuka |
| R10 | **Deploy salah-config** ("semua 404") | 4 | 1 | 4 | Prosedur AGENTS.md §8; Root/Output benar; rollback Cloudflare | Pemilik | Terkendali |
| R11 | **Kehilangan data KV** (kode/kredit) | 4 | 1 | 4 | Backup/export berkala daftar kode (admin list); dokumentasi model data | Pemilik | Terbuka |
| R12 | **Regulasi perencanaan berubah** → konten/tools usang | 3 | 3 | 9 | Pantau regulasi; perbarui `regulasi.html`, template, prompt | Pemilik | Terpantau |
| R13 | **Kepatuhan/PII**: data sensitif pemerintah masuk prompt AI | 4 | 2 | 8 | Disclaimer, tak menyimpan prompt, edukasi pengguna (`AI_STRATEGY.md`) | Pemilik | Terpantau |

## Tinjauan
Tinjau ulang tiap milestone (`MILESTONES.md`) atau saat insiden. Risiko baru → tambah baris + ADR
bila memicu keputusan.
</content>
