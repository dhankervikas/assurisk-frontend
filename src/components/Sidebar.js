import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Shield,
    FileText,
    Users,
    AlertTriangle,
    LogOut,
    Menu,
    X,
    PieChart,
    Lock,
    BookOpen,
    Briefcase
} from 'lucide-react';

const Sidebar = ({ isOpen, toggle }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems = [
        {
            label: 'COMPLIANCE', items: [
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
                { id: 'tests', label: 'Automated Tests', icon: ActivityIcon, path: '/tests' },
                { id: 'controls', label: 'Controls', icon: Shield, path: '/frameworks/1' }, // Defaulting to first framework or separate page
                { id: 'people', label: 'People', icon: Users, path: '/people' },
                { id: 'vendors', label: 'Vendors', icon: Briefcase, path: '/vendors' },
            ]
        },
        {
            label: 'DOCUMENTS', items: [
                { id: 'policies', label: 'Policies', icon: BookOpen, path: '/policies' },
                { id: 'evidence', label: 'Evidence Library', icon: FileText, path: '/evidence' },
            ]
        },
        {
            label: 'RISK & SECURITY', items: [
                { id: 'risk', label: 'Risk Register', icon: AlertTriangle, path: '/risk-register' },
                { id: 'access', label: 'Access Reviews', icon: Lock, path: '/access-reviews' },
            ]
        },
        {
            label: 'TRUST', items: [
                { id: 'trust', label: 'Trust Center', icon: Shield, path: '/trust-center' },
                { id: 'questionnaires', label: 'Questionnaires', icon: FileText, path: '/questionnaires' },
            ]
        }
    ];

    // Helper icon component wrapper if needed, or just use lucide directly
    function ActivityIcon(props) {
        return <PieChart {...props} />;
    }

    return (
        <div className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 h-screen text-white transition-all duration-300 flex flex-col border-r border-slate-800 shadow-xl z-20`}>
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950">
                <div className={`font-bold text-xl flex items-center gap-2 ${!isOpen && 'hidden'}`}>
                    <Shield className="w-8 h-8 text-blue-500" />
                    <span>AssuRisk</span>
                </div>
                <button onClick={toggle} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 space-y-8 px-3 scrollbar-thin scrollbar-thumb-slate-700">
                {menuItems.map((section, idx) => (
                    <div key={idx}>
                        {isOpen && (
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">
                                {section.label}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {section.items.map(item => {
                                const Icon = item.icon;
                                // Robust active check: exact match or starts with (for sub-routes)
                                const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));

                                return (
                                    <Link
                                        key={item.id}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${isActive
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                            }`}
                                        title={!isOpen ? item.label : ''}
                                    >
                                        <div className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`}>
                                            <Icon size={20} className={isActive ? 'animate-pulse-subtle' : ''} />
                                        </div>
                                        {isOpen && <span>{item.label}</span>}

                                        {isOpen && isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile */}
            <div className={`p-4 border-t border-slate-800 bg-slate-950 ${!isOpen && 'items-center justify-center flex'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold shadow-lg">
                        JD
                    </div>
                    {isOpen && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Jane Doe</p>
                            <p className="text-xs text-slate-500 truncate">Admin</p>
                        </div>
                    )}
                    {isOpen && (
                        <button className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
