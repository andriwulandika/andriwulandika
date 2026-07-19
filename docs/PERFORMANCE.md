# PERFORMANCE

## Postur (kuat secara arsitektur)
- Statis + Cloudflare edge CDN global. Aset immutable cache (`max-age=31536000, immutable`),
  HTML `max-age=0, must-revalidate` (update instan). Script `defer`. System fonts (nol web-font).
- `prefers-reduced-motion` dihormati (animasi mati).

## Temuan & peluang (→ `TODO.md`)
| Area | Temuan | Aksi | Prioritas |
|---|---|---|---|
| **Klaim** | Homepage "PageSpeed 100" & "loading <1 detik" **belum diverifikasi** | Jalankan Lighthouse/PSI mobile+desktop, simpan skor di sini; atau lunakkan klaim | P1 |
| **Gambar** | PNG berat di `shared/brand/` (wallpaper ~300KB×2, logo 60–67KB) | Konversi **webp/avif**, resize tepat, `loading="lazy"` non-kritis, `width/height` eksplisit (hindari CLS) | P2 |
| **CSS inline** | ~450 baris CSS inline/halaman → HTML besar, tak ter-cache lintas halaman | Ekstrak token/komponen ke `shared/css` (bertahap, no visual change) | P2 |
| **Hero** | Aset/latar hero belum di-`preload` | `<link rel=preload>` untuk aset kritis; pastikan LCP cepat | P2 |
| **Font** | System font (baik). Bila kelak web-font | Wajib `preload` + `font-display: swap` | — |
| **JS pihak ke-3** | GA4 async | OK; pertimbangkan konsistensi & konsen bila perlu | P3 |

## Core Web Vitals (target)
- **LCP** < 2.5s · **CLS** < 0.1 · **INP** < 200ms (mobile, koneksi rata-rata Indonesia).
- Ukur nyata (field data GA4/CrUX bila tersedia), bukan hanya lab.

## Proses
- Jadikan Lighthouse bagian checklist rilis besar (`CHECKLIST.md`) & idealnya CI (Lighthouse CI).
- Simpan baseline skor + tanggal di dokumen ini setiap pengukuran.

## Baseline pengukuran
_(Belum ada — isi setelah menjalankan PSI/Lighthouse. Format: tanggal · halaman · LCP/CLS/INP ·
skor Perf/A11y/SEO.)_

Terkait: `DESIGN_SYSTEM.md`, `SEO_STRATEGY.md` (CWV = faktor SEO), `AUDIT_REPORT.md` #10/#21.
</content>
