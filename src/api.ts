import axios from 'axios';

// Configure via Vite env (recommended for Render/Vercel/Netlify)
// Example: VITE_API_BASE_URL=https://your-backend.onrender.com/api
const API_BASE_URL =
    (import.meta as any).env?.VITE_API_BASE_URL ||
    (import.meta as any).env?.VITE_API_URL || // backward compat if you used a different name
    'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const chatApi = axios.create({
    baseURL: API_BASE_URL.replace(/\/api\/?$/, ''),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
