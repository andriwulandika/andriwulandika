import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/motion/fade-in";
import { serviceCategories } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "18 layanan digital: website development, web application, ERP/CRM/GIS, AI automation, SEO, hingga digital transformation consulting.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Services
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Seluruh layanan digital, satu partner.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Dikelompokkan berdasarkan kebutuhan — dari kehadiran digital
          pertama sampai sistem operasional yang kompleks.
        </p>
      </section>

      {serviceCategories.map((category, categoryIndex) => (
        <section
          key={category.slug}
          id={category.slug}
          className={
            categoryIndex % 2 === 1
              ? "scroll-mt-24 border-y border-border/60 bg-muted/30"
              : "scroll-mt-24"
          }
        >
          <div className="mx-auto max-w-6xl px-6 py-16">
            <FadeIn className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {category.name}
              </h2>
              <p className="mt-2 text-muted-foreground">{category.description}</p>
            </FadeIn>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <FadeIn key={service.slug} delay={i * 0.05}>
                    <div
                      id={service.slug}
                      className="scroll-mt-24 h-full rounded-xl border border-border/60 bg-background p-6"
                    >
                      <Icon className="size-5 text-foreground/70" aria-hidden="true" />
                      <p className="mt-4 font-medium">{service.name}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {service.shortDescription}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          Tidak yakin butuh yang mana?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Ceritakan tantangan Anda — kami bantu petakan layanan yang paling
          relevan.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/contact">
            Book Consultation <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
    </>
  );
}
