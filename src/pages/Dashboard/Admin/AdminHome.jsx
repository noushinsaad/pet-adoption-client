import { useQuery } from "@tanstack/react-query";
import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { useDarkModeContext } from "../../../providers/DarkModeProvider";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { darkMode } = useDarkModeContext();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="p-6">
                <Skeleton height={40} width={300} count={3} />
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen py-10 px-6 ${darkMode === "dark" ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"}`}
        >
            <div className="text-center mb-10">
                <h1 className={`text-4xl font-bold ${darkMode === "dark" ? "text-green-400" : "text-green-700"}`}>
                    Welcome, Admin!
                </h1>
                <p className="mt-2">
                    Manage your platform efficiently and take care of everything in one place.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className={`max-w-sm ${darkMode === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
                    <h5 className="text-xl font-semibold mb-2">Manage Users</h5>
                    <p className="mb-4">
                        View, edit, and manage all the users registered on the platform.
                    </p>
                    <Link to="/dashboard/allUsers">
                        <Button className="bg-green-600 hover:bg-green-700 w-full">
                            Go to Users
                        </Button>
                    </Link>
                </Card>

                <Card className={`max-w-sm ${darkMode === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
                    <h5 className="text-xl font-semibold mb-2">Manage Pets</h5>
                    <p className="mb-4">
                        View and manage all the pets available for adoption.
                    </p>
                    <Link to='/dashboard/allPets'>
                        <Button className="bg-green-600 hover:bg-green-700 w-full">
                            Go to Pets
                        </Button>
                    </Link>
                </Card>

                <Card className={`max-w-sm ${darkMode === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
                    <h5 className="text-xl font-semibold mb-2">Manage Donations</h5>
                    <p className="mb-4">
                        Track and manage donation campaigns and contributions.
                    </p>
                    <Link to="/dashboard/allDonations">
                        <Button className="bg-green-600 hover:bg-green-700 w-full">
                            Go to Donations
                        </Button>
                    </Link>
                </Card>
            </div>

            <div className={`mt-12 p-6 rounded-lg shadow-lg ${darkMode === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
                <h2 className={`text-2xl font-semibold mb-4 ${darkMode === "dark" ? "text-green-400" : "text-green-700"}`}>Platform Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`p-4 text-center ${darkMode === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
                        <h3 className="text-4xl font-bold text-green-700 dark:text-green-400">{stats?.userCount}</h3>
                        <p className="text-gray-600 dark:text-gray-300">Total Users</p>
                    </div>
                    <div className={`p-4 text-center ${darkMode === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
                        <h3 className="text-4xl font-bold text-green-700 dark:text-green-400">{stats?.petCount}</h3>
                        <p className="text-gray-600 dark:text-gray-300">Pets for Adoption</p>
                    </div>
                    <div className={`p-4 text-center ${darkMode === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
                        <h3 className="text-4xl font-bold text-green-700 dark:text-green-400">${stats?.total}</h3>
                        <p className="text-gray-600 dark:text-gray-300">Total Donations</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
