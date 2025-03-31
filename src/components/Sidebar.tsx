import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-auto bg-[#1F1D2B] shadow-md">
      <div className='w-full flex justify-center mt-3 sm:mt-4 mb-8 sm:mb-12'>
        <img 
          src='/Logo.svg' 
          alt="Logo" 
          className="w-12 sm:w-16" 
        />
      </div>
      <nav className="p-2 sm:p-4">
        <ul className="space-y-6 sm:space-y-10">
          <li className='w-full flex justify-center'>
            <NavLink
              to="/"
              className={({ isActive }) => 
                `w-3/4 flex items-center justify-center p-1 sm:p-2 rounded-lg ${
                  isActive ? 'bg-[#EA7C69]' : 'hover:bg-[#2D303E]'
                }`
              }
            >
              {({ isActive }) => (
                <img 
                  src='/Home.svg' 
                  className={`w-8 sm:w-10 ${isActive ? 'filter brightness-0 invert' : ''}`}
                  alt="Home"
                />
              )}
            </NavLink>
          </li>
          <li className='w-full flex justify-center'>
            <NavLink
              to="/products"
              className={({ isActive }) => 
                `w-3/4 flex items-center justify-center p-1 sm:p-2 rounded-lg ${
                  isActive ? 'bg-[#EA7C69]' : 'hover:bg-[#2D303E]'
                }`
              }
            >
              {({ isActive }) => (
                <img 
                  src='/Food.svg' 
                  className={`w-8 sm:w-10 ${isActive ? 'filter brightness-0 invert' : ''}`}
                  alt="Products"
                />
              )}
            </NavLink>
          </li>
          <li className='w-full flex justify-center'>
            <NavLink
              to="/sales"
              className={({ isActive }) => 
                `w-3/4 flex items-center justify-center p-1 sm:p-2 rounded-lg ${
                  isActive ? 'bg-[#EA7C69]' : 'hover:bg-[#2D303E]'
                }`
              }
            >
              {({ isActive }) => (
                <img 
                  src='/Sales.svg' 
                  className={`w-8 sm:w-10 ${isActive ? 'filter brightness-0 invert' : ''}`}
                  alt="Sales"
                />
              )}
            </NavLink>
          </li>
          <li className='w-full flex justify-center'>
            <NavLink
              to="/kitchen-orders"
              className={({ isActive }) => 
                `w-3/4 flex items-center justify-center p-1 sm:p-2 rounded-lg ${
                  isActive ? 'bg-[#EA7C69]' : 'hover:bg-[#2D303E]'
                }`
              }
            >
              {({ isActive }) => (
                <img 
                  src='/Orders.svg' 
                  className={`w-8 sm:w-10 ${isActive ? 'filter brightness-0 invert' : ''}`}
                  alt="Kitchen Orders"
                />
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}