import axiosInstance from "./axios";
import { showToast } from "../helpers/showToast";

const userService = {
    async getProfile() {
        try {
            const response = await axiosInstance.get('/profile');
            return response.data;  // Ensure you're returning the data here
        } catch (error) {
            showToast(error.response?.data, 'error')
        }
    },

    async updateProfile(data) {
        try {
            const response = await axiosInstance.post('/profile/update', data);
            showToast(response, 'success')
        } catch (error) {
            showToast(error.response?.data, 'error')
        }
    }
};

export default userService;
