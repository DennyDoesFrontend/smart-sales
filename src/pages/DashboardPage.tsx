import DailySalesReport from '../components/DailySalesReport'
import RecentSales from '../components/RecentSales'
import OrderKitchenView from '../components/OrderKitchenView'
import { FiPackage, FiAlertTriangle, FiDollarSign } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Restaurant Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-GH', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
              <FiPackage size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Total Products</h3>
              <p className="text-3xl font-bold mt-1">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-50 text-yellow-600 mr-4">
              <FiAlertTriangle size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Low Stock</h3>
              <p className="text-3xl font-bold mt-1">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
              <FiDollarSign size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Today's Sales</h3>
              <p className="text-3xl font-bold mt-1">GH₵1,245</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-4">Sales Report</h2>
            <DailySalesReport />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-4">Recent Transactions</h2>
            <RecentSales />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-bold text-lg">Kitchen Orders</h2>
    <Link 
      to="/kitchen-orders" 
      className="text-sm text-blue-600 hover:underline"
    >
      View All
    </Link>
  </div>
  <OrderKitchenView />
</div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                New Order
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                View Inventory
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition col-span-2">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}