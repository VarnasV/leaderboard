import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Allowlisted IPs - defined once at the top
  const allowedIps = ['85.206.20.170', '::1', '127.0.0.1']
  
  // Check if request is from allowlisted IP - bypass auth completely
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const clientIp = forwardedFor?.split(',')[0]?.trim() || realIp || null
  
  // If from allowed IP, bypass authentication
  if (clientIp && allowedIps.includes(clientIp)) {
    // Redirect root and login to leaderboard
    if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/leaderboard'
      const response = NextResponse.redirect(url)
      response.cookies.set('ip-allowlist-bypass', 'true', { 
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 365,
      })
      return response
    }
    // Allow access to any other page
    const response = NextResponse.next({ request })
    response.cookies.set('ip-allowlist-bypass', 'true', { 
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, {
              ...options,
              maxAge: 60 * 60 * 24 * 365, // 1 year
            })
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user and not on login/auth pages, redirect to login
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If authenticated and on login page, redirect to leaderboard
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/leaderboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

