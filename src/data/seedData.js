export const HIPPA_CONTROLS = [
    { title: "164.308(a)(1) - Risk Analysis", description: "Conduct an accurate and thorough assessment of the potential risks and vulnerabilities to the confidentiality, integrity, and availability of electronic protected health information held by the covered entity.", category: "Administrative" },
    { title: "164.308(a)(1)(ii)(B) - Risk Management", description: "Implement security measures sufficient to reduce risks and vulnerabilities to a reasonable and appropriate level.", category: "Administrative" },
    { title: "164.308(a)(3) - Workforce Security", description: "Implement procedures for the authorization and/or supervision of workforce members who work with electronic protected health information or in locations where it might be accessed.", category: "Administrative" },
    { title: "164.308(a)(4) - Information Access Management", description: "Implement policies and procedures for authorizing access to electronic protected health information.", category: "Administrative" },
    { title: "164.308(a)(5)(i) - Security Awareness", description: "Implement a security awareness and training program for all members of its workforce (including management).", category: "Administrative" },
    { title: "164.308(a)(6)(i) - Security Incident Procedures", description: "Implement policies and procedures to address security incidents.", category: "Administrative" },
    { title: "164.310(a)(1) - Facility Access Controls", description: "Implement policies and procedures to limit physical access to its electronic information systems and the facility or facilities in which they are housed.", category: "Physical" },
    { title: "164.310(b) - Workstation Use", description: "Implement policies and procedures that specify the proper functions to be performed, the manner in which those functions are to be performed, and the physical attributes of the surroundings of a specific workstation or class of workstation that can access electronic protected health information.", category: "Physical" },
    { title: "164.312(a)(1) - Access Control", description: "Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to those persons or software programs that have been granted access rights.", category: "Technical" },
    { title: "164.312(a)(2)(i) - Unique User Identification", description: "Assign a unique name and/or number for identifying and tracking user identity.", category: "Technical" },
    { title: "164.312(b) - Audit Controls", description: "Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information.", category: "Technical" }
];

export const NIST_CONTROLS = [
    { title: "ID.AM-1 - Inventory", description: "Physical devices and systems within the organization are inventoried.", category: "Identify" },
    { title: "ID.AM-2 - Software Inventory", description: "Software platforms and applications within the organization are inventoried.", category: "Identify" },
    { title: "ID.RA-1 - Risk Vulnerabilities", description: "Asset vulnerabilities are identified and documented.", category: "Identify" },
    { title: "PR.AC-1 - Access Control", description: "Access to assets and associated facilities is limited to authorized users, processes, or devices.", category: "Protect" },
    { title: "PR.DS-1 - Data-at-Rest", description: "Data-at-rest is protected.", category: "Protect" },
    { title: "PR.DS-2 - Data-in-Transit", description: "Data-in-Transit is protected.", category: "Protect" },
    { title: "DE.AE-1 - Anomalies Monitoring", description: "A baseline of network operations and expected data flows for users and systems is established and managed.", category: "Detect" },
    { title: "RS.RP-1 - Response Plan", description: "Response plan is executed during or after an incident.", category: "Respond" }
];

export const GDPR_CONTROLS = [
    { title: "Art. 5 - Principles relating to processing", description: "Personal data shall be processed lawfully, fairly and in a transparent manner.", category: "Principles" },
    { title: "Art. 6 - Lawfulness of processing", description: "Processing shall be lawful only if and to the extent that at least one legal basis applies.", category: "Principles" },
    { title: "Art. 15 - Right of Access", description: "The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed.", category: "Rights" },
    { title: "Art. 17 - Right to Erasure", description: "The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay.", category: "Rights" },
    { title: "Art. 32 - Security of Processing", description: "Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.", category: "Security" },
    { title: "Art. 33 - Notification of Breach", description: "In the case of a personal data breach, the controller shall without undue delay notify the supervisory authority.", category: "Security" }
];

