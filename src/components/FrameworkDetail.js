
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Search, CheckCircle, X, Shield, AlertCircle, Upload, ChevronUp, ChevronDown, ChevronRight, Zap, Activity
} from 'lucide-react';
import FrameworkDetail_HIPAA from './FrameworkDetail_HIPAA';
import { AIService } from '../services/aiService';


const API_URL = 'http://localhost:8000';

// COSO DESCRIPTIONS MAP
const COSO_DESCRIPTIONS = {
    // CC1: Control Environment (COSO 1-5)
    "CC1.1": "COSO Principle 1: The entity demonstrates a commitment to integrity and ethical values.",
    "CC1.2": "COSO Principle 2: The board of directors exercises oversight of the development and performance of internal control.",
    "CC1.3": "COSO Principle 3: Management establishes structures, reporting lines, and appropriate authorities.",
    "CC1.4": "COSO Principle 4: The entity demonstrates a commitment to attract, develop, and retain competent individuals.",
    "CC1.5": "COSO Principle 5: The entity holds individuals accountable for their internal control responsibilities.",

    // CC2: Communication & Information (COSO 13-15)
    "CC2.1": "COSO Principle 13: The entity obtains or generates and uses relevant, quality information.",
    "CC2.2": "COSO Principle 14: The entity internally communicates information.",
    "CC2.3": "COSO Principle 15: The entity communicates with external parties.",

    // CC3: Risk Assessment (COSO 6-9)
    "CC3.1": "COSO Principle 6: The entity specifies objectives with sufficient clarity.",
    "CC3.2": "COSO Principle 7: The entity identifies risks to the achievement of its objectives.",
    "CC3.3": "COSO Principle 8: The entity considers the potential for fraud in assessing risks.",
    "CC3.4": "COSO Principle 9: The entity identifies and assesses changes that could significantly impact the system.",

    // CC4: Monitoring Activities (COSO 16-17)
    "CC4.1": "COSO Principle 16: The entity selects, develops, and performs ongoing and/or separate evaluations.",
    "CC4.2": "COSO Principle 17: The entity evaluates and communicates internal control deficiencies.",

    // CC5: Control Activities (COSO 10-12)
    "CC5.1": "COSO Principle 10: The entity selects and develops control activities.",
    "CC5.2": "COSO Principle 11: The entity selects and develops general control activities over technology.",
    "CC5.3": "COSO Principle 12: The entity deploys control activities through policies and procedures.",

    // CC6-9: SOC 2 Specifics
    "CC6.1": "Logical Access: The entity implements logical access security software, infrastructure, and architectures.",
    "CC6.2": "Logical Access: Prior to issuing credentials, the entity identifies and authenticates users.",
    "CC6.3": "Logical Access: The entity authorizes access to protected information assets.",
    "CC6.6": "Logical Access: The entity restricts physical access.",
    "CC7.1": "System Operations: The entity identifies and manages system vulnerabilities.",
    "CC8.1": "Change Management: The entity authorizes, designs, develops, tests, and implements changes.",

    // Additional Criteria
    "A1.1": "Availability: The entity maintains, monitors, and evaluates current processing capacity.",
    "A1.2": "Availability: Data backup and recovery.",
    "C1.1": "Confidentiality: The entity identifies and maintains confidential information.",
    "P1.0": "Privacy: Notice and choice.",
    "P2.0": "Privacy: Collection, use, retention, and disposal.",

    // ISO 27001 PROCESS GROUPS (Custom Restructure)
    "Governance & Policy": "Clauses 4-7 & Annex A.5: Leadership, Policies, and Organizational Context",
    "HR Security": "Clauses 7 & Annex A.6: Human Resource Security (Screening to Termination)",
    "Asset Management": "Annex A.5, A.7, A.8: Inventory, Responsibility, and Media Handling",
    "Access Control (IAM)": "Annex A.5 & A.8: Logical Access, User Rights, and Authentication",
    "Physical Security": "Annex A.7: Secure Areas, Equipment, and Physical Entry",
    "Operations (General)": "Annex A.8: Malware, Backup, Logging, and Data Protection",
    "Configuration Management": "Annex A.8.9: Secure Configurations",
    "Cryptography": "Annex A.8.24: Encryption and Key Management",
    "Logging & Monitoring": "Annex A.8.15-16: Event Logging and System Monitoring",
    "Clock Synchronization": "Annex A.8.17: Time Synchronization (NTP)",
    "Vulnerability Management": "Annex A.8.8: Technical Vulnerabilities",
    "Capacity Management": "Annex A.8.6: Resource Management",
    "Backup Management": "Annex A.8.13: Information Backup",
    "Network Security": "Annex A.5 & A.8: Network Services, Segregation, and Transfer",
    "SDLC (Development)": "Annex A.8: Secure Development, Testing, and Change Management",
    "Supplier Mgmt": "Annex A.5: Supplier Relationships and Service Monitoring",
    "Incident & Resilience": "Clause 7.4 & Annex A.5: Incident Management and Business Continuity",
    "Threat Intel": "Annex A.5.7: Threat Intelligence",
    "Legal & Compliance": "Annex A.5 & A.8: Legal Requirements, Privacy, and IPR",
    "Risk Management": "Clauses 6 & 8: Risk Assessment and Treatment",
    "Performance Evaluation": "Clauses 9 & Annex A.5: Audit, Review, and Monitoring",
    "Improvement": "Clause 10: Corrective Action and Continual Improvement",

    "DEFAULT": "Standard requirement for this criteria."
};

