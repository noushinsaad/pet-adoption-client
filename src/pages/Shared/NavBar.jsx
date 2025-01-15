import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useActiveLink from "../../hooks/useActiveLink";

import logo from '../../assets/logo.png'
import { useState } from "react";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')

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

        <Navbar className="bg-green-200  md:px-10" fluid rounded>
            <Navbar.Brand href="/">
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FurEver Home</span>
            </Navbar.Brand>

            {
                noHeaderFooter || <div className="flex md:order-2">
                    {isLoggedIn ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    alt="User settings"
                                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    rounded
                                />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">Bonnie Green</span>
                                <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                            </Dropdown.Header>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => setIsLoggedIn(false)}>Sign out</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to='/register'><Button>Login/Register</Button></Link>
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
