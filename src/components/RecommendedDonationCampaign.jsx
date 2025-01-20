/* eslint-disable react/prop-types */
import useDonationsData from "../hooks/useDonationsData";
import DonationCampaignCard from "./DonationCampaignCard";

const RecommendedDonationCampaign = ({ donationCampaign }) => {
    const { donationCampaigns } = useDonationsData();

    const today = new Date();
    const filteredCampaigns = donationCampaigns.filter((campaign) => {
        const lastDonationDate = new Date(campaign.lastDateOfDonation);
        return lastDonationDate >= today;
    });

    const recommendedCampaigns = filteredCampaigns.filter(
        (campaign) => campaign._id !== donationCampaign._id
    ).slice(0, 3);;

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Recommended Donation Campaigns</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCampaigns.map((campaign) => (
                    <DonationCampaignCard key={campaign._id} campaign={campaign}></DonationCampaignCard>
                ))}
            </div>
        </div>
    );
};

export default RecommendedDonationCampaign;