import ky, { type KyInstance } from "ky";

// fetcher
// this fetcher is used to fetch data from the next.js api routes
// cookies are attached automatically
export const webFetcher: KyInstance = ky.create({
  prefixUrl: "/api",

  credentials: "include",
  throwHttpErrors: false,
});
