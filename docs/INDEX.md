# Knowledge Base — Andri Wulandika

**Single Source of Truth (SSOT) strategis & produk** untuk proyek
`andriwulandika/andriwulandika`.

> **Hierarki otoritas dokumen (penting):**
> 1. **Instruksi manusia eksplisit** (pemilik proyek) — selalu menang.
> 2. **`../AGENTS.md`** — konstitusi *engineering/operasional* (arsitektur, build,
>    deploy, coding standard, keamanan implementasi, git). Untuk aturan teknis, AGENTS.md
>    tetap otoritatif; knowledge base ini **tidak menggandakan** melainkan **merujuk**.
> 3. **Knowledge base `docs/`** — SSOT *strategi, brand, produk, roadmap, keputusan*.
> 4. **Kode & isi situs** — implementasi dari 1–3.
>
> Jika terjadi konflik antar-dokumen, itu **cacat yang harus dilaporkan & diselesaikan**,
> bukan diputuskan diam-diam. Lihat `DECISION_LOG.md`.

Tanggal dasar audit: **2026-07-19** · Brand: **Andri Wulandika** ·
Positioning: **Digital Transformation for Government & Business**.

---

## Peta Dokumen

### 0. Audit & Review (potret kondisi)
| Dokumen | Isi |
|---|---|
| [AUDIT_REPORT.md](AUDIT_REPORT.md) | Audit total 24 poin — kondisi, teknologi, temuan, prioritas |
| [QUALITY_REVIEW.md](QUALITY_REVIEW.md) | Review 10 perspektif senior (arsitek, UI, UX, SEO, a11y, security, perf, PM, brand, konsultan) |
| [RISK_REGISTER.md](RISK_REGISTER.md) | Register risiko + mitigasi |

### 1. Strategi & Bisnis
| Dokumen | Isi |
|---|---|
| [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) | Ringkasan proyek satu halaman |
| [VISION.md](VISION.md) · [MISSION.md](MISSION.md) | Visi & misi |
| [BUSINESS_MODEL.md](BUSINESS_MODEL.md) | Model bisnis & aliran pendapatan |
| [POSITIONING.md](POSITIONING.md) | Positioning & pesan inti |
| [TARGET_MARKET.md](TARGET_MARKET.md) · [IDEAL_CUSTOMER_PROFILE.md](IDEAL_CUSTOMER_PROFILE.md) | Pasar & ICP |
| [CUSTOMER_JOURNEY.md](CUSTOMER_JOURNEY.md) | Perjalanan pelanggan |
| [AI_STRATEGY.md](AI_STRATEGY.md) | Peran AI (teknologi pendukung, bukan identitas) |

### 2. Produk & Layanan
| Dokumen | Isi |
|---|---|
| [SERVICES.md](SERVICES.md) · [PRODUCTS.md](PRODUCTS.md) | Katalog layanan & produk |
| [PORTFOLIO_STRATEGY.md](PORTFOLIO_STRATEGY.md) | Strategi portofolio |

### 3. Brand & Desain
| Dokumen | Isi |
|---|---|
| [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) | Logo, warna, tipografi, tone |
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | Token, komponen, pola UI |

### 4. Konten & SEO
| Dokumen | Isi |
|---|---|
| [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md) · [BLOG_STRATEGY.md](BLOG_STRATEGY.md) | Strategi konten & artikel |
| [SEO_STRATEGY.md](SEO_STRATEGY.md) | Strategi SEO teknis & konten |

### 5. Teknis & Operasional
| Dokumen | Isi |
|---|---|
| [TECH_STACK.md](TECH_STACK.md) · [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md) | Stack & arsitektur |
| [WEBSITE_ARCHITECTURE.md](WEBSITE_ARCHITECTURE.md) · [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) | Peta halaman & folder |
| [CODING_STANDARD.md](CODING_STANDARD.md) | Standar koding (merujuk AGENTS.md) |
| [DEPLOYMENT.md](DEPLOYMENT.md) · [SECURITY.md](SECURITY.md) · [PERFORMANCE.md](PERFORMANCE.md) | Deploy, keamanan, performa |

### 6. Eksekusi & Tata Kelola
| Dokumen | Isi |
|---|---|
| [ROADMAP.md](ROADMAP.md) · [MILESTONES.md](MILESTONES.md) | Roadmap 5 milestone |
| [TODO.md](TODO.md) · [CHECKLIST.md](CHECKLIST.md) | Master TODO & checklist production-ready |
| [FUTURE_PLAN.md](FUTURE_PLAN.md) | Rencana 2–3 tahun |
| [PROJECT_RULES.md](PROJECT_RULES.md) | Aturan proyek (kompas keputusan) |
| [DECISION_LOG.md](DECISION_LOG.md) | Log keputusan arsitektural (ADR) |
| [PROJECT_MEMORY.md](PROJECT_MEMORY.md) | Memori proyek lintas sesi |
| [CHANGELOG.md](CHANGELOG.md) | Riwayat perubahan |

---

## Cara memakai knowledge base ini
- **Sebelum mengubah arah/strategi:** baca dokumen terkait + `DECISION_LOG.md`.
- **Sebelum mengubah kode:** baca `../AGENTS.md` (otoritatif teknis) + dokumen domain.
- **Saat mengambil keputusan besar:** catat sebagai ADR baru di `DECISION_LOG.md`.
- **Saat menutup pekerjaan:** perbarui `TODO.md`, `CHANGELOG.md`, `PROJECT_MEMORY.md`.
</content>
</invoke>
