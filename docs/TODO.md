# MASTER TODO

Dikelompokkan Critical → High → Medium → Low → Future. Tiap tugas: **Tujuan · Prioritas ·
Estimasi · Dependensi · Status · Progress**. Status: ☐ pending · ◐ in-progress · ☑ done.
Sinkron dengan `ROADMAP.md`, `CHECKLIST.md`, `RISK_REGISTER.md`, `DECISION_LOG.md` (OPEN-#).

> Estimasi = jam kerja fokus 1 orang (kasar). Tugas yang mengubah tampilan/perilaku pengguna atau
> backend = **butuh persetujuan pemilik** (AGENTS.md §18) — ditandai 🔒.

---

## CRITICAL (kepercayaan/korektnes — kerjakan lebih dulu)
| ID | Tujuan | Prio | Est | Dependensi | Status | Progress |
|---|---|---|---|---|---|---|
| C1 🔒 | Selaraskan pesan harga tools "tanpa batas" → model kredit (ubah copy `harga.html`/`aktifkan-pro.html`, atau sediakan paket unlimited nyata) | Critical | 2–4j | Keputusan OPEN-1 | ☐ | Diidentifikasi di audit |
| C2 | Hapus halaman `noindex` (bayar/aktifkan-pro/admin-kode) dari `tools/sitemap.xml` | Critical | 0.5j | — | ☐ | — |
| C3 🔒 | Isi atau sembunyikan placeholder "Produk Digital Berikutnya" (jangan tampil kosong) | Critical | 1–2j | OPEN-6 | ☐ | — |

## HIGH (konversi, keamanan, proses)
| ID | Tujuan | Prio | Est | Dependensi | Status | Progress |
|---|---|---|---|---|---|---|
| H1 🔒 | Portofolio nyata + 2–3 testimoni (dengan izin) di homepage/layanan | High | 4–8j | input klien | ☐ | `PORTFOLIO_STRATEGY.md` |
| H2 🔒 | Content-Security-Policy: mulai `Report-Only`, audit, lalu enforce | High | 4–6j | OPEN-2 | ☐ | banyak inline → hati-hati |
| CI-01 🔒 | GitHub Actions: `node --check`, cek link/asset, diff `dist/`↔output, secret scan | High | 3–5j | OPEN-3 (tooling approval) | ☐ | tak ada CI saat ini |
| H3 | Verifikasi klaim performa (Lighthouse/PSI), simpan baseline di `PERFORMANCE.md`; lunakkan klaim bila perlu | High | 1–2j | akses runtime | ☐ | — |
| H4 | Rapikan 4× `google-site-verification` di homepage | High | 0.5j | — | ☐ | — |

## MEDIUM (SEO+, performa, maintainability)
| ID | Tujuan | Prio | Est | Dependensi | Status | Progress |
|---|---|---|---|---|---|---|
| M1 | Schema `Article`+`FAQPage`+`BreadcrumbList` di 15 artikel & halaman FAQ | Medium | 4–6j | — | ☐ | `SEO_STRATEGY.md` |
| M2 | Optimasi gambar: webp/avif, resize, `loading=lazy`, `width/height`, preload hero | Medium | 3–5j | — | ☐ | aset PNG berat |
| M3 🔒 | Ekstraksi token/komponen CSS ke `shared/css` (bertahap, no visual change) | Medium | 6–10j | OPEN-4 | ☐ | `DESIGN_SYSTEM.md` |
| M4 | `lastmod` sitemap akurat (idealnya otomatis saat build) | Medium | 1–2j | CI-01 | ☐ | — |
| M5 | Perkuat interlink artikel↔tool↔jasa + hub page artikel | Medium | 3–5j | — | ☐ | — |
| M6 | Pastikan `src/tools/functions` ≡ `tools/functions` (skrip/CI cek drift) | Medium | 1–2j | CI-01 | ☐ | `FOLDER_STRUCTURE.md` |

## LOW (a11y polish, kosmetik, higiene)
| ID | Tujuan | Prio | Est | Dependensi | Status | Progress |
|---|---|---|---|---|---|---|
| L1 | Skip-to-content link + landmark `<main>` konsisten | Low | 1–2j | — | ☐ | — |
| L2 | Audit kontras WCAG AA (`--text3`), sesuaikan bila gagal | Low | 1–2j | — | ☐ | — |
| L3 | `aria-hidden` untuk ikon emoji dekoratif | Low | 1j | — | ☐ | — |
| L4 | Seragamkan path aset (relatif vs absolut) di homepage | Low | 0.5j | — | ☐ | — |
| L5 | Pecah halaman raksasa `sigendok.html` (2512 br) bila memungkinkan | Low | 2–4j | — | ☐ | — |

## FUTURE (butuh keputusan bisnis / lintas milestone) — lihat `FUTURE_PLAN.md`
| ID | Tujuan | Prio | Est | Dependensi | Status |
|---|---|---|---|---|---|
| F1 🔒 | Self-serve payment (evaluasi gateway) + akun/email | Future | besar | OPEN-5, volume | ☐ |
| F2 | Paket maintenance/retainer bulanan (pendapatan berulang) | Future | sedang | keputusan bisnis | ☐ |
| F3 | RAG grounding regulasi untuk AI tools | Future | besar | riset | ☐ |
| F4 | Portal klien / dashboard analitik penggunaan | Future | besar | F1 | ☐ |
| F5 | Knowledge center / produk konten berbayar | Future | sedang | konten | ☐ |
| F6 | Blog bisnis di `site/` (akuisisi ICP-3) | Future | sedang | — | ☐ |

## Cara pakai
Ambil dari atas ke bawah dalam tiap grup (prioritas AGENTS.md §16). Update Status/Progress saat
bergerak; selesai → catat di `CHANGELOG.md` & centang `CHECKLIST.md`. Tugas 🔒 tunggu pemilik.
</content>
