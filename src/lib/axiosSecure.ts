import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
});

// Attach token if available
axiosSecure.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("access-token") : null;
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosSecure;
