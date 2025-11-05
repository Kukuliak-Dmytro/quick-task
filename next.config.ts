import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// i18n
const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/pkg/libraries/locale/request.ts",
});

/**
 * Next.js configuration object.
 *
 * This configuration defines Next.js build and runtime settings including
 * React compiler optimization.
 *
 * @constant nextConfig
 */
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
