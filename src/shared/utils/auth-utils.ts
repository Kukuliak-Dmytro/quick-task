import { auth } from "@/shared/lib/db/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Validates user session and redirects to login if not authenticated
 * @param redirectTo - Optional redirect path (defaults to "/login")
 * @returns Promise<Session> - The authenticated session
 */
export const requireAuth = async (redirectTo: string = "/login") => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(redirectTo);
  }

  return session;
};

/**
 * Gets the current session without redirecting
 * @returns Promise<Session | null> - The session or null if not authenticated
 */
export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};
