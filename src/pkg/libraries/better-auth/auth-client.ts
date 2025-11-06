import { createAuthClient } from "better-auth/react";
import { envClient } from "@/config/envs";

//constant
/**
 * Client-side authentication client for Better Auth.
 */
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
});
