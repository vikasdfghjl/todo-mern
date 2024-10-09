import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.REACT_APP_BASE_BE_URL2,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                // Handle authentication errors
                console.error('Authentication error, redirecting to login...');
                // Redirect to login page
                window.location.href = '/login';
            } else {
                console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
            }
        } else if (error.request) {
            console.error('No response received from the server');
        } else {
            console.error('Error', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;