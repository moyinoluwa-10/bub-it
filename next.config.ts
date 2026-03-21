import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: "/api/data/:match*",
        destination: "https://www.bub.icu/_vercel/insights/:match*",
      },
    ];
  },
};

export default nextConfig;

