import { auth } from "@/auth"

export default auth((req) => {
  if (!req.auth && !["/sign-in", "/sign-up"].includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
