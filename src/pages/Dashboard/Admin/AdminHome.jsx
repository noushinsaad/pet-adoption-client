import { Card, Button } from "flowbite-react";

const AdminHome = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-10 px-6">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-green-700">Welcome, Admin!</h1>
                <p className="text-gray-600 mt-2">
                    Manage your platform efficiently and take care of everything in one place.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="max-w-sm">
                    <h5 className="text-xl font-semibold text-gray-800 mb-2">
                        Manage Users
                    </h5>
                    <p className="text-gray-600 mb-4">
                        View, edit, and manage all the users registered on the platform.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700">
                        Go to Users
                    </Button>
                </Card>

                <Card className="max-w-sm">
                    <h5 className="text-xl font-semibold text-gray-800 mb-2">
                        Manage Pets
                    </h5>
                    <p className="text-gray-600 mb-4">
                        View and manage all the pets available for adoption.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700">
                        Go to Pets
                    </Button>
                </Card>

                <Card className="max-w-sm">
                    <h5 className="text-xl font-semibold text-gray-800 mb-2">
                        Manage Donations
                    </h5>
                    <p className="text-gray-600 mb-4">
                        Track and manage donation campaigns and contributions.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700">
                        Go to Donations
                    </Button>
                </Card>
            </div>

            <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Platform Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <h3 className="text-4xl font-bold text-green-700">120</h3>
                        <p className="text-gray-600">Total Users</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <h3 className="text-4xl font-bold text-green-700">50</h3>
                        <p className="text-gray-600">Pets for Adoption</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <h3 className="text-4xl font-bold text-green-700">$8,200</h3>
                        <p className="text-gray-600">Total Donations</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
