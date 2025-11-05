import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/pkg/libraries/better-auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "./pkg/libraries/locale";

export const intlMiddleware = createMiddleware(routing);
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/en/login", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … login and register routes
  matcher: ["/((?!api|_next|_vercel|login|register|.*\\..*).*)"],
};
