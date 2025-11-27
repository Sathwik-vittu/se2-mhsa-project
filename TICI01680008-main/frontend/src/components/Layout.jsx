import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FiHome, FiCalendar, FiMessageSquare, FiUser, FiLogOut, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { GiMedicines } from 'react-icons/gi';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/app/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/app/medications', label: 'Medications', icon: GiMedicines },
    { path: '/app/appointments', label: 'Appointments', icon: FiCalendar },
    { path: '/app/forum', label: 'Community Forum', icon: FiMessageSquare },
    { path: '/app/profile', label: 'Profile', icon: FiUser },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
              <div className="flex items-center ml-2 lg:ml-0">
                <div className="bg-indigo-600 p-1.5 rounded-lg mr-2">
                  <FiHeart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  MindCare
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex flex-col items-end mr-2">
                <span className="text-sm font-medium text-gray-900">{user?.full_name || user?.username}</span>
                <span className="text-xs text-gray-500">Member</span>
              </div>
              <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Logout"
              >
                <FiLogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16 h-screen overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg lg:shadow-none border-r border-gray-200 transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            pt-16 lg:pt-0 flex flex-col
          `}
        >
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
                    ${active 
                      ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 mr-3 transition-colors ${active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span className="font-medium">{item.label}</span>
                  {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
                </Link>
              );
            })}
          </nav>

          {/* Crisis Help */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <h4 className="text-sm font-bold text-red-700">Crisis Support</h4>
              </div>
              <p className="text-xs text-red-600 mb-2">
                If you're in crisis, help is available 24/7.
              </p>
              <a href="tel:988" className="block w-full py-2 bg-white border border-red-200 text-red-600 text-center rounded-lg text-xs font-bold hover:bg-red-50 transition-colors">
                Call 988
              </a>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-gray-900/50 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8 w-full">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
