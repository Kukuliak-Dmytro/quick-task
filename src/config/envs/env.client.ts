import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

// env client
export const envClient = createEnv({
  client: {
    // front end url(current app url)
    NEXT_PUBLIC_CLIENT_WEB_URL: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_CLIENT_WEB_URL is required" }),
    // back end url(rest api url)
    NEXT_PUBLIC_CLIENT_API_URL: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_CLIENT_API_URL is required" }),
    // base url for auth client
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_CLIENT_WEB_URL: process.env.NEXT_PUBLIC_CLIENT_WEB_URL,
    NEXT_PUBLIC_CLIENT_API_URL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
  },
});
