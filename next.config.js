/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "remeslo.pisateli-studio.ru" },
    ],
  },
 /*  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'] */
};

module.exports = nextConfig;

