import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useActiveLink from "../../hooks/useActiveLink";

import logo from '../../assets/logo.png'
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const location = useLocation();
    const [isAdmin] = useAdmin()
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')

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
            .catch(error => console.log(error))
    }

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

        </>
    );

    return (

        <Navbar className="bg-green-200  md:px-10" fluid>
            <Navbar.Brand href="/">
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FurEver Home</span>
            </Navbar.Brand>

            {
                noHeaderFooter || <div className="flex md:order-2">
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
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to='/login'><Button>Login/Register</Button></Link>
                    )}
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
