# CHANGELOG

Mengikuti semangat [Keep a Changelog] & Conventional Commits. Perubahan **kode/situs** dicatat di
sini; konteks/pelajaran di `PROJECT_MEMORY.md`. Entri terbaru di atas.

## [Unreleased] — branch `claude/andri-website-audit-f5al9b`
### Added
- **Knowledge Base `docs/`** (Phase Audit): AUDIT_REPORT, QUALITY_REVIEW, RISK_REGISTER,
  ROADMAP, MILESTONES, TODO, CHECKLIST, FUTURE_PLAN, dan dokumen strategi/brand/teknis/tata-kelola
  yang saling terhubung (INDEX.md sebagai peta). Tanpa perubahan kode situs.

## Riwayat sebelum audit (ringkas, dari `git log`)
- `fix(brand)` selaraskan navigasi & footer lintas halaman (#47).
- `feat(brand)` rombak halaman About ke positioning Digital Transformation Consultant (#46).
- `feat(brand)` tambah halaman Products + reposisi AI Tools di homepage; ringkas section Layanan (#44).
- `feat(brand)` 2 landing page Services (Pemerintah & Bisnis) (#43); perkuat messaging & CTA homepage.
- `seo(site)` canonical `promo.html` → beranda (atasi duplicate content).
- `perf(phase6)` defer analytics.js (tak render-blocking).
- `feat(phase5)` perkenalkan 11ty sebagai build/authoring, tanpa ubah cara deploy.
- `fix(security)` pengerasan admin: constant-time compare & rate-limit.

## Cara memakai
Setiap PR yang mengubah situs → tambahkan entri di [Unreleased] (Added/Changed/Fixed/Removed/
Security). Saat merge ke `main`/rilis → beri tanggal & pindahkan ke versi.

[Keep a Changelog]: https://keepachangelog.com/
</content>
