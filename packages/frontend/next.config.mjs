/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  // generateBuildId: async () => {
  //   next build시, 어플리케이션 버전 명시
  //   return;
  // },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    // 용량이 큰 패키지 명시하면 실제 사용하는 모듈만 로딩하여 최적화
    optimizePackageImports: [],
  },
};

if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
  nextConfig.compiler = {
    removeConsole: {
      exclude: ["error", "warn"],
    },
  };
}

export default nextConfig;
