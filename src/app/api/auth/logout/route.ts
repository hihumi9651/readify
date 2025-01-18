import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        //セッションCookieを削除
        (await cookies()).delete("session")

        return NextResponse.json({
            success: true,
            message: "ログアウト成功"
        })
    } catch (error) {
        console.error("Logout error:", error)
        return NextResponse.json(
            { error: "ログアウト処理に失敗しました" },
            { status: 500 }
        )
    }
}