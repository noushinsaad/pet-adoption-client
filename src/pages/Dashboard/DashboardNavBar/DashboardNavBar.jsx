/* eslint-disable react-hooks/rules-of-hooks */
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png'
import useAuth from "../../../hooks/useAuth";
import { useDarkModeContext } from "../../../providers/DarkModeProvider";
import Swal from "sweetalert2";




const DashboardNavBar = () => {
    const { user, logOut } = useAuth();
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


    return (
        <Navbar className="md:px-10 dark:bg-gray-900 dark:text-white bg-green-200" fluid>
            <Navbar.Brand href="/">
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">furEver Home</span>
            </Navbar.Brand>


            <div className="flex justify-center items-center md:order-2">
                {
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
                        <Dropdown.Item><Link to="/">Home</Link></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                    </Dropdown>
                }
                <button
                    onClick={toggleDarkMode}
                    className="ml-4 p-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition duration-300"
                >
                    {darkMode === "light" ? "🌙" : "🌞"}
                </button>
                <Navbar.Toggle />
            </div>

        </Navbar>
    );
};

export default DashboardNavBar;