// SOC 2 CONTROLS - RESTRUCTURED TO MATCH 'FrameworkDetail.js' COSO_DESCRIPTIONS
export const SOC2_CONTROLS = [
    // CC1: Control Environment (COSO 1-5)
    { title: "CC1.1 - Integrity and Ethical Values", description: "COSO Principle 1: The entity demonstrates a commitment to integrity and ethical values.", category: "CC1: Control Environment (COSO 1-5)" },
    { title: "CC1.2 - Board Oversight", description: "COSO Principle 2: The board of directors exercises oversight of the development and performance of internal control.", category: "CC1: Control Environment (COSO 1-5)" },
    { title: "CC1.3 - Management Structure", description: "COSO Principle 3: Management establishes structures, reporting lines, and appropriate authorities.", category: "CC1: Control Environment (COSO 1-5)" },
    { title: "CC1.4 - Competence", description: "COSO Principle 4: The entity demonstrates a commitment to attract, develop, and retain competent individuals.", category: "CC1: Control Environment (COSO 1-5)" },
    { title: "CC1.5 - Accountability", description: "COSO Principle 5: The entity holds individuals accountable for their internal control responsibilities.", category: "CC1: Control Environment (COSO 1-5)" },

    // CC2: Communication & Information (COSO 13-15)
    { title: "CC2.1 - Quality Information", description: "COSO Principle 13: The entity obtains or generates and uses relevant, quality information.", category: "CC2: Communication & Information (COSO 13-15)" },
    { title: "CC2.2 - Internal Communication", description: "COSO Principle 14: The entity internally communicates information.", category: "CC2: Communication & Information (COSO 13-15)" },
    { title: "CC2.3 - External Communication", description: "COSO Principle 15: The entity communicates with external parties.", category: "CC2: Communication & Information (COSO 13-15)" },

    // CC3: Risk Assessment (COSO 6-9)
    { title: "CC3.1 - Specify Objectives", description: "COSO Principle 6: The entity specifies objectives with sufficient clarity.", category: "CC3: Risk Assessment (COSO 6-9)" },
    { title: "CC3.2 - Identify Risks", description: "COSO Principle 7: The entity identifies risks to the achievement of its objectives.", category: "CC3: Risk Assessment (COSO 6-9)" },
    { title: "CC3.3 - Fraud Risk", description: "COSO Principle 8: The entity considers the potential for fraud in assessing risks.", category: "CC3: Risk Assessment (COSO 6-9)" },
    { title: "CC3.4 - Change Analysis", description: "COSO Principle 9: The entity identifies and assesses changes that could significantly impact the system.", category: "CC3: Risk Assessment (COSO 6-9)" },

    // CC4: Monitoring Activities (COSO 16-17)
    { title: "CC4.1 - Ongoing Evaluations", description: "COSO Principle 16: The entity selects, develops, and performs ongoing and/or separate evaluations.", category: "CC4: Monitoring Activities (COSO 16-17)" },
    { title: "CC4.2 - Deficiencies", description: "COSO Principle 17: The entity evaluates and communicates internal control deficiencies.", category: "CC4: Monitoring Activities (COSO 16-17)" },

    // CC5: Control Activities (COSO 10-12)
    { title: "CC5.1 - Select Controls", description: "COSO Principle 10: The entity selects and develops control activities.", category: "CC5: Control Activities (COSO 10-12)" },
    { title: "CC5.2 - General IT Controls", description: "COSO Principle 11: The entity selects and develops general control activities over technology.", category: "CC5: Control Activities (COSO 10-12)" },
    { title: "CC5.3 - Policy Deployment", description: "COSO Principle 12: The entity deploys control activities through policies and procedures.", category: "CC5: Control Activities (COSO 10-12)" },

    // CC6-9: SOC 2 Specifics
    { title: "CC6.1 - Logical Access Security", description: "Logical Access: The entity implements logical access security software, infrastructure, and architectures.", category: "CC6: Logical and Physical Access Controls" },
    { title: "CC6.2 - User Identification", description: "Logical Access: Prior to issuing credentials, the entity identifies and authenticates users.", category: "CC6: Logical and Physical Access Controls" },
    { title: "CC6.3 - Access Authorization", description: "Logical Access: The entity authorizes access to protected information assets.", category: "CC6: Logical and Physical Access Controls" },
    { title: "CC6.6 - Physical Access", description: "Logical Access: The entity restricts physical access.", category: "CC6: Logical and Physical Access Controls" },
    { title: "CC7.1 - Vulnerability Management", description: "System Operations: The entity identifies and manages system vulnerabilities.", category: "CC7: System Operations" },
    { title: "CC8.1 - Change Management", description: "Change Management: The entity authorizes, designs, develops, tests, and implements changes.", category: "CC8: Change Management" },

    // Additional Criteria
    { title: "A1.1 - Processing Capacity", description: "Availability: The entity maintains, monitors, and evaluates current processing capacity.", category: "Availability" },
    { title: "A1.2 - Backup and Recovery", description: "Availability: Data backup and recovery.", category: "Availability" },
    { title: "C1.1 - Confidentiality Identification", description: "Confidentiality: The entity identifies and maintains confidential information.", category: "Confidentiality" }
];

