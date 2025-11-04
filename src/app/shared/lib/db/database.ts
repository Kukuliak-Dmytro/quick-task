import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";

/**
 * PostgreSQL client instance for database connections.
 *
 * @constant client
 */
const client = postgres(process.env.DATABASE_URL!);

/**
 * Drizzle database instance with schema integration.
 *
 * This instance provides type-safe database operations using the defined schemas.
 * It connects to the PostgreSQL database using the configured connection string.
 *
 * @constant db
 */
export const db = drizzle({ client, schema });
