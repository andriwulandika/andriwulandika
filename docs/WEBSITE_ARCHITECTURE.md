# WEBSITE ARCHITECTURE (Peta Halaman)

## Situs 1 — andriwulandika.uk (`site/`)
| Halaman | File | Peran |
|---|---|---|
| Beranda | `index.html` (989 br) | hero, layanan, produk, keunggulan, portofolio, harga, proses, FAQ, CTA |
| Tentang | `tentang.html` (636) | profil Andri, otoritas, transformasi digital |
| Layanan Pemerintah | `layanan-pemerintah.html` | website instansi + AI tools, Rp 3,5jt |
| Layanan Bisnis | `layanan-bisnis.html` | landing/profil, Rp 750rb–2jt |
| Produk | `produk.html` | AI Tools + placeholder "Segera Hadir" |
| Promo | `promo.html` | landing jasa (canonical→beranda) |
| Jasa (stub) | `jasa.html` (18 br) | redirect→beranda (via `_redirects`) |
| 404 | `404.html` | halaman error custom |
| Verifikasi Google | `googlea044b9a8efd52fe7.html` | file verifikasi (kosong) |

Navigasi utama: Beranda · Layanan Digital(#layanan) · Produk(#produk) · Paket Harga(#paket) ·
Tentang · CTA Konsultasi(WA).

## Situs 2 — ai.andriwulandika.uk (`tools/`)
- **Beranda:** `index.html` (1462 br).
- **8 SiTool:** sirenja, sirkpd, siktor, silkjip, siperda, sigendok, sibacara, sitelaah.
- **Transaksi:** harga, bayar, aktifkan-pro, panduan-kredit, dashboard, admin-kode(noindex).
- **Aset konten:** template, regulasi.
- **15 artikel panduan:** renja/renstra lengkap, sakip, cascading, rkpd, iku-smart, kak-tor,
  nota-dinas-vs-telaahan, berita-acara, kesalahan-umum, cara-pakai-template, mengenal-website.
- **404.**

## Templating (11ty)
12 halaman `tools/` memakai `{% include %}` dari `src/tools/_includes/` (nav-article,
footer-article, footer-panduan, nav-sitool-minimal). Sisanya passthrough (HTML apa adanya).
Edit halaman ber-include **di `src/tools/`**, lalu `npm run build:pages` (AGENTS.md §3, §5).

## Aturan URL & tautan
- Path relatif konsisten (`assets/...`) agar resolve di kedua domain.
- Flat URL (`foo.html`, bukan `foo/`) dipaksa via `eleventy.factory.js` permalink.
- Perubahan/penghapusan URL **wajib** 301 di `_redirects`.

## Peluang struktur
- Isi/sembunyikan placeholder produk. · Hub page artikel. · `<main>` landmark & skip-link (a11y).
- Pertimbangkan blog `site/` (`BLOG_STRATEGY.md`).

Terkait: `FOLDER_STRUCTURE.md`, `SEO_STRATEGY.md`, `SYSTEM_ARCHITECTURE.md`.
</content>
