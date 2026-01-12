import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Shield, 
  AlertTriangle, 
  Users, 
  Settings,
  LogOut,
  CheckCircle,
  User as UserIcon
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth(); // Get user from context

  const handleLogout = () => {
    // NUCLEAR OPTION: Direct browser navigation for reliable logout
    if (window.confirm("Are you sure you want to logout?")) {
        localStorage.removeItem('token');
        localStorage.clear();
        window.location.href = '/login';
    }
  };

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/frameworks', icon: Shield, label: 'Frameworks' },
    { path: '/evidence', icon: FileText, label: 'Evidence' },
    { path: '/risk', icon: AlertTriangle, label: 'Risk Register' },
    { path: '/access-reviews', icon: Users, label: 'Access Reviews' },
    { path: '/policies', icon: CheckCircle, label: 'Policies' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  // Helper to get initials
  const getInitials = (name) => {
      if (!name) return 'U';
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const displayName = user?.full_name || user?.username || 'User';
  const displayRole = user?.role || 'Member';

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col fixed left-0 top-0 z-[50]">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">AssuRisk</h1>
        <p className="text-sm text-gray-400">Compliance Platform</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* RE-ADDED PROFILE FOOTER */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {getInitials(displayName)}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="font-medium truncate text-sm">{displayName}</span>
                    <span className="text-xs text-gray-400 capitalize">{displayRole}</span>
                </div>
            </div>
            
            <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded hover:bg-gray-700 cursor-pointer"
                title="Logout"
            >
                <LogOut size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
