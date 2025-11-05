import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db'; 

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bcCode = searchParams.get('bcCode');

    if (!bcCode) {
      return NextResponse.json(
        { error: 'BC Code is required' },
        { status: 400 }
      );
    }

    const data = await prisma.bCMasterData.findUnique({
      where: { bcCode },
    });

    if (!data) {
      return NextResponse.json(
        { error: 'BC Code not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('BC Lookup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}