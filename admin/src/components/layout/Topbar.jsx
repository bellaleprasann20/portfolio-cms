import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Topbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth(); // Assuming you have this hook set up

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="text-gray-500 focus:outline-none lg:hidden hover:text-gray-700"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center text-gray-700">
          <User className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-sm font-medium hidden sm:block">
            {user?.email || 'Admin User'}
          </span>
        </div>
        
        <button 
          onClick={logout}
          className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;