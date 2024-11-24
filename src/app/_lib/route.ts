// app/api/auth/session/route.ts
import { NextResponse } from 'next/server'
import { auth } from 'firebase-admin'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json()
    
    // セッションクッキーの有効期限（2週間）
    const expiresIn = 60 * 60 * 24 * 14 * 1000
    
    // セッションクッキーを作成
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    })

    // クッキーを設定
    const cookiesStore = await cookies()
    cookiesStore.set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}