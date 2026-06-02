'use strict';

const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Kamu adalah penyusun dokumen perencanaan pemerintah daerah Indonesia yang sangat berpengalaman.
Kamu menulis dokumen Rencana Kerja (Renja) OPD untuk Pemerintah Kabupaten Aceh Tenggara, Provinsi Aceh.
Gunakan bahasa Indonesia formal birokrasi pemerintahan yang baku, mengalir, dan profesional.
Jangan gunakan bullet point atau daftar bernomor dalam narasi.
Tulis dalam bentuk paragraf yang mengalir dan kohesif.
Gunakan diksi birokrasi yang tepat seperti: "dalam rangka", "guna mendukung", "sejalan dengan", "memperhatikan", "bahwasanya", "sesuai dengan amanat", "sebagaimana dimaksud", dll.
Referensikan regulasi yang relevan jika sesuai konteks (Permendagri 86/2017, PP 8/2008, UU 23/2014, PP 12/2019).
Panjang narasi sesuai dengan kompleksitas seksi yang diminta.
Setiap paragraf harus memiliki minimal 4-5 kalimat yang saling berkaitan.`;

const MODEL_PRIMARY = 'claude-sonnet-4-5';
const MODEL_FALLBACK = 'claude-3-5-sonnet-20241022';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateFallbackNarasi(sectionName, dataOPD) {
  const namaOPD = dataOPD.namaOPD || 'Organisasi Perangkat Daerah';
  const tahun = dataOPD.tahunRenja || new Date().getFullYear() + 1;
  const kabupaten = dataOPD.kabupaten || 'Aceh Tenggara';

  return `Dalam rangka melaksanakan tugas dan fungsi ${namaOPD} Kabupaten ${kabupaten} pada Tahun Anggaran ${tahun}, telah disusun dokumen perencanaan yang komprehensif dan terstruktur sesuai dengan ketentuan peraturan perundang-undangan yang berlaku. Penyusunan dokumen ini merupakan bagian integral dari sistem perencanaan pembangunan daerah yang mengacu pada Peraturan Menteri Dalam Negeri Nomor 86 Tahun 2017 tentang Tata Cara Perencanaan, Pengendalian dan Evaluasi Pembangunan Daerah.

Sejalan dengan amanat Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah, ${namaOPD} berkewajiban untuk menyusun rencana kerja tahunan yang bersifat operasional dan terukur. Dokumen perencanaan ini merupakan penjabaran dari Rencana Strategis (Renstra) OPD yang telah ditetapkan sebelumnya, sehingga terjaga konsistensi dan kesinambungan program dan kegiatan pembangunan daerah. Memperhatikan berbagai dinamika perubahan lingkungan strategis baik internal maupun eksternal, ${namaOPD} senantiasa berupaya menyesuaikan rencana kerja dengan kondisi aktual yang ada di lapangan.

Guna mendukung pencapaian visi dan misi Bupati Kabupaten ${kabupaten} yang tertuang dalam Rencana Pembangunan Jangka Menengah Daerah (RPJMD), ${namaOPD} menyusun berbagai program dan kegiatan prioritas yang berdampak langsung pada peningkatan kesejahteraan masyarakat. Proses penyusunan dokumen ini telah melalui serangkaian tahapan yang sistematis, mulai dari analisis situasi, identifikasi permasalahan, hingga perumusan alternatif solusi yang tepat sasaran dan berkesinambungan. Dengan demikian, dokumen perencanaan ini diharapkan dapat menjadi pedoman yang efektif dalam pelaksanaan program dan kegiatan selama satu tahun anggaran ke depan.`;
}

async function generateNarasi(sectionName, dataOPD, promptText, retries = 2) {
  const maxTokens = parseInt(process.env.MAX_TOKENS) || 4096;
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const model = attempt === 0 ? MODEL_PRIMARY : MODEL_FALLBACK;

      if (attempt > 0) {
        console.log(`[Claude] Retry ${attempt}/${retries} untuk seksi: ${sectionName}, model: ${model}`);
        await sleep(2000 * attempt);
      } else {
        console.log(`[Claude] Generating narasi: ${sectionName}`);
      }

      const response = await client.messages.create({
        model: model,
        max_tokens: maxTokens,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: promptText
          }
        ]
      });

      if (response.content && response.content.length > 0) {
        const narasi = response.content[0].text;
        console.log(`[Claude] Berhasil generate: ${sectionName} (${narasi.length} karakter)`);
        return narasi;
      }

      throw new Error('Response kosong dari Claude API');
    } catch (error) {
      lastError = error;
      console.error(`[Claude] Error pada attempt ${attempt + 1} untuk ${sectionName}: ${error.message}`);

      if (error.status === 401) {
        throw new Error('API Key tidak valid. Periksa konfigurasi ANTHROPIC_API_KEY.');
      }

      if (attempt < retries) {
        await sleep(2000);
      }
    }
  }

  console.warn(`[Claude] Semua retry gagal untuk ${sectionName}. Menggunakan fallback narasi.`);
  return generateFallbackNarasi(sectionName, dataOPD);
}

module.exports = { generateNarasi };
