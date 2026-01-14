
import {
    Shield,
    Users,
    FileText,
    Lock,
    Server,
    Database,
    Globe,
    AlertTriangle,
    Eye,
    Briefcase,
    Activity,
    CreditCard,
    Layout
} from 'lucide-react';

// ============================================================================
// ISO 27001:2022 - USER DEFINED MAPPING (EXACT)
// ============================================================================
export const ISO_CONTROLS = [
    // Governance & Policy
    { title: "4.1 - Context of the organization", description: "Clause 4.1: Understanding the organization and its context.", category: "Governance & Policy" },
    { title: "4.2 - Needs of interested parties", description: "Clause 4.2: Understanding the needs and expectations of interested parties.", category: "Governance & Policy" },
    { title: "4.3 - Scope of the ISMS", description: "Clause 4.3: Determining the scope of the information security management system.", category: "Governance & Policy" },
    { title: "4.4 - ISMS System", description: "Clause 4.4: Information security management system.", category: "Governance & Policy" },
    { title: "5.1 - Leadership & Commitment", description: "Clause 5.1: Leadership and commitment.", category: "Governance & Policy" },
    { title: "5.2 - Policy", description: "Clause 5.2: Information security policy.", category: "Governance & Policy" },
    { title: "5.3 - Roles, responsibilities and authorities", description: "Clause 5.3: Organizational roles, responsibilities and authorities.", category: "Governance & Policy" },
    { title: "6.2 - Information Security Objectives", description: "Clause 6.2: Information security objectives and planning to achieve them.", category: "Governance & Policy" },
    { title: "6.3 - Planning of changes", description: "Clause 6.3: Planning of changes.", category: "Governance & Policy" },
    { title: "7.1 - Resources", description: "Clause 7.1: Resources.", category: "Governance & Policy" },
    { title: "7.5 - Documented information (Document Control)", description: "Clause 7.5: Documented information.", category: "Governance & Policy" },
    { title: "A.5.1 - Policies for information security", description: "Control 5.1: Policies for information security.", category: "Governance & Policy" },
    { title: "A.5.2 - Information security roles and responsibilities", description: "Control 5.2: Information security roles and responsibilities.", category: "Governance & Policy" },
    { title: "A.5.3 - Segregation of duties", description: "Control 5.3: Segregation of duties.", category: "Governance & Policy" },
    { title: "A.5.4 - Management responsibilities", description: "Control 5.4: Management responsibilities.", category: "Governance & Policy" },
    { title: "A.5.5 - Contact with authorities", description: "Control 5.5: Contact with authorities.", category: "Governance & Policy" },
    { title: "A.5.6 - Contact with special interest groups", description: "Control 5.6: Contact with special interest groups.", category: "Governance & Policy" },
    { title: "A.5.8 - Information security in project management", description: "Control 5.8: Information security in project management.", category: "Governance & Policy" },
    { title: "A.5.37 - Documented operating procedures", description: "Control 5.37: Documented operating procedures.", category: "Governance & Policy" },

    // HR Security
    { title: "7.2 - Competence (Skills Matrix)", description: "Clause 7.2: Competence.", category: "HR Security" },
    { title: "7.3 - Awareness (Training completion)", description: "Clause 7.3: Awareness.", category: "HR Security" },
    { title: "A.6.1 - Screening (Background Checks)", description: "Control 6.1: Screening.", category: "HR Security" },
    { title: "A.6.2 - Terms and conditions of employment", description: "Control 6.2: Terms and conditions of employment.", category: "HR Security" },
    { title: "A.6.3 - Information security awareness, education and training", description: "Control 6.3: Information security awareness, education and training.", category: "HR Security" },
    { title: "A.6.4 - Disciplinary process", description: "Control 6.4: Disciplinary process.", category: "HR Security" },
    { title: "A.6.5 - Responsibilities after termination or change of employment", description: "Control 6.5: Responsibilities after termination or change of employment.", category: "HR Security" },
    { title: "A.6.6 - Confidentiality or non-disclosure agreements", description: "Control 6.6: Confidentiality or non-disclosure agreements.", category: "HR Security" },
    { title: "A.6.7 - Remote working", description: "Control 6.7: Remote working.", category: "HR Security" },
    { title: "A.6.8 - Information security event reporting (Reporting Culture)", description: "Control 6.8: Information security event reporting.", category: "HR Security" },
    { title: "A.7.7 - Clear desk and clear screen", description: "Control 7.7: Clear desk and clear screen.", category: "HR Security" },

    // Asset Management
    { title: "A.5.9 - Inventory of information and other associated assets", description: "Control 5.9: Inventory of information and other associated assets.", category: "Asset Management" },
    { title: "A.5.10 - Acceptable use of information and other associated assets", description: "Control 5.10: Acceptable use of information and other associated assets.", category: "Asset Management" },
    { title: "A.5.11 - Return of assets", description: "Control 5.11: Return of assets.", category: "Asset Management" },
    { title: "A.5.12 - Classification of information", description: "Control 5.12: Classification of information.", category: "Asset Management" },
    { title: "A.5.13 - Labelling of information", description: "Control 5.13: Labelling of information.", category: "Asset Management" },
    { title: "A.7.10 - Storage media", description: "Control 7.10: Storage media.", category: "Asset Management" },
    { title: "A.8.1 - User endpoint devices", description: "Control 8.1: User endpoint devices.", category: "Asset Management" },

    // Access Control (IAM)
    { title: "A.5.15 - Access control", description: "Control 5.15: Access control.", category: "Access Control (IAM)" },
    { title: "A.5.16 - Identity management", description: "Control 5.16: Identity management.", category: "Access Control (IAM)" },
    { title: "A.5.17 - Authentication information", description: "Control 5.17: Authentication information.", category: "Access Control (IAM)" },
    { title: "A.5.18 - Access rights", description: "Control 5.18: Access rights.", category: "Access Control (IAM)" },
    { title: "A.8.2 - Privileged access rights", description: "Control 8.2: Privileged access rights.", category: "Access Control (IAM)" },
    { title: "A.8.3 - Information access restriction", description: "Control 8.3: Information access restriction.", category: "Access Control (IAM)" },
    { title: "A.8.4 - Access to source code", description: "Control 8.4: Access to source code.", category: "Access Control (IAM)" },
    { title: "A.8.5 - Secure authentication", description: "Control 8.5: Secure authentication.", category: "Access Control (IAM)" },

    // Physical Security
    { title: "A.7.1 - Physical security perimeters", description: "Control 7.1: Physical security perimeters.", category: "Physical Security" },
    { title: "A.7.2 - Physical entry", description: "Control 7.2: Physical entry.", category: "Physical Security" },
    { title: "A.7.3 - Securing offices, rooms and facilities", description: "Control 7.3: Securing offices, rooms and facilities.", category: "Physical Security" },
    { title: "A.7.4 - Physical security monitoring", description: "Control 7.4: Physical security monitoring.", category: "Physical Security" },
    { title: "A.7.5 - Protecting against physical and environmental threats", description: "Control 7.5: Protecting against physical and environmental threats.", category: "Physical Security" },
    { title: "A.7.6 - Working in secure areas", description: "Control 7.6: Working in secure areas.", category: "Physical Security" },
    { title: "A.7.8 - Equipment siting and protection", description: "Control 7.8: Equipment siting and protection.", category: "Physical Security" },
    { title: "A.7.9 - Security of assets off-premises", description: "Control 7.9: Security of assets off-premises.", category: "Physical Security" },
    { title: "A.7.11 - Supporting utilities", description: "Control 7.11: Supporting utilities.", category: "Physical Security" },
    { title: "A.7.12 - Cabling security", description: "Control 7.12: Cabling security.", category: "Physical Security" },
    { title: "A.7.13 - Equipment maintenance", description: "Control 7.13: Equipment maintenance.", category: "Physical Security" },
    { title: "A.7.14 - Secure disposal or re-use of equipment", description: "Control 7.14: Secure disposal or re-use of equipment.", category: "Physical Security" },

    // Operations (General)
    { title: "A.8.7 - Protection against malware", description: "Control 8.7: Protection against malware.", category: "Operations (General)" },
    { title: "A.8.10 - Information deletion", description: "Control 8.10: Information deletion.", category: "Operations (General)" },
    { title: "A.8.11 - Data masking", description: "Control 8.11: Data masking.", category: "Operations (General)" },
    { title: "A.8.12 - Data leakage prevention", description: "Control 8.12: Data leakage prevention.", category: "Operations (General)" },
    { title: "A.8.18 - Use of privileged utility programs", description: "Control 8.18: Use of privileged utility programs.", category: "Operations (General)" },

    // Configuration Management
    { title: "A.8.9 - Configuration management", description: "Control 8.9: Configuration management.", category: "Configuration Management" },

    // Cryptography
    { title: "A.8.24 - Use of cryptography", description: "Control 8.24: Use of cryptography.", category: "Cryptography" },

    // Logging & Monitoring
    { title: "A.8.15 - Logging", description: "Control 8.15: Logging.", category: "Logging & Monitoring" },
    { title: "A.8.16 - Monitoring activities", description: "Control 8.16: Monitoring activities.", category: "Logging & Monitoring" },

    // Clock Synchronization
    { title: "A.8.17 - Clock synchronization", description: "Control 8.17: Clock synchronization.", category: "Clock Synchronization" },

    // Vulnerability Management
    { title: "A.8.8 - Management of technical vulnerabilities", description: "Control 8.8: Management of technical vulnerabilities.", category: "Vulnerability Management" },

    // Capacity Management
    { title: "A.8.6 - Capacity management", description: "Control 8.6: Capacity management.", category: "Capacity Management" },

    // Backup Management
    { title: "A.8.13 - Information backup", description: "Control 8.13: Information backup.", category: "Backup Management" },

    // Network Security
    { title: "A.5.14 - Information transfer", description: "Control 5.14: Information transfer.", category: "Network Security" },
    { title: "A.8.20 - Networks security", description: "Control 8.20: Networks security.", category: "Network Security" },
    { title: "A.8.21 - Security of network services", description: "Control 8.21: Security of network services.", category: "Network Security" },
    { title: "A.8.22 - Segregation of networks", description: "Control 8.22: Segregation of networks.", category: "Network Security" },
    { title: "A.8.23 - Web filtering", description: "Control 8.23: Web filtering.", category: "Network Security" },

    // SDLC (Development)
    { title: "A.8.25 - Secure development life cycle", description: "Control 8.25: Secure development life cycle.", category: "SDLC (Development)" },
    { title: "A.8.26 - Application security requirements", description: "Control 8.26: Application security requirements.", category: "SDLC (Development)" },
    { title: "A.8.27 - Secure system architecture and engineering principles", description: "Control 8.27: Secure system architecture and engineering principles.", category: "SDLC (Development)" },
    { title: "A.8.28 - Secure coding", description: "Control 8.28: Secure coding.", category: "SDLC (Development)" },
    { title: "A.8.29 - Security testing in development and acceptance", description: "Control 8.29: Security testing in development and acceptance.", category: "SDLC (Development)" },
    { title: "A.8.30 - Outsourced development", description: "Control 8.30: Outsourced development.", category: "SDLC (Development)" },
    { title: "A.8.31 - Separation of development, test and production environments", description: "Control 8.31: Separation of development, test and production environments.", category: "SDLC (Development)" },
    { title: "A.8.32 - Change management", description: "Control 8.32: Change management.", category: "SDLC (Development)" },
    { title: "A.8.33 - Test information", description: "Control 8.33: Test information.", category: "SDLC (Development)" },

    // Supplier Mgmt
    { title: "A.5.19 - Information security in supplier relationships", description: "Control 5.19: Information security in supplier relationships.", category: "Supplier Mgmt" },
    { title: "A.5.20 - Addressing information security within supplier agreements", description: "Control 5.20: Addressing information security within supplier agreements.", category: "Supplier Mgmt" },
    { title: "A.5.21 - Managing information security in the ICT supply chain", description: "Control 5.21: Managing information security in the ICT supply chain.", category: "Supplier Mgmt" },
    { title: "A.5.22 - Monitoring, review and change management of supplier services", description: "Control 5.22: Monitoring, review and change management of supplier services.", category: "Supplier Mgmt" },
    { title: "A.5.23 - Information security for use of cloud services", description: "Control 5.23: Information security for use of cloud services.", category: "Supplier Mgmt" },

    // Incident & Resilience
    { title: "7.4 - Communication", description: "Clause 7.4: Communication.", category: "Incident & Resilience" },
    { title: "A.5.24 - Information security incident management planning and preparation", description: "Control 5.24: Information security incident management planning and preparation.", category: "Incident & Resilience" },
    { title: "A.5.25 - Assessment and decision on information security events", description: "Control 5.25: Assessment and decision on information security events.", category: "Incident & Resilience" },
    { title: "A.5.26 - Response to information security incidents", description: "Control 5.26: Response to information security incidents.", category: "Incident & Resilience" },
    { title: "A.5.27 - Learning from information security incidents", description: "Control 5.27: Learning from information security incidents.", category: "Incident & Resilience" },
    { title: "A.5.28 - Collection of evidence", description: "Control 5.28: Collection of evidence.", category: "Incident & Resilience" },
    { title: "A.5.29 - Information security during disruption (Business Continuity)", description: "Control 5.29: Information security during disruption.", category: "Incident & Resilience" },
    { title: "A.5.30 - ICT readiness for business continuity", description: "Control 5.30: ICT readiness for business continuity.", category: "Incident & Resilience" },
    { title: "A.8.14 - Redundancy of information processing facilities", description: "Control 8.14: Redundancy of information processing facilities.", category: "Incident & Resilience" },

    // Threat Intel
    { title: "A.5.7 - Threat intelligence", description: "Control 5.7: Threat intelligence.", category: "Threat Intel" },
    { title: "A.8.19 - Installation of software on operational systems", description: "Control 8.19: Installation of software on operational systems.", category: "Threat Intel" },

    // Legal & Compliance
    { title: "A.5.31 - Legal, statutory, regulatory and contractual requirements", description: "Control 5.31: Legal, statutory, regulatory and contractual requirements.", category: "Legal & Compliance" },
    { title: "A.5.32 - Intellectual property rights", description: "Control 5.32: Intellectual property rights.", category: "Legal & Compliance" },
    { title: "A.5.33 - Protection of records", description: "Control 5.33: Protection of records.", category: "Legal & Compliance" },
    { title: "A.5.34 - Privacy and protection of PII", description: "Control 5.34: Privacy and protection of PII.", category: "Legal & Compliance" },
    { title: "A.5.36 - Compliance with policies, rules and standards for information security", description: "Control 5.36: Compliance with policies, rules and standards for information security.", category: "Legal & Compliance" },
    { title: "A.8.34 - Protection of information systems during audit testing", description: "Control 8.34: Protection of information systems during audit testing.", category: "Legal & Compliance" },

    // Risk Management
    { title: "6.1.1 - General Risk Planning", description: "Clause 6.1.1: General Risk Planning.", category: "Risk Management" },
    { title: "6.1.2 - Information security risk assessment", description: "Clause 6.1.2: Information security risk assessment.", category: "Risk Management" },
    { title: "6.1.3 - Information security risk treatment", description: "Clause 6.1.3: Information security risk treatment.", category: "Risk Management" },
    { title: "8.1 - Operational planning and control", description: "Clause 8.1: Operational planning and control.", category: "Risk Management" },
    { title: "8.2 - Information security risk assessment (Execution)", description: "Clause 8.2: Information security risk assessment.", category: "Risk Management" },
    { title: "8.3 - Information security risk treatment (Execution)", description: "Clause 8.3: Information security risk treatment.", category: "Risk Management" },

    // Performance Evaluation
    { title: "9.1 - Monitoring, measurement, analysis and evaluation", description: "Clause 9.1: Monitoring, measurement, analysis and evaluation.", category: "Performance Evaluation" },
    { title: "9.2 - Internal Audit", description: "Clause 9.2: Internal Audit.", category: "Performance Evaluation" },
    { title: "9.3 - Management Review", description: "Clause 9.3: Management Review.", category: "Performance Evaluation" },
    { title: "A.5.35 - Independent review of information security", description: "Control 5.35: Independent review of information security.", category: "Performance Evaluation" },
    { title: "A.8.35 - Penetration Testing (Custom mapping per request)", description: "Custom: Penetration Testing.", category: "Performance Evaluation" },

    // Improvement
    { title: "10.1 - Nonconformity and corrective action", description: "Clause 10.1: Nonconformity and corrective action.", category: "Improvement" },
    { title: "10.2 - Continual Improvement", description: "Clause 10.2: Continual Improvement.", category: "Improvement" }
];

