// @ts-check
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig(
  // Base recommended configs
  eslint.configs.recommended,
  tseslint.configs.recommended,
  // Project-level settings
  {
    ignores: [
      ".idea/",
      ".vscode/",
      "node_modules/",
      ".astro/",
      ".next/",
      "dist/",
      "dev-dist/",
      "public/",
      "**/*.d.ts",
      ".cache/",
      ".DS_Store",
      "package.json",
      "package-lock.json",
      "tsconfig.json",
      "next-env.d.ts",
      "next.config.js",
      "postcss.config.js",
      "tailwind.config.js",
    ],
    plugins: { prettier: prettierPlugin },
    rules: {
      // Run Prettier as an ESLint rule and report differences as errors
      "prettier/prettier": "error",
      // Ensure ESLint never fights Prettier on trailing commas or other style
      "comma-dangle": "off",
    },
  },
  // Must be last: turns off all ESLint rules that conflict with Prettier
  eslintConfigPrettier,
);
