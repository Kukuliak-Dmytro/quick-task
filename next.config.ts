import type { NextConfig } from "next";

/**
 * Next.js configuration object.
 *
 * This configuration defines Next.js build and runtime settings including
 * React compiler optimization and standalone output for deployment.
 *
 * @constant nextConfig
 */
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  cacheComponents: true,
};

export default nextConfig;
