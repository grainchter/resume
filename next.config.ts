import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./shared/config/i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {},
};

export default withNextIntl(nextConfig);