// src/app/api/test/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/_lib/prisma'

// READ (single)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const test = await prisma.test.findUnique({
      where: { id: params.id }
    })
    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }
    return NextResponse.json(test)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch test' }, { status: 500 })
  }
}

// UPDATE
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const test = await prisma.test.update({
      where: { id: params.id },
      data: { content: body.content }
    })
    return NextResponse.json(test)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update test' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.test.delete({
      where: { id: params.id }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete test' }, { status: 500 })
  }
}