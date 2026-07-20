/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ['raw.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/LiezlC/khayali-xyz/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/curriculum',
        destination: '/curriculum/index.html',
      },
    ];
  },
  async redirects() {
    return [
      // Keep Vercel's project alias out of search results. The public site has
      // one canonical host; every path on the deployment alias belongs there.
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'khayali-xyz.vercel.app',
          },
        ],
        destination: 'https://www.khayali.xyz/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'khayali-xyz-kknl.vercel.app',
          },
        ],
        destination: 'https://www.khayali.xyz/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'khayali-xyz-ipu8.vercel.app',
          },
        ],
        destination: 'https://www.khayali.xyz/:path*',
        permanent: true,
      },
      // Research redirects to domains
      {
        source: '/research',
        destination: '/domains',
        permanent: true,
      },
      {
        source: '/research/esg',
        destination: '/domains/esg-safeguards',
        permanent: true,
      },
      {
        source: '/research/grievance',
        destination: '/domains/grievance-systems',
        permanent: true,
      },
      {
        source: '/research/development-rights',
        destination: '/domains/development-rights',
        permanent: true,
      },
      {
        source: '/research/worker-voice',
        destination: '/domains/worker-voice',
        permanent: true,
      },
      {
        source: '/research/ai-accountability',
        destination: '/domains/ai-accountability',
        permanent: true,
      },
      // Avatar section redirects to research
      {
        source: '/avatar',
        destination: '/domains',
        permanent: true,
      },
      {
        source: '/avatar/grievoice',
        destination: '/grievoice',
        permanent: false,
      },
      {
        source: '/avatar/justdev',
        destination: '/research/justdev',
        permanent: true,
      },
      {
        source: '/research/grievoice',
        destination: '/grievoice',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig
