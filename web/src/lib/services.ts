import type { LucideIcon } from "lucide-react";
import {
  Globe,
  FileText,
  Building2,
  Landmark,
  LayoutDashboard,
  AppWindow,
  Boxes,
  Users,
  Map,
  Activity,
  Bot,
  Workflow,
  Sparkles,
  Search,
  Palette,
  Server,
  Wrench,
  Compass,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  icon: LucideIcon;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  description: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "web-digital-presence",
    name: "Web & Digital Presence",
    description:
      "Kehadiran digital pertama yang membangun kepercayaan — dari landing page sampai website instansi.",
    services: [
      {
        slug: "website-development",
        name: "Website Development",
        shortDescription: "Website custom dari nol, sesuai kebutuhan spesifik organisasi Anda.",
        icon: Globe,
      },
      {
        slug: "landing-page",
        name: "Landing Page",
        shortDescription: "Satu halaman fokus konversi untuk produk, kampanye, atau acara.",
        icon: FileText,
      },
      {
        slug: "company-profile",
        name: "Company Profile",
        shortDescription: "Profil perusahaan yang membangun kredibilitas di depan klien & mitra.",
        icon: Building2,
      },
      {
        slug: "government-website",
        name: "Government Website",
        shortDescription: "Website instansi pemerintah sesuai standar keterbukaan informasi publik.",
        icon: Landmark,
      },
    ],
  },
  {
    slug: "web-applications-systems",
    name: "Web Applications & Systems",
    description:
      "Sistem yang menjalankan operasional harian — bukan sekadar tampilan, tapi alat kerja sungguhan.",
    services: [
      {
        slug: "dashboard-pemerintah",
        name: "Dashboard Pemerintah",
        shortDescription: "Visualisasi data & indikator kinerja untuk pengambilan keputusan.",
        icon: LayoutDashboard,
      },
      {
        slug: "web-application",
        name: "Web Application",
        shortDescription: "Aplikasi web custom untuk proses bisnis yang tidak tercakup software umum.",
        icon: AppWindow,
      },
      {
        slug: "erp",
        name: "ERP",
        shortDescription: "Sistem perencanaan sumber daya terintegrasi lintas unit kerja.",
        icon: Boxes,
      },
      {
        slug: "crm",
        name: "CRM",
        shortDescription: "Kelola relasi pelanggan/mitra dari satu tempat, mudah ditelusuri.",
        icon: Users,
      },
      {
        slug: "gis",
        name: "GIS",
        shortDescription: "Pemetaan & analisis data spasial untuk perencanaan wilayah.",
        icon: Map,
      },
      {
        slug: "monitoring-dashboard",
        name: "Monitoring Dashboard",
        shortDescription: "Pantau metrik operasional secara real-time dalam satu layar.",
        icon: Activity,
      },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    description: "Manfaatkan AI untuk mempercepat kerja, bukan sekadar tren.",
    services: [
      {
        slug: "ai-chatbot",
        name: "AI Chatbot",
        shortDescription: "Asisten percakapan otomatis untuk layanan pelanggan & lead generation.",
        icon: Bot,
      },
      {
        slug: "ai-automation",
        name: "AI Automation",
        shortDescription: "Otomasi proses berulang dengan AI — hemat waktu tim Anda.",
        icon: Workflow,
      },
      {
        slug: "prompt-engineering",
        name: "Prompt Engineering",
        shortDescription: "Rancang prompt & alur kerja AI yang konsisten dan andal.",
        icon: Sparkles,
      },
    ],
  },
  {
    slug: "growth-operations",
    name: "Growth & Operations",
    description: "Memastikan yang sudah dibangun ditemukan, dipakai, dan tetap sehat.",
    services: [
      {
        slug: "seo",
        name: "SEO",
        shortDescription: "Optimasi agar situs Anda ditemukan orang yang tepat di Google.",
        icon: Search,
      },
      {
        slug: "ui-ux",
        name: "UI/UX",
        shortDescription: "Desain antarmuka yang jelas, mudah dipakai, dan enak dipandang.",
        icon: Palette,
      },
      {
        slug: "hosting",
        name: "Hosting",
        shortDescription: "Infrastruktur cepat & aman, dikelola tanpa Anda harus pusing teknis.",
        icon: Server,
      },
      {
        slug: "maintenance",
        name: "Maintenance",
        shortDescription: "Perawatan berkala supaya sistem tetap jalan lancar dan aman.",
        icon: Wrench,
      },
    ],
  },
  {
    slug: "consulting",
    name: "Consulting",
    description: "Pendampingan strategis, bukan cuma eksekusi teknis.",
    services: [
      {
        slug: "digital-transformation-consulting",
        name: "Digital Transformation Consulting",
        shortDescription:
          "Pendampingan transformasi digital end-to-end untuk instansi & organisasi.",
        icon: Compass,
      },
    ],
  },
];

export const allServices: Service[] = serviceCategories.flatMap((c) => c.services);
