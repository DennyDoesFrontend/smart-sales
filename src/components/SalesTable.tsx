import { FiPlus, FiSearch, FiX } from 'react-icons/fi'
import { useSalesStore } from '../stores/useSaleStore'
import { useProductStore } from '../stores/useProductStore'
import SalesModal from './SalesModal'
import { useState, useEffect } from 'react'

export default function SalesTable() {
  const { sales } = useSalesStore()
  const { products } = useProductStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSales, setFilteredSales] = useState(sales)
  const [paymentFilter, setPaymentFilter] = useState('ALL')
  const [dateFilter, setDateFilter] = useState('ALL')

  // Get unique payment methods for filter
  const paymentMethods = ['ALL', ...new Set(sales.map(sale => sale.paymentMethod))]

  // Filter sales based on search and filters
  useEffect(() => {
    let results = sales
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(sale =>
        sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sale.customerName && sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    // Apply payment method filter
    if (paymentFilter !== 'ALL') {
      results = results.filter(sale => sale.paymentMethod === paymentFilter)
    }
    
    // Apply date filter
    if (dateFilter !== 'ALL') {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      results = results.filter(sale => {
        const saleDate = new Date(sale.date)
        
        if (dateFilter === 'TODAY') {
          return saleDate >= today
        } else if (dateFilter === 'THIS_WEEK') {
          const weekStart = new Date(today)
          weekStart.setDate(weekStart.getDate() - weekStart.getDay())
          return saleDate >= weekStart
        } else if (dateFilter === 'THIS_MONTH') {
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
          return saleDate >= monthStart
        }
        return true
      })
    }
    
    setFilteredSales(results)
  }, [sales, searchTerm, paymentFilter, dateFilter])

  const clearFilters = () => {
    setSearchTerm('')
    setPaymentFilter('ALL')
    setDateFilter('ALL')
  }

  return (
    <div className="rounded-lg">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Sales Records</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-[#EA7C69] text-white rounded-lg hover:bg-[#e76a55] transition-colors"
        >
          <FiPlus className="mr-2" />
          New Sale
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by product or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#2D303E] text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EA7C69]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="text-gray-400 hover:text-white" />
            </button>
          )}
        </div>

        {/* Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Payment Method Filter */}
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">Payment Method</label>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full bg-[#2D303E] text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#EA7C69]"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method} className="bg-[#1F1D2B]">
                  {method.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-[#2D303E] text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#EA7C69]"
            >
              <option value="ALL" className="bg-[#1F1D2B]">All Dates</option>
              <option value="TODAY" className="bg-[#1F1D2B]">Today</option>
              <option value="THIS_WEEK" className="bg-[#1F1D2B]">This Week</option>
              <option value="THIS_MONTH" className="bg-[#1F1D2B]">This Month</option>
            </select>
          </div>
        </div>

        {/* Active Filters Indicator */}
        {(searchTerm || paymentFilter !== 'ALL' || dateFilter !== 'ALL') && (
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>
              Showing {filteredSales.length} results
              {searchTerm && ` matching "${searchTerm}"`}
              {paymentFilter !== 'ALL' && ` with ${paymentFilter.replace(/_/g, ' ')}`}
              {dateFilter !== 'ALL' && ` from ${dateFilter.replace(/_/g, ' ').toLowerCase()}`}
            </span>
            <button
              onClick={clearFilters}
              className="flex items-center text-[#EA7C69] hover:text-[#e76a55]"
            >
              <FiX className="mr-1" /> Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Sales Table */}
      <div className="overflow-x-auto">
        {filteredSales.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {sales.length === 0 
              ? 'No sales records found' 
              : 'No sales match your search criteria'}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Unit Price
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-300">
                    {sale.customerName || 'Walk-in'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {sale.productName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {sale.quantity}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    GH₵{sale.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    GH₵{(sale.price * sale.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      sale.paymentMethod === 'CASH' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {sale.paymentMethod.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <SalesModal
          products={products}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}