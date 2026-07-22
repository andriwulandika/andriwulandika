export default function Hero() {
  return (
    <section className="pt-40 pb-28 md:pt-52 md:pb-36 bg-[#0a0a0a] border-b border-white/[0.08] relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <span className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-[0.2em] mb-8">
          Konsultan Transformasi Digital
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] max-w-5xl">
          Transformasi digital untuk pemerintah &amp; bisnis.
        </h1>

        <p className="text-zinc-400 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mt-8">
          Membantu instansi pemerintah dan bisnis tampil profesional serta
          bekerja lebih cepat — lewat website modern yang mudah ditemukan di
          Google, AI tools, dan pengelolaan media sosial.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <a
            href="https://wa.me/62811660568?text=Halo%20Andri%2C%20saya%20ingin%20konsultasi%20pembuatan%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-all"
          >
            Konsultasi Gratis
          </a>
          <a
            href="#paket"
            className="px-7 py-4 rounded-full border border-white/15 text-white font-semibold text-xs font-mono uppercase tracking-wider hover:border-white/40 transition-all"
          >
            Lihat Paket Harga
          </a>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-wrap gap-12">
          <div>
            <div className="text-3xl font-bold text-white">3–21</div>
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-1">
              Hari pengerjaan
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">Gratis</div>
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-1">
              Hosting selamanya
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">51+</div>
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-1">
              OPD pengalaman koordinasi
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
