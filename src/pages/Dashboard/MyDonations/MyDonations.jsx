import { Button, Table } from "flowbite-react";
import useMyDonations from "../../../hooks/useMyDonations";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MyDonations = () => {
    const axiosSecure = useAxiosSecure();
    const { myDonations, refetch, isLoading, totalAmount } = useMyDonations();

    const handleRefund = donation => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Refund!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/donations/${donation._id}`);
                const response = await axiosSecure.put(`/donationsCampaign/${donation.donationCampaignId}`, { currentDonations: -donation.amount });
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Refunded!",
                        text: `${donation.amount} has been refunded to your account`,
                        icon: "success"
                    });
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="p-6">
                <Skeleton height={40} width={300} count={3} />
            </div>
        );
    }

    return (
        <div className="p-6 dark:bg-gray-800 dark:text-white">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">My Donations</h2>
            <div className="overflow-x-auto bg-white dark:bg-gray-700 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600">
                <Table striped>
                    <Table.Head className="bg-gray-100 dark:bg-gray-800">
                        <Table.HeadCell className="text-gray-800 dark:text-white">#</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-white">Donation For</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-white">Donated Amount</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-white">Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y dark:divide-gray-600">
                        {myDonations.map((donation, idx) => (
                            <Table.Row key={donation._id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-200">
                                <Table.Cell className="font-medium text-gray-900 dark:text-gray-300">
                                    {idx + 1}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="h-12 w-12">
                                        <img
                                            className="rounded-full w-full h-full object-cover"
                                            src={donation.petPicture}
                                            alt={donation.petName}
                                        />
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">Name: </span>{donation.donationFor}
                                    </p>
                                </Table.Cell>
                                <Table.Cell className="text-gray-700 dark:text-gray-300">
                                    {donation.amount} $
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex flex-col md:flex-row gap-2 items-center flex-wrap">
                                        <Button
                                            size="xs"
                                            onClick={() => handleRefund(donation)}
                                            className="bg-green-600 text-white"
                                        >
                                            Get Refund
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        <Table.Row>
                            <Table.Cell colSpan={2} className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
                                Total
                            </Table.Cell>
                            <Table.Cell colSpan={2} className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
                                {totalAmount}$
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default MyDonations;
