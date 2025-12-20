import type { Metadata } from "next";
import "./globals.css";
import "../styles/sass/main.scss";
import Provider from "./provider";
import { siteConfig } from "@/configs/site-config";

export const metadata: Metadata = {
  title: {
    template: `%s | Bub It`,
    default: `Bub It - Simple and Fast URL Shortener`,
  },
  ...siteConfig,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

