import prisma from "@/app/_lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {

        console.log("ユーザ書籍情報検索を開始")

        const { searchParams } = new URL(request.url)
        const isbns = searchParams.get('isbns')?.split(',')
        const userId = searchParams.get('userId')

        console.log(isbns)
        console.log(userId)

        if (!isbns || !userId) {
            return NextResponse.json(
                { error: "必要なパラメータが不足しています" },
                { status: 400 }
            )
        }

        const registeredBooks = await prisma.bookshelf.findMany({
            where: {
                isbn: { in: isbns },
                userId: userId
            }
        })

        return NextResponse.json({ registeredBooks })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to get bookshelf" },
            { status: 500 }
        )
    }
}