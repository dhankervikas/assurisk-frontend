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

export const SOC2_CONTROLS = [
    // CC1 Control Environment (COSO Principles 1-5)
    { title: "CC1.1 - Integrity and Ethical Values", description: "The entity demonstrates a commitment to integrity and ethical values.", category: "CC1 - Control Environment" },
    { title: "CC1.2 - Board Oversight", description: "The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control.", category: "CC1 - Control Environment" },
    { title: "CC1.3 - Management Structure", description: "Management establishes, with board oversight, structures, reporting lines, and appropriate authorities and responsibilities in the pursuit of objectives.", category: "CC1 - Control Environment" },
    { title: "CC1.4 - Competence", description: "The entity demonstrates a commitment to attract, develop, and retain competent individuals in alignment with objectives.", category: "CC1 - Control Environment" },
    { title: "CC1.5 - Accountability", description: "The entity holds individuals accountable for their internal control responsibilities in the pursuit of objectives.", category: "CC1 - Control Environment" },

    // CC2 Communication and Information (COSO Principles 13-15)
    { title: "CC2.1 - Quality Information", description: "The entity obtains or generates and uses relevant, quality information to support the functioning of internal control.", category: "CC2 - Communication & Info" },
    { title: "CC2.2 - Internal Communication", description: "The entity internally communicates information, including objectives and responsibilities for internal control, necessary to support the functioning of internal control.", category: "CC2 - Communication & Info" },
    { title: "CC2.3 - External Communication", description: "The entity communicates with external parties regarding matters affecting the functioning of internal control.", category: "CC2 - Communication & Info" },

    // CC3 Risk Assessment (COSO Principles 6-9)
    { title: "CC3.1 - Specify Objectives", description: "The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives.", category: "CC3 - Risk Assessment" },
    { title: "CC3.2 - Identify Risks", description: "The entity identifies risks to the achievement of its objectives and analyses risks as a basis for determining how the risks should be managed.", category: "CC3 - Risk Assessment" },
    { title: "CC3.3 - Fraud Risk", description: "The entity considers the potential for fraud in assessing risks to the achievement of objectives.", category: "CC3 - Risk Assessment" },
    { title: "CC3.4 - Change Analysis", description: "The entity identifies and assesses changes that could significantly impact the system of internal control.", category: "CC3 - Risk Assessment" },

    // CC4 Monitoring Activities (COSO Principles 16-17)
    { title: "CC4.1 - Ongoing Evaluations", description: "The entity selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning.", category: "CC4 - Monitoring" },
    { title: "CC4.2 - Deficiencies", description: "The entity evaluates and communicates internal control deficiencies in a timely manner to those parties responsible for taking corrective action, including senior management and the board of directors, as appropriate.", category: "CC4 - Monitoring" },

    // CC5 Control Activities (COSO Principles 10-12)
    { title: "CC5.1 - Select Controls", description: "The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels.", category: "CC5 - Control Activities" },
    { title: "CC5.2 - General IT Controls", description: "The entity selects and develops general control activities over technology to support the achievement of objectives.", category: "CC5 - Control Activities" },
    { title: "CC5.3 - Policy Deployment", description: "The entity deploys control activities through policies that establish what is expected and procedures that put policies into action.", category: "CC5 - Control Activities" },

    // CC6 Logical and Physical Access
    { title: "CC6.1 - Logical Access Security", description: "The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet its objectives.", category: "CC6 - Logical & Physical Access" },
    { title: "CC6.2 - User Identification", description: "Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users whose access is administered by the entity.", category: "CC6 - Logical & Physical Access" },
    { title: "CC6.3 - Access Authorization", description: "The entity authorizes internal and external use of system resources prior to processing and on a periodic basis.", category: "CC6 - Logical & Physical Access" },
    { title: "CC6.4 - Re-authorization of Access", description: "The entity restricts physical access to facilities and protected information assets to authorized personnel to meet its objectives.", category: "CC6 - Logical & Physical Access" },
    { title: "CC6.5 - Discontinued Access", description: "The entity discontinues logical and physical access to protected information assets in a timely manner upon termination or change of employment.", category: "CC6 - Logical & Physical Access" },
    { title: "CC6.6 - Physical Access", description: "The entity restricts physical access to facilities and protected information assets to authorized personnel to meet its objectives.", category: "CC6 - Logical & Physical Access" },
    { title: "CC6.7 - Transmission Protection", description: "The entity restricts the transmission, movement, and removal of information to authorized internal and external users and processes, and protects it during transmission, movement, or removal to meet its objectives.", category: "CC6 - Logical & Physical Access" },
    { title: "CC6.8 - Malicious Software", description: "The entity implements controls to prevent or detect and act upon the introduction of unauthorized or malicious software to meet its objectives.", category: "CC6 - Logical & Physical Access" },

    // CC7 System Operations
    { title: "CC7.1 - Vulnerability Management", description: "The entity uses detection and monitoring procedures to identify (1) changes to configurations that result in the introduction of new vulnerabilities, and (2) susceptibilities to newly discovered vulnerabilities.", category: "CC7 - System Operations" },
    { title: "CC7.2 - Monitoring", description: "The entity monitors system components and the operation of those components for anomalies that are indicative of malicious acts, natural disasters, and errors affecting the entity's ability to meet its objectives.", category: "CC7 - System Operations" },
    { title: "CC7.3 - Incident Response", description: "The entity evaluates security events to determine whether they could or have resulted in a failure of the entity to meet its objectives (security incidents) and, if so, takes actions to prevent or address such failures.", category: "CC7 - System Operations" },
    { title: "CC7.4 - Incident Response Framework", description: "The entity responds to identified security incidents by executing a defined incident response program to understand, contain, remediate, and communicate security incidents, as appropriate.", category: "CC7 - System Operations" },

    // CC8 Change Management
    { title: "CC8.1 - Change Management", description: "The entity authorizes, designs, develops, or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures to meet its objectives.", category: "CC8 - Change Management" },

    // CC9 Risk Mitigation
    { title: "CC9.1 - Risk Mitigation", description: "The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions.", category: "CC9 - Risk Mitigation" },
    { title: "CC9.2 - Risk Mitigation Monitoring", description: "The entity assesses and manages risks associated with vendors and business partners.", category: "CC9 - Risk Mitigation" },

    // A1 Availability
    { title: "A1.1 - Processing Capacity", description: "The entity maintains, monitors, and evaluates current processing capacity and use of system components (infrastructure, data, and software) to manage capacity demand.", category: "Availability" },
    { title: "A1.2 - Backup and Recovery", description: "The entity authorizes, designs, develops, or acquires, configures, documents, tests, approves, and implements changes to recovery infrastructure, data, software, and procedures.", category: "Availability" },
    { title: "A1.3 - Disaster Recovery", description: "The entity tests recovery plan procedures on a periodic basis to enable the entity to meet its objectives.", category: "Availability" },

    // C1 Confidentiality
    { title: "C1.1 - Confidentiality Identification", description: "The entity identifies and maintains confidential information to meet the entity's objectives related to confidentiality.", category: "Confidentiality" },
    { title: "C1.2 - Data Retention", description: "The entity disposes of confidential information to meet the entity's objectives related to confidentiality.", category: "Confidentiality" }
];

