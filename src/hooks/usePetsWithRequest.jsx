import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useMyAddedPets from "./usemyAddedPets";

const useMyPetsWithRequests = () => {
    const axiosSecure = useAxiosSecure();

    const { myAddedPets, isLoading: petsLoading } = useMyAddedPets();

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

    const totalRequestCount = petsWithRequests.reduce((total, pet) => total + pet.requestCount, 0);

    const isLoading = petsLoading || requestsLoading;

    return {
        petsWithRequests,
        isLoading,
        refetch,
        totalRequestCount
    };
};

export default useMyPetsWithRequests;
