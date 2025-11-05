import { defineConfig } from "drizzle-kit";
import { envServer } from "@/config/envs";

/**
 * Drizzle Kit configuration for database migrations and schema management.
 *
 * This configuration defines the database schema location, migration output directory,
 * database dialect, and connection credentials for Drizzle ORM operations.
 *
 * @constant drizzleConfig
 */
export default defineConfig({
  // schema to use
  schema: "./src/pkg/libraries/drizzle/schemas/index.ts",
  // output directory for migrations
  out: "./src/pkg/libraries/drizzle/migrations",
  // dialect to use
  dialect: "postgresql",
  dbCredentials: {
    url: envServer.DATABASE_URL,
  },
});