// GRANULAR EVIDENCE MAPPING (Keyed by Control Title Partial Match or Exact ID)
// This overrides the generic category map for specific controls.
const SPECIFIC_EVIDENCE_MAP = {
    "Background checks performed for new hires": [
        { name: "Background Check Policy", type: "Policy" },
        { name: "Sample Background Check Reports (Anonymized)", type: "Evidence" },
        { name: "New Hire Checklist (showing check completion)", type: "Log" }
    ],
    "Code of Conduct acknowledged by contractors": [
        { name: "Code of Conduct Policy", type: "Policy" },
        { name: "Contractor Acknowledgement Log", type: "Log" },
        { name: "Sample Signed Contractor Agreements", type: "Contract" }
    ],
    // --- NEW: EXPLICITLY REQUESTED ---
    "Confidentiality Agreement acknowledged by contractors": [
        { name: "NDA Template (Contractor)", type: "Policy" },
        { name: "Contractor NDA Registry", type: "Log" },
        { name: "Sample Signed NDAs (Contractors)", type: "Evidence" }
    ],
    "Supplier Code of Conduct Review": [
        { name: "Supplier Code of Conduct", type: "Policy" },
        { name: "Vendor Acknowledgement Log", type: "Log" }
    ],
    "Board meeting minutes review (Quarterly)": [
        { name: "Board Meeting Minutes (Q1)", type: "Minutes" },
        { name: "Board Meeting Minutes (Q2)", type: "Minutes" },
        { name: "Board Meeting Minutes (Q3)", type: "Minutes" },
        { name: "Board Meeting Minutes (Q4)", type: "Minutes" }
    ],
    "independent Director Review of Internal Findings": [
        { name: "Board Independence Statement", type: "Policy" },
        { name: "Internal Audit Review Minutes", type: "Report" }
    ],
    "Whistleblower Policy (Review & Communication)": [
        { name: "Whistleblower Policy", type: "Policy" },
        { name: "Evidence of Communication (Email/Intranet)", type: "Evidence" }
    ],
    "Whistleblower Hotline Availability Test": [
        { name: "Hotline Test Log", type: "Log" },
        { name: "Anonymous Reporting Mechanism Screenshot", type: "Evidence" }
    ],
    "Performance Reviews (Biannual)": [
        { name: "Performance Review Schedule", type: "Policy" },
        { name: "Sample Completed Review Forms (Anonymized)", type: "HR Doc" }
    ],
    "Security Awareness Training (Onboarding)": [
        { name: "Security Training Slides/Material", type: "Document" },
        { name: "New Hire Training Completion Log", type: "Log" }
    ],
    "Quarterly User Access Review": [
        { name: "User Access Review Policy", type: "Policy" },
        { name: "Completed Access Review (Q1-Q4)", type: "Review" },
        { name: "Evidence of Revocation (if applicable)", type: "Ticket" }
    ],
    "Quarterly security compliance report to Board": [
        { name: "Security Presentation Deck (Q1)", type: "Report" },
        { name: "Security Presentation Deck (Q3)", type: "Report" }
    ],
    "Charter of the Audit Committee": [
        { name: "Audit Committee Charter Document", type: "Policy" },
        { name: "Committee Member List", type: "List" }
    ],
    "Organizational Chart is current": [
        { name: "Current Organizational Chart", type: "Diagram" },
        { name: "HR System Export", type: "List" }
    ],
    "Job Descriptions include security responsibilities": [
        { name: "Sample Job Descriptions (Engineering)", type: "HR Doc" },
        { name: "Sample Job Descriptions (Admin)", type: "HR Doc" }
    ],
    "Segregation of Duties Matrix": [
        { name: "Segregation of Duties (SoD) Matrix", type: "Sheet" },
        { name: "Access Rights Review Log", type: "Log" }
    ],
    // --- NEW MAPPINGS FOR FULL EXPANSION ---
    "Daily Database Backups": [
        { name: "Backup Policy", type: "Policy" },
        { name: "Sample Restore Test Report", type: "Evidence" },
        { name: "Backup Automated Logs (30 days)", type: "Log" }
    ],
    "Business Continuity Plan": [
        { name: "Business Continuity Plan (BCP)", type: "Document" },
        { name: "Disaster Recovery Test Results", type: "Report" }
    ],
    "Production Change Logs": [
        { name: "Change Management Policy", type: "Policy" },
        { name: "List of Production Changes (Q1-Q4)", type: "Sheet" },
        { name: "Sample Change Ticket with Approval", type: "Evidence" }
    ],
    "Patch Management Policy": [
        { name: "Patch Management Policy", type: "Policy" },
        { name: "Vulnerability Scan Report (Patched)", type: "Report" }
    ],
    "Privacy Policy Updated": [
        { name: "Privacy Policy (Public URL)", type: "Link" },
        { name: "Annual Privacy Policy Review", type: "Log" }
    ],
    "Subject Access Request (SAR) Log": [
        { name: "SAR Process/Procedure", type: "Policy" },
        { name: "Anonymized SAR Request Log", type: "Log" }
    ]
};

