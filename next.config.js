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
      // Avatar section redirects to research
      {
        source: '/avatar',
        destination: '/research',
        permanent: true,
      },
      {
        source: '/avatar/grievoice',
        destination: '/grievoice',
        permanent: false, // Non-permanent to allow changes
      },
      {
        source: '/avatar/justdev',
        destination: '/research/justdev',
        permanent: true,
      },
      {
        source: '/research/grievoice',
        destination: '/grievoice',
        permanent: false, // Non-permanent to allow changes
      },
    ];
  },
}

module.exports = nextConfig