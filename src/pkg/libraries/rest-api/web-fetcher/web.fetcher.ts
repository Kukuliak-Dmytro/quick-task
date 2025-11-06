import ky, { type KyInstance } from "ky";

//constant
/**
 * Fetcher for Next.js API routes.
 */
export const webFetcher: KyInstance = ky.create({
  prefixUrl: "/api",

  credentials: "include",
  throwHttpErrors: false,
});
