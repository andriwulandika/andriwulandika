import type { Metadata } from "next";
import FadeIn from "@/components/motion/fade-in";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — Book Consultation",
  description:
    "Konsultasi gratis untuk kebutuhan transformasi digital, website, atau sistem Anda.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <FadeIn className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Book a Consultation
        </h1>
        <p className="mt-4 text-muted-foreground">
          Ceritakan tantangan Anda — kami bantu petakan solusi digital yang
          paling relevan. Konsultasi awal gratis, tanpa komitmen.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12">
        <ContactForm />
      </FadeIn>
    </section>
  );
}
