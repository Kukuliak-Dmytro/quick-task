import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

// env server
export const envServer = createEnv({
  server: {
    DATABASE_URL: z.string().min(1, { message: "DATABASE_URL is required" }),
    BETTER_AUTH_SECRET: z
      .string()
      .min(1, { message: "BETTER_AUTH_SECRET is required" }),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  },
});
