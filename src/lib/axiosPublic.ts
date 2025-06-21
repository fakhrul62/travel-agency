import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://travel-agency-server-delta.vercel.app/",
});

export default axiosPublic;
