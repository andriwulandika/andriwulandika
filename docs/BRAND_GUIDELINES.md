# BRAND GUIDELINES

## Identitas
- **Nama brand:** Andri Wulandika
- **Positioning:** Digital Transformation Consultant for Government & Business
- **Tagline resmi:** *Digital Transformation for Government & Business*
- **Kepribadian:** profesional, tepercaya, modern, membumi (praktisi), jujur. Bukan "hype AI".

## Logo & aset (`shared/brand/` — SSOT, disalin oleh `sync-assets.sh`)
| Aset | File |
|---|---|
| Logo lockup (warna/putih) | `logo-lockup.svg`, `logo-lockup-white.svg`, `logo-lockup.png` |
| Logo badge | `logo-badge.svg`, `logo-badge-1024.png` |
| Logo mark (black/white/gradient) | `logo-mark-*.svg`, `*-1024.png` |
| Favicon | `favicon.svg`, `favicon.ico`, `favicon-32.png`, `favicon-512.png` |
| Apple touch icon | `apple-touch-icon.png` |
| Wallpaper | `wallpaper-desktop-1920x1080.png`, `wallpaper-phone-1080x1920.png` |
**Aturan:** ubah logo/ikon **hanya di `shared/brand/`**, lalu `npm run build`. Jangan edit salinan
di `site/assets/` atau `tools/assets/` (akan tertimpa).

## Warna (dari token homepage — SSOT visual, lihat `DESIGN_SYSTEM.md`)
| Token | Nilai | Pakai |
|---|---|---|
| `--dark` | `#0a0a0f` | latar utama |
| `--dark2` `--dark3` | `#111118` `#16161f` | latar section/kartu |
| `--accent` | `#3b82f6` (biru) | aksi/tautan |
| `--accent2` | `#6366f1` (indigo) | aksen sekunder |
| `--accent-g` | gradient biru→indigo | tombol/heading |
| `--text` `--text2` `--text3` | `#f5f5f7` `#94a3b8` `#64748b` | teks utama/sekunder/tersier |
- WhatsApp hijau `#25D366` khusus tombol WA.
- ⚠️ Uji kontras `--text3` pada teks kecil (WCAG AA) — lihat `QUALITY_REVIEW.md` (a11y).

## Tipografi
System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (nol web-font =
cepat). Heading tebal (700–800), letter-spacing negatif untuk kesan modern. Pertahankan; bila
kelak pakai web-font, wajib `preload` + `font-display: swap` (`PERFORMANCE.md`).

## Tone of voice
- Bahasa Indonesia, jelas, tanpa jargon berlebih. Manfaat dulu, teknologi belakangan.
- Untuk pemerintah: hormat, patuh kaidah. Untuk bisnis: energik, berorientasi hasil.
- **AI disebut sebagai alat pendukung**, tidak pernah sebagai identitas (`AI_STRATEGY.md`).

## Konsistensi brand — aturan
- Satu nomor WhatsApp: **62811660568**. Satu domain kanonik: `andriwulandika.uk`.
- Nama & jabatan konsisten dengan JSON-LD (`Person`) & About.
- Perubahan brand besar (warna/logo/tagline) → catat di `DECISION_LOG.md` + update `DESIGN_SYSTEM.md`.
</content>
