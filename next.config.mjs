/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
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