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
  async redirects() {
    return [
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