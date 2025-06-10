import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

/**
 * Custom hook to check if the current user has admin privileges
 * @returns [isAdmin, isAdminLoading, error] - A tuple containing admin status, loading state, and error
 */
const useAdmin = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const {data: isAdmin, isPending: isAdminLoading, error} = useQuery({
        queryKey: [user?.email, "admin"],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                return !!res.data?.admin; // Convert to boolean
            } catch (err) {
                console.error("Error checking admin status:", err);
                return false; // Return false on error
            }
        },
        // Cache admin status for 5 minutes
        staleTime: 5 * 60 * 1000,
    });
    
    return [!!isAdmin, isAdminLoading, error];
};

export default useAdmin;