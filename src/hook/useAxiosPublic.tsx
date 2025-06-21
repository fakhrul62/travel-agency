import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://travel-agency-server-3n1wr27f2-fakhrul-alams-projects.vercel.app/",
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;