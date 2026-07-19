# DECISION LOG (ADR)

Catatan keputusan arsitektural/strategis. Format ringan. Keputusan besar (AGENTS.md §18) **harus**
dicatat di sini + persetujuan pemilik. Nomor menaik; jangan hapus, tandai *Superseded* bila diganti.

> Sebagian ADR di bawah adalah **rekonstruksi** dari kondisi repo/riwayat commit & AGENTS.md
> (bukan dibuat saat keputusan diambil). Ditandai *(rekonstruksi)*.

---

### ADR-001 — Arsitektur statis + serverless, tanpa framework runtime *(rekonstruksi)*
- **Status:** Diterima (berlaku).
- **Konteks:** butuh biaya rendah, cepat, aman, bisa dirawat 1 orang.
- **Keputusan:** HTML/CSS/JS vanilla + Cloudflare Pages/Functions/KV; nol dependency runtime.
- **Konsekuensi:** cepat & murah; tapi CSS terduplikasi, tanpa CMS. Lihat `TECH_STACK.md`.

### ADR-002 — Deploy tanpa build command (serve `site/`/`tools/` apa adanya) *(rekonstruksi)*
- **Status:** Diterima. **Konteks:** insiden produksi akibat build command gagal saat deploy.
- **Keputusan:** commit hasil generate; Cloudflare serve statis; 11ty hanya authoring lokal/CI.
- **Konsekuensi:** deploy anti-gagal; tapi dual-source (`src/`+output) berisiko drift. `AGENTS.md §8`.

### ADR-003 — 11ty sebagai authoring/build (Phase 5) *(rekonstruksi)*
- **Status:** Diterima (disetujui eksplisit sebagai satu-satunya build dep selain sharp).
- **Keputusan:** `src/` sumber, include untuk klaster nav/footer identik; output flat URL; disalin
  menimpa `site/`/`tools/`. **Tidak** berjalan saat deploy.

### ADR-004 — Backend AI multi-provider + sistem kredit pay-as-you-go *(rekonstruksi)*
- **Status:** Diterima. **Keputusan:** demo=Gemini, berbayar=Claude, fallback saat 429; kredit
  1/dokumen, dipotong hanya bila sukses; kode langganan lama dihormati. `SYSTEM_ARCHITECTURE.md`.

### ADR-005 — Pengerasan keamanan admin (constant-time + rate-limit) *(rekonstruksi)*
- **Status:** Diterima (commit `aee1017`). Fail-closed rate-limit, fail-safe kredit.

### ADR-006 — Positioning "Digital Transformation Consultant", AI sebagai pendukung
- **Status:** Diterima (arahan pemilik + commit seri `feat(brand)`). Tagline resmi ditetapkan.
  `POSITIONING.md`, `AI_STRATEGY.md`.

---

## Keputusan TERBUKA (butuh persetujuan pemilik)
| # | Keputusan | Opsi | Rekomendasi |
|---|---|---|---|
| OPEN-1 | Pesan harga tools "tanpa batas" vs pay-as-you-go | (a) ubah copy ke kredit; (b) tawarkan paket unlimited nyata | (a) segera, evaluasi (b) nanti |
| OPEN-2 | Adopsi CSP | report-only dulu → enforce | Ya, mulai report-only |
| OPEN-3 | Tambah CI (GitHub Actions) | ya/tidak (AGENTS.md §11 butuh approval tooling) | Ya, ringan & read-only checks |
| OPEN-4 | Sentralisasi CSS token ke `shared/css` | ya/tidak (refactor besar → approval) | Ya, bertahap no-visual-change |
| OPEN-5 | Self-serve payment gateway | manual vs gateway | Evaluasi biaya/volume dulu (Future) |
| OPEN-6 | Isi vs sembunyikan placeholder "Produk Berikutnya" | isi/sembunyikan | Sembunyikan sampai ada produk nyata |

Setiap OPEN yang diputuskan → jadikan ADR baru + update dokumen terkait.
</content>
