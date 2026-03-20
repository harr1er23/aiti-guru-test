import axios from "axios";
export const api = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const raw = localStorage.getItem('auth') ?? sessionStorage.getItem('auth');
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            const token = parsed?.state?.accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch {
            
        }
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            localStorage.removeItem('auth');
            sessionStorage.removeItem('auth');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);