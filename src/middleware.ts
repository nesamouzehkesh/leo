import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userProfile = request.cookies.get('user_profile')?.value;

  /**
   * Only prevent access to /animes if no profile cookies exists
   * Note: in my implementation a user with valid profile cookies can still go back to '/'
   * since that page is their profile create/edit page. 
   * 
   */
  if (!userProfile && request.nextUrl.pathname === '/animes') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)'],
}; 