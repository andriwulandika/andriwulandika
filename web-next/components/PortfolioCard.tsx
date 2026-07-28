type PortfolioCardProps = {
  category: string;
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export default function PortfolioCard({
  category,
  title,
  href,
  imageSrc,
  imageAlt,
}: PortfolioCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl overflow-hidden bg-zinc-900/40 border border-white/10 hover:border-white/30 transition-all duration-500 block"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-950 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
        />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
          {category}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 p-5">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <span className="w-11 h-11 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
          →
        </span>
      </div>
    </a>
  );
}
