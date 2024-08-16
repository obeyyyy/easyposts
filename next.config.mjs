/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `http://localhost:3000/api/:path*`, // Adjust to match your backend server URL
        },
      ];
    },
  };
  
  export default nextConfig;
  
