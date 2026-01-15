
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { Download, CheckCircle, AlertTriangle, FileText, Shield } from 'lucide-react';

const API_URL = 'http://localhost:8000/api/v1';

const ReportHeader = ({ confidence, framework }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 flex justify-between items-center">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <Shield className="text-blue-600 w-5 h-5" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Compliance Report</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{framework} Applicability & Status</h1>
            <p className="text-sm text-gray-500 mt-1">Generated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Data Confidence Score</div>
            <div className="text-3xl font-bold text-green-600 flex items-center justify-end gap-2">
                {confidence}%
                <CheckCircle className="w-5 h-5" />
            </div>
        </div>
    </div>
);

const ReportsDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [generatingPack, setGeneratingPack] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_URL}/reports/dashboard`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch reports", err);
            setError(err.message || "Failed to load report data");
            setLoading(false);
        }
    };

    const handleGeneratePack = async () => {
        setGeneratingPack(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_URL}/reports/auditor-pack`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Auditor_Pack_${new Date().toISOString().split('T')[0]}.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (err) {
            console.error("Pack generation failed", err);
            alert("Failed to generate Auditor Pack");
        } finally {
            setGeneratingPack(false);
        }
    };

    if (loading) return <div className="p-12 text-center text-gray-400">Loading Reporting Engine...</div>;

    if (error) return (
        <div className="p-12 text-center">
            <div className="bg-red-50 text-red-600 p-6 rounded-lg inline-block">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold">Error Loading Report</h3>
                <p>{error}</p>
                <button onClick={fetchData} className="mt-4 px-4 py-2 bg-red-100 rounded hover:bg-red-200">Retry</button>
            </div>
        </div>
    );

    if (!data) return null; // Should be covered by loading/error, but safety break.

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="min-h-screen bg-gray-50 pb-20 p-8 animate-fade-in">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">CISO Reporting Dashboard</h2>
                    <button
                        onClick={handleGeneratePack}
                        disabled={generatingPack}
                        className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg disabled:opacity-70"
                    >
                        {generatingPack ? (
                            <span className="animate-spin">⌛</span>
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        {generatingPack ? "Compiling Evidence..." : "Generate Auditor Pack"}
                    </button>
                </div>

                <ReportHeader confidence={data.meta.confidence_score} framework="ISO 27001:2022" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* CHART 1: DRIFT TREND */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-amber-500 w-5 h-5" />
                            Control Drift Trend
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.drift_trend}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="fails" stroke="#ef4444" name="Failures" strokeWidth={2} />
                                    <Line type="monotone" dataKey="passing" stroke="#22c55e" name="Passing" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* CHART 2: REMEDIATION SPEED */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <ActivityIcon />
                            Remediation Velocity (Days)
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.remediation_velocity} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="severity" width={60} />
                                    <Tooltip />
                                    <Bar dataKey="days" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Avg Days to Fix" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* CHART 3: FRAMEWORK COVERAGE */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="text-purple-500 w-5 h-5" />
                        Framework Coverage Analysis
                    </h3>
                    <div className="h-64 flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.framework_coverage}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="coverage"
                                    nameKey="name"
                                    label={({ name, coverage }) => `${name}: ${coverage}%`}
                                >
                                    {data.framework_coverage.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
);

export default ReportsDashboard;
