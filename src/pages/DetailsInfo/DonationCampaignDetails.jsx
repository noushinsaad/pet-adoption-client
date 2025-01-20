import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import RecommendedDonationCampaign from "../../components/RecommendedDonationCampaign";
import useAuth from "../../hooks/useAuth";
import DonationModal from "../../components/DonationModal";
import Swal from "sweetalert2";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const DonationCampaignDetails = () => {
    const donationCampaign = useLoaderData();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();




    const toggleModal = () => {
        if (user) {
            setIsModalOpen(!isModalOpen)
        }
        else {
            Swal.fire({
                title: "Login Required",
                text: "You need to login or register to donate for any campaign.",
                icon: "warning",
                confirmButtonText: "Go to Login",
                showCancelButton: true,
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        }
    }

    const handleDonation = (e) => {
        e.preventDefault(); // Prevent form submission

        const value = parseInt(donationAmount);
        if (value <= donationCampaign.maxDonationAmount) {
            setError('');
            // Proceed with form submission or further logic
            console.log('Donation amount is valid:', value);
        } else {
            setError(`Donation amount must be less than or equal to ${donationCampaign.maxDonationAmount}`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Campaign Details */}
            <Card>
                <img
                    src={donationCampaign.petPicture}
                    alt={donationCampaign.petName}
                    className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                    <h2 className="text-3xl font-bold mb-4">{donationCampaign.petName}</h2>
                    <p className="text-gray-600 mb-2">{donationCampaign.shortDescription}</p>
                    <p className="text-gray-800 mb-4">{donationCampaign.longDescription}</p>
                    <div className="my-4 space-y-4">
                        <p className="text-gray-600">
                            <strong>Maximum Donation:</strong> ${donationCampaign.maxDonationAmount}
                        </p>
                        <p className="text-gray-600">
                            <strong>Last Date to Donate:</strong> {new Date(donationCampaign.lastDateOfDonation).toDateString()}
                        </p>
                        <Button
                            onClick={toggleModal}
                            gradientDuoTone="greenToBlue"
                        >
                            Donate Now
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Recommended Campaigns */}
            <RecommendedDonationCampaign donationCampaign={donationCampaign}></RecommendedDonationCampaign>

            {/* Donation Modal */}
            <DonationModal
                donationCampaign={donationCampaign}
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                donationAmount={donationAmount}
                setDonationAmount={setDonationAmount}
                error={error}
                handleDonation={handleDonation}
            ></DonationModal>
        </div>
    );
};

export default DonationCampaignDetails;
