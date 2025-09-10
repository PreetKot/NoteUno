import axios from "axios";

// Dynamic base URL for different environments
// Use VITE_API_URL if set, otherwise fallback based on mode
const BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === "development" 
    ? "http://localhost:5001/api" 
    : "/api");

// Debug logging
console.log("🔍 Axios Configuration:");
console.log("- MODE:", import.meta.env.MODE);
console.log("- VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("- BASE_URL:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
});

// Add token to requests if available
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
