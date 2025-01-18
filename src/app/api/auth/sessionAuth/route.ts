import { verifySession } from "@/app/_lib/firebase-admin"
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {

    // authorizationヘッダーからトークンを取得
    const authHeader: string|null = request.headers.get("Authorization")

    if (!authHeader?.startsWith("Bearer ")){
      return NextResponse.json(
        { error: "Invalid authorization header" },
        { status: 401 }
      )
    }
    const idToken = authHeader.split("Bearer ")[1]

    // トークンを検証
    const decodedToken = await verifySession(idToken);

    return NextResponse.json(
      { decodedToken },
      { status: 200 }
    );

  } catch (error) {

    return NextResponse.json(
      {error: "Failed to verify token"},
      { status: 401 }
    )

  }
}
