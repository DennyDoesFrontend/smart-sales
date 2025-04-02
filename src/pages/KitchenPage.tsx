import OrderKitchenView from '../components/OrderKitchenView'
import { FiClock, FiList, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'
import { useState, useEffect } from 'react'

export default function KitchenPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [urgentOrdersCount, setUrgentOrdersCount] = useState(0)
  const [completedToday, setCompletedToday] = useState(0)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Mock data for stats - replace with real data from your store
  useEffect(() => {
    // These would normally come from your store/API
    setUrgentOrdersCount(3)
    setCompletedToday(24)
  }, [])

  return (
    <div className="p-4 sm:p-6">
      {/* Header with Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Time Card */}
        <div className="bg-[#1F1D2B] rounded-xl p-4 border border-[#393C49]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">Current Time</h2>
              <p className="text-2xl font-semibold text-white">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <FiClock className="text-3xl text-[#EA7C69]" />
          </div>
        </div>

        {/* Urgent Orders Card */}
        <div className="bg-[#1F1D2B] rounded-xl p-4 border border-[#393C49]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">Urgent Orders</h2>
              <p className="text-2xl font-semibold text-white">
                {urgentOrdersCount}
              </p>
            </div>
            <FiAlertTriangle className="text-3xl text-red-400" />
          </div>
        </div>

        {/* Completed Today Card */}
        <div className="bg-[#1F1D2B] rounded-xl p-4 border border-[#393C49]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">Completed Today</h2>
              <p className="text-2xl font-semibold text-white">
                {completedToday}
              </p>
            </div>
            <FiCheckCircle className="text-3xl text-green-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#1F1D2B] rounded-xl shadow-lg overflow-hidden">
        {/* Orders Header */}
        <div className="p-4 border-b border-[#393C49] flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FiList className="text-xl text-[#EA7C69]" />
            <h2 className="text-lg font-semibold text-white">Active Orders</h2>
          </div>
          <span className="text-xs text-gray-400">
            Auto-refreshing...
          </span>
        </div>

        {/* Orders Grid */}
        <div className="p-4">
          <OrderKitchenView expandedView={true} />
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#393C49] text-xs text-gray-400 flex justify-between">
          <span>Last updated: {currentTime.toLocaleTimeString()}</span>
          <span>{currentTime.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}