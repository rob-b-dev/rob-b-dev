import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '', // Use environment variable for the base URL
    withCredentials: true, // Ensures cookies are sent with requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
