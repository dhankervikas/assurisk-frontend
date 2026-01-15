
import React, { useState, useEffect } from 'react';
import { auditService } from '../../services/auditService';
import { Shield, LayoutGrid, List, Layers, AlertTriangle, CheckCircle, Clock, Search, Filter } from 'lucide-react';

const mockBanner = (
    <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-6 py-2 flex items-center justify-center gap-2 text-sm font-bold shadow-inner">
        <AlertTriangle className="w-4 h-4" />
        SIMULATION MODE: DISPLAYING MOCK AUDIT EVIDENCE
    </div>
);

const AuditorDashboard = () => {
    const [viewMode, setViewMode] = useState('CLAUSE'); // CLAUSE, CONTROL, PROCESS
    const [evidence, setEvidence] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, PENDING, REJECTED

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [evidenceData, statsData] = await Promise.all([
                auditService.getEvidence(),
                auditService.getStats()
            ]);
            setEvidence(evidenceData);
            setStats(statsData);
            setLoading(false);
        } catch (err) {
            console.error("Failed to load audit data", err);
            setLoading(false);
        }
    };

    // Grouping Logic
    const getGroupedData = () => {
        const filtered = evidence.filter(item =>
            filter === 'ALL' ||
            (filter === 'PENDING' && item.status === 'PENDING') ||
            (filter === 'REJECTED' && (item.status === 'NON_CONFORMITY' || item.status === 'NEEDS_CLARIFICATION'))
        );

        if (viewMode === 'CLAUSE') {
            // Group by A.5, A.6 etc (derived from Control ID)
            const groups = {};
            filtered.forEach(item => {
                const clause = item.control_id.split('.').slice(0, 2).join('.'); // A.5
                if (!groups[clause]) groups[clause] = [];
                groups[clause].push(item);
            });
            return groups;
        }
        else if (viewMode === 'CONTROL') {
            const groups = {};
            filtered.forEach(item => {
                if (!groups[item.control_id]) groups[item.control_id] = [];
                groups[item.control_id].push(item);
            });
            return groups;
        }
        else {
            // PROCESS (Group by Domain)
            const groups = {};
            filtered.forEach(item => {
                const domain = item.domain || 'Uncategorized';
                if (!groups[domain]) groups[domain] = [];
                groups[domain].push(item);
            });
            return groups;
        }
    };

    const groupedEvidence = getGroupedData();

    if (loading) return <div className="p-12 text-center text-gray-500">Loading Auditor Interface...</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            {mockBanner}

            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-900 text-white p-2 rounded-lg">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Auditor Console</h1>
                        <p className="text-xs text-gray-500">ISO 27001:2022 Certification Audit (Stage 2)</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* View Switcher */}
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('CLAUSE')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition ${viewMode === 'CLAUSE' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <LayoutGrid className="w-4 h-4" /> Clauses
                        </button>
                        <button
                            onClick={() => setViewMode('CONTROL')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition ${viewMode === 'CONTROL' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <List className="w-4 h-4" /> Controls
                        </button>
                        <button
                            onClick={() => setViewMode('PROCESS')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition ${viewMode === 'PROCESS' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Layers className="w-4 h-4" /> Processes
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-4 px-8 py-4 bg-white border-b border-gray-200">
                <div className="border border-green-200 bg-green-50 p-3 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-xs text-green-600 font-bold uppercase">Verified</p>
                        <p className="text-2xl font-bold text-green-900">{stats?.verified || 0}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-400 opacity-50" />
                </div>
                <div className="border border-yellow-200 bg-yellow-50 p-3 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-xs text-yellow-600 font-bold uppercase">Pending</p>
                        <p className="text-2xl font-bold text-yellow-900">{stats?.pending || 0}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-400 opacity-50" />
                </div>
                <div className="border border-red-200 bg-red-50 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-100" onClick={() => setFilter('REJECTED')}>
                    <div>
                        <p className="text-xs text-red-600 font-bold uppercase">Issues</p>
                        <p className="text-2xl font-bold text-red-900">{(stats?.non_conformity + stats?.needs_clarification) || 0}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-400 opacity-50" />
                </div>
                <div className="border border-gray-200 bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Total Evidence</p>
                        <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
                    </div>
                    <div className="text-xs text-gray-400 font-mono text-right">
                        Target: 100%<br />
                        Coverage
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-6">
                    {Object.keys(groupedEvidence).map(groupKey => (
                        <div key={groupKey} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <span className="bg-white px-2 py-0.5 rounded border border-gray-300 text-xs font-mono text-gray-500">{viewMode === 'CLAUSE' ? 'Clause' : viewMode === 'CONTROL' ? 'Control' : 'Domain'}</span>
                                    {groupKey}
                                </h3>
                                <span className="text-xs font-medium text-gray-500">{groupedEvidence[groupKey].length} items</span>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {groupedEvidence[groupKey].map(item => (
                                    <div key={item.id} className="p-4 hover:bg-blue-50/30 w-full text-left transition flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            {getStatusIcon(item.status)}
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-mono text-xs text-gray-400 bg-gray-100 px-1.5 rounded">{item.control_id}</span>
                                                    <h4 className="font-semibold text-gray-900 text-sm">{item.resource_name}</h4>
                                                </div>
                                                <p className="text-xs text-gray-500 line-clamp-1">{item.control_name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-gray-400">{new Date(item.submitted_at).toLocaleDateString()}</span>
                                            <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded text-gray-600 hover:bg-white hover:border-blue-500 hover:text-blue-600 transition bg-white shadow-sm opacity-0 group-hover:opacity-100">
                                                Review
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'VERIFIED': return <CheckCircle size={18} className="text-green-500" />;
        case 'NON_CONFORMITY': return <AlertTriangle size={18} className="text-red-500" />;
        case 'NEEDS_CLARIFICATION': return <AlertTriangle size={18} className="text-orange-500" />;
        default: return <Clock size={18} className="text-gray-400" />;
    }
};

export default AuditorDashboard;
