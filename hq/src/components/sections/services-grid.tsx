import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    title: "Website & Landing Page",
    description:
      "Website bisnis, company profile, hingga landing page dengan performa dan SEO kelas atas.",
    href: "/services#website",
  },
  {
    title: "Website & Dashboard Pemerintah",
    description:
      "Profil OPD, dashboard monitoring, dan sistem perencanaan-pelaporan yang sesuai kebutuhan instansi.",
    href: "/government-solutions",
  },
  {
    title: "ERP, CRM & GIS",
    description:
      "Sistem operasional dan pemetaan spasial yang terintegrasi dengan proses bisnis Anda.",
    href: "/services#enterprise",
  },
  {
    title: "AI Chatbot & Automation",
    description:
      "Otomasi proses kerja dan prompt engineering yang dirancang untuk kebutuhan riil organisasi.",
    href: "/services#ai",
  },
  {
    title: "SEO & UI/UX",
    description:
      "Riset, strategi konten, dan desain antarmuka untuk membangun otoritas digital jangka panjang.",
    href: "/services#seo",
  },
  {
    title: "Hosting, Maintenance & Consulting",
    description:
      "Pendampingan transformasi digital berkelanjutan, dari infrastruktur hingga strategi.",
    href: "/services#consulting",
  },
];

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Layanan
          </p>
          <h2 className="mt-3 max-w-lg font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Satu mitra untuk seluruh kebutuhan digital Anda
          </h2>
        </div>
        <Link
          href="/services"
          className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          Lihat semua layanan
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link key={service.title} href={service.href} className="group block h-full">
            <Card className="h-full border-border/60 transition-colors group-hover:border-accent/60">
              <CardContent className="flex h-full flex-col justify-between gap-8">
                <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-accent" />
                <div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {service.description}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
