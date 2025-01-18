import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function POST(request: NextRequest){

    console.log("bookShelfにデータ登録します")

    try{

        const body = await request.json()
        console.log("リクエストボディ:", body)  // 受け取ったデータの確認
        await prisma.bookshelf.create({
            data: {
                userId: body.userId,
                isbn: body.isbn,
                status: body.status,
                readCount: body.readCount,
            }
        })

        // 成功時のレスポンスを追加
        return NextResponse.json({ success: true }, { status: 200 })

    } catch (error) {

        if (error instanceof Error) {
            console.error("登録エラー詳細:", {
                message: error.message,
                name: error.name
            });
        } else {
            console.error("不明なエラー:", error);
        }
        return NextResponse.json(
            { error: "Failed to create bookshelf entry" },
            { status: 500 }
        );
            
    }

}