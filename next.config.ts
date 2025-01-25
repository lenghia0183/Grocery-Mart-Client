import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: '@svgr/webpack' }],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
