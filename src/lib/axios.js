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
// EXCEPT for /admin/me (background refresh) and /admin/login itself,
// to prevent Safari/iPhone ITP cookie blocking from causing a logout loop.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config?.url || '';

      // Never force logout for these endpoints — they may fail silently
      const silentEndpoints = ['/admin/me', '/admin/login'];
      const isSilent = silentEndpoints.some((ep) => requestUrl.includes(ep));

      if (!isSilent) {
        // Clear localStorage and redirect to login only for real protected endpoints
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_role');
        localStorage.removeItem('admin_name');
        localStorage.removeItem('admin_id');

        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
