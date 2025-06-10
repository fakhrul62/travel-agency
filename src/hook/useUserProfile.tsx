import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    photoURL: string;
    role: string;
}

const useUserProfile = () => {
    const {user, loading} = useAuth(); // Gets Firebase user
    const axiosSecure = useAxiosSecure();
    
    const {data: userProfile, isPending: isProfileLoading, error} = useQuery<UserProfile>({
        queryKey: [user?.email, "profile"],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            // Use Firebase user's email to get full profile from MongoDB
            const res = await axiosSecure.get(`/users/profile/${user?.email}`);
            return res.data;
        }
    });
    
    return {userProfile, isProfileLoading, error};
};

export default useUserProfile;