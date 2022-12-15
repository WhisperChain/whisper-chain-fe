/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ipfs.w3s.link',
      },
      {
        protocol: 'https',
        hostname: 'cdn.stamp.fyi',
        pathname: '/avatar/**'
      },
      {
        protocol: 'https',
        hostname: 'i.picsum.photos',
        pathname: '/id/**'
      },
      {
        protocol: 'https',
        hostname: 'plg-whisperchain-xyz.s3.amazonaws.com',
        pathname: '/stability/**'
      },
      {
        protocol: 'https',
        hostname: 'whisperchain-static.quick-poc.com',
      }
    ],
  },

  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
}
