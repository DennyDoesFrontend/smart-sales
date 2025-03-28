import { Sale } from "../stores/useSaleStore";// Import the Sale type

export function printReceipt(order: Sale) {
  const receipt = `
    RESTAURANT NAME
    ----------------------------
    ${order.productName} × ${order.quantity}
    GH₵${order.price.toFixed(2)}
    ----------------------------
    TOTAL: GH₵${(order.price * order.quantity).toFixed(2)}
    Paid via ${order.paymentMethod.replace('_', ' ')}
    ${order.phoneNumber ? `Tel: ${order.phoneNumber}` : ''}
    ${new Date(order.date).toLocaleString()}
    Thank you!
  `;
  
  // Create printer-friendly HTML
  const printHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt</title>
      <style>
        body { font-family: monospace; width: 80mm; padding: 5mm; }
        .center { text-align: center; }
        .divider { border-top: 1px dashed #000; margin: 5px 0; }
      </style>
    </head>
    <body>
      <h2 class="center">RESTAURANT NAME</h2>
      <div class="divider"></div>
      <p>${order.productName} × ${order.quantity}</p>
      <p>GH₵${order.price.toFixed(2)}</p>
      <div class="divider"></div>
      <p><strong>TOTAL: GH₵${(order.price * order.quantity).toFixed(2)}</strong></p>
      <p>Payment: ${order.paymentMethod.replace('_', ' ')}</p>
      ${order.phoneNumber ? `<p>Tel: ${order.phoneNumber}</p>` : ''}
      <p>${new Date(order.date).toLocaleString()}</p>
    </body>
    </html>
  `;

  // Print using thermal printer API or browser print
  const printWindow = window.open('', '_blank');
  printWindow?.document.write(printHTML);
  printWindow?.document.close();
  setTimeout(() => {
    printWindow?.print();
    printWindow?.close();
  }, 200);
}