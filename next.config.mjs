/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: false },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['motion'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.drycheck.in',
          },
        ],
        destination: 'https://drycheck.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
