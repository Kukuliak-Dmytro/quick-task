import { NextResponse } from "next/server";
import { auth } from "@/pkg/libraries/better-auth";

//interface
interface ISessionResult {
  session: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;
}

//function
/**
 * Verifies the user's session and returns an error response if not authenticated.
 */
export const requireSession = async (
  request: Request,
): Promise<ISessionResult | NextResponse> => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    //return
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  //return
  return { session };
};

//function
/**
 * Gets the user ID from the session, or null if not authenticated.
 */
export const getUserId = async (request: Request): Promise<string | null> => {
  const authResult = await requireSession(request);

  // If requireSession returns NextResponse, user is not authenticated
  if (authResult instanceof NextResponse) {
    //return
    return null;
  }

  // Extract and return user ID from session
  //return
  return authResult.session.user.id;
};
