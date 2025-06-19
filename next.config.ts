import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
        search: '?v=4',
      },
    ],
  },
}


const nextConfig: NextConfig = {
  /* config options here */
  
};

export default nextConfig;
