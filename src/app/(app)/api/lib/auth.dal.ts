import { NextResponse } from "next/server";
import { auth } from "@/pkg/libraries/better-auth";

//interface
interface ISessionResult {
  session: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;
}

//function
/**
 * Verifies the user's session from the request headers.
 */
export const verifySession = async (request: Request) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  //return
  return session;
};

//function
/**
 * Verifies the user's session and returns an error response if not authenticated.
 */
export const requireSession = async (
  request: Request,
): Promise<ISessionResult | NextResponse> => {
  const session = await verifySession(request);

  if (!session) {
    //return
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  //return
  return { session };
};
