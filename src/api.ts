import axios from 'axios';

const api = axios.create({
    baseURL: 'https://noorgpt-irxy.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const chatApi = axios.create({
    baseURL: 'https://noorgpt-irxy.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
