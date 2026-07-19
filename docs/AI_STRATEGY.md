# AI STRATEGY

> **Prinsip utama (dari pemilik): AI adalah teknologi pendukung, bukan identitas utama brand.**
> Brand = *Digital Transformation Consultant*. AI memperkuat, tidak mendominasi narasi.

## Peran AI hari ini
1. **Mesin produk AI Tools** (`tools/`): generator dokumen perencanaan.
   - **Demo (gratis):** Google Gemini (`gemini-2.5-flash`, fallback `-lite`), thinking dimatikan
     agar output tak terpotong, hasil dipotong ~700 char.
   - **Berbayar:** Anthropic Claude (`claude-sonnet-4-6`, fallback `claude-haiku-4-5`).
   - Fallback antar-model saat 429; validasi & clamp parameter; kredit dipotong hanya bila sukses.
     Implementasi: `tools/functions/_lib.js`. Rincian model: patuhi `DECISION_LOG.md`.
2. **Nilai jual layanan:** AI tools sebagai add-on/pembeda untuk klien pemerintah (paket instansi).

## Prinsip penggunaan AI (tata kelola)
- **Kejujuran:** jangan mengklaim AI menjamin kebenaran/kepatuhan dokumen. Pengguna tetap
  bertanggung jawab (disclaimer). Draf = titik awal, bukan hasil final.
- **Keamanan & privasi:** prompt pengguna diproxy ke penyedia; **jangan** menyimpan/mengekspos
  data sensitif; jangan taruh secret di klien (sudah dijaga — `SECURITY.md`).
- **Biaya terkendali:** demo gratis dijaga rate-limit; harga kredit harus menutup biaya token
  (termasuk demo) — lihat `BUSINESS_MODEL.md`.
- **Netralitas model:** arsitektur multi-provider (Gemini/Claude) → hindari lock-in; mudah tambah/tukar.

## Peta jalan AI (selaras `FUTURE_PLAN.md`, urutan setelah situs utama beres)
1. **Kualitas & template**: prompt engineering per jenis dokumen, contoh few-shot dari template repo.
2. **Retrieval regulasi**: grounding ke basis regulasi (RAG) agar output makin patuh & terkini.
3. **AI tools baru** sesuai permintaan ASN (mis. matriks cascading otomatis, review dokumen).
4. **Integrasi ke layanan**: fitur AI opsional untuk website klien (chat bantuan, generator konten).
5. **Dashboard/analitik** penggunaan untuk pengambilan keputusan produk.

## Batasan tegas
- AI **tidak** menjadi tagline/identitas utama di `site/`.
- Tidak menambah dependency runtime klien untuk AI (tetap via Functions server-side).
- Tidak meluncurkan fitur AI baru yang mengorbankan biaya/keamanan tanpa keputusan (`DECISION_LOG.md`).

Terkait: `PRODUCTS.md`, `SYSTEM_ARCHITECTURE.md`, `SECURITY.md`, `BUSINESS_MODEL.md`.
</content>
