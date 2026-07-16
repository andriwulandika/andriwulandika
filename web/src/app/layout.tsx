import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/smooth-scroll";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import JsonLd from "@/components/seo/json-ld";
import { organizationJsonLd, personJsonLd } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andriwulandika.uk"),
  title: {
    default: "Andri Wulandika — Digital Transformation Consultant",
    template: "%s — Andri Wulandika",
  },
  description:
    "Digital Transformation Consultant untuk pemerintah, BUMN, perusahaan, startup, dan UMKM. Website, web application, AI automation, hingga konsultasi transformasi digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={personJsonLd} />
        <SmoothScroll>
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
