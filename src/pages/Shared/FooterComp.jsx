import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from '../../assets/logo.png';
import { useDarkModeContext } from "../../providers/DarkModeProvider";


const FooterComp = () => {
    const { darkMode } = useDarkModeContext();
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <Footer
                container
                className={`transition-colors duration-300 rounded-none
                    ${darkMode === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 text-gray-700"}
                `}
            >
                <div className="w-full">
                    <div className="grid w-full gap-8 sm:flex sm:justify-between">
                        <div>
                            <Footer.Brand
                                href="/"
                                src={logo}
                                alt="FurEver Home Logo"
                                name="furEverHome"
                                className="text-2xl font-semibold"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                            <div>
                                <Footer.Title title="About Us" className={`${darkMode === "dark" ? "text-gray-400" : "text-gray-700"}`} />
                                <Footer.LinkGroup col>
                                    <Footer.Link href="#" className="hover:underline">Our Mission</Footer.Link>
                                    <Footer.Link href="#" className="hover:underline">Team</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Follow Us" className={`${darkMode === "dark" ? "text-gray-400" : "text-gray-700"}`} />
                                <Footer.LinkGroup col>
                                    <Footer.Link href="#" className="hover:underline">Facebook</Footer.Link>
                                    <Footer.Link href="#" className="hover:underline">Instagram</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Legal" className={`${darkMode === "dark" ? "text-gray-400" : "text-gray-700"}`} />
                                <Footer.LinkGroup col>
                                    <Footer.Link href="#" className="hover:underline">Privacy Policy</Footer.Link>
                                    <Footer.Link href="#" className="hover:underline">Terms & Conditions</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                        </div>
                    </div>
                    <Footer.Divider className={`${darkMode === "dark" ? "border-gray-700" : "border-gray-300"}`} />
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <Footer.Copyright
                            href="#"
                            by="FurEver Home"
                            year={currentYear}
                            className={`${darkMode === "dark" ? "text-gray-400" : "text-gray-600"}`}
                        />
                        <div className="flex space-x-6">
                            <Footer.Icon
                                href="#"
                                icon={BsFacebook}
                                className={`transition duration-300 ${darkMode === "dark" ? "text-gray-400 hover:text-blue-500" : "hover:text-blue-500"}`}
                            />
                            <Footer.Icon
                                href="#"
                                icon={BsInstagram}
                                className={`transition duration-300 ${darkMode === "dark" ? "text-gray-400 hover:text-pink-500" : "hover:text-pink-500"}`}
                            />
                            <Footer.Icon
                                href="#"
                                icon={BsTwitter}
                                className={`transition duration-300 ${darkMode === "dark" ? "text-gray-400 hover:text-blue-400" : "hover:text-blue-400"}`}
                            />
                            <Footer.Icon
                                href="#"
                                icon={BsGithub}
                                className={`transition duration-300 ${darkMode === "dark" ? "text-gray-400 hover:text-gray-100" : "hover:text-gray-900"}`}
                            />
                        </div>
                    </div>
                </div>
            </Footer>
        </div>
    );
};

export default FooterComp;
