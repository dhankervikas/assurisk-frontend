import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { ArrowLeft, Activity, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import ControlDetailModal from './ControlDetailModal'; // Assuming this exists

const FrameworkDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [framework, setFramework] = useState(null);
    const [controls, setControls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedControl, setSelectedControl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Determine if ID is int or string (code)
                // Backend expects ID (int). 
                // If user somehow navigated with code, this might fail unless backend supports it.
                // Assuming ID for now.

                console.log(`Fetching framework ${id}...`);

                const fwRes = await axios.get(`/frameworks/${id}`);
                const ctrlRes = await axios.get(`/controls/?framework_id=${id}`);

                setFramework(fwRes.data);
                setControls(ctrlRes.data);
                setLoading(false);
            } catch (err) {
                console.error("Framework fetch failed:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading framework...</div>;

    if (error) return (
        <div className="p-8 flex flex-col items-center text-red-600">
            <AlertTriangle className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-bold">Error Loading Framework</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">
                Return to Dashboard
            </button>
        </div>
    );

    if (!framework) return <div className="p-8">Framework not found.</div>;

    const stats = {
        total: controls.length,
        implemented: controls.filter(c => c.status === 'IMPLEMENTED').length,
        inProgress: controls.filter(c => c.status === 'IN_PROGRESS').length,
        notStarted: controls.filter(c => c.status === 'NOT_STARTED').length
    };

    const completion = stats.total > 0 ? Math.round((stats.implemented / stats.total) * 100) : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>

                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{framework.name}</h1>
                        <p className="text-gray-500 mt-1">{framework.description}</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-500">Completion</div>
                        <div className="text-2xl font-bold text-blue-600">{completion}%</div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <div className="text-xs text-gray-500 uppercase font-semibold">Total Controls</div>
                    </div>
                </div>
                {/* ... other stats ... */}
            </div>

            {/* Controls List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Controls</h2>
                </div>
                <div className="divide-y divide-gray-100">
                    {controls.map(control => (
                        <div
                            key={control.id}
                            onClick={() => setSelectedControl(control)}
                            className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                        {control.control_id}
                                    </span>
                                    <h3 className="text-sm font-medium text-gray-900">{control.title}</h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${control.status === 'IMPLEMENTED' ? 'bg-green-50 text-green-700 border-green-200' :
                                        control.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            'bg-gray-50 text-gray-600 border-gray-200'
                                    }`}>
                                    {control.status.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedControl && (
                <ControlDetailModal
                    control={selectedControl}
                    onClose={() => setSelectedControl(null)}
                    // Pass callback to refresh data if needed
                    onUpdate={() => {
                        // refresh logic
                    }}
                />
            )}
        </div>
    );
};

export default FrameworkDetail;
