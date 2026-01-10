import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance with your backend's base URL
const api = axios.create({
  baseURL:API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// --- INTERCEPTOR: Attach Token to Every Request ---
api.interceptors.request.use(
  (config) => {
    // 1. Check if user data exists in LocalStorage
    const userString = localStorage.getItem("user");
    
    if (userString) {
      const user = JSON.parse(userString);
      
      // 2. If token exists, add it to the Authorization header
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;