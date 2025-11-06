import ky, { type KyInstance } from "ky";

import { envClient } from "@/config/envs";

//constant
/**
 * Fetcher for external API calls.
 */
export const restApiFetcher: KyInstance = ky.create({
  prefixUrl: `${envClient.NEXT_PUBLIC_CLIENT_API_URL}`,

  credentials: "include",
  throwHttpErrors: false,
});
