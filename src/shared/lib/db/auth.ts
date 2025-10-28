import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "./database";

/**
 * Better Auth configuration with Drizzle adapter and Next.js integration.
 *
 * This configuration sets up authentication using Better Auth with Drizzle ORM
 * as the database adapter. It enables email and password authentication
 * with PostgreSQL as the backend database. The nextCookies plugin automatically
 * handles cookie management for server actions.
 *
 * @constant auth
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  // email and password authentication
  emailAndPassword: {
    enabled: true,
  },
  // Next.js cookie management plugin for server actions
  plugins: [nextCookies()],
});
