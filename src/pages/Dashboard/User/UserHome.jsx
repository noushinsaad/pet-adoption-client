import { Card, Button } from "flowbite-react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useMyPetsWithRequests from "../../../hooks/usePetsWithRequest";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import useMyDonations from "../../../hooks/useMyDonations";


const UserHome = () => {
    const { user } = useAuth();
    const { totalRequestCount } = useMyPetsWithRequests();
    const { totalAmount } = useMyDonations()


    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading } = useQuery({
        queryKey: ["userActionCounts", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-stats/${user.email}`)
            return res.data;
        }
    })

    if (isLoading) {
        return (<div className="p-6">
            <Skeleton height={40} width={300} count={3} />
        </div>)
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-6">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400">Welcome, {user.displayName}</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Explore your dashboard to manage your pets, adoption requests, and donations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="max-w-sm bg-white dark:bg-gray-800">
                    <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        Add a Pet
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Share details about a pet you&apos;d like to put up for adoption.
                    </p>
                    <Link to='/dashboard/addPet'>
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                            Add Pet
                        </Button></Link>
                </Card>

                <Card className="max-w-sm bg-white dark:bg-gray-800">
                    <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        My Pets
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        View and manage the pets you’ve listed for adoption.
                    </p>
                    <Link to='/dashboard/myAddedPets'>
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                            View Pets
                        </Button>
                    </Link>
                </Card>

                <Card className="max-w-sm bg-white dark:bg-gray-800">
                    <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        Adoption Requests
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Review and respond to adoption requests for your pets.
                    </p>
                    <Link to='/dashboard/adoptionRequest'>
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                            View Requests
                        </Button>
                    </Link>
                </Card>

                <Card className="max-w-sm bg-white dark:bg-gray-800">
                    <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        Create Donation Campaign
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Start a campaign to raise funds for pets in need.
                    </p>
                    <Link to='/dashboard/createDonationCampaign'>
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                            Create Campaign
                        </Button>
                    </Link>
                </Card>

                <Card className="max-w-sm bg-white dark:bg-gray-800">
                    <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        My Donations
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Track your donations and their impact.
                    </p>
                    <Link to='/dashboard/myDonations'>
                        <Button className="bg-blue-600 w-full hover:bg-blue-700">
                            View Donations
                        </Button>
                    </Link>
                </Card>
            </div>

            <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Your Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-gray-600 dark:text-gray-300">Listed</p>
                        <h3 className="text-4xl font-bold text-blue-700 dark:text-blue-400">{stats?.petListed}</h3>
                        <p className="text-gray-600 dark:text-gray-300">Pets</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-gray-600 dark:text-gray-300">Made</p>
                        <h3 className="text-4xl font-bold text-blue-700 dark:text-blue-400">{stats?.adoptionCount}</h3>
                        <p className="text-gray-600 dark:text-gray-300">Adoption Requests</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-gray-600 dark:text-gray-300">Receive</p>
                        <h3 className="text-4xl font-bold text-blue-700 dark:text-blue-400">{totalRequestCount}</h3>
                        <p className="text-gray-600 dark:text-gray-300">Adoption Requests</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-gray-600 dark:text-gray-300">Total Donations</p>
                        <h3 className="text-4xl font-bold text-blue-700 dark:text-blue-400">{totalAmount}</h3>
                        <p className="text-gray-600 dark:text-gray-300">USD</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
