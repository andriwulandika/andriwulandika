"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { primaryNav, siteConfig, bookConsultationHref } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-lg tracking-tight text-foreground"
        >
          Andri Wulandika
          <span className="ml-2 hidden text-xs font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            {siteConfig.tagline}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex">
            <Link href={bookConsultationHref}>
              Book Consultation
              <ArrowUpRight />
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-20 z-40 flex flex-col overflow-y-auto bg-background/98 backdrop-blur-xl"
          >
            <ul className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-1 px-6 py-12">
              {primaryNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-border/60 py-4 font-display text-3xl text-foreground transition-colors hover:text-accent sm:text-4xl"
                  >
                    {item.label}
                    <ArrowUpRight
                      className="size-6 opacity-0 transition-opacity group-hover:opacity-100"
                      strokeWidth={1.5}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
