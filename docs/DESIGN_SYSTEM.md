# DESIGN SYSTEM

Status: **de facto, belum terpusat.** Token & komponen hidup sebagai CSS inline per halaman
(terutama `site/index.html` ~450 baris). Dokumen ini mengkodifikasikannya + arah sentralisasi.

## Design tokens (sumber: `:root` di `site/index.html`)
```
--dark #0a0a0f · --dark2 #111118 · --dark3 #16161f
--accent #3b82f6 · --accent2 #6366f1 · --accent-g linear-gradient(135deg,#3b82f6,#6366f1)
--text #f5f5f7 · --text2 #94a3b8 · --text3 #64748b
--border rgba(255,255,255,.08) · --glass rgba(255,255,255,.05) · --glass2 rgba(255,255,255,.08)
--radius 16px · --radius-sm 10px · --shadow 0 20px 60px rgba(0,0,0,.4)
```

## Komponen (pola berulang)
- **Nav** sticky glass + burger < 700px (`#main-nav`, `.nav-links`, `.nav-cta`).
- **Hero** dengan orbs + aurora + shimmer heading + stats bar.
- **Cards**: `.plus-card`, `.layanan-card`, `.price-card`, `.portfolio-card`, `.addon-item` —
  pola konsisten: glass bg + border + hover translateY + shadow (easing `cubic-bezier(.34,1.56,1,1)`).
- **Buttons**: `.btn-wa`/`.btn-wa-hero` (hijau, shimmer), `.btn-outline-white`, `.cta-gradient`.
- **Sections**: `.section-eyebrow` + `.section-title` + `.section-sub`.
- **FAQ** accordion (button + max-height), **process** timeline, **final CTA** gradient.
- **Chrome global** (via `shared/js/ui-enhance.js`): scroll-progress bar + back-to-top, memakai
  `:where()` zero-specificity agar tak menimpa style halaman. Idempoten, reduced-motion aware.

## Pola animasi
`reveal`/`reveal-dN` (fade-up saat scroll), hover lift, shimmer/aurora dekoratif. **Wajib**
dibungkus `@media (prefers-reduced-motion: reduce)` (sudah dilakukan di homepage) — pertahankan.

## Aksesibilitas desain (aturan)
- Target tap ≥ 44px (tombol to-top 44–46px ✔). Fokus terlihat pada elemen interaktif.
- Kontras minimal WCAG AA; audit `--text3` pada teks kecil.
- Sertakan `aria-label`/`aria-hidden` sesuai (nav & ikon dekoratif).

## Utang & arah (→ `TODO.md`)
- **Masalah:** token & komponen terduplikasi inline lintas halaman `site/` → sulit ubah brand.
- **Arah (bertahap, no visual change):** ekstrak `shared/css/tokens.css` + komponen inti,
  sinkronkan via `sync-assets.sh` (pola sama seperti `shared/js`). Lakukan hanya untuk pola yang
  **benar-benar identik** (AGENTS.md §9), verifikasi byte-diff output.
- Idealnya: satu SSOT token yang dipakai kedua situs → konsistensi otomatis.

Terkait: `BRAND_GUIDELINES.md`, `CODING_STANDARD.md`, `PERFORMANCE.md`.
</content>
