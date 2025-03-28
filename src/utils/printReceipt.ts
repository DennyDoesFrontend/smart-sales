import { Sale } from "../stores/useSaleStore";

export function printReceipt(order: Sale) {
  // Format the receipt content with proper Ghanaian standards
  const receiptContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt - Order #${order.id.slice(0, 6)}</title>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Courier New', monospace;
          width: 80mm;
          padding: 5mm;
          font-size: 14px;
          line-height: 1.3;
        }
        .header {
          text-align: center;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .restaurant-name {
          font-size: 18px;
          margin-bottom: 5px;
        }
        .divider {
          border-top: 1px dashed #000;
          margin: 8px 0;
        }
        .item-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .total-row {
          font-weight: bold;
          margin-top: 10px;
        }
        .footer {
          margin-top: 15px;
          text-align: center;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="restaurant-name">YOUR RESTAURANT NAME</div>
        <div>123 Main Street, Accra</div>
        <div>VAT: 1234567890</div>
      </div>
      
      <div class="divider"></div>
      
      <div class="item-row">
        <span>Order #${order.id.slice(0, 6)}</span>
        <span>${new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      
      <div class="divider"></div>
      
      <div class="item-row">
        <span>${order.productName} × ${order.quantity}</span>
        <span>GH₵${order.price.toFixed(2)}</span>
      </div>
      
      <div class="divider"></div>
      
      <div class="item-row total-row">
        <span>TOTAL:</span>
        <span>GH₵${(order.price * order.quantity).toFixed(2)}</span>
      </div>
      
      <div class="item-row">
        <span>Payment Method:</span>
        <span>${order.paymentMethod.replace('_', ' ')}</span>
      </div>
      
      ${order.phoneNumber ? `
      <div class="item-row">
        <span>Customer Phone:</span>
        <span>${order.phoneNumber}</span>
      </div>
      ` : ''}
      
      <div class="divider"></div>
      
      <div class="footer">
        <div>Thank you for dining with us!</div>
        <div>${new Date().toLocaleDateString('en-GH')}</div>
      </div>
    </body>
    </html>
  `;

  // Print the receipt
  printHtmlContent(receiptContent);
}

function printHtmlContent(content: string) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Popup blocked! Please allow popups for this site to print receipts.');
    return;
  }

  printWindow.document.open();
  printWindow.document.write(content);
  printWindow.document.close();

  // Delay print to ensure content loads
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, 500);
}