import axios from 'axios';
import { toast } from 'react-toastify';

// Predefine content for each axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '', // Use environment variable for the base URL
    withCredentials: true, // Ensures cookies are sent with requests - used for both public and priv JWT's
    headers: {
        'Content-Type': 'application/json', // Tells server that body requests contain JSON data
    },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, just return the response
        return response;
    },
    (error) => {
        // Check if the error has a response object
        if (error.response) {
            const { status, data } = error.response;

            // Check for the specific status code and error message
            if (status === 403 && data.code === 'INVALID_REQUEST') {
                // Show the toast first
                toast.error('User tampered with token. Please log in again.');

                // Delay the page reload for the toast to be visible
                setTimeout(() => {
                    window.location.reload();
                }, 3000); // Wait 3 seconds before reloading
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;