import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const capabilities = [
  {
    label: "Perencanaan",
    detail: "Renstra & Renja OPD sesuai format daerah",
  },
  {
    label: "Pelaporan",
    detail: "SAKIP, Perjanjian Kinerja, hingga LKjIP",
  },
  {
    label: "Regulasi & Dokumen",
    detail: "KAK/TOR, Nota Dinas, Berita Acara Rapat",
  },
  {
    label: "Monitoring",
    detail: "Dashboard cascading indikator kinerja",
  },
];

export function GovernmentHighlight() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <Badge variant="accent">Government Solutions</Badge>
            <h2 className="mt-5 max-w-lg font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Dipercaya menyusun sistem perencanaan &amp; pelaporan untuk
              instansi daerah
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Rangkaian AI Tools yang kami bangun membantu OPD menyusun
              dokumen perencanaan dan pelaporan kinerja — dari draf hingga
              siap pakai, mengikuti format dan regulasi yang berlaku.
            </p>
            <Link
              href="/government-solutions"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Jelajahi Solusi Pemerintah
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {capabilities.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border/60 bg-card p-6"
              >
                <dt className="font-display text-lg text-foreground">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm text-muted-foreground">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
