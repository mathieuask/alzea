import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alzéa - Mobilité Internationale",
  description: "Votre passerelle vers la mobilité internationale. Stages, visas, logements - on s'occupe de tout.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Script
          id="hs-script-loader"
          src="//js.hs-scripts.com/26697335.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
