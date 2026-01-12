import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { ArrowLeft, Activity, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import ControlDetailModal from './ControlDetailModal'; // Assuming this exists

const FrameworkDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [framework, setFramework] = useState(null);
    const [processes, setProcesses] = useState([]);
    const [controls, setControls] = useState([]); // Keep raw controls for stats
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedControl, setSelectedControl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(`Fetching framework ${id}...`);

                // 1. Fetch Framework & Controls (Existing Logic)
                const [fwRes, ctrlRes, procRes] = await Promise.all([
                    axios.get(`/frameworks/${id}`),
                    axios.get(`/controls/?framework_id=${id}`),
                    axios.get('/processes/')
                ]);

                setFramework(fwRes.data);
                setControls(ctrlRes.data);
                
                // 2. Filter Processes relevant to this Framework
                // A process is relevant if it (or its subprocesses) contains a control 
                // that belongs to this framework.
                const relevantProcesses = filterProcessesForFramework(procRes.data, ctrlRes.data);
                setProcesses(relevantProcesses);

                setLoading(false);
            } catch (err) {
                console.error("Fetch failed:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    // Helper to filter and structure the hierarchy
    const filterProcessesForFramework = (allProcesses, frameworkControls) => {
        const fwControlIds = new Set(frameworkControls.map(c => c.id));
        
        return allProcesses.map(proc => {
            // Filter subprocesses
            const relevantSubs = proc.sub_processes.map(sub => {
                // Filter controls within subprocess
                const linkedControls = sub.controls.filter(c => fwControlIds.has(c.id));
                
                // Find full control details (the subprocess only has summary)
                const detailedControls = linkedControls.map(summaryInfo => 
                    frameworkControls.find(fc => fc.id === summaryInfo.id) || summaryInfo
                );

                return { ...sub, controls: detailedControls };
            }).filter(sub => sub.controls.length > 0); // Only keep subs with controls

            return { ...proc, sub_processes: relevantSubs };
        }).filter(proc => proc.sub_processes.length > 0); // Only keep procs with subs
    };

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
    };
    const completion = stats.total > 0 ? Math.round((stats.implemented / stats.total) * 100) : 0;

    return (
        <div className="space-y-6 pb-20"> {/* pb-20 for scroll space */}
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
                        <h1 className="text-3xl font-bold text-gray-900">
                            {framework.name} <span className="text-sm font-normal text-blue-600 bg-blue-50 px-2 py-1 rounded-full align-middle">(Hierarchy View)</span>
                        </h1>
                        <p className="text-gray-500 mt-1">{framework.description}</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-500">Completion</div>
                        <div className="text-2xl font-bold text-blue-600">{completion}%</div>
                    </div>
                </div>
            </div>

            {/* PROCESS HIERARCHY VIEW */}
            <div className="space-y-8">
                {processes.length === 0 ? (
                     <div className="bg-yellow-50 p-6 rounded-lg text-yellow-700 border border-yellow-200">
                        No processes mapped to this framework yet. Showing flat control list below is disabled in this view.
                        <br/>(If you just seeded data, please refresh).
                     </div>
                ) : (
                    processes.map(process => (
                        <div key={process.id} className="space-y-4">
                            {/* Process Header */}
                            <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                                <h2 className="text-xl font-bold text-gray-800">{process.name}</h2>
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                    {process.sub_processes.length} activities
                                </span>
                            </div>

                            {/* SubProcesses Grid */}
                            <div className="grid grid-cols-1 gap-6">
                                {process.sub_processes.map(sub => (
                                    <div key={sub.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                                                {sub.description && <p className="text-xs text-gray-500">{sub.description}</p>}
                                            </div>
                                            <span className="text-xs font-medium text-gray-500">
                                                {sub.controls.length} Controls
                                            </span>
                                        </div>
                                        
                                        <div className="divide-y divide-gray-100">
                                            {sub.controls.map(control => (
                                                <div
                                                    key={control.id}
                                                    onClick={() => setSelectedControl(control)}
                                                    className="px-6 py-3 hover:bg-blue-50 cursor-pointer transition-colors flex items-center justify-between group"
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded group-hover:bg-white">
                                                                {control.control_id}
                                                            </span>
                                                            <span className="text-sm text-gray-700 group-hover:text-blue-700">
                                                                {control.title}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                            control.status === 'IMPLEMENTED' ? 'bg-green-100 text-green-800' :
                                                            control.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-600'
                                                        }`}>
                                                            {control.status?.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
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
