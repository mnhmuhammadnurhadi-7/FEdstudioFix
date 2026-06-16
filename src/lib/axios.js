import axios from 'axios';

// Fallback to VITE_API_URL or REACT_APP_API_URL or localhost API
const baseURL = import.meta.env?.VITE_API_URL || process.env?.REACT_APP_API_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // MUST be true for Laravel Session Cookies to work
});

// Response Interceptor: Redirect to login on 401 unauthorized status
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear localStorage
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_role');
      localStorage.removeItem('admin_name');
      localStorage.removeItem('admin_id');
      
      // Force redirect to login page
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
