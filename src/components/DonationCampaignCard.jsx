/* eslint-disable react/prop-types */
import { Button, Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DonationCampaignCard = ({ campaign }) => {
    return (
        <Card className="shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            {/* Pet Image */}
            <img
                src={campaign.petPicture}
                alt={campaign.petName}
                className="w-full h-48 object-cover rounded-t-lg"
            />

            {/* Campaign Details */}
            <div className="p-4 text-gray-900 dark:text-gray-200">
                <h3 className="text-xl font-bold mb-2">
                    <strong>Donate For:</strong> {campaign.petName}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Maximum Donation:</strong> ${campaign.maxDonationAmount}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Donated Amount:</strong> ${campaign.currentDonations || 0}
                </p>
                <Link to={`/donationCampaignDetails/${campaign._id}`}>
                    <Button gradientDuoTone="greenToBlue" className="dark:text-white dark:hover:bg-green-700">
                        View Details
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default DonationCampaignCard;
