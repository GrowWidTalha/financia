import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


const isProtectedRouter = createRouteMatcher([
  '/',
  // "/api(.*)"
])
export default clerkMiddleware((auth, request) => {
if(isProtectedRouter(request)){
  auth().protect()
}
return NextResponse.next()
});



export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};