import { auth } from "./auth";
import { authRoutes } from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req?.auth;

  const protectedRoute = ["/"];

  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return Response.redirect(new URL("/", nextUrl));
  }

  if (!isLoggedIn && protectedRoute.includes(nextUrl.pathname)) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
