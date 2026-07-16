export const siteConfig = {
  name: "Andri Wulandika",
  url: "https://andriwulandika.uk",
  description:
    "Digital Transformation Consultant untuk pemerintah, BUMN, perusahaan, startup, dan UMKM.",
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  areaServed: "ID",
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Andri Wulandika",
  jobTitle: "Digital Transformation Consultant",
  url: siteConfig.url,
  email: "wulandikaandri@gmail.com",
  worksFor: {
    "@type": "Organization",
    name: "Andri Wulandika",
  },
  knowsAbout: [
    "Digital Transformation",
    "Government Websites",
    "Web Application Development",
    "AI Automation",
    "Perencanaan Pembangunan Daerah",
  ],
  sameAs: [
    "https://www.instagram.com/andri_wulandika",
    "https://www.facebook.com/share/14iNJ1DPhtV/",
    "https://youtube.com/@andriwulandika8408",
  ],
};
