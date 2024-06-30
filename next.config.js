const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
]

/**
 * @type {import('next').NextConfig}
 */
const moduleExports = {
  output: 'export',
  images: {
    domains: ['console.vcborn.com'],
  },
  /*i18n: {
    locales: ['ko', 'cn', 'en', 'ja'],
    defaultLocale: 'ja',
  },*/
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  publicRuntimeConfig: {
    url: process.env.DIRECTUS_URL,
  },
  serverRuntimeConfig: {
    token: process.env.DIRECTUS_STATIC_TOKEN,
  },
}

module.exports = moduleExports
