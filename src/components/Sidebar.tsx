import { Link } from 'react-router-dom'
import { FiPackage, FiShoppingCart, FiHome } from 'react-icons/fi'

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Inventory Tracker</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/" 
              className="flex items-center p-2 rounded-lg hover:bg-gray-100"
            >
              <FiHome className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              className="flex items-center p-2 rounded-lg hover:bg-gray-100"
            >
              <FiPackage className="mr-3" />
              Products
            </Link>
          </li>
          <li>
            <Link 
              to="/sales" 
              className="flex items-center p-2 rounded-lg hover:bg-gray-100"
            >
              <FiShoppingCart className="mr-3" />
              Sales
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}