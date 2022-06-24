const path = require('path')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    // domains: ['c1sys.com', 'c1sys.ir'],
    domains: ['https://localhost:3001/'],
    formats: ['image/avif', 'image/webp'],
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  // redirects: async() => {
  //     return [{
  //         source: '/about',
  //         destination: '/',
  //         permanent: true,
  //     }, ]
  // },
  // ignoreBuildErrors: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      loader: 'file-loader',
      options: {
        outputPath: 'images',
      },
    })
    return config
  },
  // publicRuntimeConfig: {
  //   apiUrl:
  //     process.env.NODE_ENV === 'development'
  //       ? 'https://xrealityapi.sinamn75.com/api' // development api
  //       : 'https://xrealityapi.sinamn75.com/api', // production api
  // },
}
