import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database";

//better auth configuration
// using drizzle adapter to connect to the database
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  // email and password authentication
  emailAndPassword: {
    enabled: true,
  },
});
