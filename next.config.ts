import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://1d39-2405-9800-b650-8e6e-31c4-ed20-7180-a1d5.ngrok-free.app/ai/plan', // Target URL
      },
    ]
  },
}
export default nextConfig;
