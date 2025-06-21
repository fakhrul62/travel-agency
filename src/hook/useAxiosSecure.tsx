import axios from "axios"; // Import axios for making HTTP requests
import { logOut } from "src/provider/AuthProvider";
import { useNavigate } from "react-router";

// Create an axios instance with a base URL
const axiosSecure = axios.create({
  baseURL: "https://travel-agency-server-delta.vercel.app/", // Base URL for the API
});

const useAxiosSecure = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  // Add a request interceptor to the axios instance
  axiosSecure.interceptors.request.use(
    (config) => {
      // Get the access token from local storage
      const token = localStorage.getItem("access-token");
      // Add the token to the request headers
      config.headers.authorization = `Bearer ${token}`;
      return config; // Return the modified config
    },
    function (error) {
      // Handle request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to the axios instance
  axiosSecure.interceptors.response.use(
    (response) => {
      // Return the response if successful
      return response;
    },
    async (error) => {
      // Get the status code from the error response
      const status = error.response.status;
      // If the status is 401 (Unauthorized) or 403 (Forbidden)
      if (status === 401 || status === 403) {
        await logOut(); // Log the user out
        navigate("/sign-up"); // Navigate to the login page
      }
      // Return the error to be handled by the calling code
      return Promise.reject(error);
    }
  );

  // Return the axios instance
  return axiosSecure;
};

export default useAxiosSecure;
