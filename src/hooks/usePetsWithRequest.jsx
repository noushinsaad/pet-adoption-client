import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMyPetsWithRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    const { data: myAddedPets = [], isLoading: petsLoading } = useQuery({
        queryKey: ['myAddedPets', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/pets/user/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });


    const { data: adoptionRequests = [], isLoading: requestsLoading, refetch } = useQuery({
        queryKey: ['adoptionRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adoptionRequest');
            return res.data;
        },
    });


    const petsWithRequests = myAddedPets.map(pet => {
        const matchedRequests = adoptionRequests.filter(request => request.petId === pet._id);
        return {
            ...pet,
            adoptionRequests: matchedRequests,
            requestCount: matchedRequests.length,
        };
    });


    const isLoading = petsLoading || requestsLoading;

    return {
        petsWithRequests,
        isLoading,
        refetch
    };
};

export default useMyPetsWithRequests;
