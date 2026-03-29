import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // createServerClient needs to check cookie values with getAll, set with setAll
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and getUser().
  // Doing so could make it very hard to debug issues with cross-site request forgery attacks.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard")
  const isAuthRoute = request.nextUrl.pathname === "/login"

  // 1. Dashbord Security: Only allow authorized administrator emails
  if (isDashboardRoute) {
    if (!user) {
      // Not logged in: Redirect to login
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = "/login"
      loginUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    const { isAuthorizedAdmin } = await import("@/lib/security")
    const isLocalhost = request.nextUrl.hostname === "localhost" || request.url.includes("127.0.0.1")
    const hasDashboardAccess = request.cookies.get("dashboard_access")?.value === "true"
    
    // Secret Entry Protection: Must have dashboard_access cookie (only set via login form)
    if (!hasDashboardAccess || (!isAuthorizedAdmin(user.email) && !isLocalhost)) {
      // Not allowed or came directly to the URL
      const homeUrl = request.nextUrl.clone()
      homeUrl.pathname = "/"
      homeUrl.searchParams.set("error", "unauthorized_access")
      return NextResponse.redirect(homeUrl)
    }
  }

  return supabaseResponse
}
