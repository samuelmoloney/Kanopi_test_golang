import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getHealthCheck = async (echo: string): Promise<{ message: string }> => {
    try {
        const response = await apiClient.get(`/healthcheck/${echo}`);
        // Extract the message from the response data
        const { message } = response.data;
        // Return the message
        return { message };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        console.error('Error fetching health check:', error.response?.data || error.message);
        throw error;
    }
};
export default apiClient;