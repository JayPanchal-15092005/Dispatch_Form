// src/app/api/generate-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateDispatchPDF } from '../../../../lib/pdf-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate PDF
    const pdfBlob = await generateDispatchPDF(body);
    
    // Convert Blob to Buffer for Next.js response
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Return PDF file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="dispatch-${body.bcCode || 'entry'}-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}