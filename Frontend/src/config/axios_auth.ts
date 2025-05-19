import axios from 'axios';

const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    }
});
console.log(axiosAuth.interceptors.request)
axiosAuth.interceptors.request.use((config) => {
    const currentUser = localStorage.getItem('currentUser');
    const token = currentUser ? JSON.parse(currentUser).token : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default axiosAuth;