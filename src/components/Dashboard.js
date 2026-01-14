
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Activity, Shield, CheckCircle, AlertTriangle,
    Filter, Search, Clock, FileText, Zap, ChevronDown
} from 'lucide-react';

const API_URL = 'https://assurisk-backend.onrender.com/api/v1';

const Dashboard = () => {
    const navigate = useNavigate();
    const [frameworks, setFrameworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add Error State
    const [filterFramework, setFilterFramework] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const [seedLog, setSeedLog] = useState([]); // Log state

    // Helper to add logs to state
    const addLog = (msg) => setSeedLog(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            // Fetch Frameworks
            const fwRes = await axios.get(`${API_URL}/frameworks/`, { headers });
            const fwData = fwRes.data;

            // Fetch Stats for each
            const frameworksWithStats = await Promise.all(fwData.map(async (fw) => {
                try {
                    const statRes = await axios.get(`${API_URL}/frameworks/${fw.id}/stats`, { headers });
                    return statRes.data;
                } catch (e) {
                    return { ...fw, completion_percentage: 0, total_controls: 0, implemented_controls: 0 };
                }
            }));

            // SORT LOGIC: Strict Order [ISO, SOC2, Others]
            const sortedFrameworks = frameworksWithStats.sort((a, b) => {
                const codeA = (a.code || "").toUpperCase();
                const codeB = (b.code || "").toUpperCase();

                // Explicit Priority Map
                const priority = {
                    "ISO27001": 1,
                    "SOC2": 2
                };

                const pA = priority[codeA] || priority[Object.keys(priority).find(k => codeA.includes(k))] || 99;
                const pB = priority[codeB] || priority[Object.keys(priority).find(k => codeB.includes(k))] || 99;

                if (pA !== pB) return pA - pB;
                return a.name.localeCompare(b.name);
            });

            setFrameworks(sortedFrameworks);
            setLoading(false);
        } catch (err) {
            console.error("Failed to load dashboard data", err);
            setError(err.message || "Failed to load data");
            setLoading(false);
        }
    };

    const handleSeed = async () => {
        if (!window.confirm("Start Database Repair? (Check Log Below)")) return;
        setSeedLog(["Starting Repair Process..."]);

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            // 1. Fetch Existing
            addLog("Fetching existing frameworks...");
            const initialRes = await axios.get(`${API_URL}/frameworks/`, { headers });
            addLog(`Found ${initialRes.data.length} existing frameworks.`);

            const seeds = [
                { name: 'Health Insurance Portability and Accountability Act', code: 'HIPAA', description: 'United States legislation that provides data privacy and security provisions for safeguarding medical information.' },
                { name: 'SOC 2 Type II', code: 'SOC2', description: 'Service Organization Control 2 - Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy.' },
                { name: 'ISO 27001:2022', code: 'ISO27001-V2', description: 'International standard for information security management systems (ISMS).' },
                { name: 'NIST CSF 2.0', code: 'NIST-CSF', description: 'National Institute of Standards and Technology Cybersecurity Framework.' },
                { name: 'GDPR Privacy', code: 'GDPR', description: 'General Data Protection Regulation for EU data privacy.' }
            ];

            // 2. Create Missing (Skip Update/Delete since 405)
            for (const fw of seeds) {
                const existing = initialRes.data.find(f => f.code === fw.code);

                if (existing) {
                    addLog(`${fw.code} exists.`);
                } else {
                    // Create New
                    try {
                        addLog(`Creating New: ${fw.code}...`);
                        await axios.post(`${API_URL}/frameworks/`, fw, { headers });
                        addLog(`Created ${fw.code}`);
                    } catch (e) {
                        addLog(`Creation failed for ${fw.code}: ${e.message}`);
                    }
                }
            }

            // 3. Re-Fetch to get IDs
            const allFwRes = await axios.get(`${API_URL}/frameworks/`, { headers });
            const allFws = allFwRes.data;

            // 4. Create Controls
            const controlsMap = {
                'HIPAA': [
                    { title: "164.308(a)(1)(i) - Security Management Process", description: "Implement policies and procedures to prevent, detect, contain, and correct security violations." },
                    { title: "164.308(a)(5)(ii)(B) - Protection from Malicious Software", description: "Procedures for guarding against, detecting, and reporting malicious software." },
                    { title: "164.312(a)(1) - Access Control", description: "Implement technical policies and procedures for electronic information systems to maintain electronic protected health information." },
                    { title: "164.310(a)(1) - Facility Access Controls", description: "Implement policies and procedures to limit physical access to electronic information systems and the facility or facilities in which they are housed." },
                    { title: "164.312(a)(2)(IV) - Encryption and Decryption", description: "Implement a mechanism to encrypt and decrypt electronic protected health information." }
                ],
                'SOC2': [
                    { title: "CC6.1 - Logical Access Security", description: "The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity's objectives.", category: "CC6.1" },
                    { title: "CC6.8 - Prevent Unauthorized Malicious Software", description: "The entity implements controls to prevent or detect and act upon the introduction of unauthorized or malicious software to meet the entity's objectives.", category: "CC6.8" },
                    { title: "CC7.1 - System Configuration Monitor", description: "Information assets are monitored to identify changes to configurations that may result in the introduction of vulnerabilities.", category: "CC7.1" },
                    { title: "CC8.1 - Change Management", description: "The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures.", category: "CC8.1" }
                ],
                // Use V2 code for mapping
                'ISO27001-V2': [
                    { title: "A.5.15 - Access Control (2022)", description: "Rules to control physical and logical access to information and information processing facilities shall be firmly established." },
                    { title: "A.8.2 - Privileged Access Rights", description: "The allocation and use of privileged access rights shall be restricted and managed." },
                    { title: "A.12.3 - Backup", description: "Backup copies of information, software and system images shall be taken and tested regularly in accordance with an agreed backup policy." },
                    { title: "A.14.2 - Secure Development Policy", description: "Rules for the development of software and systems shall be established and applied to developments within the organization." }
                ],
                'ISO27001': [ // Fallback for old ISO if it exists
                    { title: "A.9.1.1 - Access Control (Legacy)", description: "Legacy control for 2013 standard." }
                ],
                'NIST-CSF': [
                    { title: "ID.AM-1 - Inventory", description: "Physical devices and systems within the organization are inventoried." },
                    { title: "PR.AC-1 - Access Control", description: "Access to assets and associated facilities is limited to authorized users, processes, or devices." }
                ],
                'GDPR': [
                    { title: "Art. 32 - Security of Processing", description: "Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk." },
                    { title: "Art. 15 - Right of Access", description: "The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed." }
                ]
            };

            // ---------------------------------------------------------
            // AUTO-DETECT CORRECT STATUS (FUZZING)
            // ---------------------------------------------------------
            addLog("Probing backend for valid status enum...");
            const possibleStatuses = ["PENDING", "Pending", "Not Started", "NOT_STARTED", "DRAFT", "Draft", "OPEN", "Open", "Proposed", "Active"];

            let validStatus = null;
            const probeFw = allFws[0]; // Use first available framework (usually HIPAA)
            const probeControl = controlsMap[probeFw.code][0]; // First control (e.g. 164.308...)

            for (const statusAttempt of possibleStatuses) {
                try {
                    const probePayload = {
                        framework_id: probeFw.id,
                        control_id: probeControl.title.split(' - ')[0],
                        title: probeControl.title,
                        description: probeControl.description,
                        category: probeControl.category || "General",
                        status: statusAttempt
                    };
                    await axios.post(`${API_URL}/controls/`, probePayload, { headers });
                    validStatus = statusAttempt;
                    addLog(`SUCCESS! Found valid status: "${validStatus}"`);
                    break; // Stop looking
                } catch (e) {
                    // Silent fail on probe
                }
            }

            if (!validStatus) {
                addLog("CRITICAL: Could not guess valid status. Defaulting to 'PENDING' and hoping.");
                validStatus = "PENDING";
            }
            // ---------------------------------------------------------

            let controlsAdded = 0;
            for (const fw of allFws) {
                const controlsToCreate = controlsMap[fw.code] || [];
                addLog(`Processing ${fw.code} (ID: ${fw.id})... Adding ${controlsToCreate.length} controls.`);

                for (const c of controlsToCreate) {
                    try {
                        const payload = {
                            framework_id: fw.id,
                            control_id: c.title.split(' - ')[0],
                            title: c.title,
                            description: c.description,
                            category: c.category || "General",
                            // Use the auto-detected valid status
                            status: validStatus
                        };
                        await axios.post(`${API_URL}/controls/`, payload, { headers });
                        controlsAdded++;
                    } catch (e) {
                        // CAPTURE THE VALIDATION ERROR
                        const details = e.response?.data ? JSON.stringify(e.response.data) : "No Details";
                        addLog(`ERR ${e.response?.status}: ${details.substring(0, 50)}...`);
                    }
                }
            }

            addLog(`SUCCESS: Added ${controlsAdded} controls total.`);
            alert(`Process Complete! Check log.`);
            setLoading(false);
            // Don't reload immediately
        } catch (err) {
            console.error("Seeding failed", err);
            addLog(`CRITICAL FAILURE: ${err.message}`);
            alert(`Failed: ${err.message}`);
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className="p-8 text-center text-red-500">
                <p className="mb-4">Failed to load dashboard: {error}</p>
                <button
                    onClick={() => { setError(null); setLoading(true); fetchData(); }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    // --- MOCKED "DUE SOON" DATA ---
    const actionItems = [
        { id: 1, type: 'Vulnerability', title: 'Critical: Log4j in payment-service', due: 'Today', severity: 'Critical' },
        { id: 2, type: 'Policy', title: 'Review: Access Control Policy', due: 'Tomorrow', severity: 'High' },
        { id: 3, type: 'CAPA', title: 'Missing Evidence for CC6.1', due: '3 Days', severity: 'Medium' },
        { id: 4, type: 'Training', title: 'Security Awareness: 5 Employees Pending', due: '5 Days', severity: 'Low' }
    ];

    // Filter Logic
    const filteredFrameworks = frameworks.filter(fw => {
        const matchesSearch = fw.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterFramework === 'All' || fw.name.includes(filterFramework);
        return matchesSearch && matchesFilter;
    });

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

    return (
        <div className="p-6 space-y-6 animate-fade-in pb-20">
            {/* HEADER & FILTERS */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

                <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search items..."
                                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <select
                                className="border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer bg-transparent"
                                value={filterFramework}
                                onChange={(e) => setFilterFramework(e.target.value)}
                            >
                                <option value="All">All Frameworks</option>
                                <option value="SOC 2">SOC 2</option>
                                <option value="ISO">ISO 27001</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSeed}
                            className="px-3 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm flex items-center gap-2"
                        >
                            <Shield className="w-4 h-4" /> REPAIR DB (v3)
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                            + Add Widget
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT GRID (2 COLUMNS) */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* UPGRADE BANNER - TEMPORARY */}
                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">System Upgrade Required! </strong>
                    <span className="block sm:inline">Please click the Red "Repair / Populate Data" button above to restore your framework data (ISO 2022).</span>
                </div>

                {/* SEED LOG - DEBUG OUTPUT */}
                {seedLog.length > 0 && (
                    <div className="w-full bg-black text-green-400 p-4 rounded-xl font-mono text-xs overflow-y-auto max-h-60">
                        <h3 className="border-b border-gray-700 mb-2 pb-1 font-bold">REPAIR PROCESS LOG:</h3>
                        {seedLog.map((log, i) => (
                            <div key={i}>{log}</div>
                        ))}
                    </div>
                )}

                {/* LEFT COLUMN: FRAMEWORKS (Expands to fill) */}
                <div className="flex-1 w-full space-y-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" /> Framework Status
                    </h2>

                    {/* DIAGNOSTIC FOR EMPTY LIST */}
                    {frameworks.length === 0 && !loading && (
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-yellow-800 text-sm font-mono">
                            <div className="mb-2">
                                <strong>DEBUG: No Frameworks Found.</strong><br />
                                API URL: {API_URL}<br />
                                Total items in state: {frameworks.length}
                            </div>
                            <button
                                onClick={handleSeed}
                                className="px-3 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm flex items-center gap-2"
                            >
                                <Shield className="w-4 h-4" /> REPAIR DB (v3)
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredFrameworks.map(fw => (
                            <div
                                key={fw.id}
                                onClick={() => navigate(`/frameworks/${fw.id}`)}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={fw.name}>{fw.name}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${fw.completion_percentage === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                                        {fw.completion_percentage === 100 ? 'COMPLIANT' : 'ACTIVE'}
                                    </span>
                                </div>

                                <div className="flex items-end gap-2 mb-4 relative z-10">
                                    <span className="text-4xl font-extrabold text-gray-900">{fw.completion_percentage}%</span>
                                    <span className="text-sm text-gray-500 mb-1">Implemented</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-100 rounded-full h-2 mb-4 relative z-10">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-1000 ${percentageColor(fw.completion_percentage)}`}
                                        style={{ width: `${fw.completion_percentage}%` }}
                                    ></div>
                                </div>

                                <div className="flex justify-between text-xs text-gray-500 relative z-10 border-t border-gray-50 pt-3">
                                    <span className="flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3 text-green-500" /> {fw.implemented_controls} / {fw.total_controls} Controls
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Activity className="w-3 h-3 text-blue-500" /> Auto-Testing On
                                    </span>
                                </div>

                                {/* Decorative Background Blob */}
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors z-0"></div>
                            </div>
                        ))}
                        {/* Add Framework Button Card */}
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-500 cursor-pointer transition-colors min-h-[220px]">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                <span className="text-2xl">+</span>
                            </div>
                            <span className="font-medium text-sm">Add New Framework</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: WIDGETS (Fixed width on large screens) */}
                <div className="w-full lg:w-96 space-y-8 flex-shrink-0">

                    {/* Action Required (Due Soon) */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-500" /> Action Required
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="divide-y divide-gray-100">
                                {actionItems.map(item => (
                                    <div key={item.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 ${itemSeverityColor(item.severity)}`}>
                                            {item.type === 'Vulnerability' && <Zap className="w-4 h-4" />}
                                            {item.type === 'Policy' && <FileText className="w-4 h-4" />}
                                            {item.type === 'CAPA' && <AlertTriangle className="w-4 h-4" />}
                                            {item.type === 'Training' && <CheckCircle className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-1 group-hover:text-blue-600">{item.title}</h4>
                                            </div>
                                            <p className="text-xs text-gray-500 flex items-center gap-2">
                                                <span className="font-medium text-orange-600 whitespace-nowrap">Due: {item.due}</span>
                                                <span>•</span>
                                                <span>{item.type}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gray-50 p-2 text-center border-t border-gray-200">
                                <button className="text-xs text-blue-600 font-bold uppercase tracking-wider hover:text-blue-800">View All Actions</button>
                            </div>
                        </div>
                    </div>

                    {/* Compliance Capability (Mini Stats) */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-purple-600" /> Capabilities
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">Continuous Monitoring</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">ACTIVE</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">Evidence Collection</span>
                                <span className="text-sm font-bold text-gray-900">98% Healthy</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">Policy Adherence</span>
                                <span className="text-sm font-bold text-orange-600">Needs Review</span>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase">Pending Tasks</h4>
                                    <span className="text-[10px] bg-red-100 text-red-600 px-1.5 rounded-full font-bold">4</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm hover:bg-gray-50 p-1 rounded cursor-pointer transition-colors">
                                        <span className="text-gray-600">Vendor Reviews</span>
                                        <span className="font-bold text-red-500">3 Due</span>
                                    </div>
                                    <div className="flex justify-between text-sm hover:bg-gray-50 p-1 rounded cursor-pointer transition-colors">
                                        <span className="text-gray-600">Access Reviews</span>
                                        <span className="font-bold text-orange-500">1 Overdue</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Utilities
const percentageColor = (p) => {
    if (p === 100) return 'bg-green-500';
    if (p > 50) return 'bg-blue-500';
    return 'bg-orange-500';
};

const itemSeverityColor = (sev) => {
    switch (sev) {
        case 'Critical': return 'bg-red-100 text-red-600';
        case 'High': return 'bg-orange-100 text-orange-600';
        case 'Medium': return 'bg-yellow-100 text-yellow-600';
        default: return 'bg-blue-50 text-blue-600';
    }
};

export default Dashboard;