export const ISO_CONTROLS = [
    // 5. Organizational Controls
    { title: "A.5.1 - Policies for information security", description: "Policies for information security and topic-specific policies shall be defined, approved by management, published, communicated to and acknowledged by relevant personnel.", category: "Governance & Policy" },
    { title: "A.5.2 - Information security roles and responsibilities", description: "Information security roles and responsibilities shall be defined and allocated according to the organization needs.", category: "Governance & Policy" },
    { title: "A.5.3 - Segregation of duties", description: "Conflicting duties and conflicting areas of responsibility shall be segregated.", category: "Governance & Policy" },
    { title: "A.5.4 - Management responsibilities", description: "Management shall require all personnel to apply information security in accordance with the established information security policy.", category: "Governance & Policy" },
    { title: "A.5.5 - Contact with authorities", description: "Appropriate contacts with relevant authorities shall be maintained.", category: "Governance & Policy" },
    { title: "A.5.6 - Contact with special interest groups", description: "Appropriate contacts with special interest groups or other specialist security forums and professional associations shall be maintained.", category: "Governance & Policy" },
    { title: "A.5.7 - Threat intelligence", description: "Information relating to information security threats shall be collected and analysed to produce threat intelligence.", category: "Threat Intel" },
    { title: "A.5.8 - Information security in project management", description: "Information security shall be integrated into project management.", category: "Governance & Policy" },
    { title: "A.5.9 - Inventory of information and other associated assets", description: "An inventory of information and other associated assets, including owners, shall be developed and maintained.", category: "Asset Management" },
    { title: "A.5.10 - Acceptable use of information and other associated assets", description: "Rules for the acceptable use of information and of associated assets shall be identified, documented and implemented.", category: "Governance & Policy" },
    { title: "A.5.11 - Return of assets", description: "Personnel and other interested parties as appropriate shall return all of the organization assets in their possession upon change or termination of their employment.", category: "Asset Management" },
    { title: "A.5.12 - Classification of information", description: "Information shall be classified in terms of legal requirements, value, criticality and sensitivity to unauthorised disclosure or modification.", category: "Governance & Policy" },
    { title: "A.5.13 - Labelling of information", description: "An appropriate set of procedures for information labelling shall be developed and implemented in accordance with the information classification scheme.", category: "Governance & Policy" },
    { title: "A.5.14 - Information transfer", description: "Information transfer rules, procedures and agreements shall be in place for all types of transfer facilities within the organization and between the organization and other parties.", category: "Network Security" },
    { title: "A.5.15 - Access control", description: "Rules to control physical and logical access to information and information processing facilities shall be firmly established.", category: "Access Control (IAM)" },
    { title: "A.5.16 - Identity management", description: "The full life cycle of identities shall be managed.", category: "Access Control (IAM)" },
    { title: "A.5.17 - Authentication information", description: "Allocation and management of authentication information shall be controlled by a management process, including advising personnel on the appropriate handling of authentication information.", category: "Access Control (IAM)" },
    { title: "A.5.18 - Access rights", description: "Access rights to information and information processing facilities shall be provisioned, reviewed, modified and removed in accordance with the organization's topic-specific policy.", category: "Access Control (IAM)" },
    { title: "A.5.19 - Information security in supplier relationships", description: "Processes and procedures shall be defined and implemented to manage the information security risks associated with the use of suppliers' products or services.", category: "Supplier Mgmt" },
    { title: "A.5.20 - Addressing information security within supplier agreements", description: "Relevant information security requirements shall be established and agreed with each supplier that may access, process, store, communicate, or provide IT infrastructure components for, the organization's information.", category: "Supplier Mgmt" },
    { title: "A.5.21 - Managing information security in the ICT supply chain", description: "Processes and procedures shall be defined and implemented to manage the information security risks associated with the ICT products and services supply chain.", category: "Supplier Mgmt" },
    { title: "A.5.22 - Monitoring, review and change management of supplier services", description: "The organization shall regularly monitor, review, evaluate and manage change in supplier information security practices and service delivery.", category: "Supplier Mgmt" },
    { title: "A.5.23 - Information security for use of cloud services", description: "Processes for acquisition, use, management and exit from cloud services shall be established in accordance with the organization's information security requirements.", category: "Supplier Mgmt" },
    { title: "A.5.24 - Information security incident management planning and preparation", description: "The organization shall plan and prepare for managing information security incidents by defining, establishing and communicating information security incident management processes, roles and responsibilities.", category: "Incident & Resilience" },
    { title: "A.5.25 - Assessment and decision on information security events", description: "The organization shall assess information security events and decide if they are to be categorized as information security incidents.", category: "Incident & Resilience" },
    { title: "A.5.26 - Response to information security incidents", description: "Information security incidents shall be responded to in accordance with the documented procedures.", category: "Incident & Resilience" },
    { title: "A.5.27 - Learning from information security incidents", description: "Knowledge gained from information security incidents shall be used to strengthen and improve the information security controls.", category: "Incident & Resilience" },
    { title: "A.5.28 - Collection of evidence", description: "The organization shall establish and implement procedures for the identification, collection, acquisition and preservation of evidence related to information security events.", category: "Incident & Resilience" },
    { title: "A.5.29 - Information security during disruption", description: "The organization shall plan how to maintain information security at an appropriate level during disruption.", category: "Incident & Resilience" },
    { title: "A.5.30 - ICT readiness for business continuity", description: "ICT readiness shall be planned, implemented, maintained and tested based on business continuity objectives and ICT continuity requirements.", category: "Incident & Resilience" },
    { title: "A.5.31 - Legal, statutory, regulatory and contractual requirements", description: "Legal, statutory, regulatory and contractual requirements relevant to information security and the organization's approach to meet these requirements shall be identified, documented and kept up to date.", category: "Legal & Compliance" },
    { title: "A.5.32 - Intellectual property rights", description: "The organization shall implement procedures to protect intellectual property rights.", category: "Legal & Compliance" },
    { title: "A.5.33 - Protection of records", description: "Records shall be protected from loss, destruction, falsification, unauthorized access and unauthorized release.", category: "Legal & Compliance" },
    { title: "A.5.34 - Privacy and protection of PII", description: "The organization shall ensure compliance with the legal, statutory, regulatory and contractual requirements related to privacy and protection of PII.", category: "Legal & Compliance" },
    { title: "A.5.35 - Independent review of information security", description: "The organization's approach to managing information security and its implementation including people, processes and technology shall be reviewed independently at planned intervals.", category: "Performance Evaluation" },
    { title: "A.5.36 - Compliance with policies, rules and standards for information security", description: "Compliance with the information security policy and standards shall be regularly reviewed.", category: "Performance Evaluation" },
    { title: "A.5.37 - Documented operating procedures", description: "Operating procedures for information processing facilities shall be documented and made available to personnel who need them.", category: "Governance & Policy" },

    // 6. People Controls
    { title: "A.6.1 - Screening", description: "Background verification checks on all candidates for employment, contractors and other personnel shall be carried out in accordance with relevant laws.", category: "HR Security" },
    { title: "A.6.2 - Terms and conditions of employment", description: "The contractual agreements with personnel and other interested parties shall state their and the organization's information security responsibilities.", category: "HR Security" },
    { title: "A.6.3 - Information security awareness, education and training", description: "Personnel of the organization and relevant interested parties shall receive appropriate info sec awareness, education and training.", category: "HR Security" },
    { title: "A.6.4 - Disciplinary process", description: "A process shall be defined and communicated to take action against personnel and other interested parties who have committed an information security policy violation.", category: "HR Security" },
    { title: "A.6.5 - Responsibilities after termination or change of employment", description: "Information security responsibilities and duties that remain valid after termination or change of employment shall be defined, enforced and communicated.", category: "HR Security" },
    { title: "A.6.6 - Confidentiality or non-disclosure agreements", description: "Roles and responsibilities for the protection of information assets shall be included in confidentiality or non-disclosure agreements.", category: "HR Security" },
    { title: "A.6.7 - Remote working", description: "Security measures shall be implemented when personnel are working remotely to protect information accessed, processed or stored outside the organization's premises.", category: "HR Security" },
    { title: "A.6.8 - Information security event reporting", description: "The organization shall provide a mechanism for personnel to report observed or suspected information security weaknesses and events in a timely manner.", category: "HR Security" },

    // 7. Physical Controls
    { title: "A.7.1 - Physical security perimeters", description: "Security perimeters shall be defined and used to protect areas that contain either sensitive or critical information and other associated assets.", category: "Physical Security" },
    { title: "A.7.2 - Physical entry", description: "Secure areas shall be protected by appropriate entry controls and access points.", category: "Physical Security" },
    { title: "A.7.3 - Securing offices, rooms and facilities", description: "Physical security for offices, rooms and facilities shall be designed and implemented.", category: "Physical Security" },
    { title: "A.7.4 - Physical security monitoring", description: "Premises shall be continuously monitored for un-authorised physical access.", category: "Physical Security" },
    { title: "A.7.5 - Protecting against physical and environmental threats", description: "Protection against physical and environmental threats, such as natural disasters, intentional or unintentional attacks, shall be designed and implemented.", category: "Physical Security" },
    { title: "A.7.6 - Working in secure areas", description: "Security measures for working in secure areas shall be designed and implemented.", category: "Physical Security" },
    { title: "A.7.7 - Clear desk and clear screen", description: "Clear desk rules for papers and removable storage media and clear screen rules for information processing facilities shall be defined and appropriately enforced.", category: "Physical Security" },
    { title: "A.7.8 - Equipment siting and protection", description: "Equipment shall be sited and protected to reduce the risks from environmental threats and hazards and opportunities for unauthorized access.", category: "Physical Security" },
    { title: "A.7.9 - Security of assets off-premises", description: "Security of assets off-premises shall be ensured.", category: "Physical Security" },
    { title: "A.7.10 - Storage media", description: "Storage media shall be managed through their life cycle of acquisition, use, storage and disposal.", category: "Physical Security" },
    { title: "A.7.11 - Supporting utilities", description: "Information processing facilities shall be protected from power failures and other disruptions caused by failures in supporting utilities.", category: "Physical Security" },
    { title: "A.7.12 - Cabling security", description: "Cabling carrying power, data or supporting information services shall be protected from interception, interference or damage.", category: "Physical Security" },
    { title: "A.7.13 - Equipment maintenance", description: "Equipment shall be correctly maintained to ensure its continued availability and integrity.", category: "Physical Security" },
    { title: "A.7.14 - Secure disposal or re-use of equipment", description: "Items of equipment containing storage media shall be verified to ensure that any sensitive data and licensed software has been removed or securely overwritten prior to disposal or re-use.", category: "Physical Security" },

    // 8. Technological Controls
    { title: "A.8.1 - User endpoint devices", description: "Information stored on, processed by or accessible via user endpoint devices shall be protected.", category: "Asset Management" },
    { title: "A.8.2 - Privileged access rights", description: "The allocation and use of privileged access rights shall be restricted and managed.", category: "Access Control (IAM)" },
    { title: "A.8.3 - Information access restriction", description: "Access to information and other associated assets shall be restricted in accordance with the established topic-specific policy on access control.", category: "Access Control (IAM)" },
    { title: "A.8.4 - Access to source code", description: "Read and write access to source code, development tools and software libraries shall be appropriately managed.", category: "Access Control (IAM)" },
    { title: "A.8.5 - Secure authentication", description: "Secure authentication technologies and procedures shall be implemented based on information classification and associated risks.", category: "Access Control (IAM)" },
    { title: "A.8.6 - Capacity management", description: "The use of resources shall be monitored and adjusted in line with current and expected capacity requirements.", category: "Capacity Management" },
    { title: "A.8.7 - Protection against malware", description: "Protection against malware shall be implemented and supported by appropriate user awareness.", category: "Operations (General)" },
    { title: "A.8.8 - Management of technical vulnerabilities", description: "Information about technical vulnerabilities of information systems being used shall be obtained, the organization's exposure to such vulnerabilities evaluated and appropriate measures taken.", category: "Vulnerability Management" },
    { title: "A.8.9 - Configuration management", description: "Configurations, including security configurations, of hardware, software, services and networks shall be established, documented, implemented, monitored and reviewed.", category: "Configuration Management" },
    { title: "A.8.10 - Information deletion", description: "Information stored in information systems, devices or in any other storage media shall be deleted when no longer required.", category: "Asset Management" },
    { title: "A.8.11 - Data masking", description: "Data masking shall be used in accordance with the organization's topic-specific policy on access control and other related topic-specific policies.", category: "Access Control (IAM)" },
    { title: "A.8.12 - Data leakage prevention", description: "Data leakage prevention measures shall be applied to systems, networks and any other devices that process, store or transmit sensitive information.", category: "Operations (General)" },
    { title: "A.8.13 - Information backup", description: "Backup copies of information, software and system images shall be taken and tested regularly in accordance with an agreed backup policy.", category: "Backup Management" },
    { title: "A.8.14 - Redundancy of information processing facilities", description: "Information processing facilities shall be implemented with redundancy sufficient to meet availability requirements.", category: "Operations (General)" },
    { title: "A.8.15 - Logging", description: "Logs that record activities, exceptions, faults and other relevant events shall be produced, stored, protected and analysed.", category: "Logging & Monitoring" },
    { title: "A.8.16 - Monitoring activities", description: "Networks, systems and applications shall be monitored for anomalous behaviour and appropriate actions taken to evaluate potential information security incidents.", category: "Logging & Monitoring" },
    { title: "A.8.17 - Clock synchronization", description: "The clocks of information processing systems used by the organization shall be synchronized to approved time sources.", category: "Clock Synchronization" },
    { title: "A.8.18 - Use of privileged utility programs", description: "The use of utility programs that can be capable of overriding system and application controls shall be restricted and tightly controlled.", category: "Access Control (IAM)" },
    { title: "A.8.19 - Installation of software on operational systems", description: "Procedures and measures shall be implemented to securely manage software installation on operational systems.", category: "Operations (General)" },
    { title: "A.8.20 - Networks security", description: "Networks and network services shall be secured, managed and controlled to protect information in systems and applications.", category: "Network Security" },
    { title: "A.8.21 - Security of network services", description: "Security mechanisms, service levels and management requirements of all network services shall be identified and included in network services agreements.", category: "Network Security" },
    { title: "A.8.22 - Segregation of networks", description: "Groups of information services, users and information systems shall be segregated in the organization's networks.", category: "Network Security" },
    { title: "A.8.23 - Web filtering", description: "Access to external websites shall be managed to reduce exposure to malicious content.", category: "Network Security" },
    { title: "A.8.24 - Use of cryptography", description: "Rules for the effective use of cryptography, including cryptographic key management, shall be defined and implemented.", category: "Cryptography" },
    { title: "A.8.25 - Secure development life cycle", description: "Rules for the secure development of software and systems shall be established and applied.", category: "SDLC (Development)" },
    { title: "A.8.26 - Application security requirements", description: "Information security requirements shall be identified, specified and approved when developing or acquiring applications.", category: "SDLC (Development)" },
    { title: "A.8.27 - Secure system architecture and engineering principles", description: "Principles for engineering secure systems shall be established, documented, maintained and applied to any information system implementation efforts.", category: "SDLC (Development)" },
    { title: "A.8.28 - Secure coding", description: "Secure coding principles shall be applied to software development.", category: "SDLC (Development)" },
    { title: "A.8.29 - Security testing in development and acceptance", description: "Security testing processes shall be defined and implemented in the development life cycle.", category: "SDLC (Development)" },
    { title: "A.8.30 - Outsourced development", description: "The organization shall direct, monitor and validate the outsourced software development.", category: "SDLC (Development)" },
    { title: "A.8.31 - Separation of development, test and production environments", description: "Development, testing and production environments shall be separated to reduce the risks of unauthorized access or changes to the production environment.", category: "SDLC (Development)" },
    { title: "A.8.32 - Change management", description: "Changes to information processing facilities and information systems shall be subject to change management procedures.", category: "SDLC (Development)" },
    { title: "A.8.33 - Test information", description: "Test information shall be selected, protected and managed.", category: "SDLC (Development)" },
    { title: "A.8.34 - Protection of information systems during audit testing", description: "Audit tests and other assurance activities involving assessment of operational systems shall be planned and agreed between the tester and appropriate management.", category: "Performance Evaluation" }
];
