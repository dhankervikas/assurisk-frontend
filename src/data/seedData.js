
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
// ISO 27001:2022 - USER DEFINED MAPPING (EXACT) - ID SEPARATED
// ============================================================================
export const ISO_CONTROLS = [
    // Governance & Policy
    { control_id: "4.1", title: "Context of the organization", description: "Determine external and internal issues relevant to the organization's purpose and strategic direction.", category: "Governance & Policy" },
    { control_id: "4.2", title: "Needs of interested parties", description: "Determine interested parties and their requirements relevant to information security.", category: "Governance & Policy" },
    { control_id: "4.3", title: "Scope of the ISMS", description: "Determine the boundaries and applicability of the ISMS.", category: "Governance & Policy" },
    { control_id: "4.4", title: "ISMS System", description: "Establish, implement, maintain and continually improve the ISMS.", category: "Governance & Policy" },
    { control_id: "5.1", title: "Leadership & Commitment", description: "Top management shall demonstrate leadership and commitment with respect to the ISMS.", category: "Governance & Policy" },
    { control_id: "5.2", title: "Policy", description: "Establish an information security policy that is appropriate to the purpose of the organization.", category: "Governance & Policy" },
    { control_id: "5.3", title: "Roles, responsibilities and authorities", description: "Ensure that responsibilities and authorities for roles relevant to information security are assigned and communicated.", category: "Governance & Policy" },
    { control_id: "6.2", title: "Information Security Objectives", description: "Establish information security objectives at relevant functions and levels.", category: "Governance & Policy" },
    { control_id: "6.3", title: "Planning of changes", description: "When the organization determines the need for changes to the ISMS, the changes shall be carried out in a planned manner.", category: "Governance & Policy" },
    { control_id: "7.1", title: "Resources", description: "Determine and provide the resources needed for the establishment, implementation, maintenance and continual improvement of the ISMS.", category: "Governance & Policy" },
    { control_id: "7.5", title: "Documented information (Document Control)", description: "Creating, updating, and controlling documented information required by the ISMS.", category: "Governance & Policy" },
    { control_id: "A.5.1", title: "Policies for information security", description: "Policies for information security and topic-specific policies shall be defined, approved by management, published, communicated to and acknowledged by relevant personnel.", category: "Governance & Policy" },
    { control_id: "A.5.2", title: "Information security roles and responsibilities", description: "Information security roles and responsibilities shall be defined and allocated according to the organization needs.", category: "Governance & Policy" },
    { control_id: "A.5.3", title: "Segregation of duties", description: "Conflicting duties and conflicting areas of responsibility shall be segregated.", category: "Governance & Policy" },
    { control_id: "A.5.4", title: "Management responsibilities", description: "Management shall require all personnel to apply information security in accordance with the established policies and procedures.", category: "Governance & Policy" },
    { control_id: "A.5.5", title: "Contact with authorities", description: "The organization shall establish and maintain contact with relevant authorities.", category: "Governance & Policy" },
    { control_id: "A.5.6", title: "Contact with special interest groups", description: "The organization shall establish and maintain contact with special interest groups or other specialist security forums and professional associations.", category: "Governance & Policy" },
    { control_id: "A.5.8", title: "Information security in project management", description: "Information security shall be integrated into project management.", category: "Governance & Policy" },
    { control_id: "A.5.37", title: "Documented operating procedures", description: "Operating procedures for information processing facilities shall be documented and made available to users who need them.", category: "Governance & Policy" },

    // HR Security
    { control_id: "7.2", title: "Competence (Skills Matrix)", description: "Determine the necessary competence of person(s) doing work under its control that affects its information security performance.", category: "HR Security" },
    { control_id: "7.3", title: "Awareness (Training completion)", description: "Ensure persons doing work under the organization's control are aware of the information security policy and their contribution to the effectiveness of the ISMS.", category: "HR Security" },
    { control_id: "A.6.1", title: "Screening (Background Checks)", description: "Background verification checks on all candidates for employment shall be carried out in accordance with relevant laws, regulations and ethics.", category: "HR Security" },
    { control_id: "A.6.2", title: "Terms and conditions of employment", description: "The contractual agreements with employees and contractors shall state their and the organization’s responsibilities for information security.", category: "HR Security" },
    { control_id: "A.6.3", title: "Information security awareness, education and training", description: "Personnel of the organization and relevant contractors shall receive appropriate awareness education and training.", category: "HR Security" },
    { control_id: "A.6.4", title: "Disciplinary process", description: "A disciplinary process shall be formalized and communicated to take action against personnel who have committed an information security breach.", category: "HR Security" },
    { control_id: "A.6.5", title: "Responsibilities after termination or change of employment", description: "Information security responsibilities and duties that remain valid after termination or change of employment shall be defined, enforced and communicated.", category: "HR Security" },
    { control_id: "A.6.6", title: "Confidentiality or non-disclosure agreements", description: "Confidentiality or non-disclosure agreements reflecting the organization’s needs for the protection of information shall be identified, reviewed and signed.", category: "HR Security" },
    { control_id: "A.6.7", title: "Remote working", description: "Security measures shall be implemented when personnel are working remotely to protect information processed, stored or transmitted.", category: "HR Security" },
    { control_id: "A.6.8", title: "Information security event reporting (Reporting Culture)", description: "Information security events shall be reported through appropriate management channels as quickly as possible.", category: "HR Security" },
    { control_id: "A.7.7", title: "Clear desk and clear screen", description: "Clear desk rules for papers and removable storage media and clear screen rules for information processing facilities shall be defined and appropriately enforced.", category: "HR Security" },

    // Asset Management
    { control_id: "A.5.9", title: "Inventory of information and other associated assets", description: "An inventory of information and other associated assets, including owners, shall be developed and maintained.", category: "Asset Management" },
    { control_id: "A.5.10", title: "Acceptable use of information and other associated assets", description: "Rules for the acceptable use of information and of associated assets shall be identified, documented and implemented.", category: "Asset Management" },
    { control_id: "A.5.11", title: "Return of assets", description: "All personnel and other interested parties as appropriate shall return all of the organization’s assets in their possession upon termination of their employment, contract or agreement.", category: "Asset Management" },
    { control_id: "A.5.12", title: "Classification of information", description: "Information shall be classified in terms of legal requirements, value, criticality and sensitivity to unauthorized disclosure or modification.", category: "Asset Management" },
    { control_id: "A.5.13", title: "Labelling of information", description: "An appropriate set of procedures for information labelling shall be developed and implemented in accordance with the information classification scheme.", category: "Asset Management" },
    { control_id: "A.7.10", title: "Storage media", description: "Procedures shall be implemented to manage removable storage media in accordance with the classification scheme.", category: "Asset Management" },
    { control_id: "A.8.1", title: "User endpoint devices", description: "Information stored on, processed by or accessible via user endpoint devices shall be protected.", category: "Asset Management" },

    // Access Control (IAM)
    { control_id: "A.5.15", title: "Access control", description: "Rules to control physical and logical access to information and other associated assets shall be established and implemented.", category: "Access Control (IAM)" },
    { control_id: "A.5.16", title: "Identity management", description: "The full life cycle of identities shall be managed.", category: "Access Control (IAM)" },
    { control_id: "A.5.17", title: "Authentication information", description: "Allocation and management of authentication information shall be controlled by a management process, including advising personnel on appropriate handling of authentication information.", category: "Access Control (IAM)" },
    { control_id: "A.5.18", title: "Access rights", description: "Access rights to information and other associated assets shall be provisioned, reviewed, modified and removed in accordance with the organization’s specific policy and rules.", category: "Access Control (IAM)" },
    { control_id: "A.8.2", title: "Privileged access rights", description: "The allocation and use of privileged access rights shall be restricted and managed.", category: "Access Control (IAM)" },
    { control_id: "A.8.3", title: "Information access restriction", description: "Access to information and other associated assets shall be restricted in accordance with the established specific topic-specific policy on access control.", category: "Access Control (IAM)" },
    { control_id: "A.8.4", title: "Access to source code", description: "Read and write access to source code, development tools and software libraries shall be appropriately managed.", category: "Access Control (IAM)" },
    { control_id: "A.8.5", title: "Secure authentication", description: "Secure authentication technologies and procedures shall be implemented based on information classification and grade restrictions.", category: "Access Control (IAM)" },

    // Physical Security
    { control_id: "A.7.1", title: "Physical security perimeters", description: "Security perimeters shall be defined and used to protect areas that contain sensitive or critical information and other associated assets.", category: "Physical Security" },
    { control_id: "A.7.2", title: "Physical entry", description: "Secure areas shall be protected by appropriate entry controls and security points.", category: "Physical Security" },
    { control_id: "A.7.3", title: "Securing offices, rooms and facilities", description: "Physical security for offices, rooms and facilities shall be designed and implemented.", category: "Physical Security" },
    { control_id: "A.7.4", title: "Physical security monitoring", description: "Premises shall be continuously monitored for unauthorized physical access.", category: "Physical Security" },
    { control_id: "A.7.5", title: "Protecting against physical and environmental threats", description: "Protection against physical and environmental threats, such as natural disasters and other intentional or accidental attacks, shall be designed and implemented.", category: "Physical Security" },
    { control_id: "A.7.6", title: "Working in secure areas", description: "Procedures for working in secure areas shall be designed and applied.", category: "Physical Security" },
    { control_id: "A.7.8", title: "Equipment siting and protection", description: "Equipment shall be sited and protected to reduce the risks from environmental threats and hazards and opportunities for unauthorized access.", category: "Physical Security" },
    { control_id: "A.7.9", title: "Security of assets off-premises", description: "Off-site assets shall be protected.", category: "Physical Security" },
    { control_id: "A.7.11", title: "Supporting utilities", description: "Information processing facilities shall be protected from power failures and other disruptions caused by failures in supporting utilities.", category: "Physical Security" },
    { control_id: "A.7.12", title: "Cabling security", description: "Cables carrying power, data or supporting information services shall be protected from interception, interference or damage.", category: "Physical Security" },
    { control_id: "A.7.13", title: "Equipment maintenance", description: "Equipment shall be correctly maintained to ensure its continued availability and integrity.", category: "Physical Security" },
    { control_id: "A.7.14", title: "Secure disposal or re-use of equipment", description: "Items of equipment containing storage media shall be verified to ensure that any sensitive data and licensed software has been removed or securely overwritten prior to disposal or re-use.", category: "Physical Security" },

    // Operations (General)
    { control_id: "A.8.7", title: "Protection against malware", description: "Protection against malware shall be implemented and supported by appropriate user awareness.", category: "Operations (General)" },
    { control_id: "A.8.10", title: "Information deletion", description: "Information stored in information systems, devices or in any other storage media shall be deleted when no longer required.", category: "Operations (General)" },
    { control_id: "A.8.11", title: "Data masking", description: "Data masking shall be used in accordance with the organization’s specific policy on access control and other related topic-specific policies, and business requirements.", category: "Operations (General)" },
    { control_id: "A.8.12", title: "Data leakage prevention", description: "Data leakage prevention measures shall be applied to systems, networks and any other devices that process, store or transmit sensitive information.", category: "Operations (General)" },
    { control_id: "A.8.18", title: "Use of privileged utility programs", description: "The use of utility programs that might be capable of overriding system and application controls shall be restricted and tightly controlled.", category: "Operations (General)" },

    // Configuration Management
    { control_id: "A.8.9", title: "Configuration management", description: "Configurations, including security configurations, of hardware, software, services and networks shall be established, documented, implemented, monitored and reviewed.", category: "Configuration Management" },

    // Cryptography
    { control_id: "A.8.24", title: "Use of cryptography", description: "Rules for the effective use of cryptography, including cryptographic key management, shall be defined and implemented.", category: "Cryptography" },

    // Logging & Monitoring
    { control_id: "A.8.15", title: "Logging", description: "Logs that record activities, exceptions, faults and other relevant events shall be produced, stored, protected and analysed.", category: "Logging & Monitoring" },
    { control_id: "A.8.16", title: "Monitoring activities", description: "Networks, systems and applications shall be monitored for anomalous behaviour and appropriate actions taken to evaluate potential information security incidents.", category: "Logging & Monitoring" },

    // Clock Synchronization
    { control_id: "A.8.17", title: "Clock synchronization", description: "The clocks of all relevant information processing systems used within the organization or security domain shall be synchronised to a single reference time source.", category: "Clock Synchronization" },

    // Vulnerability Management
    { control_id: "A.8.8", title: "Management of technical vulnerabilities", description: "Information about technical vulnerabilities of information systems being used shall be obtained, the organization’s exposure to such vulnerabilities evaluated and appropriate measures taken.", category: "Vulnerability Management" },

    // Capacity Management
    { control_id: "A.8.6", title: "Capacity management", description: "The use of resources shall be monitored and tuned, and projections made of future capacity requirements to ensure the required system performance.", category: "Capacity Management" },

    // Backup Management
    { control_id: "A.8.13", title: "Information backup", description: "Backup copies of information, software and system images shall be taken and tested regularly in accordance with an agreed topic-specific policy on backup.", category: "Backup Management" },

    // Network Security
    { control_id: "A.5.14", title: "Information transfer", description: "Information transfer rules, procedures and agreements shall be in place for all types of transfer facilities within the organization and between the organization and other parties.", category: "Network Security" },
    { control_id: "A.8.20", title: "Networks security", description: "Networks and network services shall be secured, controlled and managed to protect the information systems and applications.", category: "Network Security" },
    { control_id: "A.8.21", title: "Security of network services", description: "Security mechanisms, service levels and management requirements of all network services shall be identified, implemented and monitored.", category: "Network Security" },
    { control_id: "A.8.22", title: "Segregation of networks", description: "Groups of information services, users and information systems shall be segregated on networks.", category: "Network Security" },
    { control_id: "A.8.23", title: "Web filtering", description: "Access to external websites shall be managed to reduce exposure to malicious content.", category: "Network Security" },

    // SDLC (Development)
    { control_id: "A.8.25", title: "Secure development life cycle", description: "Rules for the secure development of software and systems shall be established and applied.", category: "SDLC (Development)" },
    { control_id: "A.8.26", title: "Application security requirements", description: "Information security requirements shall be identified, specified and approved when developing or acquiring applications.", category: "SDLC (Development)" },
    { control_id: "A.8.27", title: "Secure system architecture and engineering principles", description: "Principles for secure system engineering shall be established, documented, maintained and applied to any information system implementation activities.", category: "SDLC (Development)" },
    { control_id: "A.8.28", title: "Secure coding", description: "Secure coding principles shall be applied to software development.", category: "SDLC (Development)" },
    { control_id: "A.8.29", title: "Security testing in development and acceptance", description: "Security testing processes shall be defined and implemented in the development life cycle.", category: "SDLC (Development)" },
    { control_id: "A.8.30", title: "Outsourced development", description: "The organization shall direct, monitor and verify the activities of outsourced system development.", category: "SDLC (Development)" },
    { control_id: "A.8.31", title: "Separation of development, test and production environments", description: "Development, testing, and production environments shall be separated to reduce the risks of unauthorized access or changes to the production environment.", category: "SDLC (Development)" },
    { control_id: "A.8.32", title: "Change management", description: "Changes to information processing facilities and information systems shall be subject to change management procedures.", category: "SDLC (Development)" },
    { control_id: "A.8.33", title: "Test information", description: "Test information shall be selected, protected and managed.", category: "SDLC (Development)" },

    // Supplier Mgmt
    { control_id: "A.5.19", title: "Information security in supplier relationships", description: "Processes and procedures shall be defined and implemented to manage the information security risks associated with the use of supplier's products or services.", category: "Supplier Mgmt" },
    { control_id: "A.5.20", title: "Addressing information security within supplier agreements", description: "Relevant information security requirements shall be established and agreed with each supplier.", category: "Supplier Mgmt" },
    { control_id: "A.5.21", title: "Managing information security in the ICT supply chain", description: "Processes and procedures shall be defined and implemented to manage the information security risks associated with the ICT products and services supply chain.", category: "Supplier Mgmt" },
    { control_id: "A.5.22", title: "Monitoring, review and change management of supplier services", description: "The organization shall regularly monitor, review, audit and evaluate supplier service delivery.", category: "Supplier Mgmt" },
    { control_id: "A.5.23", title: "Information security for use of cloud services", description: "Processes for acquisition, use, management and exit from cloud services shall be established in accordance with the organization’s information security requirements.", category: "Supplier Mgmt" },

    // Incident & Resilience
    { control_id: "7.4", title: "Communication", description: "The organization shall determine the need for internal and external communications relevant to the ISMS.", category: "Incident & Resilience" },
    { control_id: "A.5.24", title: "Information security incident management planning and preparation", description: "The organization shall plan and prepare for managing information security incidents.", category: "Incident & Resilience" },
    { control_id: "A.5.25", title: "Assessment and decision on information security events", description: "The organization shall assess information security events and decide if they are to be classified as information security incidents.", category: "Incident & Resilience" },
    { control_id: "A.5.26", title: "Response to information security incidents", description: "Information security incidents shall be responded to in accordance with the documented procedures.", category: "Incident & Resilience" },
    { control_id: "A.5.27", title: "Learning from information security incidents", description: "Knowledge gained from analyzing and resolving information security incidents shall be used to reduce the likelihood or impact of future incidents.", category: "Incident & Resilience" },
    { control_id: "A.5.28", title: "Collection of evidence", description: "The organization shall define and apply procedures for the identification, collection, acquisition and preservation of evidence related to information security events.", category: "Incident & Resilience" },
    { control_id: "A.5.29", title: "Information security during disruption (Business Continuity)", description: "The organization shall plan how to maintain information security at an appropriate level during disruption.", category: "Incident & Resilience" },
    { control_id: "A.5.30", title: "ICT readiness for business continuity", description: "ICT readiness shall be planned, implemented, maintained and tested based on business continuity objectives and ICT continuity requirements.", category: "Incident & Resilience" },
    { control_id: "A.8.14", title: "Redundancy of information processing facilities", description: "Information processing facilities shall be implemented with redundancy sufficient to meet availability requirements.", category: "Incident & Resilience" },

    // Threat Intel
    { control_id: "A.5.7", title: "Threat intelligence", description: "Information about information security threats shall be collected and analysed to produce threat intelligence.", category: "Threat Intel" },
    { control_id: "A.8.19", title: "Installation of software on operational systems", description: "Procedures and measures shall be implemented to securely manage software installation on operational systems.", category: "Threat Intel" },

    // Legal & Compliance
    { control_id: "A.5.31", title: "Legal, statutory, regulatory and contractual requirements", description: "Legal, statutory, regulatory and contractual requirements relevant to information security and the organization’s approach to meet these requirements shall be identified, documented and kept up to date.", category: "Legal & Compliance" },
    { control_id: "A.5.32", title: "Intellectual property rights", description: "The organization shall implement appropriate procedures to protect intellectual property rights.", category: "Legal & Compliance" },
    { control_id: "A.5.33", title: "Protection of records", description: "Records shall be protected from loss, destruction, falsification, unauthorized access and unauthorized release.", category: "Legal & Compliance" },
    { control_id: "A.5.34", title: "Privacy and protection of PII", description: "The organization shall identify and meet the requirements regarding the preservation of privacy and protection of PII.", category: "Legal & Compliance" },
    { control_id: "A.5.36", title: "Compliance with policies, rules and standards for information security", description: "Compliance with the organization’s information security policy and topic-specific policies shall be reviewed regularly.", category: "Legal & Compliance" },
    { control_id: "A.8.34", title: "Protection of information systems during audit testing", description: "Audit tests and other assurance activities involving operational systems shall be planned and agreed between the tester and appropriate management.", category: "Legal & Compliance" },

    // Risk Management
    { control_id: "6.1.1", title: "General Risk Planning", description: "General planning for risk management.", category: "Risk Management" },
    { control_id: "6.1.2", title: "Information security risk assessment", description: "Define and apply an information security risk assessment process.", category: "Risk Management" },
    { control_id: "6.1.3", title: "Information security risk treatment", description: "Define and apply an information security risk treatment process.", category: "Risk Management" },
    { control_id: "8.1", title: "Operational planning and control", description: "Plan, implement and control the processes needed to meet information security requirements.", category: "Risk Management" },
    { control_id: "8.2", title: "Information security risk assessment (Execution)", description: "Perform information security risk assessments at planned intervals.", category: "Risk Management" },
    { control_id: "8.3", title: "Information security risk treatment (Execution)", description: "Implement the information security risk treatment plan.", category: "Risk Management" },

    // Performance Evaluation
    { control_id: "9.1", title: "Monitoring, measurement, analysis and evaluation", description: "Evaluate the information security performance and the effectiveness of the ISMS.", category: "Performance Evaluation" },
    { control_id: "9.2", title: "Internal Audit", description: "Conduct internal audits at planned intervals.", category: "Performance Evaluation" },
    { control_id: "9.3", title: "Management Review", description: "Top management shall review the organization's ISMS.", category: "Performance Evaluation" },
    { control_id: "A.5.35", title: "Independent review of information security", description: "The organization’s approach to managing information security and its implementation shall be reviewed independently at planned intervals.", category: "Performance Evaluation" },
    { control_id: "A.8.35", title: "Penetration Testing (Custom)", description: "Conduct penetration testing to identify vulnerabilities.", category: "Performance Evaluation" },

    // Improvement
    { control_id: "10.1", title: "Nonconformity and corrective action", description: "React to nonconformities and take action to control and correct them.", category: "Improvement" },
    { control_id: "10.2", title: "Continual Improvement", description: "Continually improve the suitability, adequacy and effectiveness of the ISMS.", category: "Improvement" }
];


