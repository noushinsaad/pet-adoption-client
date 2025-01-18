import { Button, Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";
import {

    HiClipboard,
    HiCollection,
    HiCurrencyDollar,
    HiHeart,
    HiInformationCircle,
    HiPencil,
    HiShoppingBag,
    HiUsers,
} from "react-icons/hi";
import { HiHome } from "react-icons/hi2";
import { Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { MdSpaceDashboard } from "react-icons/md";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useAuth();

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    const [isAdmin] = useAdmin();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.displayName} logged out successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error))
    }

    const links = (
        <>
            <Sidebar.Items>
                {isAdmin && (
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/dashboard/adminHome" icon={HiHome}>
                            Admin Home
                        </Sidebar.Item>
                        <Sidebar.Item href="/dashboard/allUsers" icon={HiUsers}>
                            All Users
                        </Sidebar.Item>
                        <Sidebar.Item href="/dashboard/allPets" icon={HiHeart}>
                            All Pets
                        </Sidebar.Item>
                        <Sidebar.Item href="/dashboard/allDonations" icon={HiCurrencyDollar}>
                            All Donations
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                )}

                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/dashboard/userHome" icon={HiHome}>
                        User Home
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/addPet" icon={HiShoppingBag}>
                        Add a Pet
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/myAddedPets" icon={HiHeart}>
                        My Added Pets
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/adoptionRequest" icon={HiClipboard}>
                        Adoption Request
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/createDonationCampaign" icon={HiPencil}>
                        Create Donation <br /> Campaign
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/myDonationCampaign" icon={HiClipboard}>
                        My Donation <br /> Campaigns
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/myDonations" icon={HiCurrencyDollar}>
                        My Donations
                    </Sidebar.Item>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiHome}>
                        Home
                    </Sidebar.Item>
                    <Sidebar.Item href="/petListing" icon={HiCollection}>
                        Pet Listing
                    </Sidebar.Item>
                    <Sidebar.Item href="/donationCampaign" icon={HiInformationCircle}>
                        Donations Campaign
                    </Sidebar.Item>
                    <Sidebar.Item className="text-center">
                        <Button onClick={handleSignOut}>Log Out</Button>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </>
    );


    return (
        <div className="flex min-h-screen">
            {/* Sidebar for larger screens */}
            <div className="hidden md:block w-80 bg-gray-50 border-r border-gray-200">
                <Sidebar>
                    <div className="py-4 px-2">
                        {links}
                    </div>
                </Sidebar>
            </div>

            {/* Content for smaller screens */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button
                    onClick={handleOpen}
                    className="bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
                >
                    <MdSpaceDashboard className="text-3xl" />
                </Button>
            </div>

            <Drawer open={isOpen} onClose={handleClose}>
                <Drawer.Header title="MENU" />
                <Drawer.Items>
                    <Sidebar aria-label="Mobile sidebar">
                        {links}
                    </Sidebar>
                </Drawer.Items>
            </Drawer>

            {/* Content Section */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>

    );
};

export default Dashboard;