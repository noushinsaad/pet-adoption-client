/* eslint-disable react-hooks/rules-of-hooks */
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useActiveLink from "../../hooks/useActiveLink";

import logo from '../../assets/logo.png'
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import { useDarkModeContext } from "../../providers/DarkModeProvider";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const location = useLocation();
    const [isAdmin] = useAdmin();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');


    const { darkMode, toggleDarkMode } = useDarkModeContext();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user?.displayName} logged out successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error));
    };

    const links = (
        <>
            <NavLink to="/" className={useActiveLink("/")}>
                Home
            </NavLink>
            <NavLink to="/petListing" className={useActiveLink("/petListing")}>
                Pet Listing
            </NavLink>
            <NavLink to="/donationCampaigns" className={useActiveLink("/donationCampaigns")}>
                Donation Campaigns
            </NavLink>
            {
                user && <>
                    <NavLink to="/addPet" className={useActiveLink("/addPet")}>
                        Add a Pet
                    </NavLink>
                    <NavLink to="/createDonationCampaign" className={useActiveLink("/createDonationCampaign")}>
                        Create Donation Campaign
                    </NavLink>
                </>
            }
        </>
    );


    return (
        <Navbar className="md:px-10 dark:bg-gray-900 dark:text-white bg-green-200" fluid>
            <Navbar.Brand href="/">
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">furEver Home</span>
            </Navbar.Brand>

            {
                noHeaderFooter ||
                <div className="flex justify-center items-center md:order-2">
                    {user ? (
                        <Dropdown
                            arrowIcon={true}
                            inline
                            label={
                                <Avatar
                                    alt="User settings"
                                    img={user?.photoURL}
                                    rounded
                                />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">{user?.displayName}</span>
                                <span className="block truncate text-sm font-medium">{user?.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item><Link to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}>Dashboard</Link></Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to='/login'><Button>Login/Register</Button></Link>
                    )}
                    <button
                        onClick={toggleDarkMode}
                        className="ml-4 p-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition duration-300"
                    >
                        {darkMode==="light" ? "🌙" : "🌞"}
                    </button>
                    <Navbar.Toggle />
                </div>
            }

            <Navbar.Collapse>
                {links}
            </Navbar.Collapse>

        </Navbar>
    );
};

export default NavBar;
