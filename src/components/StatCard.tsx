import { FiTrendingUp, FiDollarSign, FiSmartphone } from 'react-icons/fi'

type StatCardProps = {
  title: string
  value: string
  icon?: 'cash' | 'mobile' | 'total' | 'trend'
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  const getIcon = () => {
    switch(icon) {
      case 'cash': return <FiDollarSign className="text-green-500" />
      case 'mobile': return <FiSmartphone className="text-blue-500" />
      case 'total': return <FiTrendingUp className="text-purple-500" />
      default: return <FiTrendingUp className="text-gray-500" />
    }
  }

  return (
    <div className="bg-[#1F1D2B] p-4 rounded-lg shadow border">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-[#EA7C69]">{title}</p>
          <p className="text-2xl text-white font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-gray-100">
          {getIcon()}
        </div>
      </div>
    </div>
  )
}