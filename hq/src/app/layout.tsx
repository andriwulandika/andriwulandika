import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";

import "./globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const siteUrl = "https://andriwulandika.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Andri Wulandika — Digital Transformation Consultant",
    template: "%s — Andri Wulandika",
  },
  description:
    "Digital Headquarters Andri Wulandika: konsultan transformasi digital untuk Pemerintah, BUMN, perusahaan swasta, startup, UMKM, dan NGO — website, dashboard pemerintah, ERP/CRM, GIS, AI automation, hingga SEO.",
  keywords: [
    "digital transformation consultant",
    "konsultan transformasi digital",
    "website pemerintah",
    "dashboard pemerintah",
    "jasa pembuatan website",
    "AI automation",
    "GIS",
    "ERP",
    "CRM",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Andri Wulandika",
    title: "Andri Wulandika — Digital Transformation Consultant",
    description:
      "Digital Headquarters Andri Wulandika: konsultan transformasi digital untuk Pemerintah, BUMN, perusahaan swasta, startup, UMKM, dan NGO.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andri Wulandika — Digital Transformation Consultant",
    description:
      "Digital Headquarters Andri Wulandika: konsultan transformasi digital untuk Pemerintah, BUMN, perusahaan swasta, startup, UMKM, dan NGO.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`dark ${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
