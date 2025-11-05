import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import * as XLSX from 'xlsx';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Read file buffer
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    
    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(sheet);

    let inserted = 0;
    let updated = 0;
    let errors = 0;

    // Process each row
    for (const row of data as any[]) {
      try {
        // Map Excel columns (adjust these based on YOUR Excel column names)
        // const bcCode = row['BC_CODE'] || row['BC CODE'] || row['bcCode'];
        // const name = row['NAME'] || row['name'];

        const bcCode = row['BC_CODE']
        const name = row['NAME']
        
        if (!bcCode || !name) {
          errors++;
          continue;
        }

        // Upsert (insert or update)
        await prisma.bCMasterData.upsert({
          where: { bcCode: String(bcCode) },
          update: {
            name: String(name),
            address: row['ADDRESS'] || row['address'] || null,
            city: row['CITY'] || row['city'] || null,
            state: row['STATE'] || row['state'] || null,
            mobile: row['MOBILE'] || row['mobile'] || null,
            altMobile: row['ALT_MOBILE'] || row['altMobile'] || null,
            village: row['VILLAGE'] || row['village'] || null,
            taluka: row['TALUKA'] || row['taluka'] || null,
            district: row['DISTRICT'] || row['district'] || null,
            pincode: row['PINCODE'] || row['pincode'] || null,
          },
          create: {
            bcCode: String(bcCode),
            name: String(name),
            address: row['ADDRESS'] || row['address'] || null,
            city: row['CITY'] || row['city'] || null,
            state: row['STATE'] || row['state'] || null,
            mobile: row['MOBILE'] || row['mobile'] || null,
            altMobile: row['ALT_MOBILE'] || row['altMobile'] || null,
            village: row['VILLAGE'] || row['village'] || null,
            taluka: row['TALUKA'] || row['taluka'] || null,
            district: row['DISTRICT'] || row['district'] || null,
            pincode: row['PINCODE'] || row['pincode'] || null,
          },
        }).then(() => {
          inserted++;
        }).catch(() => {
          updated++;
        });
      } catch (error) {
        errors++;
        console.error('Row processing error:', error);
      }
    }

    return NextResponse.json({
      success: true,
      recordsInserted: inserted,
      recordsUpdated: updated,
      errors,
      totalProcessed: data.length
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process Excel file' },
      { status: 500 }
    );
  }
}