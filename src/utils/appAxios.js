import axios from 'axios';
import store from '@/store';

// API URL'i environment variable'dan al, yoksa default değeri kullan
const API_URL = 'http://localhost:3000/api/';

// Axios instance oluşturma
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000, // 15 saniye timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Token varsa header'a ekle
        const token = store.getters.getToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            // 401 Unauthorized hatası durumunda
            if (error.response.status === 401) {
                // Store'daki logout action'ını çağır
                await store.dispatch('logout');
            }
        }
        return Promise.reject(error);
    }
);

// HTTP metodları
const httpService = {
    // GET isteği
    get: async (url, params = {}) => {
        try {
            const response = await axiosInstance.get(url, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // POST isteği
    post: async (url, data = {}) => {
        try {
            const response = await axiosInstance.post(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // PUT isteği
    put: async (url, data = {}) => {
        try {
            const response = await axiosInstance.put(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // DELETE isteği
    delete: async (url) => {
        try {
            const response = await axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // PATCH isteği
    patch: async (url, data = {}) => {
        try {
            const response = await axiosInstance.patch(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default httpService;
