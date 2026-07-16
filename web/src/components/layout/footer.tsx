import Link from "next/link";
import { serviceCategories } from "@/lib/services";

const footerColumns = [
  {
    title: "Navigasi",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Layanan",
    links: serviceCategories.map((c) => ({
      href: `/services#${c.slug}`,
      label: c.name,
    })),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold tracking-tight">Andri Wulandika</p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Digital Transformation Consultant — membantu pemerintah, BUMN,
              perusahaan, startup, dan UMKM bertransformasi digital.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Andri Wulandika. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="https://andriwulandika.uk" className="hover:text-foreground">
              Jasa Website
            </Link>
            <Link href="https://ai.andriwulandika.uk" className="hover:text-foreground">
              AI Tools Perencanaan Daerah
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
