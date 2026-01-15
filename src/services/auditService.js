
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

export const auditService = {
    initiateAudit: async (data) => {
        const response = await axios.post(`${API_URL}/audits/initiate`, data, { headers: getAuthHeaders() });
        return response.data;
    },

    getEvidence: async () => {
        const response = await axios.get(`${API_URL}/audits/evidence`, { headers: getAuthHeaders() });
        return response.data;
    },

    reviewEvidence: async (evidenceId, status, comment) => {
        const response = await axios.post(
            `${API_URL}/audits/evidence/${evidenceId}/review`,
            { status, comment },
            { headers: getAuthHeaders() }
        );
        return response.data;
    },

    getStats: async () => {
        const response = await axios.get(`${API_URL}/audits/stats`, { headers: getAuthHeaders() });
        return response.data;
    }
};
