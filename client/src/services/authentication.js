import axiosInstance from "./axios";

const authService = {
    async verifyToken() {
        try {
            const response = await axiosInstance.get('/auth/verify');
            return response.data;
        } catch (error) {
            console.error('Token verification failed:', error.response?.data || error.message);
            throw error;
        }
    },

    async login(data) {
        try {
            const response = await axiosInstance.post('/auth/login', data);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            throw error;
        }
    },

    async register(data) {
        try {
            const response = await axiosInstance.post('/auth/register', data);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
            throw error;
        }
    },

    async logout() {
        try {
            const response = await axiosInstance.post('/auth/logout');
            return response.data;
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
            throw error;
        }
    },
};

export default authService;
