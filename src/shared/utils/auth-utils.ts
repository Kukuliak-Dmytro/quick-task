import { auth } from "@/shared/lib/db/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Validates user session and redirects to login if not authenticated.
 *
 * This function checks if the user has a valid session and redirects to the
 * specified path if not authenticated. Used for protecting routes that require
 * authentication.
 *
 * @param redirectTo - Optional redirect path (defaults to "/login")
 * @returns Promise that resolves to the authenticated session
 * @throws {Redirect} Redirects to login page if not authenticated
 */
export const requireAuth = async (
  redirectTo: "/login" | "/register" = "/login",
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(redirectTo);
  }

  return session;
};
