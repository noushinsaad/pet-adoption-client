import { Link } from "react-router-dom";
import { useDarkModeContext } from "../../../providers/DarkModeProvider";


const AboutUs = () => {
    const { darkMode } = useDarkModeContext();

    return (
        <div
            id="aboutus"
            className={`h-auto min-h-screen py-20 px-6 md:px-24 lg:px-32 space-y-12 transition-colors duration-300 
                ${darkMode === "dark" ? "bg-gray-700 text-gray-200" : "bg-gradient-to-br from-green-50 to-green-100 text-gray-900"}
            `}
        >
            {/* Header Section */}
            <div className="text-center space-y-6">
                <h2 className={`text-4xl font-extrabold ${darkMode === "dark" ? "text-green-400" : "text-green-900"}`}>
                    About Us
                </h2>
                <p className="text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
                    We&apos;re on a mission to bring joy to both pets and humans by connecting loving families with their perfect furry companions.
                </p>
            </div>

            {/* Mission and How It Works Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                {/* Our Mission Section */}
                <div
                    className={`p-10 shadow-2xl rounded-2xl border transform hover:scale-105 transition-transform duration-300 
                        ${darkMode === "dark" ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-green-100 text-gray-700"}
                    `}
                >
                    <h3 className={`text-2xl font-bold mb-6 ${darkMode === "dark" ? "text-green-400" : "text-green-800"}`}>
                        Our Mission
                    </h3>
                    <p className="text-lg leading-relaxed">
                        At our core, we believe every pet deserves a loving home.
                        We strive to simplify the adoption process, reduce shelter populations, and create an easy-to-use platform where individuals can find their ideal companions.
                    </p>
                </div>

                {/* How It Works Section */}
                <div
                    className={`p-10 shadow-2xl rounded-2xl border transform hover:scale-105 transition-transform duration-300 
                        ${darkMode === "dark" ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-green-100 text-gray-700"}
                    `}
                >
                    <h3 className={`text-2xl font-bold mb-6 ${darkMode === "dark" ? "text-green-400" : "text-green-800"}`}>
                        How It Works
                    </h3>
                    <ul className="list-disc list-inside text-lg space-y-4 leading-relaxed">
                        <li>Explore available pets by browsing categories or using filters like age and location.</li>
                        <li>View detailed pet profiles to find your perfect match.</li>
                        <li>Submit an adoption request to start the process.</li>
                        <li>Welcome your new furry friend into your life and home!</li>
                    </ul>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="text-center space-y-8">
                <p className="text-lg max-w-2xl mx-auto leading-relaxed">
                    Together, we can make the world a better place—one adoption at a time. Be a hero and give a pet a forever home.
                </p>
                <Link to='/petListing'>
                    <button
                        className={`mt-4 px-10 py-5 rounded-full font-semibold text-xl shadow-lg transition duration-300 
                            ${darkMode === "dark" ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-700 text-white hover:bg-green-800"}
                        `}
                    >
                        Start Your Adoption Journey
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AboutUs;
