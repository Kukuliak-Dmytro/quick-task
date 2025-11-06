import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/pkg/libraries/drizzle";
import { envServer } from "@/config/envs";

//constant
/**
 * Better Auth configuration with Drizzle adapter.
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: envServer.BETTER_AUTH_SECRET,
  // email and password authentication
  emailAndPassword: {
    enabled: true,
  },
});
