import { auth } from "@/pkg/libraries/better-auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Authentication API route handlers.
 *
 * This route handles all authentication-related API endpoints including
 * sign-in, sign-up, sign-out, and session management. It uses Better Auth
 * with Next.js integration for seamless authentication handling.
 *
 * @constant GET - GET handler for authentication requests
 * @constant POST - POST handler for authentication requests
 */
export const { GET, POST } = toNextJsHandler(auth.handler);
