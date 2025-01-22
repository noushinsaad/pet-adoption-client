import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdoptionRequestData = () => {
    const axiosSecure = useAxiosSecure();

    const { data: adoptionRequests = [], isLoading: requestsLoading, refetch } = useQuery({
        queryKey: ['adoptionRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adoptionRequest');
            return res.data;
        },
    });
    return {
        adoptionRequests,
        requestsLoading,
        refetch,
    };
};

export default useAdoptionRequestData;