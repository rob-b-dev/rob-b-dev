import axiosInstance from "./axios";

const userService = {
    async getProfile() {
        try {
            const response = await axiosInstance.get('/profile/student/fetch');
            return response.data;  // Ensure you're returning the data here
        } catch (error) {
            console.error(error.response?.data)
            throw error
        }
    },

    async updateProfile(data) {
        try {
            const response = await axiosInstance.post('/profile/student/update', data);
            return response.data; // Data returned so it can be used in profile display

        } catch (error) {
            console.error(error.response?.data);
            throw error
        }

    },

    async checkTutorProfile(data) {
        try {
            const response = await axiosInstance.get('profile/tutor/check', data);
            return response.data
        } catch (error) {
            console.error(error.response?.data)
            throw error
        }
    },

    async updateTutorProfile(data) {
        try {
            const response = await axiosInstance.post('profile/tutor/update', data);
            return response.data
        } catch (error) {
            console.error(error.response?.data)
            throw error
        }
    },

    async getTutorProfile(data) {
        try {
            const response = await axiosInstance.get('profile/tutor/fetch', data);
            return response.data
        } catch (error) {
            console.error(error.response?.data)
            throw error
        }
    }
};

export default userService;
