import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import {
    Upload,
    FileText,
    Trash2,
    Eye,
    Download,
    Search,
    CheckCircle,
    AlertCircle,
    Paperclip,
    AlertTriangle
} from 'lucide-react';

const Evidence = () => {
    const [evidence, setEvidence] = useState([]);
    const [controls, setControls] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Debug Error States
    const [controlError, setControlError] = useState(null);
    const [evidenceError, setEvidenceError] = useState(null);

    // Upload Modal State
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedControlId, setSelectedControlId] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const fetchControls = async () => {
        try {
            const res = await axios.get('/controls/');
            console.log("Controls loaded:", res.data);
            setControls(res.data);
            setControlError(null);
        } catch (err) {
            console.error("Controls failed:", err);
            setControlError(err.message + (err.response ? ` (${err.response.status})` : ''));
        }
    };

    const fetchEvidence = async () => {
        try {
            const res = await axios.get('/evidence/');
            console.log("Evidence loaded:", res.data);
            setEvidence(res.data);
            setEvidenceError(null);
        } catch (err) {
            console.error("Evidence failed:", err);
            setEvidenceError(err.message + (err.response ? ` (${err.response.status})` : ''));
        }
    };

    useEffect(() => {
        Promise.allSettled([fetchControls(), fetchEvidence()]).then(() => {
            setLoading(false);
        });
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile || !selectedControlId) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('control_id', selectedControlId);
        formData.append('title', selectedFile.name);
        formData.append('description', description);

        try {
            await axios.post('/evidence/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            await fetchEvidence(); // Refresh list
            setUploadModalOpen(false);
            resetForm();
        } catch (err) {
            console.error("Upload failed", err);
            alert("Upload failed: " + (err.response?.data?.detail || err.message));
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this evidence?")) return;
        try {
            // Mock delete for now if endpoint missing
            // await axios.delete(`/evidence/${id}`);
            setEvidence(evidence.filter(e => e.id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const resetForm = () => {
        setSelectedFile(null);
        setSelectedControlId('');
        setDescription('');
    };

    const filteredEvidence = evidence.filter(item => {
        const matchesSearch = item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' ||
            (filter === 'manual' && item.validation_source === 'manual') ||
            (filter === 'automated' && item.validation_source !== 'manual');
        return matchesSearch && matchesFilter;
    });

    if (loading) return <div className="p-8 text-center text-gray-500">Loading data...</div>;

    return (
        <div className="space-y-6 h-full relative">

            {/* DEBUG ERROR BANNERS */}
            {controlError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    <div>
                        <p className="font-bold">Error Loading Controls</p>
                        <p className="text-sm">{controlError}</p>
                    </div>
                </div>
            )}
            {evidenceError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    <div>
                        <p className="font-bold">Error Loading Evidence</p>
                        <p className="text-sm">{evidenceError}</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Evidence Library</h1>
                    <p className="text-sm text-gray-500">Central repository for all compliance artifacts.</p>
                </div>
                <button
                    onClick={() => setUploadModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2"
                    disabled={controls.length === 0}
                >
                    <Upload className="w-5 h-5" />
                    Upload Evidence
                </button>
            </div>

            {/* Filters */}
            <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-slate-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('manual')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'manual' ? 'bg-slate-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Manual Uploads
                    </button>
                    <button
                        onClick={() => setFilter('automated')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'automated' ? 'bg-slate-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Automated
                    </button>
                </div>
                <div className="relative mr-2">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 w-64 text-sm bg-gray-50 border-none rounded-lg focus:ring-0"
                    />
                </div>
            </div>

            {/* Evidence List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">File Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Source</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Linked Control</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredEvidence.map(item => {
                            const isAutomated = item.validation_source !== 'manual';
                            return (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${isAutomated ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{item.title}</div>
                                                <div className="text-xs text-gray-500">{new Date(item.uploaded_at).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {isAutomated ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded">
                                                <CheckCircle className="w-3 h-3" /> System
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                                                <Upload className="w-3 h-3" /> Manual
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.control_id ? (
                                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                                {controls.find(c => c.id === item.control_id)?.control_id || item.control_id}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 italic">Unlinked</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-2 py-1 rounded-full">
                                            <CheckCircle className="w-3 h-3" /> Valid
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="Preview">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded" title="Download">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredEvidence.length === 0 && !evidenceError && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-gray-50 p-4 rounded-full mb-3">
                                            <Upload className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <p className="font-medium text-gray-900">No evidence found</p>
                                        <p className="text-sm">Upload a file or run an automated test to generate evidence.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Upload Modal */}
            {uploadModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 animate-scale-in">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Evidence</h2>

                        <form onSubmit={handleUpload} className="space-y-4">
                            {/* File Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select File
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.xls"
                                    />
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    {selectedFile ? (
                                        <p className="text-sm font-medium text-blue-600 truncate px-4">{selectedFile.name}</p>
                                    ) : (
                                        <p className="text-sm text-gray-500">Click to browse or drag file here</p>
                                    )}
                                </div>
                            </div>

                            {/* Control Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Link to Control
                                </label>
                                <select
                                    value={selectedControlId}
                                    onChange={(e) => setSelectedControlId(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select a control...</option>
                                    {controls.map((control) => (
                                        <option key={control.id} value={control.id}>
                                            {control.control_id} - {control.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    placeholder="Review report Q3..."
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUploadModalOpen(false);
                                        resetForm();
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium shadow-sm transition-all"
                                    disabled={uploading}
                                >
                                    {uploading ? 'Uploading...' : 'Upload File'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Evidence;
