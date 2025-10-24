import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // schema to use
  schema: "./src/shared/lib/db/schemas/index.ts",
  // output directory for migrations
  out: "./migrations",
  // dialect to use
  dialect: "postgresql",
  dbCredentials: {
    // if we create .env.local, Drizzle won't see it
    // so we need to use the .env file even locally
    url: process.env.DATABASE_URL!,
  },
});
