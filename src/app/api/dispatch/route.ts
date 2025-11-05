import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const dispatch = await prisma.dispatchEntry.create({
      data: {
        ticketId: body.ticketId || null,
        bcCode: body.bcCode,
        name: body.name,
        address: body.address || null,
        city: body.city || null,
        state: body.state || null,
        mobile: body.mobile || null,
        altMobile: body.altMobile || null,
        village: body.village || null,
        taluka: body.taluka || null,
        district: body.district || null,
        pincode: body.pincode || null,
        dispatchBy: body.dispatchBy || null,
        dispatchWith: body.dispatchWith || null,
        dispatchNumber: body.dispatchNumber || null,
        dispatchLink: body.dispatchLink || null,
        estimateDelivery: body.estimateDelivery ? new Date(body.estimateDelivery) : null,
        itemNames: body.itemNames || null,
      },
    });

    return NextResponse.json({ 
      success: true, 
      id: dispatch.id,
      message: 'Dispatch entry saved successfully' 
    });
  } catch (error) {
    console.error('Save dispatch error:', error);
    return NextResponse.json(
      { error: 'Failed to save dispatch entry' },
      { status: 500 }
    );
  }
}