import prisma from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try{
        const body = await request.json()
        const user = await prisma.user.create({
            data: {
                id: body.firebase_uid,
                email: body.email,
                username: body.displayName,
                displayName: body.displayName,
            }
        })
    } catch (error) {
        return NextResponse.json({error: "Faild to fetch user"}, {status: 500})
    }
}