
import React, { useState, useEffect } from 'react';
import { auditService } from '../../services/auditService';
import { Shield, Layers, AlertTriangle, CheckCircle, Clock, ArrowRight, FileText, Lock, X, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

const mockBanner = (
    <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-6 py-2 flex items-center justify-center gap-2 text-sm font-bold shadow-inner">
        <AlertTriangle className="w-4 h-4" />
        SIMULATION MODE: DISPLAYING MOCK AUDIT EVIDENCE
    </div>
);

const AuditorDashboard = () => {
    const [viewMode, setViewMode] = useState(null); // null (Selector), CLAUSE, CONTROL, PROCESS
    const [evidence, setEvidence] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [selectedEvidence, setSelectedEvidence] = useState(null);
    const [reviewComment, setReviewComment] = useState('');

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

    const handleReviewAction = async (status) => {
        if (!selectedEvidence) return;

        if ((status === 'NON_CONFORMITY' || status === 'NEEDS_CLARIFICATION') && !reviewComment.trim()) {
            alert("A comment is required for rejection or clarification requests.");
            return;
        }

        try {
            await auditService.reviewEvidence(selectedEvidence.id, {
                status: status,
                comment: reviewComment
            });

            // Refresh Data
            await loadData();
            setSelectedEvidence(null);
            setReviewComment('');
        } catch (err) {
            console.error("Review failed", err);
            alert("Failed to submit review. Check console.");
        }
    };

    // Grouping Logic - ISO 27001:2022
    const getGroupedData = () => {
        const filtered = evidence.filter(item =>
            filter === 'ALL' ||
            (filter === 'PENDING' && item.status === 'PENDING') ||
            (filter === 'REJECTED' && (item.status === 'NON_CONFORMITY' || item.status === 'NEEDS_CLARIFICATION'))
        );

        const groups = {};

        if (viewMode === 'CLAUSE') {
            // Group by Clause 4-10
            filtered.forEach(item => {
                if (item.type === 'CLAUSE' || !item.type) { // Handle mock data types
                    // Extract Clause Number (4, 5, 6...)
                    const match = item.control_id.match(/^(\d+)/);
                    const clauseNum = match ? match[1] : 'Other';
                    const key = `Clause ${clauseNum}: ${item.domain || 'General'}`;
                    if (!groups[key]) groups[key] = [];
                    groups[key].push(item);
                }
            });
        }
        else if (viewMode === 'CONTROL') {
            // Group by Theme (A.5 - A.8)
            filtered.forEach(item => {
                let theme = 'Other Controls';
                if (item.control_id.startsWith('A.5')) theme = 'A.5 Organizational Controls';
                else if (item.control_id.startsWith('A.6')) theme = 'A.6 People Controls';
                else if (item.control_id.startsWith('A.7')) theme = 'A.7 Physical Controls';
                else if (item.control_id.startsWith('A.8')) theme = 'A.8 Technological Controls';

                if (!groups[theme]) groups[theme] = [];
                groups[theme].push(item);
            });
            // Sort by Control ID within Theme
            Object.keys(groups).forEach(key => {
                groups[key].sort((a, b) => a.control_id.localeCompare(b.control_id, undefined, { numeric: true, sensitivity: 'base' }));
            });
        }
        else if (viewMode === 'PROCESS') {
            // Group by Process Tag
            filtered.forEach(item => {
                const process = item.process || 'Uncategorized';
                if (!groups[process]) groups[process] = [];
                groups[process].push(item);
            });
            // Sort by Control ID within Process to enable sub-headers
            Object.keys(groups).forEach(key => {
                groups[key].sort((a, b) => a.control_id.localeCompare(b.control_id, undefined, { numeric: true, sensitivity: 'base' }));
            });
        }
        return groups;
    };

    const groupedEvidence = viewMode ? getGroupedData() : {};

    if (loading) return <div className="p-12 text-center text-gray-500">Loading Auditor Interface...</div>;

    // LANDING SCREEN
    if (!viewMode) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                        <Shield className="w-10 h-10 text-blue-900" />
                        Auditor View Preference
                    </h1>
                    <p className="text-gray-500 mt-2">Select how you would like to structure the evidence review.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                    {/* OPTION 1: CLAUSES */}
                    <button onClick={() => setViewMode('CLAUSE')} className="bg-white p-8 rounded-xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-md transition text-left group">
                        <div className="w-14 h-14 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <FileText className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">View by Clauses</h3>
                        <p className="text-sm text-gray-500 mb-6">Structure evidence according to ISMS Clauses 4 to 10 (Context, Leadership, Planning, etc.)</p>
                        <span className="text-blue-600 font-medium flex items-center gap-2 text-sm group-hover:underline">Select View <ArrowRight className="w-4 h-4" /></span>
                    </button>

                    {/* OPTION 2: CONTROLS (THEMES) */}
                    <button onClick={() => setViewMode('CONTROL')} className="bg-white p-8 rounded-xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-md transition text-left group">
                        <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Lock className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">View by Controls</h3>
                        <p className="text-sm text-gray-500 mb-6">Group evidence by the 4 Annex A Themes: Organizational, People, Physical, and Technological.</p>
                        <span className="text-blue-600 font-medium flex items-center gap-2 text-sm group-hover:underline">Select View <ArrowRight className="w-4 h-4" /></span>
                    </button>

                    {/* OPTION 3: PROCESSES */}
                    <button onClick={() => setViewMode('PROCESS')} className="bg-white p-8 rounded-xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-md transition text-left group">
                        <div className="w-14 h-14 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Layers className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">View by Process</h3>
                        <p className="text-sm text-gray-500 mb-6">Align evidence with the organization's core business processes (e.g., HR, Engineering, SecOps).</p>
                        <span className="text-blue-600 font-medium flex items-center gap-2 text-sm group-hover:underline">Select View <ArrowRight className="w-4 h-4" /></span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            {mockBanner}

            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => setViewMode(null)} className="hover:bg-gray-100 p-2 rounded-full transition" title="Change View">
                        <ArrowRight className="w-5 h-5 rotate-180 text-gray-500" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Auditor Console</h1>
                        <p className="text-xs text-gray-500">ISO 27001:2022 • {viewMode === 'CLAUSE' ? 'Clauses 4-10' : viewMode === 'CONTROL' ? 'Annex A Themes' : 'Business Processes'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* View Switcher (Mini) */}
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button onClick={() => setViewMode('CLAUSE')} className={`px-3 py-1.5 rounded-md text-xs font-medium ${viewMode === 'CLAUSE' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>Clauses</button>
                        <button onClick={() => setViewMode('CONTROL')} className={`px-3 py-1.5 rounded-md text-xs font-medium ${viewMode === 'CONTROL' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>Controls</button>
                        <button onClick={() => setViewMode('PROCESS')} className={`px-3 py-1.5 rounded-md text-xs font-medium ${viewMode === 'PROCESS' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>Processes</button>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-4 px-8 py-4 bg-white border-b border-gray-200">
                {/* Stats omitted for brevity, same as before but using updated state */}
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
                        <p className="text-xs text-gray-500 font-bold uppercase">Total Scope</p>
                        <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-8">
                    {Object.keys(groupedEvidence).sort().map(groupKey => (
                        <div key={groupKey} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    {groupKey}
                                </h3>
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{groupedEvidence[groupKey].length} items</span>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {groupedEvidence[groupKey].map((item, index) => {
                                    // Logic for Sub-Header: Show if first item OR control_id changes
                                    const showHeader = viewMode === 'PROCESS' && (index === 0 || item.control_id !== groupedEvidence[groupKey][index - 1].control_id);

                                    return (
                                        <React.Fragment key={item.id}>
                                            {showHeader && (
                                                <div className="bg-slate-50 border-y border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-800 flex items-center gap-3">
                                                    <span className="bg-indigo-100 text-indigo-700 font-mono px-2 py-0.5 rounded text-xs border border-indigo-200">{item.control_id}</span>
                                                    <span className="text-gray-900">{item.control_name}</span>
                                                    {item.control_description && (
                                                        <span className="font-normal text-gray-500 text-xs hidden sm:inline border-l border-gray-300 pl-3 leading-tight">
                                                            {item.control_description}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="p-4 hover:bg-blue-50/30 w-full text-left transition flex items-center justify-between group pl-8 border-l-4 border-l-transparent hover:border-l-blue-400">
                                                <div className="flex items-center gap-4">
                                                    {getStatusIcon(item.status)}
                                                    <div>
                                                        {/* Simplified View for Child Items */}
                                                        <div className="flex items-center gap-2 mb-1">
                                                            {/* Only show domain if NOT in process mode (redundant otherwise?) No, keep it. */}
                                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.domain}</span>
                                                        </div>
                                                        <h4 className="font-medium text-gray-900 text-sm">{item.control_name}</h4>
                                                        <p className="text-xs text-gray-500 mt-0.5">{item.resource_name}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs text-gray-400">{new Date(item.submitted_at).toLocaleDateString()}</span>
                                                    <button
                                                        onClick={() => setSelectedEvidence(item)}
                                                        className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded text-gray-600 hover:bg-white hover:border-blue-500 hover:text-blue-600 transition bg-white shadow-sm opacity-0 group-hover:opacity-100"
                                                    >
                                                        Review Evidence
                                                    </button>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    {Object.keys(groupedEvidence).length === 0 && (
                        <div className="text-center py-20 text-gray-400">
                            No evidence found for this view.
                        </div>
                    )}
                </div>
            </div>

            {/* REVIEW MODAL */}
            {selectedEvidence && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-gray-900">Review Evidence</h3>
                            <button onClick={() => setSelectedEvidence(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto">
                            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded">{selectedEvidence.control_id}</span>
                                    <span className="text-xs text-gray-500">{new Date(selectedEvidence.submitted_at).toLocaleString()}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1">{selectedEvidence.control_name}</h4>
                                <p className="text-sm text-gray-600">{selectedEvidence.resource_name}</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Evidence Payload (Mock)</label>
                                    <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                                        {JSON.stringify(selectedEvidence.raw_payload, null, 2)}
                                    </pre>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Auditor Comment</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute top-3 left-3 w-4 h-4 text-gray-400" />
                                        <textarea
                                            value={reviewComment}
                                            onChange={(e) => setReviewComment(e.target.value)}
                                            placeholder="Enter comments for rejection or clarification..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">* Required for rejection</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-between gap-3">
                            <button
                                onClick={() => handleReviewAction('NEEDS_CLARIFICATION')}
                                className="flex-1 py-2.5 px-4 bg-white border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 font-medium text-sm flex items-center justify-center gap-2"
                            >
                                <AlertTriangle className="w-4 h-4" />
                                Request Info
                            </button>
                            <button
                                onClick={() => handleReviewAction('NON_CONFORMITY')}
                                className="flex-1 py-2.5 px-4 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium text-sm flex items-center justify-center gap-2"
                            >
                                <ThumbsDown className="w-4 h-4" />
                                Mark Non-Conforming
                            </button>
                            <button
                                onClick={() => handleReviewAction('VERIFIED')}
                                className="flex-[2] py-2.5 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
                            >
                                <ThumbsUp className="w-4 h-4" />
                                Verify & Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'VERIFIED': return <CheckCircle size={20} className="text-green-500" />;
        case 'NON_CONFORMITY': return <AlertTriangle size={20} className="text-red-500" />;
        case 'NEEDS_CLARIFICATION': return <AlertTriangle size={20} className="text-orange-500" />;
        default: return <Clock size={20} className="text-gray-300" />;
    }
};

export default AuditorDashboard;
