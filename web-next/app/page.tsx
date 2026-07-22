import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioCard from "@/components/PortfolioCard";

const services = [
  {
    title: "Website Pemerintah",
    desc: "Website instansi/OPD/desa sesuai kaidah pemerintah — berita, dokumen publik, PPID.",
    price: "mulai Rp 2,5 juta",
    href: "/layanan-pemerintah",
  },
  {
    title: "Website Bisnis",
    desc: "Landing page & company profile — desain modern, SEO-ready, cepat selesai.",
    price: "mulai Rp 1,2 juta",
    href: "/layanan-bisnis",
  },
  {
    title: "Media Sosial",
    desc: "Konten, caption, desain, dan laporan bulanan — akun bisnismu konsisten tanpa ribet.",
    price: "mulai Rp 600rb/bln",
    href: "/layanan-bisnis#medsos",
  },
  {
    title: "AI Tools",
    desc: "Platform AI untuk mempercepat pekerjaan perencanaan daerah — sistem kredit pay-as-you-go.",
    price: "Lihat produk",
    href: "/produk",
  },
];

const portfolio = [
  {
    category: "UMKM",
    title: "Kopi Senja",
    imageSrc: "/img/template-umkm.webp",
    imageAlt: "Contoh UMKM Kopi Senja",
    href: "/demo-umkm",
  },
  {
    category: "Website Desa",
    title: "Desa Makmur Jaya",
    imageSrc: "/img/template-desa.webp",
    imageAlt: "Contoh Website Desa",
    href: "/demo-desa",
  },
  {
    category: "Instansi / OPD",
    title: "Dinas Kominfo Contoh",
    imageSrc: "/img/template-pemerintah.webp",
    imageAlt: "Contoh Website Instansi/OPD",
    href: "/demo-pemerintah",
  },
  {
    category: "Landing Page",
    title: "KelasCuan",
    imageSrc: "/img/template-landing.webp",
    imageAlt: "Contoh Landing Page",
    href: "/demo-landing",
  },
];

const process = [
  {
    title: "Konsultasi Gratis",
    desc: "Ceritakan kebutuhan via WhatsApp — jenis usaha, target, dan fitur yang diinginkan.",
    dur: "Hari ke-1",
  },
  {
    title: "Brief & Desain Awal",
    desc: "Kami kirim mockup & struktur halaman untuk disetujui sebelum pengerjaan dimulai.",
    dur: "Hari ke-2–4",
  },
  {
    title: "Pengerjaan & Revisi",
    desc: "Website dibangun sesuai brief. Anda pantau progres dan beri masukan tiap tahap.",
    dur: "Hari ke-3–14",
  },
  {
    title: "Launch & Serah Terima",
    desc: "Website live, plus file, akses penuh, dan panduan update konten mandiri.",
    dur: "Sesuai paket",
  },
];

const pricing = [
  {
    tag: "Landing Page",
    amt: "Rp 1,2 jt",
    note: "Bayar sekali, milik Anda selamanya.",
    features: [
      "1 halaman panjang (scroll)",
      "Desain profesional & responsif",
      "Tombol WhatsApp / form kontak",
      "SEO dasar (meta, schema, sitemap)",
      "Hosting gratis + subdomain gratis",
      "Selesai 3–5 hari kerja · 2× revisi",
    ],
    href: "https://wa.me/62811660568?text=Halo%20Andri%2C%20saya%20tertarik%20Paket%20Landing%20Page%20Rp1%2C2juta.%20Boleh%20konsultasi%3F",
    cta: "Pilih Paket Ini",
    featured: false,
  },
  {
    tag: "Website Profil · Paling Populer",
    amt: "Rp 3 jt",
    note: "Domain .com/id opsional (+Rp 150rb/tahun).",
    features: [
      "5–7 halaman (Beranda, Tentang, Layanan, Kontak, dll)",
      "Desain custom sesuai identitas brand",
      "SEO lengkap (meta, OG, schema, sitemap)",
      "Formulir kontak + integrasi WhatsApp",
      "Google Analytics terpasang",
      "Selesai 7–14 hari · revisi sampai puas (maks 3)",
      "Support WhatsApp 1 bulan",
    ],
    href: "https://wa.me/62811660568?text=Halo%20Andri%2C%20saya%20tertarik%20Paket%20Website%20Profil%20Rp3juta.%20Boleh%20konsultasi%3F",
    cta: "Pilih Paket Ini",
    featured: true,
  },
  {
    tag: "Instansi / OPD / Desa",
    amt: "Rp 2,5 jt+",
    note: "Harga menyesuaikan scope kebutuhan.",
    features: [
      "10+ halaman terstruktur",
      "Halaman berita / publikasi (update mandiri)",
      "Struktur sesuai regulasi website pemerintah",
      "Halaman dokumen publik & unduhan",
      "Training penggunaan & update konten",
      "Selesai 14–21 hari · Support WhatsApp 3 bulan",
    ],
    href: "https://wa.me/62811660568?text=Halo%20Andri%2C%20saya%20dari%20instansi%20dan%20tertarik%20Paket%20Website%20Instansi%2FOPD.%20Boleh%20konsultasi%3F",
    cta: "Konsultasi Dulu",
    featured: false,
  },
];

