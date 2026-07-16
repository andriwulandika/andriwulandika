import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Paket website transparan mulai Rp 750rb, dan konsultasi khusus untuk sistem/aplikasi yang lebih kompleks.",
};

const tiers = [
  {
    name: "Landing Page",
    price: "Rp 750rb",
    description: "Promosi produk, jasa, atau acara dalam satu halaman.",
    featured: false,
    features: [
      "1 halaman panjang (scroll)",
      "Desain profesional & responsif",
      "SEO dasar",
      "Hosting gratis",
      "Selesai 3–5 hari kerja",
    ],
  },
  {
    name: "Website Profil",
    price: "Rp 2jt",
    description: "Kehadiran online lengkap untuk bisnis atau organisasi.",
    featured: true,
    features: [
      "5–7 halaman",
      "Desain custom sesuai brand",
      "SEO lengkap + Analytics",
      "Formulir kontak terintegrasi",
      "Selesai 7–14 hari kerja",
    ],
  },
  {
    name: "Instansi / OPD",
    price: "Rp 3,5jt",
    description: "Website komprehensif untuk lembaga pemerintah.",
    featured: false,
    features: [
      "10+ halaman terstruktur",
      "Halaman berita/publikasi",
      "Sesuai regulasi website pemerintah",
      "Training penggunaan",
      "Selesai 14–21 hari kerja",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Pricing
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Transparan untuk website, custom untuk sistem.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Paket website punya harga tetap. Untuk web application, ERP/CRM/GIS,
          AI automation, atau konsultasi transformasi digital, kami buatkan
          penawaran sesuai scope kebutuhan Anda.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.05}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border p-6",
                  tier.featured
                    ? "border-foreground/20 bg-muted/40 shadow-sm"
                    : "border-border/60",
                )}
              >
                {tier.featured && (
                  <span className="mb-3 w-fit rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-background">
                    Paling Populer
                  </span>
                )}
                <p className="font-medium">{tier.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tier.description}
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight">
                  {tier.price}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-foreground/60" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-6"
                  variant={tier.featured ? "default" : "outline"}
                >
                  <Link href="/contact">Pilih Paket Ini</Link>
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-16 rounded-xl border border-border/60 bg-muted/30 p-8 text-center">
          <p className="font-medium">Butuh Web Application, ERP, CRM, GIS, atau AI Automation?</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Layanan ini bergantung pada scope & kompleksitas — kami siapkan
            penawaran setelah memahami kebutuhan Anda.
          </p>
          <Button asChild className="mt-6">
            <Link href="/contact">
              Konsultasi & Dapatkan Penawaran <ArrowRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </section>
    </>
  );
}
