import { createAuthClient } from "better-auth/react";

/**
 * Client-side authentication client for Better Auth.
 *
 * This client provides authentication functionality for client-side components,
 * including sign-in, sign-up, and sign-out operations. It connects to the
 * server-side auth configuration using the configured base URL.
 * 
 * @constant authClient
 */
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
});