// ============================================================================
// SOC 2 - COSO MAPPED (USER DEFINED P1-P17)
// ============================================================================
export const SOC2_CONTROLS = [
    // P1: Integrity & Ethics (CC1.1)
    { title: "CC1.1 - Integrity & Ethics", description: "The entity demonstrates a commitment to integrity and ethical values.", category: "COSO Principle 1" },

    // P2: Board Oversight (CC1.2)
    { title: "CC1.2 - Board Oversight", description: "The board demonstrates independence and exercises oversight of internal control.", category: "COSO Principle 2" },

    // P3: Structure & Authority (CC1.3)
    { title: "CC1.3 - Structure & Authority", description: "Management establishes structures, reporting lines, and authorities.", category: "COSO Principle 3" },

    // P4: Competence (CC1.4)
    { title: "CC1.4 - Competence", description: "The entity demonstrates a commitment to attract, develop, and retain competent individuals.", category: "COSO Principle 4" },

    // P5: Accountability (CC1.5)
    { title: "CC1.5 - Accountability", description: "The entity holds individuals accountable for internal control responsibilities.", category: "COSO Principle 5" },

    // P6: Specific Objectives (CC3.1)
    { title: "CC3.1 - Specific Objectives", description: "The entity specifies objectives with clarity to enable risk identification.", category: "COSO Principle 6" },

    // P7: Risk Identification (CC3.2)
    { title: "CC3.2 - Risk Identification", description: "The entity identifies and analyzes risks to the achievement of objectives.", category: "COSO Principle 7" },

    // P8: Fraud Risk (CC3.3)
    { title: "CC3.3 - Fraud Risk", description: "The entity considers the potential for fraud in assessing risks.", category: "COSO Principle 8" },

    // P9: Change Management (CC3.4)
    { title: "CC3.4 - Change Management (Risk)", description: "The entity assesses changes that could impact the system of internal control.", category: "COSO Principle 9" },

    // P10: Risk Mitigation (CC5.1)
    { title: "CC5.1 - Risk Mitigation", description: "The entity selects control activities that mitigate risks to acceptable levels.", category: "COSO Principle 10" },

    // P11: Tech Controls (CC5.2)
    { title: "CC5.2 - Tech Controls", description: "The entity selects general control activities over technology.", category: "COSO Principle 11" },

    // P12: Policies (CC5.3) + IT Expansion
    { title: "CC5.3 - Policies", description: "The entity deploys control activities through policies and procedures.", category: "COSO Principle 12" },

    // P13: Quality Info (CC2.1)
    { title: "CC2.1 - Quality Information", description: "The entity uses relevant, quality information to support internal control.", category: "COSO Principle 13" },

    // P14: Internal Comm (CC2.2)
    { title: "CC2.2 - Internal Communication", description: "The entity communicates information internally (objectives/responsibilities).", category: "COSO Principle 14" },

    // P15: External Comm (CC2.3)
    { title: "CC2.3 - External Communication", description: "The entity communicates with external parties regarding internal control matters.", category: "COSO Principle 15" },

    // P16: Ongoing Evals (CC4.1)
    { title: "CC4.1 - Ongoing Evaluations", description: "The entity performs ongoing evaluations of internal control (Monitoring).", category: "COSO Principle 16" },

    // P17: Deficiency Reporting (CC4.2)
    { title: "CC4.2 - Deficiency Reporting", description: "The entity communicates deficiencies timely to those responsible.", category: "COSO Principle 17" },

    // --- IT EXPANSION (Specific Criteria) ---
    { title: "CC6.1 - Logical Access", description: "Logical Access: Restrict access to authorized users.", category: "Logical Access (CC6)" },
    { title: "CC6.2 - Access Reviews", description: "Access Reviews: Regularly review user access rights.", category: "Logical Access (CC6)" },
    { title: "CC6.6 - Physical Security", description: "Physical Security: Protect physical assets.", category: "Physical Security (CC6)" },
    { title: "CC6.7 - Data Transmission", description: "Data Transmission: Restrict movement of data.", category: "Logical Access (CC6)" },

    { title: "CC7.1 - System Operations", description: "System Ops: Monitor for configuration changes and vulnerabilities.", category: "System Operations (CC7)" },

    { title: "CC8.1 - Change Management (DevOps)", description: "Change Mgmt: Authorize, test, and approve changes.", category: "Change Management (CC8)" },

    { title: "CC9.2 - Vendor Risk", description: "Vendor Risk: Manage risks from business partners.", category: "Vendor Risk (CC9)" }
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
