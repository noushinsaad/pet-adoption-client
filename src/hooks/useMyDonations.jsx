import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useMyDonations = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: myDonations = [], isLoading } = useQuery({
        queryKey: ['myDonations', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/user/${user.email}`);
            return res.data;
        }
    });

    const totalAmount = myDonations.reduce((total, donation) => {
        const numericAmount = parseFloat(donation.amount) || 0;
        return total + numericAmount;
    }, 0);

    return {
        myDonations,
        refetch,
        isLoading,
        totalAmount
    }
};

export default useMyDonations;