// eleventy.factory.js — Factory bersama untuk config 11ty site/ dan tools/.
//
// Filosofi integrasi (penting): 11ty di sini murni alat AUTHORING lokal/CI.
// Output-nya (dist/<target>/) diverifikasi byte-identik lalu disalin kembali
// menimpa folder site/ atau tools/ yang sudah ter-commit — folder itu tetap
// jadi apa yang benar-benar di-deploy Cloudflare Pages, TANPA mengubah Root
// Directory / Build Command / Output Directory yang sudah terbukti stabil.
// Ini sengaja menghindari mengulang risiko yang pernah menyebabkan insiden
// produksi sebelumnya (build command yang gagal jalan saat deploy).
//
// templateFormats: ['html'] berarti SEMUA .html diproses lewat Nunjucks, tapi
// untuk halaman yang tidak memakai tag {% %}/{{ }} (mayoritas halaman bespoke
// di repo ini), output-nya tetap byte-identik dengan input — sudah diverifikasi
// tidak ada halaman yang mengandung sintaks tersebut secara tidak sengaja.

const PASSTHROUGH_BY_TARGET = {
  site: ['assets', '_headers', '_redirects', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'og-image.png', 'og-image-jasa.png'],
  tools: ['assets', 'functions', '_headers', '_redirects', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'og-image.png'],
};

module.exports = function makeConfig(target) {
  return function (eleventyConfig) {
    for (const item of PASSTHROUGH_BY_TARGET[target]) {
      eleventyConfig.addPassthroughCopy(`src/${target}/${item}`);
    }

    // PENTING: tanpa ini, 11ty menghasilkan "pretty URL" (foo.html -> foo/index.html)
    // secara default -- akan merusak semua tautan internal yang menunjuk ke
    // "foo.html". Paksa output tetap flat, path & nama file sama persis dengan input.
    eleventyConfig.addGlobalData('permalink', () => '{{ page.filePathStem }}.html');

    return {
      dir: {
        input: `src/${target}`,
        output: `dist/${target}`,
      },
      templateFormats: ['html'],
      htmlTemplateEngine: 'njk',
      markdownTemplateEngine: 'njk',
    };
  };
};
