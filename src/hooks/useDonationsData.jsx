import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useDonationsData = () => {
    const axiosSecure = useAxiosSecure();

    const { data: donationCampaigns = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["donationCampaigns"],
        queryFn: async () => {
            const res = await axiosSecure.get('/donationsCampaign')
            return res.data
        }
    })
    return {
        donationCampaigns,
        isLoading,
        isError,
        refetch
    };
};

export default useDonationsData;