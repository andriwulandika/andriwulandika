import type { NextConfig } from "next";
import path from "path";

const AI_DOMAIN = "https://ai.andriwulandika.uk";

// Halaman yang sudah dimigrasi ke ai.andriwulandika.uk — 301 permanen,
// diport dari site/_redirects lama agar ranking SEO & inbound link tetap hidup
const aiMigratedSlugs = [
  // AI tools
  "sirenja.html",
  "sirkpd.html",
  "siktor.html",
  "silkjip.html",
  "siperda.html",
  "sigendok.html",
  "sibacara.html",
  "sitelaah.html",
  // kredit/monetisasi
  "harga.html",
  "bayar.html",
  "aktifkan-pro.html",
  "panduan-kredit.html",
  "dashboard.html",
  "admin-kode.html",
  // template & regulasi
  "template.html",
  "regulasi.html",
  // artikel
  "cascading-perencanaan-daerah.html",
  "rkpd-dan-perubahan-rkpd.html",
  "sakip-dari-pk-hingga-lkjip.html",
  "indikator-kinerja-utama-smart.html",
  "menyusun-kak-tor.html",
  "nota-dinas-vs-telaahan-staf.html",
  "berita-acara-rapat.html",
  "kesalahan-umum-dokumen-perencanaan.html",
  "cara-pakai-template-dokumen.html",
  "renja-opd-panduan-lengkap.html",
  "renstra-opd-panduan-lengkap.html",
  "mengenal-website-andri-wulandika.html",
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      // www → apex
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.andriwulandika.uk" }],
        destination: "https://andriwulandika.uk/:path*",
        permanent: true,
      },
      // Halaman situs statis lama → padanan barunya
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/jasa.html", destination: "/", permanent: true },
      { source: "/promo.html", destination: "/", permanent: true },
      { source: "/tentang.html", destination: "/about", permanent: true },
      // Alias legacy AI tools
      {
        source: "/tools",
        destination: `${AI_DOMAIN}/sirenja.html`,
        permanent: true,
      },
      {
        source: "/ai-tools",
        destination: `${AI_DOMAIN}/sirenja.html`,
        permanent: true,
      },
      // Konten yang pindah ke subdomain AI
      ...aiMigratedSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `${AI_DOMAIN}/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
