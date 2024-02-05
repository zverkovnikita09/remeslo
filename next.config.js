/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "remeslo.pisateli-studio.ru" },
    ],
  },
};

module.exports = nextConfig;

