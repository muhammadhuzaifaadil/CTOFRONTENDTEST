import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
   // Disable the Next.js default bottom-left "Next" button
  devIndicators: false
 
};

export default withNextIntl(nextConfig);

// export default nextConfig;