// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
//import { auth } from "firebase/auth";  // Firebase Admin SDKを使用

// すべてのリクエストの前に実行される
export async function middleware(request: NextRequest) {
  // 現在のパス
  const path = request.nextUrl.pathname

  try {
    // Cookieからセッショントークンを取得
    const session = request.cookies.get('session')?.value

    // 認証必要なパス（認証が必要なルートを定義）
    const authRequired = path.startsWith('/bookshelf')

    // 認証不要なパス（ログイン後にアクセスさせたくないルート）
    const noAuthRequired = path === '/'

    if (!session && authRequired) {
      // 未認証なのに認証必要なパスにアクセス
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (session && noAuthRequired) {
      // 認証済みなのにログインページにアクセス
      return NextResponse.redirect(new URL('/bookshelf', request.url))
    }

    // それ以外は通常通り進める
    return NextResponse.next()
  } catch (error) {
    console.error('Auth error:', error)
    // エラー時はトップページへ
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    '/',              // トップページ
    '/bookshelf', // 本棚関連のパス
  ]
}