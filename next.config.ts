import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  typescript: {
    // ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'food-cms.grab.com',
      'd1sag4ddilekf6.cloudfront.net',
      'www.crispoconfetti.com',
      'img.freepik.com',
      'hitly.vn',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: '@svgr/webpack' }],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
