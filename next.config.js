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
      // Legacy /grievoice redirect now points to research
      {
        source: '/grievoice',
        destination: '/research/grievoice',
        permanent: true, // 301 permanent redirect
      },
      // Avatar section redirects to research
      {
        source: '/avatar',
        destination: '/research',
        permanent: true,
      },
      {
        source: '/avatar/grievoice',
        destination: '/research/grievoice',
        permanent: true,
      },
      {
        source: '/avatar/justdev',
        destination: '/research/justdev',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig