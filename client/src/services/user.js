import axiosInstance from "./axios";

const userService = {
    async getProfile() {
        try {
            const response = await axiosInstance.get('/profile');
            return response.data;  // Ensure you're returning the data here
        } catch (error) {
            console.error(error.response?.data)
            throw error
        }
    },

    async updateProfile(data) {
        try {
            const response = await axiosInstance.post('/profile/update', data);
            console.log('returned data', response)
            return response.data; // Data returned so it can be used in profile display

        } catch (error) {
            console.error(error.response?.data);
            throw error
        }

    }
};

export default userService;
