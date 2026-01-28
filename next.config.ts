import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [450, 500, 550, 600, 640, 720, 768, 800, 900, 1024, 1080, 1200, 1400, 1920, 2048, 3840],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  async redirects() {
    return [
      {
        source:
          "/assignments/BADITP/Konzeption_eines_Lasten-_und_Pflichtenhefts_f%C3%BCr_eine_betriebsinterne_Softwareloesung.pdf",
        destination:
          "/assignments/BADITP/Konzeption-eines-Lastenhefts-und-Pflichtenhefts-fuer-eine-betriebsinterne-Softwareloesung-%28Projektbericht%29.pdf",
        permanent: true,
      },
      {
        source: "/assignments/ANS43/Big_Data_und_Prozessmanagement_im_Unternehmenseinsatz.pdf",
        destination: "/assignments/ANS43/Big-Data-und-Prozessmanagement-im-Unternehmenseinsatz.pdf",
        permanent: true,
      },
      {
        source:
          "/assignments/DIT61/Blockchain_-_eine_erfolgreiche_Technologie_auch_au%C3%9Ferhalb_des_FinTech-Sektors.pdf",
        destination:
          "/assignments/DIT61/Blockchain---eine-erfolgreiche-Technologie-auch-ausserhalb-des-FinTech-Sektors.pdf",
        permanent: true,
      },
      {
        source: "/assignments/DIT62/KI%E2%80%93Top-Technologie_f%C3%BCr_Start-Ups.pdf",
        destination: "/assignments/DIT62/KI-–-Top-Technologie-fuer-Start-ups.pdf",
        permanent: true,
      },
      {
        source: "/assignments/PER25/Herausforderungen_der_Personalentwicklung_im_Zeitalter_der_Digitalisierung.pdf",
        destination:
          "/assignments/PER25/Herausforderungen-der-Personalentwicklung-im-Zeitalter-der-Digitalisierung.pdf",
        permanent: true,
      },
      {
        source:
          "/assignments/PER26/Personalf%C3%BChrung_im_digitalen_Zeitalter_Merkmale_und_Bedeutung_der_Ambidextrie.pdf",
        destination:
          "/assignments/PER26/Personalfuehrung-im-digitalen-Zeitalter-Merkmale-und-Bedeutung-der-Ambidextrie.pdf",
        permanent: true,
      },
      {
        source: "/assignments/SQF20/Visualisierung_in_einer_Praesentation.pdf",
        destination:
          "/assignments/SQF20/Bedeutung-und-Methoden-der-Visualisierung-von-Inhalten-in-einer-Praesentation.pdf",
        permanent: true,
      },
      {
        source: "/assignments/SWE61/Konzeption_einer_Benutzerdokumentation.pdf",
        destination: "/assignments/SWE61/Konzeption-einer-Benutzerdokumentation.pdf",
        permanent: true,
      },
      {
        source: "/assignments/DIT41/Digitalisierung_und_Geschaeftsmodell-Innovation.pdf",
        destination: "/assignments/DIT41/Digitalisierung-und-Geschaeftsmodell-Innovation.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
