/** @type {import('next').NextConfig} */
let {merge} = require('webpack-merge');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
