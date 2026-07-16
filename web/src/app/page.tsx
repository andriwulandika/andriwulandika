import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSceneLazy from "@/components/hero/hero-scene-lazy";
import FadeIn from "@/components/motion/fade-in";
import { serviceCategories } from "@/lib/services";

const targetMarkets = [
  "Pemerintah",
  "BUMN",
  "Perusahaan Swasta",
  "Startup",
  "UMKM",
  "NGO",
];

const stats = [
  { value: "7+", label: "Tahun pengalaman" },
  { value: "51", label: "OPD dikoordinasi" },
  { value: "18", label: "Layanan digital" },
  { value: "8", label: "AI Tools dibangun" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-20 text-center">
        <HeroSceneLazy />
        <p className="mt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Digital Transformation Consultant
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          Dari dokumen ke dampak —
          <br className="hidden sm:block" /> transformasi digital yang{" "}
          <span className="text-primary/70">nyata</span>.
        </h1>
        <p className="mt-6 max-w-xl text-balance text-muted-foreground">
          Website, aplikasi web, dashboard pemerintah, AI automation, hingga
          konsultasi transformasi digital end-to-end — untuk instansi dan
          organisasi yang serius ingin bertransformasi.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/contact">
              Book Consultation <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/services">Lihat Semua Layanan</Link>
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {targetMarkets.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-muted/30">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4">
          {stats.map((s) => (
            <FadeIn key={s.label} className="text-center">
              <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Layanan
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Satu partner, seluruh kebutuhan digital.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dari kehadiran digital pertama sampai sistem operasional yang
            kompleks — dikerjakan oleh satu tim yang memahami konteks
            pemerintah maupun bisnis.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((category, i) => (
            <FadeIn key={category.slug} delay={i * 0.05}>
              <Link
                href={`/services#${category.slug}`}
                className="group block h-full rounded-xl border border-border/60 p-6 transition-colors hover:border-foreground/20 hover:bg-muted/30"
              >
                <p className="font-medium">{category.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground/70 group-hover:text-foreground">
                  Lihat layanan
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border/60 bg-muted/30">
        <FadeIn className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Siap mulai transformasi digital Anda?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Konsultasi awal gratis — ceritakan tantangan Anda, kami bantu
            petakan solusinya.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">
              Book Consultation <ArrowRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </section>
    </>
  );
}
