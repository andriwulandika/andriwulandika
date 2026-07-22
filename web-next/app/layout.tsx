import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Transformation untuk Pemerintah & Bisnis | Andri Wulandika",
  description:
    "Konsultan transformasi digital untuk instansi pemerintah & bisnis. Website profesional yang SEO-ready dan AI tools yang mempercepat pekerjaan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className="bg-[#0a0a0a] text-zinc-100 font-sans antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
