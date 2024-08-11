import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
   const { nextUrl } = req;
   const isLoggedIn = !!req.auth;

   const publicPaths = ["/signin", "/", "/signup", "/forgot-password"];
   const isPublicPath = publicPaths.includes(nextUrl.pathname);

   if (isPublicPath) {
      return NextResponse.next();
   }


   if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/signin", nextUrl));
   }

   return NextResponse.next();
});

export const config = {
   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
