import { useState } from "react";
import { Button, Table } from "flowbite-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import useDonations from "../../../hooks/useDonations";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import ShowDonatorsModal from "../../../components/ShowDonators";

const MyDonationCampaign = () => {
    const axiosSecure = useAxiosSecure();
    const [donationCampaigns, refetch, isLoading] = useDonations();
    const [showModal, setShowModal] = useState(false);
    const [donators, setDonators] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isModalLoading, setIsModalLoading] = useState(false);

    const handlePauseStatus = (donationCampaign) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change pause Status!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const newPauseStatus = donationCampaign?.pause !== undefined ? donationCampaign.pause : false;
                const res = await axiosSecure.patch(`/donationsCampaign/${donationCampaign._id}`, { pause: newPauseStatus });
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Changed!",
                        text: `Pause Status for donation campaign ${donationCampaign.petName} has been changed.`,
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred.",
                        icon: "error",
                    });
                }
            }
        });
    };

    const handleViewDonators = async (campaign) => {
        setShowModal(true);
        setSelectedCampaign(campaign);
        setIsModalLoading(true); 

        try {
            const res = await axiosSecure.get(`/donations/${campaign._id}`);
            setDonators(res.data);
        } catch (error) {
            console.error("Failed to fetch donators", error);
        } finally {
            setIsModalLoading(false); 
        }
    };

    if (isLoading) {
        return (
            <div className="p-6">
                <Skeleton height={40} width={300} count={3} />
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">My Donation Campaign</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <Table striped>
                    <Table.Head className="bg-gray-100">
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Donation For</Table.HeadCell>
                        <Table.HeadCell>Maximum Donation Amount</Table.HeadCell>
                        <Table.HeadCell>Donation Progress Bar</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {donationCampaigns.map((campaign, idx) => (
                            <Table.Row key={campaign._id} className="hover:bg-gray-50 transition duration-200">
                                <Table.Cell className="font-medium text-gray-900">{idx + 1}</Table.Cell>
                                <Table.Cell>
                                    <div className="h-12 w-12">
                                        <img
                                            className="rounded-full w-full h-full object-cover"
                                            src={campaign.petPicture}
                                            alt={campaign.petName}
                                        />
                                    </div>
                                    <p className="text-gray-700">
                                        <span className="font-semibold">Name: </span>
                                        {campaign.petName}
                                    </p>
                                </Table.Cell>
                                <Table.Cell className="text-gray-700">{campaign.maxDonationAmount} $</Table.Cell>
                                <Table.Cell className="text-gray-700">
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-cyan-600 h-4 rounded-full"
                                            style={{
                                                width: `${campaign.currentDonations ? (campaign.currentDonations / campaign.maxDonationAmount) * 100 : 0}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {campaign.currentDonations
                                            ? `${((campaign.currentDonations / campaign.maxDonationAmount) * 100).toFixed(2)}%`
                                            : "0%"}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex flex-col md:flex-row gap-2 items-center flex-wrap">
                                        <Button
                                            size="xs"
                                            onClick={() => handlePauseStatus(campaign)}
                                            className="bg-green-600 text-white"
                                        >
                                            {campaign.pause ? "Unpause" : "Pause"}
                                        </Button>
                                        <Link to={`/dashboard/updateDonationCampaign/${campaign._id}`}>
                                            <Button size="xs" className="bg-blue-600 hover:bg-cyan-700 text-white">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            size="xs"
                                            onClick={() => handleViewDonators(campaign)}
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

            {/* Donators Modal */}
            <ShowDonatorsModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                donators={donators}
                selectedCampaign={selectedCampaign}
                isModalLoading={isModalLoading}
            />
        </div>
    );
};

export default MyDonationCampaign;
