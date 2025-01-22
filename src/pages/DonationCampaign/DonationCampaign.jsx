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

    const activeCampaigns = sortedCampaigns.filter((campaign) => !campaign.pause);
    const inactiveCampaigns = sortedCampaigns.filter((campaign) => campaign.pause);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Donation Campaigns</h2>

            {/* Currently Active Section */}
            <div>
                <h3 className="text-2xl font-semibold text-green-700 mb-4">Currently Active</h3>
                {activeCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeCampaigns.map((campaign) => (
                            <DonationCampaignCard key={campaign._id} campaign={campaign} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No active campaigns at the moment.</p>
                )}
            </div>

            {/* Not Active Section */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-red-700 mb-4">Not Active</h3>
                {inactiveCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {inactiveCampaigns.map((campaign) => (
                            <DonationCampaignCard key={campaign._id} campaign={campaign} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No inactive campaigns.</p>
                )}
            </div>
        </div>
    );
};

export default DonationCampaign;
