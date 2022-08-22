/** @type {import('next').NextConfig} */
let {merge} = require('webpack-merge');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { topLevelAwait: true };
    // config.experiments.topLevelAwait = true
    return config;
  },
}

module.exports = nextConfig
