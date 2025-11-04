import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database";

/**
 * Better Auth configuration with Drizzle adapter.
 *
 * This configuration sets up authentication using Better Auth with Drizzle ORM
 * as the database adapter. It enables email and password authentication
 * with PostgreSQL as the backend database.
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
});
