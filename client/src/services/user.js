import axiosInstance from "./axios";

const userService = {
    async getProfile() {
        try {
            const response = await axiosInstance.get('/profile');
            return response.data;  // Ensure you're returning the data here
        } catch (error) {
            console.error('Error getting profile data:', error.response?.data || error.message);
            throw error;  // Throw error for handling in the calling function
        }
    },

    async updateProfle(data) {
        try {
            const response = await axiosInstance.post('/profile/update', data);
            return response.data;
        } catch (error) {
            console.error('Error updating profile data:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default userService;
