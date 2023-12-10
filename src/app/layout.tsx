import { Analytics } from "@vercel/analytics/react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import "@/app/globals.css";

import { type Metadata } from "next";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Niklas Fischer",
  description: "The portfolio of Niklas Fischer",
  viewport: "width=device-width, initial-scale=1, minimum-scale=1",
};

// export const viewport: Viewport = {
//   width: "device-width",
//   initialScale: 1,
//   minimumScale: 1,
//   themeColor: "#4f46e5",
// };

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
      </body>
    </html>
  );
}
