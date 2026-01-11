import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

// Contexts
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FrameworkDetail from './components/FrameworkDetail';
import Tests from './components/Tests';
import People from './components/People';
import Vendors from './components/Vendors';
import Policies from './components/Policies';
import Evidence from './components/Evidence';
import RiskRegister from './components/RiskRegister';
import AccessReviews from './components/AccessReviews';

// Layout Component to wrap protected pages with Sidebar
const ProtectedLayout = () => {
    const { user, loading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-gray-50">Loading...</div>;
    }

    if (!user) {
        // Redirect to login, saving the location they tried to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Public Route */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedLayout />}>
                        <Route path="/" element={<Dashboard />} />

                        <Route path="/frameworks/:id" element={<FrameworkDetail />} />
                        <Route path="/tests" element={<Tests />} />
                        <Route path="/people" element={<People />} />
                        <Route path="/vendors" element={<Vendors />} />
                        <Route path="/policies" element={<Policies />} />
                        <Route path="/evidence" element={<Evidence />} />
                        <Route path="/risk-register" element={<RiskRegister />} />
                        <Route path="/access-reviews" element={<AccessReviews />} />

                        <Route path="/trust-center" element={<div className="p-8">Trust Center Coming Soon</div>} />
                        <Route path="/questionnaires" element={<div className="p-8">Questionnaires Coming Soon</div>} />
                    </Route>

                    {/* Catch all - Redirect to Dashboard (which will redirect to Login if needed) */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
