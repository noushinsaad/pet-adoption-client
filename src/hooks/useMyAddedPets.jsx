import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useMyAddedPets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: myAddedPets = [], isLoading } = useQuery({
        queryKey: ['myAddedPets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets/user/${user.email}`);
            return res.data;
        }
    });

    return {
        myAddedPets,
        refetch,
        isLoading
    }
};

export default useMyAddedPets;