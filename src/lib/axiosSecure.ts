import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://travel-agency-server-delta.vercel.app/",
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
