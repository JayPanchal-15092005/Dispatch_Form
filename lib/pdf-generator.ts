// src/lib/pdf-generator.ts
import { DispatchFormData } from '../types/dispatch';

export async function generateDispatchPDF(data: DispatchFormData): Promise<Blob> {
  // Create a new PDF document using jsPDF
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = 20;

  // Header - Company Info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('GUJARAT INFOTECH LIMITED', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('ISO 9001:2015 & 27001:2013 Certified', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 4;
  doc.setFontSize(7);
  doc.text('INFORMATION TECHNOLOGY FOR BETTER SERVICES FOR CITIZENS', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 4;
  doc.text('304-307, 3rd Floor, Fortune Business Hub, Near Shell Petrol Pump,', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 3.5;
  doc.text('Sola-Science City Road, Ahmedabad - 380060.', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 3.5;
  doc.text('Phone: 079-27457650', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 3.5;
  doc.text('e-mail: info@gujaratinfotech.com, training@gujaratinfotech.com', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 3.5;
  doc.text('www.gujaratinfotech.com, jamsab.com, gram-seva.org', pageWidth / 2, yPos, { align: 'center' });

  yPos += 10;

  // Horizontal line
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  // "To." section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('To.', margin, yPos);
  
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(data.name || '', margin, yPos);
  
  if (data.address) {
    yPos += 5;
    doc.setFontSize(10);
    const addressLines = doc.splitTextToSize(data.address, pageWidth - 2 * margin);
    doc.text(addressLines, margin, yPos);
    yPos += addressLines.length * 5;
  }
  
  if (data.village) {
    yPos += 5;
    doc.text(data.village, margin, yPos);
  }
  
  if (data.city) {
    yPos += 5;
    doc.text(data.city, margin, yPos);
  }
  
  if (data.state && data.pincode) {
    yPos += 5;
    doc.text(`${data.state} - ${data.pincode}`, margin, yPos);
  } else if (data.state) {
    yPos += 5;
    doc.text(data.state, margin, yPos);
  }
  
  if (data.mobile) {
    yPos += 6;
    doc.setFont('helvetica', 'bold');
    doc.text(`MO. ${data.mobile}`, margin, yPos);
  }

  yPos += 15;

  // Dispatch Details Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('DISPATCH DETAILS', pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;

  // Draw table
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const lineHeight = 7;
  const col1X = margin;
  const col2X = margin + 60;

  const details = [
    { label: 'Ticket ID:', value: data.ticketId || '-' },
    { label: 'BC Code:', value: data.bcCode || '-' },
    { label: 'District:', value: data.district || '-' },
    { label: 'Taluka:', value: data.taluka || '-' },
    { label: 'Dispatch By:', value: data.dispatchBy || '-' },
    { label: 'Dispatch With:', value: data.dispatchWith || '-' },
    { label: 'Dispatch Number:', value: data.dispatchNumber || '-' },
    { label: 'Tracking Link:', value: data.dispatchLink || '-' },
    { label: 'Estimate Delivery:', value: data.estimateDelivery ? new Date(data.estimateDelivery).toLocaleDateString('en-IN') : '-' },
  ];

  details.forEach((detail) => {
    doc.setFont('helvetica', 'bold');
    doc.text(detail.label, col1X, yPos);
    doc.setFont('helvetica', 'normal');
    
    // Handle long text
    const valueLines = doc.splitTextToSize(detail.value, pageWidth - col2X - margin);
    doc.text(valueLines, col2X, yPos);
    yPos += Math.max(lineHeight, valueLines.length * lineHeight);
  });

  // Item Names
  if (data.itemNames) {
    yPos += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Item Names:', col1X, yPos);
    yPos += lineHeight;
    doc.setFont('helvetica', 'normal');
    const itemLines = doc.splitTextToSize(data.itemNames, pageWidth - 2 * margin);
    doc.text(itemLines, col1X, yPos);
    yPos += itemLines.length * lineHeight;
  }

  // Footer
  yPos = pageHeight - 20;
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, pageWidth / 2, yPos, { align: 'center' });

  // Convert to Blob
  return doc.output('blob');
}