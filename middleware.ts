// middleware.js
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
};