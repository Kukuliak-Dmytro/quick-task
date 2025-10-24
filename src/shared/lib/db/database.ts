import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";

// drizzle db connection
// create a client to connect to the database
const client = postgres(process.env.DATABASE_URL!);
// create a drizzle instance to interact with the database
export const db = drizzle({ client, schema });
