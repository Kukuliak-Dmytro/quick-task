import { createAuthClient } from "better-auth/react";
import { envClient } from "@/config/envs";

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
  baseURL: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
});
