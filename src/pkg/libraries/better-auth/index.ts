// Server-only exports - use these in API routes and server components
export { auth } from "./auth";

// Client-safe exports - use these in client components
// Note: Import authClient directly from "./auth-client" in client components
// to avoid bundling server-only code
export { authClient } from "./auth-client";
