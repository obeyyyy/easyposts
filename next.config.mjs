/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/X/:path*', // Adjust this to the correct internal API route
      },
    ];
  },
};

export default nextConfig;
