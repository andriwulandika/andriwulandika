export const siteConfig = {
  name: "Andri Wulandika",
  tagline: "Digital Transformation Consultant",
  url: "https://andriwulandika.uk",
  email: "hello@andriwulandika.uk",
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/about" },
  { label: "Layanan", href: "/services" },
  { label: "Solusi Pemerintah", href: "/government-solutions" },
  { label: "Portofolio", href: "/portfolio" },
  { label: "Studi Kasus", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Template", href: "/templates" },
  { label: "Harga", href: "/pricing" },
  { label: "Kalkulator", href: "/calculator" },
  { label: "AI", href: "/ai" },
  { label: "Kontak", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Layanan",
    items: [
      { label: "Website Development", href: "/services#website" },
      { label: "Dashboard & Web Application", href: "/services#dashboard" },
      { label: "ERP / CRM / GIS", href: "/services#enterprise" },
      { label: "AI Automation", href: "/services#ai" },
      { label: "SEO & Digital Growth", href: "/services#seo" },
    ],
  },
  {
    title: "Perusahaan",
    items: [
      { label: "Tentang Kami", href: "/about" },
      { label: "Studi Kasus", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Kontak", href: "/contact" },
    ],
  },
  {
    title: "Sumber Daya",
    items: [
      { label: "Resources", href: "/resources" },
      { label: "Template", href: "/templates" },
      { label: "Kalkulator Harga", href: "/calculator" },
    ],
  },
];

export const bookConsultationHref = "/book-consultation";
