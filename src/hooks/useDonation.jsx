import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDonation = (campaignId) => {
    const axiosSecure = useAxiosSecure();
    return useQuery(['donationCampaign', campaignId], async () => {
        const res = await axiosSecure.get(`/donationsCampaign/${campaignId}`);
        return res.data;
    });
};

export default useDonation;