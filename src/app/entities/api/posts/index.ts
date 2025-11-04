/**
 * Posts API index file.
 *
 * This file re-exports all posts-related API functions, query options, and mutations
 * for easy importing throughout the application. It includes data fetching, caching,
 * and mutation operations for posts.
 */

// Re-export posts API functions, query options, and mutations
export * from "./post.api";
export * from "./post.query";
export * from "./post.mutation";
export * from "./post.by-id.api";
export * from "./post.by-id.query";
