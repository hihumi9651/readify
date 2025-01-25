import prisma from "@/app/_lib/prisma"
import { RegisteredBookStatus } from "@/app/_types/books"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {

        console.log("ユーザ書籍情報検索を開始")

        const { searchParams } = new URL(request.url)
        const isbns = searchParams.get('isbns')?.split(',')
        const userId = searchParams.get('userId')

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
            },
            select: {
                isbn: true,
                status: true
            }
        })

        return NextResponse.json({ registeredBooks })
    } catch (error) {
        console.error('Error fetching bookshelf:', error)
        return NextResponse.json(
            { error: "Failed to get bookshelf" },
            { status: 500 }
        )
    }
}