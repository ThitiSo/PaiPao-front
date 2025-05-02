import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'xxxxxxxxxxxxxxxxxxxxxxx/ai/plan', // Target URL
      },
    ]
  },
}
export default nextConfig;
