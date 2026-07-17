import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { footerNav, siteConfig, bookConsultationHref } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="flex flex-col justify-between gap-10 border-b border-border/60 pb-16 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
              Siap membawa transformasi digital ke instansi atau bisnis Anda?
            </p>
          </div>
          <Link
            href={bookConsultationHref}
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-accent px-6 py-3 font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Book a Consultation
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 pt-16 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-lg text-foreground">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{siteConfig.tagline}</p>
          </div>
          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {group.title}
              </p>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. Seluruh hak cipta dilindungi.</p>
          <p>{siteConfig.email}</p>
        </div>
      </div>
    </footer>
  );
}
