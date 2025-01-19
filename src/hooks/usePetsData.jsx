import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePetsData = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError,refetch } = useQuery({
        queryKey: ["petsData"],
        queryFn: async () => {
            const res = await axiosSecure.get('/pets')
            return res.data
        }
    })
    return {
        allPets: data?.allPets || [],
        unAdoptedPets: data?.unAdoptedPets || [],
        isLoading,
        isError,
        refetch
    };
};

export default usePetsData;