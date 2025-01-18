import { cookies } from "next/headers"
import { auth } from "@/app/_lib/firebase-admin"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    const decodedToken = await auth.verifyIdToken(idToken);
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    try {
      const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn
      });

      //Cookieを設定
      (await cookies()).set('session', sessionCookie, {
        maxAge: expiresIn,// Cookieの有効期間（ミリ秒）
        httpOnly: true,// JavaScriptからのアクセスを防ぐ
        secure: process.env.NODE_ENV === 'production',// HTTPS接続のみ
        path: '/',// Cookieの有効範囲
      })

      return NextResponse.json({ success: true });
      
    } catch (error) {
      console.error('セッションCookie作成エラー:');
      throw error;  // 上位のエラーハンドリングに渡す
    }

  } catch (error) {
    console.error('全体エラー:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}