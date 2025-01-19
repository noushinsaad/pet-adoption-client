import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Table } from "flowbite-react";
import Swal from "sweetalert2";


const MyDonationCampaign = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();

    const { data: donationCampaigns = [], refetch } = useQuery({
        queryKey: ['donationCampaign', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${user.email}`);
            return res.data;
        }
    })

    const handlePauseStatus = donationCampaign => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change pause Status!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // console.log(result)
                const newPauseStatus = donationCampaign?.pause !== undefined ? donationCampaign.pause : false;
                const res = await axiosSecure.patch(`/donations/${donationCampaign._id}`, { pause: newPauseStatus })
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    // console.log(res.data)
                    refetch()
                    Swal.fire({
                        title: "Changed!",
                        text: `Pause Status for donation campaign ${donationCampaign.petName} has been changed.`,
                        icon: "success"
                    });
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred.",
                        icon: "error",
                    });
                }
            }
        })
    }

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">My Donation Campaign</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <Table striped>
                    <Table.Head className="bg-gray-100">
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Donation For </Table.HeadCell>
                        <Table.HeadCell>Maximum Donation Amount</Table.HeadCell>
                        <Table.HeadCell>Donation Progress Bar</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {donationCampaigns.map((donationCampaign, idx) => (
                            <Table.Row
                                key={donationCampaign._id}
                                className="hover:bg-gray-50 transition duration-200"
                            >
                                <Table.Cell className="font-medium text-gray-900">
                                    {idx + 1}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="h-12 w-12">
                                        <img
                                            className="rounded-full w-full h-full object-cover"
                                            src={donationCampaign.petPicture}
                                            alt={donationCampaign.petName}
                                        />
                                    </div>
                                    <p className="text-gray-700"><span className="font-semibold">Name: </span>{donationCampaign.petName}</p>
                                </Table.Cell>
                                <Table.Cell className="text-gray-700">{donationCampaign.maxDonationAmount} $</Table.Cell>
                                <Table.Cell className="text-gray-700">
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-cyan-600 h-4 rounded-full"
                                            style={{
                                                width: `${donationCampaign.currentDonationAmount !== undefined
                                                    ? (donationCampaign.currentDonationAmount / donationCampaign.maximumDonationAmount) * 100
                                                    : 0}%`
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {donationCampaign.currentDonationAmount !== undefined
                                            ? `${((donationCampaign.currentDonationAmount / donationCampaign.maximumDonationAmount) * 100).toFixed(2)}%`
                                            : "0%"}
                                    </span>
                                </Table.Cell>


                                <Table.Cell >
                                    <div className="flex flex-col md:flex-row gap-2 items-center flex-wrap">
                                        <Button
                                            size="xs"
                                            onClick={() => handlePauseStatus(donationCampaign)}
                                            className="bg-green-600 text-white"
                                        >
                                            {donationCampaign.pause ? "Unpause" : "Pause"}
                                        </Button>
                                        <Button
                                            size="xs"
                                            // onClick={() => handleMakeAdmin(user)}
                                            className="bg-blue-600 hover:bg-cyan-700 text-white"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="xs"
                                            // onClick={() => handleMakeAdmin(user)}
                                            className="bg-cyan-600 hover:bg-cyan-700 text-white"
                                        >
                                            View Donators
                                        </Button>
                                    </div>
                                </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default MyDonationCampaign;