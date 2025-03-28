import { useSalesStore } from "../stores/useSaleStore"

export default function RecentSales() {
  const { sales } = useSalesStore()
  
  // Get last 5 sales, sorted by most recent
  const recentSales = [...sales]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {recentSales.length === 0 ? (
          <p className="text-gray-500">No recent sales</p>
        ) : (
          recentSales.map((sale) => (
            <div key={sale.id} className="border-b pb-3 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{sale.productName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(sale.date).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">GH₵{(sale.price * sale.quantity).toFixed(2)}</p>
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                    sale.paymentMethod === 'CASH' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {sale.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}