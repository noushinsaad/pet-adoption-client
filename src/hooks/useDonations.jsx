import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDonations = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()


    const { refetch, data: donationCampaigns = [], isLoading } = useQuery({
        queryKey: ['donation', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donationsCampaign/user/${user.email}`);
            return res.data
        }
    })
    return [donationCampaigns, refetch, isLoading];
};

export default useDonations;