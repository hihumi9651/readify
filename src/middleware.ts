import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  console.log("middleware:start")

  // const token = request.headers.get('Authorization')?.split('Bearer ')[1]; // トークン取得

  // console.log(token)

  // if (!token) {
  //   return NextResponse.redirect(new URL('/', request.url)); // トークンがなければリダイレクト
  // }

  // APIにリクエストしてトークンを検証
  // return fetch('/app/_api/auth', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${token}`,
  //   },
  // })
  // .then((response) => {
  //   if (response.ok) {
  //     console.log("req:ok")
  //     return NextResponse.next();
  //   } else {
  //     console.log("req:ng")
  //     return NextResponse.redirect(new URL('/bookshelf', request.url)); // 検証失敗時のリダイレクト
  //   }
  // })
  // .catch(() => {
  //   return NextResponse.redirect(new URL('/', request.url));
  // });
}

// export const config = {
//   matcher: ['/protected-route'], // 保護したいページに設定
// };

export const config = {
  matcher: [
    //'/',
    '/bookshelf/:path*'
  ]
}


//testCode:middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {
//   console.log('Middleware triggered:', request.nextUrl.pathname)
//   return NextResponse.next()
// }

// export const config = {
//   matcher: '/:path*'
// }
