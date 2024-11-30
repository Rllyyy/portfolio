import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import "@/app/globals.css";

import { type Viewport, type Metadata } from "next";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Niklas Fischer",
  description: "The portfolio of Niklas Fischer",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: "#4f46e5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
