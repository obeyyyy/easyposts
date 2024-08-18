/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `https://easyposts-oubayes-projects.vercel.app/X`, // Adjust to match your backend server URL
        },
      ];
    },
  };
  
  export default nextConfig;
  
