import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";
import { envServer } from "@/config/envs";

//constant
/**
 * PostgreSQL client instance for database connections.
 */
const client = postgres(envServer.DATABASE_URL);

//constant
/**
 * Drizzle database instance with schema integration.
 */
export const db = drizzle({ client, schema });
