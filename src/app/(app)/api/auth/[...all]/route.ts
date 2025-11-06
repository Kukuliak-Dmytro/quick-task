import { auth } from "@/pkg/libraries/better-auth";
import { toNextJsHandler } from "better-auth/next-js";

//constant
/**
 * Authentication API route handlers.
 */
export const { GET, POST } = toNextJsHandler(auth.handler);