const faqs = [
  {
    q: "Apakah saya perlu tahu coding untuk mengelola website?",
    a: "Tidak sama sekali. Setelah serah terima, kami berikan panduan lengkap cara update teks, ganti gambar, dan tambah konten dasar — semuanya tanpa menyentuh kode.",
  },
  {
    q: "Berapa biaya hosting per bulan?",
    a: "Nol rupiah. Website di-hosting di Cloudflare Pages — platform global gratis tanpa batas bandwidth dan tanpa biaya bulanan.",
  },
  {
    q: "Bisakah ditambah fitur belanja online (e-commerce)?",
    a: "Untuk toko online dengan manajemen produk dan keranjang penuh, sebaiknya diskusi dulu karena butuh backend berbeda. Namun integrasi WhatsApp order bisa kami akomodasi di semua paket.",
  },
  {
    q: "Berapa lama proses pengerjaannya?",
    a: "Landing Page 3–5 hari kerja, Website Profil 7–14 hari kerja, Paket Instansi 14–21 hari kerja.",
  },
];

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
      <span className="text-blue-500 font-mono font-bold">({index})</span>{" "}
      {title}
    </h2>
  );
}

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />
      <Hero />

      {/* LAYANAN */}
      <section id="layanan" className="py-28 md:py-40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading index="01" title="Layanan" />
          <div className="grid gap-4">
            {services.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="group flex flex-wrap items-center gap-6 py-8 border-t border-white/10 last:border-b hover:pl-4 transition-all"
              >
                <span className="text-2xl font-bold text-white w-full md:w-1/3">
                  {s.title}
                </span>
                <span className="text-zinc-400 flex-1 min-w-[200px]">
                  {s.desc}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-blue-500">
                  {s.price}
                </span>
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PORTOFOLIO */}
      <section id="karya" className="py-28 md:py-40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading index="02" title="Portofolio & Template" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.map((p) => (
              <PortfolioCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section id="proses" className="py-28 md:py-40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading index="03" title="Cara Kerja" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]"
              >
                <div className="font-mono text-blue-500 font-bold text-xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-white font-bold mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm">{step.desc}</p>
                <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mt-4">
                  {step.dur}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAKET HARGA */}
      <section id="paket" className="py-28 md:py-40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading index="04" title="Paket Harga" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {pricing.map((p) => (
              <div
                key={p.tag}
                className={`rounded-2xl border p-8 flex flex-col ${
                  p.featured
                    ? "bg-white text-black border-white"
                    : "border-white/10 bg-white/[0.02] text-white"
                }`}
              >
                <span
                  className={`font-mono text-[11px] uppercase tracking-widest mb-3 ${
                    p.featured ? "text-blue-600" : "text-blue-500"
                  }`}
                >
                  {p.tag}
                </span>
                <div className="text-3xl font-bold mb-1">{p.amt}</div>
                <div
                  className={`text-sm mb-6 ${
                    p.featured ? "text-zinc-600" : "text-zinc-400"
                  }`}
                >
                  {p.note}
                </div>
                <ul className="space-y-2 flex-1 border-t border-current/10 pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm flex gap-2">
                      <span className="text-blue-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 text-center px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all ${
                    p.featured
                      ? "bg-black text-white hover:bg-zinc-800"
                      : "border border-white/20 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 md:py-40 border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading index="05" title="FAQ" />
          <div className="divide-y divide-white/10">
            {faqs.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="cursor-pointer list-none flex justify-between items-center text-white font-semibold">
                  {item.q}
                  <span className="text-blue-500 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-zinc-400 mt-4 text-sm leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Siap tampil lebih profesional?
          </h2>
          <p className="text-zinc-400 mb-10">
            Ceritakan kebutuhanmu — konsultasi gratis, respons biasanya dalam
            1–2 jam di hari kerja.
          </p>
          <a
            href="https://wa.me/62811660568?text=Halo%20Andri%2C%20saya%20ingin%20konsultasi."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-zinc-200 transition-all"
          >
            Konsultasi Gratis via WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="font-mono uppercase tracking-wider text-white">
              Andri Wulandika
            </div>
            <p className="text-zinc-500 text-sm mt-2 max-w-xs">
              Digital Transformation Consultant untuk pemerintah &amp; bisnis.
            </p>
          </div>
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            © 2026 Andri Wulandika — Digital Transformation for Government &amp;
            Business
          </div>
        </div>
      </footer>
    </div>
  );
}