// ISO 27001 - MATCHED TO PROCESS GROUPS in FrameworkDetail.js
export const ISO_CONTROLS = [
    // Governance & Policy (Clauses 4, 5, 6, 7)
    { title: "4.1 - Understanding the organization", description: "The organization shall determine external and internal issues that are relevant to its purpose.", category: "Governance & Policy" },
    { title: "4.2 - Understanding the needs of interested parties", description: "The organization shall determine interested parties and their requirements relevant to information security.", category: "Governance & Policy" },
    { title: "4.3 - Scope of the ISMS", description: "The organization shall determine the boundaries and applicability of the information security management system.", category: "Governance & Policy" },
    { title: "5.1 - Leadership and commitment", description: "Top management shall demonstrate leadership and commitment with respect to the ISMS.", category: "Governance & Policy" },
    { title: "5.2 - Policy", description: "Top management shall establish an information security policy.", category: "Governance & Policy" },
    { title: "5.3 - Organizational roles, responsibilities and authorities", description: "Top management shall ensure that the responsibilities and authorities for roles relevant to information security are assigned and communicated.", category: "Governance & Policy" },

    // Risk Management (Clause 6, 8)
    { title: "6.1 - Actions to address risks and opportunities", description: "When planning for the ISMS, the organization shall consider issues and requirements and determine the risks and opportunities.", category: "Risk Management" },
    { title: "6.1.2 - Information security risk assessment", description: "The organization shall define and apply an information security risk assessment process.", category: "Risk Management" },
    { title: "6.1.3 - Information security risk treatment", description: "The organization shall define and apply an information security risk treatment process.", category: "Risk Management" },
    { title: "8.2 - Information security risk assessment", description: "The organization shall perform information security risk assessments at planned intervals.", category: "Risk Management" },
    { title: "8.3 - Information security risk treatment", description: "The organization shall implement the information security risk treatment plan.", category: "Risk Management" },

    // Support & HR (Clause 7)
    { title: "7.1 - Resources", description: "The organization shall determine and provide the resources needed for the ISMS.", category: "Governance & Policy" },
    { title: "7.2 - Competence", description: "The organization shall determine the necessary competence of person(s) doing work under its control.", category: "HR Security" },
    { title: "7.3 - Awareness", description: "Persons doing work under the organization's control shall be aware of the information security policy.", category: "HR Security" },
    { title: "7.4 - Communication", description: "The organization shall determine the need for internal and external communications relevant to the ISMS.", category: "Governance & Policy" },
    { title: "7.5 - Documented information", description: "The ISMS shall include documented information required by ISO/IEC 27001.", category: "Governance & Policy" },

    // Operations (Clause 8)
    { title: "8.1 - Operational planning and control", description: "The organization shall plan, implement and control the processes needed to meet information security requirements.", category: "Operations (General)" },

    // Performance Evaluation (Clause 9)
    { title: "9.1 - Monitoring, measurement, analysis and evaluation", description: "The organization shall evaluate the information security performance and the effectiveness of the ISMS.", category: "Performance Evaluation" },
    { title: "9.2 - Internal audit", description: "The organization shall conduct internal audits at planned intervals.", category: "Performance Evaluation" },
    { title: "9.3 - Management review", description: "Top management shall review the organization's ISMS at planned intervals.", category: "Performance Evaluation" },

    // Improvement (Clause 10)
    { title: "10.1 - Nonconformity and corrective action", description: "When a nonconformity occurs, the organization shall react to the nonconformity and take action to control and correct it.", category: "Improvement" },
    { title: "10.2 - Continual improvement", description: "The organization shall continually improve the suitability, adequacy and effectiveness of the ISMS.", category: "Improvement" },

    // Annex A Controls (Existing)
    { title: "A.5.1 - Policies for information security", description: "Policies for information security and topic-specific policies shall be defined, approved by management, published, communicated to and acknowledged by relevant personnel.", category: "Governance & Policy" },
    { title: "A.5.2 - Information security roles and responsibilities", description: "Information security roles and responsibilities shall be defined and allocated according to the organization needs.", category: "Governance & Policy" },
    { title: "A.5.3 - Segregation of duties", description: "Conflicting duties and conflicting areas of responsibility shall be segregated.", category: "Governance & Policy" },
    { title: "A.5.4 - Management responsibilities", description: "Management shall require all personnel to apply information security in accordance with the established information security policy.", category: "Governance & Policy" },
    { title: "A.5.37 - Documented operating procedures", description: "Operating procedures for information processing facilities shall be documented and made available to personnel who need them.", category: "Governance & Policy" },

    // HR Security
    { title: "A.6.1 - Screening", description: "Background verification checks on all candidates for employment, contractors and other personnel shall be carried out in accordance with relevant laws.", category: "HR Security" },
    { title: "A.6.2 - Terms and conditions of employment", description: "The contractual agreements with personnel and other interested parties shall state their and the organization's information security responsibilities.", category: "HR Security" },
    { title: "A.6.3 - Information security awareness, education and training", description: "Personnel of the organization and relevant interested parties shall receive appropriate info sec awareness, education and training.", category: "HR Security" },
    { title: "A.6.6 - Confidentiality or non-disclosure agreements", description: "Roles and responsibilities for the protection of information assets shall be included in confidentiality or non-disclosure agreements.", category: "HR Security" },

    // Access Control (IAM)
    { title: "A.5.15 - Access control", description: "Rules to control physical and logical access to information and information processing facilities shall be firmly established.", category: "Access Control (IAM)" },
    { title: "A.5.16 - Identity management", description: "The full life cycle of identities shall be managed.", category: "Access Control (IAM)" },
    { title: "A.5.17 - Authentication information", description: "Allocation and management of authentication information shall be controlled by a management process, including advising personnel on the appropriate handling of authentication information.", category: "Access Control (IAM)" },
    { title: "A.5.18 - Access rights", description: "Access rights to information and information processing facilities shall be provisioned, reviewed, modified and removed in accordance with the organization's topic-specific policy.", category: "Access Control (IAM)" },
    { title: "A.8.2 - Privileged access rights", description: "The allocation and use of privileged access rights shall be restricted and managed.", category: "Access Control (IAM)" },
    { title: "A.8.3 - Information access restriction", description: "Access to information and other associated assets shall be restricted in accordance with the established topic-specific policy on access control.", category: "Access Control (IAM)" },
    { title: "A.8.5 - Secure authentication", description: "Secure authentication technologies and procedures shall be implemented based on information classification and associated risks.", category: "Access Control (IAM)" },

    // Asset Management
    { title: "A.5.9 - Inventory of information and other associated assets", description: "An inventory of information and other associated assets, including owners, shall be developed and maintained.", category: "Asset Management" },
    { title: "A.5.10 - Acceptable use of information and other associated assets", description: "Rules for the acceptable use of information and of associated assets shall be identified, documented and implemented.", category: "Asset Management" },
    { title: "A.8.1 - User endpoint devices", description: "Information stored on, processed by or accessible via user endpoint devices shall be protected.", category: "Asset Management" },
    { title: "A.8.10 - Information deletion", description: "Information stored in information systems, devices or in any other storage media shall be deleted when no longer required.", category: "Asset Management" },

    // Physical Security
    { title: "A.7.1 - Physical security perimeters", description: "Security perimeters shall be defined and used to protect areas that contain either sensitive or critical information and other associated assets.", category: "Physical Security" },
    { title: "A.7.2 - Physical entry", description: "Secure areas shall be protected by appropriate entry controls and access points.", category: "Physical Security" },
    { title: "A.7.3 - Securing offices, rooms and facilities", description: "Physical security for offices, rooms and facilities shall be designed and implemented.", category: "Physical Security" },
    { title: "A.7.4 - Physical security monitoring", description: "Premises shall be continuously monitored for un-authorised physical access.", category: "Physical Security" },

    // Operations (General)
    { title: "A.8.7 - Protection against malware", description: "Protection against malware shall be implemented and supported by appropriate user awareness.", category: "Operations (General)" },
    { title: "A.8.12 - Data leakage prevention", description: "Data leakage prevention measures shall be applied to systems, networks and any other devices that process, store or transmit sensitive information.", category: "Operations (General)" },
    { title: "A.8.14 - Redundancy of information processing facilities", description: "Information processing facilities shall be implemented with redundancy sufficient to meet availability requirements.", category: "Operations (General)" },
    { title: "A.8.19 - Installation of software on operational systems", description: "Procedures and measures shall be implemented to securely manage software installation on operational systems.", category: "Operations (General)" },

    // Supplier Mgmt
    { title: "A.5.19 - Information security in supplier relationships", description: "Processes and procedures shall be defined and implemented to manage the information security risks associated with the use of suppliers' products or services.", category: "Supplier Mgmt" },
    { title: "A.5.20 - Addressing information security within supplier agreements", description: "Relevant information security requirements shall be established and agreed with each supplier that may access, process, store, communicate, or provide IT infrastructure components for, the organization's information.", category: "Supplier Mgmt" },
    { title: "A.5.21 - Managing information security in the ICT supply chain", description: "Processes and procedures shall be defined and implemented to manage the information security risks associated with the ICT products and services supply chain.", category: "Supplier Mgmt" },
    { title: "A.5.22 - Monitoring, review and change management of supplier services", description: "The organization shall regularly monitor, review, evaluate and manage change in supplier information security practices and service delivery.", category: "Supplier Mgmt" },
    { title: "A.5.23 - Information security for use of cloud services", description: "Processes for acquisition, use, management and exit from cloud services shall be established in accordance with the organization's information security requirements.", category: "Supplier Mgmt" },

    // Incident & Resilience
    { title: "A.5.24 - Information security incident management planning and preparation", description: "The organization shall plan and prepare for managing information security incidents by defining, establishing and communicating information security incident management processes, roles and responsibilities.", category: "Incident & Resilience" },
    { title: "A.5.25 - Assessment and decision on information security events", description: "The organization shall assess information security events and decide if they are to be categorized as information security incidents.", category: "Incident & Resilience" },
    { title: "A.5.26 - Response to information security incidents", description: "Information security incidents shall be responded to in accordance with the documented procedures.", category: "Incident & Resilience" },
    { title: "A.5.29 - Information security during disruption", description: "The organization shall plan how to maintain information security at an appropriate level during disruption.", category: "Incident & Resilience" },
    { title: "A.5.30 - ICT readiness for business continuity", description: "ICT readiness shall be planned, implemented, maintained and tested based on business continuity objectives and ICT continuity requirements.", category: "Incident & Resilience" },

    // Legal & Compliance
    { title: "A.5.31 - Legal, statutory, regulatory and contractual requirements", description: "Legal, statutory, regulatory and contractual requirements relevant to information security and the organization's approach to meet these requirements shall be identified, documented and kept up to date.", category: "Legal & Compliance" },
    { title: "A.5.32 - Intellectual property rights", description: "The organization shall implement procedures to protect intellectual property rights.", category: "Legal & Compliance" },
    { title: "A.5.34 - Privacy and protection of PII", description: "The organization shall ensure compliance with the legal, statutory, regulatory and contractual requirements related to privacy and protection of PII.", category: "Legal & Compliance" },

    // Threat Intel
    { title: "A.5.7 - Threat intelligence", description: "Information relating to information security threats shall be collected and analysed to produce threat intelligence.", category: "Threat Intel" },

    // Vulnerability Management
    { title: "A.8.8 - Management of technical vulnerabilities", description: "Information about technical vulnerabilities of information systems being used shall be obtained, the organization's exposure to such vulnerabilities evaluated and appropriate measures taken.", category: "Vulnerability Management" },

    // Configuration Management
    { title: "A.8.9 - Configuration management", description: "Configurations, including security configurations, of hardware, software, services and networks shall be established, documented, implemented, monitored and reviewed.", category: "Configuration Management" },

    // Backup Management
    { title: "A.8.13 - Information backup", description: "Backup copies of information, software and system images shall be taken and tested regularly in accordance with an agreed backup policy.", category: "Backup Management" },

    // Logging & Monitoring
    { title: "A.8.15 - Logging", description: "Logs that record activities, exceptions, faults and other relevant events shall be produced, stored, protected and analysed.", category: "Logging & Monitoring" },
    { title: "A.8.16 - Monitoring activities", description: "Networks, systems and applications shall be monitored for anomalous behaviour and appropriate actions taken to evaluate potential information security incidents.", category: "Logging & Monitoring" },

    // Network Security
    { title: "A.8.20 - Networks security", description: "Networks and network services shall be secured, managed and controlled to protect information in systems and applications.", category: "Network Security" },
    { title: "A.8.21 - Security of network services", description: "Security mechanisms, service levels and management requirements of all network services shall be identified and included in network services agreements.", category: "Network Security" },
    { title: "A.8.22 - Segregation of networks", description: "Groups of information services, users and information systems shall be segregated in the organization's networks.", category: "Network Security" },
    { title: "A.8.23 - Web filtering", description: "Access to external websites shall be managed to reduce exposure to malicious content.", category: "Network Security" },

    // Cryptography
    { title: "A.8.24 - Use of cryptography", description: "Rules for the effective use of cryptography, including cryptographic key management, shall be defined and implemented.", category: "Cryptography" },

    // SDLC
    { title: "A.8.25 - Secure development life cycle", description: "Rules for the secure development of software and systems shall be established and applied.", category: "SDLC (Development)" },
    { title: "A.8.28 - Secure coding", description: "Secure coding principles shall be applied to software development.", category: "SDLC (Development)" },
    { title: "A.8.29 - Security testing in development and acceptance", description: "Security testing processes shall be defined and implemented in the development life cycle.", category: "SDLC (Development)" },
    { title: "A.8.32 - Change management", description: "Changes to information processing facilities and information systems shall be subject to change management procedures.", category: "SDLC (Development)" },

    // Performance Evaluation
    { title: "A.5.35 - Independent review of information security", description: "The organization's approach to managing information security and its implementation including people, processes and technology shall be reviewed independently at planned intervals.", category: "Performance Evaluation" },
    { title: "A.5.36 - Compliance with policies, rules and standards for information security", description: "Compliance with the information security policy and standards shall be regularly reviewed.", category: "Performance Evaluation" }
];
