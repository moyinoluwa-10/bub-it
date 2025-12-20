import type { Metadata } from "next";

export const siteConfig: Metadata = {
  description: "Create and manage your short URLs with Bub It.",
  keywords: [
    "URL Shortener",
    "Link Shortener",
    "Bub It",
    "Short URLs",
    "Manage Links",
    "Create Short Links",
    "Custom Aliases",
  ],
  authors: [
    {
      name: "Bub It",
      url: "https://www.bub.icu",
    },
  ],
  openGraph: {
    type: "website",
    url: "https://www.bub.icu",
    title: "Bub It - Simple and Fast URL Shortener",
    description: "Create and manage your short URLs with Bub It.",
    siteName: "Bub It",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bub It - Simple and Fast URL Shortener",
    description: "Create and manage your short URLs with Bub It.",
  },
};
