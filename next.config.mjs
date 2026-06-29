/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  experimental: {
    serverComponentsExternalPackages: ['@better-auth/kysely-adapter'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**', // Fixed wildcard syntax
      }
    ],
  },
};

export default nextConfig;