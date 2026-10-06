import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  Code2, 
  Briefcase, 
  FileText, 
  History, 
  MessageSquareQuote, 
  Settings, 
  Image as ImageIcon,
  Mail,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'About', path: '/about', icon: UserCircle },
  { name: 'Skills', path: '/skills', icon: Code2 },
  { name: 'Projects', path: '/projects', icon: Briefcase },
  { name: 'Blogs', path: '/blogs', icon: FileText },
  { name: 'Experience', path: '/experience', icon: History },
  { name: 'Testimonials', path: '/testimonials', icon: MessageSquareQuote },
  { name: 'Services', path: '/services', icon: Settings },
  { name: 'Media', path: '/media', icon: ImageIcon },
  { name: 'Messages', path: '/messages', icon: Mail },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6 bg-slate-950 border-b border-slate-800">
        <span className="text-lg font-bold tracking-wider uppercase">CMS Admin</span>
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white transition-colors"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Auto-close sidebar on mobile when a link is clicked
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-400 hover:bg-slate-800 hover:text-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;