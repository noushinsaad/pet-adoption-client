import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from '../../assets/logo.png';

const FooterComp = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div >
            <Footer container className="bg-gradient-to-r from-green-300 via-blue-300 to-purple-300">
                <div className="w-full">
                    <div className="grid w-full gap-8 sm:flex sm:justify-between">
                        <div>
                            <Footer.Brand
                                href="/"
                                src={logo}
                                alt="FurEver Home Logo"
                                name="FurEver Home"
                                className="text-2xl font-semibold text-gray-700"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                            <div>
                                <Footer.Title title="About Us" />
                                <Footer.LinkGroup col>
                                    <Footer.Link href="#">Our Mission</Footer.Link>
                                    <Footer.Link href="#">Team</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Follow Us" />
                                <Footer.LinkGroup col>
                                    <Footer.Link href="#">Facebook</Footer.Link>
                                    <Footer.Link href="#">Instagram</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Legal" />
                                <Footer.LinkGroup col>
                                    <Footer.Link href="#">Privacy Policy</Footer.Link>
                                    <Footer.Link href="#">Terms & Conditions</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                        </div>
                    </div>
                    <Footer.Divider />
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <Footer.Copyright
                            href="#"
                            by="FurEver Home"
                            year={currentYear}
                            className="text-gray-600"
                        />
                        <div className="flex space-x-6">
                            <Footer.Icon
                                href="#"
                                icon={BsFacebook}
                                className="hover:text-blue-500 transition duration-300"
                            />
                            <Footer.Icon
                                href="#"
                                icon={BsInstagram}
                                className="hover:text-pink-500 transition duration-300"
                            />
                            <Footer.Icon
                                href="#"
                                icon={BsTwitter}
                                className="hover:text-blue-400 transition duration-300"
                            />
                            <Footer.Icon
                                href="#"
                                icon={BsGithub}
                                className="hover:text-gray-900 transition duration-300"
                            />

                        </div>
                    </div>
                </div>
            </Footer>
        </div>
    );
};

export default FooterComp;
