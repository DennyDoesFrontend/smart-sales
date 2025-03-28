import StatCard from './StatCard'
import { useSalesStore } from '../stores/useSaleStore'

export default function DailySalesReport() {
  const { sales } = useSalesStore()

  const todaySales = sales.filter(s => {
    const saleDate = new Date(s.date)
    const today = new Date()
    return (
      saleDate.getDate() === today.getDate() &&
      saleDate.getMonth() === today.getMonth() &&
      saleDate.getFullYear() === today.getFullYear()
    )
  })

  const totals = todaySales.reduce((acc, sale) => {
    const amount = sale.price * sale.quantity
    acc.total += amount
    acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + amount
    return acc
  }, {
    total: 0,
    CASH: 0,
    MTN_MOMO: 0,
    AIRTELTIGO_CASH: 0,
    VODAFONE_CASH: 0
  } as Record<string, number>)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Sales" 
        value={`GH₵${totals.total.toFixed(2)}`}
        icon="total"
      />
      <StatCard 
        title="Cash Payments" 
        value={`GH₵${totals.CASH.toFixed(2)}`}
        icon="cash"
      />
      <StatCard 
        title="MTN MoMo" 
        value={`GH₵${totals.MTN_MOMO.toFixed(2)}`}
        icon="mobile"
      />
      <StatCard 
        title="Other Mobile" 
        value={`GH₵${(totals.AIRTELTIGO_CASH + totals.VODAFONE_CASH).toFixed(2)}`}
        icon="mobile"
      />
    </div>
  )
}