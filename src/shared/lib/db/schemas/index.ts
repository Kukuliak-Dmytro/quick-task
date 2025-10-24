/**
 * Database schemas index file.
 *
 * This file re-exports all database schema definitions for easy importing
 * throughout the application. It includes both authentication schemas
 * (Better Auth tables) and application-specific schemas (posts).
 */

// Auth schema (Better Auth tables)
export * from "./auth";

// Posts schema
export * from "./posts";
