import React, { useState } from 'react';
import {
    FileText,
    Download,
    Edit,
    CheckCircle,
    Clock,
    Plus,
    Search,
    AlertCircle,
    ShieldCheck
} from 'lucide-react';

const MOCK_POLICIES = [
    {
        id: 1,
        name: "Information Security Policy",
        version: "v2.1",
        status: "Approved",
        lastUpdated: "2024-10-15",
        owner: "CISO",
        description: "Overarching security policy defining the organization's security stance."
    },
    {
        id: 2,
        name: "Access Control Policy",
        version: "v1.4",
        status: "Approved",
        lastUpdated: "2024-11-01",
        owner: "IT Manager",
        description: "Defining user access, password requirements, and privilege management."
    },
    {
        id: 3,
        name: "Incident Response Plan",
        version: "v1.0",
        status: "Usage Review",
        lastUpdated: "2025-01-10",
        owner: "Security Ops",
        description: "Procedures for detecting, responding to, and recovering from security incidents."
    },
    {
        id: 4,
        name: "Data Classification Policy",
        version: "v0.9",
        status: "Draft",
        lastUpdated: "2025-01-05",
        owner: "Legal",
        description: "Framework for classifying data sensitivity (Public, Internal, Confidential)."
    },
    {
        id: 5,
        name: "Vendor Risk Management Policy",
        version: "v1.1",
        status: "Approved",
        lastUpdated: "2024-09-20",
        owner: "Compliance",
        description: "Standards for assessing and managing third-party vendor risks."
    }
];

const StatusBadge = ({ status }) => {
    let styles = "bg-gray-100 text-gray-700";
    let icon = <Clock className="w-3 h-3" />;

    if (status === 'Approved') {
        styles = "bg-green-100 text-green-700 border-green-200";
        icon = <CheckCircle className="w-3 h-3" />;
    } else if (status === 'Usage Review' || status === 'Review') {
        styles = "bg-orange-100 text-orange-800 border-orange-200";
        icon = <AlertCircle className="w-3 h-3" />;
    } else if (status === 'Draft') {
        styles = "bg-gray-100 text-gray-600 border-gray-200";
        icon = <Edit className="w-3 h-3" />;
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
            {icon} {status}
        </span>
    );
};

const Policies = () => {
    const [policies, setPolicies] = useState(MOCK_POLICIES);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewingPolicy, setViewingPolicy] = useState(null); // For Approval Modal

    const handleApprove = () => {
        // Mock approval logic
        setPolicies(policies.map(p =>
            p.id === viewingPolicy.id
                ? { ...p, status: 'Approved', version: (parseFloat(p.version.replace('v', '')) + 0.1).toFixed(1) } // Bump version? or just approve. Let's keep simple.
                : p
        ));
        setViewingPolicy(null);
    };

    const filteredPolicies = policies.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 h-full relative">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Policy Management</h1>
                    <p className="text-sm text-gray-500">Create, review, and approve internal governance documents.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    New Policy template
                </button>
            </div>

            {/* Search */}
            <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search policies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 w-full text-sm border-none focus:ring-0 text-gray-600"
                    />
                </div>
            </div>

            {/* Policies List */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Document Name</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Version</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Last Updated</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Owner</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredPolicies.map((policy) => (
                            <tr
                                key={policy.id}
                                onClick={() => setViewingPolicy(policy)}
                                className="hover:bg-gray-50 transition-colors group cursor-pointer"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">{policy.name}</div>
                                            <div className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-xs">{policy.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-mono text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        {policy.version}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={policy.status} />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {policy.lastUpdated}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                            {policy.owner[0]}
                                        </div>
                                        {policy.owner}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {policy.status !== 'Approved' ? (
                                        <span className="text-xs font-bold text-blue-600 hover:text-blue-800">Review</span>
                                    ) : (
                                        <span className="text-gray-400">
                                            <Download className="w-4 h-4 ml-auto" />
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Approval / View Modal */}
            {viewingPolicy && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-0 max-w-2xl w-full mx-4 overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-400" />
                                {viewingPolicy.name}
                                <span className="text-xs font-mono font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{viewingPolicy.version}</span>
                            </h2>
                            <button
                                onClick={() => setViewingPolicy(null)}
                                className="p-1 hover:bg-gray-200 rounded text-gray-500"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 overflow-y-auto flex-1 bg-white">
                            <div className="prose prose-sm max-w-none text-gray-600">
                                <h3>1. Purpose</h3>
                                <p>{viewingPolicy.description}</p>
                                <p>This policy applies to all employees, contractors, and third parties...</p>
                                <h3>2. Scope</h3>
                                <p>Includes all workstations, servers, and mobile devices connecting to corporate networks...</p>
                                <h3>3. Policy Statement</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
                                <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 my-4 text-yellow-800 text-xs">
                                    Note: This is a preview of the policy content generated from templates.
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer / Actions */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => setViewingPolicy(null)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm"
                            >
                                Close
                            </button>
                            {viewingPolicy.status !== 'Approved' && (
                                <button
                                    onClick={handleApprove}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold text-sm shadow-sm flex items-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    Approve Policy
                                </button>
                            )}
                            {viewingPolicy.status === 'Approved' && (
                                <button className="px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 font-medium text-sm text-gray-700 flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Policies;
