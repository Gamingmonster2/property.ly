import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: `middleware` is renamed to `proxy` — the file convention
// expects a default export with the same (request) => response signature.
export default createMiddleware(routing);

export const config = {
  // Skip internal paths and static assets
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
