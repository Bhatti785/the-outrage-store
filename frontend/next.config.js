/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
    unoptimized: true,
  },
  swcMinify: false,
}

module.exports = nextConfig
