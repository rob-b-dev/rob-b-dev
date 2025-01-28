import axiosInstance from "./axios";

const userService = {
    async getProfile() {
        try {
            const response = await axiosInstance.get('/profile');
            return response.data;
        } catch (error) {
            console.error('Error getting profile data:', error.response?.data || error.message);
            throw error;
        }
    },
};

export default userService;
