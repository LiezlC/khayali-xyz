const { execFileSync } = require('node:child_process')
// Freeze the source identity in the build, rather than resolving HEAD at request time.
const buildRevision = process.env.VERCEL_GIT_COMMIT_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { KHAYALI_BUILD_REVISION: buildRevision },
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
        source: '/your-song',
        destination: '/your-song/index.html',
      },
      {
        source: '/utopai',
        destination: '/utopai/index.html',
      },
      {
        source: '/seedforge',
        destination: '/seedforge/index.html',
      },
      // Two redirects below point at /grievoice, which is a static folder in
      // public/. Next does not resolve directory indexes there, so without this
      // the bare path 404s.
      {
        source: '/grievoice',
        destination: '/grievoice/index.html',
      },
    ];
  },
  async rewrites() {
    const beforeFiles = Object.entries(require("./legacy-image-urls.json")).map(([source, destination]) => ({
      source,
      destination,
    }));
    return { beforeFiles };
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
      {
        source: '/writings/data-dragons-story',
        destination: '/data-dragons',
        permanent: false,
      },
      {
        source: '/writings/:slug*',
        destination: '/blogs',
        permanent: false,
      },
      {
        source: '/chats/:slug*',
        destination: '/blogs',
        permanent: false,
      },
      {
        source: '/ai-village/:slug*',
        destination: '/labs',
        permanent: false,
      },
      // Preserve direct links into folders excluded from the Vercel upload.
      ...require('node:fs').readFileSync(require('node:path').join(__dirname, '.vercelignore'), 'utf8')
        .split(/\r?\n/)
        .filter(path => path.startsWith('/public/applets/'))
        .map(path => ({
          source: path.slice('/public'.length, -1) + '/:path*',
          destination: '/playspace',
          permanent: false,
        })),
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
