// import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

// export default withClerkMiddleware((_req: NextRequest) => {
//   return NextResponse.next();
// });
// Exports
// ========================================================
export default withMiddlewareAuthRequired(async (req: NextRequest) => {
  const res = NextResponse.next();
  return res;
});

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     *
     * This includes images, and requests from TRPC.
     */
    // "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
  ],
};
