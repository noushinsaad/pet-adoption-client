import { Link } from "react-router-dom";
import DonationCampaignCard from "../../../components/DonationCampaignCard";
import useDonationsData from "../../../hooks/useDonationsData";

const DonateNow = () => {
    const { donationCampaigns } = useDonationsData();

    const today = new Date();
    const activeCampaigns = donationCampaigns
        .filter((campaign) => {
            const lastDonationDate = new Date(campaign.lastDateOfDonation);
            return lastDonationDate >= today && !campaign.pause;
        })
        .sort((a, b) => new Date(b.createdCampaignAt) - new Date(a.createdCampaignAt))
        .slice(0, 3);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-none shadow-lg">
            <h2 className="text-3xl font-bold text-center text-green-800 dark:text-green-400 mb-6">
                Donate Now
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
                Your donation can make a difference in the lives of these pets. Check out our current campaigns!
            </p>

            {/* Campaign Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {activeCampaigns.map((campaign) => (
                    <DonationCampaignCard key={campaign._id} campaign={campaign} />
                ))}
            </div>

            {/* View More Button */}
            <div className="text-center">
                <Link to="/donationCampaigns">
                    <button className="bg-green-700 dark:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-green-900 dark:hover:bg-green-700 transition duration-300 mt-8">
                        View All Campaigns
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default DonateNow;
