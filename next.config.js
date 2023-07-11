/** @type {import('next').NextConfig} */

await import("./env.mjs");

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "en.wikipedia.org",
        port: "",
      },
    ],
  },
};

export default nextConfig;
