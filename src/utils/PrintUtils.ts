// src/utils/PrintReceipt.ts
import { Sale } from "../stores/useSaleStore";

export const printReceipt = (sale: Sale) => {
  // Create a printable HTML receipt
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; width: 80mm; padding: 10px; }
        .header { text-align: center; margin-bottom: 10px; }
        .title { font-size: 18px; font-weight: bold; }
        .divider { border-top: 1px dashed #000; margin: 10px 0; }
        .row { display: flex; justify-content: space-between; margin: 5px 0; }
        .footer { margin-top: 15px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">YOUR BUSINESS NAME</div>
        <div>${new Date(sale.date).toLocaleString()}</div>
      </div>
      
      <div class="divider"></div>
      
      <div class="row">
        <span>${sale.productName} × ${sale.quantity}</span>
        <span>GH₵${(sale.price * sale.quantity).toFixed(2)}</span>
      </div>
      
      <div class="divider"></div>
      
      <div class="row" style="font-weight: bold;">
        <span>TOTAL:</span>
        <span>GH₵${(sale.price * sale.quantity).toFixed(2)}</span>
      </div>
      
      <div style="margin-top: 10px;">
        <div><strong>Payment:</strong> ${sale.paymentMethod.replace(/_/g, ' ')}</div>
        ${sale.phoneNumber ? `<div><strong>Phone:</strong> ${sale.phoneNumber}</div>` : ''}
      </div>
      
      <div class="footer">
        Thank you for your purchase!
      </div>
    </body>
    </html>
  `;

  // Open print window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    
    // Delay print to ensure content loads
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 200);
  }
};