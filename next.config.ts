// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // クライアントサイドに node モジュールが含まれないようにする
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       stream: false,
  //       crypto: false,
  //       http: false,
  //       https: false,
  //       os: false,
  //       url: false,
  //       zlib: false,
  //       path: false,
  //       net: false,
  //     }

  //     // firebase-admin を除外
  //     //config.externals = config.externals || []
  //     //config.externals.push('firebase-admin')
  //   }
  //   return config
  // },
}

export default nextConfig
