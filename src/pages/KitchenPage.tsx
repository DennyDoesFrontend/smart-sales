import OrderKitchenView from '../components/OrderKitchenView'
import { FiClock, FiList } from 'react-icons/fi'

export default function KitchenPage() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kitchen Orders</h1>
          <p className="text-gray-500">Real-time order tracking</p>
        </div>
        <div className="flex items-center space-x-2 text-blue-600">
          <FiClock className="text-xl" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Order Status Tabs */}
      <div className="flex border-b mb-6">
        <button className="px-4 py-2 font-medium border-b-2 border-blue-500 text-blue-600">
          <FiList className="inline mr-2" />
          Active Orders
        </button>
      </div>

      {/* Full-screen Order View */}
      <div className="bg-white rounded-xl shadow p-6">
        <OrderKitchenView expandedView={true} />
      </div>

      {/* Kitchen Stats Footer */}
      <div className="mt-6 text-sm text-gray-500 flex justify-between">
        <span>Auto-refreshes every 30 seconds</span>
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  )
}