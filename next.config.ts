////zare_nk_050425_okk(1)
import type { NextConfig } from "next";

const nextConfig03: NextConfig = {
  async redirects() {
    return [
      {
        source: "/folder226",        // The path redirect from
        destination: "/folder02",     // The path redirect to
        permanent: true,      // Permanent redirecting
      }
    ];
  },

  images: {
    domains: ['www.w3schools.com', 'www.tutorialspoint.com', 'www.netafraz.com'],
  },
};

export default nextConfig03;