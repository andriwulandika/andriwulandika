/**
 * exporters.js — Download dokumen sebagai Word (.doc) atau PDF
 * Tidak membutuhkan backend — sepenuhnya client-side.
 */

/**
 * Download konten HTML sebagai file .doc (Word-compatible)
 * @param {string} htmlContent - innerHTML dari preview
 * @param {string} filename - Nama file tanpa ekstensi
 */
export function downloadWord(htmlContent, filename = 'dokumen') {
  const wordHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'/>
<title>${filename}</title>
<!--[if gte mso 9]>
<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/></w:WordDocument></xml>
<![endif]-->
<style>
  body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; margin: 2.54cm; line-height: 1.5; }
  h1 { font-size: 14pt; font-weight: bold; text-align: center; }
  h2 { font-size: 13pt; font-weight: bold; }
  h3 { font-size: 12pt; font-weight: bold; }
  table { border-collapse: collapse; width: 100%; font-size: 11pt; }
  td, th { border: 1px solid #000; padding: 4pt 6pt; vertical-align: top; }
  th { background: #f0f0f0; font-weight: bold; text-align: center; }
  p { margin: 6pt 0; text-align: justify; }
  .no-print { display: none; }
  @page { size: A4; margin: 2.54cm; }
</style>
</head>
<body>${htmlContent}</body>
</html>`;

  const blob = new Blob(['﻿' + wordHtml], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.replace(/[^a-zA-Z0-9_\- ]/g, '_') + '.doc';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download konten elemen sebagai PDF via html2pdf.js (CDN).
 * Pastikan html2pdf.js sudah di-load di halaman pemanggil.
 * @param {HTMLElement} element - Elemen DOM yang akan di-print
 * @param {string} filename - Nama file tanpa ekstensi
 */
export async function downloadPdf(element, filename = 'dokumen') {
  if (typeof html2pdf === 'undefined') {
    alert('Library PDF belum dimuat. Pastikan koneksi internet aktif.');
    return;
  }
  const opt = {
    margin: [1.5, 1.5, 1.5, 2],
    filename: filename + '.pdf',
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };
  await html2pdf().set(opt).from(element).save();
}
