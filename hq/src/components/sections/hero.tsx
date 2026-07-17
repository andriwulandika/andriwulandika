"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bookConsultationHref } from "@/lib/site-config";

const audiences = [
  "Pemerintah",
  "BUMN",
  "Perusahaan Swasta",
  "Startup",
  "UMKM",
  "NGO",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 pt-32 pb-20 lg:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 10%, oklch(0.78 0.14 85 / 18%), transparent 60%), radial-gradient(50% 45% at 90% 30%, oklch(0.78 0.14 85 / 10%), transparent 60%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="flex flex-wrap gap-2"
        >
          {audiences.map((label) => (
            <Badge key={label} variant="outline">
              {label}
            </Badge>
          ))}
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className="mt-8 max-w-4xl font-display text-[13vw] leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Transformasi digital yang{" "}
          <span className="text-accent italic">terukur</span>, bukan sekadar
          tampilan.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Andri Wulandika membantu instansi pemerintah, BUMN, dan bisnis
          merancang website, dashboard, sistem, dan otomasi AI yang benar-benar
          dipakai — dari perencanaan hingga eksekusi.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button asChild variant="accent" size="lg">
            <Link href={bookConsultationHref}>
              Book a Consultation
              <ArrowUpRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">Lihat Paket &amp; Harga</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
