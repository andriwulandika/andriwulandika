import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "About",
  description:
    "Andri Wulandika — Digital Transformation Consultant. Perencana Ahli Pertama Bappeda dengan 7+ tahun pengalaman, kini membangun website, sistem, dan AI automation untuk pemerintah dan bisnis.",
};

const credentials = [
  "Anggota aktif Tim Anggaran Pemerintah Daerah (TAPD)",
  "Review teknis DOKA, KAK, RAB seluruh OPD",
  "Menguasai SIPD-RI, e-Monev Bappenas, KRISNA, SAKIP",
  "Terlibat pelaporan Pro-SN dan kebijakan DBH Sawit",
  "Membangun & mengoperasikan 8 AI Tools untuk ASN se-Indonesia",
];

const expertiseChips = [
  "Digital Transformation",
  "Government Systems",
  "Web Development",
  "AI Automation",
  "RPJMD/RKPD/Renstra",
  "SAKIP",
  "Data & GIS",
  "Product Strategy",
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Mitra Transformasi Digital untuk Pemerintah dan Bisnis
        </h1>
        <p className="mt-4 text-muted-foreground">
          Andri Wulandika — Perencana Ahli Pertama yang menghabiskan
          bertahun-tahun di dalam sistem pemerintahan, kini membantu
          organisasi bertransformasi digital dengan pemahaman langsung
          soal bagaimana birokrasi dan bisnis sebenarnya bekerja.
        </p>
      </section>

      {/* Placeholder: cerita personal akan ditulis langsung oleh Andri, bukan digenerasikan */}
      <section className="border-y border-border/60 bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-lg border-2 border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            TODO: Andri akan isi cerita personal di sini
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2">
          <FadeIn>
            <h2 className="text-xl font-semibold">Kredensial</h2>
            <ul className="mt-4 space-y-3">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                  {c}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-xl font-semibold">Bidang Keahlian</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {expertiseChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/30">
        <FadeIn className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Mari diskusikan proyek Anda.
          </h2>
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