// FALLBACK CATEGORY MAP
const REQUIRED_EVIDENCE_DEFAULTS = {
    "CC1.1": [{ name: "Ethics Policy", type: "Policy" }],
    "CC6.1": [{ name: "Access Logs", type: "Log" }],
    "DEFAULT": [{ name: "Standard Policy Document", type: "Policy" }, { name: "Evidence of Execution", type: "Evidence" }]
};

const FrameworkDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [framework, setFramework] = useState(null);
    const [processes, setProcesses] = useState([]);
    const [socControls, setSocControls] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({ total: 0, implemented: 0, percentage: 0 });
    const [searchTerm, setSearchTerm] = useState('');

    // DRAWER STATE
    const [selectedControl, setSelectedControl] = useState(null);
    const [evidenceList, setEvidenceList] = useState([]);
    const [expandedControlId, setExpandedControlId] = useState(null);
    const [expandedReq, setExpandedReq] = useState(null);

    // AI STATE
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPolicy, setGeneratedPolicy] = useState(null);

    // NEW LOGIC: Get Specific Requirements (Moved up to avoid conditional hook error)
    const [aiRequirements, setAiRequirements] = useState(null);
    const [loadingAi, setLoadingAi] = useState(false);
    const [aiError, setAiError] = useState(false);

    // GAP ANALYSIS STATE
    const [gapAnalysis, setGapAnalysis] = useState(null);
    const [analyzingGap, setAnalyzingGap] = useState(false);

    const fetchAiRequirements = async (control) => {
        setLoadingAi(true);
        setAiError(false);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_URL}/ai/suggest-evidence`, {
                title: control.title,
                description: control.description,
                category: control.category
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data && res.data.requirements) {
                setAiRequirements(res.data.requirements);
            }
        } catch (err) {
            console.error("AI Fetch Failed", err);
            setAiError(true); // Set error visible to user
        } finally {
            setLoadingAi(false);
        }
    };

    const handleGapAnalysis = async () => {
        if (!selectedControl) return;
        setAnalyzingGap(true);
        try {
            // Use AI requirements if available, else defaults
            const reqs = aiRequirements || getRequirements(selectedControl);

            const result = await AIService.evaluateGapAnalysis(
                selectedControl.title,
                reqs,
                evidenceList || []
            );
            setGapAnalysis(result);
        } catch (e) {
            console.error(e);
        } finally {
            setAnalyzingGap(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    // FETCH EVIDENCE & RESET AI WHEN CONTROL IS SELECTED
    useEffect(() => {
        if (selectedControl) {
            fetchEvidence(selectedControl.id);
            setGeneratedPolicy(null); // Reset AI draft
        } else {
            setEvidenceList([]);
            setGeneratedPolicy(null);
        }
    }, [selectedControl]);

    // FETCH AI SUGGESTIONS WHEN CONTROL OPENS
    useEffect(() => {
        if (selectedControl) {
            setAiRequirements(null);
            setAiError(false);
            fetchAiRequirements(selectedControl);
        }
    }, [selectedControl]);

    const handleGeneratePolicy = async () => {
        setIsGenerating(true);
        try {
            const policy = await AIService.generatePolicy(selectedControl.title, selectedControl.description);
            setGeneratedPolicy(policy);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const fetchEvidence = async (controlId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_URL}/evidence/control/${controlId}`, { headers: { Authorization: `Bearer ${token}` } });
            setEvidenceList(res.data);
        } catch (e) {
            console.error("Failed to load evidence", e);
        }
    };

    const handleFileUpload = async (e, controlId) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("control_id", controlId);
        formData.append("title", file.name);
        formData.append("description", "Uploaded via Dashboard");

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/evidence/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("File uploaded successfully!");
            // Refresh main data AND specific control evidence
            fetchData();
            fetchEvidence(controlId);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Please try again.");
        }
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const fwRes = await axios.get(`${API_URL}/frameworks/${id}`, { headers });
            const fwData = fwRes.data;
            const isSOC2 = fwData.code && fwData.code.includes("SOC2");
            const isISO = fwData.code && fwData.code.includes("ISO27001");
            const useGroupedView = isSOC2 || isISO;

            const ctrlRes = await axios.get(`${API_URL}/controls/?limit=10000`, { headers });
            const allControls = ctrlRes.data.filter(c => c.framework_id === parseInt(id));

            if (useGroupedView) {
                const grouped = {};
                allControls.forEach(c => {
                    // Group by 'process' (Primary) or fallback to 'category' (Legacy)
                    let key = c.process;

                    if (!key) {
                        // Legacy fallback for old data: "Process Group|Display Category"
                        const parts = (c.category || "").split('|');
                        key = parts[0] || "Uncategorized";
                    }

                    if (!grouped[key]) grouped[key] = [];
                    grouped[key].push(c);
                });
                setSocControls(grouped);
                setProcesses([]);
            } else {
                const procRes = await axios.get(`${API_URL}/processes/`, { headers });
                const filteredProcesses = procRes.data.map(proc => {
                    const relevantSubs = proc.sub_processes.map(sub => {
                        return { ...sub, controls: sub.controls || [] };
                    }).filter(sub => sub.controls && sub.controls.length > 0);
                    return { ...proc, sub_processes: relevantSubs };
                }).filter(proc => proc.sub_processes.length > 0);
                setProcesses(filteredProcesses);
            }

            const total = allControls.length;
            const implemented = allControls.filter(c => c.status === 'IMPLEMENTED').length;
            setFramework(fwData);
            setStats({
                total,
                implemented,
                percentage: total > 0 ? Math.round((implemented / total) * 100) : 0
            });
            setLoading(false);

        } catch (err) {
            console.error(err);
            setError(`Failed to load data: ${err.message}`);
            setLoading(false);
        }
    };

    if (loading) return <div className="p-12 text-center text-gray-400">Loading Framework Data...</div>;
    if (error) return <div className="p-12 text-center text-red-500">{error}</div>;

    // ROUTING TO SUB-COMPONENTS
    if (framework?.code === "HIPAA") {
        return <FrameworkDetail_HIPAA />; // DELEGATE TO HIPAA COMPONENT
    }

    const isSOC2 = framework?.code?.includes("SOC2");
    const isISO = framework?.code?.includes("ISO27001");
    const useGroupedView = isSOC2 || isISO;

    const getFilteredControls = (controls) => {
        if (!searchTerm) return controls;
        return controls.filter(c => c.title && c.title.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    // MOCK EVIDENCE CALCULATOR (Random consistency for demo)
    const getEvidenceStats = (controlId) => {
        if (!controlId || typeof controlId !== 'string') return { uploaded: 0, total: 3 };
        const hash = controlId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const total = (hash % 3) + 2; // 2 to 4 files needed
        const uploaded = hash % (total + 1); // 0 to total
        return { uploaded, total };
    };

    // Helper to determine if a specific mock requirement is met based on the random 'uploaded' count
    const isRequirementMet = (index, uploadedCount) => {
        return index < uploadedCount;
    };





    const getRequirements = (control) => {
        if (!control) return REQUIRED_EVIDENCE_DEFAULTS["DEFAULT"];

        // 0. AI PRIORITY
        if (aiRequirements) {
            return aiRequirements;
        }

        // 1. Try Specific Title Match (Exact)
        if (control.title && SPECIFIC_EVIDENCE_MAP[control.title]) {
            return SPECIFIC_EVIDENCE_MAP[control.title];
        }

        // 2. Try Smart Keyword Match (Dynamic)
        const titleLower = control.title.toLowerCase();
        if (titleLower.includes("policy")) {
            return [{ name: "Approved Policy Document", type: "Policy" }, { name: "Evidence of Annual Review", type: "Log" }];
        }
        if (titleLower.includes("training") || titleLower.includes("awareness")) {
            return [{ name: "Training Slide Deck / Material", type: "Document" }, { name: "Attendance / Completion Log", type: "Log" }];
        }
        // UTILS
        const getEvidenceStats = (controlId) => {
            // If we have selected this control and have fresh evidence, use it
            // FIX: Compare control_id (string) vs controlId (string) OR ensure we match the context
            if (selectedControl && selectedControl.control_id === controlId && evidenceList) {
                // Even if length is 0, if we fetched it, we should use it (it might really be 0).
                // But usually we care if we have something to show 'MET'.
                // If evidenceList is empty but freshly fetched, it means 0 files.
                return { total: 0, uploaded: evidenceList };
            }

            // Fallback to global data (which might be stale or missing evidence detail)
            // Find control in socControls
            let control = null;
            Object.values(socControls).forEach(list => {
                const found = list.find(c => c.control_id === controlId);
                if (found) control = found;
            });

            if (!control) return { total: 0, uploaded: [] };
            // API v1 usually returns evidence count, not list in main fetch.
            // So we default to empty unless we have fresh fetch.
            return { total: 0, uploaded: control.evidence || [] };
        };

        const isRequirementMet = (reqIdx, uploadedFiles) => {
            // PERMISSIVE LOGIC: If ANY file is uploaded, mark the first requirement as met.
            // If 2 files, mark first 2, etc.
            // Real logic should match type, but for beta, we just want to see progress.
            if (!uploadedFiles || uploadedFiles.length === 0) return false;

            // If the requirement asks for "Policy", and we have a file with "Policy" in name/type...
            // For now, simple count matching:
            return reqIdx < uploadedFiles.length;
        };
        if (titleLower.includes("vendor") || titleLower.includes("supplier") || titleLower.includes("third party")) {
            return [{ name: "Vendor List", type: "List" }, { name: "Due Diligence Report", type: "Report" }];
        }

        // 3. Try Category Match (Expanded)
        if (control.category && REQUIRED_EVIDENCE_DEFAULTS[control.category]) {
            return REQUIRED_EVIDENCE_DEFAULTS[control.category];
        }

        // 4. Fallback based on Code Prefix if Category is Missing/Mismatch
        // e.g., if category is "CC6.1" but not in defaults
        if (control.category) {
            if (control.category.startsWith("A1")) return [{ name: "Capacity/Availability Report", type: "Report" }];
            if (control.category.startsWith("C1")) return [{ name: "Confidentiality Policy", type: "Policy" }];
            if (control.category.startsWith("P")) return [{ name: "Privacy Notice", type: "Policy" }];
            if (control.category.startsWith("CC")) return [{ name: "Process Description", type: "Document" }, { name: "Evidence of Operation", type: "Evidence" }];
        }

        // 5. Ultimate Fallback
        return REQUIRED_EVIDENCE_DEFAULTS["DEFAULT"];
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in relative">
            {/* TOP HEADER */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <a onClick={() => navigate('/dashboard')} className="hover:text-gray-900 cursor-pointer">DASHBOARD</a>
                            <span>/</span>
                            <span className="font-medium text-gray-900">{framework.code}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {framework.name} {useGroupedView && <span className="text-sm font-normal text-blue-600 bg-blue-50 px-2 py-1 rounded-full align-middle">(Premium View)</span>}
                        </h1>
                        <button
                            onClick={async () => {
                                if (window.confirm("This will RESET all controls for this framework to the correct 93 ISO controls. Existing progress will be lost. Continue?")) {
                                    try {
                                        const response = await fetch(`${API_URL}/frameworks/${framework.id}/seed-controls`, {
                                            method: 'POST',
                                        });
                                        if (response.ok) {
                                            alert("Data repaired successfully! refreshing...");
                                            window.location.reload();
                                        } else {
                                            const err = await response.json();
                                            alert("Failed: " + err.detail);
                                        }
                                    } catch (error) {
                                        alert("Error: " + error.message);
                                    }
                                }
                            }}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                            Repair Data
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* SEARCH */}
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search controls..."
                            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="space-y-10">
                    {/* GROUPED SPECIAL VIEW (SOC 2 & ISO) */}
                    {useGroupedView ? (
                        Object.keys(socControls).sort((a, b) => {
                            // ISO 27001 Custom Sort Order
                            const ISO_ORDER = [
                                "Governance & Policy",
                                "Risk Management",
                                "Performance Evaluation",
                                "Improvement",
                                "Operations (General)",
                                "Supplier Mgmt",
                                "Incident & Resilience",
                                "Legal & Compliance"
                            ];

                            const idxA = ISO_ORDER.indexOf(a);
                            const idxB = ISO_ORDER.indexOf(b);

                            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                            if (idxA !== -1) return -1;
                            if (idxB !== -1) return 1;
                            return a.localeCompare(b);
                        }).map(category => {
                            const controls = getFilteredControls(socControls[category]);
                            if (controls.length === 0) return null;
                            const cosoText = COSO_DESCRIPTIONS[category] || COSO_DESCRIPTIONS["DEFAULT"];

                            return (
                                <div key={category} className="mb-8">
                                    <div className="mb-4">
                                        <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                                        <p className="text-gray-600 font-medium text-sm mt-1 border-l-4 border-blue-500 pl-3">
                                            {cosoText}
                                        </p>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                                                    <th className="px-6 py-3 w-12">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                    </th>
                                                    <th className="px-6 py-3">Control</th>
                                                    <th className="px-6 py-3 w-48">Evidence Status</th>
                                                    <th className="px-6 py-3 w-32">Standard Control</th>
                                                    <th className="px-6 py-3 w-24">Owner</th>
                                                    <th className="px-6 py-3 w-32">Category</th>
                                                    <th className="px-6 py-3 w-20"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {controls.sort((a, b) => {
                                                    // Natural Sort (SAFE) - Defaults to empty string to prevent crashes
                                                    const titleA = a.title || "";
                                                    const titleB = b.title || "";
                                                    return titleA.localeCompare(titleB, undefined, { numeric: true, sensitivity: 'base' });
                                                }).map(control => {
                                                    const stats = getEvidenceStats(control.control_id); // Changed from c to control
                                                    const evidenceStatus = stats.uploaded > 0
                                                        ? (stats.uploaded >= stats.total ? "Met" : "Partial")
                                                        : "Not Met";

                                                    return (
                                                        <React.Fragment key={control.id}>
                                                            <tr
                                                                className={`hover:bg-gray-50 transition-colors cursor-pointer ${expandedControlId === control.id ? 'bg-blue-50/50' : ''}`}
                                                                onClick={() => setSelectedControl(control)}
                                                            >
                                                                <td className="px-6 py-4">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                    />
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {control.description}
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-2">
                                                                        {/* Audit Status Logic */}
                                                                        <div className="flex gap-1">
                                                                            {Array.from({ length: 4 }).map((_, i) => ( // Mock bars
                                                                                <div
                                                                                    key={i}
                                                                                    className={`h-3 w-1.5 rounded-full ${i < (stats.uploaded > 0 ? (stats.uploaded / stats.total) * 4 : 0) ? 'bg-green-500' : 'bg-gray-200'}`}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                        <span className="text-xs text-gray-500">
                                                                            {stats.uploaded}/{stats.total}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center">
                                                                        <span className="text-sm text-gray-500 font-mono">
                                                                            {control.title}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                                        System
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                        {(() => {
                                                                            const parts = (control.category || "").split('|');
                                                                            return parts[1] || parts[0] || "General";
                                                                        })()}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-right">
                                                                    <button
                                                                        onClick={() => setExpandedControlId(expandedControlId === control.id ? null : control.id)}
                                                                        className="text-gray-400 hover:text-blue-600 p-1"
                                                                    >
                                                                        {expandedControlId === control.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        /* STANDARD VIEW */
                        processes.length > 0 ? processes.map(process => (
                            <div key={process.id} className="text-center py-12">Standard View Loaded</div>
                        )) : <div className="text-center py-12">No data</div>
                    )}
                </div>
            </div>

            {/* CONTROL DRAWER */}
            {selectedControl && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" onClick={() => setSelectedControl(null)}></div>
                    <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-slide-in-right overflow-y-auto">
                        <button
                            onClick={() => setSelectedControl(null)}
                            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>

// ... imports


                        // ... in JSX, inside the Drawer, maybe after Description
                        <div className="p-8 pb-4 border-b border-gray-100">
                            <div className="flex gap-2 mb-2">
                                <span className="text-xs font-bold text-blue-600 px-2 py-1 bg-blue-50 rounded inline-block">
                                    {selectedControl.category}
                                </span>
                                <span className="text-xs font-bold text-gray-500 px-2 py-1 bg-gray-100 rounded inline-block font-mono">
                                    {selectedControl.control_id}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedControl.title}</h2>
                            <p className="text-gray-500 text-sm mb-4">
                                {COSO_DESCRIPTIONS[selectedControl.category] || selectedControl.description}
                            </p>

                            {/* AI POLICY GENERATOR */}
                            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                                        <Shield className="w-4 h-4" /> AI Policy Drafter
                                    </h3>
                                    {!generatedPolicy && (
                                        <button
                                            onClick={handleGeneratePolicy}
                                            disabled={isGenerating}
                                            className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-md font-bold hover:bg-purple-700 disabled:opacity-50 transition-colors"
                                        >
                                            {isGenerating ? "Drafting..." : "Auto-Generate Policy"}
                                        </button>
                                    )}
                                </div>
                                {generatedPolicy ? (
                                    <div className="text-xs text-gray-700 whitespace-pre-wrap bg-white p-3 rounded border border-purple-100 max-h-60 overflow-y-auto">
                                        {generatedPolicy}
                                    </div>
                                ) : (
                                    <p className="text-xs text-purple-700 italic">
                                        Need a formal policy? Click generate to draft one instantly using AI.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="p-8 space-y-8 flex-1">
// ... rest of drawer

                            {/* STANDARD REQUIREMENTS SECTION */}
                            <div className={`border rounded-xl p-5 ${aiRequirements ? 'bg-purple-50 border-purple-100' : 'bg-blue-50 border-blue-100'}`}>
                                <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${aiRequirements ? 'text-purple-900' : 'text-blue-900'}`}>
                                    {aiRequirements ? <Zap className="w-5 h-5 text-purple-600" /> : <Shield className="w-5 h-5" />}
                                    {aiRequirements ? "AI-Suggested Requirements" : "Standard Requirements"}
                                </h3>

                                <div className="space-y-3">
                                    {loadingAi && (
                                        <div className="p-4 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-2 animate-pulse">
                                            <Shield className="w-5 h-5" />
                                            <span className="text-sm font-semibold">Analyzing control requirements with AI...</span>
                                        </div>
                                    )}

                                    {aiError && (
                                        <div className="p-3 bg-red-50 text-red-600 rounded-lg flex items-center justify-between">
                                            <span className="text-sm font-medium">AI Analysis Failed. showing defaults.</span>
                                            <button
                                                onClick={() => fetchAiRequirements(selectedControl)}
                                                className="text-xs bg-white border border-red-200 px-3 py-1 rounded hover:bg-red-100 font-bold"
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    )}

                                    {!loadingAi && (() => {
                                        const reqs = getRequirements(selectedControl);
                                        const stats = getEvidenceStats(selectedControl.control_id);

                                        return (
                                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                            <th className="p-3 w-1/4">Requirement</th>
                                                            <th className="p-3 w-1/4">Description</th>
                                                            <th className="p-3 w-1/12">Source</th>
                                                            <th className="p-3 w-1/12">Owner</th>
                                                            <th className="p-3 w-1/12">Status</th>
                                                            <th className="p-3 w-1/6">Last Update</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {reqs.map((req, idx) => {
                                                            const isMet = isRequirementMet(idx, stats.uploaded);
                                                            const isExpanded = expandedReq === idx;

                                                            return (
                                                                <React.Fragment key={idx}>
                                                                    <tr
                                                                        onClick={() => setExpandedReq(isExpanded ? null : idx)}
                                                                        className={`cursor-pointer hover:bg-slate-50 transition-colors ${isExpanded ? 'bg-slate-50' : ''}`}
                                                                    >
                                                                        <td className="p-3 text-sm font-medium text-gray-900 border-l-4 border-transparent hover:border-purple-400">
                                                                            <div className="flex items-center gap-2">
                                                                                {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                                                                                {req.name}
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-3 text-xs text-gray-600 max-w-xs truncate" title={req.desc || req.name}>
                                                                            {req.desc || "Standard verification matching control requirements."}
                                                                        </td>
                                                                        <td className="p-3 text-xs text-gray-500">
                                                                            {selectedControl.category === "Technical" ?
                                                                                <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Auto</span> :
                                                                                "Manual"
                                                                            }
                                                                        </td>
                                                                        <td className="p-3 text-xs text-gray-500">
                                                                            <div className="flex items-center gap-1">
                                                                                <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-[8px] font-bold">SY</div>
                                                                                <span>System</span>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-3">
                                                                            {isMet ? (
                                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                                                    PASSING
                                                                                </span>
                                                                            ) : (
                                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                                                    MISSING
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="p-3 text-xs text-gray-400">
                                                                            {new Date().toLocaleDateString()}
                                                                        </td>
                                                                    </tr>
                                                                    {isExpanded && (
                                                                        <tr className="bg-slate-50">
                                                                            <td colSpan="6" className="p-4 pl-12">
                                                                                <div className="space-y-4">
                                                                                    <div className="grid grid-cols-2 gap-4">
                                                                                        <div>
                                                                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Evidence Context</h4>
                                                                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                                                                {req.desc || "This requirement verifies that the specific control implementation matches compliance standards. Ensure evidence is uploaded or automated checks are enabled."}
                                                                                            </p>
                                                                                        </div>
                                                                                        <div>
                                                                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Check Logic</h4>
                                                                                            <code className="text-xs bg-gray-100 p-2 rounded block font-mono text-gray-600">
                                                                                                MATCH(evidence.tags, ["{req.type}", "{selectedControl.control_id}"])
                                                                                            </code>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="bg-white border rounded-lg p-3">
                                                                                        <h4 className="text-xs font-bold text-gray-900 mb-2">History & Activity</h4>
                                                                                        <div className="text-xs text-gray-500 italic">No recent activity detected for this requirement.</div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                </React.Fragment>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>

                            {/* GAP ANALYSIS SECTION */}
                            <div className="border border-indigo-100 bg-indigo-50 rounded-xl p-5 mt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-indigo-600" /> Compliance Status Engine
                                    </h3>
                                    {gapAnalysis && (
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${gapAnalysis.status === 'MET' ? 'bg-green-100 text-green-700' :
                                            gapAnalysis.status === 'PARTIAL' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            AI VERDICT: {gapAnalysis.status}
                                        </span>
                                    )}
                                </div>

                                {!gapAnalysis ? (
                                    <div className="text-center py-6">
                                        <p className="text-sm text-indigo-800 mb-3">Analyze uploaded evidence against requirements to determine automated status.</p>
                                        <button
                                            onClick={handleGapAnalysis}
                                            disabled={analyzingGap}
                                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 mx-auto"
                                        >
                                            {analyzingGap ? <span className="animate-spin">⌛</span> : <Zap className="w-4 h-4" />}
                                            {analyzingGap ? "Analyzing Compliance..." : "Run Gap Analysis"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="bg-white p-4 rounded-lg border border-indigo-100 text-sm text-gray-700">
                                            <strong className="block text-gray-900 mb-1">Reasoning:</strong>
                                            {gapAnalysis.reasoning}
                                        </div>
                                        {gapAnalysis.missing_items && gapAnalysis.missing_items.length > 0 && (
                                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                                <strong className="block text-red-800 text-xs uppercase mb-2">Missing Evidence:</strong>
                                                <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                                                    {gapAnalysis.missing_items.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        <button
                                            onClick={handleGapAnalysis}
                                            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold underline mt-2 block text-center"
                                        >
                                            Re-run Analysis
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* MISSING EVIDENCE ACTIONS */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-orange-500" /> Pending Actions
                                </h3>
                                <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
                                    {selectedControl.category === "Technical" ? (
                                        <div className="p-8 text-center bg-slate-50">
                                            <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm mb-3">
                                                <Zap className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-900">Automated Check Enabled</h4>
                                            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                                                This is a technical control. Evidence is automatically collected and verified by the system. Manual uploads are disabled.
                                            </p>
                                        </div>
                                    ) : (
                                        (() => {
                                            const reqs = getRequirements(selectedControl);
                                            const stats = getEvidenceStats(selectedControl.control_id);
                                            const missing = reqs.filter((_, idx) => !isRequirementMet(idx, stats.uploaded));

                                            if (missing.length === 0) return <div className="p-4 text-sm text-gray-500 italic text-center">No pending actions. All requirements met.</div>;

                                            return missing.map((req, i) => (
                                                <div key={i} className="p-4 flex justify-between items-center group hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                                            <Upload className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">Upload {req.name}</p>
                                                            <p className="text-xs text-gray-500">Required for compliance.</p>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        id={`file-upload-${i}`}
                                                        className="hidden"
                                                        onChange={(e) => handleFileUpload(e, selectedControl.id)}
                                                    />
                                                    <button
                                                        onClick={() => document.getElementById(`file-upload-${i}`).click()}
                                                        className="text-xs font-bold text-blue-600 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50"
                                                    >
                                                        Upload
                                                    </button>
                                                </div>
                                            ));
                                        })()
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <div className="text-xs text-center text-gray-500 italic">
                                {selectedControl.category === "Technical" ?
                                    "Control status is managed by automated compliance checks." :
                                    "Control status is automatically updated based on evidence uploads."}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FrameworkDetail;
