import useDonationsData from "../../hooks/useDonationsData";
import DonationCampaignCard from "../../components/DonationCampaignCard";

const DonationCampaign = () => {
    const { donationCampaigns } = useDonationsData();

    const today = new Date();
    const filteredCampaigns = donationCampaigns.filter((campaign) => {
        const lastDonationDate = new Date(campaign.lastDateOfDonation);
        return lastDonationDate >= today;
    });

    const sortedCampaigns = filteredCampaigns.sort(
        (a, b) => new Date(b.createdCampaignAt) - new Date(a.createdCampaignAt)
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Donation Campaigns</h2>

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCampaigns.map((campaign) => (
                    <DonationCampaignCard key={campaign._id} campaign={campaign}></DonationCampaignCard>
                ))}
            </div>
        </div>
    );
};

export default DonationCampaign;
