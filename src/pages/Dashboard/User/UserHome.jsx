import { Card, Button } from "flowbite-react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const UserHome = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: counts = { pets: 0 } } = useQuery({
        queryKey: ["userActionCounts", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-stats/${user.email}`)
            return res.data;
        }
    })


    return (
        <div className="bg-gray-50 min-h-screen py-10 px-6">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-blue-700">Welcome, {user.displayName}</h1>
                <p className="text-gray-600 mt-2">
                    Explore your dashboard to manage your pets, adoption requests, and donations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="max-w-sm">
                    <h5 className="text-xl font-semibold text-gray-800 mb-2">
                        Add a Pet
                    </h5>
                    <p className="text-gray-600 mb-4">
                        Share details about a pet you&apos;d like to put up for adoption.
                    </p>
                    <Link to='/dashboard/addPet'>
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                            Add Pet
                        </Button></Link>
                </Card>

                <Card className="max-w-sm">
                    <h5 className="text-xl font-semibold text-gray-800 mb-2">
                        My Pets
                    </h5>
                    <p className="text-gray-600 mb-4">
                        View and manage the pets you’ve listed for adoption.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        View Pets
                    </Button>
                </Card>

                <Card className="max-w-sm">
                    <h5 className="text-xl font-semibold text-gray-800 mb-2">
                        Adoption Requests
                    </h5>
                    <p className="text-gray-600 mb-4">
                        Review and respond to adoption requests for your pets.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        View Requests
                    </Button>
                </Card>

                <Card className="max-w-sm">
                    <h5 className="text-xl font-semibold text-gray-800 mb-2">
                        Create Donation Campaign
                    </h5>
                    <p className="text-gray-600 mb-4">
                        Start a campaign to raise funds for pets in need.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        Create Campaign
                    </Button>
                </Card>

                <Card className="max-w-sm">
                    <h5 className="text-xl font-semibold text-gray-800 mb-2">
                        My Donations
                    </h5>
                    <p className="text-gray-600 mb-4">
                        Track your donations and their impact.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        View Donations
                    </Button>
                </Card>
            </div>

            <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <p className="text-gray-600">Listed</p>
                        <h3 className="text-4xl font-bold text-blue-700">{counts.pets}</h3>
                        <p className="text-gray-600">Pets</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <p className="text-gray-600">Make</p>
                        <h3 className="text-4xl font-bold text-blue-700">5</h3>
                        <p className="text-gray-600">Adoption Requests</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <p className="text-gray-600">Receive</p>
                        <h3 className="text-4xl font-bold text-blue-700">5</h3>
                        <p className="text-gray-600">Adoption Requests</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <p className="text-gray-600">Total Donations</p>
                        <h3 className="text-4xl font-bold text-blue-700">500</h3>
                        <p className="text-gray-600">USD</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
