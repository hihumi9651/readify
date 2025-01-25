import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {

  try {

    //cookieからセッション情報を取得
    const cookieSession = request.cookies.get("session")

    //cookieセッションの存在確認
    if (!cookieSession) {
      //cookieセッションがない場合はログイン画面に遷移
      console.log("cookieSessionなし")
      return NextResponse.redirect(new URL('/', request.url));
    }

    // APIにリクエストしてトークンを検証
    const headersData =  await headers();
    const protocol = headersData.get('x-forwarded-proto') || 'http';
    const host = headersData.get('host');
    const apiBase = `${protocol}://${host}`;

    const response = await fetch(`${apiBase}/api/auth/sessionAuth`, {
      method: 'POST',
       headers: {
         'Authorization': `Bearer ${cookieSession.value}`,
       },
     });

    if (response.ok) {
      console.log("req:ok")
      return NextResponse.next();
    } else {
      console.log("req:ng")
      return NextResponse.redirect(new URL('/', request.url));
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.redirect(new URL('/', request.url))
   }
}

export const config = {
  matcher: [
   '/bookshelf/:path*'
  ]
}