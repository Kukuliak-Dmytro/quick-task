import { NextResponse } from "next/server";
import { auth } from "@/pkg/libraries/better-auth";

/**
 * Data Access Layer function for authentication verification.
 *
 * This function verifies the user's session from the request headers.
 * Returns the session object if authenticated, or null if not authenticated.
 * Route handlers should check for null and return an appropriate error response.
 *
 * @param request - The incoming request object containing headers
 * @returns Promise resolving to the session object or null if not authenticated
 */
export async function verifySession(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  return session;
}

/**
 * Data Access Layer function for authentication verification with automatic error response.
 *
 * This function verifies the user's session and returns a NextResponse error
 * if not authenticated. Use this when you want automatic error handling.
 *
 * @param request - The incoming request object containing headers
 * @returns Promise resolving to the session object, or NextResponse error if not authenticated
 */
export async function requireSession(
  request: Request,
): Promise<
  | { session: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>> }
  | NextResponse
> {
  const session = await verifySession(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return { session };
}