// ============================================================================
// SOC 2 - COSO MAPPED (CC1.1, etc.)
// ============================================================================
export const SOC2_CONTROLS = [
    // CC1: Control Environment
    { title: "CC1.1 - Values", description: "The entity demonstrates a commitment to integrity and ethical values.", category: "CC1.1" },
    { title: "CC1.2 - Board", description: "The board of directors exercises oversight of the development and performance of internal control.", category: "CC1.2" },
    { title: "CC1.3 - Structure", description: "Management establishes structures, reporting lines, and appropriate authorities and responsibilities.", category: "CC1.3" },
    { title: "CC1.4 - Competence", description: "The entity demonstrates a commitment to attract, develop, and retain competent individuals.", category: "CC1.4" },
    { title: "CC1.5 - Accountability", description: "The entity holds individuals accountable for their internal control responsibilities.", category: "CC1.5" },

    // CC2: Communication
    { title: "CC2.1 - Info Quality", description: "The entity obtains or generates and uses relevant, quality information.", category: "CC2.1" },
    { title: "CC2.2 - Internal Comm", description: "The entity internally communicates information.", category: "CC2.2" },
    { title: "CC2.3 - External Comm", description: "The entity communicates with external parties regarding matters affecting the functioning of internal control.", category: "CC2.3" },

    // CC3: Risk Assessment
    { title: "CC3.1 - Objectives", description: "The entity specifies objectives with sufficient clarity.", category: "CC3.1" },
    { title: "CC3.2 - Risk ID", description: "The entity identifies risks to the achievement of its objectives.", category: "CC3.2" },
    { title: "CC3.3 - Fraud", description: "The entity considers the potential for fraud in assessing risks.", category: "CC3.3" },
    { title: "CC3.4 - Changes", description: "The entity identifies and assesses changes that could significantly impact the system.", category: "CC3.4" },

    // CC4: Monitoring
    { title: "CC4.1 - Evaluations", description: "The entity selects, develops, and performs ongoing and/or separate evaluations.", category: "CC4.1" },
    { title: "CC4.2 - Deficiencies", description: "The entity evaluates and communicates internal control deficiencies.", category: "CC4.2" },

    // CC5: Control Activities
    { title: "CC5.1 - Control Acts", description: "The entity selects and develops control activities.", category: "CC5.1" },
    { title: "CC5.2 - Tech Controls", description: "The entity selects and develops general control activities over technology.", category: "CC5.2" },
    { title: "CC5.3 - Policies", description: "The entity deploys control activities through policies and procedures.", category: "CC5.3" },

    // LOGICAL ACCESS (CC6) - Using Specific Mapping
    { title: "CC6.1 - Logical Access", description: "The entity implements logical access security software, infrastructure, and architectures.", category: "CC6.1" },
    { title: "CC6.2 - User ID", description: "Prior to issuing credentials, the entity identifies and authenticates users.", category: "CC6.2" },
    { title: "CC6.3 - Authorization", description: "The entity authorizes access to protected information assets.", category: "CC6.3" },
    { title: "CC6.6 - Physical Access", description: "The entity restricts physical access to facilities.", category: "CC6.6" },

    // OPERATIONS (CC7)
    { title: "CC7.1 - Vulnerabilities", description: "The entity identifies and manages system vulnerabilities.", category: "CC7.1" },

    // CHANGE MANAGEMENT (CC8)
    { title: "CC8.1 - Change Mgmt", description: "The entity authorizes, designs, develops, tests, and implements changes.", category: "CC8.1" }
];

export const HIPPA_CONTROLS = [
    { title: "Access Control", description: "Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to those persons or software programs that have been granted access rights.", category: "Technical Safeguards" }
];

export const NIST_CONTROLS = [
    { title: "ID.AM-1", description: "Physical devices and systems within the organization are inventoried.", category: "Identify" }
];

export const GDPR_CONTROLS = [
    { title: "Article 5", description: "Principles relating to processing of personal data.", category: "Principles" }
];
