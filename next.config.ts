import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  ,
  experimental: {
    allowedDevOrigins: ['*'],
  } as any,
};

export default withNextIntl(nextConfig);

// export default nextConfig;
