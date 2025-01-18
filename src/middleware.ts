import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {

  const cookieSession = request.cookies.get("session")

  if (!cookieSession) {
    console.log("cookieSessionなし")
    return NextResponse.redirect(new URL('/', request.url)); // トークンがなければリダイレクト
  }

  // APIにリクエストしてトークンを検証
  const headersData = await headers();
  const protocol = headersData.get('x-forwarded-proto') || 'http';
  const host = headersData.get('host');
  const apiBase = `${protocol}://${host}`;

  const response = fetch(`${apiBase}/api/auth/sessionAuth`, {
    method: 'POST',
     headers: {
       'Authorization': `Bearer ${cookieSession.value}`,
     },
   })

   response.then((response) => {
     if (response.ok) {
       console.log("req:ok")
       return NextResponse.redirect(new URL('/bookshelf', request.url))
     } else {
       console.log("req:ng")
       return NextResponse.redirect(new URL('/', request.url));
     }
   })
   .catch(() => {
     return NextResponse.redirect(new URL('/', request.url));
   });
}

export const config = {
  matcher: [
    '/bookshelf/:path*'
  ]
}