import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const AIService = {
    /**
     * Generates a policy document based on the control details.
     * @param {string} controlTitle - e.g. "A.5.15 - Access Control"
     * @param {string} description - e.g. "Rules to control physical and logical access..."
     * @returns {Promise<string>} - The generated markdown policy.
     */
    generatePolicy: async (controlTitle, description) => {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error("Missing API Key. Please add REACT_APP_OPENAI_API_KEY to your .env file.");
        }

        try {
            const prompt = `
            You are a Chief Information Security Officer (CISO) writing a formal compliance policy.
            
            Write a detailed, professional policy section for the following control:
            Control: "${controlTitle}"
            Description: "${description}"
            
            Format: Markdown
            Structure:
            1. Purpose
            2. Scope
            3. Policy Statement (Detailed rules)
            4. Enforcement
            
            Keep it concise but compliant with ISO 27001 / SOC 2 standards.
            `;

            const response = await axios.post(
                OPENAI_API_URL,
                {
                    model: "gpt-4o", // or gpt-3.5-turbo if preferred
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("AI Generation Failed:", error);
            if (error.response?.status === 401) {
                throw new Error("Invalid OpenAI API Key.");
            }
            throw new Error("Failed to generate policy. Please try again.");
        }
    },

    /**
     * Analyzes a control to determine specifically what evidence is required.
     * @returns {Promise<Object>} - { requirements: [{ name, type, reasoning }] }
     */
    analyzeControlRequirements: async (controlTitle, description) => {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        if (!apiKey) return null; // Fail silently or handle in UI

        const prompt = `
        As an expert IT Auditor (CISA/CISSP), analyze this compliance control:
        Control: "${controlTitle}"
        Description: "${description}"

        List the specific evidence (documents, logs, screenshots) required to prove this control is effective.
        Do NOT include PII or confidential data types. Focus on system/process evidence.
        
        Return JSON format ONLY:
        {
            "requirements": [
                { "name": "Exact Document Name", "type": "Policy|Log|Screenshot|Report", "reasoning": "Why this is needed" }
            ],
            "explanation": "Brief summary of what the auditor looks for."
        }
        `;

        try {
            const response = await axios.post(
                OPENAI_API_URL,
                {
                    model: "gpt-4o",
                    messages: [{ role: "user", content: prompt }],
                    response_format: { type: "json_object" },
                    temperature: 0.2,
                },
                {
                    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
                }
            );
            return JSON.parse(response.data.choices[0].message.content);
        } catch (error) {
            console.error("AI Analysis Failed:", error);
            throw error;
        }
    },

    /**
     * Compares required evidence vs uploaded files to determine status.
     */
    evaluateGapAnalysis: async (controlTitle, requirements, uploadedFiles) => {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        if (!apiKey) return null;

        const fileList = uploadedFiles.map(f => f.title || f.name).join(", ");
        const reqList = requirements.map(r => r.name).join(", ");

        const prompt = `
        Perform a Gap Analysis for this control: "${controlTitle}".
        
        Required Evidence: ${reqList}
        Uploaded Evidence: ${fileList || "None"}

        Determine if the control requirements are MET, PARTIALLY MET, or NOT MET.
        Explain what is missing.

        Return JSON format ONLY:
        {
            "status": "MET" | "PARTIAL" | "NOT_MET",
            "missing_items": ["List of missing evidence"],
            "recommendation": "What the user should upload next."
        }
        `;

        try {
            const response = await axios.post(
                OPENAI_API_URL,
                {
                    model: "gpt-4o",
                    messages: [{ role: "user", content: prompt }],
                    response_format: { type: "json_object" },
                    temperature: 0.2,
                },
                {
                    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
                }
            );
            return JSON.parse(response.data.choices[0].message.content);
        } catch (error) {
            console.error("AI Gap Analysis Failed:", error);
            throw error;
        }
    }
};
