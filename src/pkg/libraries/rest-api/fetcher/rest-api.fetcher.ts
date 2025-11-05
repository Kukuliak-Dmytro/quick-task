import ky, { type KyInstance } from "ky";

import { envClient } from "@/config/envs";

// fetcher
// this fetcher is used to fetch data from the external api
// cookies are not attached automatically
export const restApiFetcher: KyInstance = ky.create({
  prefixUrl: `${envClient.NEXT_PUBLIC_CLIENT_API_URL}`,

  credentials: "include",
  throwHttpErrors: false,
});
