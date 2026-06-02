'use strict';

function promptEvaluasiPelaksanaan(data) {
  const namaOPD = data.namaOPD || 'OPD';
  const kabupaten = data.kabupaten || 'Aceh Tenggara';
  const tahunRenja = data.tahunRenja || new Date().getFullYear() + 1;
  const tahunEvaluasi = data.tahunEvaluasi || (tahunRenja - 2);

  const capaian = data.capaianTahunLalu || {};
  const persentaseCapaian = capaian.persentaseCapaian || 80;
  const programTercapai = capaian.programTercapai || 0;
  const programTidakTercapai = capaian.programTidakTercapai || 0;
  const kendala = capaian.kendala || 'keterbatasan anggaran dan sumber daya manusia';
  const tindakLanjut = capaian.tindakLanjut || 'peningkatan kapasitas dan optimalisasi anggaran';

  const programsText = capaian.programs && capaian.programs.length > 0
    ? capaian.programs.map(p =>
        `Program ${p.namaProgram}: Target ${p.target || '-'}, Realisasi ${p.realisasi || '-'}, Capaian ${p.persentaseCapaian || 0}%`
      ).join('; ')
    : 'program-program yang telah dilaksanakan pada tahun evaluasi';

  return `Tuliskan narasi Evaluasi Pelaksanaan Renja untuk Bab II dalam dokumen Rencana Kerja (Renja) Tahun ${tahunRenja} milik ${namaOPD} Kabupaten ${kabupaten}, Provinsi Aceh.

Data evaluasi pelaksanaan Renja Tahun ${tahunEvaluasi}:
- Persentase capaian keseluruhan: ${persentaseCapaian}%
- Jumlah program yang tercapai: ${programTercapai} program
- Jumlah program yang tidak tercapai: ${programTidakTercapai} program
- Detail program: ${programsText}
- Kendala yang dihadapi: ${kendala}
- Tindak lanjut: ${tindakLanjut}

Narasi harus terdiri dari 3-4 paragraf yang membahas:

Paragraf 1: Gambaran umum pelaksanaan Renja Tahun ${tahunEvaluasi}, konteks evaluasi, dan metodologi penilaian capaian kinerja sesuai Permendagri 86/2017.

Paragraf 2: Uraian capaian program secara keseluruhan dengan persentase ${persentaseCapaian}%, program-program yang berhasil mencapai target (${programTercapai} program), dan apresiasi terhadap pencapaian tersebut.

Paragraf 3: Uraian program yang tidak mencapai target (${programTidakTercapai} program) dan kendala-kendala yang dihadapi: "${kendala}".

Paragraf 4: Langkah-langkah tindak lanjut dan rekomendasi perbaikan: "${tindakLanjut}" sebagai bahan masukan penyusunan Renja Tahun ${tahunRenja}.

Gunakan bahasa Indonesia formal birokrasi yang baku, mengalir, dan naratif. Tidak menggunakan bullet point.`;
}

function promptAnalisisKinerja(data) {
  const namaOPD = data.namaOPD || 'OPD';
  const kabupaten = data.kabupaten || 'Aceh Tenggara';
  const tahunRenja = data.tahunRenja || new Date().getFullYear() + 1;
  const tahunEvaluasi = data.tahunEvaluasi || (tahunRenja - 2);

  const capaian = data.capaianTahunLalu || {};
  const kendala = capaian.kendala || 'keterbatasan anggaran, sumber daya manusia yang terbatas, dan dinamika kebijakan';
  const persentaseCapaian = capaian.persentaseCapaian || 80;

  return `Tuliskan narasi Analisis Kinerja Pelayanan untuk Bab II dalam dokumen Rencana Kerja (Renja) Tahun ${tahunRenja} milik ${namaOPD} Kabupaten ${kabupaten}, Provinsi Aceh.

Konteks: Capaian kinerja Tahun ${tahunEvaluasi} sebesar ${persentaseCapaian}% dengan kendala: "${kendala}".

Narasi harus terdiri dari 2-3 paragraf yang menganalisis:

Paragraf 1 - Faktor pendorong pencapaian kinerja:
- Komitmen pimpinan dan aparatur ${namaOPD}
- Dukungan anggaran yang memadai dari APBD Kabupaten ${kabupaten}
- Koordinasi yang baik dengan stakeholder terkait
- Pemanfaatan teknologi informasi dalam pengelolaan program

Paragraf 2 - Faktor penghambat kinerja:
- Kendala teknis dan non-teknis yang dihadapi: "${kendala}"
- Dinamika perubahan kebijakan yang mempengaruhi pelaksanaan program
- Keterbatasan kapasitas aparatur dalam pelaksanaan kegiatan tertentu

Paragraf 3 - Rekomendasi peningkatan kinerja:
- Strategi mengatasi hambatan yang teridentifikasi
- Upaya peningkatan kapasitas dan inovasi pelayanan
- Penguatan sistem monitoring dan evaluasi internal

Gunakan bahasa analitis yang formal dan naratif, hindari penggunaan bullet point.`;
}

module.exports = { promptEvaluasiPelaksanaan, promptAnalisisKinerja };
