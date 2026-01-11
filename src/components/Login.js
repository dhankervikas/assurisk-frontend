import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [localError, setLocalError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setLocalError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        setIsSubmitting(true);

        if (!formData.username || !formData.password) {
            setLocalError('Please enter both username and password');
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await login(formData.username, formData.password);
            if (!result.success) {
                setLocalError(result.error);
            }
            // If success, the useEffect above will trigger navigation
        } catch (err) {
            setLocalError("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-slate-900 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4 shadow-lg shadow-blue-500/50">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="text-blue-200 mt-2">Sign in to AssuRisk Compliance Platform</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {localError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {localError}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow active:scale-[0.98] transform duration-100 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Contact Admin</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
