import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/_lib/prisma'

// CREATE
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const test = await prisma.test.create({
      data: {
        id: body.id,
        content: body.content
      }
    })
    return NextResponse.json(test, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create test' }, { status: 500 })
  }
}

// READ (all)
export async function GET() {
  try {
    const tests = await prisma.test.findMany()
    return NextResponse.json(tests)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 })
  }
}