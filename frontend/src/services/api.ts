import axios from 'axios';
import { Color } from '../types/colors';

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

export const getRandomColors = async (count: number): Promise< Color[]> => {
    try {
        const response = await apiClient.get(`/swatches/get-multiple-random-colors/${count}`);
        // Extract the colors from the response data
        const cstr = response.data.colors;
        const colors: Color[] = typeof cstr === "string" ? JSON.parse(cstr) : cstr;
        console.log(colors);
        // Return the colors
        return colors;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        console.error('Error fetching colors:', error.response?.data || error.message);
        throw error;
    }
}
export default apiClient;